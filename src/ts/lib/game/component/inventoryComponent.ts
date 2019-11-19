import {GameComponent} from "./gameComponent";
import {GameEntity} from "../entity/gameEntity";


export class InventoryComponent implements GameComponent {

    private _slots:Array<GameEntity>;
    private _maxItems:number;

    constructor() {
        this._slots = new Array<GameEntity>();
        this._maxItems = 1;
    }

    name(): string {
        return "inventory";
    }

    getMaxItems() : number {
        return this._maxItems;
    }

    setMaxItems(maxItems: number) : void {
        this._maxItems = maxItems;
    }

    addItem(gameEntity:GameEntity) : void {
        this._slots.push(gameEntity);
    }

    getItem() : GameEntity {

        return null;

    }


}