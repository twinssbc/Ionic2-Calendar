# Ionic-Calendar directive

Ionic calendar directive

[![version](https://img.shields.io/npm/v/ionic2-calendar/latest.svg)](https://www.npmjs.com/package/ionic2-calendar)
[![GitHub License](https://img.shields.io/npm/l/ionic2-calendar.svg)](https://raw.githubusercontent.com/twinssbc/Ionic2-Calendar/master/LICENSE)

# Table of Contents
1. [Demo](#demo)  
2. [Dependency](#dependency)
3. [Usage](#usage)
4. [Options](#options)
5. [Callback](#callback)
6. [View Customization Option](#view-customization-option)
7. [EventSource](#eventsource)
8. [Performance Tuning](#performance-tuning)
9. [Common Questions](#common-questions)

# Demo
Version 2.0    
https://stackblitz.com/edit/ionic-calendar-demo-2-2?file=src%2Fapp%2Fexample.component.html    
Version 1.0    
https://stackblitz.com/edit/ionic-calendar-demo-1-0?file=src%2Fapp%2Fexample.component.html    
Version 0.x    
https://stackblitz.com/edit/ionic-calendar-demo?file=pages%2Fhome%2Fhome.html   

## Month View    
![Month View](https://github.com/twinssbc/ionic-calendar-demo/blob/main/images/month-view.png)

## Week View    
![Week View](https://github.com/twinssbc/ionic-calendar-demo/blob/main/images/week-view.png)

## Day View    
![Day View](https://github.com/twinssbc/ionic-calendar-demo/blob/main/images/day-view.png)

## Day View - Categorized    
![Day View Categorized](https://github.com/twinssbc/ionic-calendar-demo/blob/main/images/day-view-categorized.png)

# Dependency
Version 2.3.x depends on Ionic (>=7.0.0), Angular (>=17.0.0) and Swiper (>=11.0.0).   
Version 2.2.x depends on Ionic (>=7.0.0), Angular (>=17.0.0) and Swiper (>=10.1.0).   
Version 2.1.x depends on Ionic (>=7.0.0), Angular (>=16.0.0) and Swiper (>=10.1.0).   
Version 2.0.x depends on Ionic (>=7.0.0), Angular (>=16.0.0) and Swiper (>=8.4.6, <9.0.0).   
Version 1.0.x depends on Ionic (>=6.1.9), Angular (>=15.1.2) and Swiper (>=8.4.6, <9.0.0).   
Version 0.6.x depends on Ionic (>=5.1.0) and Angular (>=9.1.0).    
version 0.5.x depends on Ionic (>=4.0.0-rc.1), also supports Ionic 5.0.0.    
version 0.4.x depends on Ionic (>=3.9.2).  
version 0.3.x depends on Ionic (>=3.1.1).  
version 0.2.9+ depends on Ionic (>=2.3.0).  
version 0.2.x depends on Ionic 2.0.0-rc.5 (rc.5 has breaking change on the slide API) and  2.0.0 final version onwards.    
version 0.1.x depends on Ionic 2.0.0-rc.1 ~ Ionic 2.0.0-rc.4    

version 0.2-0.4 has below dependency:      
intl 1.2.5, due to issue https://github.com/angular/angular/issues/3333    

# Usage

## 1. Install Calendar Dependency  
`npm install ionic2-calendar --save`

### version 1.0.x onwards  
version 1.0.x is also published as Ionic6-Calendar package name. So could also run  
`npm install ionic6-calendar --save`  
version 2.0.x is also published as Ionic7-Calendar package name. So could also run  
`npm install ionic7-calendar --save`  

<font color=red>**NOTE: Starting from Version 1.0.x, the underlying implementaion is based on Swiper instead of IonSlides, so also needs to install Swiper dependency.**</font>  
- Install swiper dependency  
`npm install swiper --save`

- Import swiper css in **global.scss**  
```
@import 'swiper/css';
```

## 2. Import the Calendar module
If using version 1.0.x, could use both ionic2-calendar or ionic6-calendar, ionic7-calendar.

- version 0.5.x onwards
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

- version 0.1.x - 0.4.x
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

## 3. Add the directive in the html page

``` html
    <calendar [eventSource]="eventSource"
        [calendarMode]="calendar.mode"
        [currentDate]="calendar.currentDate"
        (onCurrentDateChanged)="onCurrentDateChanged($event)"
        (onRangeChanged)="reloadSource(startTime, endTime)"
        (onEventSelected)="onEventSelected($event)"
        (onTitleChanged)="onViewTitleChanged($event)"
        (onTimeSelected)="onTimeSelected($event)"
        [step]="calendar.step">        
    </calendar>
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

``` html
        <calendar ... [calendarMode]="calendar.mode"></calendar>
```

Version 1.0.x onwards
```typescript
    import { CalendarMode } from 'ionic2-calendar';

    calendar = {
        mode: 'week' as CalendarMode
    };
```

Version 0.x
```typescript
    import { CalendarMode } from 'ionic2-calendar/calendar';

    calendar = {
        mode: 'week' as CalendarMode
    };
```

* showEventDetail    
If set to true, when selecting the date in the month view, the events happened on that day will be shown below.    
Default value: true
* startingDayMonth    
Control month view starting from which day.    
Default value: 0 (Sunday)
* startingDayWeek    
Control week view starting from which day.    
Default value: 0 (Sunday)
* allDayLabel    
The text displayed in the allDay column header of week and day view.    
Default value: 'all day'
* noEventsLabel    
The text displayed when there’s no event on the selected date in month view.    
Default value: 'No Events'
* eventSource    
The data source of the calendar, when the eventSource is set, the view will be updated accordingly.    
Default value: null    
The format of the eventSource is described in the [EventSource](#eventsource) section
* queryMode    
If queryMode is set to 'local', when the range or mode is changed, the calendar will use the already bound eventSource to update the view    
If queryMode is set to 'remote', when the range or mode is changed, the calendar will trigger a callback function rangeChanged.    
Users will need to implement their custom loading data logic in this function, and fill it into the eventSource. The eventSource is watched, so the view will be updated once the eventSource is changed.    
Default value: 'local'
* step    
It is used to display the event using more accurate time interval in weekview and dayview. For example, if set to 30, then the event will only occupy half of the row height (If timeInterval option uses default value).   The unit is minute. It can be set to 15 or 30.    
Default value: 60
``` html
    <calendar ... [step]="calendar.step"></calendar>
```

```typescript
    import { Step } from 'ionic2-calendar/calendar';

    calendar = {
        step: 30 as Step
    };
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
Check [Localization](#localization) section for more details.  
Default value: undefined (which means the local language)
``` html
    <calendar ... [locale]="calendar.locale"></calendar>
```
``` typescript
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

* lockSwipeToNext (version 1.0.x onwards)
If set to true, swiping to next view is disabled.  
Default value: false
``` html
    <calendar ... [lockSwipeToNext]="lockSwipeToNext"></calendar>
```
``` typescript
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);

        if (this.calendar.mode === 'month') {
            if (event.getFullYear() > today.getFullYear() || (event.getFullYear() === today.getFullYear() && event.getMonth() >= today.getMonth())) {
                this.lockSwipeToNext = true;
            } else {
                this.lockSwipeToNext = false;
            }
        }
    }
```


* lockSwipes  
If set to true, swiping is disabled.  
Default value: false  

**Version 1.x**  
*Note:* Since swiping is disabled, you could set currentDate or call slideToPrev/slideToNext [method](#instance-methods) to move the calendar to previous/next view. You need to first set the lockSwipes to false, move the slide, then set it back.  
``` html
    <calendar ... [lockSwipes]="lockSwipes"></calendar>
```
``` typescript
    moveSlide() {
        this.calendar.lockSwipes = false;
        setTimeout(function() {
            this.myCalendar.slideNext();
            this.calendar.lockSwipes = true;
        },100);
    }
```

**Version 0.x**  
*Note:* Since swiping is disabled, you could set currentDate or call slideToPrev/slideToNext [method](#instance-methods) to move the calendar to previous/next view. Do not set lockSwipeToPrev in the constructor phase. It will cause the view not updating when changing the currentDate. You could either set it in some callback function after initialization phase or use setTimeout to trigger some delay.  
``` html
    <calendar ... [lockSwipes]="lockSwipes"></calendar>
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

* sliderOptions  
Options to pass to the underlying swiper instance. See https://swiperjs.com/swiper-api#parameters for valid options.  
``` html
    <calendar ... sliderOptions="sliderOptions"></calendar>
```
``` typescript
    options = {
        spaceBetween: 10,
        threshold: 50
    };
```

* `dayviewShowCategoryView` (version: 2.4+)    
Determines if show dayview with category    
Type: `boolean`    
Default value: `false`    


* `dayviewCategorySource` (version: 2.4+)    
Determines the source the category names so that events with corresponding category will display accordingly. If events are not assigned with category, they will NOT be placed in the category view.    
Type: `Set<string>`    
Default value: `null`    
``` html
    <calendar ... [dayviewCategorySource]="calendar.dayviewCategorySource"></calendar>
```
``` typescript
    calendar = {
        dayviewCategorySource: new Set<string>(['Alice', 'Bob', 'Charlie'])
    };
```

# Callback
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
The callback function triggered when the range or mode is changed if the **queryMode** is set to '**remote**'    
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
The callback function triggered when a time slot is selected.    
The ev parameter contains three fields, selectedTime, events and disabled, if there's no event at the selected time, the events field will be either undefined or empty array
``` html
    <calendar ... (onTimeSelected)="onTimeSelected($event)"></calendar>
```
``` typescript
    onTimeSelected = (ev: { selectedTime: Date, events: any[], disabled: boolean }) => {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    };
```
* onDayHeaderSelected    
The callback function triggered when a day header is selected in week view.    
The ev parameter contains three fields, selectedTime, events and disabled, if there's no event at the selected time, the events field will be either undefined or empty array
``` html
    <calendar ... (onDayHeaderSelected)="onDayHeaderSelected($event)"></calendar>
```
``` typescript
    onDayHeaderSelected = (ev: { selectedTime: Date, events: any[], disabled: boolean }) => {
        console.log('Selected day: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
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
The customized styles should be added in global.scss. Just adding in each components css file may not work due to the View Encapsulation.

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

* weekview-current  
The current date, applied to the day header in week view

* weekview-selected  
The selected date, applied to the day header in week view

* weekview-allday-label  
Applied to the all day label in week view

* dayview-allday-label  
Applied to the all day label in day view

* calendar-hour-column  
Applied to the hour column in both weekview and day view

* dayview-category-header (version: 2.4+)  
Applied to the category section in day view  

* dayview-category-header-item (version: 2.4+)  
Applied to the category header item in day view  

## Template Customization  

Note: For any css class appear in the customized template, you need to specify the styles by yourself. The styles defined in the calendar component won’t be applied because of the view encapsulation. You could refer to calendar.ts to get the definition of context types.   

* monthviewDisplayEventTemplate    
Type: TemplateRef\<IMonthViewDisplayEventTemplateContext\>    
The template provides customized view for event displayed in the active monthview
``` html
    <ng-template #monthviewDisplayEventTemplate let-view="view" let-row="row" let-col="col">
        {{view.dates[row*7+col].label}}
    </ng-template>

    <calendar ... [monthviewDisplayEventTemplate]="monthviewDisplayEventTemplate"></calendar>
```
* monthviewInactiveDisplayEventTemplate    
Type: TemplateRef\<IMonthViewDisplayEventTemplateContext\>    
The template provides customized view for event displayed in the inactive monthview
``` html
    <ng-template #monthviewInactiveDisplayEventTemplate let-view="view" let-row="row" let-col="col">
        {{view.dates[row*7+col].label}}
    </ng-template>

    <calendar ... [monthviewInactiveDisplayEventTemplate]="monthviewInactiveDisplayEventTemplate"></calendar>
```
* monthviewEventDetailTemplate    
Type: TemplateRef\<IMonthViewEventDetailTemplateContext\>    
The template provides customized view for event detail section in the monthview
``` html
    <ng-template #monthviewEventDetailTemplate let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">
    ... 
    </ng-template>

    <calendar ... [monthviewEventDetailTemplate]="monthviewEventDetailTemplate"></calendar>
```
* weekviewHeaderTemplate (version >= 0.4.5)  
Type: TemplateRef\<IDisplayWeekViewHeader\>     
The template provides customized view for day header in the weekview 
``` html 
    <ng-template #weekviewHeaderTemplate let-viewDate="viewDate"> 
        <div class="custom-day-header"> {{ viewDate.dayHeader }} </div> 
    </ng-template> 
 
    <calendar ... [weekviewHeaderTemplate]="weekviewHeaderTemplate"></calendar>
```
* weekviewAllDayEventTemplate    
Type: TemplateRef\<IDisplayAllDayEvent\>    
The template provides customized view for all day event in the weekview
``` html
    <ng-template #weekviewAllDayEventTemplate let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [weekviewAllDayEventTemplate]="weekviewAllDayEventTemplate"></calendar>
```
* weekviewNormalEventTemplate    
Type: TemplateRef\<IDisplayEvent\>    
The template provides customized view for normal event in the weekview

``` html
    <ng-template #weekviewNormalEventTemplate let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [weekviewNormalEventTemplate]="weekviewNormalEventTemplate"></calendar>
```

* dayviewCategoryItemTemplate (version: 2.4+)  
The template provides customized view for category item with categoryId and categoryName in the day view  
``` html
    <ng-template #dayviewCategoryItemTemplate let-category="category">
        {{ category.categoryName }}
    </ng-template>

    <calendar ... [dayviewCategoryItemTemplate]="dayviewCategoryItemTemplate"></calendar>
```

* dayviewAllDayEventTemplate  
Type: TemplateRef\<IDisplayAllDayEvent\>    
The template provides customized view for all day event in the dayview
``` html
    <ng-template #dayviewAllDayEventTemplate let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [dayviewAllDayEventTemplate]="dayviewAllDayEventTemplate"></calendar>
```

* dayviewNormalEventTemplate  
Type: TemplateRef\<IDisplayEvent\>    
The template provides customized view for normal event in the dayview

``` html
    <ng-template #dayviewNormalEventTemplate let-displayEvent="displayEvent">
        <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
    </ng-template>

    <calendar ... [dayviewNormalEventTemplate]="dayviewNormalEventTemplate"></calendar>
```

* weekviewAllDayEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IWeekViewAllDayEventSectionTemplateContext\>    
The template provides customized view for all day event section (table part) in the weekview

``` html
        <ng-template #weekviewAllDayEventSectionTemplate let-day="day" let-eventTemplate="eventTemplate">
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

        <calendar ... [weekviewAllDayEventSectionTemplate]="weekviewAllDayEventSectionTemplate"></calendar>
```

* weekviewNormalEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IWeekViewNormalEventSectionTemplateContext\>    
The template provides customized view for normal event section (table part) in the weekview

``` html
        <ng-template #weekviewNormalEventSectionTemplate let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
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

        <calendar ... [weekviewNormalEventSectionTemplate]="weekviewNormalEventSectionTemplate"></calendar>
```

* dayviewAllDayEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IDayViewAllDayEventSectionTemplateContext\>    
The template provides customized view for all day event section (table part) in the dayview

``` html
        <ng-template #dayviewAllDayEventSectionTemplate let-allDayEvents="allDayEvents" let-eventTemplate="eventTemplate">
            <div *ngFor="let displayEvent of allDayEvents; let eventIndex=index"
                 class="calendar-event" tappable
                 (click)="onEventSelected(displayEvent.event)"
                 [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                <ng-template [ngTemplateOutlet]="eventTemplate"
                             [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                </ng-template>
            </div>
        </ng-template>

        <calendar ... [dayviewAllDayEventSectionTemplate]="dayviewAllDayEventSectionTemplate"></calendar>
```

* dayviewNormalEventSectionTemplate (version >= 0.3)  
Type: TemplateRef\<IDayViewNormalEventSectionTemplateContext\>    
The template provides customized view for normal event section (table part) in the dayview

``` html
        <ng-template #dayviewNormalEventSectionTemplate let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
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

        <calendar ... [dayviewNormalEventSectionTemplate]="dayviewNormalEventSectionTemplate"></calendar>
```

* weekviewInactiveAllDayEventSectionTemplate (version >= 0.5)  
Type: TemplateRef\<IWeekViewAllDayEventSectionTemplateContext\>    
The template provides customized view for all day event section (table part) in the inactive weekview

``` html
        <ng-template #weekviewInactiveAllDayEventSectionTemplate let-day="day" let-eventTemplate="eventTemplate">
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

        <calendar ... [weekviewInactiveAllDayEventSectionTemplate]="weekviewInactiveAllDayEventSectionTemplate"></calendar>
```

* weekviewInactiveNormalEventSectionTemplate (version >= 0.5)  
Type: TemplateRef\<IWeekViewNormalEventSectionTemplateContext\>    
The template provides customized view for normal event section (table part) in the inactive weekview

``` html
        <ng-template #weekviewInactiveNormalEventSectionTemplate let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
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

        <calendar ... [weekviewInactiveNormalEventSectionTemplate]="weekviewInactiveNormalEventSectionTemplate"></calendar>
```

* dayviewInactiveAllDayEventSectionTemplate (version >= 0.5)  
Type: TemplateRef\<IDayViewAllDayEventSectionTemplateContext\>    
The template provides customized view for all day event section (table part) in the inactive dayview

``` html
        <ng-template #dayviewInactiveAllDayEventSectionTemplate let-allDayEvents="allDayEvents" let-eventTemplate="eventTemplate">
            <div *ngFor="let displayEvent of allDayEvents; let eventIndex=index"
                 class="calendar-event" tappable
                 (click)="onEventSelected(displayEvent.event)"
                 [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                <ng-template [ngTemplateOutlet]="eventTemplate"
                             [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                </ng-template>
            </div>
        </ng-template>

        <calendar ... [dayviewInactiveAllDayEventSectionTemplate]="dayviewInactiveAllDayEventSectionTemplate"></calendar>
```

* dayviewInactiveNormalEventSectionTemplate (version >= 0.5)  
Type: TemplateRef\<IDayViewNormalEventSectionTemplateContext\>    
The template provides customized view for normal event section (table part) in the inactive dayview

``` html
        <ng-template #dayviewInactiveNormalEventSectionTemplate let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
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

        <calendar ... [dayviewInactiveNormalEventSectionTemplate]="dayviewInactiveNormalEventSectionTemplate"></calendar>
```


# EventSource

EventSource is an array of event object which contains at least below fields:

* title    
Type: `string`    

* startTime    
Type: `Date`    
If allDay is set to true, the startTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event starting from 2014-05-09, then startTime is

``` javascript
    var startTime = new Date(Date.UTC(2014, 4, 8));
```

* endTime    
Type: `Date`    
If allDay is set to true, the startTime has to be as a UTC date which time is set to 0:00 AM, because in an allDay event, only the date is considered, the exact time or timezone doesn't matter.    
For example, if an allDay event ending to 2014-05-10, then endTime is
``` javascript
    var endTime = new Date(Date.UTC(2014, 4, 9));
```
* allDay    
Type: `boolean`    
Indicates the event is allDay event or regular event

* category (optional)    
Type: `string`    
Indicates which category the event belongs to. If the value is specified but not one of `dayviewCategorySource`, the event will not display in category view.

**Note** The calendar only watches for the eventSource reference for performance consideration. That means only you manually reassign the eventSource value, the calendar gets notified, and this is usually fit to the scenario when the range is changed, you load a new data set from the backend. In case you want to manually insert/remove/update the element in the eventSource array, you can call [instance method](#instance-methods) ‘loadEvents’ event to notify the calendar manually.

# Instance Methods
* loadEvents  
When this method is called, the calendar will be forced to reload the events in the eventSource array. This is only necessary when you directly modify the element in the eventSource array.

``` typescript
import { CalendarComponent } from "ionic2-calendar";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
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

* slideNext  (version >= 0.5)  
Slide the calendar to the next date range.

``` typescript
import { CalendarComponent } from "ionic2-calendar";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
    …
    slideNext: function() {
        this.myCalendar.slideNext();
    }
}
```

* slidePrev  (version >= 0.5)  
Slide the calendar to the previous date range.

``` typescript
import { CalendarComponent } from "ionic2-calendar";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
    …
    slidePrev: function() {
        this.myCalendar.slidePrev();
    }
}
```

* update  (version >= 0.6.5)  
Update the underlying slides.

``` typescript
import { CalendarComponent } from "ionic2-calendar";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;
    …
    slidePrev: function() {
        this.myCalendar.update();
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

# Known issue (No longer exists in version 1.0.x)   
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
Answer: You can change currentDate to the date in previous/next month. You could also call the instance method slideNext/slidePrev.

* Error: Cannot read property 'dayHeaders' of undefined  
Answer: Take a look at the Localization section. For version 0.4.x+, you need to manually register the locale.

* Error: TypeError: event_1.startTime.getTime is not a function  
Answer: This is due to the startTime field of the event object is not a valid Date object. Be aware that different browser has different implementation of new Date() constructor. Some date string format may not be supported. It is recommended to use millisecond or year/month/date parameters.

* Error: How to override css  
Answer: By default, the css applied on each component is view encapsulated, for example, .table-bordered[_ngcontent-jto-c5]. You need to remove the encapsulated part.
```css
.table-bordered[_ngcontent-jto-c5] {
    border: 1px solid #ddd !important;
}
```
