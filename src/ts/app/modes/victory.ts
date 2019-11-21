import {GameScreen} from "../../lib/application/gameScreen";
import {GameEvent} from "../../lib/event/gameEvent";

export class Victory implements GameScreen {


    init() {


    }

    gameLoop() {
        console.log("victory");


    }

    keyboard(gameEvent: GameEvent) : void {

    }


}