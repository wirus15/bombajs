export default class Enemy extends Phaser.Sprite {
    private damageAmount: number = 20;

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

    getDamageAmount(): number {
        return this.damageAmount;
    }

    setDamageAmount(value: number) {
        this.damageAmount = value;
    }
}
