import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";

export class FireParticle extends GameEntity {

    constructor() {
        super("fireParticle");

        let directionComponent : DirectionComponent = new DirectionComponent();
        directionComponent.setDirection("down");

        this.addComponent(
            directionComponent
        );

    }


}