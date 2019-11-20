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
var cloneDeep = require('lodash.clonedeep');


export class EntityManager {
    private static _instance:EntityManager;
    private _entities:Map<string, GameEntity>;

    public static getInstance() : EntityManager {
        if (this._instance === undefined) {
            this._instance = new EntityManager();
            this._instance._entities = new Map<string, GameEntity>();
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
    }

    private constructor() {

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