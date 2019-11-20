import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";



export class DamageSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("damage")) {
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;

            let x : number = position.getX();
            let y : number = position.getY();

            console.info(x + " " + y);
        }

    }

}