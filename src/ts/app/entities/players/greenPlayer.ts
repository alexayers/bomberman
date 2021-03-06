import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";
import {EnemyComponent} from "../../../lib/game/component/enemyComponent";



export class GreenPlayer extends Player {

    constructor() {
        super("greenPlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(5);
        position.setY(5);

        this.addComponent(new AiComponent());
        this.addComponent(new EnemyComponent());
    }



}