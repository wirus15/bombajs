import * as Phaser from 'phaser';

interface CollisionHandler {
    handle(a: Phaser.Sprite, b: Phaser.Sprite);
}

export default CollisionHandler;
