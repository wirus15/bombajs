import * as Phaser from 'phaser';

export default class GameSprite {
    public readonly sprite: Phaser.Sprite;
    protected readonly game: Phaser.Game;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        this.game = game;
        this.sprite = sprite;
    }

    get width() {
        return this.sprite.width;
    }

    get height() {
        return this.sprite.height;
    }

    get velocity() {
        return this.sprite.body.velocity;
    }

    get anchor() {
        return this.sprite.anchor;
    }

    get top() {
        return this.sprite.top;
    }

    set top(value: number) {
        this.sprite.top = value;
    }

    get bottom() {
        return this.sprite.bottom;
    }

    set bottom(value: number) {
        this.sprite.bottom = value;
    }

    get left() {
        return this.sprite.left;
    }

    set left(value: number) {
        this.sprite.left = value;
    }

    get right() {
        return this.sprite.right;
    }

    set right(value: number) {
        this.sprite.right = value;
    }

    enablePhysics() {
        this.game.physics.arcade.enable(this.sprite);
    }
}
