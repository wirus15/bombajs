import * as Phaser from 'phaser';

export default class Assets {
    static readonly ship_player = 'ship_player';
    static readonly missle_player_0 = 'missle_player_0';
    static readonly ship_normal_01 = 'ship_normal_01';
    static readonly explosion = 'explosion';
    static readonly background_music_0 = 'background_music_0';
    static readonly explosion_sound = 'explosion';
    static readonly fire_0 = 'fire_0';

    static load(game: Phaser.Game) {
        game.load.image(this.ship_player, 'public/images/ship_player.png');
        game.load.image(this.missle_player_0, 'public/images/missle_player_0.png');
        game.load.image(this.ship_normal_01, 'public/images/ship_normal_01.png');
        game.load.spritesheet(this.explosion, 'public/images/explosion.png', 71, 100);
        game.load.audio(this.background_music_0, 'public/audio/background_music_0.wav');
        game.load.audio(this.explosion_sound, 'public/audio/explosion.wav');
        game.load.audio(this.fire_0, 'public/audio/fire_0.wav');
    }
}
