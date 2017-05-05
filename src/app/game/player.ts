import {ConstructorInject} from 'huject';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import {NoMoreLivesError} from "./errors";
import LevelCalculator from "./level_calculator";
import WeaponManager from "./weapon_manager";
import {PlayerPrimaryWeapon} from "./weapon_types";

@ConstructorInject
export default class Player {
    private static readonly MAX_LEVEL = 16;
    private level: Level;
    private ship: PlayerShip;
    private points: Points;
    private lives = 3;

    constructor(
        private game: Phaser.Game,
        private controls: PlayerControl,
        private weaponManager: WeaponManager
    ) {
        this.level = new Level(Player.MAX_LEVEL);
        this.points = new Points();
    }

    create() {
        const primaryWeapon = this.weaponManager.getPlayerWeapon(PlayerPrimaryWeapon);

        this.ship = new PlayerShip(this.game);
        this.ship.changeWeapon(primaryWeapon);
        this.controls.create();
        this.useNextShip();
    }

    update() {
        this.controls.handleMovementKeys(this.ship);
        this.controls.handleFireKey(this.ship, this.ship.getWeapon());
    }

    useNextShip() {
        if (this.lives <= 0) {
            throw new NoMoreLivesError();
        }

        this.lives--;
        this.ship.flyIn();
    }

    addPoints(points: number) {
        this.points.add(points);
        this.checkLevel();
    }

    getLevel(): Level {
        return this.level;
    }

    onLevelChange(listener, context): Phaser.SignalBinding {
        return this.level.onChange.add(listener, context);
    }

    getShip(): PlayerShip {
        return this.ship;
    }

    getPoints(): Points {
        return this.points;
    }

    getLives(): number {
        return this.lives;
    }

    private checkLevel() {
        const shouldHaveLevel = LevelCalculator.calculateLevel(this.points);
        while (this.level.get() < shouldHaveLevel) {
            this.level.next();
        }
    }
}
