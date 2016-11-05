import * as Phaser from 'phaser';
import Assets from './assets';

export default class ExplosionContainer {
    private game: Phaser.Game;
    private explosions: Phaser.Group;
    private sound: Phaser.Sound;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, Assets.explosion);
        this.explosions.forEach((explosion: Phaser.Sprite) => {
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;
            explosion.animations.add(Assets.explosion);
        }, this);
        this.sound = this.game.add.audio(Assets.explosion_sound);
    }

    display(x: number, y:number) {
        let explosion = this.explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play(Assets.explosion, 20, false, true);
        this.sound.play();
    }
}
