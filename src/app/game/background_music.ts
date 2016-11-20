import * as Phaser from 'phaser';
import Assets from './assets';
import GameState from "./game_state";

export default class BackgroundMusic {
    private music: Phaser.Sound;

    constructor(private state: GameState) {
        this.music = this.state.add.audio(Assets.background_music_0, 1, true);
    }

    public play() {
        this.music.play();
    }
}
