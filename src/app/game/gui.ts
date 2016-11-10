import * as Phaser from 'phaser';
import GameState from "./game_state";

export default class GUI {
    private state: GameState;
    private textFps: Phaser.Text;
    private textHp: Phaser.Text;
    private textPoints: Phaser.Text;
    private textLives: Phaser.Text;
    private textGameOver: Phaser.Text;

    constructor(state: GameState) {
        const style = {font: "16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top"};
        const gameOverStyle = {font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle"};

        this.state = state;
        this.textFps = this.game.add.text(0, 20, '', style);
        this.textHp = this.game.add.text(this.game.width - 150, 20, '', style);
        this.textPoints = this.game.add.text(this.game.width - 150, 40, '', style);
        this.textLives = this.game.add.text(this.game.width - 150, 60, '', style);
        this.textGameOver = this.game.add.text(0, 0, 'GAME OVER', gameOverStyle);
        this.textGameOver.setTextBounds(0, 0, this.game.width, this.game.height);
    }

    update() {
        this.textFps.text = `FPS: ${this.game.time.fps}`;
        this.textHp.text = `HP: ${this.state.player.health}`;
        this.textLives.text = `LIVES: ${this.state.lives}`;
        this.textPoints.text = `POINTS: ${this.state.points}`;
        this.textGameOver.visible = this.state.gameOver;
    }

    private get game() {
        return this.state.game;
    }
}
