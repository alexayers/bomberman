import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";
import {DamageComponent} from "../../../lib/game/component/damageComponent";
import {TimerComponent} from "../../../lib/game/component/timerComponent";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {GameMap} from "../../../lib/game/gameMap";


export class ExplosionTop extends GameEntity {

    constructor() {
        super("explosionTop");

        this.addComponent(new DamageComponent());

        let spriteSheet: SpriteSheet = SpriteSheetManager.getInstance().getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getInstance().getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite("explosionTop","explosionTop"));

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

        let timerComponent : TimerComponent = new TimerComponent();
        timerComponent.setTimer(5);
        timerComponent.setCallback((gameEntity:GameEntity) => {
            let position : PositionComponent = gameEntity.getComponent("position") as PositionComponent;
            GameMap.getInstance().setGameEntity("item",position.getX(),position.getY(), null);
        });

        this.addComponent(
            timerComponent
        );
    }
}