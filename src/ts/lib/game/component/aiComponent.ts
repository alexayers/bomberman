import {GameComponent} from "./gameComponent";

export class AiComponent implements GameComponent {

    private _lastMove:number;

    constructor() {
        this._lastMove = new Date().getTime();
    }

    name(): string {
        return "ai";
    }

    public updateMove() : void {
        this._lastMove = new Date().getTime();
    }

    public getLastMove() : number {
        return this._lastMove;
    }



}