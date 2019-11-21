export class PathNode {
    private _x: number;
    private _y: number;
    private _idx: number;
    private _parent: number;
    private _g: number;
    private _h: number;
    private _f: number;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getX(): number {
        return this._x;
    }

    public setX(x: number): void {
        this._x = x;
    }

    public getY(): number {
        return this._y;
    }

    public setY(y: number): void {
        this._y = y;
    }

    public getIdx(): number {
        return this._idx;
    }

    public setIdx(idx: number): void {
        this._idx = idx;
    }

    public getParent(): number {
        return this._parent;
    }

    public setParent(parent: number): void {
        this._parent = parent;
    }

    public getG(): number {
        return this._g;
    }

    public setG(g: number): void {
        this._g = g;
    }

    public getH(): number {
        return this._h;
    }

    public setH(h: number): void {
        this._h = h;
    }

    public getF(): number {
        return this._f;
    }

    public setF(f: number): void {
        this._f = f;
    }
}