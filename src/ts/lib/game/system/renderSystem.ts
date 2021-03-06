import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {AnimationComponent} from "../component/animationComponent";
import {PositionComponent} from "../component/positionComponent";
import {DirectionComponent} from "../component/directionComponent";
import {system} from "../../framework/framework";
import {RenderPositionComponent} from "../component/renderPositionComponent";
import {Renderer} from "../../rendering/renderer";

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
                let renderPosition : RenderPositionComponent = gameEntity.getComponent("renderPosition") as RenderPositionComponent;
                renderPosition;

                animation.getAnimatedSprite(direction.getDirection()).render(this._ctx,position.getX() * Renderer.getSpriteWidth(),position.getY() * Renderer.getSpriteHeight());

                if (gameEntity.hasComponent("animate")) {
                    animation.getAnimatedSprite(direction.getDirection()).animate();
                    gameEntity.removeComponent("animate");
                }

            } else {
                animation.getAnimatedSprite(direction.getDirection()).render(this._ctx,position.getX() * Renderer.getSpriteWidth(),position.getY() * Renderer.getSpriteHeight());
                animation.getAnimatedSprite(direction.getDirection()).animate();
            }

        }
    }

}