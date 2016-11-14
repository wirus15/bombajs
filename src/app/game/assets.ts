import * as Phaser from 'phaser';

export default class Assets {
    static readonly ship_player = 'ship_player';
    static readonly missle_player_0 = 'missle_player_0';
    static readonly ship_normal_01 = 'ship_normal_01';
    static readonly ship_normal_02 = 'ship_normal_02';
    static readonly ship_normal_03 = 'ship_normal_03';
    static readonly ship_normal_04 = 'ship_normal_04';
    static readonly ship_normal_05 = 'ship_normal_05';
    static readonly ship_normal_06 = 'ship_normal_06';
    static readonly ship_normal_07 = 'ship_normal_07';
    static readonly ship_normal_08 = 'ship_normal_08';
    static readonly ship_normal_09 = 'ship_normal_09';
    static readonly ship_normal_10 = 'ship_normal_10';
    static readonly ship_normal_11 = 'ship_normal_11';
    static readonly ship_normal_12 = 'ship_normal_12';
    static readonly ship_normal_13 = 'ship_normal_13';
    static readonly ship_normal_14 = 'ship_normal_14';
    static readonly ship_normal_15 = 'ship_normal_15';
    static readonly ship_normal_16 = 'ship_normal_16';
    static readonly explosion = 'explosion';
    static readonly background_music_0 = 'background_music_0';
    static readonly explosion_sound = 'explosion';
    static readonly fire_0 = 'fire_0';

    static load(game: Phaser.Game) {
        game.load.image(this.ship_player, 'public/images/ship_player.png');
        game.load.image(this.missle_player_0, 'public/images/missle_player_0.png');
        game.load.image(this.ship_normal_01, 'public/images/ship_normal_01.png');
        game.load.image(this.ship_normal_02, 'public/images/ship_normal_02.png');
        game.load.image(this.ship_normal_03, 'public/images/ship_normal_03.png');
        game.load.image(this.ship_normal_04, 'public/images/ship_normal_04.png');
        game.load.image(this.ship_normal_05, 'public/images/ship_normal_05.png');
        game.load.image(this.ship_normal_06, 'public/images/ship_normal_06.png');
        game.load.image(this.ship_normal_07, 'public/images/ship_normal_07.png');
        game.load.image(this.ship_normal_08, 'public/images/ship_normal_08.png');
        game.load.image(this.ship_normal_09, 'public/images/ship_normal_09.png');
        game.load.image(this.ship_normal_10, 'public/images/ship_normal_10.png');
        game.load.image(this.ship_normal_11, 'public/images/ship_normal_11.png');
        game.load.image(this.ship_normal_12, 'public/images/ship_normal_12.png');
        game.load.image(this.ship_normal_13, 'public/images/ship_normal_13.png');
        game.load.image(this.ship_normal_14, 'public/images/ship_normal_14.png');
        game.load.image(this.ship_normal_15, 'public/images/ship_normal_15.png');
        game.load.image(this.ship_normal_16, 'public/images/ship_normal_16.png');
        game.load.spritesheet(this.explosion, 'public/images/explosion.png', 71, 100);
        game.load.audio(this.background_music_0, 'public/audio/background_music_0.wav');
        game.load.audio(this.explosion_sound, 'public/audio/explosion.wav');
        game.load.audio(this.fire_0, 'public/audio/fire_0.wav');
    }
}
