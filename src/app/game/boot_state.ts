import Assets from "./assets";

export default class BootState extends Phaser.State {
    public preload() {
        Assets.load(this.game);
    }

    public create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.time.advancedTiming = true;
        this.game.state.start('game');
    }
}
