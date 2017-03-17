import * as Phaser from 'phaser';
import {ConstructorInject} from 'huject';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import Weapon from "./weapon";

@ConstructorInject
export default class Player {
    private _level: Level;
    private _ship: PlayerShip;
    private _weapon: Weapon;
    private _points: Points;
    private _lives = 0;

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
    }

    update() {
        this.ship.move.slowDown();
        this.controls.handleMovementKeys(this.ship);
        this.controls.handleFireKey(this.ship, this.weapon);
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
}
