import Enemy from "./enemy";
import BossAnimation from "./boss_animation";

export default class BossShip extends Enemy {
    private animation: BossAnimation;

    constructor(
        game: Phaser.Game,
        maxHealth: number,
        damageAmount: number,
        sprite: string
    ) {
        super(game, maxHealth, damageAmount, sprite);
        this.animation = new BossAnimation(this, game);
    }

    reset(x: number, y: number, health?: number): Phaser.Sprite {
        const result = super.reset(x, y, health);
        this.animation.start();

        return result;
    }
}
