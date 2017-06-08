import * as Phaser from "phaser";
import Enemy from "./enemy";
import BossAnimation from "./boss_animation";
import EnemyWeapon from "./enemy_weapon";
import PlayerShip from "./player_ship";
import * as WeaponTypes from "./weapon_types";

export default class BossShip extends Enemy {
    public static readonly MAX_LEVEL = 9;
    private bossWeapon: EnemyWeapon;
    private animation: BossAnimation;

    constructor(readonly game: Phaser.Game) {
        super(game);
    }

    create() {
        this.game.add.existing(this);
        this.game.physics.enable(this);
        this.animation = new BossAnimation(this, this.game);

        this.bossWeapon = new EnemyWeapon(this.game);
        this.bossWeapon.autofire = true;
        this.bossWeapon.trackedSprite = this;
        this.bossWeapon.changeType(WeaponTypes.BossPrimaryWeapon);
        this.bossWeapon.onFireLimit.add(() => {
            this.game.time.events.add(2000, () => {
                this.bossWeapon.resetShots();
            });
        });

        this.events.onKilled.add(() => this.animation.stop());
    }

    fireWeapon(target: PlayerShip) {
        if (target.alive && this.exists) {
            this.bossWeapon.fireAtSprite(target);
        }
    }

    startAnimation() {
        this.animation.start();
    }

    get weapon(): EnemyWeapon {
        return this.bossWeapon;
    }
}
