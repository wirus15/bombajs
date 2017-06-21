import {FactoryMethod, Container} from 'huject';
import Game from "./game";
import BootState from "./boot_state";
import GameState from "./game_state";
import Background from "./background";
import BackgroundMusic from "./background_music";
import Player from "./player";
import PlayerControl from "./player_control";
import Weapon from "./weapon";
import EnemyContainer from "./enemy_container";
import EnemyLauncher from "./enemy_launcher";
import Collisions from "./collisions";
import ShipCollisionHandler from "./ship_collision_handler";
import EnemyHitHandler from "./enemy_hit_handler";
import Explosions from "./explosions";
import GUI from "./gui";
import GameEvents from "./game_events";
import BossLauncher from "./boss_launcher";
import PlayerHitHandler from "./player_hit_handler";
import PlayerShip from "./player_ship";
import PickupDispenser from "./pickup_dispenser";
import PickupHandler from "./pickup_handler";
import StateManager from "./state_manager";
import ObstacleContainer from "./obstacle_container";
import FlashEffect from "./flash_effect";

export default class ServiceLoader {
    static load(container: Container) {
        container.register(Phaser.Game, [800, 600, Phaser.AUTO, 'gameCanvas']).as(FactoryMethod.SINGLETON);
        container.register(Container, container);
        container.register(Game).as(FactoryMethod.SINGLETON);
        container.register(BootState).as(FactoryMethod.SINGLETON);
        container.register(GameState).as(FactoryMethod.SINGLETON);
        container.register(Background).as(FactoryMethod.SINGLETON);
        container.register(BackgroundMusic).as(FactoryMethod.SINGLETON);
        container.register(Player).as(FactoryMethod.SINGLETON);
        container.register(PlayerControl).as(FactoryMethod.SINGLETON);
        container.register(Weapon).as(FactoryMethod.SINGLETON);
        container.register(EnemyContainer).as(FactoryMethod.SINGLETON);
        container.register(EnemyLauncher).as(FactoryMethod.SINGLETON);
        container.register(Collisions).as(FactoryMethod.SINGLETON);
        container.register(ShipCollisionHandler).as(FactoryMethod.SINGLETON);
        container.register(EnemyHitHandler).as(FactoryMethod.SINGLETON);
        container.register(Explosions).as(FactoryMethod.SINGLETON);
        container.register(GUI).as(FactoryMethod.SINGLETON);
        container.register(GameEvents).as(FactoryMethod.SINGLETON);
        container.register(BossLauncher).as(FactoryMethod.SINGLETON);
        container.register(PlayerHitHandler).as(FactoryMethod.SINGLETON);
        container.register(PlayerShip).as(FactoryMethod.SINGLETON);
        container.register(PickupDispenser).as(FactoryMethod.SINGLETON);
        container.register(PickupHandler).as(FactoryMethod.SINGLETON);
        container.register(StateManager).as(FactoryMethod.SINGLETON);
        container.register(ObstacleContainer).as(FactoryMethod.SINGLETON);
        container.register(FlashEffect).as(FactoryMethod.SINGLETON);
    }
}
