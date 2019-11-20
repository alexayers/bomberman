import {GameComponent} from "./gameComponent";


export class ParticleComponent implements GameComponent {

    private _x:number;
    private _y:number;


    constructor() {
        this._x = 0;
        this._y =0;
    }

    name(): string {
        return "particle";
    }

    public setX(x:number) : void {
        this._x = x;
    }

    public setY(y:number) : void {
        this._y = y;
    }

    public getX() : number {
        return this._x;
    }

    public getY() : number {
        return this._y;
    }

}