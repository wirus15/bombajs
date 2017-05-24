import * as Phaser from "phaser";
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class GameEvents {
    readonly onGameOver: Phaser.Signal;
    readonly onBossAppear: Phaser.Signal;
    readonly onBossKilled: Phaser.Signal;
    readonly onPlayerKilled: Phaser.Signal;

    constructor(private game: Phaser.Game) {
        this.onGameOver = new Phaser.Signal();
        this.onBossAppear = new Phaser.Signal();
        this.onBossKilled = new Phaser.Signal();
        this.onPlayerKilled = new Phaser.Signal();
    }
}
