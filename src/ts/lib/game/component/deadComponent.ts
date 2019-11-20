import {GameComponent} from "./gameComponent";

export class DeadComponent implements GameComponent {

    constructor() {
    }

    name(): string {
        return "dead";
    }

}