import * as Phaser from 'phaser';
import GameState from "./game_state";
import {injectable} from "inversify";

@injectable()
export default class Game {
    constructor(
        private game: Phaser.Game,
        private gameState: GameState
    ) {
        this.game.state.add('main', this.gameState, true);
    }
}
