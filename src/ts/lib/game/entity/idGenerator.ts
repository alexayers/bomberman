
export class IdGenerator {
    private static _id: number;

    public static nextId() : number {
        this._id++;
        return this._id;
    }

}