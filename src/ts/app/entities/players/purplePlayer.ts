import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";



export class PurplePlayer extends Player {

    constructor() {
        super("purplePlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(1);

        this.addComponent(new AiComponent());
    }



}