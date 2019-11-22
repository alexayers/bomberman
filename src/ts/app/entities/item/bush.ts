import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class Bush extends BaseGameEntity {

    constructor() {
        super("bush","level","bush");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
    }
}