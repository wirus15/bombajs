import * as Phaser from 'phaser';
import GameState from "./game_state";

export default class Collisions {
    private state: GameState;

    constructor(state: GameState) {
        this.state = state;
    }

    check() {
        const arcade = this.state.game.physics.arcade;

        arcade.overlap(
            this.state.player.weapon.bullets,
            this.state.enemies.group,
            this.onEnemyHit.bind(this)
        );

        arcade.overlap(
            this.state.player.sprite,
            this.state.enemies.group,
            this.onPlayerHit.bind(this)
        );
    }

    private onEnemyHit(bullet: Phaser.Sprite, enemy: Phaser.Sprite) {
        bullet.kill();
        enemy.data.object.hit(this.state.player.weapon.power);
    }

    private onPlayerHit(player: Phaser.Sprite, enemy: Phaser.Sprite) {
        enemy.kill();
        player.data.object.hit(enemy.health);
    }
}
