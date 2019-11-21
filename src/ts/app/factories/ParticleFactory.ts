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
            particleComponent.setVelX(getRandomInt(2));
            particleComponent.setVelY(getRandomInt(2));
            particleComponent.setHeight(getRandomInt(15)+ 35);
            particleComponent.setWidth(getRandomInt(15) + 35);
            particleComponent.setDecay(25);

            let color : Color = new Color();

            let gray =getRandomInt(4);

            color.setRed(gray);
            color.setGreen(gray);
            color.setBlue(gray);
            color.setAlpha(0.20);
            particleComponent.setColor(color);

            particle.addComponent(
                particleComponent
            );
        }

        return particle;
    }
}