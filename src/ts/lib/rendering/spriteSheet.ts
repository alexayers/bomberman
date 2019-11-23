import {Renderer} from "./renderer";

export interface Sprite {
    name: string,
    x: number,
    y: number
}

export interface SpriteSeries {
    name: string;
    definition: Sprite[];
}

export interface SpriteSheetDefinition {
    filename: string;
    sprites: SpriteSeries[];
}

export class SpriteSheet {
    _image: HTMLImageElement;
    _spriteSheetDefinition: SpriteSheetDefinition;
    _spriteCache: Map<string, Sprite>;

    constructor(spriteSheetDefinition:SpriteSheetDefinition) {
        this._spriteSheetDefinition = spriteSheetDefinition;
        this._spriteCache = new Map<string, Sprite>();
    }

    public load(imageFilename: string) {
        this._image = new Image();
        this._image.src = imageFilename;
    }

    public getSprite(spriteName: string, frameName: string) : Sprite {

        if (this._spriteCache.has(spriteName + "#" + frameName)) {
            return this._spriteCache.get(spriteName + "#" + frameName);
        }

        for (let i = 0; i < this._spriteSheetDefinition.sprites.length; i++) {
            if (this._spriteSheetDefinition.sprites[i].name === spriteName) {
                for (let j = 0; j < this._spriteSheetDefinition.sprites[i].definition.length; j++) {
                    if (this._spriteSheetDefinition.sprites[i].definition[j].name === frameName) {

                        this._spriteCache.set(spriteName + "#" + frameName, this._spriteSheetDefinition.sprites[i].definition[j]);
                        return this._spriteSheetDefinition.sprites[i].definition[j];
                    }
                }

                throw Error("Unable to find frameName ->" + frameName);
            }
        }

        throw Error("Unable to find sprite ->" + spriteName);
    }

    public getImage(): HTMLImageElement {
        return this._image;
    }

    public render(ctx: CanvasRenderingContext2D, sprite: Sprite, x: number, y: number) {
        Renderer
            .render(sprite, this._image, x,y);
    }



}