import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class Skull extends BaseGameEntity {

    constructor() {
        super("skull","level","skull");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());

    }
}