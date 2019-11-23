import {GameEntity} from "../entity/gameEntity";
import {PositionComponent} from "../component/positionComponent";
import {Level} from "./level";
import {RandomLevel} from "./randomLevel";


export class GameMap {
    protected static _levels:Map<string, Level>;
    protected static _currentLevel:string;
    private static _width: number;
    private static _height: number;



    public static init(): void {

        GameMap._width = 19;
        GameMap._height = 14;
        GameMap._levels = new Map<string, Level>();
        GameMap._levels.set("level1", new RandomLevel());
        GameMap._currentLevel = "level1";
    }

    public static getGameEntity(layer: string, x: number, y: number): GameEntity {
        return GameMap._levels.get(GameMap._currentLevel).getMap().get(layer)[x + (y * GameMap._width)];
    }

    public static getWidth() : number {
        return GameMap._width;
    }

    public static getHeight() : number {
        return GameMap._height;
    }



    static setGameEntity(layer: string, x: number, y: number, entity: GameEntity) {

        if (entity != null) {
            let position: PositionComponent = new PositionComponent();
            position.setX(x);
            position.setY(y);
            entity.addComponent(position);
        }

        GameMap._levels.get(GameMap._currentLevel).getMap().get(layer)[x + (y * GameMap._width)] = entity;
    }

    static isWall(x: number, y: number) : boolean {
        let tile : GameEntity = GameMap.getGameEntity("tile", x,y);
        let item : GameEntity = GameMap.getGameEntity("item",x,y);

        if (item != null && item.hasComponent("wall")) {
            return true;
        }

        return tile.hasComponent("wall");

    }

    static hasComponent(componentName: string, x: number, y: number) {
        let item : GameEntity = GameMap.getGameEntity("item",x,y);

        if (item != null && item.hasComponent(componentName)) {
            return true;
        }

        let tile : GameEntity = GameMap.getGameEntity("tile",x,y);

        return tile != null && tile.hasComponent(componentName);


    }

    public static addParticle(gameEntity:GameEntity) : void {
        GameMap._levels.get(GameMap._currentLevel).addParticle(gameEntity);
    }

    public static getParticles() : Array<GameEntity> {
        return GameMap._levels.get(GameMap._currentLevel).getParticles();
    }

    public static removeParticle(id: number) : void {

    }

    public static translateCoordinatesToIdx(x: number, y: number) :number {
        return x + (y * GameMap._width);
    }

    static canDestroy(x: number, y: number) {
        let tile : GameEntity = GameMap.getGameEntity("tile", x,y);
        let item : GameEntity = GameMap.getGameEntity("item",x,y);

        if (item != null && item.hasComponent("wall") && !item.hasComponent("destructible")) {
            return true;
        }

        return tile.hasComponent("wall");
    }

    static isItemPresent(itemName: string, x: number, y: number) {
        let item : GameEntity = GameMap.getGameEntity("item",x,y);

        return item != null && item.getName() === itemName;
    }

    static getMap(): Map<string, Array<GameEntity>> {
        return GameMap._levels.get(GameMap._currentLevel).getMap();
    }
}