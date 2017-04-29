import {ConstructorInject} from 'huject';
import Background from "./background";
import BackgroundMusic from "./background_music";
import Player from "./player";
import EnemyContainer from "./enemy_container";
import Collisions from "./collisions";
import Explosions from "./explosions";
import GUI from "./gui";
import Listeners from "./listeners";

@ConstructorInject
export default class GameState extends Phaser.State {
    constructor(
        private background: Background,
        private backgroundMusic: BackgroundMusic,
        private player: Player,
        private enemyContainer: EnemyContainer,
        private collisions: Collisions,
        private explosions: Explosions,
        private gui: GUI,
        private listeners: Listeners
    ) {
        super();
    }

    create() {
        this.background.create();
        this.backgroundMusic.create();
        this.backgroundMusic.play();
        this.player.create();
        this.enemyContainer.start();
        this.explosions.init();
        this.gui.create();
    }

    update() {
        this.player.update();
        this.collisions.check();
        this.gui.update();
    }
}
