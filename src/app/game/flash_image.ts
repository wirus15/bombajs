export default class FlashImage {

    private image: Phaser.Image;

    constructor(private sprite: Phaser.Sprite) {

    }

    flash() {
        const bitmap: Phaser.BitmapData = this.createRectTexture();
        bitmap.blendDestinationAtop();
        bitmap.draw(this.sprite, this.sprite.width / 2, this.sprite.height / 2, this.sprite.width, this.sprite.height);
        this.image = this.sprite.game.add.image(0, 0, bitmap);
        this.image.anchor.x = this.sprite.anchor.x;
        this.image.anchor.y = this.sprite.anchor.y;
        this.image.x = this.sprite.x;
        this.image.y = this.sprite.y;

        setTimeout(() => {
            this.image.destroy();
        }, 10);
    }

    private createRectTexture(): Phaser.BitmapData {
        const texture: Phaser.BitmapData = this.sprite.game.add.bitmapData(
            this.sprite.width,
            this.sprite.height
        );

        texture.fill(255, 255, 255);

        return texture;
    }
}