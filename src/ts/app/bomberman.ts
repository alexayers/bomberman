import {Game} from "../lib/application/game";

import {Renderer} from "../lib/rendering/renderer";

import {SpriteSheetManager} from "../lib/rendering/spriteSheetManager";
import {EventBus, EventHandler} from "../lib/event/eventBus";
import {GameEvent} from "../lib/event/gameEvent";
import {GameMap} from "../lib/game/gameMap";
import {GameEntity} from "../lib/game/entity/gameEntity";
import {SystemManager} from "../lib/game/system/systemManager";
import {GameSystem} from "../lib/game/system/gameSystem";
import {Player} from "./player";
import {KeyboardInput} from "../lib/input/keyboard";
import {SpeedComponent} from "../lib/game/component/speedComponent";
import {VelocityComponent} from "../lib/game/component/velocityComponent";



export class Bomberman extends Game implements EventHandler {

    private _player: Player;
    private _gameMap:GameMap;

    init() {

        EventBus.getInstance().register("keyboardEvent", this);

        SpriteSheetManager.getInstance();
        SystemManager.getInstance();
        this._renderer = new Renderer();
        this._player = new Player();
        this._gameMap = GameMap.getInstance();

        this.gameLoop();
    }

    gameLoop() {
        this._renderer.clearScreen();

        let gameMap : Array<GameEntity> = this._gameMap.getMap();
        gameMap.push(this._player);

        let gameSystems: Array<GameSystem> = SystemManager.getInstance().getSystems();

        for (let i = 0; i < gameMap.length; i++) {
            let gameEntity : GameEntity = gameMap[i];

            for (let j = 0; j < gameSystems.length; j++) {
                gameSystems[j].process(gameEntity);
            }
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleEvent(gameEvent: GameEvent): void {


        if (gameEvent.channel === "keyboardEvent") {
            let speed : SpeedComponent = this._player.getComponent("speed") as SpeedComponent;
            let velocity : VelocityComponent = this._player.getComponent("velocity") as VelocityComponent;

            let x : number = 0;
            let y : number = 0;

            if (gameEvent.payload == KeyboardInput.LEFT) {
                x = speed.getSpeed() * -1;
            } else if (gameEvent.payload == KeyboardInput.RIGHT) {
                x = speed.getSpeed();
            } else if (gameEvent.payload == KeyboardInput.UP) {
                y = speed.getSpeed() * -1;
            } else if (gameEvent.payload == KeyboardInput.DOWN) {
                y = speed.getSpeed();
            } else if (gameEvent.payload == KeyboardInput.SPACE) {
                console.log("space");
            }

            velocity.setVelX(x);
            velocity.setVelY(y);
        }




    }



}