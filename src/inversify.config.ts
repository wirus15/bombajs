import {Container} from "inversify";
import * as Phaser from 'phaser';
import GameState from './app/game/game_state';
import Game from './app/game/game';

const container = new Container();

container.bind<Game>(Game).toSelf();
container.bind<GameState>(GameState).toSelf();
container.bind<Phaser.Game>(Phaser.Game).toConstantValue(new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas'));

export default container;