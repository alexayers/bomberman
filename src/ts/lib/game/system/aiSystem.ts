import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {EntityManager} from "../entity/entityManager";
import {AStar} from "../ai/aStar";
import {PathNode} from "../ai/pathNode";
import {VelocityComponent} from "../component/velocityComponent";
import {SpeedComponent} from "../component/speedComponent";
import {AiComponent} from "../component/aiComponent";
import {AttackComponent} from "../component/attackComponent";
import {GameMap} from "../map/gameMap";
import {getRandomArrayElement, Point} from "../util/mathUtil";
import {EnemyComponent} from "../component/enemyComponent";
import {system} from "../../framework/framework";

@system()
// @ts-ignore
export class AiSystem implements GameSystem {

    constructor() {

    }

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("ai") && !gameEntity.hasComponent("dead")) {
            let ai: AiComponent = gameEntity.getComponent("ai") as AiComponent;
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;

            //@ts-ignore
            let velocity: VelocityComponent = gameEntity.getComponent("velocity") as VelocityComponent;

            //@ts-ignore
            let speed: SpeedComponent = gameEntity.getComponent("speed") as SpeedComponent;

            let npcX : number = position.getX();
            let npcY : number = position.getY();

            let enemyPoint : Point;
            
            if (this.hasNoValidEnemy(gameEntity)) {
                enemyPoint = this.findNewEnemy(gameEntity);
            } else {
                let enemyComponent : EnemyComponent = gameEntity.getComponent("enemy") as EnemyComponent;
                enemyPoint = this.findEnemyPosition(enemyComponent.getEnemyName());
            }
            
            if (enemyPoint == null) {
                return;
            }

            let enemyX = enemyPoint.x;
            let enemyY = enemyPoint.y;

            let aStar : AStar = new AStar(npcX,npcY,enemyX, enemyY);

            if (aStar.isPathFound()) {
                let path : Array<PathNode> = aStar.getPath();

                if (path.length == 0) {
                    gameEntity.addComponent(new AttackComponent());
                    return;
                }

                let newNode : PathNode = path[path.length-1];

                let item : GameEntity = GameMap.getInstance().getGameEntity("item", newNode.getX(), newNode.getY());

                if (item != null) {
                    gameEntity.addComponent(new AttackComponent());
                    return;
                } else {
                    if (new Date().getTime() > ai.getLastMove() + 250) {
                        position.setX(path[path.length-1].getX());
                        position.setY(path[path.length-1].getY());
                        ai.updateMove();
                    }
                }
            }
        }
    }

    private findEnemyPosition(enemy:string) : Point {
        let enemyPlayer : GameEntity = EntityManager.getInstance().getPlayer(enemy);
        let enemyPosition : PositionComponent = enemyPlayer.getComponent("position") as PositionComponent;

        let enemyX : number = enemyPosition.getX();
        let enemyY : number = enemyPosition.getY();

        for (let y = enemyY - 1; y < enemyY + 1; y++) {
            for (let x = enemyX - 1; x < enemyX +1; x++) {
                if (x == enemyX && y == enemyY) {
                    continue;
                } else if (!GameMap.getInstance().isWall(x,y)) {
                    return {
                        x: x,
                        y: y
                    }
                }
            }
        }

        return null;
    }

    private findNewEnemy(gameEntity: GameEntity) : Point {
        let possibleEnemies: Array<string> = ["whitePlayer","blackPlayer","redPlayer","blackPlayer","greenPlayer","orangePlayer"];
        let actualEnemies: Array<string> = [];

        for (let i = 0; i < possibleEnemies.length; i++) {
            if (possibleEnemies[i] !== gameEntity.getName()) {
                actualEnemies.push(possibleEnemies[i]);
            }
        }

        let enemyName = actualEnemies[getRandomArrayElement(actualEnemies)];
        let enemyComponent : EnemyComponent = gameEntity.getComponent("enemy") as EnemyComponent;
        enemyComponent.setEnemyName(enemyName);

        return this.findEnemyPosition(enemyName);
    }

    private hasNoValidEnemy(gameEntity: GameEntity) {

        let enemyComponent : EnemyComponent = gameEntity.getComponent("enemy") as EnemyComponent;

        if (enemyComponent.getEnemyName() === null) {
            return true;
        }

        if (EntityManager.getInstance().getPlayer(enemyComponent.getEnemyName()).hasComponent("dead")) {
            return true;
        }

        return false;
    }
}