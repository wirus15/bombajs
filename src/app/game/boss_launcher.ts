import {ConstructorInject} from "huject";
import Player from "./player";
import BossShip from "./boss_ship";
import Assets from "./assets";
import Level from "./level";
import GameEvents from "./game_events";
import * as WeaponTypes from "./weapon_types";

@ConstructorInject
export default class BossLauncher {
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

    private level: Level;

    constructor(
        private game: Phaser.Game,
        private player: Player,
        private gameEvents: GameEvents
    ) {
        this.level = new Level(BossShip.MAX_LEVEL);
    }

    launch(boss: BossShip): BossShip {
        const playerLevel = this.player.getLevel().get();
        const isOdd = Boolean(playerLevel % 2);

        if (playerLevel < 1 || !isOdd || boss.exists) {
            return;
        }

        this.level.next();

        boss.loadTexture(this.resolveSprite(this.level));
        boss.maxHealth = this.resolveHealth(this.level);
        boss.setDamageAmount(this.resolveDamage(this.level));
        boss.getWeapon().changeType(this.game.rnd.pick([
            WeaponTypes.BossPrimaryWeapon,
            WeaponTypes.BossSecondaryWeapon,
            WeaponTypes.BossTertiaryWeapon,
            WeaponTypes.BossQuaternaryWeapon
        ]));
        boss.reset(this.game.width / 2, -boss.height, boss.maxHealth);
        boss.body.setSize(boss.width, boss.height);
        boss.startAnimation();

        this.gameEvents.onBossAppear.dispatch(boss);

        return boss;
    }

    private resolveHealth(level: Level): number {
        return 1000 * level.get();
    }

    private resolveDamage(level: Level): number {
        return 20 * level.get();
    }

    private resolveSprite(level: Level): string {
        return BossLauncher.sprites[level.get() - 1];
    }
}