import {ConstructorInject} from "huject";
import WeaponPickup from "./weapon_pickup";
import * as WeaponTypes from "./weapon_types";
import RepairPickup from "./repair_pickup";
import DoubleDamagePickup from "./double_damage_pickup";
import ShieldPickup from "./shield_pickup";

@ConstructorInject
export default class PickupDispenser {
    private _pickups: Phaser.Group;

    constructor(private game: Phaser.Game) {}

    create() {
        this._pickups = this.game.add.physicsGroup();
        this._pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerPrimaryWeapon));
        this._pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerSecondaryWeapon));
        this._pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerTertiaryWeapon));
        this._pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerQuaternaryWeapon));
        this._pickups.add(new RepairPickup(this.game));
        this._pickups.add(new DoubleDamagePickup(this.game));
        this._pickups.add(new ShieldPickup(this.game));
    }

    dispense(from: Phaser.Sprite) {
        let pickup;
        do {
            pickup = this._pickups.getRandom();
        } while (pickup.exists);

        pickup.reset(from.x, from.y);
        pickup.body.velocity.y = 100;

        const tween = this.game.tweens.create(pickup.scale);
        tween.from({x: 0, y: 0}, 1000, Phaser.Easing.Cubic.Out, true);
    }

    dispenseRoll(from: Phaser.Sprite, chance: number = 0.1) {
        const roll = this.game.rnd.realInRange(0, 1);

        if (roll <= chance) {
            this.dispense(from);
        }
    }

    get pickups(): Phaser.Group {
        return this._pickups;
    }
}
