# Ionic2-Calendar directive

Ionic2 calendar directive

[![version](https://img.shields.io/npm/v/ionic2-calendar/latest.svg)](https://www.npmjs.com/package/ionic2-calendar)
[![GitHub License](https://img.shields.io/npm/l/ionic2-calendar.svg)](https://raw.githubusercontent.com/twinssbc/Ionic2-Calendar/master/LICENSE)

# Demo
https://twinssbc.github.io/Ionic2-Calendar/demo/

# Dependency
version 0.2-0.4 has below dependency:      
intl 1.2.5, due to issue https://github.com/angular/angular/issues/3333    

version 0.1.x depends on Ionic 2.0.0-rc.1 ~ Ionic 2.0.0-rc.4    
version 0.2.x depends on Ionic 2.0.0-rc.5 (rc.5 has breaking change on the slide API) and  2.0.0 final version onwards.
version 0.2.9+ depends on Ionic 2.3.0 version onwards.  
version 0.3.x depends on Ionic 3.1.1 version onwards.  
version 0.4.x depends on Ionic 3.9.2 version onwards.  
version 0.5.x depends on Ionic 4.0.0-rc.1 onwards.


# Usage

Install: `npm install ionic2-calendar --save`

Import the ionic2-calendar module:

version 0.1.x - 0.4.x
``` typescript
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

version 0.5.x
``` typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from '@ionic/angular';
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

If you are using PageModule, you need to import the NgCalendarModule in your page module

``` typescript
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    MyPage
  ],
  imports: [
    IonicPageModule.forChild(MyPage),
    NgCalendarModule
  ],
  entryComponents: [
    MyPage
  ]
})
export class MyPageModule {}
```

Add the directive in the html page

``` html
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


``` typescript
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
Default value: (version 0.1-0.3) 'MMMM yyyy, Week $n', (version 0.4+) 'MMMM yyyy, \'Week\' w'  
* formatMonthTitle    
The format of the title displayed in the month view.    
Default value: 'MMMM yyyy'
* formatWeekViewDayHeader    
The format of the header displayed in the week view.    
Default value: 'EEE d'
* formatHourColumn    
The format of the hour column displayed in the week and day view.    
Default value: (version 0.1-0.3) 'j', (version 0.4+) 'ha'  
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
Default value: 'all day'
* noEventsLabel    
The text displayed when there’s no event on the selected date in month view.    
Default value: 'No Events'
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
It is used to display the event using more accurate time interval in weekview and dayview. For example, if set to 30, then the event will only occupy half of the row height (If timeInterval option uses default value).   The unit is minute. It can be set to 15 or 30.    
Default value: 60
``` html
        <calendar ... [step]="30"></calendar>
```

* timeInterval (version >= 0.3)  
It is used to display the rows using more accurate time interval in weekview and dayview. For example, if set to 30, then the time interval between each row is 30 mins.
The unit is minute. It should be the factor or multiple of 60, which means 60%timeInterval=0 or timeInterval%60=0.  
Default value: 60
``` html
        <calendar ... [timeInterval]="30"></calendar>
```

* autoSelect  
If set to true, the current calendar date will be auto selected when calendar is loaded or swiped in the month and week view.  
Default value: true
* locale  
The locale used to display text in the calendar.  
Default value: undefined (which means the local language)
``` html
    <calendar ... [locale]="calendar.locale"></calendar>
```
``` json
    calendar = {
        locale: 'en-GB'
    };
```
* markDisabled    
The callback function used to determine if the time should be marked as disabled.    
``` html
    <calendar ... [markDisabled]="markDisabled"></calendar>
```
``` typescript
    markDisabled = (date: Date) => {
        var current = new Date();
        return date < current;
    };
```
* dateFormatter    
The custom date formatter to transform date to text.    
If the custom date formatter is not set, the default Angular DatePipe is used.
The format method in dateFormatter is optional, if omitted, the default Angular DatePipe is used.
``` html
    <calendar ... [dateFormatter]="calendar.dateFormatter"></calendar>
```
``` typescript
    calendar = {
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'testMDH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'testWDH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };        
```
* dir  
If set to "rtl", the calendar supports RTL language. This feature is only supported in Ionic 2.3.0 version onwards.  
Default value: ""

* scrollToHour  
Make weekview and dayview scroll to the specific hour after entering to the new view.  
Default value: 0

* preserveScrollPosition  
If set to true, the previous/next views in weekview and dayview will also scroll to the same position as the current active view.  
Default value: false

* lockSwipeToPrev  
If set to true, swiping to previous view is disabled.  
Default value: false
``` html
    <calendar ... [lockSwipeToPrev]="lockSwipeToPrev"></calendar>
```
``` typescript
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);

        if (this.calendar.mode === 'month') {
            if (event.getFullYear() < today.getFullYear() || (event.getFullYear() === today.getFullYear() && event.getMonth() <= today.getMonth())) {
                this.lockSwipeToPrev = true;
            } else {
                this.lockSwipeToPrev = false;
            }
        }
    }
```

* lockSwipes  
If set to true, swiping is disabled.  
Default value: false  
*Note:* Since swiping is disabled, you could set currentDate to move the calendar to previous/next view. Do not set lockSwipeToPrev in the constructor phase. It will cause the view not updating when changing the currentDate. You could either set it in some callback function after initialization phase or use setTimeout to trigger some delay.  
``` html
    <calendar ... [lockSwipeToPrev]="lockSwipeToPrev"></calendar>
```
``` typescript
    ngAfterViewInit() {
        var me = this;
        setTimeout(function() {
            me.lockSwipes = true;
        },100);
    }
```

* startHour  
Limit the weekview and dayview starts from which hour (0-23).  
Default value: 0
``` html
    <calendar ... startHour="9"></calendar>
```

* endHour  
Limit the weekview and dayview ends until which hour (1-24).  
Default value: 24
``` html
    <calendar ... endHour="19"></calendar>
```

* spaceBetween  
Distance between slides.  
Default value: 0
``` html
    <calendar ... spaceBetween="10"></calendar>
```
* onCurrentDateChanged    
The callback function triggered when the date that is currently viewed changes.
``` html
    <calendar ... (onCurrentDateChanged)="onCurrentDateChanged($event)"></calendar>
```
``` typescript
    onCurrentChanged = (ev: Date) => {
        console.log('Currently viewed date: ' + ev);
    };
```
* onRangeChanged    
The callback function triggered when the range or mode is changed if the queryMode is set to 'remote'    
The ev parameter contains two fields, startTime and endTime.
``` html
    <calendar ... (onRangeChanged)="onRangeChanged($event)"></calendar>
```
``` typescript
    onRangeChanged = (ev: { startTime: Date, endTime: Date }) => {
        Events.query(ev, (events) => {
            this.eventSource = events;
        });
    };
```
* onEventSelected    
The callback function triggered when an event is clicked
``` html
    <calendar ... (onEventSelected)="onEventSelected($event)"></calendar>
```
``` typescript
    onEventSelected = (event) => {
        console.log(event.title);
    };
```
* onTimeSelected    
The callback function triggered when a date is selected in the monthview.    
The ev parameter contains two fields, selectedTime and events, if there's no event at the selected time, the events field will be either undefined or empty array
``` html
    <calendar ... (onTimeSelected)="onTimeSelected($event)"></calendar>
```
``` typescript
    onTimeSelected = (ev: { selectedTime: Date, events: any[] }) => {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
    };
```
* onTitleChanged    
The callback function triggered when the view title is changed
``` html
    <calendar ... (onTitleChanged)="onViewTitleChanged($event)"></calendar>
```
``` typescript
    onViewTitleChanged = (title: string) => {
        this.viewTitle = title;
    };
```
# View Customization Option
There are two ways to customize the look and feel. If you just want to simply change the color or size of certain element, you could override the styles of the predefined css classes. **CSS Customization** section lists some important css classes. If you need to change the layout of certain element, you could refer to the **Template Customization** part.

## CSS Customization  

* monthview-primary-with-event  
The date that is in current month and having events

* monthview-secondary-with-event  
The date that is in previous/next month and having events

* monthview-selected  
The selected date

* monthview-current  
The current date

* monthview-disabled  
The disabled date

* weekview-with-event  
The date having all day events, applied to the day header in week view

* week-view-current  
The current date, applied to the day header in week view

* weekview-selected  
The selected date, applied to the day header in week view

* weekview-allday-label  
Applied to the all day label in week view

* dayview-allday-label  
Applied to the all day label in day view

* calendar-hour-column  
Applied to the hour column in both weekview and day view


## Template Customization  

Note: For any css class appear in the customized template, you need to specify the styles by yourself. The styles defined in the calendar component won’t be applied because of the view encapsulation. You could refer to calendar.ts to get the definition of context types.   

* monthviewDisplayEventTemplate    
Type: TemplateRef\<IMonthViewDisplayEventTemplateContext\>    
The template provides customized view for event displayed in the active monthview
``` html
    <ng-template #template let-view="view" let-row="row" let-col="col">
        {{view.dates[row*7+col].label}}
    </ng-template>

    <calendar ... [monthviewDisplayEventTemplate]="template"></calendar>
```
* monthviewInactiveDisplayEventTemplate    
Type: TemplateRef\<IMonthViewDisplayEventTemplateContext\>    
The template provides customized view for event displayed in the inactive monthview
``` html
    <ng-template #template let-view="view" let-row="row" let-col="col">
        {{view.dates[row*7+col].label}}
    </ng-template>

    <calendar ... [monthviewInactiveDisplayEventTemplate]="template"></calendar>
```
* monthviewEventDetailTemplate    
Type: TemplateRef\<IMonthViewEventDetailTemplateContext\>    
The template provides customized view for event detail section in the monthview
``` html
    <ng-template #template let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">
    ... 
    </ng-template>

    <calendar ... [monthviewEventDetailTemplate]="template"></calendar>
```
* weekviewHeaderTemplate (version >= 0.4.5)  
Type: TemplateRef\<IDisplayWeekViewHeader\>     
The template provides customized view for day header in the weekview 
``` html 
    <ng-template #template let-viewDate="viewDate"> 
        <div class="custom-day-header"> {{ viewDate.dayHeader }} </div> 
    </ng-template> 
 
    <calendar ... [weekviewHeaderTemplate]="template"></calendar>
```
* weekviewAllDayEventTemplate    
Type: TemplateRef\<IDisplayAllDayEvent\>    
The template provides customized view for all day event in the weekview
``` html
    <ng-template #template let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [weekviewAllDayEventTemplate]="template"></calendar>
```
* weekviewNormalEventTemplate    
Type: TemplateRef\<IDisplayEvent\>    
The template provides customized view for normal event in the weekview

``` html
    <ng-template #template let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [weekviewNormalEventTemplate]="template"></calendar>
```

* dayviewAllDayEventTemplate  
Type: TemplateRef\<IDisplayAllDayEvent\>    
The template provides customized view for all day event in the dayview
``` html
    <ng-template #template let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [dayviewAllDayEventTemplate]="template"></calendar>
```

* dayviewNormalEventTemplate  
Type: TemplateRef\<IDisplayEvent\>    
The template provides customized view for normal event in the dayview

``` html
    <ng-template #template let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [dayviewNormalEventTemplate]="template"></calendar>
```

* weekviewAllDayEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IWeekViewAllDayEventSectionTemplateContext\>    
The template provides customized view for all day event section (table part) in the weekview

``` html
        <ng-template #template let-day="day" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': day.events}" *ngIf="day.events"
                 [ngStyle]="{height: 25*day.events.length+'px'}">
                <div *ngFor="let displayEvent of day.events" class="calendar-event" tappable
                     (click)="onEventSelected(displayEvent.event)"
                     [ngStyle]="{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>

        <calendar ... [weekviewAllDayEventSectionTemplate]="template"></calendar>
```

* weekviewNormalEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IWeekViewNormalEventSectionTemplateContext\>    
The template provides customized view for normal event section (table part) in the weekview

``` html
        <ng-template #template let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                     (click)="onEventSelected(displayEvent.event)"
                     [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>

        <calendar ... [weekviewNormalEventSectionTemplate]="template"></calendar>
```

* dayviewAllDayEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IDayViewAllDayEventSectionTemplateContext\>    
The template provides customized view for all day event section (table part) in the dayview

``` html
        <ng-template #template let-allDayEvents="allDayEvents" let-eventTemplate="eventTemplate">
            <div *ngFor="let displayEvent of allDayEvents; let eventIndex=index"
                 class="calendar-event" tappable
                 (click)="onEventSelected(displayEvent.event)"
                 [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                <ng-template [ngTemplateOutlet]="eventTemplate"
                             [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                </ng-template>
            </div>
        </ng-template>

        <calendar ... [dayviewAllDayEventSectionTemplate]="template"></calendar>
```

* dayviewNormalEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IDayViewNormalEventSectionTemplateContext\>    
The template provides customized view for normal event section (table part) in the dayview

``` html
        <ng-template #template let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                     (click)="onEventSelected(displayEvent.event)"
                     [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>

        <calendar ... [dayviewNormalEventSectionTemplate]="template"></calendar>
```

# EventSource

EventSource is an array of event object which contains at least below fields:

* title
* startTime    
If allDay is set to true, the startTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event starting from 2014-05-09, then startTime is

``` javascript
    var startTime = new Date(Date.UTC(2014, 4, 8));
```

* endTime    
If allDay is set to true, the startTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event ending to 2014-05-10, then endTime is
``` javascript
    var endTime = new Date(Date.UTC(2014, 4, 9));
```
* allDay    
Indicates the event is allDay event or regular event

**Note** The calendar only watches for the eventSource reference for performance consideration. That means only you manually reassign the eventSource value, the calendar gets notified, and this is usually fit to the scenario when the range is changed, you load a new data set from the backend. In case you want to manually insert/remove/update the element in the eventSource array, you can call instance method ‘loadEvents’ event to notify the calendar manually.

# Instance Methods
* loadEvents  
When this method is called, the calendar will be forced to reload the events in the eventSource array. This is only necessary when you directly modify the element in the eventSource array.

``` typescript
import { CalendarComponent } from "ionic2-calendar/calendar";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(CalendarComponent) myCalendar:CalendarComponent;
    eventSource;
    …
    loadEvents: function() {
        this.eventSource.push({
            title: 'test',
            startTime: startTime,
            endTime: endTime,
            allDay: false
        });
        this.myCalendar.loadEvents();
    }
}
```

# Localization    
You could use *locale* option to achieve the localization.  
If locale option is not specified, the calendar will use the LOCALE_ID set at the module level.  
By default, the LOCALE_ID is **en-US**. You can override it in the module as below. If you pass **undefined**, the LOCALE_ID will be detected using the browser language setting. But using explicit value is recommended, as browser has different level of localization support.    
Note that the event detail section in the month view doesn't support *locale* option, only LOCALE_ID takes effect. This is because it uses DatePipe in html directly. You could easily leverage customized event detail template to switch to other locale. 

``` typescript
import { NgModule, LOCALE_ID } from '@angular/core';

@NgModule({
    …
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-CN' }
    ]
})
```

For version 0.4.x+ which depends on Ionic 3.9.2+ and Angular 5.0+, locale module needs to be registered explicitly in module file as below.
``` typescript
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh';
registerLocaleData(localeZh);

```

If you want to change the locale dynamically, you should use *locale* option instead of LOCALE_ID.

# Performance Tuning    
In the CPU profile, the default Intl based localization code occupies a big portion of the execution time. If you don’t need localization on certain parts, you can use the custom dateFormatter to override the date transform method. For example, the date in month view usually doesn’t require localization, you could use below code to just display the date part. If the month view day header doesn’t need to include the date, you could also use a string array containing static labels to save the date calculation.

``` html
<calendar ... [dateFormatter]="calendar.dateFormatter"></calendar>
```
``` typescript
calendar = {
    dateFormatter: {
        formatMonthViewDay: function(date:Date) {
            return date.getDate().toString();
        }            
    }
};
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
Answer: You can change currentDate to the date in previous/next month. You could also retrieve the Swiper element and then call the Swiper API directly.
```
var mySwiper = document.querySelector('.swiper-container')['swiper'];
    mySwiper.slideNext();
```

* Error: Cannot read property 'dayHeaders' of undefined  
Answer: Take a look at the Localization section. For version 0.4.x+, you need to manually register the locale.