import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
import Assets from './assets';

@ConstructorInject
export default class Explosions extends Phaser.Group {
    private sound: Phaser.Sound;

    constructor(game: Phaser.Game) {
        super(game);
    }

    init() {
        this.game.add.existing(this);
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.createMultiple(30, Assets.explosion);
        this.forEach((explosion: Phaser.Sprite) => {
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;
            explosion.animations.add(Assets.explosion);
        }, this);
        this.sound = this.game.add.audio(Assets.explosion_sound);
    }

    display(exploded: Phaser.Sprite) {
        let explosion = this.getFirstExists(false);
        explosion.reset(exploded.x, exploded.y);
        explosion.play(Assets.explosion, 20, false, true);
        explosion.body.velocity.x = exploded.body.velocity.x;
        explosion.body.velocity.y = exploded.body.velocity.y;
        this.sound.play();
    }
}
