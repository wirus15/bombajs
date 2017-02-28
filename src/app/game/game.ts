import * as Phaser from 'phaser';
import GameState from "./game_state";
import {injectable} from "inversify";
import BootState from "./boot_state";

@injectable()
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
