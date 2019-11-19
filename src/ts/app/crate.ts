import {GameEntity} from "../lib/game/entity/gameEntity";
import {WallComponent} from "../lib/game/component/wallComponent";
import {AnimationComponent} from "../lib/game/component/animationComponent";
import {SpriteSheet} from "../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../lib/rendering/animatedSprite";


export class Crate extends GameEntity {

    constructor() {
        super("crate");

        this.addComponent(new WallComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("crate","crate"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite(animatedSprite);

        this.addComponent(
            animationComponent
        );
    }
}