import {GameComponent} from "./gameComponent";


export class WallComponent implements GameComponent {
    name(): string {
        return "wall";
    }

}