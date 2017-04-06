import EnemyFactoryInterface from "./enemy_factory_interface";
import Level from "./level";
import Enemy from "./enemy";
import BossShip from "./boss_ship";
import {ConstructorInject} from "huject";
import Assets from "./assets";

@ConstructorInject
export default class BossFactory implements EnemyFactoryInterface {
    constructor(private game: Phaser.Game) {}

    create(level: Level): Enemy {
        return new BossShip(this.game, 500, 100, Assets.ship_boss_01);
    }
}
