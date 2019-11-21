

export function getDecimal(n:number) : number {
    return (n - Math.floor(n));
}

export function getRandomInt(max: number) : number {
    return Math.floor(Math.random() * (max - 1 + 1) + 1);
}

export function getRandomBetween(min: number, max: number) : number {
    return Math.floor(Math.random() * (max - 1 + min) + min);
}

export function getRandomArrayElement(array: Array<any>) : number {
    return getRandomBetween(0, array.length);
}

export function positiveNegative() : number {
    if (getRandomInt(10) > 5) {
        return -1;
    } else {
        return 1;
    }
}

export interface Point {
    x: number,
    y: number
}