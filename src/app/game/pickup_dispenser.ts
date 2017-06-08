import {ConstructorInject} from "huject";
import WeaponPickup from "./weapon_pickup";
import * as WeaponTypes from "./weapon_types";
import RepairPickup from "./repair_pickup";
import DoubleDamagePickup from "./double_damage_pickup";
import ShieldPickup from "./shield_pickup";
import PhysicsGroup from "./physics_group";

@ConstructorInject
export default class PickupDispenser {
    public readonly pickups: Phaser.Group;

    constructor(private game: Phaser.Game) {
        this.pickups = new PhysicsGroup(game);
    }

    create() {
        this.game.add.existing(this.pickups);
        this.pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerPrimaryWeapon));
        this.pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerSecondaryWeapon));
        this.pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerTertiaryWeapon));
        this.pickups.add(new WeaponPickup(this.game, WeaponTypes.PlayerQuaternaryWeapon));
        this.pickups.add(new RepairPickup(this.game));
        this.pickups.add(new DoubleDamagePickup(this.game));
        this.pickups.add(new ShieldPickup(this.game));
    }

    dispense(from: Phaser.Sprite) {
        let pickup;
        do {
            pickup = this.pickups.getRandom();
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
}
