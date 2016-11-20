import * as Phaser from 'phaser';
import Player from "./player";

export default class PlayerControl {
    private cursors: Phaser.CursorKeys;
    private fireButton: Phaser.Key;

    constructor(private player: Player) {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.cursors.left.isDown && this.player.left > 0) {
            this.velocity.x = -this.player.speed;
        }
        else if (this.cursors.right.isDown && this.player.right < this.game.width) {
            this.velocity.x = this.player.speed;
        }

        if (!this.player.reviving) {
            if (this.cursors.up.isDown && this.player.top > 0) {
                this.velocity.y = -this.player.speed;
            }
            else if (this.cursors.down.isDown && this.player.bottom < this.game.height) {
                this.velocity.y = this.player.speed;
            }
        }

        if (this.fireButton.isDown && this.player.alive) {
            this.player.weapon.fire();
        }

        this.player.alpha = !this.player.armor ? 1 :
            .2 + .6 * Math.abs(Math.sin(new Date().getTime() / 50));
    }

    get velocity() {
        return this.player.body.velocity;
    }

    get game() {
        return this.player.game;
    }
}
