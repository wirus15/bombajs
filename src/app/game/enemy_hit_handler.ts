import CollisionHandler from "./collision_handler";
import Bullet from "./bullet";
import Player from "./player";
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class EnemyHitHandler implements CollisionHandler {
    constructor(private player: Player) {}

    handle(enemy: Phaser.Sprite, bullet: Phaser.Sprite | Bullet) {
        enemy.damage(this.player.weapon.damage);
        bullet.kill();
    }
}
