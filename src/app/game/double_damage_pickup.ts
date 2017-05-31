import Pickup from "./pickup";
import Assets from "./assets";
import Player from "./player";

export default class DoubleDamagePickup extends Pickup {
    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.pickup_double_damage);
    }

    onPickup(player: Player) {
        player.getShip().getWeapon().enableDoubleDamage(20);
    }
}
