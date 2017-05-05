import Assets from './assets';
import Bullet from "./bullet";
import WeaponType from './weapon_type';

abstract class Weapon extends Phaser.Weapon {
    private sound: Phaser.Sound;
    private damage: number;

    constructor(game: Phaser.Game, type: WeaponType) {
        super(game, game.plugins);

        this.createBullets(0);
        this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletClass = Bullet;

        this.sound = this.game.add.audio(Assets.fire_0);
        this.onFire.add(() => this.sound.play());

        this.damage = type.damage;
        this.bulletSpeed = type.bulletSpeed;
        this.fireRate = type.fireRate;
        this.createBullets(30, type.bulletSprite);
        this.bullets.setAll('damageAmount', type.damage);
    }

    getDamage() {
        return this.damage;
    }
}

export default Weapon;
