import {GameEvent} from "../event/gameEvent";


export interface OverLayScreen  {
    init(): void;
    gameLoop(): void;
    keyboard(gameEvent:GameEvent): void;
    isActive(): boolean;
    enable(): void;
    disable(): void;
}

export class OverLayBase  {
    protected _active: boolean;

    public setActive(active: boolean) : void {
        this._active = active;
    }

    public getActive() : boolean {
        return this._active;
    }
}