import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";
import {WallComponent} from "../../../lib/game/component/wallComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";


export class WaterWall extends GameEntity {

    constructor() {
        super("waterWall");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant1","waterPlant1"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant2","waterPlant2"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant3","waterPlant3"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant4","waterPlant4"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant5","waterPlant5"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant4","waterPlant4"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant3","waterPlant3"));
        animatedSprite.addSprite(spriteSheet.getSprite("waterPlant2","waterPlant2"));
        animatedSprite.setFrameRate(8);

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