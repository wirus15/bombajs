import * as Phaser from 'phaser';
import {injectable, decorate} from "inversify";
// import EnemyContainer from "./enemy_container";
import Background from "./background";
import BackgroundMusic from "./background_music";
// import GUI from "./gui";
import Assets from "./assets";
// import Enemy from "./enemy";
// import Collisions from "./collisions";
import Player from "./player";

@injectable()
export default class GameState extends Phaser.State {
    // public enemies: EnemyContainer;
    // public gui: GUI;
    public gameOver = false;
    // private collisions: Collisions;
    // private enemiesDestroyed = 0;

    constructor(
        private background: Background,
        private backgroundMusic: BackgroundMusic,
        private player: Player
    ) {
        super();
    }

    create() {
        this.background.create();
        this.backgroundMusic.create();
        this.backgroundMusic.play();
        this.player.create();

        // this.enemies = new EnemyContainer(this);
        // this.gui = new GUI(this);
        // this.collisions = new Collisions(this);



        // this.player.events.onKilled.add(this.onPlayerKilled, this);
        // this.enemies.enemyKilled.add(this.onEnemyKilled, this);
    }

    update() {
        this.player.update();
        // this.collisions.check();
        // this.player.update();
        // this.gui.update();
    }
    //
    // private onPlayerKilled() {
    //     if (this.lives > 0) {
    //         this.player.revive();
    //         this.lives--;
    //     } else {
    //         this.gameOver = true;
    //     }
    // }
    //
    // private onEnemyKilled(enemy: Enemy) {
    //     this.points += enemy.maxHealth;
    //     this.enemiesDestroyed++;
    //     this.calculateLevel();
    // }
    //
    // private calculateLevel() {
    //     const newLevel = 1 + Math.floor(this.enemiesDestroyed / 100);
    //     this.level = Math.min(newLevel, GameState.MAX_LEVEL);
    // }
}
