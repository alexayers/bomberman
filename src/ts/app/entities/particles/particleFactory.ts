import {EntityManager} from "../../../lib/game/entity/entityManager";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {ParticleComponent} from "../../../lib/game/component/particleComponent";
import {getRandomInt, positiveNegative} from "../../../lib/game/util/mathUtil";
import {Color} from "../../../lib/rendering/color";
import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {Renderer} from "../../../lib/rendering/renderer";


export class ParticleFactory {

    public static getParticle(particleName: string, x: number, y: number) : GameEntity {
        let particle: GameEntity = null;

        return this.refreshParticle(particle, particleName, x, y, false);
    }

    static refreshParticle(particle: GameEntity,particleName: string, x: number, y: number, refresh: boolean = true) : GameEntity {

        if (particleName === "smokeParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("smokeParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(x*64);
            someParticlePosition.setY(y*64);

            particle.addComponent(someParticlePosition);

            let particleComponent : ParticleComponent = particle.getComponent("particle") as ParticleComponent;
            particleComponent.setVelX(getRandomInt(4) * -1);
            particleComponent.setVelY(getRandomInt(4) * -1);
            particleComponent.setX(x*64+(getRandomInt(10) * positiveNegative()));
            particleComponent.setY(y*64+getRandomInt(10));
            particleComponent.setHeight(getRandomInt(15)+ 35);
            particleComponent.setWidth(getRandomInt(15) + 35);
            particleComponent.setDecay(getRandomInt(25));
            particleComponent.setAlive(true);
            particleComponent.setRenderOffsetX(Renderer.getInstance().getRenderOffsetX());
            particleComponent.setRenderOffsetY(Renderer.getInstance().getRenderOffsetY());

            let color : Color = new Color();

            let gray =getRandomInt(255);


            color.setRed(gray);
            color.setGreen(gray);
            color.setBlue(gray);
            color.setAlpha(0.20);



            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }

        if (particleName === "grassParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("grassParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(x*64);
            someParticlePosition.setY(y*64);

            particle.addComponent(someParticlePosition);

            let particleComponent : ParticleComponent = particle.getComponent("particle") as ParticleComponent;
            particleComponent.setVelX(getRandomInt(4) * -1 / 10);
            particleComponent.setVelY(getRandomInt(4) * -1 / 10);
            particleComponent.setX(x*64 + getRandomInt(8));
            particleComponent.setY(y*64 + 60);
            particleComponent.setHeight(getRandomInt(8));
            particleComponent.setWidth(getRandomInt(8));
            particleComponent.setDecay(getRandomInt(10));
            particleComponent.setAlive(true);
            particleComponent.setRenderOffsetX(Renderer.getInstance().getRenderOffsetX());
            particleComponent.setRenderOffsetY(Renderer.getInstance().getRenderOffsetY());

            let color : Color = new Color();
            let gray =getRandomInt(255);

            color.setRed(gray);
            color.setGreen(gray);
            color.setBlue(gray);
            color.setAlpha(0.10);
            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }  else if (particleName === "mistParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("mistParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(x*64);
            someParticlePosition.setY(y*64);
            particle.addComponent(someParticlePosition);

            let particleComponent: ParticleComponent = particle.getComponent("particle") as ParticleComponent;


            if (getRandomInt(10) > 5) {
                particleComponent.setVelX((getRandomInt(4) / 1000) );
            } else {
                particleComponent.setVelX((getRandomInt(4) / 1000) * -1);
            }

            if (getRandomInt(10) > 5) {
                particleComponent.setVelY((getRandomInt(4) / 1000) );
            } else {
                particleComponent.setVelY((getRandomInt(4) / 1000) * -1);
            }

            if (!refresh) {
                particleComponent.setX(x*64+getRandomInt(10));
                particleComponent.setY(y*64+getRandomInt(10));
            } else {
                particleComponent.setX(particleComponent.getOriginalX());
                particleComponent.setY(particleComponent.getOriginalY());
            }

            particleComponent.setHeight(getRandomInt(25)+ 35);
            particleComponent.setWidth(getRandomInt(25) + 35);
            particleComponent.setDecay(getRandomInt(128));
            particleComponent.setRespawn(true);
            particleComponent.setAlive(true);
            particleComponent.setRenderOffsetX(Renderer.getInstance().getRenderOffsetX());
            particleComponent.setRenderOffsetY(Renderer.getInstance().getRenderOffsetY());

            let color : Color = new Color();

            let gray =getRandomInt(255);

            color.setRed(gray);
            color.setGreen(gray);
            color.setBlue(gray);
            color.setAlpha(0.10);
            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        } else if (particleName === "rainParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("rainParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(getRandomInt(1000) );
            someParticlePosition.setY(getRandomInt(1000) * -1);
            particle.addComponent(someParticlePosition);

            let particleComponent: ParticleComponent = particle.getComponent("particle") as ParticleComponent;
            particleComponent.setVelX((getRandomInt(4) / 10) );
            particleComponent.setVelY((getRandomInt(500)) );


            if (!refresh) {
                particleComponent.setX(getRandomInt(2048));
                particleComponent.setY(getRandomInt(1024) * -1);
            } else {
                particleComponent.setX(getRandomInt(2048));
                particleComponent.setY(getRandomInt(1024) * -1);
            }

            particleComponent.setHeight(getRandomInt(800));
            particleComponent.setWidth(getRandomInt(3));
            particleComponent.setDecay(getRandomInt(40));
            particleComponent.setRespawn(true);
            particleComponent.setResize(false);
            particleComponent.setAlive(true);

            let color : Color = new Color();

            let gray =getRandomInt(255);

            color.setRed(gray);
            color.setGreen(gray);
            color.setBlue(gray);
            color.setAlpha(0.15);
            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }  else if (particleName === "winningParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("winningParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(getRandomInt(1000) );
            someParticlePosition.setY(getRandomInt(1000));
            particle.addComponent(someParticlePosition);

            let particleComponent: ParticleComponent = particle.getComponent("particle") as ParticleComponent;
            particleComponent.setVelX((getRandomInt(4) / 10) );
            particleComponent.setVelY((getRandomInt(500)) * -1);


            if (!refresh) {
                particleComponent.setX(getRandomInt(2048));
                particleComponent.setY(getRandomInt(1024));
            } else {
                particleComponent.setX(getRandomInt(2048));
                particleComponent.setY(getRandomInt(1024) );
            }

            particleComponent.setHeight(getRandomInt(800));
            particleComponent.setWidth(getRandomInt(128));
            particleComponent.setDecay(getRandomInt(40));
            particleComponent.setRespawn(true);
            particleComponent.setResize(false);
            particleComponent.setAlive(true);

            let color : Color = new Color();

            let colorOffset =getRandomInt(50);



            color.setRed(50 + colorOffset);
            color.setGreen(115);
            color.setBlue(168 + colorOffset);
            color.setAlpha(0.15);
            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }  else if (particleName === "losingParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("losingParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(getRandomInt(1000) );
            someParticlePosition.setY(getRandomInt(1000));
            particle.addComponent(someParticlePosition);

            let particleComponent: ParticleComponent = particle.getComponent("particle") as ParticleComponent;
            particleComponent.setVelX((getRandomInt(4) / 10) );
            particleComponent.setVelY((getRandomInt(50)) * -1);


            if (!refresh) {
                particleComponent.setX(getRandomInt(2048));
                particleComponent.setY(getRandomInt(1024));
            } else {
                particleComponent.setX(getRandomInt(2048));
                particleComponent.setY(getRandomInt(1024) );
            }

            particleComponent.setHeight(getRandomInt(800));
            particleComponent.setWidth(getRandomInt(128));
            particleComponent.setDecay(getRandomInt(40));
            particleComponent.setRespawn(true);
            particleComponent.setResize(false);
            particleComponent.setAlive(true);

            let color : Color = new Color();

            let colorOffset =getRandomInt(5);

            if (getRandomInt(10) > 5) {
                color.setRed(105 + colorOffset);
                color.setGreen(45 - colorOffset);
                color.setBlue(44 + colorOffset);
                color.setAlpha(0.45);
            } else {
                color.setRed(colorOffset);
                color.setGreen(colorOffset);
                color.setBlue(colorOffset);
                color.setAlpha(0.45);
            }


            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }   else if (particleName === "fireParticle") {

            if (particle == null) {
                particle = EntityManager.getInstance().getEntity("fireParticle");
                particle.addComponent(new ParticleComponent());
                particle.addComponent(new PositionComponent());
            }

            let someParticlePosition: PositionComponent = particle.getComponent("position") as PositionComponent;
            someParticlePosition.setX(x*64);
            someParticlePosition.setY(y*64);

            particle.addComponent(someParticlePosition);

            let particleComponent : ParticleComponent = particle.getComponent("particle") as ParticleComponent;
            particleComponent.setVelX(getRandomInt(4) * -1 / 10);
            particleComponent.setVelY(getRandomInt(4) * -1 / 10);
            particleComponent.setX(x*64 + getRandomInt(8));
            particleComponent.setY(y*64 + 60);
            particleComponent.setHeight(getRandomInt(8));
            particleComponent.setWidth(getRandomInt(8));
            particleComponent.setDecay(getRandomInt(10));
            particleComponent.setAlive(true);
            particleComponent.setRenderOffsetX(Renderer.getInstance().getRenderOffsetX());
            particleComponent.setRenderOffsetY(Renderer.getInstance().getRenderOffsetY());

            let color : Color = new Color();
            let gray =getRandomInt(255);

            color.setRed(gray);
            color.setGreen(gray);
            color.setBlue(gray);
            color.setAlpha(0.10);
            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }

        return particle;
    }
}