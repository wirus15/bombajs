import {ConstructorInject} from 'huject';
import CollisionHandler from "./collision_handler";
import Explosions from "./explosions";

@ConstructorInject
export default class ShipCollisionHandler implements CollisionHandler {
    constructor(private explosions: Explosions) {}

    handle(player: Phaser.Sprite, enemy: Phaser.Sprite) {
        player.damage(enemy.health);
        enemy.kill();

        if (player.alive === false) {
            this.explosions.display(player);
        }

        if (enemy.alive === false) {
            this.explosions.display(enemy);
        }
    }
}
