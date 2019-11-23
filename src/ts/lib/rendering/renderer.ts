import {Sprite} from "./spriteSheet";
import {Color} from "./color";
import {RGBtoHex} from "../game/util/colorUtil";
import {GameMap} from "../game/map/gameMap";

export interface RenderingEffect {
    offsetX:number,
    offsetY:number,
    width:number,
    height:number,
    color:Color
}

export class Renderer {
    private static _canvas: HTMLCanvasElement;
    private static _ctx: CanvasRenderingContext2D;
    private static _renderingEffects:RenderingEffect;
    private static _spriteWidth:number;
    private static _spriteHeight:number;

    public static init() {
        Renderer._canvas = document.getElementById('canvas') as
            HTMLCanvasElement;

        Renderer._ctx = Renderer._canvas.getContext("2d");
        Renderer._ctx.imageSmoothingEnabled = false;
        Renderer._renderingEffects = {
            offsetX: 0,
            offsetY: 0,
            width:0,
            height: 0,
            color: new Color()
        };

        Renderer._spriteWidth = 32;
        Renderer._spriteHeight = 32;
    }

    static clearScreen() : void {
        Renderer._ctx.clearRect(0,0,Renderer._canvas.width, Renderer._canvas.height);
    }

    static setColor(color: Color): void {
        Renderer._ctx.fillStyle = RGBtoHex(color.getRed(), color.getGreen(), color.getBlue());
    }

    static render(sprite: Sprite, image:HTMLImageElement,x: number, y: number): void {

        try {

            Renderer._ctx.drawImage(
                image,
                sprite.x,
                sprite.y,
                24,
                24,
                x + Renderer._renderingEffects.offsetX + Renderer.getRenderOffsetX(),
                y +Renderer._renderingEffects.offsetY  + Renderer.getRenderOffsetY(),
                Renderer._spriteWidth + Renderer._renderingEffects.width,
                Renderer._spriteHeight + Renderer._renderingEffects.height
            );
        } catch (e) {
            Error("Unable to render");
        }
    }

    public static getRenderOffsetY(): number {
        return 0;
    }

    public static getRenderOffsetX(): number {
        return 0;
    }


    static finalRender() : void {
        let restoreRate : number = 4;

        if (Renderer._renderingEffects.height > 0) {
            Renderer._renderingEffects.height-=restoreRate;
        }

        if (Renderer._renderingEffects.height < 0) {
            Renderer._renderingEffects.height = 0;
        }

        if (Renderer._renderingEffects.width > 0) {
            Renderer._renderingEffects.width-=restoreRate;
        }

        if (Renderer._renderingEffects.width < 0) {
            Renderer._renderingEffects.width = 0;
        }

        if (Renderer._renderingEffects.offsetX > 0) {
            Renderer._renderingEffects.offsetX-=restoreRate;
        }

        if (Renderer._renderingEffects.offsetX < 0) {
            Renderer._renderingEffects.offsetX = 0;
        }

        if (Renderer._renderingEffects.offsetY > 0) {
            Renderer._renderingEffects.offsetY-=restoreRate;
        }

        if (Renderer._renderingEffects.offsetY < 0) {
            Renderer._renderingEffects.offsetY = 0;
        }

        if (Renderer._renderingEffects.color.getAlpha() > 0) {
            Renderer._renderingEffects.color.setAlpha(Renderer._renderingEffects.color.getAlpha() - 1);
        } else if (Renderer._renderingEffects.height < 0) {
            Renderer._renderingEffects.height = 0;
        }
    }

    public static resize() {
        if (Renderer._canvas !== undefined) {
            Renderer._canvas.width = window.innerWidth;
            Renderer._canvas.height = window.innerHeight;
            Renderer._ctx.imageSmoothingEnabled = false;
            Renderer._spriteWidth = Renderer._canvas.width / GameMap.getWidth();
            Renderer._spriteHeight = Renderer._canvas.height / GameMap.getHeight();
        }
    }

    static addRenderingEffect(renderingEffect: RenderingEffect): void {
        Renderer._renderingEffects = renderingEffect;
    }

    static renderImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        Renderer._ctx.drawImage(
            image,
            x,
            y,
            width,
            height
        );
    }

    static print(msg: string, x: number, y: number, font: string, fontSize: number, color: Color) : void {
        Renderer._ctx.font = fontSize + "px " + font;
        Renderer._ctx.fillStyle = RGBtoHex(color.getRed(),color.getGreen(),color.getBlue());
        Renderer._ctx.fillText(msg, x, y);
    }

    static getSpriteWidth() : number {
        return this._spriteWidth;
    }

    static getSpriteHeight() : number {
        return this._spriteHeight;
    }

    static fillAndClosePath() {
        Renderer._ctx.fill();
        Renderer._ctx.closePath();
    }

    static beginPath() {
        Renderer._ctx.beginPath();
    }

    static rect(x: number, y: number, width: number, height: number) {
        Renderer._ctx.rect(
            x,
            y,
            width,
            height
        );
    }

    static setAlpha(alpha: number) {
        Renderer._ctx.globalAlpha = alpha;
    }

    static getCanvasWidth() : number{
        return Renderer._canvas.width;
    }

    static getCanvasHeight() : number {
        return Renderer._canvas.height;
    }
}