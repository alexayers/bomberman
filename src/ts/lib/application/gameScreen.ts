import {GameEvent} from "../event/gameEvent";


export interface GameScreen  {
    init(): void;
    gameLoop(): void;
    keyboard(gameEvent:GameEvent): void;
}