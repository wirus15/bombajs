import * as Phaser from 'phaser';
import Player from "./player";
import EnemyContainer from "./enemy_container";
import Background from "./background";
import BackgroundMusic from "./background_music";
import Assets from './assets';
import Enemy from './enemy';
import GUI from "./gui";

export default class Game extends Phaser.Game {
    public readonly player: Player;
    public readonly enemies: EnemyContainer;
    public readonly background: Background;
    public readonly backgroundMusic: BackgroundMusic;
    public readonly gui: GUI;
    public points = 0;
    public lives = 3;
    public gameOver = false;

    constructor(width: number, height: number, renderer: number, parent: any) {
        super(width, height, renderer, parent, {
            preload: this.preload.bind(this),
            create: this.init.bind(this),
            update: this.update.bind(this)
        });
        this.player = new Player(this);
        this.enemies = new EnemyContainer(this);
        this.background = new Background(this);
        this.backgroundMusic = new BackgroundMusic(this);
        this.gui = new GUI(this);
    }

    preload() {
        Assets.load(this);
    }

    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.time.advancedTiming = true;

        this.player.onKilled.add(this.onPlayerKilled, this);
        this.enemies.init(10);
        this.enemies.enemyKilled.add(this.onEnemyKilled, this);
        this.backgroundMusic.play();
    }

    update() {
        this.checkCollisions();
        this.player.update();
        this.gui.update();
    }

    private checkCollisions() {
        this.physics.arcade.overlap(
            this.player.weapon.bullets,
            this.enemies.group,
            (bullet: Phaser.Sprite, enemy: Phaser.Sprite) => {
                bullet.kill();
                enemy.data.object.hit(this.player.weapon.power);
            }
        );

        this.physics.arcade.overlap(
            this.player.sprite,
            this.enemies.group,
            (player: Phaser.Sprite, enemy: Phaser.Sprite) => {
                enemy.kill();
                player.data.object.hit(enemy.health);
            }
        );
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
