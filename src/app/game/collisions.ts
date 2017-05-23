import {ConstructorInject} from 'huject';
import Player from "./player";
import ShipCollisionHandler from "./ship_collision_handler";
import EnemyContainer from "./enemy_container";
import EnemyHitHandler from "./enemy_hit_handler";
import PlayerHitHandler from "./player_hit_handler";
import WeaponManager from "./weapon_manager";
import Enemy from "./enemy";
import Bullet from "./bullet";

@ConstructorInject
export default class Collisions {
    constructor(
        private game: Phaser.Game,
        private player: Player,
        private enemies: EnemyContainer,
        private shipCollisionHandler: ShipCollisionHandler,
        private enemyHitHandler: EnemyHitHandler,
        private playerHitHandler: PlayerHitHandler,
        // private weaponManager: WeaponManager
    ) {}

    update() {
        const physics = this.game.physics.arcade;

        // physics.overlap(
        //     this.enemies.getEnemies(),
        //     // this.weaponManager.getPlayerBullets(),
        //     (bullet: Bullet, enemy: Enemy) => {
        //         this.enemyHitHandler.handle(enemy, bullet);
        //     }
        // );

        physics.overlap(
            this.player.getShip(),
            this.enemies.getEnemies(),
            this.shipCollisionHandler.handle.bind(this.shipCollisionHandler)
        );

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
