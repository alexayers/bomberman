import {GameSystem} from "../game/system/gameSystem";


export function system() {
    return function(target: Function) {
        Framework.getInstance().registerSystemClass(target);
    }
}

export class Framework {
    private static _instance:Framework;
    private _systemClasses:Array<GameSystem>= [];

    public static getInstance(): Framework {
        if (this._instance === undefined) {
            this._instance = new Framework();
            this._instance.init();
        }

        return this._instance;
    }

    private init() : void {
        this._systemClasses = new Array<GameSystem>();
    }

    public registerSystemClass(target: Function) : void {
        console.log("Registering system class ->" + target.name);

        let guy = new target.prototype.constructor();
        this._systemClasses.push(guy);
    }

    public getSystemClasses(): Array<GameSystem> {

        return this._systemClasses;
    }

    private constructor() {}
}