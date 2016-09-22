import { Component } from '@angular/core';
import { ionicBootstrap } from 'ionic-angular/index';
import { CalendarPage } from './calendar';


@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
    public rootPage;

    constructor() {
        this.rootPage = CalendarPage;
    }
}

ionicBootstrap(MyApp);
