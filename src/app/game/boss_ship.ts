import Enemy from "./enemy";
import BossAnimation from "./boss_animation";
import EnemyWeapon from "./enemy_weapon";
import PlayerShip from "./player_ship";
import * as WeaponTypes from "./weapon_types";

export default class BossShip extends Enemy {
    public static readonly MAX_LEVEL = 9;
    public readonly weapon: EnemyWeapon;
    private animation: BossAnimation;

    constructor(readonly game: Phaser.Game) {
        super(game);
        this.game.add.existing(this);
        this.game.physics.enable(this);
        this.animation = new BossAnimation(this, this.game);

        this.weapon = new EnemyWeapon(this.game);
        this.weapon.autofire = true;
        this.weapon.trackedSprite = this;
        this.weapon.changeType(WeaponTypes.BossPrimaryWeapon);
        this.weapon.onFireLimit.add(() => {
            this.game.time.events.add(2000, () => {
                this.weapon.resetShots();
            });
        });

        this.events.onKilled.add(() => this.animation.stop());
    }

    fireWeapon(target: PlayerShip) {
        if (target.alive && this.exists) {
            this.weapon.fireAtSprite(target);
        }
    }

    startAnimation() {
        this.animation.start();
    }
}
