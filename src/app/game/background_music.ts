import GameAware from "./game_aware";
import * as Phaser from 'phaser';
import Assets from './assets';

export default class BackgroundMusic extends GameAware {
    private music: Phaser.Sound;

    constructor(game: Phaser.Game) {
        super(game);
        this.music = this.game.add.audio(Assets.background_music_0, 1, true);
    }

    public play() {
        this.music.play();
    }
}
