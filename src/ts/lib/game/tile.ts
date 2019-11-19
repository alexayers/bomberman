import {SpriteSheet} from "../rendering/spriteSheet";
import {AnimatedSprite} from "../rendering/animatedSprite";
import {SpriteSheetManager} from "../rendering/spriteSheetManager";


export class Tile {
    protected _spriteSheet:SpriteSheet;
    protected _animatedSprite:AnimatedSprite;
    protected _isWall:boolean;

    constructor() {
        this._spriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        this._isWall = false;
    }

    public isWall() : boolean {
        return this._isWall;
    }

    render(x: number, y: number) {

        this._spriteSheet.render(this._animatedSprite.getCurrentSprite(), x, y);
        this._animatedSprite.animate();

    }
}