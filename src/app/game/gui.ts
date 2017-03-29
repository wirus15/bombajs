import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
import Player from "./player";
import GameEvents from "./game_events";

@ConstructorInject
export default class GUI {
    private textFps: Phaser.Text;
    private textHp: Phaser.Text;
    private textPoints: Phaser.Text;
    private textLives: Phaser.Text;
    private textGameOver: Phaser.Text;
    private textLevel: Phaser.Text;

    constructor(
        private game: Phaser.Game,
        private player: Player,
        private gameEvents: GameEvents
    ) {
        this.gameEvents.onGameOver.add(() => this.textGameOver.visible = true);
    }

    create() {
        const style = {font: "16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top"};
        const gameOverStyle = {font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle"};

        this.textFps = this.game.add.text(0, 20, '', style);
        this.textHp = this.game.add.text(this.game.width - 150, 20, '', style);
        this.textPoints = this.game.add.text(this.game.width - 150, 40, '', style);
        this.textLives = this.game.add.text(this.game.width - 150, 60, '', style);
        this.textLevel = this.game.add.text(this.game.width - 150, 80, '', style);
        this.textGameOver = this.game.add.text(0, 0, 'GAME OVER', gameOverStyle);
        this.textGameOver.setTextBounds(0, 0, this.game.width, this.game.height);
        this.textGameOver.visible = false;
    }

    update() {
        this.textFps.text = `FPS: ${this.game.time.fps}`;
        this.textHp.text = `HP: ${this.player.ship.health}`;
        this.textLives.text = `LIVES: ${this.player.lives}`;
        this.textPoints.text = `POINTS: ${this.player.points.get()}`;
        this.textLevel.text = `LEVEL: ${this.player.level.get()}`;
    }
}
