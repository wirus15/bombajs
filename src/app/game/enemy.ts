import FlashImage from "./flash_image";

export default class Enemy extends Phaser.Sprite {

    private flashImage: FlashImage;

    constructor(readonly game: Phaser.Game) {
        super(game, 0, 0);
        this.exists = false;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(() => {
            if (this.top > 0) {
                this.kill();
            }
        });
        this.flashImage = new FlashImage(this);
    }

    flash() {
        this.flashImage.flash();
    }
}
