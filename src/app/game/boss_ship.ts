import Enemy from "./enemy";

export default class BossShip extends Enemy {
    constructor(
        game: Phaser.Game,
        maxHealth: number,
        damageAmount: number,
        sprite: string
    ) {
        super(game, maxHealth, damageAmount, sprite);
    }

    startFlying() {
        const flyIn = this.game.add.tween(this);
        const moveToSide = this.game.add.tween(this);
        const xTween = this.game.add.tween(this);
        const yTween = this.game.add.tween(this);

        flyIn.to({x: this.game.width / 2, y: this.height / 2 + 20}, 3000, Phaser.Easing.Cubic.Out, true);
        flyIn.onComplete.addOnce(() => {
            moveToSide.start();
            yTween.start();
        });

        moveToSide.to({x: this.width / 2}, 3000, Phaser.Easing.Sinusoidal.InOut, false);
        moveToSide.onComplete.addOnce(() => xTween.start());

        xTween.to({x: this.game.width - this.width / 2}, 6000, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
        yTween.to({y: this.height / 2 + 50}, 3200, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
    }

    reset(x: number, y: number, health?: number): Phaser.Sprite {
        const result = super.reset(x, y, health);
        this.startFlying();
        return result;
    }
}
