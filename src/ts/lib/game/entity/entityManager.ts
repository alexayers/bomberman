import {GameEntity} from "./gameEntity";
import {Grass} from "../../../app/entities/tile/grass";
import {Wall} from "../../../app/entities/tile/wall";
import {IdGenerator} from "./idGenerator";
import {Brick} from "../../../app/entities/item/brick";
import {Grassy} from "../../../app/entities/tile/grassy";
import {WaterEdge} from "../../../app/entities/tile/waterEdge";
import {Water} from "../../../app/entities/tile/water";
import {WallStone} from "../../../app/entities/tile/wallStone";
import {WaterWall} from "../../../app/entities/item/waterWall";
import {Crate} from "../../../app/entities/item/crate";
import {Bush} from "../../../app/entities/item/bush";
import {Mushrooms} from "../../../app/entities/tile/mushrooms";
import {Flowers} from "../../../app/entities/tile/flowers";
import {Bomb} from "../../../app/entities/item/bomb";
import {ExplosionLeft} from "../../../app/entities/item/explosionLeft";
import {ExplosionMiddle} from "../../../app/entities/item/explosionMiddle";
import {ExplosionRight} from "../../../app/entities/item/explosionRight";
import {ExplosionTop} from "../../../app/entities/item/explosionTop";
import {ExplosionBottom} from "../../../app/entities/item/explosionBottom";
import {DestoryedWaterWall} from "../../../app/entities/tile/destoryedWaterWall";
import {DestroyedGrass} from "../../../app/entities/tile/destroyedGrass";
import {DestroyedBrick} from "../../../app/entities/tile/destroyedBrick";
import {DestroyedBush} from "../../../app/entities/tile/destroyedBush";
import {BombUp} from "../../../app/entities/powerups/bombUp";
import {ExplosionUp} from "../../../app/entities/powerups/explosionUp";
import {SheildUp} from "../../../app/entities/powerups/sheildUp";
import {Skull} from "../../../app/entities/powerups/skull";
import {SpeedUp} from "../../../app/entities/powerups/speedUp";
import {SmokeParticle} from "../../../app/entities/particles/smokeParticle";
import {GrassParticle} from "../../../app/entities/particles/grassParticle";
import {MistParticles} from "../../../app/entities/particles/mistParticles";
import {RainParticle} from "../../../app/entities/particles/rainParticle";
import {WinningParticle} from "../../../app/entities/particles/winningParticle";
var cloneDeep = require('lodash.clonedeep');


export class EntityManager {
    private static _instance:EntityManager;
    private _entities:Map<string, GameEntity>;
    private _players:Map<string, GameEntity>;

    public static getInstance() : EntityManager {
        if (this._instance === undefined) {
            this._instance = new EntityManager();
            this._instance._entities = new Map<string, GameEntity>();
            this._instance._players = new Map<string, GameEntity>();
            this._instance.init();
        }

        return this._instance;
    }

    private init() : void {
        this.register(new Brick());
        this.register(new Grass());
        this.register(new Wall());
        this.register(new Grassy());
        this.register(new WallStone());
        this.register(new WaterEdge());
        this.register(new WaterWall());
        this.register(new Water());
        this.register(new Crate());
        this.register(new Bush());
        this.register(new Mushrooms());
        this.register(new Flowers());
        this.register(new Bomb());

        this.register(new ExplosionLeft());
        this.register(new ExplosionRight());
        this.register(new ExplosionTop());
        this.register(new ExplosionBottom());
        this.register(new ExplosionMiddle());

        this.register(new DestoryedWaterWall());
        this.register(new DestroyedGrass());
        this.register(new DestroyedBrick());
        this.register(new DestroyedBush());

        this.register(new BombUp());
        this.register(new ExplosionUp());
        this.register(new SheildUp());
        this.register(new Skull());
        this.register(new SpeedUp());

        this.register(new SmokeParticle());
        this.register(new GrassParticle());
        this.register(new MistParticles());
        this.register(new RainParticle());
        this.register(new WinningParticle());
    }

    private constructor() {

    }

    public registerPlayer(gameEntity: GameEntity) : void {
        this._players.set(gameEntity.getName(),gameEntity);
    }

    public getPlayer(playerName: string) : GameEntity {
        return this._players.get(playerName);
    }

    public register(gameEntity:GameEntity) : void {
        this._entities.set(gameEntity.getName(), gameEntity);
    }

    public getEntity(name: string) : GameEntity {
        let gameEntity: GameEntity = cloneDeep(this._entities.get(name));
        gameEntity.setId(IdGenerator.nextId());
        return gameEntity;
    }

}