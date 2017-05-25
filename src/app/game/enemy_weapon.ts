import Weapon from "./weapon";

export default class EnemyWeapon extends Weapon {
    constructor(game: Phaser.Game) {
        super(game);
        this.bulletAngleOffset = 270;
        this.fireAngle = 90;
        this.fireLimit = 12;
    }
}
