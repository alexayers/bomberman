import {Renderer} from "../rendering/renderer";
import {EventBus} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";


export class Game {

    protected _renderer: Renderer;


    constructor() {

        this._renderer = Renderer.getInstance();

        document.addEventListener('keydown', (event : KeyboardEvent) => {
            EventBus.getInstance().publish(
                new GameEvent("keyboardEvent", event.keyCode)
            );
        });


    }

    gameLoop() {

      //  this._renderer.render();



    }



    resize() {
        this._renderer.resize();
    }

}