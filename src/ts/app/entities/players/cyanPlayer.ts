import {Player} from "./player";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {AiComponent} from "../../../lib/game/component/aiComponent";
import {EnemyComponent} from "../../../lib/game/component/enemyComponent";



export class CyanPlayer extends Player {

    constructor() {
        super("cyanPlayer");
        let position : PositionComponent = this.getComponent("position") as PositionComponent;
        position.setX(1);
        this.addComponent(new AiComponent());
        this.addComponent(new EnemyComponent());
    }



}