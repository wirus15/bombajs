import CollisionHandler from "./collision_handler";
import Bullet from "./bullet";
import Player from "./player";
import {ConstructorInject} from 'huject';
import Explosions from "./explosions";
import Enemy from "./enemy";
import BossShip from "./boss_ship";

@ConstructorInject
export default class EnemyHitHandler implements CollisionHandler {
    constructor(
        private player: Player,
        private explosions: Explosions
    ) {}

    handle(enemy: Enemy, bullet: Bullet) {
        enemy.damage(bullet.damageAmount);
        bullet.kill();

        if (enemy.alive === false) {
            this.showExplosions(enemy);
            this.player.addPoints(enemy.maxHealth);
        }
    }

    private showExplosions(enemy: Enemy) {
        if (enemy instanceof BossShip) {
            this.explosions.displayMultiple(enemy);
        } else {
            this.explosions.display(enemy);
        }
    }
}
