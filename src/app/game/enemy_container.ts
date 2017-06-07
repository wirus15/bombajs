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
    private _enemies: Phaser.Group;
    private _boss: BossShip;
    private _enemyWeapon: EnemyWeapon;

    constructor(
        private game: Phaser.Game,
        private enemyLauncher: EnemyLauncher,
        private bossLauncher: BossLauncher,
        private player: Player,
        private gameEvents: GameEvents
    ) {}

    create() {
        this._enemies = this.game.add.physicsGroup();
        this._enemies.classType = Enemy;
        this._enemies.ignoreDestroy = true;
        this._boss = new BossShip(this.game);
        this._enemyWeapon = new EnemyWeapon(this.game);

        this.player.onLevelChange(this.launchBoss, this);
        this._boss.events.onKilled.add(() => this.gameEvents.onBossKilled.dispatch(this._boss));

        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
        this.game.time.events.add(Phaser.Timer.SECOND, this.fireFromRandomEnemy, this);
    }

    update() {
        this._boss.fireWeapon(this.player.ship);
    }

    launchEnemy(): Enemy {
        return this.enemyLauncher.launch(this._enemies);
    }

    launchBoss(): BossShip {
        return this.bossLauncher.launch(this._boss);
    }

    get enemies(): Phaser.Group {
        return this._enemies;
    }

    get boss(): BossShip {
        return this._boss;
    }

    get enemyWeapon(): EnemyWeapon {
        return this._enemyWeapon;
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
            this._enemyWeapon.changeType(type);
            this._enemyWeapon.fireFrom.x = enemy.centerX;
            this._enemyWeapon.fireFrom.y = enemy.centerY;
            this._enemyWeapon.fire();
        }

        this.game.time.events.add(
            this.game.rnd.integerInRange(500, 2000),
            this.fireFromRandomEnemy,
            this
        );
    }

    private pickRandomEnemy(): Enemy {
        return Phaser.ArrayUtils.getRandomItem(
            this._enemies.filter((enemy: Enemy) => enemy.exists).list
        );
    }
}
