import {ConstructorInject} from 'huject';
import Player from "./player";
import EnemyGroup from "./enemy_group";
import Level from "./level";
import EnemyFactory from "./enemy_factory";
import BossGroup from "./boss_group";
import {sample} from 'lodash';

@ConstructorInject
export default class EnemyContainer extends Phaser.Group {
    private enemyGroups: Array<EnemyGroup> = [];

    constructor(
        game: Phaser.Game,
        private enemyFactory: EnemyFactory,
        private bossGroup: BossGroup,
        private player: Player
    ) {
        super(game, undefined, 'enemies', false);
        player.onLevelChange(this.addGroup, this);
    }

    start() {
        this.game.add.existing(this);
        this.addGroup(this.player.getLevel());
        this.add(this.bossGroup);
        this.bossGroup.start();
        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
    }

    launchEnemy() {
        const group = sample(this.enemyGroups);
        group.launchEnemy();
    }

    private addGroup(level: Level) {
        const group = new EnemyGroup(this.game, this.enemyFactory, level);
        this.enemyGroups.push(group);
        this.add(group);
    }
}
