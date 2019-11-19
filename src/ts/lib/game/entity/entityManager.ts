import {GameEntity} from "./gameEntity";
import {Crate} from "../../../app/crate";
import {Grass} from "../../../app/grass";
import {Wall} from "../../../app/wall";
import {IdGenerator} from "./idGenerator";
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
        this.register(new Crate());
        this.register(new Grass());
        this.register(new Wall());
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