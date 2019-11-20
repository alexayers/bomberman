import {Game} from "../lib/application/game";

import {Renderer} from "../lib/rendering/renderer";

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



const framesPerSecond : number = 60;

export class Bomberman extends Game implements EventHandler {

    private _player: WhitePlayer;
    private _gameMap:GameMap;

    init() {

        EventBus.getInstance().register("keyboardEvent", this);

        SpriteSheetManager.getInstance();
        SystemManager.getInstance();
        this._renderer = new Renderer();
        this._player = new WhitePlayer();
        this._gameMap = GameMap.getInstance();

        this.gameLoop();
    }

    gameLoop() {
        this._renderer.clearScreen();

        let gameEntityMap : Map<string,Array<GameEntity>> = this._gameMap.getMap();
        let gameSystems: Array<GameSystem> = SystemManager.getInstance().getSystems();

        for (let i = 0; i < gameEntityMap.get("tile").length; i++) {
            let gameEntity : GameEntity = gameEntityMap.get("tile")[i];

            for (let j = 0; j < gameSystems.length; j++) {
                gameSystems[j].process(gameEntity);
            }
        }

        for (let i = 0; i < gameEntityMap.get("item").length; i++) {
            let gameEntity : GameEntity = gameEntityMap.get("item")[i];

            if (gameEntity != null) {
                for (let j = 0; j < gameSystems.length; j++) {
                    gameSystems[j].process(gameEntity);
                }
            }
        }

        for (let j = 0; j < gameSystems.length; j++) {
            gameSystems[j].process(this._player);
        }

        let particles: Array<GameEntity> = GameMap.getInstance().getParticles();

        for (let i = 0; i <  particles.length; i++) {
            let gameEntity : GameEntity = particles[i];

            if (gameEntity != null) {
                for (let j = 0; j < gameSystems.length; j++) {
                    gameSystems[j].process(gameEntity);
                }
            }
        }

        setTimeout(() => {
                requestAnimationFrame(this.gameLoop.bind(this));
        }, 1000 / framesPerSecond);

    }

    handleEvent(gameEvent: GameEvent): void {


        if (gameEvent.channel === "keyboardEvent") {
            let speed : SpeedComponent = this._player.getComponent("speed") as SpeedComponent;
            let velocity : VelocityComponent = this._player.getComponent("velocity") as VelocityComponent;
            let direction : DirectionComponent = this._player.getComponent("direction") as DirectionComponent;

            let x : number = 0;
            let y : number = 0;

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
                let attackComponent : AttackComponent = new AttackComponent();
                this._player.addComponent(attackComponent);
            }

            velocity.setVelX(x);
            velocity.setVelY(y);
        }




    }



}