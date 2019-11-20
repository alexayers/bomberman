import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {WallComponent} from "../../../lib/game/component/wallComponent";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";
import {TimerComponent} from "../../../lib/game/component/timerComponent";
import {VelocityComponent} from "../../../lib/game/component/velocityComponent";
import {DestructibleComponent} from "../../../lib/game/component/destructibleComponent";
import {ExplosiveComponent} from "../../../lib/game/component/explosiveComponent";
import {GameMap} from "../../../lib/game/gameMap";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {EntityManager} from "../../../lib/game/entity/entityManager";
import {DamageComponent} from "../../../lib/game/component/damageComponent";


export class Bomb extends GameEntity {

    constructor() {
        super("bomb");

        this.addComponent(new WallComponent());
        this.addComponent(new DestructibleComponent());
        this.addComponent(new ExplosiveComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("bomb1", "bomb1"));
        animatedSprite.addSprite(spriteSheet.getSprite("bomb1", "bomb1"));
        animatedSprite.addSprite(spriteSheet.getSprite("bomb2", "bomb2"));
        animatedSprite.addSprite(spriteSheet.getSprite("bomb3", "bomb3"));
        animatedSprite.addSprite(spriteSheet.getSprite("bomb4", "bomb4"));
        animatedSprite.addSprite(spriteSheet.getSprite("bomb5", "bomb5"));
        animatedSprite.setFrameRate(8);

        let animationComponent: AnimationComponent = new AnimationComponent();
        animationComponent.setAnimatedSprite("down", animatedSprite);

        this.addComponent(
            animationComponent
        );

        let timerComponent: TimerComponent = new TimerComponent();
        timerComponent.setTimer(42);
        timerComponent.setCallback((gameEntity: GameEntity) => {
            let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;
            GameMap.getInstance().setGameEntity("item", position.getX(), position.getY(), null);

            let explosionMiddle: GameEntity = EntityManager.getInstance().getEntity("explosionMiddle");
            explosionMiddle.addComponent(position);
            GameMap.getInstance().setGameEntity("item", position.getX(), position.getY(), explosionMiddle);

            let explosive: ExplosiveComponent = gameEntity.getComponent("explosive") as ExplosiveComponent;

            // left
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionLeft: GameEntity = EntityManager.getInstance().getEntity("explosionLeft");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX() - i);
                explosionPosition.setY(position.getY());

                if (GameMap.getInstance().isWall(explosionPosition.getX(),explosionPosition.getY()) &&
                    !GameMap.getInstance().hasComponent("destructible",explosionPosition.getX(),explosionPosition.getY())) {
                    break;
                }

                explosionLeft.addComponent(explosionPosition);
                explosionLeft.addComponent(new DamageComponent());

                GameMap.getInstance().setGameEntity("item", explosionPosition.getX(), explosionPosition.getY(), explosionLeft);
            }

            // right
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionRight: GameEntity = EntityManager.getInstance().getEntity("explosionRight");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX() + i);
                explosionPosition.setY(position.getY());

                if (GameMap.getInstance().isWall(explosionPosition.getX(),explosionPosition.getY()) &&
                    !GameMap.getInstance().hasComponent("destructible",explosionPosition.getX(),explosionPosition.getY())) {
                    break;
                }

                explosionRight.addComponent(new DamageComponent());
                explosionRight.addComponent(explosionPosition);

               GameMap.getInstance().setGameEntity("item", explosionPosition.getX(), explosionPosition.getY(), explosionRight);
            }

            // up
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionTop: GameEntity = EntityManager.getInstance().getEntity("explosionTop");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX());
                explosionPosition.setY(position.getY() - i);

                if (GameMap.getInstance().isWall(explosionPosition.getX(),explosionPosition.getY()) &&
                    !GameMap.getInstance().hasComponent("destructible",explosionPosition.getX(),explosionPosition.getY())) {
                    break;
                }

                explosionTop.addComponent(explosionPosition);
                explosionTop.addComponent(new DamageComponent());

                GameMap.getInstance().setGameEntity("item", explosionPosition.getX(), explosionPosition.getY(), explosionTop);
            }

            // bottom
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionBottom: GameEntity = EntityManager.getInstance().getEntity("explosionBottom");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX());
                explosionPosition.setY(position.getY() + i);

                if (GameMap.getInstance().isWall(explosionPosition.getX(),explosionPosition.getY()) &&
                    !GameMap.getInstance().hasComponent("destructible",explosionPosition.getX(),explosionPosition.getY())) {
                    break;
                }

                explosionBottom.addComponent(explosionPosition);
                explosionBottom.addComponent(new DamageComponent());

                GameMap.getInstance().setGameEntity("item", explosionPosition.getX(), explosionPosition.getY(), explosionBottom);
            }

        });

        this.addComponent(
            timerComponent
        );

        let directionComponent: DirectionComponent = new DirectionComponent();
        directionComponent.setDirection("down");

        this.addComponent(
            directionComponent
        );

        let velocity: VelocityComponent = new VelocityComponent();
        velocity.setVelX(0);
        velocity.setVelY(0);

        this.addComponent(
            velocity
        );

    }


}