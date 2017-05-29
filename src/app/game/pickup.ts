import Player from "./player";

abstract class Pickup extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, key: string) {
        super(game, x, y, key);
        this.exists = false;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    }

    abstract onPickup(player: Player);
}

export default Pickup;