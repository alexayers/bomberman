
import { GameEvent } from "./gameEvent";

export class EventBus {

    private static _instance: EventBus;
    private _channels: Map<string, Array<EventHandler>>;

    private constructor() { }

    public static getInstance() {
        if (!EventBus._instance) {
            EventBus._instance = new EventBus();
            EventBus._instance._channels = new Map();
        }

        return EventBus._instance;
    }

    public register(channel: string, eventhandler: EventHandler): void {
        if (!this._channels.has(channel)) {
            //console.log("Creating new channel ->" + channel);
            this._channels.set(channel, new Array());
        }

        this._channels.get(channel).push(eventhandler);
    }

    public publish(gameEvent: GameEvent) {

        if (this._channels.has(gameEvent.channel)) {
            let listeners = this._channels.get(gameEvent.channel);

            for (let listener of listeners) {
                listener.handleEvent(gameEvent);
            }
        } else {
            console.log("No listeners registered for channel -> " + gameEvent.channel);
        }
    }
}

export interface EventHandler {
    handleEvent(gameEvent: GameEvent): void;
}