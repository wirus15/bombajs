import {ConstructorInject} from "huject";
import Assets from './assets';
import Shield from "./shield";
import Weapon from "./weapon";
import PlayerWeapon from "./player_weapon";
import * as WeaponTypes from "./weapon_types";

@ConstructorInject
export default class PlayerShip extends Phaser.Sprite {
    private static MAX_HEALTH = 100;
    private weapon: Weapon;
    private shield: Shield;
    private flyInAnimation: Phaser.Tween;
    private shieldEnabled = false;

    constructor(game: Phaser.Game) {
        super(game, 0, 0);
    }

    create() {
        this.loadTexture(Assets.ship_player);
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

        this.shield = new Shield(this.game);
        this.weapon = new PlayerWeapon(this.game);
        this.weapon.changeType(WeaponTypes.PlayerWeaponTypes.get(WeaponTypes.PlayerPrimaryWeapon));
        this.weapon.trackSprite(this, 0, -50);
        this.addChild(this.shield);
    }

    damage(amount: number): Phaser.Sprite {
        if (!this.shieldEnabled) {
            super.damage(amount);
        }

        return this;
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

    isFlyingIn() {
        return this.flyInAnimation.isRunning;
    }

    getHealth() {
        return this.health > 0 ? this.health : 0;
    }

    getWeapon(): Weapon {
        return this.weapon;
    }
}


