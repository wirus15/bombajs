import CollisionHandler from "./collision_handler";
import PlayerShip from "./player_ship";
import GameEvents from "./game_events";
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class PlayerHitHandler implements CollisionHandler {
    constructor(private gameEvents: GameEvents) {}

    handle(playerShip: PlayerShip, bullet: Phaser.Sprite) {
        bullet.kill();

        if (!playerShip.isShieldEnabled()) {
            playerShip.damage(10);
        }

        if (playerShip.alive === false) {
            this.gameEvents.onPlayerKilled.dispatch(playerShip);
        }
    }
}
