import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {SpeedComponent} from "../../../lib/game/component/speedComponent";
import {VelocityComponent} from "../../../lib/game/component/velocityComponent";
import {RenderPositionComponent} from "../../../lib/game/component/renderPositionComponent";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";



export class BlackPlayer extends GameEntity {

    constructor() {
        super("blackPlayer");

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("players");

        let position : PositionComponent = new PositionComponent();
        position.setX(1);
        position.setY(1);

        this.addComponent(
            position
        );

        let renderPosition : RenderPositionComponent = new RenderPositionComponent();
        renderPosition.setX(64);
        renderPosition.setY(64);

        this.addComponent(
            renderPosition
        );

        let frontSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        frontSprite.addSprite(spriteSheet.getSprite("blackPlayer","front1"));
        frontSprite.addSprite(spriteSheet.getSprite("blackPlayer","front2"));
        frontSprite.addSprite(spriteSheet.getSprite("blackPlayer","front3"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite("down",frontSprite);

        let backSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        backSprite.addSprite(spriteSheet.getSprite("blackPlayer","back1"));
        backSprite.addSprite(spriteSheet.getSprite("blackPlayer","back2"));
        backSprite.addSprite(spriteSheet.getSprite("blackPlayer","back3"));

        animationComponent.setAnimatedSprite("up",backSprite);

        let leftSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        leftSprite.addSprite(spriteSheet.getSprite("blackPlayer","left1"));
        leftSprite.addSprite(spriteSheet.getSprite("blackPlayer","left2"));
        leftSprite.addSprite(spriteSheet.getSprite("blackPlayer","left3"));

        animationComponent.setAnimatedSprite("left",leftSprite);

        let rightSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        rightSprite.addSprite(spriteSheet.getSprite("blackPlayer","right1"));
        rightSprite.addSprite(spriteSheet.getSprite("blackPlayer","right2"));
        rightSprite.addSprite(spriteSheet.getSprite("blackPlayer","right3"));

        animationComponent.setAnimatedSprite("right",rightSprite);

        let deadSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death1"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death2"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death3"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death4"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death5"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death6"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death7"));
        deadSprite.addSprite(spriteSheet.getSprite("blackPlayer","death8"));

        animationComponent.setAnimatedSprite("dead",deadSprite);

        this.addComponent(
            animationComponent
        );

        let speed : SpeedComponent = new SpeedComponent();
        speed.setSpeed(12);

        this.addComponent(
            speed
        );

        let velocity : VelocityComponent = new VelocityComponent();
        velocity.setVelX(0);
        velocity.setVelY(0);

        this.addComponent(
            velocity
        );

        let directionComponent : DirectionComponent = new DirectionComponent();
        directionComponent.setDirection("down");

        this.addComponent(
            directionComponent
        );
    }



}