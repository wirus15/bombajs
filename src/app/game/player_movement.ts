import * as Phaser from 'phaser';
import PlayerShip from "./player_ship";

export default class PlayerMovement {
    private velocity;
    private speed = 300;

    constructor(private ship: PlayerShip, private game: Phaser.Game) {
        this.velocity = ship.body.velocity;
    }

    up() {
        this.velocity.y = -this.speed;
        this.checkBounds();
    }

    down() {
        this.velocity.y = this.speed;
        this.checkBounds();
    }

    left() {
        this.velocity.x = -this.speed;
        this.checkBounds();

    }

    right() {
        this.velocity.x = this.speed;
        this.checkBounds();
    }

    slowDown() {
        const force = 1.1;
        this.velocity.x /= force;
        this.velocity.y /= force;
        this.checkBounds();
    }

    private checkBounds() {
        if (this.velocity.x < 0 && this.ship.x < 0) {
            this.velocity.x = 0;
        }

        if (this.velocity.x > 0 && this.ship.x > this.game.width - this.ship.width) {
            this.velocity.x = 0;
        }

        if (this.velocity.y < 0 && this.ship.y < 0) {
            this.velocity.y = 0;
        }

        if (this.velocity.y > 0 && this.ship.y > this.game.height - this.ship.height) {
            this.velocity.y = 0;
        }
    }
}