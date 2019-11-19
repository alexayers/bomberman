import {GameComponent} from "../component/gameComponent";
import {IdGenerator} from "./idGenerator";



export class GameEntity {

    private _id:number;
    private _name:string;
    private _componentMap:Map<string, GameComponent>;


    constructor(name: string) {
        this._id = IdGenerator.nextId();
        this._name = name;
        this._componentMap = new Map<string, GameComponent>();
    }

    setId(id: number) {
        this._id = id;
    }

    public getId() : number {
        return this._id;
    }

    public getName() : string {
        return this._name;
    }

    public addComponent(gameComponent:GameComponent) : void {
        this._componentMap.set(gameComponent.name(), gameComponent);
    }

    public getComponent(name: string) : GameComponent {
        return this._componentMap.get(name);
    }

    public removeComponent(name: string) : void {
        this._componentMap.delete(name);
    }

    public hasComponent(name: string) : boolean {
        return this._componentMap.has(name);
    }

    /*
    protected _spriteSheet:SpriteSheet;
    protected _animatedSprites:Map<string, AnimatedSprite>;
    protected _posX:number =64;
    protected _posY:number =64;
    protected _speed:number = 12;
    protected _currentDirection: string;
    private _isMoving:boolean;

    constructor(spriteSheetName: string) {
        this._spriteSheet = SpriteSheetManager.getInstance().getSpriteSheet(spriteSheetName);
        this._animatedSprites = new Map();
        this._currentDirection = "down";
        this._isMoving = false;
    }

    public moveUp(): void {
        this._currentDirection = "up";
        this._posY-=this._speed;
        this._isMoving = true;
    }

    public moveDown(): void {
        this._currentDirection = "down";
        this._posY+=this._speed;
        this._isMoving = true;
    }

    public moveLeft(): void {
        this._currentDirection="left";
        this._posX-=this._speed;
        this._isMoving = true;
    }

    public moveRight() : void {
        this._currentDirection="right";
        this._posX+=this._speed;
        this._isMoving = true;
    }

    public getSpeed() : number {
        return this._speed;
    }

    public getX() : number {
        return this._posX;
    }

    public getY() : number {
        return this._posY;
    }

    render() {

        this._spriteSheet.render(this._animatedSprites.get(this._currentDirection).getCurrentSprite(), this._posX, this._posY);

        if (this._isMoving) {
            this._animatedSprites.get(this._currentDirection).animate();
            this._isMoving = false;
        }
    }*/


}