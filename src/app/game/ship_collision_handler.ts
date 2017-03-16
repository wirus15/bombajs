import CollisionHandler from "./collision_handler";

export default class ShipCollisionHandler implements CollisionHandler {
    handle(player: Phaser.Sprite, enemy: Phaser.Sprite) {
        player.damage(enemy.health);
        enemy.kill();
    }
}
