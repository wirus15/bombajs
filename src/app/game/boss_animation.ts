import BossShip from "./boss_ship";

export default class BossAnimation {
    private flyIn: Phaser.Tween;
    private moveToSide: Phaser.Tween;
    private xTween: Phaser.Tween;
    private yTween: Phaser.Tween;

    constructor(private ship: BossShip, private game: Phaser.Game) {
        this.flyIn = this.game.add.tween(ship);
        this.moveToSide = this.game.add.tween(ship);
        this.xTween = this.game.add.tween(ship);
        this.yTween = this.game.add.tween(ship);
    }

    start() {
        this.flyIn.to({x: this.game.width / 2, y: this.ship.height / 2 + 20}, 3000, Phaser.Easing.Cubic.Out, true);
        this.flyIn.onComplete.addOnce(() => {
            this.moveToSide.start();
            this.yTween.start();
        });

        this.moveToSide.to({x: this.ship.width / 2}, 3000, Phaser.Easing.Sinusoidal.InOut, false);
        this.moveToSide.onComplete.addOnce(() => this.xTween.start());

        this.xTween.to({x: this.game.width - this.ship.width / 2}, 6000, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
        this.yTween.to({y: this.ship.height / 2 + 50}, 3200, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
    }
}
