import Assets from "./assets";
import WeaponType from "./weapon_type";

export const PlayerPrimaryWeapon = Symbol();
export const PlayerSecondaryWeapon = Symbol();
export const PlayerTertiaryWeapon = Symbol();
export const PlayerQuaternaryWeapon = Symbol();

export const EnemyPrimaryWeapon = Symbol();
export const EnemySecondaryWeapon = Symbol();
export const EnemyTertiaryWeapon = Symbol();
export const EnemyQuaternaryWeapon = Symbol();

export const BossPrimaryWeapon = Symbol();
export const BossSecondaryWeapon = Symbol();
export const BossTertiaryWeapon = Symbol();
export const BossQuaternaryWeapon = Symbol();

export const PlayerWeaponTypes: Map<symbol, WeaponType> = new Map<symbol, WeaponType>();
export const EnemyWeaponTypes: Map<symbol, WeaponType> = new Map<symbol, WeaponType>();
export const BossWeaponTypes: Map<symbol, WeaponType> = new Map<symbol, WeaponType>();

PlayerWeaponTypes.set(PlayerPrimaryWeapon, {
    damage: 20,
    bulletSpeed: 800,
    fireRate: 150,
    bulletSprite: Assets.missle_player_0,
});

PlayerWeaponTypes.set(PlayerSecondaryWeapon, {
    damage: 40,
    bulletSpeed: 700,
    fireRate: 120,
    bulletSprite: Assets.missle_player_1,
});

PlayerWeaponTypes.set(PlayerTertiaryWeapon, {
    damage: 80,
    bulletSpeed: 600,
    fireRate: 90,
    bulletSprite: Assets.missle_player_2,
});

PlayerWeaponTypes.set(PlayerQuaternaryWeapon, {
    damage: 120,
    bulletSpeed: 500,
    fireRate: 60,
    bulletSprite: Assets.missle_player_3,
});

EnemyWeaponTypes.set(EnemyPrimaryWeapon, {
    damage: 10,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_0,
});

EnemyWeaponTypes.set(EnemySecondaryWeapon, {
    damage: 20,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_1,
});

EnemyWeaponTypes.set(EnemyTertiaryWeapon, {
    damage: 40,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_2,
});

EnemyWeaponTypes.set(EnemyQuaternaryWeapon, {
    damage: 70,
    bulletSpeed: 400,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_3,
});

BossWeaponTypes.set(BossPrimaryWeapon, {
    damage: 10,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_0,
});

BossWeaponTypes.set(BossSecondaryWeapon, {
    damage: 20,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_1,
});

BossWeaponTypes.set(BossTertiaryWeapon, {
    damage: 40,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_2,
});

BossWeaponTypes.set(BossQuaternaryWeapon, {
    damage: 70,
    bulletSpeed: 200,
    fireRate: 150,
    bulletSprite: Assets.missle_enemy_3,
});
