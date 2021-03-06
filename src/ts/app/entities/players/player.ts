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
import {EntityManager} from "../../../lib/game/entity/entityManager";
import {InventoryComponent} from "../../../lib/game/component/inventoryComponent";



export class Player extends GameEntity {

    constructor(name: string) {
        super(name);

        let spriteSheet: SpriteSheet = SpriteSheetManager.getSpriteSheet("players");

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

        let frontSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getSpriteSheet("players"));
        frontSprite.addSprite(spriteSheet.getSprite(name,"front1"));
        frontSprite.addSprite(spriteSheet.getSprite(name,"front2"));
        frontSprite.addSprite(spriteSheet.getSprite(name,"front3"));

        let animationComponent : AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite("down",frontSprite);

        let backSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getSpriteSheet("players"));
        backSprite.addSprite(spriteSheet.getSprite(name,"back1"));
        backSprite.addSprite(spriteSheet.getSprite(name,"back2"));
        backSprite.addSprite(spriteSheet.getSprite(name,"back3"));

        animationComponent.setAnimatedSprite("up",backSprite);

        let leftSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getSpriteSheet("players"));
        leftSprite.addSprite(spriteSheet.getSprite(name,"left1"));
        leftSprite.addSprite(spriteSheet.getSprite(name,"left2"));
        leftSprite.addSprite(spriteSheet.getSprite(name,"left3"));

        animationComponent.setAnimatedSprite("left",leftSprite);

        let rightSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getSpriteSheet("players"));
        rightSprite.addSprite(spriteSheet.getSprite(name,"right1"));
        rightSprite.addSprite(spriteSheet.getSprite(name,"right2"));
        rightSprite.addSprite(spriteSheet.getSprite(name,"right3"));

        animationComponent.setAnimatedSprite("right",rightSprite);

        let deadSprite: AnimatedSprite =new AnimatedSprite(SpriteSheetManager.getSpriteSheet("players"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death1"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death2"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death3"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death4"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death5"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death6"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death7"));
        deadSprite.addSprite(spriteSheet.getSprite(name,"death8"));

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

        this.addComponent(
            new InventoryComponent()
        );

        EntityManager.registerPlayer(this);
    }




}