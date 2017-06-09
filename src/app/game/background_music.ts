import Assets from './assets';
import {ConstructorInject} from 'huject';
import GameEvents from "./game_events";

@ConstructorInject
export default class BackgroundMusic {
    private normalMusic: Phaser.Sound;
    private bossMusic: Phaser.Sound;

    constructor(
        private game: Phaser.Game,
        private gameEvents: GameEvents
    ) {
        this.normalMusic = this.game.add.audio(Assets.background_music_0, 1, true);
        this.bossMusic = this.game.add.audio(Assets.background_music_1, 1, true);

        this.gameEvents.onBossAppear.add(this.switchToBossMusic, this);
        this.gameEvents.onBossKilled.add(this.switchToNormalMusic, this);

        this.normalMusic.play();
    }

    switchToNormalMusic() {
        this.bossMusic.fadeOut(200);
        this.normalMusic.fadeIn(200, true);
    }

    switchToBossMusic() {
        this.normalMusic.fadeOut(200);
        this.bossMusic.fadeIn(200, true);
    }
}
