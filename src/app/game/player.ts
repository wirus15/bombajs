import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import Weapon from "./weapon";
import {NoMoreLivesError} from "./errors";

@ConstructorInject
export default class Player {
    private _level: Level;
    private _ship: PlayerShip;
    private _weapon: Weapon;
    private _points: Points;
    private _lives = 3;

    constructor(
        private game: Phaser.Game,
        private controls: PlayerControl
    ) {
        this._level = new Level();
        this._points = new Points();
    }

    create() {
        this._ship = new PlayerShip(this.game);
        this._weapon = new Weapon(this.ship);

        this.controls.create();
        this.useNextShip();
    }

    update() {
        this.controls.handleMovementKeys(this.ship);
        this.controls.handleFireKey(this.ship, this.weapon);
    }

    useNextShip() {
        if (this._lives <= 0) {
            throw new NoMoreLivesError();
        }

        this._lives--;
        this._ship.flyIn();
    }

    get level() {
        return this._level;
    }

    get ship() {
        return this._ship;
    }

    get weapon() {
        return this._weapon;
    }

    get points() {
        return this._points;
    }

    get lives() {
        return this._lives;
    }
}
