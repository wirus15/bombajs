import Assets from './assets';
import Bullet from "./bullet";
import {WeaponType} from "./weapon_types";

abstract class Weapon extends Phaser.Weapon {
    private sound: Phaser.Sound;
    private damage: number;
    private damageMultiplier = 1;

    constructor(game: Phaser.Game) {
        super(game, game.plugins);

        this.createBullets();
        this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletClass = Bullet;
        this.sound = this.game.add.audio(Assets.fire_0);
        this.autoExpandBulletsGroup = true;

        this.onFire.add((bullet: Bullet) => {
            bullet.damageAmount = this.damage * this.damageMultiplier;
            bullet.loadTexture(this.bulletKey);
            this.sound.play();
        });
    }

    changeType(type: WeaponType) {
        this.damage = type.damage;
        this.bulletSpeed = type.bulletSpeed;
        this.fireRate = type.fireRate;
        this.bulletKey = type.bulletSprite;
    }

    setDamageMultiplier(value: number = 1) {
        this.damageMultiplier = value;
    }

}

export default Weapon;
