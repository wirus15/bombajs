import Assets from "./assets";

export interface WeaponType {
    damage: number;
    bulletSpeed: number;
    fireRate: number;
    bulletSprite: string;
}

export interface PlayerWeaponType extends WeaponType {
    pickupSprite: string;
}

export const PlayerPrimaryWeapon: PlayerWeaponType = {
    damage: 20,
    bulletSpeed: 800,
    fireRate: 150,
    bulletSprite: Assets.missle_player_0,
    pickupSprite: Assets.pickup_weapon_0
};

export const PlayerSecondaryWeapon: PlayerWeaponType = {
    damage: 40,
    bulletSpeed: 700,
    fireRate: 180,
    bulletSprite: Assets.missle_player_1,
    pickupSprite: Assets.pickup_weapon_1
};

export const PlayerTertiaryWeapon: PlayerWeaponType = {
    damage: 80,
    bulletSpeed: 600,
    fireRate: 210,
    bulletSprite: Assets.missle_player_2,
    pickupSprite: Assets.pickup_weapon_2
};

export const PlayerQuaternaryWeapon: PlayerWeaponType = {
    damage: 150,
    bulletSpeed: 400,
    fireRate: 300,
    bulletSprite: Assets.missle_player_3,
    pickupSprite: Assets.pickup_weapon_3
};

export const EnemyPrimaryWeapon: WeaponType = {
    damage: 10,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_0,
};

export const EnemySecondaryWeapon: WeaponType = {
    damage: 20,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_1,
};

export const EnemyTertiaryWeapon: WeaponType = {
    damage: 40,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_2,
};

export const EnemyQuaternaryWeapon: WeaponType = {
    damage: 70,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_3,
};

export const BossPrimaryWeapon: WeaponType = {
    damage: 10,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_0,
};

export const BossSecondaryWeapon: WeaponType = {
    damage: 20,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_1,
};

export const BossTertiaryWeapon: WeaponType = {
    damage: 40,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_2,
};

export const BossQuaternaryWeapon: WeaponType = {
    damage: 70,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_3,
};
