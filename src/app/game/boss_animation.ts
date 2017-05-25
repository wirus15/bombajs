import BossShip from "./boss_ship";

export default class BossAnimation {

    private flyInTween: Phaser.Tween;
    private moveToSideTween: Phaser.Tween;
    private flyXTween: Phaser.Tween;
    private flyYTween: Phaser.Tween;

    constructor(private ship: BossShip, private game: Phaser.Game) {}

    start() {
        this.flyInTween = this.game.add.tween(this.ship);
        this.moveToSideTween = this.game.add.tween(this.ship);
        this.flyXTween = this.game.add.tween(this.ship);
        this.flyYTween = this.game.add.tween(this.ship);
        this.flyIn();
    }

    stop() {
        this.game.tweens.removeFrom(this.ship);
    }

    private flyIn() {
        this.flyInTween.to({x: this.game.width / 2, y: this.ship.height / 2 + 20}, 3000, Phaser.Easing.Cubic.Out, true);
        this.flyInTween.onComplete.addOnce(() => this.moveToSide());
    }

    private moveToSide() {
        this.moveToSideTween.to({x: this.ship.width / 2}, 3000, Phaser.Easing.Sinusoidal.InOut, true);
        this.moveToSideTween.onComplete.addOnce(() => this.flyAround());
    }

    private flyAround() {
        this.flyXTween.to({x: this.game.width - this.ship.width / 2}, 6000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        this.flyYTween.to({y: this.ship.height / 2 + 50}, 3200, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    }
}
