import BossShip from "./boss_ship";

export default class BossAnimation {
    constructor(private ship: BossShip, private game: Phaser.Game) {}

    start() {
        this.flyIn();
    }

    private flyIn() {
        const tween = this.game.add.tween(this.ship);
        tween.to({x: this.game.width / 2, y: this.ship.height / 2 + 20}, 3000, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.addOnce(() => this.moveToSide());
    }

    private moveToSide() {
        const tween = this.game.add.tween(this.ship);
        tween.to({x: this.ship.width / 2}, 3000, Phaser.Easing.Sinusoidal.InOut, true);
        tween.onComplete.addOnce(() => this.flyAround());
    }

    private flyAround() {
        const xTween = this.game.add.tween(this.ship);
        const yTween = this.game.add.tween(this.ship);

        xTween.to({x: this.game.width - this.ship.width / 2}, 6000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        yTween.to({y: this.ship.height / 2 + 50}, 3200, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    }
}
