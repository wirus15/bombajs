import BossShip from "./boss_ship";
import Bullet from "./bullet";
import Assets from "./assets";

export default class BossWeapon extends Phaser.Weapon {
    private sound: Phaser.Sound;
    private damage: number;

    constructor(ship: BossShip) {
        super(ship.game, ship.game.plugins);

        this.createBullets(0);
        this.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.bulletKillDistance = ship.game.width;
        this.bulletAngleOffset = 90;
        this.bulletClass = Bullet;

        this.sound = this.game.add.audio(Assets.fire_0);
        this.trackSprite(ship, 0, ship.height / 2);
        this.onFire.add(() => this.sound.play());

        this.damage = ship.damageAmount;
        this.bulletSpeed = 200;
        this.fireRate = 150;
        this.createBullets(12, Assets.missle_enemy_0);
        this.bullets.setAll('damageAmount', 10);
    }
}
