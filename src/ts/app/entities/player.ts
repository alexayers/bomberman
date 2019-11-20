import {GameEntity} from "../../lib/game/entity/gameEntity";
import {SpriteSheet} from "../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../lib/game/component/animationComponent";
import {PositionComponent} from "../../lib/game/component/positionComponent";
import {SpeedComponent} from "../../lib/game/component/speedComponent";
import {VelocityComponent} from "../../lib/game/component/velocityComponent";
import {RenderPositionComponent} from "../../lib/game/component/renderPositionComponent";
import {DirectionComponent} from "../../lib/game/component/directionComponent";



export class Player extends GameEntity {

    constructor() {
        super("player");

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
        frontSprite.addSprite(spriteSheet.getSprite("whitePlayer","front1"));
        frontSprite.addSprite(spriteSheet.getSprite("whitePlayer","front2"));
        frontSprite.addSprite(spriteSheet.getSprite("whitePlayer","front3"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite("down",frontSprite);

        let backSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        backSprite.addSprite(spriteSheet.getSprite("whitePlayer","back1"));
        backSprite.addSprite(spriteSheet.getSprite("whitePlayer","back2"));
        backSprite.addSprite(spriteSheet.getSprite("whitePlayer","back3"));

        animationComponent.setAnimatedSprite("up",backSprite);

        let leftSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        leftSprite.addSprite(spriteSheet.getSprite("whitePlayer","left1"));
        leftSprite.addSprite(spriteSheet.getSprite("whitePlayer","left2"));
        leftSprite.addSprite(spriteSheet.getSprite("whitePlayer","left3"));

        animationComponent.setAnimatedSprite("left",leftSprite);

        let rightSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        rightSprite.addSprite(spriteSheet.getSprite("whitePlayer","right1"));
        rightSprite.addSprite(spriteSheet.getSprite("whitePlayer","right2"));
        rightSprite.addSprite(spriteSheet.getSprite("whitePlayer","right3"));

        animationComponent.setAnimatedSprite("right",rightSprite);

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