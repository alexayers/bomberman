

export class Renderer {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _height: number = window.innerHeight;
    private _width: number = window.innerWidth;


    constructor() {
        this._canvas = document.getElementById('canvas') as
            HTMLCanvasElement;

        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._ctx = this._canvas.getContext("2d");
        this._ctx.imageSmoothingEnabled = false;


    }

    clearScreen() {
        this._ctx.clearRect(0,0,this._canvas.width, this._canvas.height);
    }

    render() {




    }

    public resize() {
        if (this._canvas !== undefined) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this._ctx.imageSmoothingEnabled = false;
        }
    }
}