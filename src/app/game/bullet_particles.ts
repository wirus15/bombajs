import {ConstructorInject} from 'huject';
import Bullet from "./bullet";

@ConstructorInject
export default class BulletParticles {
    private emitter: Phaser.Particles.Arcade.Emitter;

    constructor(private game: Phaser.Game) {
        const bitmap = this.game.add.bitmapData(3, 3);
        bitmap.fill(255, 144, 0);

        this.emitter = this.game.add.emitter(0, 0, 100);
        this.emitter.minParticleSpeed.set(-100, -100);
        this.emitter.maxParticleSpeed.set(100, 100);
        this.emitter.setAlpha(1, 0, 500);
        this.emitter.gravity = 0;
        this.emitter.makeParticles(bitmap);
    }

    explode(bullet: Bullet) {
        this.emitter.x = bullet.x;
        this.emitter.y = bullet.y;

        this.emitter.explode(200, 10);
    }
}