import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";



export class RedPlayer extends Player {

    constructor() {
        super("redPlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(1);
        position.setY(12);

        this.addComponent(new AiComponent());
    }



}