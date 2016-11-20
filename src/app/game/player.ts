import * as Phaser from 'phaser';
import Weapon from './weapon';
import Assets from './assets';
import GameState from "./game_state";
import PlayerControl from "./player_control";

export default class Player extends Phaser.Sprite {
    private static MAX_HEALTH = 100;
    public readonly weapon: Weapon;
    public readonly speed = 300;
    public armor = false;
    public reviving = false;
    private control: PlayerControl;

    constructor(state: GameState) {
        super(state.game, 0, 0, Assets.ship_player);
        state.world.add(this);
        state.physics.arcade.enable(this);
        this.weapon = new Weapon(state, this);
        this.left = (this.game.width - this.width) / 2;
        this.top = this.game.height - this.height - 50;
        this.maxHealth = Player.MAX_HEALTH;
        this.health = this.maxHealth;
        this.control = new PlayerControl(this);
    }

    update() {
        this.control.update();
        this.alpha = !this.armor ? 1 :
            .2 + .6 * Math.abs(Math.sin(new Date().getTime() / 50));
    }

    revive(health?: number) {
        this.reset(
            (this.game.width - this.width) / 2,
            this.game.height,
            Player.MAX_HEALTH
        );

        this.armor = true;
        this.reviving = true;

        setTimeout(() => {
            this.armor = false;
        }, 2000);

        const flyIn = this.game.add.tween(this);
        flyIn.to({y: this.game.height - this.height - 50}, 1000, Phaser.Easing.Cubic.Out, true, 0);
        flyIn.onComplete.addOnce(() => {
            this.reviving = false;
        });

        return this;
    }

    hit(damage: number) {
        if (this.armor === false) {
            this.damage(Math.min(damage, this.health));
        }
    }
}
