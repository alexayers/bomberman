import {GameMap} from "../lib/game/map/gameMap";
import {GameMode} from "./modes/modes";
import {Game} from "./modes/game";
import {GameScreen} from "../lib/application/gameScreen";
import {EventBus} from "../lib/event/eventBus";
import {GameEvent} from "../lib/event/gameEvent";
import {Renderer} from "../lib/rendering/renderer";
import {Application} from "../lib/application/application";
import {StartGame} from "./modes/startGame";
import {Victory} from "./modes/victory";
import {GameOver} from "./modes/gameOver";
import {OverLayScreen} from "../lib/application/overLayScreen";
import {EntityManager} from "../lib/game/entity/entityManager";


const framesPerSecond: number = 60;

export class Bomberman extends Application {

    private _gameScreens:Map<GameMode,GameScreen>;
    private _gameOverlayScreen:Map<string,OverLayScreen>;

    private _gameMode:GameMode;
    private _deathCount: number = 0;

    private _demoTicks: number = 0;

    init() {


        EntityManager.init();
        GameMap.init();
        Renderer.init();

        this._gameScreens = new Map<GameMode, GameScreen>();
        this._gameOverlayScreen = new Map<string,OverLayScreen>();

        this._gameScreens.set(GameMode.PLAYING, new Game());
        this._gameScreens.get(GameMode.PLAYING).init();

        this._gameOverlayScreen.set("startGame",new StartGame());
        this._gameOverlayScreen.set("victory",new Victory());
        this._gameOverlayScreen.set("gameOver",new GameOver());

        this._gameMode = GameMode.PLAYING;

        EventBus.register("keyboardEvent", this.handleEvent.bind(this));

        EventBus.register("gameOver", this.handleEvent.bind(this));

        EventBus.register("death", this.handleEvent.bind(this));

        EventBus.register("startGame", this.handleEvent.bind(this));

        this._gameOverlayScreen.get("startGame").enable();
        this.gameLoop();
    }

    gameLoop() {

        this.demoMode();
        Renderer.clearScreen();

        this._gameScreens.get(this._gameMode).gameLoop();

        for (let key of this._gameOverlayScreen.keys()) {
            if (this._gameOverlayScreen.get(key).isActive()) {
                this._gameOverlayScreen.get(key).gameLoop();
            }
        }

        Renderer.finalRender();

        setTimeout(() => {
            requestAnimationFrame(this.gameLoop.bind(this));
        }, 1000 / framesPerSecond);
    }

    private demoMode() : void {
        if (this._gameOverlayScreen.get("startGame").isActive()) {
            this._demoTicks++;

            if (this._demoTicks > 200) {
                this._demoTicks = 0;
                this._deathCount = 10;
                EventBus.publish(new GameEvent("death", null));
            }
        }
    }

    handleEvent(gameEvent: GameEvent): void {

        if (gameEvent.channel === "keyboardEvent") {

            for (let key of this._gameOverlayScreen.keys()) {
                if (this._gameOverlayScreen.get(key).isActive()) {
                    this._gameOverlayScreen.get(key).keyboard(gameEvent);
                    return;
                }
            }

            this._gameScreens.get(this._gameMode).keyboard(gameEvent);
        } else if (gameEvent.channel === "startGame") {
            this._deathCount = 0;
            let game : Game = this._gameScreens.get(GameMode.PLAYING) as Game;
            game.reset(true);
            this._gameOverlayScreen.get("startGame").disable();
            this._gameOverlayScreen.get("gameOver").disable();
            this._gameOverlayScreen.get("victory").disable();
        } else if (gameEvent.channel === "gameOver") {
            this._gameOverlayScreen.get("gameOver").enable();
            this._gameOverlayScreen.get("victory").disable();
        } else if (gameEvent.channel === "death") {
           this._deathCount++;

           if (this._deathCount >= 5) {
               if (this._gameOverlayScreen.get("startGame").isActive()) {
                   this._gameOverlayScreen.get("gameOver").disable();
                   this._deathCount = 0;
                   let game : Game = this._gameScreens.get(GameMode.PLAYING) as Game;
                   game.reset(false);

                   return;
               }
               this._gameOverlayScreen.get("victory").enable();
           }

        }
    }




}