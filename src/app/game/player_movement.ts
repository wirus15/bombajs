import * as Phaser from 'phaser';
import PlayerShip from "./player_ship";

export default class PlayerMovement {
    private velocity;
    private speed = 300;
    private maxX: number;
    private maxY: number;

    constructor(private ship: PlayerShip, private game: Phaser.Game) {
        this.velocity = ship.body.velocity;
        this.maxX = game.width - ship.width;
        this.maxY = game.height - ship.height;
    }

    up() {
        if (this.ship.y > 0) {
            this.velocity.y = -this.speed;
        }
    }

    down() {
        if (this.ship.y < this.maxY) {
            this.velocity.y = this.speed;
        }
    }

    left() {
        if (this.ship.x > 0) {
            this.velocity.x = -this.speed;
        }
    }

    right() {
        if (this.ship.x < this.maxX) {
            this.velocity.x = this.speed;
        }
    }

    slowDown() {
        const force = 1.1;
        this.velocity.x /= force;
        this.velocity.y /= force;
        this.checkBounds();
    }

    private checkBounds() {
        if (this.ship.x < 0) {
            this.velocity.x = 0;
            this.ship.x = 0;
        }

        if (this.ship.x > this.maxX) {
            this.velocity.x = 0;
            this.ship.x = this.maxX;
        }

        if (this.ship.y < 0) {
            this.velocity.y = 0;
            this.ship.y = 0;
        }

        if (this.ship.y > this.maxY) {
            this.velocity.y = 0;
            this.ship.y = this.maxY;
        }
    }
}
