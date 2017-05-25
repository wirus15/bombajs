import Container from "./huject";
import Game from "./app/game/game";
import "./../public/css/styles.css";

const game = Container.resolve(Game);

game.start();
