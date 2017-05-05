import Enemy from "./enemy";
import BossAnimation from "./boss_animation";
import EnemyWeapon from "./enemy_weapon";
import PlayerShip from "./player_ship";

export default class BossShip extends Enemy {
    public static readonly MAX_LEVEL = 9;
    private animation: BossAnimation;
    private weapon: EnemyWeapon;

    constructor(
        game: Phaser.Game,
        maxHealth: number,
        damageAmount: number,
        sprite: string
    ) {
        super(game, maxHealth, damageAmount, sprite);
        this.animation = new BossAnimation(this, game);
    }

    reset(x: number, y: number, health?: number): Phaser.Sprite {
        const result = super.reset(x, y, health);
        this.animation.start();
        this.game.physics.enable(this);

        return result;
    }

    changeWeapon(weapon: EnemyWeapon) {
        this.weapon = weapon;
        this.weapon.autofire = true;
        this.weapon.trackSprite(this);

        this.weapon.onFireLimit.add(() => {
            this.game.time.events.add(2000, () => {
                this.weapon.resetShots();
            });
        });
    }

    fireWeapon(target: PlayerShip) {
        if (target.alive) {
            this.weapon.fireAtSprite(target);
        }
    }
}
