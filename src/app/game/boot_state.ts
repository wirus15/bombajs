import {ConstructorInject, Container} from "huject";
import Assets from "./assets";
import StateManager from "./state_manager";

@ConstructorInject
export default class BootState extends Phaser.State {
    constructor(private container: Container) {
        super();
    }

    preload() {
        Assets.load(this.game);
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.time.advancedTiming = true;
        this.container.resolve(StateManager).start('game');
    }
}
