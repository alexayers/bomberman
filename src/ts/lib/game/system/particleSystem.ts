import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {ParticleComponent} from "../component/particleComponent";
import {GameMap} from "../map/gameMap";
import {ParticleFactory} from "../../../app/entities/particles/particleFactory";
import {system} from "../../framework/framework";
import {AnimationComponent} from "../component/animationComponent";
import {Renderer} from "../../rendering/renderer";
import {Sprite} from "../../rendering/spriteSheet";


@system()
// @ts-ignore
export class ParticleSystem implements GameSystem {

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

               // this._ctx.globalAlpha = particle.getColor().getAlpha();

                Renderer.setAlpha(particle.getColor().getAlpha());

                if (gameEntity.hasComponent("animation")) {
                    let animationComponent : AnimationComponent = gameEntity.getComponent("animation") as AnimationComponent;
                   let sprite : Sprite = animationComponent.getAnimatedSprite("down").getCurrentSprite();

                    Renderer.setColor(particle.getColor());
                    Renderer.render(
                        sprite,
                        animationComponent.getAnimatedSprite("down").getSpriteSheet().getImage(),
                        particle.getX() + particle.getRenderOffsetX(),
                        particle.getY() + particle.getRenderOffsetY()
                    );


                } else {

                    Renderer.beginPath();
                    Renderer.rect(particle.getX() + particle.getRenderOffsetX(),
                        particle.getY() + particle.getRenderOffsetY(),
                        particle.getWidth(),
                        particle.getHeight());
                    Renderer.setColor(particle.getColor());
                 //   this._ctx.fillStyle = RGBtoHex(particle.getColor().getRed(), particle.getColor().getGreen(), particle.getColor().getBlue());
                    Renderer.fillAndClosePath();

                }



            } else if (!particle.isAlive() && !particle.shouldRespawn()) {
                GameMap.removeParticle(gameEntity.getId());
            } else if (!particle.isAlive() && particle.shouldRespawn()) {
                 ParticleFactory.refreshParticle(gameEntity, gameEntity.getName(), particle.getX(), particle.getY());
            } else {

            }

            if (particle.getDecay() <= 0) {
                particle.setAlive(false);
            }

            Renderer.setAlpha(1.0);
        }
    }

}