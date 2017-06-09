import {Container} from "huject";
import Game from "./app/game/game";
import "./../public/css/styles.css";

const container = new Container();
const game = new Game(container);

game.start();
