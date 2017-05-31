import Pickup from "./pickup";
import Assets from "./assets";
import Player from "./player";

export default class RepairPickup extends Pickup {
    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.pickup_repair);
    }

    onPickup(player: Player) {
        player.getShip().health = player.getShip().maxHealth;
    }
}
