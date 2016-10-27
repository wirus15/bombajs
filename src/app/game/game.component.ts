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
    private stars;

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
    }

    create() {
        this.player = this.game.add.sprite(0, 0, 'ship_player');
        this.player.left = (this.game.width - this.player.width) / 2;
        this.player.top = this.game.height - this.player.height - 50;

        this.weapon = this.game.add.weapon(30, 'missle_player_0');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletAngleOffset = 90;
        this.weapon.bulletSpeed = 800;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.player, 44, 0);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.game.physics.arcade.enable(this.player);

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
    }
}
