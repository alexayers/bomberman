import {EntityManager} from "./entity/entityManager";
import {GameEntity} from "./entity/gameEntity";
import {PositionComponent} from "./component/positionComponent";

const level1 = require("../../../resources/maps/level1.json");

export interface Level {
    level: number[]
}

export enum TileType {
    GRASS = 0,
    WALL = 1,
    BRICK = 2,
    WALL_STONE = 3,
    GRASSY = 4,
    WATER_EDGE = 5,
    WATER = 6,
    WATER_WALL = 7,
    CRATE = 8,
    BUSH = 9,
    FLOWERS = 10,
    MUSHROOMS = 11
}

export class GameMap {

    private static _instance: GameMap;
    private _level: Map<string, Array<GameEntity>>;
    private width: number;
    private height: number;

    public static getInstance(): GameMap {
        if (this._instance === undefined) {
            this._instance = new GameMap();
            this._instance.init();
        }

        return this._instance;
    }

    private init(): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let tile = level1.map[x + (y * this.width)];
                let tileEntity: GameEntity = null;
                let itemEntity: GameEntity = null;
                let position: PositionComponent = new PositionComponent();
                position.setX(x);
                position.setY(y);

                if (tile === TileType.WALL) {
                    tileEntity = EntityManager.getInstance().getEntity("wall");
                } else if (tile === TileType.GRASS) {
                    tileEntity = EntityManager.getInstance().getEntity("grass");
                } else if (tile === TileType.BRICK) {
                    tileEntity = EntityManager.getInstance().getEntity("grass");
                    itemEntity = EntityManager.getInstance().getEntity("brick");
                } else if (tile === TileType.GRASSY) {
                    tileEntity = EntityManager.getInstance().getEntity("grassy");
                } else if (tile === TileType.WATER_EDGE) {
                    tileEntity = EntityManager.getInstance().getEntity("waterEdge");
                } else if (tile === TileType.WATER) {
                    tileEntity = EntityManager.getInstance().getEntity("water");
                } else if (tile === TileType.WALL_STONE) {
                    tileEntity = EntityManager.getInstance().getEntity("wallStone");
                } else if (tile === TileType.WATER_WALL) {
                    tileEntity = EntityManager.getInstance().getEntity("grass");
                    itemEntity = EntityManager.getInstance().getEntity("waterWall");
                } else if (tile === TileType.CRATE) {
                    tileEntity = EntityManager.getInstance().getEntity("grass");
                    itemEntity = EntityManager.getInstance().getEntity("crate");
                } else if (tile === TileType.BUSH) {
                    tileEntity = EntityManager.getInstance().getEntity("grass");
                    itemEntity = EntityManager.getInstance().getEntity("bush");
                } else if (tile === TileType.FLOWERS) {
                    tileEntity = EntityManager.getInstance().getEntity("flowers");
                } else if (tile === TileType.MUSHROOMS) {
                    tileEntity = EntityManager.getInstance().getEntity("mushrooms");
                }

                if (tileEntity != null) {
                    tileEntity.addComponent(position);
                    this._level.get("tile").push(tileEntity);
                }

                if (itemEntity != null) {
                    itemEntity.addComponent(position);
                    this._level.get("item").push(itemEntity);
                } else {
                    this._level.get("item").push(null);
                }

            }
        }
    }

    private constructor() {
        this._level = new Map<string, Array<GameEntity>>();
        this._level.set("tile", new Array<GameEntity>());
        this._level.set("item", new Array<GameEntity>());

        this.width = 19;
        this.height = 14;
    }

    public getGameEntity(layer: string, x: number, y: number): GameEntity {
        return this._level.get(layer)[x + (y * this.width)];
    }


    public getMap(): Map<string, Array<GameEntity>> {
        return this._level;
    }

    setGameEntity(layer: string, x: number, y: number, entity: GameEntity) {
        this._level.get(layer)[x + (y * this.width)] = entity;
    }

    isWall(x: number, y: number) : boolean {
        let tile : GameEntity = this.getGameEntity("tile", x,y);
        let item : GameEntity = this.getGameEntity("item",x,y);

        if (item != null && item.hasComponent("wall")) {
            return true;
        }

        if (tile.hasComponent("wall")) {
            return true;
        }


        return false;
    }
}