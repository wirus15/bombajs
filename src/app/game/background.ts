import * as Phaser from 'phaser';
import {injectable} from 'inversify';

@injectable()
export default class Background {
    private static readonly STAR_COLOR = '#ffffff';

    constructor(private game: Phaser.Game) {}

    public create() {
        for (let i = 0; i < 3; i++) {
            const bitmap = this.createBitmap(600, 600, 20);
            this.createTileSprite(bitmap, i);
        }
    }

    private createBitmap(width: number, height: number, stars: number): Phaser.BitmapData {
        const bitmap = this.game.make.bitmapData(width, height);
        for (let i = 0; i < stars; i++) {
            bitmap.circle(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 1.5,
                Background.STAR_COLOR
            );
        }

        return bitmap;
    }

    private createTileSprite(bitmap: Phaser.BitmapData, speedFactor: number) {
        const background = this.game.add.tileSprite(
            0, 0,
            this.game.width,
            this.game.height,
            bitmap
        );

        background.autoScroll(0, 200 + 50 * speedFactor);

        return background;
    }
}
