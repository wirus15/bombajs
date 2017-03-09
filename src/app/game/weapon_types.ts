import Assets from './assets';

export interface WeaponType {
    bulletSpeed: number;
    fireRate: number;
    bulletSprite: string;
}

export const PrimaryWeapon: WeaponType = {
    bulletSpeed: 800,
    fireRate: 100,
    bulletSprite: Assets.missle_player_0,
};
