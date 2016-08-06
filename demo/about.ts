import { NavController } from 'ionic-angular/index';
import {Component} from '@angular/core';


@Component({
    templateUrl: 'about.html'
})
export class AboutPage {
    calendarMode = 'month';
    constructor(private navController: NavController) {
    }

    items = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
}
