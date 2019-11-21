import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";




export class BlackPlayer extends Player {

    constructor() {
        super("blackPlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(17);
        position.setY(12);

        this.addComponent(new AiComponent());
    }



}