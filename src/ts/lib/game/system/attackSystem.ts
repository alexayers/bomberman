import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {GameMap} from "../gameMap";
import {EntityManager} from "../entity/entityManager";


export class AttackSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("attack")) {
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;

            let x : number = position.getX();
            let y : number = position.getY();

            let mapEntity : GameEntity = GameMap.getInstance().getGameEntity("tile",x,y);

            if (!mapEntity.hasComponent("wall")) {
                let bomb : GameEntity = EntityManager.getInstance().getEntity("bomb");

                let position : PositionComponent = new PositionComponent();
                position.setX(x);
                position.setY(y);

                bomb.addComponent(
                    position
                );


                GameMap.getInstance().setGameEntity("item",x,y, bomb);
            }


            gameEntity.removeComponent("attack");
        }

    }

}