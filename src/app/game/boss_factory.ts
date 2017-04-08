import EnemyFactoryInterface from "./enemy_factory_interface";
import Level from "./level";
import BossShip from "./boss_ship";
import {ConstructorInject} from "huject";
import Assets from "./assets";

@ConstructorInject
export default class BossFactory implements EnemyFactoryInterface {
    private static sprites = [
        Assets.ship_boss_01,
        Assets.ship_boss_02,
        Assets.ship_boss_03,
        Assets.ship_boss_04,
        Assets.ship_boss_05,
        Assets.ship_boss_06,
        Assets.ship_boss_07,
        Assets.ship_boss_08,
        Assets.ship_boss_09
    ];

    constructor(private game: Phaser.Game) {}

    create(level: Level) {
        return new BossShip(
            this.game,
            this.resolveHealth(level),
            this.resolveDamage(level),
            this.resolveSprite(level)
        );
    }

    private resolveHealth(level: Level) {
        return 400 * level.get();
    }

    private resolveDamage(level: Level) {
        return 20 * level.get();
    }

    private resolveSprite(level: Level) {
        return BossFactory.sprites[level.get() - 1];
    }
}
