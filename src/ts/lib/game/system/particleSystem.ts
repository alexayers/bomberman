import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {ParticleComponent} from "../component/particleComponent";
import {GameMap} from "../gameMap";
import {RGBtoHex} from "../util/colorUtil";


export class ParticleSystem implements GameSystem {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor() {
        this._canvas = document.getElementById('canvas') as
            HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
    }

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("particle")) {

            let particle: ParticleComponent = gameEntity.getComponent("particle") as ParticleComponent;

            if (particle.getDecay() >= 0) {
                particle.setX(particle.getX() + particle.getVelX());
                particle.setY(particle.getY() + particle.getVelY());
                particle.setWidth(particle.getWidth() - 1);
                particle.setHeight(particle.getHeight() - 1);
                particle.getColor().setAlpha(particle.getColor().getAlpha() - 0.000001);
                particle.setDecay(particle.getDecay() - 1);

                this._ctx.globalAlpha = particle.getColor().getAlpha();

                this._ctx.beginPath();
                this._ctx.rect(particle.getX(),
                    particle.getY(),
                    particle.getWidth(),
                    particle.getHeight());
                this._ctx.fillStyle = RGBtoHex(particle.getColor().getRed(), particle.getColor().getGreen(), particle.getColor().getBlue());
                this._ctx.fill();
                this._ctx.closePath();

                GameMap.getInstance().removeParticle(gameEntity.getId());
            }

            this._ctx.globalAlpha = 1.0;
        }
    }

}