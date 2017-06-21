import {ConstructorInject} from 'huject';
import CollisionHandler from "./collision_handler";
import Explosions from "./explosions";
import PlayerShip from "./player_ship";
import Player from "./player";
import GameEvents from "./game_events";
import FlashEffect from "./flash_effect";

@ConstructorInject
export default class ShipCollisionHandler implements CollisionHandler {
    constructor(
        private player: Player,
        private explosions: Explosions,
        private gameEvents: GameEvents,
        private flash: FlashEffect
    ) {}

    handle(playerShip: PlayerShip, enemyShip: Phaser.Sprite) {
        const enemyHealth = enemyShip.health;
        const playerHealth = playerShip.health;

        playerShip.damage(enemyHealth);
        enemyShip.damage(playerHealth);

        this.flash.flash(enemyShip);

        if (!playerShip.isShieldEnabled()) {
            this.flash.flash(playerShip);
        }

        if (playerShip.alive === false) {
            this.gameEvents.onPlayerKilled.dispatch(playerShip);
        }

        if (enemyShip.alive === false) {
            this.explosions.display(enemyShip);
            this.player.addPoints(enemyShip.maxHealth);
        }
    }
}
