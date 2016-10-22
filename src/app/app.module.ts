import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from "./game/game.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: MenuComponent },
            { path: 'game', component: GameComponent }
        ])
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        GameComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
