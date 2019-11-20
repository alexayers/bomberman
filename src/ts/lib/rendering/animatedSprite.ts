import {Sprite, SpriteSheet} from "./spriteSheet";


export class AnimatedSprite {
    private _tick:number;
    private _frameRate:number;
    private _currentFrame:number;
    private _spriteSheet:SpriteSheet;
    private _sprites:Array<Sprite>;

    constructor(spriteSheet:SpriteSheet) {
        this._spriteSheet = spriteSheet;
        this._tick = 0;
        this._frameRate = 2;
        this._currentFrame = 0;
        this._sprites = new Array<Sprite>();

    }

    public setFrameRate(frameRate: number) : void {
        this._frameRate = frameRate;
    }

    public addSprite(sprite: Sprite) : void {
        this._sprites.push(sprite);
    }

    public render(ctx: CanvasRenderingContext2D,x:number,y:number) : void {
        this._spriteSheet.render(ctx,this._sprites[this._currentFrame],x,y);
    }

    public animate() : void {
        this._tick++;
        if (this._tick === this._frameRate) {
            this._currentFrame++;
            this._tick =0;
        }

        if (this._currentFrame == this._sprites.length) {
            this._currentFrame = 0;
        }
    }

    public getCurrentSprite() : Sprite {
        return this._sprites[this._currentFrame];
    }
}