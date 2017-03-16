import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
import Player from "./player";
import EnemyGroup from "./enemy_group";
import Level from "./level";
import EnemyFactory from "./enemy_factory";

@ConstructorInject
export default class EnemyContainer extends Phaser.Group {
    constructor(
        game: Phaser.Game,
        private enemyFactory: EnemyFactory,
        private player: Player
    ) {
        super(game, undefined, 'enemies', false);
        player.level.onChange.add(this.addGroup.bind(this));
    }

    start() {
        this.game.stage.addChild(this);
        this.addGroup(this.player.level);
        this.game.time.events.loop(Phaser.Timer.HALF, this.launchEnemy, this);
    }

    launchEnemy() {
        this.getRandom().launchEnemy();
    }

    private addGroup(level: Level) {
        const group = new EnemyGroup(this.game, this.enemyFactory, level);
        this.add(group);
    }
}
