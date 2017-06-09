import {ConstructorInject} from 'huject';
import PlayerShip from "./player_ship";
import Level from "./level";
import Points from "./points";
import PlayerControl from "./player_control";
import LevelCalculator from "./level_calculator";
import GameEvents from "./game_events";
import Explosions from "./explosions";
import Lives from "./lives";

@ConstructorInject
export default class Player {
    private static readonly MAX_LEVEL = 16;
    public readonly level: Level;
    public readonly points: Points;
    public readonly lives: Lives;

    constructor(
        public readonly ship: PlayerShip,
        private controls: PlayerControl,
        private gameEvents: GameEvents,
        private explosions: Explosions
    ) {
        this.level = new Level(Player.MAX_LEVEL);
        this.points = new Points();
        this.lives = new Lives(3);
    }

    create() {
        this.ship.create();
        this.ship.events.onKilled.add(this.onPlayerKilled, this);
        this.controls.create();

        this.useNextShip();
    }

    update() {
        this.controls.handleMovementKeys(this.ship);
        this.controls.handleFireKey(this.ship, this.ship.weapon);
    }

    useNextShip() {
        this.lives.decrease();
        this.ship.flyIn();
    }

    addPoints(points: number) {
        this.points.add(points);
        this.checkLevel();
    }

    onLevelChange(listener, context): Phaser.SignalBinding {
        return this.level.onChange.add(listener, context);
    }

    private checkLevel() {
        const shouldHaveLevel = LevelCalculator.calculateLevel(this.points);
        while (this.level.value < shouldHaveLevel) {
            this.level.next();
        }
    }

    private onPlayerKilled() {
        this.explosions.displayMultiple(this.ship);

        if (this.lives.hasAnyLeft()) {
            this.useNextShip();
        } else {
            this.gameEvents.onGameOver.dispatch();
        }
    }
}
