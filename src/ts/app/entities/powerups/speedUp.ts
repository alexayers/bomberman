import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class SpeedUp extends BaseGameEntity {

    constructor() {
        super("speedUp","level","speedUp");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());

    }
}