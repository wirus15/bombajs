import Assets from "./assets";
import Timer from "./timer";

export default class Shield extends Phaser.Sprite {
    private animation: Phaser.Tween;
    private fadeIn: Phaser.Tween;
    private fadeOut: Phaser.Tween;
    private _timer: Timer;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.shield);
        this._timer = new Timer(this.game);
        this._timer.onTimeout(this.hide, this);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.alpha = 0;
        this.scale.x = 0.7;
        this.scale.y = 0.7;
    }

    show(duration: number) {
        this._timer.value = duration;
        this.animation = this.game.add.tween(this);
        this.fadeIn = this.game.add.tween(this);
        this.fadeOut = this.game.add.tween(this);

        this.fadeIn.to({alpha: 1}, 500, "Linear");
        this.fadeIn.onStart.add(() => this.visible = true);
        this.fadeIn.chain(this.animation);

        this.fadeOut.to({alpha: 0}, 500, "Linear");
        this.fadeOut.onComplete.add(() => this.visible = false);

        this.animation.to({alpha: 0.6}, 200, "Linear", false, 0, -1, true);
        this.animation.chain(this.fadeOut);

        this.fadeIn.start();
    }

    hide() {
        this.animation.stop(true);
        this.animation.pendingDelete = false;
    }

    get timer(): Timer {
        return this._timer;
    }
}
