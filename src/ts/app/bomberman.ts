import {Game} from "../lib/application/game";

import {SpriteSheetManager} from "../lib/rendering/spriteSheetManager";
import {EventBus, EventHandler} from "../lib/event/eventBus";
import {GameEvent} from "../lib/event/gameEvent";
import {GameMap} from "../lib/game/gameMap";
import {GameEntity} from "../lib/game/entity/gameEntity";
import {SystemManager} from "../lib/game/system/systemManager";
import {GameSystem} from "../lib/game/system/gameSystem";
import {KeyboardInput} from "../lib/input/keyboard";
import {SpeedComponent} from "../lib/game/component/speedComponent";
import {VelocityComponent} from "../lib/game/component/velocityComponent";
import {DirectionComponent} from "../lib/game/component/directionComponent";
import {AttackComponent} from "../lib/game/component/attackComponent";
import {WhitePlayer} from "./entities/players/whitePlayer";
import {Player} from "./entities/players/player";
import {BlackPlayer} from "./entities/players/blackPlayer";
import {RedPlayer} from "./entities/players/redPlayer";
import {BluePlayer} from "./entities/players/bluePlayer";
import {AudioManager} from "../lib/audo/audioManager";

const framesPerSecond: number = 60;

export enum GameMode {
    PLAYING = 0,
    DEAD = 666
}

export class Bomberman extends Game implements EventHandler {

    private _players: Array<Player> = [];
    private _gameMap: GameMap;
    private _mode: GameMode;

    init() {

        EventBus.getInstance().register("keyboardEvent", this);
        EventBus.getInstance().register("modeChange", this);

        SpriteSheetManager.getInstance();
        SystemManager.getInstance();
        AudioManager.getInstance();

        this._players.push(new WhitePlayer());
        this._players.push(new BlackPlayer());
        this._players.push(new RedPlayer());
        this._players.push(new BluePlayer());

        this._gameMap = GameMap.getInstance();
        this._mode = GameMode.PLAYING;

        this.gameLoop();
    }

    gameLoop() {
        this._renderer.clearScreen();

        let gameEntityMap: Map<string, Array<GameEntity>> = this._gameMap.getMap();
        let gameSystems: Array<GameSystem> = SystemManager.getInstance().getSystems();

        this.processEntities("tile", gameEntityMap, gameSystems);
        this.processEntities("item", gameEntityMap, gameSystems);

        for (let i = 0; i < this._players.length; i++) {
            for (let j = 0; j < gameSystems.length; j++) {
                gameSystems[j].process(this._players[i]);
            }
        }

        let particles: Array<GameEntity> = GameMap.getInstance().getParticles();

        for (let i = 0; i < particles.length; i++) {
            let gameEntity: GameEntity = particles[i];

            if (gameEntity != null) {
                for (let j = 0; j < gameSystems.length; j++) {
                    gameSystems[j].process(gameEntity);
                }
            }
        }

        this._renderer.finalRender();

        setTimeout(() => {
            requestAnimationFrame(this.gameLoop.bind(this));
        }, 1000 / framesPerSecond);

    }

    processEntities(layerName: string, gameEntityMap: Map<string, Array<GameEntity>>, gameSystems: Array<GameSystem>): void {
        for (let i = 0; i < gameEntityMap.get(layerName).length; i++) {
            let gameEntity: GameEntity = gameEntityMap.get(layerName)[i];

            if (gameEntity != null) {

                for (let j = 0; j < gameSystems.length; j++) {
                    gameSystems[j].process(gameEntity);
                }
            }
        }
    }

    handleEvent(gameEvent: GameEvent): void {

        if (gameEvent.channel === "keyboardEvent") {

            if (this._mode === GameMode.PLAYING) {
                this.gameKeyboard(gameEvent);
            }
        } else if (gameEvent.channel === "modeChange") {
            this._mode = gameEvent.payload;
        }
    }

    private gameKeyboard(gameEvent: GameEvent) : void {
        let speed: SpeedComponent = this._players[0].getComponent("speed") as SpeedComponent;
        let velocity: VelocityComponent = this._players[0].getComponent("velocity") as VelocityComponent;
        let direction: DirectionComponent = this._players[0].getComponent("direction") as DirectionComponent;

        let x: number = 0;
        let y: number = 0;

        if (gameEvent.payload == KeyboardInput.LEFT) {
            x = speed.getSpeed() * -1;
            direction.setDirection("left");
        } else if (gameEvent.payload == KeyboardInput.RIGHT) {
            x = speed.getSpeed();
            direction.setDirection("right");
        } else if (gameEvent.payload == KeyboardInput.UP) {
            y = speed.getSpeed() * -1;
            direction.setDirection("up");
        } else if (gameEvent.payload == KeyboardInput.DOWN) {
            y = speed.getSpeed();
            direction.setDirection("down");
        } else if (gameEvent.payload == KeyboardInput.SPACE) {
            let attackComponent: AttackComponent = new AttackComponent();
            this._players[0].addComponent(attackComponent);
            AudioManager.getInstance().play("music");
        }

        velocity.setVelX(x);
        velocity.setVelY(y);
    }


}