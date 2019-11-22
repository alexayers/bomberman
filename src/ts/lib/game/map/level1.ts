import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {EntityManager} from "../entity/entityManager";
import {GameMap} from "./gameMap";
import {ParticleFactory} from "../../../app/entities/particles/particleFactory";
import {Level} from "./level";

const level1 = require("../../../../resources/maps/level1.json");

export enum Level1Tiles {
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

export class Level1 implements Level {

    private _level: Map<string, Array<GameEntity>>;
    private _particles:Array<GameEntity>;

    constructor() {
       this.init();
    }

    public init(): void {
        this._particles = new Array<GameEntity>();
        this._level = new Map<string, Array<GameEntity>>();
        this._level.set("tile", new Array<GameEntity>());
        this._level.set("item", new Array<GameEntity>());
        this._level.set("decal", new Array<GameEntity>());

        for (let y = 0; y < GameMap.getInstance().getHeight(); y++) {
            for (let x = 0; x < GameMap.getInstance().getWidth(); x++) {
                let tile = level1.map[x + (y *  GameMap.getInstance().getWidth())];
                let tileEntity: GameEntity = null;
                let itemEntity: GameEntity = null;
                let position: PositionComponent = new PositionComponent();
                position.setX(x);
                position.setY(y);

                if (tile === Level1Tiles.WALL) {
                    tileEntity = EntityManager.getInstance().getEntity("wall");
                } else if (tile === Level1Tiles.GRASS) {
                    tileEntity = EntityManager.getInstance().getEntity("grass");
                } else if (tile === Level1Tiles.BRICK) {
                    tileEntity = EntityManager.getInstance().getEntity("destroyedBrick");
                    itemEntity = EntityManager.getInstance().getEntity("brick");
                } else if (tile === Level1Tiles.GRASSY) {
                    tileEntity = EntityManager.getInstance().getEntity("grassy");
                } else if (tile === Level1Tiles.WATER_EDGE) {
                    tileEntity = EntityManager.getInstance().getEntity("waterEdge");
                    this.generateMist(position.getX(),position.getY());
                } else if (tile === Level1Tiles.WATER) {
                    tileEntity = EntityManager.getInstance().getEntity("water");
                    this.generateMist(position.getX(),position.getY());
                } else if (tile === Level1Tiles.WALL_STONE) {
                    tileEntity = EntityManager.getInstance().getEntity("wallStone");
                } else if (tile === Level1Tiles.WATER_WALL) {
                    tileEntity = EntityManager.getInstance().getEntity("destroyedWaterWall");
                    itemEntity = EntityManager.getInstance().getEntity("waterWall");
                    this.generateMist(position.getX(),position.getY());
                } else if (tile === Level1Tiles.CRATE) {
                    tileEntity = EntityManager.getInstance().getEntity("destroyedGrass");
                    itemEntity = EntityManager.getInstance().getEntity("crate");
                } else if (tile === Level1Tiles.BUSH) {
                    tileEntity = EntityManager.getInstance().getEntity("destroyedBush");
                    itemEntity = EntityManager.getInstance().getEntity("bush");
                } else if (tile === Level1Tiles.FLOWERS) {
                    tileEntity = EntityManager.getInstance().getEntity("flowers");
                } else if (tile === Level1Tiles.MUSHROOMS) {
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

                this._level.get("decal").push(null);
            }
        }
    }

    public addParticle(gameEntity:GameEntity) : void {
        this._particles.push(gameEntity);
    }

    public getParticles() : Array<GameEntity> {
        return this._particles;
    }

    private generateMist(x: number, y: number) {
        for (let i = 0; i < 4; i++) {
            let mistParticle : GameEntity = ParticleFactory.getParticle("mistParticle", x, y);
            this.addParticle(mistParticle);
        }
    }

    public getMap(): Map<string, Array<GameEntity>> {
        return this._level;
    }
}