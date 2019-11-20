import {GameComponent} from "./gameComponent";


export class TimerComponent implements GameComponent {

    private _timer: number = 5;
    private _callBack:Function;

    public getTimer() : number {
        return this._timer;
    }

    name(): string {
        return "timer";
    }

    setTimer(timer: number) : void {
        this._timer = timer;
    }

    setCallback(callBack:Function) : void {
        this._callBack = callBack;
    }

    getCallBack() : Function {
        return this._callBack;
    }
}