import {GameEntity} from "../lib/game/entity/gameEntity";
import {SpriteSheet} from "../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../lib/rendering/animatedSprite";
import {AnimationComponent} from "../lib/game/component/animationComponent";
import {PositionComponent} from "../lib/game/component/positionComponent";
import {SpeedComponent} from "../lib/game/component/speedComponent";
import {VelocityComponent} from "../lib/game/component/velocityComponent";
import {RenderPositionComponent} from "../lib/game/component/renderPositionComponent";



export class Player extends GameEntity {

    constructor() {
        super("player");

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("players");
    //    let sprite : Sprite = spriteSheet.getSprite("whitePlayer","front1");

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

        let animatedSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("players"));
        animatedSprite.addSprite(spriteSheet.getSprite("whitePlayer","front1"));
        animatedSprite.addSprite(spriteSheet.getSprite("whitePlayer","front2"));
        animatedSprite.addSprite(spriteSheet.getSprite("whitePlayer","front3"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite(animatedSprite);

        this.addComponent(
            animationComponent
        );


        let speed : SpeedComponent = new SpeedComponent();
        speed.setSpeed(8);

        this.addComponent(
            speed
        );

        let velocity : VelocityComponent = new VelocityComponent();
        velocity.setVelX(0);
        velocity.setVelY(0);

        this.addComponent(
            velocity
        );

        /*
        super("players");
        let downAnimation : AnimatedSprite = new AnimatedSprite();
        downAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "front1"));
        downAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "front2"));
        downAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "front3"));

        this._animatedSprites.set("down", downAnimation);

        let upAnimation : AnimatedSprite = new AnimatedSprite();
        upAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "back1"));
        upAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "back2"));
        upAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "back3"));

        this._animatedSprites.set("up", upAnimation);


        let leftAnimation : AnimatedSprite = new AnimatedSprite();
        leftAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "left1"));
        leftAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "left2"));
        leftAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "left3"));

        this._animatedSprites.set("left", leftAnimation);


        let rightAnimation : AnimatedSprite = new AnimatedSprite();
        rightAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "right1"));
        rightAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "right2"));
        rightAnimation.addSprite(this._spriteSheet.getSprite("whitePlayer", "right3"));

        this._animatedSprites.set("right", rightAnimation);

         */

    }



}