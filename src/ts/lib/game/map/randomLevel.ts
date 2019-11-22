import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {EntityManager} from "../entity/entityManager";
import {GameMap} from "./gameMap";
import {ParticleFactory} from "../../../app/entities/particles/particleFactory";
import {Level} from "./level";
import {getRandomBetween, getRandomInt} from "../util/mathUtil";



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

export class RandomLevel implements Level {

    private _level: Map<string, Array<GameEntity>>;
    private _particles:Array<GameEntity>;
    private _randomLevel:Array<Number>;

    constructor() {
        this.generateLevel();
        this.init();
    }

    private generateLevel() {
        this._randomLevel = [];

        for (let y = 0; y < GameMap.getInstance().getHeight(); y++) {
            for (let x = 0; x < GameMap.getInstance().getWidth(); x++) {
                if (y == 0 || y == GameMap.getInstance().getHeight() -1) {
                    this._randomLevel.push(Level1Tiles.WALL_STONE);
                } else if (x == 0 || x == GameMap.getInstance().getWidth() -1) {
                    this._randomLevel.push(Level1Tiles.WALL);
                } else {
                    let rand : number = getRandomInt(100);

                    if (rand < 70) {
                        let grassRand : number = getRandomInt(4);

                        if (grassRand == 1) {
                            this._randomLevel.push(Level1Tiles.GRASSY);
                        } else  if (grassRand == 2) {
                            if (getRandomInt(2) == 1) {
                                this._randomLevel.push(Level1Tiles.GRASS);
                            } else {
                                this._randomLevel.push(Level1Tiles.FLOWERS);
                            }
                        } else if (grassRand == 3) {
                            if (getRandomInt(2) == 1) {
                                this._randomLevel.push(Level1Tiles.GRASS);
                            } else {
                                this._randomLevel.push(Level1Tiles.MUSHROOMS);
                            }
                        } else if (grassRand == 4) {
                            this._randomLevel.push(Level1Tiles.GRASS);
                        }
                    } else {
                        let grassRand : number = getRandomInt(4);

                        if (grassRand == 1) {
                            this._randomLevel.push(Level1Tiles.BRICK);
                        } else  if (grassRand == 2) {
                            if (getRandomInt(10) <= 3) {
                                this._randomLevel.push(Level1Tiles.CRATE);
                            } else {
                                this._randomLevel.push(Level1Tiles.WALL_STONE);
                            }

                        } else if (grassRand == 3) {
                            this._randomLevel.push(Level1Tiles.BUSH);
                        } else if (grassRand == 4) {
                            if (getRandomInt(2) == 1) {
                                this._randomLevel.push(Level1Tiles.GRASS);
                            } else {
                                this._randomLevel.push(Level1Tiles.WALL_STONE);
                            }
                        }
                    }

                }
            }
        }

        this.waterFeature();
    }

    private waterFeature() : void {
        let waterPatterns : Array<Array<number>> = new Array<Array<number>>();

        waterPatterns.push([Level1Tiles.WATER,Level1Tiles.WATER,
                        Level1Tiles.WATER,Level1Tiles.WATER_WALL]);

        waterPatterns.push([Level1Tiles.WATER,Level1Tiles.WATER,
            Level1Tiles.GRASSY,Level1Tiles.WATER_WALL]);

        waterPatterns.push([Level1Tiles.WATER_WALL,Level1Tiles.GRASSY,
            Level1Tiles.WATER,Level1Tiles.WATER_WALL]);

        waterPatterns.push([Level1Tiles.WATER_WALL,Level1Tiles.WATER,
            Level1Tiles.WATER,Level1Tiles.WATER_WALL]);


        for (let i = 0; i < 4; i++) {
            let randomWaterPattern = getRandomInt(4) - 1;
            let randomX: number = getRandomBetween(1, GameMap.getInstance().getWidth() - 3);
            let randomY: number = getRandomBetween(1, GameMap.getInstance().getHeight() - 3);

            let offset: number = 0;

            for (let y = randomY; y < randomY + 2; y++) {
                for (let x = randomX; x < randomX + 2; x++) {
                    this._randomLevel[x + (y * GameMap.getInstance().getWidth())] = waterPatterns[randomWaterPattern][offset];
                    offset++;
                }
            }
        }
    }

    public init(): void {
        this._particles = new Array<GameEntity>();
        this._level = new Map<string, Array<GameEntity>>();
        this._level.set("tile", new Array<GameEntity>());
        this._level.set("item", new Array<GameEntity>());
        this._level.set("decal", new Array<GameEntity>());

        for (let y = 0; y < GameMap.getInstance().getHeight(); y++) {
            for (let x = 0; x < GameMap.getInstance().getWidth(); x++) {
                let tile = this._randomLevel[x + (y *  GameMap.getInstance().getWidth())];
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