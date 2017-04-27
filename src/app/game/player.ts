import {ConstructorInject} from 'huject';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import Weapon from "./weapon";
import {NoMoreLivesError} from "./errors";
import LevelCalculator from "./level_calculator";

@ConstructorInject
export default class Player {
    private static readonly MAX_LEVEL = 16;
    private level: Level;
    private ship: PlayerShip;
    private weapon: Weapon;
    private points: Points;
    private lives = 3;

    constructor(
        private game: Phaser.Game,
        private controls: PlayerControl
    ) {
        this.level = new Level(Player.MAX_LEVEL);
        this.points = new Points();
    }

    create() {
        this.ship = new PlayerShip(this.game);
        this.weapon = new Weapon(this.ship);

        this.controls.create();
        this.useNextShip();
    }

    update() {
        this.controls.handleMovementKeys(this.ship);
        this.controls.handleFireKey(this.ship, this.weapon);
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

    getWeapon(): Weapon {
        return this.weapon;
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
