import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
// import ExplosionContainer from "./explosion_container";
import Enemy from "./enemy";
import Player from "./player";

@ConstructorInject
export default class EnemyContainer extends Phaser.Group {
    // public readonly enemyKilled: Phaser.Signal;
    // private readonly explosions: ExplosionContainer;

    constructor(game: Phaser.Game, private player: Player) {
        super(game, undefined, 'enemies', false, true, Phaser.Physics.ARCADE);
        this.classType = Enemy;
        // this.explosions = new ExplosionContainer(this.game);
        // this.enemyKilled = new Phaser.Signal();
        // this.enableBody = true;
        // this.physicsBodyType = Phaser.Physics.ARCADE;
    }

    // create(x: number, y: number, key?: string|Phaser.RenderTexture|Phaser.BitmapData|Phaser.Video, frame?: string|number, exists?: boolean, index?: number): any {
    //     const enemy = super.create(x, y, key, frame, exists, index);
    //     enemy.onShotDown.add(this.onEnemyKilled, this);
    //
    //     return enemy;
    // }
    //
    start() {
        this.game.add.existing(this);
        this.game.time.events.loop(Phaser.Timer.HALF, this.reviveEnemy, this);
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

    private reviveEnemy() {
        const enemy = this.getFirstDead(true);
        const level = this.game.rnd.integerInRange(1, this.player.level.get());
        enemy.changeLevel(level);
        enemy.revive();
    }
}
