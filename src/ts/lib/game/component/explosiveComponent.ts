import {GameComponent} from "./gameComponent";

export class ExplosiveComponent implements GameComponent {

    private _area: number;

    constructor() {
        this._area = 1;
    }

    name(): string {
        return "explosive";
    }

    public getArea() : number {
        return this._area;
    }

    public setArea(area:number) : void {
        this._area = area;
    }


}