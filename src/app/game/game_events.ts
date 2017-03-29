import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class GameEvents {
    public readonly onGameOver: Phaser.Signal;

    constructor(private game: Phaser.Game) {
        this.onGameOver = new Phaser.Signal();
    }
}
