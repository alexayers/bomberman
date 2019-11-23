

export class GameEvent {
    private readonly _channel: string;
    private readonly _payload: any;

    constructor(channel: string, payload: any) {
        this._channel = channel;
        this._payload = payload;
    }

    get channel() {
        return this._channel;
    }

    get payload() {
        return this._payload;
    }
}