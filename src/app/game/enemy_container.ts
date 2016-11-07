import * as Phaser from 'phaser';
import Enemy from "./enemy";
import ExplosionContainer from "./explosion_container";
import GameAware from "./game_aware";

export default class EnemyContainer extends GameAware {
    public readonly group: Phaser.Group;
    public readonly enemyKilled: Phaser.Signal;
    private readonly explosions: ExplosionContainer;

    constructor(game: Phaser.Game) {
        super(game);
        this.group = this.game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions = new ExplosionContainer(this.game);
        this.enemyKilled = new Phaser.Signal();
    }

    init(number: number) {
        for (let i = 0; i < number; i++) {
            const enemy = new Enemy(this.game);
            this.group.add(enemy.sprite);
            enemy.onKilled.add((sprite: Phaser.Sprite) => {
                this.explosion(sprite);
                this.enemyKilled.dispatch(enemy);
                enemy.reset();
            }, this);
        }
    }

    private explosion(enemy: Phaser.Sprite) {
        this.explosions.display(enemy.x, enemy.y);
    }
}
