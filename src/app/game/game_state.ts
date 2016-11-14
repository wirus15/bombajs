import * as Phaser from 'phaser';
import Player from "./player";
import EnemyContainer from "./enemy_container";
import Background from "./background";
import BackgroundMusic from "./background_music";
import GUI from "./gui";
import Assets from "./assets";
import Enemy from "./enemy";
import Collisions from "./collisions";

export default class GameState extends Phaser.State {
    public player: Player;
    public enemies: EnemyContainer;
    public gui: GUI;
    public points = 0;
    public lives = 3;
    public gameOver = false;
    private background: Background;
    private backgroundMusic: BackgroundMusic;
    private collisions: Collisions;

    preload() {
        Assets.load(this.game);
    }

    create() {
        this.player = new Player(this.game);
        this.enemies = new EnemyContainer(this.game);
        this.background = new Background(this.game);
        this.backgroundMusic = new BackgroundMusic(this.game);
        this.gui = new GUI(this);
        this.collisions = new Collisions(this);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.time.advancedTiming = true;

        this.player.onKilled.add(this.onPlayerKilled, this);
        this.enemies.enemyKilled.add(this.onEnemyKilled, this);
        this.backgroundMusic.play();
    }

    update() {
        this.collisions.check();
        this.player.update();
        this.gui.update();
    }

    private onPlayerKilled() {
        if (this.lives > 0) {
            this.player.revive();
            this.lives--;
        } else {
            this.gameOver = true;
        }
    }

    private onEnemyKilled(enemy: Enemy) {
        this.points += enemy.health;
    }
}
