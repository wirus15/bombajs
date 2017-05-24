import {ConstructorInject} from 'huject';
import Player from "./player";
import ShipCollisionHandler from "./ship_collision_handler";
import EnemyContainer from "./enemy_container";
import EnemyHitHandler from "./enemy_hit_handler";
import PlayerHitHandler from "./player_hit_handler";
import Enemy from "./enemy";
import Bullet from "./bullet";
import PlayerShip from "./player_ship";
import BossShip from "./boss_ship";

@ConstructorInject
export default class Collisions {
    constructor(
        private game: Phaser.Game,
        private player: Player,
        private enemies: EnemyContainer,
        private shipCollisionHandler: ShipCollisionHandler,
        private enemyHitHandler: EnemyHitHandler,
        private playerHitHandler: PlayerHitHandler
    ) {}

    update() {
        const physics = this.game.physics.arcade;

        physics.overlap(
            this.player.getShip(),
            this.enemies.getEnemies(),
            (player: PlayerShip, enemy: Enemy) => {
                this.shipCollisionHandler.handle(player, enemy);
            }
        );

        physics.overlap(
            this.player.getShip(),
            this.enemies.getBoss(),
            (player: PlayerShip, boss: BossShip) => {
                this.shipCollisionHandler.handle(player, boss);
            }
        );

        physics.overlap(
            this.enemies.getEnemies(),
            this.player.getShip().getWeapon().bullets,
            (enemy: Enemy, bullet: Bullet) => {
                this.enemyHitHandler.handle(enemy, bullet);
            }
        );
        //
        // physics.overlap(
        //     this.enemies.getBoss(),
        //     this.player.getShip().getWeapon().bullets,
        //     (bullet: Bullet, enemy: Enemy) => {
        //         this.enemyHitHandler.handle(enemy, bullet);
        //     }
        // );

        // physics.overlap(
        //     this.player.getShip(),
        //     this.weaponManager.getEnemyBullets(),
        //     this.playerHitHandler.handle.bind(this.playerHitHandler)
        // );

        // if (this.enemies.getCurrentBoss()) {
        //     physics.overlap(
        //         this.enemies.getCurrentBoss(),
        //         this.weaponManager.getPlayerBullets(),
        //         this.enemyHitHandler.handle.bind(this.enemyHitHandler)
        //     );
        //
        //     physics.overlap(
        //         this.player.getShip(),
        //         this.enemies.getCurrentBoss(),
        //         this.shipCollisionHandler.handle.bind(this.shipCollisionHandler)
        //     );
        // }
    }
}
