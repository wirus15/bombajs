import * as Phaser from 'phaser';
import Assets from './assets';
import Bullet from "./bullet";
import PlayerShip from "./player_ship";
import {injectable} from "inversify";
import {WeaponType, PrimaryWeapon} from './weapon_types';

@injectable()
export default class Weapon extends Phaser.Weapon {
    private sound: Phaser.Sound;

    constructor(private ship: PlayerShip) {
        super(ship.game, ship.game.plugins);

        this.createBullets(0);
        this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletAngleOffset = 90;
        this.bulletClass = Bullet;

        this.sound = this.game.add.audio(Assets.fire_0);
        this.trackSprite(ship, ship.width / 2, 0);
        this.onFire.add(() => this.sound.play());
        this.switchWeapon(PrimaryWeapon);
    }

    switchWeapon(type: WeaponType) {
        this.bulletSpeed = type.bulletSpeed;
        this.fireRate = type.fireRate;
        this.createBullets(30, type.bulletSprite);
    }
}
