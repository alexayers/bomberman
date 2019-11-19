import {GameEntity} from "../lib/game/entity/gameEntity";
import {SpriteSheet} from "../lib/rendering/spriteSheet";
import {AnimatedSprite} from "../lib/rendering/animatedSprite";
import {AnimationComponent} from "../lib/game/component/animationComponent";
import {SpriteSheetManager} from "../lib/rendering/spriteSheetManager";


export class Grass extends GameEntity {

    constructor() {
        super("grass");

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("grass","grass"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite(animatedSprite);

        this.addComponent(
            animationComponent
        );

    }
}