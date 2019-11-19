import {GameComponent} from "./gameComponent";


export class DirectionComponent implements GameComponent {

    private _direction:string;

    constructor() {
        this._direction = "down";
    }

    name(): string {
        return "direction";
    }

    public setDirection(direction:string) : void {
        this._direction = direction;
    }

    public getDirection() : string {
        return this._direction;
    }

}