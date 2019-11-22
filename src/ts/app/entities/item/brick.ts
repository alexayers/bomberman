import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class Brick extends BaseGameEntity {

    constructor() {
        super("brick","level","brick");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
    }
}