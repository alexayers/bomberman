import {GameComponent} from "./gameComponent";

export class SpeedComponent implements GameComponent {

    private _speed:number;

    constructor() {
        this._speed =0;
    }

    name(): string {
        return "speed";
    }

    public setSpeed(speed:number) : void {
        this._speed = speed;
    }

    public getSpeed() : number {
        return this._speed;
    }

}