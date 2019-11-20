import {GameComponent} from "../component/gameComponent";
import {IdGenerator} from "./idGenerator";



export class GameEntity {

    private _id:number;
    private _name:string;
    private _componentMap:Map<string, GameComponent>;


    constructor(name: string) {
        this._id = IdGenerator.nextId();
        this._name = name;
        this._componentMap = new Map<string, GameComponent>();
    }

    setId(id: number) {
        this._id = id;
    }

    public getId() : number {
        return this._id;
    }

    public getName() : string {
        return this._name;
    }

    public addComponent(gameComponent:GameComponent) : void {
        this._componentMap.set(gameComponent.name(), gameComponent);
    }

    public getComponent(name: string) : GameComponent {
        return this._componentMap.get(name);
    }

    public removeComponent(name: string) : void {
        this._componentMap.delete(name);
    }

    public hasComponent(name: string) : boolean {
        return this._componentMap.has(name);
    }

}