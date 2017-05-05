import WeaponType from './weapon_type';
import Weapon from "./weapon";

export default class PlayerWeapon extends Weapon {
    constructor(game: Phaser.Game, type: WeaponType) {
        super(game, type);
        this.bulletAngleOffset = 90;
    }
}
