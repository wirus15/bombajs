import {ConstructorInject, Container} from "huject";
import BootState from "./boot_state";
import GameState from "./game_state";

@ConstructorInject
export default class StateManager {
    private stateMap: Map<string, any>;

    constructor(
        private game: Phaser.Game,
        private container: Container
    ) {
        this.stateMap = new Map<string, any>();
        this.stateMap.set('boot', BootState);
        this.stateMap.set('game', GameState);
    }

    start(stateName: string) {
        const stateManager = this.game.state;
        if (!stateManager.states[stateName]) {
            const stateClass = this.stateMap.get(stateName);
            const state = this.container.resolve(stateClass);
            stateManager.add(stateName, state);
        }

        this.game.state.start(stateName);
    }
}
