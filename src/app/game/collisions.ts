import {ConstructorInject} from 'huject';
import Player from "./player";
import ShipCollisionHandler from "./ship_collision_handler";
import EnemyContainer from "./enemy_container";
import EnemyHitHandler from "./enemy_hit_handler";
import EnemyGroup from "./enemy_group";
import PlayerHitHandler from "./player_hit_handler";
import BossGroup from "./boss_group";

@ConstructorInject
export default class Collisions {
    constructor(
        private game: Phaser.Game,
        private player: Player,
        private enemies: EnemyContainer,
        private bossGroup: BossGroup,
        private shipCollisionHandler: ShipCollisionHandler,
        private enemyHitHandler: EnemyHitHandler,
        private playerHitHandler: PlayerHitHandler
    ) {}

    check() {
        const physics = this.game.physics.arcade;
        const playerShip = this.player.getShip();
        const currentBoss = this.bossGroup.getCurrentBoss();

        this.enemies.forEach((enemyGroup: EnemyGroup) => {
            physics.overlap(
                enemyGroup,
                playerShip.getWeapon().bullets,
                this.enemyHitHandler.handle.bind(this.enemyHitHandler)
            );

            physics.overlap(
                playerShip,
                enemyGroup,
                this.shipCollisionHandler.handle.bind(this.shipCollisionHandler)
            );
        }, this);

        if (currentBoss) {
            physics.overlap(
                playerShip,
                currentBoss.getWeapon().bullets,
                this.playerHitHandler.handle.bind(this.playerHitHandler)
            );
        }
    }
}
