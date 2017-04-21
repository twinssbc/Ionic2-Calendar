# Ionic2-Calendar directive

Ionic2 calendar directive

# Demo
https://twinssbc.github.io/Ionic2-Calendar/demo/

# Dependency
The latest version has below dependency:      
intl 1.2.5, due to issue https://github.com/angular/angular/issues/3333    

version 0.1.x depends on Ionic 2.0.0-rc.1 ~ Ionic 2.0.0-rc.4    
version 0.2.x depends on Ionic 2.0.0-rc.5 (rc.5 has breaking change on the slide API) and  2.0.0 final version onwards.


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
        (onCurrentDateChanged)="onCurrentDateChanged($event)"
        (onRangeChanged)="reloadSource(startTime, endTime)"
        (onEventSelected)="onEventSelected($event)"
        (onTitleChanged)="onViewTitleChanged($event)"
        (onTimeSelected)="onTimeSelected($event)"
        step="30">
      </calendar>
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
Default value: ‘j’
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
* autoSelect  
If set to true, the current calendar date will be auto selected when calendar is loaded or swiped in the month view.  
Default value: true
* markDisabled    
The callback function used to determine if the time should be marked as disabled.    

        <calendar ... [markDisabled]=“markDisabled”></calendar>

        markDisabled = (date: Date) => {
            var current = new Date();
            return date < current;
        };

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


# View Customization Option
Note: For any css class appear in the customized template, you need to specify the styles by yourself. The styles defined in the calendar component won’t be applied because of the view encapsulation.    

* monthviewDisplayEventTemplate    
Type: TemplateRef\<IMonthViewDisplayEventTemplateContext\>    
The template provides customized view for event displayed in the active monthview

        <template #template let-view="view" let-row="row" let-col="col">
            {{view.dates[row*7+col].label}}
        </template>

        <calendar ... [monthviewDisplayEventTemplate]="template"></calendar>

* monthviewInactiveDisplayEventTemplate    
Type: TemplateRef\<IMonthViewDisplayEventTemplateContext\>    
The template provides customized view for event displayed in the inactive monthview

        <template #template let-view="view" let-row="row" let-col="col">
            {{view.dates[row*7+col].label}}
        </template>

        <calendar ... [monthviewInactiveDisplayEventTemplate]="template"></calendar>

* monthviewEventDetailTemplate    
Type: TemplateRef\<IMonthViewEventDetailTemplateContext\>    
The template provides customized view for event detail section in the monthview

        <template #template let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">
	    ... 
        </template>

        <calendar ... [monthviewEventDetailTemplate]="template"></calendar>

* weekviewAllDayEventTemplate    
Type: TemplateRef\<IDisplayAllDayEvent\>    
The template provides customized view for all day event in the weekview

        <template #template let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </template>

        <calendar ... [weekviewAllDayEventTemplate]="template"></calendar>

* weekviewNormalEventTemplate    
Type: TemplateRef\<IDisplayEvent\>    
The template provides customized view for normal event in the weekview

        <template #template let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </template>

        <calendar ... [weekviewNormalEventTemplate]="template"></calendar>

* dayviewAllDayEventTemplate    
Type: TemplateRef\<IDisplayAllDayEvent\>    
The template provides customized view for all day event in the dayview

        <template #template let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </template>

        <calendar ... [dayviewAllDayEventTemplate]="template"></calendar>

* dayviewNormalEventTemplate    
Type: TemplateRef\<IDisplayEvent\>    
The template provides customized view for normal event in the dayview

        <template #template let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </template>

        <calendar ... [dayviewNormalEventTemplate]="template"></calendar>


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

# Localization    
The DatePipe relies on LOCALE_ID to achieve localization. By default, the LOCALE_ID is **en-US**. You can override it in the module as below. If you pass **undefined**, the LOCALE_ID will be detected using the browser language setting. But using explicit value is recommended, as browser has different level of localization support.

```
import { NgModule, LOCALE_ID } from '@angular/core';

@NgModule({
    …
    providers: [
        { provide: LOCALE_ID, useValue: ‘zh-CN’ }
    ]
})
```

# Known issue    
This component updates the ion-slide dynamically so that only 3 looped slides are needed.    
The ion-slide in Ionic2 uses Swiper. It seems in the Swiper implementation, the next slide after the end of looped slide is a separate cached slide, instead of the first slide.    
I can't find out a way to force refresh that cached slide, so you will notice that when sliding from the third month to the forth month, the preview month is not the forth month, but the first month.    
Once the sliding is over, the slide will be forced to render the forth month.

# Common Questions
* Error: Cannot find module "intl"  
Answer: This calendar has dependency on 'Intl'. Run *npm install intl@1.2.5* to install the dependency

* Error: Cannot read property 'getFullYear' of undefined  
Answer: If you bind currentDate like this: [currentDate]="calendar.currentDate". You need to assign calendar.currentDate a valid Date object

* How to switch the calendar to previous/next month programmatically?  
Answer: You can change currentDate to the date in previous/next month.
