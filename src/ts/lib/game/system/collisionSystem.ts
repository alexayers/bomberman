import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {VelocityComponent} from "../component/velocityComponent";
import {GameMap} from "../map/gameMap";
import {PositionComponent} from "../component/positionComponent";
import {AnimateComponent} from "../component/animateComponent";
import {GrassParticle} from "../../../app/entities/particles/grassParticle";
import {ParticleFactory} from "../../../app/entities/particles/particleFactory";
import {getRandomInt} from "../util/mathUtil";
import {system} from "../../framework/framework";



@system()
// @ts-ignore
export class CollisionSystem implements GameSystem {

    constructor() {

    }

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

                if (!GameMap.isWall(position.getX() + attemptedX,position.getY() + attemptedY)) {

                    if (getRandomInt(2) == 2) {
                        for (let i = 0; i < 50; i++) {
                            let grassParticle: GrassParticle = ParticleFactory.getParticle("grassParticle", position.getX(), position.getY());
                            GameMap.addParticle(grassParticle);
                        }
                    }

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