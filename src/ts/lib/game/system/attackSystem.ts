import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {GameMap} from "../map/gameMap";
import {EntityManager} from "../entity/entityManager";
import {InventoryComponent} from "../component/inventoryComponent";
import {OwnerComponent} from "../component/ownerComponent";
import {system} from "../../framework/framework";


@system()
// @ts-ignore
export class AttackSystem implements GameSystem {

    constructor() {

    }

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("attack")) {
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;

            let x : number = position.getX();
            let y : number = position.getY();

            let mapEntity : GameEntity = GameMap.getGameEntity("tile",x,y);

            if (!mapEntity.hasComponent("wall")) {
                let inventory: InventoryComponent = gameEntity.getComponent("inventory") as InventoryComponent;

                if (inventory.getCurrentItems() == 0) {
                    return;
                } else {
                    inventory.setCurrentItems(inventory.getCurrentItems() - 1);
                }

                let bomb : GameEntity = EntityManager.getEntity("bomb");

                let position : PositionComponent = new PositionComponent();
                position.setX(x);
                position.setY(y);

                bomb.addComponent(
                    position
                );

                let owner : OwnerComponent = new OwnerComponent();
                owner.setOwner(gameEntity.getName());

                bomb.addComponent(
                    owner
                );

                GameMap.setGameEntity("item",x,y, bomb);
            }


            gameEntity.removeComponent("attack");
        }

    }

}