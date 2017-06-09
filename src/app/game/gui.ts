import {ConstructorInject} from 'huject';
import Player from "./player";
import GameEvents from "./game_events";
import EnemyContainer from "./enemy_container";

@ConstructorInject
export default class GUI {
    private textFps: Phaser.Text;
    private textHp: Phaser.Text;
    private textPoints: Phaser.Text;
    private textLives: Phaser.Text;
    private textGameOver: Phaser.Text;
    private textLevel: Phaser.Text;
    private textBossHealth: Phaser.Text;
    private textDoubleDamage: Phaser.Text;
    private textShield: Phaser.Text;

    constructor(
        private game: Phaser.Game,
        private player: Player,
        private gameEvents: GameEvents,
        private enemies: EnemyContainer
    ) {
        this.gameEvents.onGameOver.add(() => this.textGameOver.visible = true);
        this.gameEvents.onBossAppear.add(() => this.textBossHealth.visible = true);
        this.gameEvents.onBossKilled.add(() => this.textBossHealth.visible = false);

        const style = {font: "16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "top"};
        const gameOverStyle = {font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle"};

        this.textFps = this.game.add.text(0, 20, '', style);
        this.textHp = this.game.add.text(this.game.width - 150, 20, '', style);
        this.textPoints = this.game.add.text(this.game.width - 150, 40, '', style);
        this.textLives = this.game.add.text(this.game.width - 150, 60, '', style);
        this.textLevel = this.game.add.text(this.game.width - 150, 80, '', style);
        this.textBossHealth = this.game.add.text(this.game.width - 150, 100, '', style);
        this.textBossHealth.visible = false;
        this.textGameOver = this.game.add.text(0, 0, 'GAME OVER', gameOverStyle);
        this.textGameOver.setTextBounds(0, 0, this.game.width, this.game.height);
        this.textGameOver.visible = false;
        this.textDoubleDamage = this.game.add.text(this.game.width - 150, 120, '', style);
        this.textDoubleDamage.visible = false;
        this.textShield = this.game.add.text(this.game.width - 150, 140, '', style);
        this.textShield.visible = false;
    }

    update() {
        this.textFps.text = `FPS: ${this.game.time.fps}`;
        this.textHp.text = `HP: ${this.player.ship.health}`;
        this.textLives.text = `LIVES: ${this.player.lives}`;
        this.textPoints.text = `POINTS: ${this.player.points}`;
        this.textLevel.text = `LEVEL: ${this.player.level}`;

        const currentBoss = this.enemies.boss;
        this.textBossHealth.text = `BOSS: ${currentBoss.health} / ${currentBoss.maxHealth}`;
        this.textBossHealth.visible = currentBoss.exists;

        const doubleDamageTimer = this.player.ship.weapon.doubleDamageTimer;
        this.textDoubleDamage.visible = doubleDamageTimer.value > 0;
        this.textDoubleDamage.text = `2X DAMAGE: ${doubleDamageTimer}`;

        const shieldTimer = this.player.ship.shieldTimer;
        this.textShield.visible = shieldTimer.value > 0;
        this.textShield.text = `SHIELD: ${shieldTimer}`;
    }
}
