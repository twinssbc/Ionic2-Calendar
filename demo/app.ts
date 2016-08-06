import { Component } from "@angular/core";
import { ionicBootstrap, Platform } from 'ionic-angular/index';
import { TabsPage } from './tabs.ts';


@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
    constructor(private platform: Platform) {
        this.rootPage = TabsPage;
    }
}

ionicBootstrap(MyApp);