import {ConstructorInject} from "huject";
import CollisionHandler from "./collision_handler";
import PlayerShip from "./player_ship";
import Pickup from "./pickup";
import Player from "./player";

@ConstructorInject
export default class PickupHandler implements CollisionHandler {
    constructor(private player: Player) {}

    handle(player: PlayerShip, pickup: Pickup) {
        pickup.onPickup(this.player);
        pickup.kill();
    }
}