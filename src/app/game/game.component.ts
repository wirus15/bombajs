/// <reference path="../../../node_modules/phaser/typescript/phaser.comments.d.ts"/>

import {Component} from "@angular/core";
import * as Phaser from 'phaser';

@Component({
    selector: 'b-game',
    template: '<div id="gameCanvas"></div>'
})
export class GameComponent {
    private game: Phaser.Game;
    private player: Phaser.Sprite;
    private cursors: Phaser.CursorKeys;
    private weapon: Phaser.Weapon;
    private fireButton: Phaser.Key;
    private playerSpeed = 300;
    private stars: Phaser.Particles.Arcade.Emitter;
    private enemies: Phaser.Group;
    private explosions: Phaser.Group;
    private backgroundMusic: Phaser.Sound;
    private explosionSound: Phaser.Sound;

    constructor() {
        this.game = new Phaser.Game(
            '100', '100',
            Phaser.AUTO,
            'gameCanvas',
            {
                preload: this.preload.bind(this),
                create: this.create.bind(this),
                update: this.update.bind(this)
            }
        )
    }

    preload() {
        this.game.load.image('ship_player', 'public/images/ship_player.png');
        this.game.load.image('missle_player_0', 'public/images/missle_player_0.png');
        this.game.load.image('ship_normal_01', 'public/images/ship_normal_01.png');
        this.game.load.spritesheet('explosion', 'public/images/explosion.png', 71, 100);
        this.game.load.audio('background_music_0', 'public/audio/background_music_0.wav');
        this.game.load.audio('explosion', 'public/audio/explosion.wav');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = this.game.add.sprite(0, 0, 'ship_player');
        this.player.left = (this.game.width - this.player.width) / 2;
        this.player.top = this.game.height - this.player.height - 50;
        this.game.physics.arcade.enable(this.player);

        this.weapon = this.game.add.weapon(30, 'missle_player_0');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletAngleOffset = 90;
        this.weapon.bulletSpeed = 800;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.player, 44, 0);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        let star = this.game.add
            .bitmapData(1, 1, 'star')
            .setPixel(0, 0, 255, 255, 255);

        this.stars = this.game.add.emitter(this.game.world.centerX, 0, 200);
        this.stars.width = this.game.world.width;
        this.stars.makeParticles(star);
        this.stars.minParticleScale = 1;
        this.stars.maxParticleScale = 3;
        this.stars.setYSpeed(100, 400);
        this.stars.setXSpeed(0, 0);
        this.stars.start(false, 3000, 5, 0);

        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * this.game.width;
            let enemy = this.enemies.create(x, -Math.random()*this.game.height, 'ship_normal_01');
            enemy.checkWorldBounds = true;
            enemy.events.onOutOfBounds.add(this.resetEnemy, this);
            enemy.body.velocity.y = 100 + Math.random() * 200;
            enemy.body.velocity.x = 50 - Math.random() * 100;
            enemy.anchor.x = 0.5;
            enemy.anchor.y = 0.5;
        }

        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'explosion');
        this.explosions.forEach((explosion: Phaser.Sprite) => {
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;
            explosion.animations.add('explosion');
        }, this);

        this.backgroundMusic = this.game.add.audio('background_music_0', 1, true);
        this.backgroundMusic.play();

        this.explosionSound = this.game.add.audio('explosion');
    }

    update() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.cursors.left.isDown && this.player.left > 0)
        {
            this.player.body.velocity.x = -this.playerSpeed;
        }
        else if (this.cursors.right.isDown && this.player.right < this.game.width)
        {
            this.player.body.velocity.x = this.playerSpeed;
        }

        if (this.cursors.up.isDown && this.player.top > 0)
        {
            this.player.body.velocity.y = -this.playerSpeed;
        }
        else if (this.cursors.down.isDown && this.player.bottom < this.game.height)
        {
            this.player.body.velocity.y = this.playerSpeed;
        }

        if (this.fireButton.isDown)
        {
            this.weapon.fire();
        }

        this.game.physics.arcade.overlap(
            this.weapon.bullets,
            this.enemies,
            this.enemyHitBullet,
            null,
            this
        );

        this.game.physics.arcade.overlap(
            this.player,
            this.enemies,
            this.enemyHitPlayer,
            null,
            this
        );
    }

    resetEnemy(enemy: Phaser.Sprite, force: boolean) {
        if (enemy.top > 0 || force) {
            enemy.reset(Math.random() * this.game.width, -this.game.height);
            enemy.body.velocity.y = 150 + Math.random() * 150;
            enemy.body.velocity.x = 50 - Math.random() * 100;
            enemy.revive();
        }
    }

    enemyHitBullet(bullet: Phaser.Sprite, enemy: Phaser.Sprite) {
        bullet.kill();
        this.destroyEnemy(enemy);
    }

    enemyHitPlayer(player: Phaser.Sprite, enemy: Phaser.Sprite) {
        this.destroyEnemy(enemy);
    }

    destroyEnemy(enemy: Phaser.Sprite) {
        enemy.kill();

        let explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemy.x, enemy.y);
        explosion.play('explosion', 20, false, true);

        this.explosionSound.play();

        this.resetEnemy(enemy, true);
    }
}
