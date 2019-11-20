import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";

export class SmokeParticle extends GameEntity {

    constructor() {
        super("smokeParticle");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("particle","particle"));



        let directionComponent : DirectionComponent = new DirectionComponent();
        directionComponent.setDirection("down");

        this.addComponent(
            directionComponent
        );

    }


}