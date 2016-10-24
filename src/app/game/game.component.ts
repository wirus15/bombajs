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

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.weapon = this.game.add.weapon(30, 'missle_player_0');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon.bulletAngleOffset = 90;

        //  The speed at which the bullet is fired
        this.weapon.bulletSpeed = 800;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon.fireRate = 100;

        //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
        this.weapon.trackSprite(this.player, 44, 0);


        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);



        this.game.physics.arcade.enable(this.player);
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
