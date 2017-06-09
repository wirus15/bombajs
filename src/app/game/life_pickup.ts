import Pickup from "./pickup";
import Player from "./player";
import Assets from "./assets";

export default class LifePickup extends Pickup {
    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.pickup_life);
    }

    onPickup(player: Player) {
        player.lives.increase();
    }
}
