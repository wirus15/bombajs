import Assets from "./assets";

export default class BootState extends Phaser.State {
    preload() {
        Assets.load(this.game);
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.time.advancedTiming = true;
        this.game.state.start('game');
    }
}
