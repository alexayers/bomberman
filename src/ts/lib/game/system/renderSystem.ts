import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {AnimationComponent} from "../component/animationComponent";
import {PositionComponent} from "../component/positionComponent";
import {RenderPositionComponent} from "../component/renderPositionComponent";


export class RenderSystem implements GameSystem {



    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("animation")) {
            let animation : AnimationComponent = gameEntity.getComponent("animation") as AnimationComponent;
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;

            if (gameEntity.hasComponent("renderPosition")) {
                let renderPosition: RenderPositionComponent = gameEntity.getComponent("renderPosition") as RenderPositionComponent;
                animation.getAnimatedSprite().animate(renderPosition.getX(),renderPosition.getY());
            } else {
                animation.getAnimatedSprite().animate(position.getX() * 64,position.getY() * 64);
            }





        }
    }

}