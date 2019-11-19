import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {VelocityComponent} from "../component/velocityComponent";
import {GameMap} from "../gameMap";
import {PositionComponent} from "../component/positionComponent";
import {RenderPositionComponent} from "../component/renderPositionComponent";



export class CollisionSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("velocity")) {
            let velocity : VelocityComponent = gameEntity.getComponent("velocity") as VelocityComponent;
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;
            let renderPosition: RenderPositionComponent = gameEntity.getComponent("renderPosition") as RenderPositionComponent;

            if (velocity.getVelX() != 0 || velocity.getVelY() != 0) {

                let mapEntity : GameEntity = GameMap.getInstance().getGameEntity(position.getX(),position.getY());

                if (!mapEntity.hasComponent("wall")) {

                    let attemptedX :number = 0;
                    let attemptedY :number = 0;

                    if (velocity.getVelX() > 0) {
                        attemptedX= Math.floor(renderPosition.getX() / 64);
                    } else {
                        attemptedX = Math.ceil(renderPosition.getX() / 64);
                    }

                    if (velocity.getVelY() > 0) {
                        attemptedY = Math.floor(renderPosition.getY() / 64);
                    } else {
                        attemptedY= Math.ceil(renderPosition.getY() / 64);
                    }

                    position.setX(attemptedX);
                    position.setY(attemptedY);

                    renderPosition.setX(renderPosition.getX() + velocity.getVelX());
                    renderPosition.setY(renderPosition.getY() + velocity.getVelY());





                }

                velocity.setVelX(0);
                velocity.setVelY(0);

            }
        }

    }

}