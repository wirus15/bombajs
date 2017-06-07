import Pickup from "./pickup";
import Player from "./player";
import {PlayerWeaponType} from "./weapon_types";

export default class WeaponPickup extends Pickup {
    constructor(game: Phaser.Game, private weaponType: PlayerWeaponType) {
        super(game, 0, 0, weaponType.pickupSprite);
    }

    onPickup(player: Player) {
        player.ship.weapon.changeType(this.weaponType);
    }
}
