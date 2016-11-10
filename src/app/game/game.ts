import * as Phaser from 'phaser';
import GameState from "./game_state";

export default class Game {
    private game: Phaser.Game;
    private gameState: Phaser.State;

    constructor() {
        this.gameState = new GameState();
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas');
        this.game.state.add('main', this.gameState, true);
    }
}
