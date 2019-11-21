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
import {GameMap} from "../gameMap";
import {Point} from "../util/mathUtil";



export class AiSystem implements GameSystem {

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

            let whitePoint : Point = this.findWhitePosition();

            if (whitePoint == null) {
                return;
            }

            let whiteX = whitePoint.x;
            let whiteY = whitePoint.y;

            let aStar : AStar = new AStar(npcX,npcY,whiteX, whiteY);

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

    private findWhitePosition() : Point {
        let whitePlayer : GameEntity = EntityManager.getInstance().getPlayer("whitePlayer");
        let whitePosition : PositionComponent = whitePlayer.getComponent("position") as PositionComponent;

        let whiteX : number = whitePosition.getX();
        let whiteY : number = whitePosition.getY();

        for (let y = whiteY - 1; y < whiteY + 1; y++) {
            for (let x = whiteX - 1; x < whiteX +1; x++) {
                if (x == whiteX && y == whiteY) {
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

}