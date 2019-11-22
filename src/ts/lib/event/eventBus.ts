
import { GameEvent } from "./gameEvent";

export class EventBus {

    private static _channels: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    public static register(channel: string, eventhandler: Function): void {
        if (!this._channels.has(channel)) {
            console.log("Creating new channel ->" + channel);
            this._channels.set(channel, new Array());
        }

        this._channels.get(channel).push(eventhandler);
    }

    public static publish(gameEvent: GameEvent) {

        if (this._channels.has(gameEvent.channel)) {
            let listeners = this._channels.get(gameEvent.channel);

            for (let listener of listeners) {
                try {
                    listener(gameEvent);
                } catch (e) {
                    console.error("Incorrectly defined handler -> ", e);
                }
            }
        } else {
            console.log("No listeners registered for channel -> " + gameEvent.channel);
        }
    }
}
