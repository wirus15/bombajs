import * as Phaser from 'phaser';
import {injectable, optional, unmanaged} from "inversify";
// import Weapon from './weapon';
import Assets from './assets';
import PlayerMovement from "./player_movement";
// import GameState from "./game_state";
// import PlayerControl from "./player_control";

export default class PlayerShip extends Phaser.Sprite {
    private static MAX_HEALTH = 100;
    public readonly move: PlayerMovement;
    // public readonly weapon: Weapon;
    // public readonly speed = 300;
    // public armor = false;
    // private control: PlayerControl;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.ship_player);
        this.maxHealth = PlayerShip.MAX_HEALTH;
        this.health = this.maxHealth;
        this.left = (this.game.width - this.width) / 2;
        this.top = this.game.height - this.height + 50;
        this.game.physics.arcade.enable(this);
        this.game.world.add(this);
        this.move = new PlayerMovement(this);
    }

    create() {

    }

        // state.world.add(this);
        // state.physics.arcade.enable(this);

        // this.weapon = new Weapon(state, this);
        // this.control = new PlayerControl(this);

    // }
    update() {
        // this.control.update();
        // this.armorAnimate();
    }

    // revive(health?: number) {
    //     const x = (this.game.width - this.width) / 2;
    //     const y = this.game.height;
    //     this.reset(x, y, PlayerShip.MAX_HEALTH);
    //     this.enableArmor(2000);
    //     this.flyIn();
    //
    //     return this;
    // }
    //
    // hit(damage: number) {
    //     if (this.armor === false) {
    //         this.damage(Math.min(damage, this.health));
    //     }
    // }
    //
    // private armorAnimate() {
    //     if (this.armor === false) {
    //         this.alpha = 1;
    //         return;
    //     }
    //
    //     this.alpha = .2 + .6 * Math.abs(Math.sin(new Date().getTime() / 50));
    // }
    //
    // private flyIn() {
    //     const tween = this.game.add.tween(this);
    //     const destination = {y: this.game.height - this.height - 50};
    //     tween.to(destination, 1000, Phaser.Easing.Cubic.Out, true, 0);
    // }
    //
    // private enableArmor(time: number) {
    //     this.armor = true;
    //
    //     setTimeout(() => {
    //         this.armor = false;
    //     }, time);
    // }
}


