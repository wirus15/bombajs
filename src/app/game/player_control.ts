import * as Phaser from 'phaser';
import PlayerShip from "./player_ship";
import {injectable} from "inversify";

@injectable()
export default class PlayerControl {
    private cursors: Phaser.CursorKeys;
    private fireButton: Phaser.Key;

    constructor(private game: Phaser.Game) {}

    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    handleKeys(ship: PlayerShip) {
        if (this.cursors.left.isDown) {
            ship.move.left();
        }
        else if (this.cursors.right.isDown) {
            ship.move.right();
        }

        if (this.cursors.up.isDown) {
            ship.move.up();
        }
        else if (this.cursors.down.isDown) {
            ship.move.down();
        }

        // if (this.fireButton.isDown && this.player.alive) {
        //     this.player.weapon.fire();
        // }

        // this.player.alpha = !this.player.armor ? 1 :
        //     .2 + .6 * Math.abs(Math.sin(new Date().getTime() / 50));
    }
}
