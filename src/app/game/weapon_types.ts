import Assets from './assets';

export interface WeaponType {
    damage: number;
    bulletSpeed: number;
    fireRate: number;
    bulletSprite: string;
}

export const PrimaryWeapon: WeaponType = {
    damage: 20,
    bulletSpeed: 800,
    fireRate: 150,
    bulletSprite: Assets.missle_player_0,
};
