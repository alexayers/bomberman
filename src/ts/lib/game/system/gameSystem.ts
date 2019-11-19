import {GameEntity} from "../entity/gameEntity";


export interface GameSystem {

    process(gameEntity:GameEntity) : void;
}