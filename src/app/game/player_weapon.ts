import Weapon from "./weapon";

export default class PlayerWeapon extends Weapon {
    constructor(game: Phaser.Game) {
        super(game);
        this.bulletAngleOffset = 90;
    }
}
