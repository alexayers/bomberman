import {GameComponent} from "./gameComponent";
import {AnimatedSprite} from "../../rendering/animatedSprite";


export class AnimationComponent implements GameComponent {

    private _animatedSprite:Map<string,AnimatedSprite>;

    constructor() {
        this._animatedSprite = new Map<string, AnimatedSprite>();
    }


    name(): string {
        return "animation";
    }

    public setAnimatedSprite(direction:string,animatedSprite:AnimatedSprite) : void {
        this._animatedSprite.set(direction,animatedSprite);
    }

    public getAnimatedSprite(direction:string) : AnimatedSprite {
        return this._animatedSprite.get(direction);
    }

}