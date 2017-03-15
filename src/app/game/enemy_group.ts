import * as Phaser from 'phaser';
import Level from "./level";
import EnemyFactory from "./enemy_factory";

export default class EnemyGroup extends Phaser.Group {
    constructor(
        game: Phaser.Game,
        enemyFactory: EnemyFactory,
        level: Level
    ) {
        super(game);
        for (let i = 0; i < 20; i++) {
            this.add(enemyFactory.create(level));
        }
    }
}
