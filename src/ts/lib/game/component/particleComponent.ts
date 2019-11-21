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
    private _respawn:boolean;
    private _alive:boolean;

    private _originalX:number;
    private _originalY:number;
    private _resize:boolean;

    constructor() {
        this._x = null;
        this._y = null;
        this._decay = 50;
        this._respawn = false;
        this._alive = true;
        this._resize = true;
    }

    name(): string {
        return "particle";
    }

    public setOriginalX(originalX: number) : void {
        this._originalX = originalX;
    }

    public getOriginalX() : number {
        return this._originalX;
    }

    public setOriginalY(originalY: number) : void {
        this._originalY = originalY;
    }

    public getOriginalY() : number {
        return this._originalY;
    }

    public setX(x:number) : void {

        if (this._x == null) {
            this._originalX = x;
        }

        this._x = x;
    }

    public setY(y:number) : void {

        if (this._y == null) {
            this._originalY = y;
        }

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

    public setRespawn(respawn: boolean) : void {
        this._respawn = respawn;
    }

    public shouldRespawn() : boolean {
        return this._respawn;
    }

    public setAlive(alive:boolean) : void {
        this._alive = alive;
    }

    public isAlive() : boolean {
        return this._alive;
    }

    public setResize(resize:boolean) : void {
        this._resize = resize;
    }

    public shouldResize() : boolean {
        return this._resize;
    }
}