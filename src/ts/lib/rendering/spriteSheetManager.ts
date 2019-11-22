import {SpriteSheet} from "./spriteSheet";

const playerSprites = require("../../../resources/images/player.png");
const playerDefinition = require("../../../resources/images/player.json");

const level1Sprites = require("../../../resources/images/level1.png");
const level1Definition = require("../../../resources/images/level1.json");

export class SpriteSheetManager {

    private static _spriteSheets:Map<string, SpriteSheet> = new Map<string, SpriteSheet>();

    public static init(): void {
        let playerSpriteSheet : SpriteSheet = new SpriteSheet(playerDefinition);
        playerSpriteSheet.load(playerSprites);
        SpriteSheetManager.register("players", playerSpriteSheet);

        let levelSpriteSheet : SpriteSheet = new SpriteSheet(level1Definition);
        levelSpriteSheet.load(level1Sprites);
        SpriteSheetManager.register("level", levelSpriteSheet);


        console.log("Loaded sprite sheets");
    }

    public static register(name : string, spriteSheet:SpriteSheet) : void {
        console.log("Sprite Sheet ->" + name + " = " + spriteSheet);
        SpriteSheetManager._spriteSheets.set(name, spriteSheet);
    }

    public static getSpriteSheet(name: string) : SpriteSheet {
        return SpriteSheetManager._spriteSheets.get(name);
    }
}