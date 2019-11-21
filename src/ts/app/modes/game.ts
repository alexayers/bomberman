import {GameScreen} from "../../lib/application/gameScreen";
import {Player} from "../entities/players/player";
import {GameMap} from "../../lib/game/gameMap";
import {SystemManager} from "../../lib/game/system/systemManager";
import {AudioManager} from "../../lib/audo/audioManager";
import {WhitePlayer} from "../entities/players/whitePlayer";
import {BlackPlayer} from "../entities/players/blackPlayer";
import {RedPlayer} from "../entities/players/redPlayer";
import {BluePlayer} from "../entities/players/bluePlayer";
import {ParticleFactory} from "../entities/particles/ParticleFactory";
import {GameEntity} from "../../lib/game/entity/gameEntity";
import {GameSystem} from "../../lib/game/system/gameSystem";
import {GameEvent} from "../../lib/event/gameEvent";
import {SpeedComponent} from "../../lib/game/component/speedComponent";
import {VelocityComponent} from "../../lib/game/component/velocityComponent";
import {DirectionComponent} from "../../lib/game/component/directionComponent";
import {KeyboardInput} from "../../lib/input/keyboard";
import {AttackComponent} from "../../lib/game/component/attackComponent";


export class Game implements GameScreen {

    private _players: Array<Player> = [];
    private _gameMap: GameMap;

    public init() : void {

        this._players.push(new WhitePlayer());
        this._players.push(new BlackPlayer());
        this._players.push(new RedPlayer());
        this._players.push(new BluePlayer());

        this._gameMap = GameMap.getInstance();

        for (let i = 0; i < 250; i++) {
            GameMap.getInstance().addParticle(ParticleFactory.getParticle("rainParticle", null, null));
        }
    }

    public reset(startGame: boolean) : void {
        GameMap.getInstance().init();
        this._players  = [];

        if (startGame) {
            let whitePlayer : GameEntity = new WhitePlayer();
            whitePlayer.removeComponent("ai");
            this._players.push(whitePlayer);
        } else {
            this._players.push(new WhitePlayer());
        }


        this._players.push(new BlackPlayer());
        this._players.push(new RedPlayer());
        this._players.push(new BluePlayer());
    }

    public gameLoop() : void {

        let gameEntityMap: Map<string, Array<GameEntity>> = this._gameMap.getMap();
        let gameSystems: Array<GameSystem> = SystemManager.getInstance().getSystems();

        this.processEntities("tile", gameEntityMap, gameSystems);
        this.processEntities("item", gameEntityMap, gameSystems);
        this.processEntities("decal", gameEntityMap, gameSystems);

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

    }

    public processEntities(layerName: string, gameEntityMap: Map<string, Array<GameEntity>>, gameSystems: Array<GameSystem>): void {
        for (let i = 0; i < gameEntityMap.get(layerName).length; i++) {
            let gameEntity: GameEntity = gameEntityMap.get(layerName)[i];

            if (gameEntity != null) {

                for (let j = 0; j < gameSystems.length; j++) {
                    gameSystems[j].process(gameEntity);
                }
            }
        }
    }

    public keyboard(gameEvent: GameEvent) : void {
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