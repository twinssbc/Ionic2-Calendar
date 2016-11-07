import { NgModule }      from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import {CalendarComponent} from './calendar';
import { CalendarService } from './calendar.service';

@NgModule({
    declarations: [
        MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent
    ],
    imports: [IonicModule],
    exports: [CalendarComponent],
    entryComponents: [CalendarComponent]
})
export class NgCalendarModule {}
