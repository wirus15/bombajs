import Assets from "./assets";

export interface WeaponType {
    damage: number;
    bulletSpeed: number;
    fireRate: number;
    bulletSprite: string;
}

export const PlayerPrimaryWeapon: WeaponType = {
    damage: 20,
    bulletSpeed: 800,
    fireRate: 150,
    bulletSprite: Assets.missle_player_0,
};

export const PlayerSecondaryWeapon: WeaponType = {
    damage: 40,
    bulletSpeed: 700,
    fireRate: 120,
    bulletSprite: Assets.missle_player_1,
};

export const PlayerTertiaryWeapon: WeaponType = {
    damage: 80,
    bulletSpeed: 600,
    fireRate: 90,
    bulletSprite: Assets.missle_player_2,
};

export const PlayerQuaternaryWeapon: WeaponType = {
    damage: 120,
    bulletSpeed: 500,
    fireRate: 60,
    bulletSprite: Assets.missle_player_3,
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
