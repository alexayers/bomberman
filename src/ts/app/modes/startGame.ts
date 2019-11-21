import {GameEvent} from "../../lib/event/gameEvent";
import {OverLayBase, OverLayScreen} from "../../lib/application/overLayScreen";
import {ParticleFactory} from "../entities/particles/ParticleFactory";
import {GameEntity} from "../../lib/game/entity/gameEntity";
import {ParticleSystem} from "../../lib/game/system/particleSystem";
import {Renderer} from "../../lib/rendering/renderer";
import {Color} from "../../lib/rendering/color";
import {EventBus} from "../../lib/event/eventBus";
import {KeyboardInput} from "../../lib/input/keyboard";

const bomberManImg = require("../../../resources/images/bombermanFace.png");
const logoImg = require("../../../resources/images/logo.png");

export class StartGame extends OverLayBase implements OverLayScreen {

    private _particles:Array<GameEntity>;
    private _particleSystem:ParticleSystem;
    private _bomberManFace:HTMLImageElement;
    private _logo:HTMLImageElement;
    protected _color:Color;

    constructor() {
        super();
        this.init();
    }

    public init(): void {
        this.enable();
        this._particles = new Array<GameEntity>();
        this._particleSystem = new ParticleSystem();
        this._bomberManFace = new Image();
        this._bomberManFace.src = bomberManImg;

        this._logo = new Image();
        this._logo.src = logoImg;

        this._color = new Color();
        this._color.setRed(255);
        this._color.setGreen(255);
        this._color.setBlue(255);

        for (let i = 0; i < 120; i++) {
            this._particles.push(ParticleFactory.getParticle("winningParticle", null, null));
        }
    }

    public gameLoop() : void {

        for (let i = 0; i < this._particles.length; i++) {
            this._particleSystem.process(this._particles[i]);
        }

        Renderer.getInstance().renderImage(
                this._bomberManFace,
                400,
                30,
                500,
            500
        );

        Renderer.getInstance().renderImage(
            this._logo,
            350,
            500,
            600,
            300
        );



        Renderer.getInstance().print("[ Press Enter ]", 650, 800, "Garamond", 30, this._color);

    }

    public keyboard(gameEvent: GameEvent) : void {

        if (gameEvent.payload === KeyboardInput.ENTER) {
            EventBus.getInstance().publish(new GameEvent("startGame", null));
        }

    }

    public isActive(): boolean {
        return this.getActive();
    }

    public disable(): void {
        this.setActive(false);
    }

    public enable(): void {
        this.setActive(true);
    }


}