import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";



export class WhitePlayer extends Player {

    constructor() {
        super("whitePlayer");
        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(1);

    }



}