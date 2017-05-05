import * as WeaponTypes from "./weapon_types";
import Weapon from "./weapon";
import {ConstructorInject} from "huject";
import WeaponType from "./weapon_type";
import PlayerWeapon from "./player_weapon";
import EnemyWeapon from "./enemy_weapon";
import {sample} from "lodash";

@ConstructorInject
export default class WeaponManager {
    private playerWeapons: Map<symbol, Weapon>;
    private enemyWeapons: Map<symbol, Weapon>;
    private bossWeapons: Map<symbol, Weapon>;

    constructor(private game: Phaser.Game) {}

    create() {
        this.playerWeapons = this.createPlayerWeapons();
        this.enemyWeapons = this.createEnemyWeapons(WeaponTypes.EnemyWeaponTypes);
        this.bossWeapons = this.createEnemyWeapons(WeaponTypes.BossWeaponTypes);
    }

    getPlayerWeapon(type: symbol): Weapon {
        return this.playerWeapons.get(type);
    }

    getEnemyWeapon(type?: symbol): Weapon {
        if (type) {
            return this.enemyWeapons.get(type);
        }

        return this.getRandomWeapon(this.enemyWeapons);
    }

    getBossWeapon(type?: symbol): Weapon {
        if (type) {
            return this.bossWeapons.get(type);
        }

        return this.getRandomWeapon(this.bossWeapons);
    }

    getPlayerBullets(): Array<Phaser.Bullet> {
        return this.getBullets(this.playerWeapons);
    }

    getEnemyBullets(): Array<Phaser.Bullet> {
        return this.getBullets(this.enemyWeapons).concat(this.getBullets(this.bossWeapons));
    }

    private createPlayerWeapons(): Map<symbol, Weapon> {
        const weapons = new Map<symbol, Weapon>();

        WeaponTypes.PlayerWeaponTypes.forEach((type: WeaponType, name: symbol) => {
            const weapon = new PlayerWeapon(this.game, type);
            weapons.set(name, weapon);
        });

        return weapons;
    }

    private createEnemyWeapons(types: Map<symbol, WeaponType>): Map<symbol, Weapon> {
        const weapons = new Map<symbol, Weapon>();

        types.forEach((type: WeaponType, name: symbol) => {
            const weapon = new EnemyWeapon(this.game, type);
            weapons.set(name, weapon);
        });

        return weapons;
    }

    private getBullets(weapons: Map<symbol, Weapon>): Array<Phaser.Bullet> {
        let bullets = [];

        weapons.forEach((weapon: Weapon) => {
            bullets = bullets.concat(weapon.bullets.children);
        });

        return bullets;
    }

    private getRandomWeapon(weapons: Map<symbol, Weapon>): Weapon {
        return sample(Array.from(weapons.values()));
    }
}
