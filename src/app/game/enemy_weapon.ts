import WeaponType from "./weapon_type";
import Weapon from "./weapon";

export default class EnemyWeapon extends Weapon {
    constructor(game: Phaser.Game, type: WeaponType) {
        super(game, type);
        this.bulletAngleOffset = 270;
        this.fireAngle = 90;
        this.fireLimit = 12;
    }
}
