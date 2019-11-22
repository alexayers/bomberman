import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {Level1} from "./level1";
import {Level} from "./level";


export class GameMap {

    private static _instance: GameMap;
    protected _levels:Map<string, Level>;
    protected _currentLevel:string;
    private _width: number;
    private _height: number;

    public static getInstance(): GameMap {
        if (this._instance === undefined) {
            this._instance = new GameMap();
            this._instance.init();
        }

        return this._instance;
    }

    public init(): void {

        this._levels = new Map<string, Level>();
        this._levels.set("level1", new Level1());


        this._currentLevel = "level1";
    }

    private constructor() {
        this._width = 19;
        this._height = 14;
    }

    public getGameEntity(layer: string, x: number, y: number): GameEntity {
        return this._levels.get(this._currentLevel).getMap().get(layer)[x + (y * this._width)];
    }

    public getWidth() : number {
        return this._width;
    }

    public getHeight() : number {
        return this._height;
    }



    setGameEntity(layer: string, x: number, y: number, entity: GameEntity) {

        if (entity != null) {
            let position: PositionComponent = new PositionComponent();
            position.setX(x);
            position.setY(y);
            entity.addComponent(position);
        }

        this._levels.get(this._currentLevel).getMap().get(layer)[x + (y * this._width)] = entity;
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

    hasComponent(componentName: string, x: number, y: number) {
        let item : GameEntity = this.getGameEntity("item",x,y);

        if (item != null && item.hasComponent(componentName)) {
            return true;
        }

        let tile : GameEntity = this.getGameEntity("tile",x,y);

        if (tile != null && tile.hasComponent(componentName)) {
            return true;
        }

        return false;
    }

    public addParticle(gameEntity:GameEntity) : void {
        this._levels.get(this._currentLevel).addParticle(gameEntity);
    }

    public getParticles() : Array<GameEntity> {
        return this._levels.get(this._currentLevel).getParticles();
    }

    public removeParticle(id: number) : void {

    }

    public translateCoordinatesToIdx(x: number, y: number) :number {
        return x + (y * this._width);
    }

    canDestroy(x: number, y: number) {
        let tile : GameEntity = this.getGameEntity("tile", x,y);
        let item : GameEntity = this.getGameEntity("item",x,y);

        if (item != null && item.hasComponent("wall") && !item.hasComponent("destructible")) {
            return true;
        }

        if (tile.hasComponent("wall")) {
            return true;
        }



        return false;
    }



    isItemPresent(itemName: string, x: number, y: number) {
        let item : GameEntity = this.getGameEntity("item",x,y);

        if (item != null && item.getName() === itemName) {
            return true;
        }

        return false;
    }

    getMap(): Map<string, Array<GameEntity>> {
        return this._levels.get(this._currentLevel).getMap();
    }
}