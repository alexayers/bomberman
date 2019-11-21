import {EntityManager} from "../../lib/game/entity/entityManager";
import {PositionComponent} from "../../lib/game/component/positionComponent";
import {ParticleComponent} from "../../lib/game/component/particleComponent";
import {getRandomInt} from "../../lib/game/util/mathUtil";
import {Color} from "../../lib/rendering/Color";
import {GameEntity} from "../../lib/game/entity/gameEntity";


export class ParticleFactory {

    public static getParticle(particleName: string, x: number, y: number) : GameEntity {
        let particle: GameEntity = null;

        if (particleName === "smokeParticle") {
            particle = EntityManager.getInstance().getEntity("smokeParticle");
            let someParticlePosition: PositionComponent   = new PositionComponent();
            someParticlePosition.setX(x*64);
            someParticlePosition.setY(y*64);

            particle.addComponent(someParticlePosition);



            let particleComponent : ParticleComponent = new ParticleComponent();
            particleComponent.setVelX(getRandomInt(4) * -1);
            particleComponent.setVelY(getRandomInt(4) * -1);
            particleComponent.setX(x*64+getRandomInt(10));
            particleComponent.setY(y*64+getRandomInt(10));
            particleComponent.setHeight(getRandomInt(15)+ 35);
            particleComponent.setWidth(getRandomInt(15) + 35);
            particleComponent.setDecay(getRandomInt(25));

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
            particle = EntityManager.getInstance().getEntity("grassParticle");
            let someParticlePosition: PositionComponent   = new PositionComponent();
            someParticlePosition.setX(x*64);
            someParticlePosition.setY(y*64);

            particle.addComponent(someParticlePosition);

            let particleComponent : ParticleComponent = new ParticleComponent();
            particleComponent.setVelX(getRandomInt(4) * -1 / 10);
            particleComponent.setVelY(getRandomInt(4) * -1 / 10);
            particleComponent.setX(x*64 + getRandomInt(8));
            particleComponent.setY(y*64 + 60);
            particleComponent.setHeight(getRandomInt(8));
            particleComponent.setWidth(getRandomInt(8));
            particleComponent.setDecay(getRandomInt(10));

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