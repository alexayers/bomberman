
import {WallComponent} from "../../../lib/game/component/wallComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class WallStone extends BaseGameEntity {

    constructor() {
        super("wallStone","level","wallStone");

        this.addComponent(new WallComponent());

    }
}