import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {ParticleComponent} from "../component/particleComponent";
import {GameMap} from "../gameMap";
import {RGBtoHex} from "../util/colorUtil";
import {ParticleFactory} from "../../../app/entities/particles/ParticleFactory";


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

            if (particle.isAlive()) {
                particle.setX(particle.getX() + particle.getVelX());
                particle.setY(particle.getY() + particle.getVelY());

                if (particle.shouldResize()) {
                    particle.setWidth(particle.getWidth() - 1);
                    particle.setHeight(particle.getHeight() - 1);
                }

                particle.getColor().setAlpha(particle.getColor().getAlpha() - 0.000001);
                particle.setDecay(particle.getDecay() - 1);

                this._ctx.globalAlpha = particle.getColor().getAlpha();

                this._ctx.beginPath();
                this._ctx.rect(particle.getX() + particle.getRenderOffset(),
                    particle.getY() + particle.getRenderOffset(),
                    particle.getWidth(),
                    particle.getHeight());
                this._ctx.fillStyle = RGBtoHex(particle.getColor().getRed(), particle.getColor().getGreen(), particle.getColor().getBlue());
                this._ctx.fill();
                this._ctx.closePath();
            } else if (!particle.isAlive() && !particle.shouldRespawn()) {
                GameMap.getInstance().removeParticle(gameEntity.getId());
            } else if (!particle.isAlive() && particle.shouldRespawn()) {
                 ParticleFactory.refreshParticle(gameEntity, gameEntity.getName(), particle.getX(), particle.getY());
            } else {

            }

            if (particle.getDecay() <= 0) {
                particle.setAlive(false);
            }

            this._ctx.globalAlpha = 1.0;
        }
    }

}