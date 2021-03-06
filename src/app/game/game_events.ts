import {ConstructorInject} from 'huject';

@ConstructorInject
export default class GameEvents {
    readonly onGameOver: Phaser.Signal;
    readonly onBossAppear: Phaser.Signal;
    readonly onBossKilled: Phaser.Signal;
    readonly onPlayerKilled: Phaser.Signal;

    constructor() {
        this.onGameOver = new Phaser.Signal();
        this.onBossAppear = new Phaser.Signal();
        this.onBossKilled = new Phaser.Signal();
        this.onPlayerKilled = new Phaser.Signal();
    }
}
