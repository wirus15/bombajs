import * as Phaser from 'phaser';
import Assets from './assets';
import Shield from "./shield";

export default class PlayerShip extends Phaser.Sprite {
    private static MAX_HEALTH = 100;
    private shield: Shield;
    private _shieldEnabled = false;
    private _isFlyingIn = false;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.ship_player);
        this.game.world.add(this);
        this.game.physics.arcade.enable(this);

        this.body.collideWorldBounds = false;
        this.maxHealth = PlayerShip.MAX_HEALTH;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.body.drag.x = this.body.drag.y = 500;
        this.body.maxVelocity.x = this.body.maxVelocity.y = 300;

        this.shield = new Shield(game);
        this.addChild(this.shield);
    }

    enableShield(duration: number) {
        this._shieldEnabled = true;
        this.shield.show();
        this.game.time.events.add(duration, this.disableShield, this);
    }

    disableShield() {
        this._shieldEnabled = false;
        this.shield.hide();
    }

    flyIn() {
        this.reset(this.game.width / 2, this.game.height - this.height, this.maxHealth);
        this._isFlyingIn = true;
        this.body.collideWorldBounds = false;

        const animation = this.game.add.tween(this)
            .from({y: this.game.height + this.height}, 1000, Phaser.Easing.Cubic.Out, true, 1000);

        animation.onComplete.add(() => {
            this._isFlyingIn = false;
            this.body.collideWorldBounds = true;
        });

        this.enableShield(5000);
    }

    get shieldEnabled() {
        return this._shieldEnabled;
    }

    get isFlyingIn() {
        return this._isFlyingIn;
    }
}


