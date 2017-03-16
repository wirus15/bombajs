import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
import Player from "./player";
import ShipCollisionHandler from "./ship_collision_handler";
import EnemyContainer from "./enemy_container";
import EnemyHitHandler from "./enemy_hit_handler";
import EnemyGroup from "./enemy_group";

@ConstructorInject
export default class Collisions {
    constructor(
        private game: Phaser.Game,
        private player: Player,
        private enemies: EnemyContainer,
        private shipCollisionHandler: ShipCollisionHandler,
        private enemyHitHandler: EnemyHitHandler
    ) {}

    check() {
        const physics = this.game.physics.arcade;

        this.enemies.forEach((enemyGroup: EnemyGroup) => {
            physics.overlap(
                this.player.weapon.bullets,
                enemyGroup,
                this.enemyHitHandler.handle.bind(this.enemyHitHandler)
            );

            physics.overlap(
                this.player.ship,
                enemyGroup,
                this.shipCollisionHandler.handle.bind(this.shipCollisionHandler)
            );
        }, this);
    }
}
