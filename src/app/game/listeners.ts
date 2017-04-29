import PlayerKilledListener from "./playerKilledListener";
import {ConstructorInject} from 'huject';

@ConstructorInject
export default class Listeners {
    constructor(
        playerKilled: PlayerKilledListener
    ) {}
}
