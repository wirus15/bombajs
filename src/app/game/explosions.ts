import {ConstructorInject} from 'huject';
import Assets from './assets';

@ConstructorInject
export default class Explosions {
    private sound: Phaser.Sound;
    private explosions: Phaser.Group;

    constructor(private game: Phaser.Game) {}

    create() {
        this.explosions = this.game.add.physicsGroup();
        this.explosions.createMultiple(30, Assets.explosion);
        this.explosions.forEach((explosion: Phaser.Sprite) => {
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;
            explosion.animations.add(Assets.explosion);
        }, this);
        this.sound = this.game.add.audio(Assets.explosion_sound);
    }

    display(exploded: Phaser.Sprite) {
        let explosion = this.explosions.getFirstExists(false);
        explosion.reset(exploded.x, exploded.y);
        explosion.play(Assets.explosion, 20, false, true);
        explosion.body.velocity.x = exploded.body.velocity.x;
        explosion.body.velocity.y = exploded.body.velocity.y;
        this.sound.play();
    }
}
