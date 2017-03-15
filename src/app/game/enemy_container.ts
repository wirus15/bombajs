import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
// import ExplosionContainer from "./explosion_container";
import Enemy from "./enemy";
import Player from "./player";
import EnemyGroup from "./enemy_group";
import Level from "./level";
import EnemyFactory from "./enemy_factory";

@ConstructorInject
export default class EnemyContainer extends Phaser.Group {
    // public readonly enemyKilled: Phaser.Signal;
    // private readonly explosions: ExplosionContainer;

    private groups: Array<EnemyGroup> = [];

    constructor(
        game: Phaser.Game,
        private enemyFactory: EnemyFactory,
        private player: Player
    ) {
        super(game, undefined, 'enemies', false, true, Phaser.Physics.ARCADE);
        player.level.onChange.add(this.addGroup.bind(this));

        // this.explosions = new ExplosionContainer(this.game);
        // this.enemyKilled = new Phaser.Signal();
        // this.enableBody = true;
        // this.physicsBodyType = Phaser.Physics.ARCADE;
    }

    private addGroup(level: Level) {
        const group = new EnemyGroup(this.game, this.enemyFactory, level);
        this.groups.push(group);
        this.add(group);
    }

    // create(x: number, y: number, key?: string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video, frame?: string|number, exists?: boolean, index?: number): any {
    //     const enemy = super.create(x, y, key, frame, exists, index);
    //     enemy.onShotDown.add(this.onEnemyKilled, this);
    //
    //     return enemy;
    // }
    //
    start() {
        this.addGroup(this.player.level);
        this.groups.forEach((group: Phaser.Group) => {
            group.forEach((enemy: Enemy) => {
                enemy.reset(200, 200);
            }, this);
        });
        // this.game.add.existing(this);
        // this.game.time.events.loop(Phaser.Timer.HALF, this.reviveEnemy, this);
    }
    //
    // private onEnemyKilled(enemy: Enemy) {
    //     this.explosion(enemy);
    //     this.enemyKilled.dispatch(enemy);
    // }
    //
    // private explosion(enemy: Phaser.Sprite) {
    //     this.explosions.display(enemy.x, enemy.y);
    // }
    //
    //
    // private reviveEnemy() {
    //     const enemy = this.getFirstDead(true);
    //     const level = this.game.rnd.integerInRange(1, this.player.level.get());
    //     enemy.changeLevel(level);
    //     enemy.revive();
    // }
}
