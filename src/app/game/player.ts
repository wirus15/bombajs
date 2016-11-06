import * as Phaser from 'phaser';
import Weapon from './weapon';
import Assets from './assets';
import GameObject from './game_object';

export default class Player extends GameObject {
    public readonly weapon: Weapon;
    private readonly cursors: Phaser.CursorKeys;
    private readonly speed: number = 300;
    private readonly fireButton: Phaser.Key;
    private static readonly MAX_HEALTH = 100;
    private armor = false;
    private reviving = false;
    private pulse: Phaser.Tween;

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
        this.pulse = this.game.add.tween(this.sprite);
        this.pulse
            .from({alpha: .8})
            .to({alpha: 0.2}, 100, Phaser.Easing.Linear.None, true, 0, -1, true);
        this.pulse.start();
        this.pulse.pause();
        this.pulse.resume();
        this.pulse.pause();
    }

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.cursors.left.isDown && this.left > 0) {
            this.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown && this.right < this.game.width) {
            this.velocity.x = this.speed;
        }

        if (!this.reviving) {
            if (this.cursors.up.isDown && this.top > 0) {
                this.velocity.y = -this.speed;
            }
            else if (this.cursors.down.isDown && this.bottom < this.game.height) {
                this.velocity.y = this.speed;
            }
        }

        if (this.fireButton.isDown && this.sprite.alive) {
            this.weapon.fire();
        }

        this.sprite.alpha = !this.armor ? 1 :
            .2 + .6 * Math.abs(Math.sin(new Date().getTime() / 50));
    }

    revive() {
        this.sprite.reset(
            (this.game.width - this.width) / 2,
            this.game.height,
            Player.MAX_HEALTH
        );

        this.armor = true;
        this.reviving = true;

        setTimeout(() => {
            this.armor = false;
        }, 2000);

        const flyIn = this.game.add.tween(this.sprite);
        flyIn.to({y: this.game.height - this.height - 50}, 1000, Phaser.Easing.Cubic.Out, true, 0);
        flyIn.onComplete.addOnce(() => {
            this.reviving = false;
        });
    }

    hit(damage: number) {
        if (this.armor === false) {
            this.sprite.damage(damage);
        }
    }

    get onKilled() {
        return this.sprite.events.onKilled;
    }

    get health() {
        return this.sprite.health;
    }
}
