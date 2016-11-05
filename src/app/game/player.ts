import * as Phaser from 'phaser';
import Weapon from './weapon';
import Assets from './assets';
import GameSprite from './game_sprite';

export default class Player extends GameSprite {
    public readonly weapon: Weapon;
    private readonly cursors: Phaser.CursorKeys;
    private readonly speed: number = 300;
    private readonly fireButton: Phaser.Key;
    private static readonly MAX_HEALTH = 100;

    constructor(game: Phaser.Game) {
        super(game, game.add.sprite(0, 0, Assets.ship_player));
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.weapon = new Weapon(game, this);
        this.left = (this.game.width - this.width) / 2;
        this.top = this.game.height - this.height - 50;
        this.enablePhysics();
        this.sprite.maxHealth = Player.MAX_HEALTH;
        this.sprite.health = this.sprite.maxHealth;
        this.isProtected = false;
    }

    update() {
        if (this.isProtected) {
            return;
        }

        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.cursors.left.isDown && this.left > 0) {
            this.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown && this.right < this.game.width) {
            this.velocity.x = this.speed;
        }

        if (this.cursors.up.isDown && this.top > 0) {
            this.velocity.y = -this.speed;
        }
        else if (this.cursors.down.isDown && this.bottom < this.game.height) {
            this.velocity.y = this.speed;
        }

        if (this.fireButton.isDown)
        {
            this.weapon.fire();
        }
    }

    revive() {
        this.sprite.data.isProtected = true;
        this.sprite.alpha = .8;
        this.sprite.reset(
            (this.game.width - this.width) / 2,
            this.game.height,
            Player.MAX_HEALTH
        );

        const pulse = this.game.add.tween(this.sprite);
        pulse.to({alpha: 0.2}, 100, Phaser.Easing.Linear.None, true, 0, -1, true);

        const flyIn = this.game.add.tween(this.sprite);
        flyIn.to({y: this.game.height - this.height - 50}, 1000, Phaser.Easing.Cubic.Out, true);
        flyIn.onComplete.add(() => {
            this.sprite.data.isProtected = false;
            this.sprite.alpha = 1;
            pulse.stop();
        }, this);
        flyIn.start();


    }

    get onKilled() {
        return this.sprite.events.onKilled;
    }

    get health() {
        return this.sprite.health;
    }

    private get isProtected() {
        return this.sprite.data.isProtected;
    }

    private set isProtected(value: boolean) {
        this.sprite.data.isProtected = value;
    }
}
