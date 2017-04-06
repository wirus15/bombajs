import EnemyLauncher from "./enemy_launcher";
import BossFactory from "./boss_factory";
import {ConstructorInject} from 'huject';
import Player from "./player";
import Level from "./level";

@ConstructorInject
export default class BossGroup extends Phaser.Group implements EnemyLauncher {
    constructor(
        game: Phaser.Game,
        private bossFactory: BossFactory,
        private player: Player
    ) {
        super(game);
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.player.level.onChange.add(this.onLevelChange, this);
    }

    launchEnemy() {
        const boss = this.bossFactory.create(this.player.level);
        this.add(boss);
        boss.reset(200, 50, boss.maxHealth);
    }

    private onLevelChange(level: Level) {
        const isOdd = (value) => Boolean(value % 2);
        if (level.get() > 1 && isOdd(level.get())) {
            this.launchEnemy();
        }
    }
}
