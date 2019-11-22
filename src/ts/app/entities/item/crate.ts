import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class Crate extends BaseGameEntity {

    constructor() {
        super("crate","level","crate");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
    }
}