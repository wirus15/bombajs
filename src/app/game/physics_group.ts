export default class PhysicsGroup extends Phaser.Group {
    constructor(game: Phaser.Game) {
        super(game, null, null, false, true, Phaser.Physics.ARCADE);
    }
}