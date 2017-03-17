import {ConstructorInject} from 'huject';
import CollisionHandler from "./collision_handler";
import Explosions from "./explosions";
import PlayerShip from "./player_ship";

@ConstructorInject
export default class ShipCollisionHandler implements CollisionHandler {
    constructor(private explosions: Explosions) {}

    handle(player: PlayerShip, enemy: Phaser.Sprite) {
        if (player.shieldEnabled === false) {
            player.damage(enemy.health);
        }
        enemy.damage(player.health);

        if (player.alive === false) {
            this.explosions.display(player);
        }

        if (enemy.alive === false) {
            this.explosions.display(enemy);
        }
    }
}
