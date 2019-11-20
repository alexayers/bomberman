

export class Color {
    private _red: number;
    private _green:number;
    private _blue:number;
    private _alpha:number;

    public setRed(red: number) : void {
        this._red = red;
    }

    public getRed() : number {
        return this._red;
    }

    public setGreen(green:number) : void {
        this._green = green;
    }

    public getGreen() : number {
        return this._green;
    }

    public setBlue(blue:number): void {
        this._blue = blue;
    }

    public getBlue() : number {
        return this._blue;
    }

    public setAlpha(alpha: number) : void {
        this._alpha = alpha;
    }

    public getAlpha() : number {
        return this._alpha;
    }
}