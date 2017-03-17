import Assets from "./assets";

export default class Shield extends Phaser.Sprite {
    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.shield);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.alpha = 0.5;
        this.scale.x = 0.7;
        this.scale.y = 0.7;
        this.visible = false;
        game.add.tween(this).to({alpha: 1}, 200, "Linear", true, 0, -1, true);
    }
}