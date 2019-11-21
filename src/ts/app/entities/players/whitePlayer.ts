import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";
import {EnemyComponent} from "../../../lib/game/component/enemyComponent";



export class WhitePlayer extends Player {

    constructor() {
        super("whitePlayer");
        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(4);
        position.setY(5);

        this.addComponent(new AiComponent());
        this.addComponent(new EnemyComponent());

    }



}