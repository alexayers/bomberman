import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {EntityManager} from "../entity/entityManager";
import {AStar} from "../ai/aStar";
import {PathNode} from "../ai/pathNode";
import {VelocityComponent} from "../component/velocityComponent";
import {SpeedComponent} from "../component/speedComponent";



export class AiSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("ai")) {
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;
            let velocity: VelocityComponent = gameEntity.getComponent("velocity") as VelocityComponent;
            let speed: SpeedComponent = gameEntity.getComponent("speed") as SpeedComponent;

            let whitePlayer : GameEntity = EntityManager.getInstance().getPlayer("whitePlayer");
            let whitePosition : PositionComponent = whitePlayer.getComponent("position") as PositionComponent;

            let npcX : number = position.getX();
            let npcY : number = position.getY();
            let whiteX : number = whitePosition.getX();
            let whiteY : number = whitePosition.getY();

            let aStar : AStar = new AStar(npcX,npcY,whiteX, whiteY);

            if (aStar.isPathFound()) {
                let path : Array<PathNode> = aStar.getPath();

                if (path.length == 0) {
                    return;
                }

                if (path[0].getX() > npcX) {
                    velocity.setVelX(speed.getSpeed());
                }

                if (path[0].getX() < npcX) {
                    velocity.setVelX(speed.getSpeed() * -1);
                }

                if (path[0].getY() > npcY) {
                    velocity.setVelY(speed.getSpeed());
                }

                if (path[0].getY() < npcY) {
                    velocity.setVelY(speed.getSpeed()  * -1);
                }

                gameEntity.addComponent(velocity);
            }

        }

    }

}