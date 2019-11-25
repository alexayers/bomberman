

export class WebStorage {

    public static init() {

        if (window.localStorage) {
            console.log("LocalStorage supported");
        } else {
            Error("You need a browser that supports LocalStorage");
        }
    }

    public static saveObject(key: string, object: Object) {
        try {
            localStorage.setItem(key, JSON.stringify(object));
        } catch (e) {
            if (e === "QUOTA_EXCEEDED_ERR") {
                Error("Storage Limit exceeded");
            }
        }
    }

    public static getObject(key: string) : Object {
        return JSON.parse(localStorage.getItem(key));
    }

    static doesKeyExist(key: string) : boolean {
         return localStorage.getItem(key) !== null;
    }
}