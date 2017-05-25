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
        const explosion = this.explosions.getFirstExists(false);
        explosion.reset(exploded.x, exploded.y);
        explosion.play(Assets.explosion, 20, false, true);
        explosion.body.velocity.x = exploded.body.velocity.x;
        explosion.body.velocity.y = exploded.body.velocity.y;
        this.sound.play();
    }

    displayMultiple(exploded: Phaser.Sprite, number: number = 5) {
        const centerX = exploded.x;
        const centerY = exploded.y;

        for (let i = 0; i < number; i++) {
            this.game.time.events.add(i * 100, () => {
                const explosion = this.explosions.getFirstExists(false);
                const x = centerX + this.game.rnd.integerInRange(-50, 50);
                const y = centerY + this.game.rnd.integerInRange(-50, 50);
                explosion.reset(x, y);
                explosion.play(Assets.explosion, 20, false, true);
                this.sound.play();
            }, this);
        }
    }
}
