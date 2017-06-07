import Weapon from "./weapon";
import Timer from "./timer";

export default class PlayerWeapon extends Weapon {
    private timer: Timer;

    constructor(game: Phaser.Game) {
        super(game);
        this.bulletAngleOffset = 90;
        this.timer = new Timer(game);
        this.timer.onTimeout(() => {
            this.resetDamageMultiplier();
        });
    }

    get doubleDamageTimer() {
        return this.timer;
    }

    enableDoubleDamage(duration: number) {
        this.damageMultiplier = 2;
        this.timer.value = duration;
    }
}
