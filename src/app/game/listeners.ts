import PlayerKilledListener from "./player_killed_listener";
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class Listeners {
    constructor(
        playerKilled: PlayerKilledListener
    ) {}
}
