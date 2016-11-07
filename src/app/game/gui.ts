import * as Phaser from 'phaser';
import Game from "./game";

export default class GUI {
    private game: Game;
    private textFps: Phaser.Text;
    private textHp: Phaser.Text;
    private textPoints: Phaser.Text;
    private textLives: Phaser.Text;
    private textGameOver: Phaser.Text;

    constructor(game: Game) {
        const style = {font: "16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top"};
        const gameOverStyle = {font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle"};

        this.game = game;
        this.textFps = this.game.add.text(0, 20, '', style);
        this.textHp = this.game.add.text(this.game.width - 150, 20, '', style);
        this.textPoints = this.game.add.text(this.game.width - 150, 40, '', style);
        this.textLives = this.game.add.text(this.game.width - 150, 60, '', style);
        this.textGameOver = this.game.add.text(0, 0, 'GAME OVER', gameOverStyle);
        this.textGameOver.setTextBounds(0, 0, this.game.width, this.game.height);
    }

    update() {
        this.textFps.text = `FPS: ${this.game.time.fps}`;
        this.textHp.text = `HP: ${this.game.player.health}`;
        this.textLives.text = `LIVES: ${this.game.lives}`;
        this.textPoints.text = `POINTS: ${this.game.points}`;
        this.textGameOver.visible = this.game.gameOver;
    }
}
