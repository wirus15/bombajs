import EnemyFactoryInterface from "./enemy_factory_interface";
import Level from "./level";
import BossShip from "./boss_ship";
import {ConstructorInject} from "huject";
import Assets from "./assets";
import WeaponType from "./weapon_type";
import * as BossWeaponType from "./boss_weapon_types";

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

    create(level: Level): BossShip {
        return new BossShip(
            this.game,
            this.resolveHealth(level),
            this.resolveDamage(level),
            this.resolveSprite(level),
            this.resolveWeaponType(level)
        );
    }

    private resolveHealth(level: Level): number {
        return 1000 * level.get();
    }

    private resolveDamage(level: Level): number {
        return 20 * level.get();
    }

    private resolveSprite(level: Level): string {
        return BossFactory.sprites[level.get() - 1];
    }

    private resolveWeaponType(level: Level): WeaponType {
        const levelValue = level.get();
        switch (true) {
            case levelValue > 6:
                return BossWeaponType.FourthWeapon;
            case levelValue > 4:
                return BossWeaponType.ThirdWeapon;
            case levelValue > 2:
                return BossWeaponType.SecondWeapon;
            default:
                return BossWeaponType.FirstWeapon;
        }
    }
}
