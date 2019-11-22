import {EventBus, EventHandler} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {AudioFile} from "./audioFile";

const music = require("../../../resources/audio/music.ogg");
const explosion = require("../../../resources/audio/explosion.ogg");

export class AudioManager implements EventHandler {
    private static _instance:AudioManager;
    private _soundMap : Map<string, AudioFile>;

    public static getInstance() : AudioManager {
        if (this._instance === undefined) {
            this._instance = new AudioManager();
            this._instance._soundMap = new Map<string, AudioFile>();
            this._instance.init();
        }

        return this._instance;
    }

    private init() : void {
        let soundCheck = new Audio();

        this.register("music",music, true);
        this.register("explosion1", explosion);
        this.register("explosion2", explosion);
        this.register("explosion3", explosion);

        if (!soundCheck.canPlayType('audio/ogg')) {
           Error("Your browser doesn't support audio/ogg");
        }
    }

    private register(name: string, audioFile: string, loop: boolean = false) : void {
        this._soundMap.set(name, new AudioFile(audioFile, loop));
    }

    public play(name: string) : void {
        //this._soundMap.get(name).play();
    }

    private constructor() {
        EventBus.getInstance().register("audio", this);
    }



    handleEvent(gameEvent: GameEvent): void {
        this.play(gameEvent.payload);
    }




}