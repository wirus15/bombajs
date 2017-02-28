import {injectable} from "inversify";
import * as Phaser from 'phaser';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import GameEvents from "./game_events";
import PlayerControl from "./player_control";

@injectable()
export default class Player {
    private ship: PlayerShip;
    private points: Points;
    private level: Level;
    private lives = 0;

    constructor(
        private game: Phaser.Game,
        private events: GameEvents,
        private controls: PlayerControl
    ) {
        this.level = new Level();
        this.points = new Points();
    }

    public create() {
        this.ship = new PlayerShip(this.game);
        this.controls.create();
    }

    public update() {
        this.ship.move.slowDown();
        this.controls.handleKeys(this.ship);
    }
}