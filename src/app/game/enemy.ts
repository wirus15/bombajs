export default class Enemy extends Phaser.Sprite {
    constructor(readonly game: Phaser.Game) {
        super(game, 0, 0);
        this.exists = false;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(() => {
            if (this.top > 0) {
                this.kill();
            }
        });
    }
}
