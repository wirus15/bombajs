import EnemyLauncher from "./enemy_launcher";
import BossFactory from "./boss_factory";
import {ConstructorInject} from 'huject';
import Player from "./player";
import Level from "./level";
import Enemy from "./enemy";
import GameEvents from "./game_events";

@ConstructorInject
export default class BossGroup extends Phaser.Group implements EnemyLauncher {
    private static readonly MAX_LEVEL = 9;
    private bossLevel: Level;
    private _currentBoss: Enemy;

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
        this.player.level.onChange.add(this.onLevelChange, this);
    }

    launchEnemy() {
        this._currentBoss = this.bossFactory.create(this.bossLevel);
        this.add(this._currentBoss);

        this._currentBoss.events.onKilled.addOnce(() => {
            this._currentBoss = null;
        });

        this._currentBoss.reset(
            this.game.width / 2,
            -this._currentBoss.height,
            this._currentBoss.maxHealth
        );

        this.gameEvents.onBossAppear.dispatch(this._currentBoss);
        this._currentBoss.events.onKilled.addOnce(() => {
            this.gameEvents.onBossKilled.dispatch(this._currentBoss);
            this.bossLevel.next();
        });
    }

    get currentBoss() {
        return this._currentBoss;
    }

    private onLevelChange(level: Level) {
        const isOdd = (value) => Boolean(value % 2);
        if (level.get() > 1 && isOdd(level.get()) && !this._currentBoss) {
            this.launchEnemy();
        }
    }
}
