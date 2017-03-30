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
        if (playerShip.shieldEnabled === false) {
            playerShip.damage(enemyShip.health);
        }
        enemyShip.damage(playerShip.health);

        if (playerShip.alive === false) {
            this.explosions.display(playerShip);
            if (this.player.lives > 0) {
                this.player.useNextShip();
            } else {
                this.gameEvents.onGameOver.dispatch();
            }
        }

        if (enemyShip.alive === false) {
            this.explosions.display(enemyShip);
            this.player.points.add(enemyShip.maxHealth);
        }
    }
}