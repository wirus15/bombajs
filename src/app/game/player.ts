import {injectable} from "inversify";
import * as Phaser from 'phaser';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import Weapon from "./weapon";

@injectable()
export default class Player {
    private ship: PlayerShip;
    private weapon: Weapon;
    private points: Points;
    private level: Level;
    private lives = 0;

    constructor(
        private game: Phaser.Game,
        private controls: PlayerControl
    ) {
        this.level = new Level();
        this.points = new Points();
    }

    public create() {
        this.ship = new PlayerShip(this.game);
        this.weapon = new Weapon(this.ship);

        this.controls.create();
    }

    public update() {
        this.ship.move.slowDown();
        this.controls.handleMovementKeys(this.ship);
        this.controls.handleFireKey(this.weapon);
    }
}
