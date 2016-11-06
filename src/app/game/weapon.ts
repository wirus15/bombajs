import * as Phaser from 'phaser';
import Player from './player';
import Assets from './assets';
import GameAware from "./game_aware";

export default class Weapon extends GameAware {
    private readonly weapon: Phaser.Weapon;
    private readonly player: Player;
    private readonly sound: Phaser.Sound;
    private weaponPower = 20;

    constructor(game: Phaser.Game, player: Player) {
        super(game);
        this.player = player;
        this.sound = this.game.add.audio(Assets.fire_0);
        this.weapon = this.game.add.weapon(30, Assets.missle_player_0);
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletAngleOffset = 90;
        this.weapon.bulletSpeed = 800;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.player.sprite, 44, 0);
        this.weapon.onFire.add(() => this.sound.play());
    }

    fire() {
        this.weapon.fire();
    }

    get bullets() {
        return this.weapon.bullets;
    }

    get power() {
        return this.weaponPower;
    }
}
