import * as Phaser from 'phaser';
import Assets from './assets';

export default class Enemy extends Phaser.Sprite {
    public readonly onShotDown: Phaser.Signal;
    private static readonly MAX_HEALTH = 20;
    private static sprites = [
        Assets.ship_normal_01,
        Assets.ship_normal_02,
        Assets.ship_normal_03,
        Assets.ship_normal_04,
        Assets.ship_normal_05,
        Assets.ship_normal_06,
        Assets.ship_normal_07,
        Assets.ship_normal_08,
        Assets.ship_normal_09,
        Assets.ship_normal_10,
        Assets.ship_normal_11,
        Assets.ship_normal_12,
        Assets.ship_normal_13,
        Assets.ship_normal_14,
        Assets.ship_normal_15,
        Assets.ship_normal_16,
    ];
    private level: number = 1;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Enemy.sprite(1));
        this.exists = false;
        this.maxHealth = Enemy.MAX_HEALTH;
        this.health = this.maxHealth;
        this.game.physics.arcade.enable(this);
        this.checkWorldBounds = true;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.events.onOutOfBounds.add(this.outOfBounds, this);
        this.events.onRevived.add(this.resetPosition, this);
        this.onShotDown = new Phaser.Signal();
        this.resetPosition();
    }

    resetPosition() {
        this.x = Math.random() * this.game.width;
        this.y = -Math.random() * this.game.height;
        this.body.velocity.x = 50 - Math.random() * 100;
        this.body.velocity.y = 100 + Math.random() * 200;
    }

    changeLevel(level: number) {
        this.level = level;
        this.loadTexture(Enemy.sprite(level));
        this.maxHealth = Enemy.MAX_HEALTH * level;
        this.health = this.maxHealth;
    }

    hit(damage: number) {
        this.damage(damage);
        if (this.alive === false) {
            this.onShotDown.dispatch(this);
        }
    }

    private static sprite(level: number) {
        return Enemy.sprites[Math.min(level-1, 15)];
    }

    private outOfBounds() {
        if (this.top > 0) {
            this.kill();
        }
    }
}
