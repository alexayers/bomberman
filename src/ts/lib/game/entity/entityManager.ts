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
import {LosingParticles} from "../../../app/entities/particles/losingParticles";
var cloneDeep = require('lodash.clonedeep');


export class EntityManager {
    private static _entities:Map<string, GameEntity> = new Map<string, GameEntity>();
    private static _players:Map<string, GameEntity> = new Map<string, GameEntity>();


    public static init() : void {
        EntityManager.register(new Brick());
        EntityManager.register(new Grass());
        EntityManager.register(new Wall());
        EntityManager.register(new Grassy());
        EntityManager.register(new WallStone());
        EntityManager.register(new WaterEdge());
        EntityManager.register(new WaterWall());
        EntityManager.register(new Water());
        EntityManager.register(new Crate());
        EntityManager.register(new Bush());
        EntityManager.register(new Mushrooms());
        EntityManager.register(new Flowers());
        EntityManager.register(new Bomb());

        EntityManager.register(new ExplosionLeft());
        EntityManager.register(new ExplosionRight());
        EntityManager.register(new ExplosionTop());
        EntityManager.register(new ExplosionBottom());
        EntityManager.register(new ExplosionMiddle());

        EntityManager.register(new DestoryedWaterWall());
        EntityManager.register(new DestroyedGrass());
        EntityManager.register(new DestroyedBrick());
        EntityManager.register(new DestroyedBush());

        EntityManager.register(new BombUp());
        EntityManager.register(new ExplosionUp());
        EntityManager.register(new SheildUp());
        EntityManager.register(new Skull());
        EntityManager.register(new SpeedUp());

        EntityManager.register(new SmokeParticle());
        EntityManager.register(new GrassParticle());
        EntityManager.register(new MistParticles());
        EntityManager.register(new RainParticle());
        EntityManager.register(new WinningParticle());
        EntityManager.register(new LosingParticles());

        console.log("Entity Manager initialized");
    }

    private constructor() {

    }

    public static registerPlayer(gameEntity: GameEntity) : void {
        EntityManager._players.set(gameEntity.getName(),gameEntity);
    }

    public static getPlayer(playerName: string) : GameEntity {
        return EntityManager._players.get(playerName);
    }

    public static register(gameEntity:GameEntity) : void {
        EntityManager._entities.set(gameEntity.getName(), gameEntity);
    }

    public static getEntity(name: string) : GameEntity {
        let gameEntity: GameEntity = cloneDeep(EntityManager._entities.get(name));
        gameEntity.setId(IdGenerator.nextId());
        return gameEntity;
    }

}