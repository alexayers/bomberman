import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class BombUp extends BaseGameEntity {

    constructor() {
        super("bombUp","level","bombUp");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
    }
}