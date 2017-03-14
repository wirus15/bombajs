import {Container, FactoryMethod} from 'huject';
import Game from "./app/game/game";
import BootState from "./app/game/boot_state";
import GameState from "./app/game/game_state";
import Background from "./app/game/background";
import BackgroundMusic from "./app/game/background_music";
import Player from "./app/game/player";
import GameEvents from "./app/game/game_events";
import PlayerControl from "./app/game/player_control";
import Weapon from "./app/game/weapon";
import EnemyContainer from "./app/game/enemy_container";

let container = new Container();

container.register(Game).as(FactoryMethod.SINGLETON);
container.register(BootState).as(FactoryMethod.SINGLETON);
container.register(GameState).as(FactoryMethod.SINGLETON);
container.register(Phaser.Game, [800, 600, Phaser.AUTO, 'gameCanvas']).as(FactoryMethod.SINGLETON);
container.register(Background).as(FactoryMethod.SINGLETON);
container.register(BackgroundMusic).as(FactoryMethod.SINGLETON);
container.register(Player).as(FactoryMethod.SINGLETON);
container.register(GameEvents).as(FactoryMethod.SINGLETON);
container.register(PlayerControl).as(FactoryMethod.SINGLETON);
container.register(Weapon).as(FactoryMethod.SINGLETON);
container.register(EnemyContainer).as(FactoryMethod.SINGLETON);

export default container;