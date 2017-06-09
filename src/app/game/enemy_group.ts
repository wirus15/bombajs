import Enemy from "./enemy";
import PhysicsGroup from "./physics_group";

export default class EnemyGroup extends PhysicsGroup {
    constructor(game: Phaser.Game) {
        super(game);
        this.classType = Enemy;
        this.ignoreDestroy = true;
    }
}