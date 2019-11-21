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
import {EventBus} from "../../../lib/event/eventBus";
import {GameEvent} from "../../../lib/event/gameEvent";
import {RenderingEffect} from "../../../lib/rendering/renderer";
import {Color} from "../../../lib/rendering/Color";
import {OwnerComponent} from "../../../lib/game/component/ownerComponent";
import {InventoryComponent} from "../../../lib/game/component/inventoryComponent";
import {getRandomInt} from "../../../lib/game/util/mathUtil";


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
        timerComponent.setTimer(20);
        timerComponent.setCallback((gameEntity: GameEntity) => {

            EventBus.getInstance().publish(new GameEvent("audio","explosion" + getRandomInt(3)));
            let owner : OwnerComponent = gameEntity.getComponent("owner") as OwnerComponent;

            let player : GameEntity = EntityManager.getInstance().getPlayer(owner.getOwner());
            let inventory : InventoryComponent = player.getComponent("inventory") as InventoryComponent;
            inventory.setCurrentItems(inventory.getCurrentItems() + 1);

            let explosionColor: Color = new Color();
            explosionColor.setAlpha(25);
            explosionColor.setRed(226);
            explosionColor.setGreen(236);
            explosionColor.setBlue(60);

            EventBus.getInstance().publish(new GameEvent("rendering", {
                offsetX: getRandomInt(50),
                offsetY: getRandomInt(50),
                width: getRandomInt(8),
                height: getRandomInt(8),
                color: explosionColor
            } as RenderingEffect));


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

                if (!this.placeExplosion(explosionPosition, explosionLeft)) {
                    break;
                }

            }

            // right
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionRight: GameEntity = EntityManager.getInstance().getEntity("explosionRight");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX() + i);
                explosionPosition.setY(position.getY());

                if (!this.placeExplosion(explosionPosition, explosionRight)) {
                    break;
                }
            }

            // up
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionTop: GameEntity = EntityManager.getInstance().getEntity("explosionTop");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX());
                explosionPosition.setY(position.getY() - i);

                if (!this.placeExplosion(explosionPosition, explosionTop)) {
                    break;
                }
            }

            // bottom
            for (let i = 1; i <= explosive.getArea(); i++) {
                let explosionBottom: GameEntity = EntityManager.getInstance().getEntity("explosionBottom");
                let explosionPosition: PositionComponent = new PositionComponent();

                explosionPosition.setX(position.getX());
                explosionPosition.setY(position.getY() + i);

                if (!this.placeExplosion(explosionPosition, explosionBottom)) {
                    break;
                }
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

    private placeExplosion(explosionPosition: PositionComponent, explosionEntity: GameEntity): boolean {
        if (GameMap.getInstance().isWall(explosionPosition.getX(), explosionPosition.getY()) &&
            !GameMap.getInstance().hasComponent("destructible", explosionPosition.getX(), explosionPosition.getY())) {
            return false;
        }



        explosionEntity.addComponent(explosionPosition);
        explosionEntity.addComponent(new DamageComponent());

        GameMap.getInstance().setGameEntity("item", explosionPosition.getX(), explosionPosition.getY(), explosionEntity);
        return true;
    }


}