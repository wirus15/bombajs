import * as Phaser from 'phaser';

export default class GameAware {
    protected readonly game: Phaser.Game;

    constructor(game: Phaser.Game) {
        this.game = game;
    }
}
