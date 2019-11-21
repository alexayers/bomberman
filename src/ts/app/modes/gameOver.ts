import {GameScreen} from "../../lib/application/gameScreen";
import {GameMap} from "../../lib/game/gameMap";
import {ParticleFactory} from "../entities/particles/ParticleFactory";
import {GameEvent} from "../../lib/event/gameEvent";

export class GameOver implements GameScreen {


    init() {



        for (let i = 0; i < 250; i++) {
            GameMap.getInstance().addParticle(ParticleFactory.getParticle("rainParticle", null, null));
        }
    }

    gameLoop() {

        console.log("game over");

    }

    keyboard(gameEvent: GameEvent) : void {

    }


}