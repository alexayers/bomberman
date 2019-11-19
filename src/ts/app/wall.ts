
import {GameEntity} from "../lib/game/entity/gameEntity";
import {WallComponent} from "../lib/game/component/wallComponent";
import {SpriteSheet} from "../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../lib/rendering/animatedSprite";
import {AnimationComponent} from "../lib/game/component/animationComponent";


export class Wall extends GameEntity {

    constructor() {
        super("wall");

        this.addComponent(new WallComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");

        let animatedSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("wall","wall"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite(animatedSprite);

        this.addComponent(
            animationComponent
        );


    }
}