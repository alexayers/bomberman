import {EventBus} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {SpriteSheetManager} from "../rendering/spriteSheetManager";
import {AudioManager} from "../audo/audioManager";
import {Renderer} from "../rendering/renderer";


export class Application {

    constructor() {

        Renderer.init();
        SpriteSheetManager.init();
        AudioManager.init();

        document.addEventListener('keydown', (event : KeyboardEvent) => {
            EventBus.publish(
                new GameEvent("keyboardEvent", event.keyCode)
            );
        });
    }

    resize() {
        Renderer.resize();
    }

}

