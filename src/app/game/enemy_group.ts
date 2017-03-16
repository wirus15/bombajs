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
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        for (let i = 0; i < 20; i++) {
            this.add(enemyFactory.create(level));
        }
    }

    launchEnemy() {
        let enemy;
        if (enemy = this.getFirstExists(false)) {
            const x = this.game.rnd.integerInRange(0, this.game.width);
            enemy.reset(x, -100, enemy.maxHealth);
            enemy.body.velocity.x = this.game.rnd.integerInRange(-50, 50);
            enemy.body.velocity.y = this.game.rnd.integerInRange(100, 300);
        }
    }
}
