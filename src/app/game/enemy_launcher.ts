import * as Phaser from "phaser";
import Enemy from "./enemy";
import Assets from "./assets";
import {ConstructorInject} from "huject";
import Player from "./player";

@ConstructorInject
export default class EnemyLauncher {
    private static sprites = [
        Assets.ship_normal_01,
        Assets.ship_normal_02,
        Assets.ship_normal_03,
        Assets.ship_normal_04,
        Assets.ship_normal_05,
        Assets.ship_normal_06,
        Assets.ship_normal_07,
        Assets.ship_normal_08,
        Assets.ship_normal_09,
        Assets.ship_normal_10,
        Assets.ship_normal_11,
        Assets.ship_normal_12,
        Assets.ship_normal_13,
        Assets.ship_normal_14,
        Assets.ship_normal_15,
        Assets.ship_normal_16,
    ];

    constructor(
        private game: Phaser.Game,
        private player: Player
    ) {}

    launch(enemies: Phaser.Group): Enemy {
        const enemy = enemies.getFirstExists(false, true);
        const x = this.game.rnd.integerInRange(0, this.game.width);
        const level = this.game.rnd.integerInRange(1, this.player.level.get());

        enemy.loadTexture(this.resolveSprite(level));
        enemy.maxHealth = this.resolveHealth(level);
        enemy.reset(x, -enemy.height, enemy.maxHealth);
        enemy.body.setSize(enemy.width, enemy.height);
        enemy.body.velocity.x = this.game.rnd.integerInRange(-50, 50);
        enemy.body.velocity.y = this.game.rnd.integerInRange(100, 300);

        return enemy;
    }

    private resolveHealth(level: number): number {
        return 20 * level;
    }

    private resolveSprite(level: number): string {
        return EnemyLauncher.sprites[level - 1];
    }
}
