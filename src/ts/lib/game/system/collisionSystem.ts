import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {VelocityComponent} from "../component/velocityComponent";
import {GameMap} from "../gameMap";
import {PositionComponent} from "../component/positionComponent";
import {AnimateComponent} from "../component/animateComponent";



export class CollisionSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("velocity")) {
            let velocity : VelocityComponent = gameEntity.getComponent("velocity") as VelocityComponent;
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;

            if (velocity.getVelX() != 0 || velocity.getVelY() != 0) {

                let attemptedX :number = 0;
                let attemptedY :number = 0;

                if (velocity.getVelX() > 0) {
                    attemptedX= 1;
                } else if (velocity.getVelX() < 0){
                    attemptedX = -1;
                }

                if (velocity.getVelY() > 0) {
                    attemptedY = 1;
                } else if (velocity.getVelY() < 0){
                    attemptedY= -1;
                }

                if (!GameMap.getInstance().isWall(position.getX() + attemptedX,position.getY() + attemptedY)) {

                    position.setX(position.getX() + attemptedX);
                    position.setY(position.getY() + attemptedY);

                    let animate : AnimateComponent = new AnimateComponent();
                    gameEntity.addComponent(animate);

                }

                velocity.setVelX(0);
                velocity.setVelY(0);

            }
        }

    }

}