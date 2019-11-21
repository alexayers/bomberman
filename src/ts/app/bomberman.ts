import {GameMap} from "../lib/game/gameMap";
import {GameMode} from "./modes/modes";
import {Game} from "./modes/game";
import {GameScreen} from "../lib/application/gameScreen";
import {EventBus, EventHandler} from "../lib/event/eventBus";
import {GameEvent} from "../lib/event/gameEvent";
import {Renderer} from "../lib/rendering/renderer";
import {Application} from "../lib/application/application";
import {StartGame} from "./modes/startGame";
import {Victory} from "./modes/victory";
import {GameOver} from "./modes/gameOver";


const framesPerSecond: number = 60;

export class Bomberman extends Application implements EventHandler {

    private _gameScreens:Map<GameMode,GameScreen>;
    private _gameMode:GameMode;
    private _renderer:Renderer;
    private _deathCount: number = 0;

    init() {

        GameMap.getInstance();
        this._renderer = Renderer.getInstance();

        this._gameScreens = new Map<GameMode, GameScreen>();

        this._gameScreens.set(GameMode.PLAYING, new Game());
        this._gameScreens.get(GameMode.PLAYING).init();

        this._gameScreens.set(GameMode.MAIN_MENU, new StartGame());
        this._gameScreens.get(GameMode.MAIN_MENU).init();

        this._gameScreens.set(GameMode.VICTORY, new Victory());
        this._gameScreens.get(GameMode.VICTORY).init();

        this._gameScreens.set(GameMode.GAME_OVER, new GameOver());
        this._gameScreens.get(GameMode.GAME_OVER).init();


        this._gameMode = GameMode.PLAYING;

        EventBus.getInstance().register("keyboardEvent", this);
        EventBus.getInstance().register("modeChange", this);
        EventBus.getInstance().register("death", this);

        this.gameLoop();

    }

    gameLoop() {
        this._renderer.clearScreen();

        this._gameScreens.get(this._gameMode).gameLoop();

        this._renderer.finalRender();

        setTimeout(() => {
            requestAnimationFrame(this.gameLoop.bind(this));
        }, 1000 / framesPerSecond);

    }

    handleEvent(gameEvent: GameEvent): void {

        if (gameEvent.channel === "keyboardEvent") {

            if (this._gameMode === GameMode.PLAYING) {
                this._gameScreens.get(this._gameMode).keyboard(gameEvent);
            }
        } else if (gameEvent.channel === "modeChange") {
            console.log("Switching game mode " + gameEvent.payload);
            this._gameMode = gameEvent.payload;
        } else if (gameEvent.channel === "death") {
           this._deathCount++;

           if (this._deathCount == 3) {
               this._gameMode = GameMode.VICTORY;
           }

        }
    }




}