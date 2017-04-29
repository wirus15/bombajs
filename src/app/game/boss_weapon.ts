import BossShip from "./boss_ship";
import Bullet from "./bullet";
import Assets from "./assets";
import WeaponType from "./weapon_type";
import {SecondWeapon} from "./boss_weapon_types";

export default class BossWeapon extends Phaser.Weapon {
    private sound: Phaser.Sound;

    constructor(ship: BossShip) {
        super(ship.game, ship.game.plugins);

        this.createBullets(0);
        this.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.bulletKillDistance = ship.game.width;
        this.bulletAngleOffset = 270;
        this.bulletClass = Bullet;

        this.sound = this.game.add.audio(Assets.fire_0);
        this.trackSprite(ship, 0, ship.height / 2);
        this.onFire.add(() => this.sound.play());
        this.switchWeapon(SecondWeapon);
    }

    switchWeapon(weaponType: WeaponType) {
        this.bulletSpeed = weaponType.bulletSpeed;
        this.fireRate = weaponType.fireRate;

        this.bullets.removeAll();
        this.createBullets(12, weaponType.bulletSprite);
        this.bullets.setAll('damageAmount', weaponType.damage);
    }
}
