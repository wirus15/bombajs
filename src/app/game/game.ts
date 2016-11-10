import * as Phaser from 'phaser';
import GameState from "./game_state";

export default class Game extends Phaser.Game {
    private gameState: Phaser.State;

    constructor(width: number, height: number, renderer: number, parent: any) {
        super(width, height, renderer, parent);
        this.gameState = new GameState();
        this.state.add('main', this.gameState, true);
    }
}
