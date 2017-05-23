import {ConstructorInject} from 'huject';
import Player from "./player";
import Level from "./level";
import EnemyFactory from "./enemy_factory";
import BossShip from "./boss_ship";
import Enemy from "./enemy";
import BossFactory from "./boss_factory";
import GameEvents from "./game_events";
import EnemyWeapon from "./enemy_weapon";
import {pull, sample} from "lodash";

@ConstructorInject
export default class EnemyContainer {
    private enemies: Phaser.Group;
    private currentBoss: BossShip = null;
    private enemyWeapon: EnemyWeapon;
    private bossLevel: Level;

    constructor(
        private game: Phaser.Game,
        private enemyFactory: EnemyFactory,
        private bossFactory: BossFactory,
        private player: Player,
        private gameEvents: GameEvents
    ) {
        this.enemies = game.add.physicsGroup();
        this.enemies.ignoreDestroy = true;
        this.bossLevel = new Level(BossShip.MAX_LEVEL);

        player.onLevelChange(this.addGroup, this);
        player.onLevelChange(this.launchBoss, this);

        this.addGroup(this.player.getLevel());
        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
        this.fireFromRandomEnemy();
    }

    update() {
        if (this.currentBoss) {
            this.currentBoss.fireWeapon(this.player.getShip());
        }
    }

    launchEnemy(): Enemy {
        const isDead = (enemy: Enemy) => !enemy.exists;
        const deadEnemies = this.enemies.children.filter(isDead);

        if (deadEnemies.length === 0) {
            return null;
        }

        const enemy = sample(deadEnemies);
        const x = this.game.rnd.integerInRange(0, this.game.width);
        enemy.reset(x, -enemy.height, enemy.maxHealth);
        enemy.body.velocity.x = this.game.rnd.integerInRange(-50, 50);
        enemy.body.velocity.y = this.game.rnd.integerInRange(100, 300);

        return enemy;
    }

    launchBoss(): BossShip {
        const playerLevel = this.player.getLevel().get();
        const isOdd = (value) => Boolean(value % 2);

        if (playerLevel > 1 && isOdd(playerLevel) && !this.currentBoss) {
            // const weapon = this.weaponManager.getBossWeapon();
            this.currentBoss = this.bossFactory.create(this.bossLevel);
            // this.currentBoss.changeWeapon(weapon);
            this.currentBoss.reset(
                this.game.width / 2,
                this.currentBoss.height * -1,
                this.currentBoss.maxHealth
            );
            this.gameEvents.onBossAppear.dispatch(this.currentBoss);
            this.currentBoss.events.onKilled.addOnce(() => {
                this.gameEvents.onBossKilled.dispatch(this.currentBoss);
                this.currentBoss = null;
                this.bossLevel.next();
            });

            this.enemies.add(this.currentBoss);
        }

        return this.currentBoss;
    }

    getEnemies(): Phaser.Group {
        return this.enemies;
    }

    getCurrentBoss(): BossShip|null {
        return this.currentBoss;
    }

    private addGroup(level: Level) {
        for (let i = 0; i < 20; i++) {
            this.enemies.add(this.enemyFactory.create(level));
        }
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
