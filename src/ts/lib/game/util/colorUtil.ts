
export function RGBtoHex(red: number, green: number, blue: number) : string{
    return "#" + red.toString(16) + green.toString(16) + blue.toString(16);
}