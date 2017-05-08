import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import {CalendarComponent} from './calendar';
import { CalendarService } from './calendar.service';

@NgModule({
    declarations: [
        MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent
    ],
    imports: [BrowserModule, IonicModule],
    exports: [CalendarComponent],
    entryComponents: [CalendarComponent]
})
export class NgCalendarModule {}
