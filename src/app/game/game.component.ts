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

    constructor() {
        this.game = new Phaser.Game(
            800, 600,         // width x height
            Phaser.AUTO,      // the game context, 2D/3D
            'gameCanvas',    // id of the DOM element to add the game
            {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        )
    }

    preload() {
        this.game.load.image('ship_player', 'public/images/ship_player.png');
        this.game.load.image('missle_player_0', 'public/images/missle_player_0.png');
    }

    create() {
        this.player = this.game.add.sprite(400, 400, 'ship_player');
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

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -200;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 200;
        }

        if (this.cursors.up.isDown)
        {
            this.player.body.velocity.y = -200;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.velocity.y = 200;
        }

        if (this.fireButton.isDown)
        {
            this.weapon.fire();
        }
    }
}
