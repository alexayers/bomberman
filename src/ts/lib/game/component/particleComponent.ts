import {GameComponent} from "./gameComponent";
import {Color} from "../../rendering/Color";


export class ParticleComponent implements GameComponent {

    private _x:number;
    private _y:number;
    private _velX:number;
    private _velY:number;
    private _width: number;
    private _height:number;
    private _color:Color;
    private _decay:number;

    constructor() {
        this._x = 0;
        this._y =0;
        this._decay = 50;
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

    public setVelX(velX: number) : void {
        this._velX = velX;
    }

    public getVelX() : number {
        return this._velX;
    }

    public setVelY(velY: number) : void {
        this._velY = velY;
    }

    public getVelY() : number {
        return this._velY;
    }

    public setWidth(width: number) : void {
        this._width = width;
    }

    public getWidth() : number {
        return this._width;
    }

    public setHeight(height: number) : void {
        this._height = height;
    }

    public getHeight() : number {
        return this._height;
    }

    public setColor(color: Color) : void {
        this._color = color;
    }

    public getColor() : Color {
        return this._color;
    }

    public setDecay(decay:number) : void {
        this._decay = decay;
    }

    public getDecay() : number {
        return this._decay;
    }
}