import * as Phaser from "phaser";
import Enemy from "./enemy";
import BossAnimation from "./boss_animation";
import EnemyWeapon from "./enemy_weapon";
import PlayerShip from "./player_ship";
import * as WeaponTypes from "./weapon_types";

export default class BossShip extends Enemy {
    public static readonly MAX_LEVEL = 9;
    private animation: BossAnimation;
    private _weapon: EnemyWeapon;

    constructor(readonly game: Phaser.Game) {
        super(game);
        this.game.add.existing(this);
        this.game.physics.enable(this);
        this.animation = new BossAnimation(this, game);

        this._weapon = new EnemyWeapon(game);
        this._weapon.autofire = true;
        this._weapon.trackedSprite = this;
        this._weapon.changeType(WeaponTypes.BossPrimaryWeapon);
        this._weapon.onFireLimit.add(() => {
            this.game.time.events.add(2000, () => {
                this._weapon.resetShots();
            });
        });

        this.events.onKilled.add(() => this.animation.stop());
    }

    get weapon(): EnemyWeapon {
        return this._weapon;
    }

    fireWeapon(target: PlayerShip) {
        if (target.alive && this.exists) {
            this._weapon.fireAtSprite(target);
        }
    }

    startAnimation() {
        this.animation.start();
    }
}
