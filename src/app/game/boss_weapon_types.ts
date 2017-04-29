import WeaponType from "./weapon_type";
import Assets from "./assets";

export const FirstWeapon: WeaponType = {
    damage: 10,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_0,
};

export const SecondWeapon: WeaponType = {
    damage: 20,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_1,
};

export const ThirdWeapon: WeaponType = {
    damage: 40,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_2,
};

export const FourthWeapon: WeaponType = {
    damage: 70,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_3,
};
