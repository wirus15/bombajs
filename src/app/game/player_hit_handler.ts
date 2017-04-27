import CollisionHandler from "./collision_handler";
import PlayerShip from "./player_ship";
import Player from "./player";
import Explosions from "./explosions";
import GameEvents from "./game_events";
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class PlayerHitHandler implements CollisionHandler {
    constructor(
        private player: Player,
        private explosions: Explosions,
        private gameEvents: GameEvents
    ) {}

    handle(playerShip: PlayerShip, bullet: Phaser.Sprite) {
        bullet.kill();

        if (!playerShip.isShieldEnabled()) {
            playerShip.damage(10);
        }

        if (playerShip.alive === false) {
            this.explosions.display(playerShip);
            if (this.player.getLives() > 0) {
                this.player.useNextShip();
            } else {
                this.gameEvents.onGameOver.dispatch();
            }
        }
    }
}
