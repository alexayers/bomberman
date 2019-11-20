
export class IdGenerator {
    private static _id: number = 0;

    public static nextId() : number {
        this._id++;
        return this._id;
    }

}