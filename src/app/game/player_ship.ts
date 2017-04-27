import Assets from './assets';
import Shield from "./shield";

export default class PlayerShip extends Phaser.Sprite {
    private static MAX_HEALTH = 100;
    private shield: Shield;
    private flyInAnimation: Phaser.Tween;
    private shieldEnabled = false;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.ship_player);
        this.game.world.add(this);
        this.game.physics.arcade.enable(this);

        this.body.collideWorldBounds = false;
        this.maxHealth = PlayerShip.MAX_HEALTH;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.body.drag.x = this.body.drag.y = 800;
        this.body.maxVelocity.x = this.body.maxVelocity.y = 300;
        this.flyInAnimation = this.game.add.tween(this);
        this.flyInAnimation.to({y: this.game.height - this.height}, 1000, Phaser.Easing.Cubic.Out, false, 1000);
        this.flyInAnimation.onComplete.add(() => {
            this.body.collideWorldBounds = true;
        });

        this.shield = new Shield(game);
        this.addChild(this.shield);
    }

    enableShield(duration: number) {
        this.shieldEnabled = true;
        this.shield.show();
        this.game.time.events.add(duration, this.disableShield, this);
    }

    disableShield() {
        this.shieldEnabled = false;
        this.shield.hide();
    }

    flyIn() {
        this.reset(this.game.width / 2, this.game.height + this.height, this.maxHealth);
        this.body.collideWorldBounds = false;
        this.flyInAnimation.start();
        this.enableShield(5000);
    }

    isShieldEnabled() {
        return this.shieldEnabled;
    }

    isFlyingIn() {
        return this.flyInAnimation.isRunning;
    }

    getHealth() {
        return this.health > 0 ? this.health : 0;
    }
}


