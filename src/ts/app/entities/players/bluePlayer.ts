import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";



export class BluePlayer extends Player {

    constructor() {
        super("bluePlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(17);
        position.setY(1);

        this.addComponent(new AiComponent());
    }



}