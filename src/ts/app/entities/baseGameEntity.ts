import {GameEntity} from "../../lib/game/entity/gameEntity";
import {SpriteSheet} from "../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../lib/game/component/animationComponent";
import {DirectionComponent} from "../../lib/game/component/directionComponent";


export class BaseGameEntity extends GameEntity {

    constructor(name:string, spriteSheetName: string, sprite: string) {
        super(name);

        let spriteSheet: SpriteSheet = SpriteSheetManager.getSpriteSheet(spriteSheetName);
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getSpriteSheet(spriteSheetName));
        animatedSprite.addSprite(spriteSheet.getSprite(sprite,sprite));

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