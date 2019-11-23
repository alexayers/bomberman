import {GameEntity} from "../../../lib/game/entity/gameEntity";
import {DamageComponent} from "../../../lib/game/component/damageComponent";
import {PositionComponent} from "../../../lib/game/component/positionComponent";
import {GameMap} from "../../../lib/game/map/gameMap";
import {DestroyedGrass} from "../tile/destroyedGrass";
import {ParticleFactory} from "../particles/particleFactory";
import {SpriteSheet} from "../../../lib/rendering/spriteSheet";
import {SpriteSheetManager} from "../../../lib/rendering/spriteSheetManager";
import {AnimatedSprite} from "../../../lib/rendering/animatedSprite";
import {AnimationComponent} from "../../../lib/game/component/animationComponent";
import {DirectionComponent} from "../../../lib/game/component/directionComponent";
import {TimerComponent} from "../../../lib/game/component/timerComponent";


export class Explosion extends GameEntity {

    constructor(name: string) {
        super(name);
    }

    protected create(spriteName: string) : void {
        let spriteSheet: SpriteSheet = SpriteSheetManager.getSpriteSheet("level");
        let animatedSprite: AnimatedSprite = new AnimatedSprite(SpriteSheetManager.getSpriteSheet("level"));
        animatedSprite.addSprite(spriteSheet.getSprite(spriteName,spriteName));

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
            this.explosion(gameEntity);
        });

        this.addComponent(
            timerComponent
        );
    }

    protected explosion(gameEntity: GameEntity): void {
        let position: PositionComponent = gameEntity.getComponent("position") as PositionComponent;
        GameMap.setGameEntity("item", position.getX(), position.getY(), null);

        let tile = GameMap.getGameEntity("tile", position.getX(), position.getY());

        if (tile.getName() === "grassy" || tile.getName() === "grass" || tile.getName() === "flowers" || tile.getName() === "mushrooms") {
            let damageTile: GameEntity = new DestroyedGrass();
            damageTile.addComponent(position);

            GameMap.setGameEntity("tile", position.getX(), position.getY(), damageTile);
        }

        for (let i = 0; i < 100; i++) {
            let smokeParticle = ParticleFactory.getParticle("smokeParticle", position.getX(), position.getY());
            GameMap.addParticle(smokeParticle);
        }

        tile.addComponent(position);
        tile.addComponent(new DamageComponent());
    }
}