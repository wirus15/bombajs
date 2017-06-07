import Assets from "./assets";
import Pickup from "./pickup";
import Player from "./player";

export default class ShieldPickup extends Pickup {
    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.pickup_shield);
    }

    onPickup(player: Player) {
        player.ship.enableShield(20);
    }
}
