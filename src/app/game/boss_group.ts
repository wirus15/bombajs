import EnemyLauncher from "./enemy_launcher";
import BossFactory from "./boss_factory";
import {ConstructorInject} from 'huject';
import Player from "./player";
import Level from "./level";
import GameEvents from "./game_events";
import BossShip from "./boss_ship";

@ConstructorInject
export default class BossGroup extends Phaser.Group implements EnemyLauncher {
    private static readonly MAX_LEVEL = 9;
    private bossLevel: Level;
    private currentBoss: BossShip;

    constructor(
        game: Phaser.Game,
        private bossFactory: BossFactory,
        private player: Player,
        private gameEvents: GameEvents
    ) {
        super(game);
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.bossLevel = new Level(BossGroup.MAX_LEVEL);
        this.player.onLevelChange(this.onLevelChange, this);
    }

    start() {
        this.game.time.events.loop(100, () => {
            if (this.currentBoss) {
                this.currentBoss.fireWeapon(this.player.getShip());
            }
        });
    }

    launchEnemy() {
        this.currentBoss = this.bossFactory.create(this.bossLevel);
        this.add(this.currentBoss);

        this.currentBoss.events.onKilled.addOnce(() => {
            this.currentBoss = null;
        });

        this.currentBoss.reset(
            this.game.width / 2,
            this.currentBoss.height * -1,
            this.currentBoss.maxHealth
        );

        this.gameEvents.onBossAppear.dispatch(this.currentBoss);
        this.currentBoss.events.onKilled.addOnce(() => {
            this.gameEvents.onBossKilled.dispatch(this.currentBoss);
            this.bossLevel.next();
        });
    }

    getCurrentBoss(): BossShip {
        return this.currentBoss;
    }

    private onLevelChange(level: Level) {
        const isOdd = (value) => Boolean(value % 2);
        if (level.get() > 1 && isOdd(level.get()) && !this.currentBoss) {
            this.launchEnemy();
        }
    }
}
