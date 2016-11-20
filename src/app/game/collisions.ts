import * as Phaser from 'phaser';
import GameState from "./game_state";
import Enemy from "./enemy";
import Player from "./player";
import Bullet from "./bullet";

export default class Collisions {
    private physics: Phaser.Physics.Arcade;

    constructor(private state: GameState) {
        this.state = state;
        this.physics = state.physics.arcade;
    }

    check() {
        this.physics.overlap(
            this.state.player.weapon.bullets,
            this.state.enemies,
            this.onEnemyHit.bind(this)
        );

        this.physics.overlap(
            this.state.player,
            this.state.enemies,
            this.onPlayerHit.bind(this)
        );
    }

    private onEnemyHit(bullet: Bullet, enemy: Enemy) {
        bullet.kill();
        enemy.hit(bullet.power);
    }

    private onPlayerHit(player: Player, enemy: Enemy) {
        player.hit(enemy.health);
        enemy.hit(10000);
    }
}
