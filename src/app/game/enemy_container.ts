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

@ConstructorInject
export default class EnemyContainer {
    private enemies: Phaser.Group;
    private boss: BossShip;
    private enemyWeapon: EnemyWeapon;

    constructor(
        private game: Phaser.Game,
        private enemyLauncher: EnemyLauncher,
        private bossLauncher: BossLauncher,
        private player: Player,
        private gameEvents: GameEvents
    ) {}

    create() {
        this.enemies = this.game.add.physicsGroup();
        this.enemies.classType = Enemy;
        this.enemies.ignoreDestroy = true;
        this.boss = new BossShip(this.game);
        this.enemyWeapon = new EnemyWeapon(this.game);

        this.player.onLevelChange(this.launchBoss, this);
        this.boss.events.onKilled.add(() => this.gameEvents.onBossKilled.dispatch(this.boss));

        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
        this.game.time.events.add(Phaser.Timer.SECOND, this.fireFromRandomEnemy, this);
    }

    update() {
        this.boss.fireWeapon(this.player.getShip());
    }

    launchEnemy(): Enemy {
        return this.enemyLauncher.launch(this.enemies);
    }

    launchBoss(): BossShip {
        return this.bossLauncher.launch(this.boss);
    }

    getEnemies(): Phaser.Group {
        return this.enemies;
    }

    getBoss(): BossShip {
        return this.boss;
    }

    getEnemyWeapon(): EnemyWeapon {
        return this.enemyWeapon;
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
            this.enemyWeapon.changeType(type);
            this.enemyWeapon.fireFrom.x = enemy.centerX;
            this.enemyWeapon.fireFrom.y = enemy.centerY;
            this.enemyWeapon.fire();
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
