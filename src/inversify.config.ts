import {Container, decorate, injectable, interfaces} from "inversify";
import * as Phaser from 'phaser';
import GameState from './app/game/game_state';
import Game from './app/game/game';
import Background from "./app/game/background";
import BackgroundMusic from "./app/game/background_music";
import Player from "./app/game/player";
import GameEvents from "./app/game/game_events";
import BootState from "./app/game/boot_state";
import PlayerControl from "./app/game/player_control";
import Weapon from "./app/game/weapon";
const container = new Container();

container.bind<Game>(Game).toSelf();
container.bind<BootState>(BootState).toSelf();
container.bind<GameState>(GameState).toSelf();
container.bind<Phaser.Game>(Phaser.Game).toConstantValue(new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas'));
container.bind<Background>(Background).toSelf();
container.bind<BackgroundMusic>(BackgroundMusic).toSelf();
container.bind<Player>(Player).toSelf();
container.bind<GameEvents>(GameEvents).toSelf();
container.bind<PlayerControl>(PlayerControl).toSelf();
container.bind<Weapon>(Weapon).toSelf();

decorate(injectable(), Phaser.State);
decorate(injectable(), Phaser.Sprite);
decorate(injectable(), Phaser.Weapon);

export default container;
