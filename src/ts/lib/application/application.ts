import {EventBus} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {SpriteSheetManager} from "../rendering/spriteSheetManager";
import {SystemManager} from "../game/system/systemManager";
import {AudioManager} from "../audo/audioManager";
import {Renderer} from "../rendering/renderer";


export class Application {

    constructor() {

        SpriteSheetManager.getInstance();
        SystemManager.getInstance();
        AudioManager.getInstance();

        document.addEventListener('keydown', (event : KeyboardEvent) => {
            EventBus.getInstance().publish(
                new GameEvent("keyboardEvent", event.keyCode)
            );
        });
    }

    resize() {
        Renderer.getInstance().resize();
    }

}

