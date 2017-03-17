import * as Phaser from 'phaser';
import PlayerShip from "./player_ship";

export default class PlayerMovement {
    private game: Phaser.Game;
    private speed = 300;
    private maxX: number;
    private maxY: number;

    constructor(private ship: PlayerShip) {
        this.game = ship.game;
        this.maxX = this.game.width - ship.width / 2;
        this.maxY = this.game.height - ship.height / 2;
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

    private get velocity() {
        return this.ship.body.velocity;
    }

    private checkBounds() {
        if (this.ship.x < this.ship.width / 2) {
            this.velocity.x = 0;
            this.ship.x = this.ship.width / 2;
        }

        if (this.ship.x > this.maxX) {
            this.velocity.x = 0;
            this.ship.x = this.maxX;
        }

        if (this.ship.y < this.ship.height / 2) {
            this.velocity.y = 0;
            this.ship.y = this.ship.height / 2;
        }

        if (this.ship.y > this.maxY) {
            this.velocity.y = 0;
            this.ship.y = this.maxY;
        }
    }
}
