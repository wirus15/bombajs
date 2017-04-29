import CollisionHandler from "./collision_handler";
import Bullet from "./bullet";
import Player from "./player";
import {ConstructorInject} from 'huject';
import Explosions from "./explosions";

@ConstructorInject
export default class EnemyHitHandler implements CollisionHandler {
    constructor(private player: Player, private explosions: Explosions) {}

    handle(enemy: Phaser.Sprite, bullet: Bullet) {
        enemy.damage(bullet.damageAmount);
        bullet.kill();

        if (enemy.alive === false) {
            this.explosions.display(enemy);
            this.player.addPoints(enemy.maxHealth);
        }
    }
}
