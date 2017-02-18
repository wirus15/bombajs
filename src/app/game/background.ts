import * as Phaser from 'phaser';
import GameState from "./game_state";

export default class Background {
    private static readonly STAR_COLOR = '#ffffff';
    private backgrounds = [];

    constructor(private state: GameState) {
        for (let i = 0; i < 3; i++) {
            const bitmap = this.createBitmap(600, 600, 20);
            const background = this.createTileSprite(bitmap, i);
            this.backgrounds.push(background);
        }
    }

    private createBitmap(width: number, height: number, stars: number): Phaser.BitmapData {
        const bitmap = this.state.make.bitmapData(width, height);
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
        const background = this.state.add.tileSprite(
            0, 0,
            this.state.game.width,
            this.state.game.height,
            bitmap
        );

        background.autoScroll(0, 200 + 50 * speedFactor);

        return background;
    }
}
