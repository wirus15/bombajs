/// <reference path="../../../node_modules/phaser/typescript/phaser.comments.d.ts"/>

import {Component} from "@angular/core";
import * as Phaser from 'phaser';

@Component({
    selector: 'b-game',
    template: '<div id="gameCanvas"></div>'
})
export class GameComponent {
    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(
            800, 600,         // width x height
            Phaser.AUTO,      // the game context, 2D/3D
            'gameCanvas',    // id of the DOM element to add the game
            {
                preload: function() {},
                create: function() {},
                update: function() {}
            }
        )
    }
}
