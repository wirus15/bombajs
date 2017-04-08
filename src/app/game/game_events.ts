import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class GameEvents {
    public readonly onGameOver: Phaser.Signal;
    public readonly onBossAppear: Phaser.Signal;
    public readonly onBossKilled: Phaser.Signal;

    constructor(private game: Phaser.Game) {
        this.onGameOver = new Phaser.Signal();
        this.onBossAppear = new Phaser.Signal();
        this.onBossKilled = new Phaser.Signal();
    }
}
