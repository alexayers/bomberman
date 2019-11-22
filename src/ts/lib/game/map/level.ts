import {GameEntity} from "../entity/gameEntity";


export interface Level {
    getMap(): Map<string, Array<GameEntity>>;
    addParticle(gameEntity:GameEntity) : void;
    getParticles() : Array<GameEntity>;
}