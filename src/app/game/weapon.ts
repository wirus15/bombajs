// import * as Phaser from 'phaser';
// import Player from './player';
// import Assets from './assets';
// import Bullet from "./bullet";
// import GameState from "./game_state";
//
// export default class Weapon extends Phaser.Weapon {
//     private sound: Phaser.Sound;
//
//     constructor(state: GameState, player: Player) {
//         super(state.game, state.game.plugins);
//         this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//         this.bulletAngleOffset = 90;
//         this.bulletSpeed = 800;
//         this.fireRate = 100;
//         this.sound = state.add.audio(Assets.fire_0);
//         this.trackSprite(player, 44, 0);
//         this.onFire.add(() => this.sound.play());
//         this.createBullets(0);
//         this.bulletClass = Bullet;
//         this.createBullets(30, Assets.missle_player_0);
//     }
// }
