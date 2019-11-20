import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";




export class RenderSystem implements GameSystem {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor() {
        this._canvas  = document.getElementById('canvas') as
            HTMLCanvasElement;
        this._ctx  = this._canvas.getContext("2d");
    }

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("particle")) {

        }
    }

}