import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class ExplosionUp extends BaseGameEntity {

    constructor() {
        super("explosionUp","level","explosionUp");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
    }
}