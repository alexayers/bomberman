import {EventBus} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {AudioFile} from "./audioFile";

const music = require("../../../resources/audio/music.ogg");
const explosion = require("../../../resources/audio/explosion.ogg");

export class AudioManager {
    private static _soundMap : Map<string, AudioFile> = new Map<string, AudioFile>();


    public static init() : void {
        let soundCheck = new Audio();

        AudioManager.register("music",music, true);
        AudioManager.register("explosion1", explosion);
        AudioManager.register("explosion2", explosion);
        AudioManager.register("explosion3", explosion);

        if (!soundCheck.canPlayType('audio/ogg')) {
           Error("Your browser doesn't support audio/ogg");
        }

        EventBus.register("audio", AudioManager.handleEvent);
    }

    private static register(name: string, audioFile: string, loop: boolean = false) : void {
        AudioManager._soundMap.set(name, new AudioFile(audioFile, loop));
    }

    public static play(name: string) : void {
        AudioManager._soundMap.get(name).play();
    }

    public static handleEvent(gameEvent: GameEvent): void {
        AudioManager.play(gameEvent.payload);
    }




}