import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import { CalendarComponent } from './calendar';
import { initPositionScrollComponent } from './init-position-scroll';

@NgModule({
    declarations: [
        MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent, initPositionScrollComponent
    ],
    imports: [IonicModule, CommonModule],
    exports: [CalendarComponent],
    entryComponents: [CalendarComponent]
})
export class NgCalendarModule {}
