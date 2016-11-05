import * as Phaser from 'phaser';
import Assets from './assets';
import GameSprite from './game_sprite';

export default class Enemy extends GameSprite {
    constructor(game: Phaser.Game) {
        super(game, game.add.sprite(
            Math.random() * game.width,
            -Math.random() * game.height,
            Assets.ship_normal_01
        ));

        this.enablePhysics();
        this.velocity.y = 100 + Math.random() * 200;
        this.velocity.x = 50 - Math.random() * 100;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.sprite.checkWorldBounds = true;
        this.sprite.events.onOutOfBounds.add(this.outOfBounds, this);
    }

    reset() {
        this.sprite.reset(Math.random() * this.game.width, -this.height);
        setTimeout(() => {
            this.velocity.y = 150 + Math.random() * 150;
            this.velocity.x = 50 - Math.random() * 100;
            this.sprite.revive();
        }, Math.random() * 3000);
    }

    get onKilled() {
        return this.sprite.events.onKilled;
    }

    private outOfBounds() {
        if (this.top > 0) {
            this.reset();
        }
    }
}
