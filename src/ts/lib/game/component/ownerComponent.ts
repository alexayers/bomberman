import {GameComponent} from "./gameComponent";

export class OwnerComponent implements GameComponent {

    private _owner:string;

    constructor() {
    }

    name(): string {
        return "owner";
    }

    public setOwner(owner:string) {
        this._owner = owner;
    }

    public getOwner() : string {
        return this._owner;
    }



}