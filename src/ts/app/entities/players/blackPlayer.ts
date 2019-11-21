import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";




export class BlackPlayer extends Player {

    constructor() {
        super("blackPlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(17);
        position.setY(12);

       // this.addComponent(new AiComponent());
    }



}