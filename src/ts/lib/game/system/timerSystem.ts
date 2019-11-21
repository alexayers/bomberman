import {GameSystem} from "./gameSystem";
import {GameEntity} from "../entity/gameEntity";
import {TimerComponent} from "../component/timerComponent";
import {AnimateComponent} from "../component/animateComponent";

export class TimerSystem implements GameSystem {

    process(gameEntity: GameEntity): void {

        if (gameEntity.hasComponent("timer")) {
            let timer : TimerComponent = gameEntity.getComponent("timer") as TimerComponent;
            timer.setTimer(timer.getTimer() - 1);

            let animate : AnimateComponent = new AnimateComponent();
            gameEntity.addComponent(animate);

            if (timer.getTimer() <= 0) {
                gameEntity.removeComponent("timer");
                gameEntity.removeComponent("animation");

                if (timer !== undefined) {
                    timer.getCallBack()(gameEntity);
                }
            }

        }

    }

}