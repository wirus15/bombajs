import Weapon from "./weapon";
import Timer from "./timer";

export default class PlayerWeapon extends Weapon {
    private doubleDamageTimer: Timer;

    constructor(game: Phaser.Game) {
        super(game);
        this.bulletAngleOffset = 90;
        this.doubleDamageTimer = new Timer(game);
        this.doubleDamageTimer.onTimeout(() => {
            this.setDamageMultiplier(1);
        });
    }

    getDoubleDamageTimer() {
        return this.doubleDamageTimer;
    }

    enableDoubleDamage(duration: number) {
        this.setDamageMultiplier(2);
        this.doubleDamageTimer.setValue(duration);
    }
}
