import * as Phaser from 'phaser';
import Assets from './assets';
import PlayerMovement from "./player_movement";

export default class PlayerShip extends Phaser.Sprite {
    private static MAX_HEALTH = 100;
    public readonly move: PlayerMovement;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.ship_player);
        this.maxHealth = PlayerShip.MAX_HEALTH;
        this.move = new PlayerMovement(this);
        this.health = this.maxHealth;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.left = (this.game.width - this.width) / 2;
        this.top = this.game.height - this.height + 50;
        this.game.world.add(this);
        this.game.physics.arcade.enable(this);
    }
}


