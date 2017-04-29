import {ConstructorInject} from 'huject';
import CollisionHandler from "./collision_handler";
import Explosions from "./explosions";
import PlayerShip from "./player_ship";
import Player from "./player";
import GameEvents from "./game_events";

@ConstructorInject
export default class ShipCollisionHandler implements CollisionHandler {
    constructor(
        private player: Player,
        private explosions: Explosions,
        private gameEvents: GameEvents
    ) {}

    handle(playerShip: PlayerShip, enemyShip: Phaser.Sprite) {
        if (!playerShip.isShieldEnabled()) {
            playerShip.damage(enemyShip.health);
        }
        enemyShip.damage(playerShip.health);

        if (playerShip.alive === false) {
            this.gameEvents.onPlayerKilled.dispatch(playerShip);
        }

        if (enemyShip.alive === false) {
            this.explosions.display(enemyShip);
            this.player.addPoints(enemyShip.maxHealth);
        }
    }
}
