import {Component} from "@angular/core";
import Game from "./game";
import Container from '../../inversify.config';

@Component({
    selector: 'b-game',
    template: '<div id="gameCanvas"></div>'
})
export class GameComponent {
    private game: Game;

    constructor() {
        this.game = Container.get(Game);
    }
}
