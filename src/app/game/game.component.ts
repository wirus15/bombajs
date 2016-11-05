import {Component} from "@angular/core";
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

    constructor() {
        this.game = new Phaser.Game(
            '100', '100',
            Phaser.AUTO,
            'gameCanvas',
            {
                preload: () => Assets.load(this.game),
                create: this.create.bind(this),
                update: this.update.bind(this),
                render: this.render.bind(this)
            }
        )
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.advancedTiming = true;
        this.game.add.audio(Assets.background_music_0, 1, true).play();

        this.background = new Background(this.game);
        this.player = new Player(this.game);
        this.player.onKilled.add(this.onPlayerKilled, this);
        this.enemies = new EnemyContainer(this.game);
        this.enemies.init(10);
        this.enemies.enemyKilled.add(this.onEnemyKilled, this);
    }

    update() {
        this.player.update();
        this.checkCollisions();
    }

    render() {
        this.game.debug.text(`FPS: ${this.game.time.fps}`, 20, 20);
        this.game.debug.text(`HP: ${this.player.health}`, this.game.width - 150, 20);
        this.game.debug.text(`LIVES: ${this.lives}`, this.game.width - 150, 40);
        this.game.debug.text(`POINTS: ${this.points}`, this.game.width - 150, 60);

        if (this.gameOver) {
            this.game.debug.text('GAME OVER', this.game.width / 2 - 45, this.game.height / 2);
        }
    }

    private checkCollisions() {
        this.game.physics.arcade.overlap(
            this.player.weapon.bullets,
            this.enemies.group,
            (bullet: Phaser.Sprite, enemy: Phaser.Sprite) => {
                bullet.kill();
                enemy.kill();
            }
        );

        this.game.physics.arcade.overlap(
            this.player.sprite,
            this.enemies.group,
            (player: Phaser.Sprite, enemy: Phaser.Sprite) => {
                enemy.kill();
                if (!player.data.isProtected) {
                    player.damage(20);
                }
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
