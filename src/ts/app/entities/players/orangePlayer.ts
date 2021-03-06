import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";
import {EnemyComponent} from "../../../lib/game/component/enemyComponent";



export class OrangePlayer extends Player {

    constructor() {
        super("orangePlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(10);
        position.setX(10);

        this.addComponent(new AiComponent());
        this.addComponent(new EnemyComponent());
    }



}