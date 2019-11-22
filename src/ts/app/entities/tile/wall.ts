
import {WallComponent} from "../../../lib/game/component/wallComponent";
import {BaseGameEntity} from "../baseGameEntity";


export class Wall extends BaseGameEntity {

    constructor() {
        super("wall","level","wall");

        this.addComponent(new WallComponent());


    }
}