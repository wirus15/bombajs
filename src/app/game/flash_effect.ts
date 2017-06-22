import {ConstructorInject} from 'huject';

@ConstructorInject
export default class FlashEffect {
    constructor(private game: Phaser.Game) {}

    flash(sprite: Phaser.Sprite, duration: number = 20) {
        if (this.isAlreadyFlashing(sprite)) {
            return;
        }

        const originalKey = sprite.key;
        const flashBitmap = this.getBitmap(sprite);

        sprite.loadTexture(flashBitmap);

        setTimeout(() => {
            sprite.loadTexture(originalKey);
        }, duration);
    }

    private getBitmap(sprite: Phaser.Sprite): Phaser.BitmapData {
        const key = `${sprite.key}_flash`;
        const bitmap = this.game.add.bitmapData(
            sprite.width,
            sprite.height,
        );

        const anchorX = sprite.anchor.x;
        const anchorY = sprite.anchor.y;
        const rotation = sprite.rotation;

        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        sprite.rotation = 0;

        bitmap.fill(255, 255, 255);
        bitmap.blendDestinationAtop();
        bitmap.draw(sprite, 0, 0, sprite.width, sprite.height);

        sprite.anchor.x = anchorX;
        sprite.anchor.y = anchorY;
        sprite.rotation = rotation;

        this.game.cache.addBitmapData(key, bitmap);

        return bitmap;
    }

    private isAlreadyFlashing(sprite: Phaser.Sprite) {
        if (sprite.key instanceof Phaser.BitmapData) {
            return sprite.key.key.endsWith('_flash');
        }

        if (typeof sprite.key === 'string') {
            return sprite.key.endsWith('_flash');
        }

        return false;
    }
}