import {Component} from "@angular/core";
import * as Phaser from 'phaser';
import Game from "./game";

@Component({
    selector: 'b-game',
    template: '<div id="gameCanvas"></div>'
})
export class GameComponent {
    private game: Game;

    constructor() {
        this.game = new Game(800, 600, Phaser.AUTO, 'gameCanvas');
    }
}
