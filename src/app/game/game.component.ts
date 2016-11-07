import {Component, style} from "@angular/core";
import * as Phaser from 'phaser';
import Background from './background';
import Player from './player';
import Assets from './assets';
import EnemyContainer from "./enemy_container";
import Enemy from "./enemy";

@Component({
    selector: 'b-game',
    template: '<div id="gameCanvas"></div>'
})
export class GameComponent {
    private game: Phaser.Game;
    private player: Player;
    private enemies: EnemyContainer;
    private background: Background;
    private points = 0;
    private lives = 3;
    private gameOver = false;
    private textFps: Phaser.Text;
    private textHp: Phaser.Text;
    private textPoints: Phaser.Text;
    private textLives: Phaser.Text;
    private textGameOver: Phaser.Text;

    constructor() {
        this.game = new Phaser.Game(
            800, 600,
            Phaser.AUTO,
            'gameCanvas',
            {
                preload: () => Assets.load(this.game),
                create: this.create.bind(this),
                update: this.update.bind(this)
            }
        )
    }

    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.advancedTiming = true;
        this.game.add.audio(Assets.background_music_0, 1, true).play();

        this.background = new Background(this.game);
        this.player = new Player(this.game);
        this.player.onKilled.add(this.onPlayerKilled, this);
        this.enemies = new EnemyContainer(this.game);
        this.enemies.init(10);
        this.enemies.enemyKilled.add(this.onEnemyKilled, this);

        const style = {font: "16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top" };
        this.textFps = this.game.add.text(0, 20, '', style);
        this.textHp = this.game.add.text(this.game.width - 150, 20, '', style);
        this.textPoints = this.game.add.text(this.game.width - 150, 40, '', style);
        this.textLives = this.game.add.text(this.game.width - 150, 60, '', style);
        this.textGameOver = this.game.add.text(0, 0, 'GAME OVER', {
            font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle"
        });
        this.textGameOver.setTextBounds(0, 0, this.game.width, this.game.height);
    }

    update() {
        this.player.update();
        this.checkCollisions();
        this.textFps.text = `FPS: ${this.game.time.fps}`;
        this.textHp.text = `HP: ${this.player.health}`;
        this.textLives.text = `LIVES: ${this.lives}`;
        this.textPoints.text = `POINTS: ${this.points}`;
        this.textGameOver.visible = this.gameOver;
    }

    private checkCollisions() {
        this.game.physics.arcade.overlap(
            this.player.weapon.bullets,
            this.enemies.group,
            (bullet: Phaser.Sprite, enemy: Phaser.Sprite) => {
                bullet.kill();
                enemy.data.object.hit(this.player.weapon.power);
            }
        );

        this.game.physics.arcade.overlap(
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
        this.points += 20;
    }
}
