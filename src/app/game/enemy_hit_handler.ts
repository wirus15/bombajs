import CollisionHandler from "./collision_handler";
import Bullet from "./bullet";
import Player from "./player";
import {ConstructorInject} from 'huject';
import Explosions from "./explosions";
import Enemy from "./enemy";
import BossShip from "./boss_ship";
import PickupDispenser from "./pickup_dispenser";
import FlashEffect from "./flash_effect";

@ConstructorInject
export default class EnemyHitHandler implements CollisionHandler {
    constructor(
        private player: Player,
        private explosions: Explosions,
        private pickups: PickupDispenser,
        private flash: FlashEffect
    ) {}

    handle(enemy: Enemy, bullet: Bullet) {
        enemy.damage(bullet.damageAmount);
        bullet.kill();

        this.flash.flash(enemy);

        if (enemy.alive === false) {
            this.showExplosions(enemy);
            this.player.addPoints(enemy.maxHealth);
            this.pickups.dispenseRoll(enemy);
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
