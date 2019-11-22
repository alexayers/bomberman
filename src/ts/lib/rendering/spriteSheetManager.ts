import {SpriteSheet} from "./spriteSheet";

const playerSprites = require("../../../resources/images/player.png");
const playerDefinition = require("../../../resources/images/player.json");

const level1Sprites = require("../../../resources/images/level1.png");
const level1Definition = require("../../../resources/images/level1.json");

export class SpriteSheetManager {
    private static _instance: SpriteSheetManager;
    private _spriteSheets:Map<string, SpriteSheet>;

    public static getInstance() : SpriteSheetManager {

        if (this._instance === undefined) {
            this._instance = new SpriteSheetManager();
            this._instance._spriteSheets = new Map();
            this._instance.init();
        }

        return this._instance;
    }

    private constructor() {

    }

    private init(): void {
        let playerSpriteSheet : SpriteSheet = new SpriteSheet(playerDefinition);
        playerSpriteSheet.load(playerSprites);
        this.register("players", playerSpriteSheet);

        let levelSpriteSheet : SpriteSheet = new SpriteSheet(level1Definition);
        levelSpriteSheet.load(level1Sprites);
        this.register("level", levelSpriteSheet);


        console.log("Loaded sprite sheets");
    }

    public register(name : string, spriteSheet:SpriteSheet) : void {
        console.log("Sprite Sheet ->" + name + " = " + spriteSheet);
        this._spriteSheets.set(name, spriteSheet);
    }

    public getSpriteSheet(name: string) : SpriteSheet {
        return this._spriteSheets.get(name);
    }
}