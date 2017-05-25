import {ConstructorInject} from 'huject';
import BootState from "./boot_state";
import GameState from "./game_state";

@ConstructorInject
export default class Game {
    constructor(
        private game: Phaser.Game,
        private bootState: BootState,
        private gameState: GameState
    ) {}

    start() {
        this.game.state.add('boot', this.bootState);
        this.game.state.add('game', this.gameState);

        this.game.state.start('boot');
    }
}
