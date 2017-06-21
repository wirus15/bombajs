import CollisionHandler from "./collision_handler";
import PlayerShip from "./player_ship";
import GameEvents from "./game_events";
import {ConstructorInject} from 'huject';
import Bullet from "./bullet";
import FlashEffect from "./flash_effect";

@ConstructorInject
export default class PlayerHitHandler implements CollisionHandler {
    constructor(
        private gameEvents: GameEvents,
        private flash: FlashEffect
    ) {}

    handle(playerShip: PlayerShip, bullet: Bullet) {
        bullet.kill();

        playerShip.damage(bullet.damageAmount);

        if (!playerShip.isShieldEnabled()) {
            this.flash.flash(playerShip);
        }

        if (playerShip.alive === false) {
            this.gameEvents.onPlayerKilled.dispatch(playerShip);
        }
    }
}
