# Ionic2-Calendar directive (Unstable)

Ionic2 calendar directive

# Demo
https://twinssbc.github.io/Ionic2-Calendar/demo/

# Usage

Install: `npm install ionic2-calendar --save`

Import the ionic2-calendar module:

```
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app/app.component';
import { NgCalendarModule  } from 'ionic2-calendar';


@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        NgCalendarModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ]
})
export class AppModule {}
```

Add the directive in the html page

```
      <calendar [eventSource]="eventSource"
        [calendarMode]="calendar.mode"
        [currentDate]="calendar.currentDate"
        (onCurrectDateChanged)="onCurrentDateChanged($event)"
        (onRangeChanged)="reloadSource(startTime, endTime)"
        (onEventSelected)="onEventSelected($event)"
        (onTitleChanged)="onViewTitleChanged($event)"
        (onTimeSelected)="onTimeSelected($event)"
        step="30">
      </calendar>
```

Note: In the current version, if running in dev mode, it will throw below error when switching between month/week/day views.    

```
EXCEPTION: Error in ./HomePage class HomePage - inline template:2:15 caused by: Expression has changed after it was checked. Previous value: 'October 2016'. Current value: 'October 2016, Week 40'.
```

Add below lines in main.dev.ts to suppress the error.

```
import { enableProdMode } from '@angular/core';
enableProdMode();
```

# Note for Ionic Build/Run command
ionic serve uses tsc to compile the code, while ionic build/run uses ngc to compile the code.    
It requires explicit dependency on the compiled ngfactory files for each component.    
I couldn’t find a way to configure the build command includes the ngfactory of the child components automatically.    
So the workaround is to import them explicitly.    
Add below lines in *main.prod.ts*


```
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
```


# Options

* formatDay    
The format of the date displayed in the month view.    
Default value: 'dd'
* formatDayHeader    
The format of the header displayed in the month view.    
Default value: 'EEE'
* formatDayTitle    
The format of the title displayed in the day view.    
Default value: 'MMMM dd, yyyy'
* formatWeekTitle    
The format of the title displayed in the week view.    
Default value: 'MMMM yyyy, Week w'
* formatMonthTitle    
The format of the title displayed in the month view.    
Default value: 'MMMM yyyy'
* formatWeekViewDayHeader    
The format of the header displayed in the week view.    
Default value: 'EEE d'
* formatHourColumn    
The format of the hour column displayed in the week and day view.    
Default value: 'ha'
* calendarMode    
The initial mode of the calendar.    
Default value: 'month'
* showEventDetail    
If set to true, when selecting the date in the month view, the events happened on that day will be shown below.    
Default value: true
* startingDayMonth    
Control month view starting from which day.    
Default value: 0
* startingDayWeek    
Control week view starting from which day.    
Default value: 0
* allDayLabel    
The text displayed in the allDay column header.    
Default value: ‘all day’
* noEventsLabel    
The text displayed when there’s no event on the selected date in month view.    
Default value: ‘No Events’
* eventSource    
The data source of the calendar, when the eventSource is set, the view will be updated accordingly.    
Default value: null    
The format of the eventSource is described in the EventSource section
* queryMode    
If queryMode is set to 'local', when the range or mode is changed, the calendar will use the already bound eventSource to update the view    
If queryMode is set to 'remote', when the range or mode is changed, the calendar will trigger a callback function rangeChanged.    
Users will need to implement their custom loading data logic in this function, and fill it into the eventSource. The eventSource is watched, so the view will be updated once the eventSource is changed.    
Default value: 'local'
* step    
It can be set to 15 or 30, so that the event can be displayed at more accurate position in weekview or dayview.    
Default value: 60
* onCurrentDateChanged    
The callback function triggered when the date that is currently viewed changes.

        <calendar ... (onCurrentDateChanged)="onCurrentDateChanged($event)"></calendar>

        onCurrentChanged = (ev: Date) => {
            console.log('Currently viewed date: ' + ev);
        };

* onRangeChanged    
The callback function triggered when the range or mode is changed if the queryMode is set to 'remote'    
The ev parameter contains two fields, startTime and endTime.

        <calendar ... (onRangeChanged)="onRangeChanged($event)"></calendar>

        onRangeChanged = (ev: { startTime: Date, endTime: Date }) => {
            Events.query(ev, (events) => {
                this.eventSource = events;
            });
        };

* onEventSelected    
The callback function triggered when an event is clicked

        <calendar ... (onEventSelected)="onEventSelected($event)"></calendar>

        onEventSelected = (event) => {
            console.log(event.title);
        };

* onTimeSelected    
The callback function triggered when a date is selected in the monthview.    
The ev parameter contains two fields, selectedTime and events, if there's no event at the selected time, the events field will be either undefined or empty array

        <calendar ... (onTimeSelected)="onTimeSelected($event)"></calendar>

        onTimeSelected = (ev: { selectedTime: Date, events: any[] }) => {
            console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
        };

* onTitleChanged    
The callback function triggered when the view title is changed

        <calendar ... (onTitleChanged)="onViewTitleChanged($event)”></calendar>

        onViewTitleChanged = (title: string) => {
            this.viewTitle = title;
        };

# EventSource

EventSource is an array of event object which contains at least below fields:

* title
* startTime    
If allDay is set to true, the startTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event starting from 2014-05-09, then startTime is

        var startTime = new Date(Date.UTC(2014, 4, 8));

* endTime    
If allDay is set to true, the startTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event ending to 2014-05-10, then endTime is

        var endTime = new Date(Date.UTC(2014, 4, 9));

* allDay    
Indicates the event is allDay event or regular event

# Known issue    
This component updates the ion-slide dynamically so that only 3 looped slides are needed.    
The ion-slide in Ionic2 uses Swiper. It seems in the Swiper implementation, the next slide after the end of looped slide is a separate cached slide, instead of the first slide.    
I can't find out a way to force refresh that cached slide, so you will notice that when sliding from the third month to the forth month, the preview month is not the forth month, but the first month.    
Once the sliding is over, the slide will be forced to render the forth month.