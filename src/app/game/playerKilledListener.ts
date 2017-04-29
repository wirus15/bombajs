import GameEvents from "./game_events";
import PlayerShip from "./player_ship";
import {ConstructorInject} from 'huject';
import Explosions from "./explosions";
import Player from "./player";

@ConstructorInject
export default class PlayerKilledListener {
    constructor(
        private gameEvents: GameEvents,
        private explosions: Explosions,
        private player: Player
    ) {
        gameEvents.onPlayerKilled.add(this.onPlayerKilled, this);
    }

    onPlayerKilled(playerShip: PlayerShip) {
        this.explosions.display(playerShip);
        if (this.player.getLives() > 0) {
            this.player.useNextShip();
        } else {
            this.gameEvents.onGameOver.dispatch();
        }
    }
}
