import Enemy from "./enemy";
import BossAnimation from "./boss_animation";
import BossWeapon from "./boss_weapon";
import PlayerShip from "./player_ship";

export default class BossShip extends Enemy {
    private animation: BossAnimation;
    private weapon: BossWeapon;

    constructor(
        game: Phaser.Game,
        maxHealth: number,
        damageAmount: number,
        sprite: string
    ) {
        super(game, maxHealth, damageAmount, sprite);
        this.animation = new BossAnimation(this, game);
        this.weapon = new BossWeapon(this);
    }

    reset(x: number, y: number, health?: number): Phaser.Sprite {
        const result = super.reset(x, y, health);
        this.animation.start();

        return result;
    }

    fireWeapon(target: PlayerShip) {
        this.weapon.fireAtSprite(target);
    }

    getWeapon(): BossWeapon {
        return this.weapon;
    }
}
