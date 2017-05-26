import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import {CalendarComponent} from './calendar';
import { CalendarService } from './calendar.service';
import { initPositionScrollComponent } from './init-position-scroll';

@NgModule({
    declarations: [
        MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent, initPositionScrollComponent
    ],
    imports: [IonicModule],
    exports: [CalendarComponent],
    entryComponents: [CalendarComponent]
})
export class NgCalendarModule {
}
