import {GameComponent} from "./gameComponent";

export class EnemyComponent implements GameComponent {

    private _enemyName:string;

    constructor() {
        this._enemyName = null;
    }

    name(): string {
        return "enemy";
    }

   public setEnemyName(enemyName: string) : void {
        this._enemyName = enemyName;
   }

   public getEnemyName() : string {
        return this._enemyName;
   }



}