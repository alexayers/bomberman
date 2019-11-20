import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {WallComponent} from "../../../lib/game/component/wallComponent";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";


export class SpeedUp extends GameEntity {

    constructor() {
        super("speedUp");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("speedUp","speedUp"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite("down",animatedSprite);

        this.addComponent(
            animationComponent
        );

        let directionComponent : DirectionComponent = new DirectionComponent();
        directionComponent.setDirection("down");

        this.addComponent(
            directionComponent
        );
    }
}