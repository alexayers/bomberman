import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";
import {EnemyComponent} from "../../../lib/game/component/enemyComponent";



export class RedPlayer extends Player {

    constructor() {
        super("redPlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(1);
        position.setY(12);

        this.addComponent(new AiComponent());
        this.addComponent(new EnemyComponent());
    }



}