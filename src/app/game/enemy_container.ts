import {ConstructorInject} from 'huject';
import Player from "./player";
import BossShip from "./boss_ship";
import Enemy from "./enemy";
import GameEvents from "./game_events";
import EnemyWeapon from "./enemy_weapon";
import {pull, sample} from "lodash";
import EnemyLauncher from "./enemy_launcher";
import BossLauncher from "./boss_launcher";
import * as WeaponTypes from "./weapon_types";
import EnemyGroup from "./enemy_group";

@ConstructorInject
export default class EnemyContainer {
    public readonly enemies: Phaser.Group;
    public readonly boss: BossShip;
    private weapon: EnemyWeapon;

    constructor(
        private game: Phaser.Game,
        private enemyLauncher: EnemyLauncher,
        private bossLauncher: BossLauncher,
        private player: Player,
        private gameEvents: GameEvents
    ) {
        this.enemies = new EnemyGroup(game);
        this.boss = new BossShip(game);
    }

    create() {
        this.game.add.existing(this.enemies);
        this.game.add.existing(this.boss);

        this.player.onLevelChange(this.launchBoss, this);
        this.weapon = new EnemyWeapon(this.game);
        this.boss.create();
        this.boss.events.onKilled.add(() => this.gameEvents.onBossKilled.dispatch(this.boss));

        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
        this.game.time.events.add(Phaser.Timer.SECOND, this.fireFromRandomEnemy, this);
    }

    update() {
        this.boss.fireWeapon(this.player.ship);
    }

    launchEnemy(): Enemy {
        return this.enemyLauncher.launch(this.enemies);
    }

    launchBoss(): BossShip {
        return this.bossLauncher.launch(this.boss);
    }

    get enemyWeapon(): EnemyWeapon {
        return this.weapon;
    }

    private fireFromRandomEnemy() {
        const enemy = this.pickRandomEnemy();
        const type = this.game.rnd.pick([
            WeaponTypes.EnemyPrimaryWeapon,
            WeaponTypes.EnemySecondaryWeapon,
            WeaponTypes.EnemyTertiaryWeapon,
            WeaponTypes.EnemyQuaternaryWeapon,
        ]);

        if (enemy) {
            this.weapon.changeType(type);
            this.weapon.fireFrom.x = enemy.centerX;
            this.weapon.fireFrom.y = enemy.centerY;
            this.weapon.fire();
        }

        this.game.time.events.add(
            this.game.rnd.integerInRange(500, 2000),
            this.fireFromRandomEnemy,
            this
        );
    }

    private pickRandomEnemy(): Enemy {
        return Phaser.ArrayUtils.getRandomItem(
            this.enemies.filter((enemy: Enemy) => enemy.exists).list
        );
    }
}
