import {GameComponent} from "./gameComponent";
import {AnimatedSprite} from "../../rendering/animatedSprite";


export class AnimationComponent implements GameComponent {

    private _animatedSprite:AnimatedSprite;

    constructor() {

    }


    name(): string {
        return "animation";
    }

    public setAnimatedSprite(animatedSprite:AnimatedSprite) : void {
        this._animatedSprite = animatedSprite;
    }

    public getAnimatedSprite() : AnimatedSprite {
        return this._animatedSprite;
    }

}