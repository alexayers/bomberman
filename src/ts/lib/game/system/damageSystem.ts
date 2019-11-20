import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {GameMap} from "../gameMap";
import {EntityManager} from "../entity/entityManager";



export class DamageSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("damage")) {
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;
            let item = GameMap.getInstance().getGameEntity("item",position.getX(),position.getY());



            if (item != null && item.getName() === "crate") {
                let randomPowerUps : string [] = ["bombUp","explosionUp","shieldUp","skull","speedUp"];
                let  powerUpName = randomPowerUps[Math.floor(Math.random()*randomPowerUps.length)];


                console.info(item.getName() );
                let powerUp = EntityManager.getInstance().getEntity(powerUpName);


                GameMap.getInstance().setGameEntity("item",position.getX(),position.getY(), powerUp);



            }

            gameEntity.removeComponent("damage");


            console.info("damaged");
        }

    }

}