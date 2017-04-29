import Assets from './assets';
import Bullet from "./bullet";
import PlayerShip from "./player_ship";
import WeaponType from './weapon_type';
import {PrimaryWeapon} from './player_weapon_types';

export default class Weapon extends Phaser.Weapon {
    private sound: Phaser.Sound;
    private damage: number;

    constructor(private ship: PlayerShip) {
        super(ship.game, ship.game.plugins);

        this.createBullets(0);
        this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletAngleOffset = 90;
        this.bulletClass = Bullet;

        this.sound = this.game.add.audio(Assets.fire_0);
        this.trackSprite(ship, 0, ship.height / -2);
        this.onFire.add(() => this.sound.play());
        this.switchWeapon(PrimaryWeapon);
    }

    switchWeapon(type: WeaponType) {
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
