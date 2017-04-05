import * as Phaser from 'phaser';
import Assets from './assets';
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class BackgroundMusic {
    private music: Phaser.Sound;

    constructor(private game: Phaser.Game) {}

    public create() {
        this.music = this.game.add.audio(Assets.background_music_0, 1, true);
    }

    public play() {
        this.music.play();
    }
}
