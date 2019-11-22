import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class SheildUp extends BaseGameEntity {

    constructor() {
        super("shieldUp","level","shieldUp");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
    }
}