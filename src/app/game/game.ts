import StateManager from "./state_manager";
import ServiceLoader from "./service_loader";
import {Container} from "huject";

export default class Game {
    private game: Phaser.Game;
    private stateManager: StateManager;

    constructor(container: Container) {
        ServiceLoader.load(container);
        this.game = container.resolve(Phaser.Game);
        this.stateManager = container.resolve(StateManager);
    }

    get ready(): Promise<Game> {
        return new Promise((resolve: Function) => {
            const interval = setInterval(() => {
                if (this.game.isBooted && this.game.isRunning) {
                    resolve(this.game);
                    clearInterval(interval);
                }
            }, 100);
        });
    }

    start() {
        this.ready.then(() => {
            this.stateManager.start('boot')
        });
    }
}
