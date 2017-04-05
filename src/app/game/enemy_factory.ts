import Level from "./level";
import Enemy from "./enemy";
import Assets from "./assets";
import {ConstructorInject} from "huject";

@ConstructorInject
export default class EnemyFactory {
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

    constructor(private game: Phaser.Game) {}

    create(level: Level) {
        return new Enemy(
            this.game,
            this.resolveHealth(level),
            this.resolveDamage(level),
            this.resolveSprite(level)
        );
    }

    private resolveHealth(level: Level) {
        return 20 * level.get();
    }

    private resolveDamage(level: Level) {
        return 20 * level.get();
    }

    private resolveSprite(level: Level) {
        return EnemyFactory.sprites[level.get() - 1];
    }
}
