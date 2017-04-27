import PlayerShip from "./player_ship";
import {ConstructorInject} from 'huject';
import Weapon from "./weapon";

@ConstructorInject
export default class PlayerControl {
    private cursors: Phaser.CursorKeys;
    private fireButton: Phaser.Key;

    constructor(private game: Phaser.Game) {}

    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    handleMovementKeys(ship: PlayerShip) {
        if (!ship.alive) {
            return;
        }

        const velocity = ship.body.velocity;
        const maxVelocity = ship.body.maxVelocity;

        if (this.cursors.left.isDown) {
            velocity.x = -maxVelocity.x;
        }
        else if (this.cursors.right.isDown) {
            velocity.x = maxVelocity.x;
        }

        if (this.cursors.up.isDown && !ship.isFlyingIn()) {
            velocity.y = -maxVelocity.y;
        }
        else if (this.cursors.down.isDown && !ship.isFlyingIn()) {
            velocity.y = maxVelocity.y;
        }
    }

    handleFireKey(ship: PlayerShip, weapon: Weapon) {
        if (ship.alive && this.fireButton.isDown) {
            weapon.fire();
        }
    }
}
