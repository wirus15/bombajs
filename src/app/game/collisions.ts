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
import PickupDispenser from "./pickup_dispenser";
import Pickup from "./pickup";
import PickupHandler from "./pickup_handler";

@ConstructorInject
export default class Collisions {
    constructor(
        private game: Phaser.Game,
        private player: Player,
        private enemies: EnemyContainer,
        private pickups: PickupDispenser,
        private shipCollisionHandler: ShipCollisionHandler,
        private enemyHitHandler: EnemyHitHandler,
        private playerHitHandler: PlayerHitHandler,
        private pickupHandler: PickupHandler
    ) {}

    update() {
        const physics = this.game.physics.arcade;

        physics.overlap(
            this.player.ship,
            this.enemies.enemies,
            (player: PlayerShip, enemy: Enemy) => {
                this.shipCollisionHandler.handle(player, enemy);
            }
        );

        physics.overlap(
            this.player.ship,
            this.enemies.boss,
            (player: PlayerShip, boss: BossShip) => {
                this.shipCollisionHandler.handle(player, boss);
            }
        );

        physics.overlap(
            this.enemies.enemies,
            this.player.ship.weapon.bullets,
            (enemy: Enemy, bullet: Bullet) => {
                this.enemyHitHandler.handle(enemy, bullet);
            }
        );

        physics.overlap(
            this.enemies.boss,
            this.player.ship.weapon.bullets,
            (enemy: Enemy, bullet: Bullet) => {
                this.enemyHitHandler.handle(enemy, bullet);
            }
        );

        physics.overlap(
            this.player.ship,
            this.enemies.boss.weapon.bullets,
            (player: PlayerShip, bullet: Bullet) => {
                this.playerHitHandler.handle(player, bullet);
            }
        );

        physics.overlap(
            this.player.ship,
            this.enemies.enemyWeapon.bullets,
            (player: PlayerShip, bullet: Bullet) => {
                this.playerHitHandler.handle(player, bullet);
            }
        );

        physics.overlap(
            this.player.ship,
            this.pickups.pickups,
            (player: PlayerShip, pickup: Pickup) => {
                this.pickupHandler.handle(player, pickup);
            }
        );
    }
}
