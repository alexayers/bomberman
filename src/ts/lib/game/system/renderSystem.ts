import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {AnimationComponent} from "../component/animationComponent";
import {PositionComponent} from "../component/positionComponent";
import {DirectionComponent} from "../component/directionComponent";
import {system} from "../../framework/framework";

@system()
// @ts-ignore
export class RenderSystem implements GameSystem {
     private _canvas: HTMLCanvasElement;
     private _ctx: CanvasRenderingContext2D;

    constructor() {
        this._canvas  = document.getElementById('canvas') as
            HTMLCanvasElement;
        this._ctx  = this._canvas.getContext("2d");
    }

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("animation")) {
            let animation : AnimationComponent = gameEntity.getComponent("animation") as AnimationComponent;
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;
            let direction: DirectionComponent = gameEntity.getComponent("direction") as DirectionComponent;

            if (gameEntity.hasComponent("renderPosition")) {
                animation.getAnimatedSprite(direction.getDirection()).render(this._ctx,position.getX() * 64,position.getY() * 64);

                if (gameEntity.hasComponent("animate")) {
                    animation.getAnimatedSprite(direction.getDirection()).animate();
                    gameEntity.removeComponent("animate");
                }

            } else {
                animation.getAnimatedSprite(direction.getDirection()).render(this._ctx,position.getX() * 64,position.getY() * 64);
                animation.getAnimatedSprite(direction.getDirection()).animate();
            }

        }
    }

}