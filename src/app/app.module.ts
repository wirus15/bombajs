import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: MenuComponent },
        ])
    ],
    declarations: [
        AppComponent,
        MenuComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
