import Assets from "./assets";

export default class Shield extends Phaser.Sprite {
    private animation: Phaser.Tween;
    private fadeIn: Phaser.Tween;
    private fadeOut: Phaser.Tween;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.shield);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.alpha = 0;
        this.scale.x = 0.7;
        this.scale.y = 0.7;

        this.animation = game.add.tween(this)
            .to({alpha: 0.6}, 200, "Linear", false, 0, -1, true);

        this.fadeIn = game.add.tween(this).to({alpha: 1}, 500, "Linear");
        this.fadeIn.onStart.add(() => this.visible = true);
        this.fadeIn.onComplete.add(() => this.animation.start());
        this.fadeOut = game.add.tween(this).to({alpha: 0}, 500, "Linear");
        this.fadeOut.onComplete.add(() => this.visible = false);
        this.fadeOut.onStart.add(() => this.animation.stop());
    }

    show() {
        this.fadeIn.start();
    }

    hide() {
        this.fadeOut.start();
    }
}