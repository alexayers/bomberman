import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";

export class SmokeParticle extends GameEntity {

    constructor() {
        super("smokeParticle");

        let spriteSheet: SpriteSheet = SpriteSheetManager.getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("particle","particle"));

        let animationComponent: AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite("down", animatedSprite);

/*
        this.addComponent(
            animationComponent
        );
*/
        let directionComponent : DirectionComponent = new DirectionComponent();
        directionComponent.setDirection("down");

        this.addComponent(
            directionComponent
        );




    }


}