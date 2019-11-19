import {EntityManager} from "./entity/entityManager";
import {GameEntity} from "./entity/gameEntity";
import {PositionComponent} from "./component/positionComponent";

const level1 = require("../../../resources/maps/level1.json");

export interface Level {
    level: number[]
}

export class GameMap {

    private static _instance:GameMap;
    private _level: Array<GameEntity>;
    private width: number;
    private height: number;

    public static getInstance() : GameMap {
        if (this._instance === undefined) {
            this._instance = new GameMap();
            this._instance.init();
        }

        return this._instance;
    }

    private init() : void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let tile = level1.map[x + (y * this.width)];
                let gameEntity: GameEntity = null;
                let position: PositionComponent = new PositionComponent();
                position.setX(x);
                position.setY(y);

                if (tile === 1) {
                    gameEntity = EntityManager.getInstance().getEntity("wall");
                } else if (tile === 0) {
                    gameEntity = EntityManager.getInstance().getEntity("grass");
                } else if (tile === 2) {
                    gameEntity = EntityManager.getInstance().getEntity("crate");
                }

                if (gameEntity != null) {
                    gameEntity.addComponent(position);
                    this._level.push(gameEntity);
                }


            }
        }
    }

    private constructor() {
        this._level = new Array<GameEntity>();
        this.width = 19;
        this.height = 14;
    }

    public getGameEntity(x:number, y: number) : GameEntity {
        return this._level[x + (y * this.width)];
    }

    public getMap(): Array<GameEntity> {
        return this._level;
    }

    /*
    public isWall(x: number, y: number) : boolean {
        x /= 64;
        y /= 64;
        console.log(Math.round(x) + " " + Math.round(y));
        return this._level[Math.round(x) + (Math.round(y) * this.width)].isWall();
    }

     */


}