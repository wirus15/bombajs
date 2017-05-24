import {ConstructorInject} from 'huject';
import Player from "./player";
import BossShip from "./boss_ship";
import Enemy from "./enemy";
import GameEvents from "./game_events";
import EnemyWeapon from "./enemy_weapon";
import {pull, sample} from "lodash";
import EnemyLauncher from "./enemy_launcher";
import BossLauncher from "./boss_launcher";

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

        this.player.onLevelChange(this.launchBoss, this);
        this.boss.events.onKilled.addOnce(() => this.gameEvents.onBossKilled.dispatch(this.boss));

        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
        this.game.time.events.add(Phaser.Timer.SECOND, this.beginEnemyFire, this);
    }

    update() {
        if (this.boss) {
            this.boss.fireWeapon(this.player.getShip());
        }
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

    private beginEnemyFire() {

    }


    private fireFromRandomEnemy() {
        // this.game.time.events.add(this.game.rnd.integerInRange(1000, 5000), () => {
        //     const enemy = this.enemies.getFirstExists(true);
        //     // const weapon = this.weaponManager.getEnemyWeapon();
        //     if (enemy) {
        //         weapon.fireFrom.x = enemy.centerX;
        //         weapon.fireFrom.y = enemy.centerY;
        //         weapon.fire();
        //     }
        //     this.fireFromRandomEnemy()
        // });
    }
}
