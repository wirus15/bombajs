import {ConstructorInject} from 'huject';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import {NoMoreLivesError} from "./errors";
import LevelCalculator from "./level_calculator";
import GameEvents from "./game_events";
import Explosions from "./explosions";

@ConstructorInject
export default class Player {
    private static readonly MAX_LEVEL = 16;
    private _level: Level;
    private _points: Points;
    private _lives = 3;

    constructor(
        private _ship: PlayerShip,
        private controls: PlayerControl,
        private gameEvents: GameEvents,
        private explosions: Explosions
    ) {}

    create() {
        this._level = new Level(Player.MAX_LEVEL);
        this._points = new Points();

        this._ship.create();
        this._ship.events.onKilled.add(this.onPlayerKilled, this);
        this.controls.create();

        this.useNextShip();
    }

    update() {
        this.controls.handleMovementKeys(this._ship);
        this.controls.handleFireKey(this._ship, this._ship.weapon);
    }

    useNextShip() {
        if (this._lives <= 0) {
            throw new NoMoreLivesError();
        }

        this._lives--;
        this._ship.flyIn();
    }

    addPoints(points: number) {
        this._points.add(points);
        this.checkLevel();
    }

    get level(): Level {
        return this._level;
    }

    get ship(): PlayerShip {
        return this._ship;
    }

    get points(): Points {
        return this._points;
    }

    get lives(): number {
        return this._lives;
    }

    onLevelChange(listener, context): Phaser.SignalBinding {
        return this._level.onChange.add(listener, context);
    }

    private checkLevel() {
        const shouldHaveLevel = LevelCalculator.calculateLevel(this._points);
        while (this._level.get() < shouldHaveLevel) {
            this._level.next();
        }
    }

    private onPlayerKilled() {
        this.explosions.displayMultiple(this._ship);

        if (this._lives > 0) {
            this.useNextShip();
        } else {
            this.gameEvents.onGameOver.dispatch();
        }
    }
}
