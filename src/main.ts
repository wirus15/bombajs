import Container from "./inversify.config";
import Game from "./app/game/game";
import "./../public/css/styles.css";

const game = Container.get(Game);

game.start();