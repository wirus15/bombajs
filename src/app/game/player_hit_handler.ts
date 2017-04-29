import CollisionHandler from "./collision_handler";
import PlayerShip from "./player_ship";
import GameEvents from "./game_events";
import {ConstructorInject} from 'huject';
import Bullet from "./bullet";

@ConstructorInject
export default class PlayerHitHandler implements CollisionHandler {
    constructor(private gameEvents: GameEvents) {}

    handle(playerShip: PlayerShip, bullet: Bullet) {
        bullet.kill();

        if (!playerShip.isShieldEnabled()) {
            playerShip.damage(bullet.damageAmount);
        }

        if (playerShip.alive === false) {
            this.gameEvents.onPlayerKilled.dispatch(playerShip);
        }
    }
}
