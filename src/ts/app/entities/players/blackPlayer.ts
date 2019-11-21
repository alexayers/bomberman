import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";
import {EnemyComponent} from "../../../lib/game/component/enemyComponent";




export class BlackPlayer extends Player {

    constructor() {
        super("blackPlayer");

        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(17);
        position.setY(12);

        this.addComponent(new AiComponent());
        this.addComponent(new EnemyComponent());
    }



}