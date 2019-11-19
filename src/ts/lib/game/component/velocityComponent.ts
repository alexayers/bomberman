import {GameComponent} from "./gameComponent";


export class VelocityComponent implements GameComponent {

    private _velX:number;
    private _velY:number;

    constructor() {
        this._velX =0;
        this._velY =0;
    }

    name(): string {
        return "velocity";
    }

    public setVelX(velX:number) : void {
        this._velX = velX;
    }

    public getVelX() : number {
        return this._velX;
    }

    public setVelY(velY:number) : void {
        this._velY = velY;
    }

    public getVelY() : number {
        return this._velY;
    }
}