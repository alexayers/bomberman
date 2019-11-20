import {GameSystem} from "./gameSystem";
import {CollisionSystem} from "./collisionSystem";
import {RenderSystem} from "./renderSystem";
import {TimerSystem} from "./timerSystem";
import {AttackSystem} from "./attackSystem";
import {DamageSystem} from "./damageSystem";


export class SystemManager {

    private static _instance:SystemManager;
    private _gameSystems:Array<GameSystem>;

    public static getInstance() : SystemManager {
        if (this._instance === undefined) {
            this._instance = new SystemManager();
            this._instance._gameSystems = new Array<GameSystem>();
            this._instance.init();
        }

        return this._instance;
    }

    private init() : void {
        this.register(new CollisionSystem());
        this.register(new TimerSystem());
        this.register(new AttackSystem());
        this.register(new DamageSystem());


        this.register(new RenderSystem());

    }

    private constructor() {

    }

    public register(gameSystem: GameSystem) : void {
        this._gameSystems.push(gameSystem);
    }

    public getSystems() : Array<GameSystem> {
        return this._gameSystems;
    }

}