import {ConstructorInject} from 'huject';
import Background from "./background";
import BackgroundMusic from "./background_music";
import Player from "./player";
import EnemyContainer from "./enemy_container";
import Collisions from "./collisions";
import Explosions from "./explosions";
import GUI from "./gui";
import PickupDispenser from "./pickup_dispenser";
import ObstacleContainer from "./obstacle_container";

@ConstructorInject
export default class GameState extends Phaser.State {
    constructor(
        private background: Background,
        private backgroundMusic: BackgroundMusic,
        private player: Player,
        private enemies: EnemyContainer,
        private collisions: Collisions,
        private explosions: Explosions,
        private pickups: PickupDispenser,
        private obstacles: ObstacleContainer,
        private gui: GUI
    ) {
        super();
    }

    update() {
        this.player.update();
        this.enemies.update();
        this.collisions.update();
        this.gui.update();
    }
}
