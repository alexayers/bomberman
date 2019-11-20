import {GameComponent} from "./gameComponent";

export class OwnerComponent implements GameComponent {

    private _owner:Object;

    constructor() {
    }

    name(): string {
        return "owner";
    }

    public setOwner(owner:Object) {
        this._owner = owner;
    }

    public getOwner() : Object {
        return this._owner;
    }



}