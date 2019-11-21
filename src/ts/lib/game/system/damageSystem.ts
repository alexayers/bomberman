import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {GameMap} from "../gameMap";
import {EntityManager} from "../entity/entityManager";
import {Player} from "../../../app/entities/players/player";
import {DeadComponent} from "../component/deadComponent";
import {DirectionComponent} from "../component/directionComponent";
import {GameEvent} from "../../event/gameEvent";
import {EventBus} from "../../event/eventBus";
import {GameMode} from "../../../app/bomberman";



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

            this.killPlayer(position.getX(), position.getY());

            gameEntity.removeComponent("damage");
        }

    }


    private killPlayer(x:number, y: number) : void {
        let players : Array<string> = ["whitePlayer","blackPlayer","redPlayer","bluePlayer"];

        for (let i = 0; i < players.length; i++) {
            let player : Player = EntityManager.getInstance().getPlayer(players[i]);

            if (player !== undefined) {

                if (player.hasComponent("dead")) {
                    continue;
                }

                let position: PositionComponent = player.getComponent("position") as PositionComponent;

                if (position.getX() == x && position.getY() == y) {
                    player.addComponent(new DeadComponent());

                    let direction : DirectionComponent = player.getComponent("direction") as DirectionComponent;
                    direction.setDirection("dead");

                    if (player.getName() === "whitePlayer") {
                        EventBus.getInstance().publish(new GameEvent("modeChange", GameMode.DEAD));
                    }
                    console.log("Kill " + players[i]);
                }
            }
        }
    }

}