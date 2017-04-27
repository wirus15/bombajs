import GameState from "./game_state";
import {ConstructorInject} from 'huject';
import BootState from "./boot_state";

@ConstructorInject
export default class Game {
    constructor(
        private game: Phaser.Game,
        private bootState: BootState,
        private gameState: GameState
    ) {
        this.game.state.add('boot', this.bootState);
        this.game.state.add('game', this.gameState);
    }

    public start() {
        this.game.state.start('boot');
    }
}
