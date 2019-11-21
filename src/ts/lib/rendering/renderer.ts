import {Sprite} from "./spriteSheet";
import {EventBus, EventHandler} from "../event/eventBus";
import {GameEvent} from "../event/gameEvent";
import {Color} from "./Color";

export interface RenderingEffect {
    offsetX:number,
    offsetY:number,
    width:number,
    height:number,
    color:Color
}

export class Renderer implements EventHandler  {
    private static _instance:Renderer;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _height: number = window.innerHeight;
    private _width: number = window.innerWidth;
    private _renderingEffects:RenderingEffect;
    private _spriteSize:number;

    public static getInstance() : Renderer {

        if (this._instance === undefined) {
            this._instance = new Renderer();
        }

        return this._instance;
    }

    private constructor() {
        this._canvas = document.getElementById('canvas') as
            HTMLCanvasElement;

        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._ctx = this._canvas.getContext("2d");
        this._ctx.imageSmoothingEnabled = false;
        this._renderingEffects = {
            offsetX: 0,
            offsetY: 0,
            width:0,
            height: 0,
            color: new Color()
        };

        this._spriteSize = 64;
        EventBus.getInstance().register("rendering", this);

    }

    clearScreen() {
        this._ctx.clearRect(0,0,this._canvas.width, this._canvas.height);
    }

    render(sprite: Sprite, image:HTMLImageElement,x: number, y: number): void {

        try {

            if (this._renderingEffects.color != null && this._renderingEffects.color.getAlpha() > 0) {
           //     this._ctx.globalAlpha = this._renderingEffects.color.getAlpha() / 1000;
           //     this._ctx.fillStyle = RGBtoHex(this._renderingEffects.color.getRed(),this._renderingEffects.color.getGreen(),this._renderingEffects.color.getBlue())
            }

            this._ctx.drawImage(
                image,
                sprite.x,
                sprite.y,
                24,
                24,
                x + this._renderingEffects.offsetX,
                y +this._renderingEffects.offsetY,
                this._spriteSize + this._renderingEffects.width,
                this._spriteSize + this._renderingEffects.height
            );
        } catch (e) {
            Error("Unable to render");
        }
    }



    finalRender() : void {
        let restoreRate : number = 4;

        if (this._renderingEffects.height > 0) {
            this._renderingEffects.height-=restoreRate;
        }

        if (this._renderingEffects.height < 0) {
            this._renderingEffects.height = 0;
        }

        if (this._renderingEffects.width > 0) {
            this._renderingEffects.width-=restoreRate;
        }

        if (this._renderingEffects.width < 0) {
            this._renderingEffects.width = 0;
        }

        if (this._renderingEffects.offsetX > 0) {
            this._renderingEffects.offsetX-=restoreRate;
        }

        if (this._renderingEffects.offsetX < 0) {
            this._renderingEffects.offsetX = 0;
        }

        if (this._renderingEffects.offsetY > 0) {
            this._renderingEffects.offsetY-=restoreRate;
        }

        if (this._renderingEffects.offsetY < 0) {
            this._renderingEffects.offsetY = 0;
        }

        if (this._renderingEffects.color.getAlpha() > 0) {
            this._renderingEffects.color.setAlpha(this._renderingEffects.color.getAlpha() - 1);
        } else if (this._renderingEffects.height < 0) {
            this._renderingEffects.height = 0;
        }
    }

    public resize() {
        if (this._canvas !== undefined) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this._ctx.imageSmoothingEnabled = false;
        }
    }

    handleEvent(gameEvent: GameEvent): void {
        this._renderingEffects = gameEvent.payload;
    }
}