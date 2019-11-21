import {GameComponent} from "./gameComponent";

export class InventoryComponent implements GameComponent {

    private _maxItems:number;
    private _currentItems:number;

    constructor() {
        this._maxItems = 1;
        this._currentItems = 1;
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

    getCurrentItems() : number {
        return this._currentItems;
    }

    setCurrentItems(currentItems: number) : void {
        this._currentItems = currentItems;
    }

}