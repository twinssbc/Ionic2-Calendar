import {Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Slides} from 'ionic-angular';
import {CalendarService} from './calendar.service';

@Component({
    selector: 'monthview',
    template: `
        <div>
            <ion-slides #monthSlider [options]="slideOption" (ionDidChange)="onSlideChanged()">
                <ion-slide *ngFor="let view of views; let viewIndex=index">
                    <table *ngIf="viewIndex===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let day of view.dates.slice(0,7)">
                                <small>{{day.date | date: formatDayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]" (click)="select(view.dates[row*7+col].date)"
                                [ngClass]="getHighlightClass(view.dates[row*7+col])">{{view.dates[row*7+col].label}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="viewIndex!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let day of view.dates.slice(0,7)">
                                <small>{{day.date | date: formatDayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td *ngFor="let col of [0,1,2,3,4,5,6]">
                                {{view.dates[row*7+col].label}}
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
            </ion-slides>
            <ion-list class="event-detail-container2" has-bouncing="false" *ngIf="showEventDetail" overflow-scroll="false">
                <ion-item *ngFor="let event of selectedDate?.events" (click)="eventSelected(event)">
                        <span *ngIf="!event.allDay" class="monthview-eventdetail-timecolumn">{{event.startTime|date: 'HH:mm'}}
                            -
                            {{event.endTime|date: 'HH:mm'}}
                        </span>
                    <span *ngIf="event.allDay" class="monthview-eventdetail-timecolumn">All day</span>
                    <span class="event-detail">  |  {{event.title}}</span>
                </ion-item>
                <ion-item *ngIf="!selectedDate?.events">
                    <td class="no-events-label">{{noEventsLabel}}</td>
                </ion-item>
            </ion-list>
        </div>
    `,
    styles: [`
        .scrollable {
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }

        .text-muted {
          color: #999;
        }

        .table-fixed {
          table-layout: fixed;
        }

        .table {
          width: 100%;
          max-width: 100%;
          background-color: transparent;
        }

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,
        .table > tbody > tr > td, .table > tfoot > tr > td {
          padding: 8px;
          line-height: 20px;
          vertical-align: top;
        }

        .table > thead > tr > th {
          vertical-align: bottom;
          border-bottom: 2px solid #ddd;
        }

        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {
          border-top: 0
        }

        .table > tbody + tbody {
          border-top: 2px solid #ddd;
        }

        .table-bordered {
          border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,
        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
          border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {
          border-bottom-width: 2px;
        }

        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {
          background-color: #f9f9f9
        }

        .no-event-label {
          font-weight: bold;
          color: darkgrey;
          text-align: center;
        }

        .event-detail-container {
          border-top: 2px darkgrey solid;
          margin-top: 262px;
        }

        .event-detail {
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .monthview-primary-with-event {
          background-color: #3a87ad;
          color: white;
        }

        .monthview-current {
          background-color: lightgrey;
        }

        .monthview-selected {
          background-color: #009900;
          color: white;
        }

        .monthview-eventdetail-timecolumn {
          width: 110px;
          overflow: hidden;
        }

        .monthview-datetable th {
          text-align: center;
        }

        .monthview-datetable td {
          cursor: pointer;
          text-align: center;
        }

        .monthview-secondary-with-event {
          background-color: #d9edf7;
        }

        ::-webkit-scrollbar,
        *::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 750px) {
          .table > tbody > tr > td.calendar-hour-column {
            padding-left: 0;
            padding-right: 0;
            vertical-align: middle;
            line-height: 12px;
          }
        }
    `]
})
export class MonthViewComponent implements OnInit, OnChanges {
    @ViewChild('monthSlider') slider:Slides;
    @Input()formatDay:String;
    @Input()formatDayHeader:String;
    @Input()formatMonthTitle:string;
    @Input() eventSource;
    @Input() startingDayMonth:number;
    @Input() showEventDetail:boolean;
    @Input() noEventsLabel:String;
    @Output() onRangeChanged = new EventEmitter(true);
    @Output() onEventSelected = new EventEmitter(true);
    @Output() onTimeSelected = new EventEmitter(true);
    @Output() onTitleChanged = new EventEmitter<string>(true);

    inited:boolean = false;
    range;
    views = [];
    mode:String = 'month';
    currentViewIndex = 0;
    selectedDate;
    private direction = 0;
    moveOnSelected = false;
    slideOption = {
        runCallbacksOnInit: false,
        loop: true
    };

    constructor(private calendarService:CalendarService) {
    }

    ngOnInit() {
        var me = this;
        this.inited = true;
        this.refreshView();

        this.calendarService.currentCalendarDateChangedFromParent$.subscribe(
            currentDate => {
                me.refreshView();
            });
    }

    ngOnChanges(changes) {
        if (!this.inited) {
            return;
        }
        var eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
    }

    onSlideChanged() {
        let me = this;
        setTimeout(function () {
            let currentSlideIndex = me.slider.getActiveIndex(),
                direction = 0,
                currentViewIndex = me.currentViewIndex;

            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            } else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                me.slider.slideTo(1, 0, false);
            } else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            } else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                me.slider.slideTo(3, 0, false);
            }
            me.currentViewIndex = currentSlideIndex;
            me.move(direction);
        }, 200);
    }

    move(direction) {
        if (direction == 0) {
            return;
        }
        this.direction = direction;
        if (this.moveOnSelected) {
            this.moveOnSelected = false;
        } else {
            this.calendarService.setCurrentCalendarDate(this.calendarService.getAdjacentCalendarDate(this.mode, direction));
        }
        this.refreshView();
        this.direction = 0;
    }

    static createDateObject(date, format) {
        return {
            date: date,
            label: new DatePipe().transform(date, format),
            secondary: false
        };
    }

    static getDates(startDate, n) {
        var dates = new Array(n),
            current = new Date(startDate),
            i = 0;
        current.setHours(12); // Prevent repeated dates because of timezone bug
        while (i < n) {
            dates[i++] = new Date(current.toString());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    getViewData(startTime:Date) {
        var startDate = startTime,
            date = startDate.getDate(),
            month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;

        var days = MonthViewComponent.getDates(startDate, 42);
        for (var i = 0; i < 42; i++) {
            var dateObject = MonthViewComponent.createDateObject(days[i], this.formatDay);
            dateObject.secondary = days[i].getMonth() !== month;
            days[i] = dateObject;
        }

        return {
            dates: days
        };
    }

    getHighlightClass(date) {
        var className = '';

        if (date.hasEvent) {
            if (date.secondary) {
                className = 'monthview-secondary-with-event';
            } else {
                className = 'monthview-primary-with-event';
            }
        }

        if (date.selected) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-selected';
        }

        if (date.current) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-current';
        }

        if (date.secondary) {
            if (className) {
                className += ' ';
            }
            className += 'text-muted';
        }
        return className;
    }

    getRange(currentDate) {
        var year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            firstDayOfMonth = new Date(year, month, 1),
            difference = this.startingDayMonth - firstDayOfMonth.getDay(),
            numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
            startDate = new Date(firstDayOfMonth.getTime()),
            endDate;

        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }

        endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);

        return {
            startTime: startDate,
            endTime: endDate
        };
    }

    onDataLoaded() {
        var range = this.range,
            eventSource = this.eventSource,
            len = eventSource ? eventSource.length : 0,
            startTime = range.startTime,
            endTime = range.endTime,
            timeZoneOffset = -new Date().getTimezoneOffset(),
            utcStartTime = new Date(startTime.getTime() + timeZoneOffset * 60 * 1000),
            utcEndTime = new Date(endTime.getTime() + timeZoneOffset * 60 * 1000),
            currentViewIndex = this.currentViewIndex,
            dates = this.views[currentViewIndex].dates,
            oneDay = 86400000,
            eps = 0.001;

        for (var r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }

        for (var i = 0; i < len; i += 1) {
            var event = eventSource[i];
            var eventStartTime = new Date(event.startTime);
            var eventEndTime = new Date(event.endTime);
            var st;
            var et;

            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                } else {
                    st = utcStartTime;
                    et = utcEndTime;
                }
            } else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                } else {
                    st = startTime;
                    et = endTime;
                }
            }

            var timeDifferenceStart;
            if (eventStartTime <= st) {
                timeDifferenceStart = 0;
            } else {
                timeDifferenceStart = (eventStartTime.getTime() - st.getTime()) / oneDay;
            }

            var timeDifferenceEnd;
            if (eventEndTime >= et) {
                timeDifferenceEnd = (et.getTime() - st.getTime()) / oneDay;
            } else {
                timeDifferenceEnd = (eventEndTime.getTime() - st.getTime()) / oneDay;
            }

            var index = Math.floor(timeDifferenceStart);
            var eventSet;
            while (index < timeDifferenceEnd - eps) {
                dates[index].hasEvent = true;
                eventSet = dates[index].events;
                if (eventSet) {
                    eventSet.push(event);
                } else {
                    eventSet = [];
                    eventSet.push(event);
                    dates[index].events = eventSet;
                }
                index += 1;
            }
        }

        for (r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }

        var findSelected = false;
        for (r = 0; r < 42; r += 1) {
            if (dates[r].selected) {
                this.selectedDate = dates[r];
                findSelected = true;
                break;
            }
            if (findSelected) {
                break;
            }
        }
    };

    refreshView() {
        this.range = this.getRange(this.calendarService.currentCalendarDate);
        var title = this.getTitle();
        this.onTitleChanged.emit(title);

        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    }

    getTitle() {
        var currentViewStartDate = this.range.startTime,
            date = currentViewStartDate.getDate(),
            month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12,
            year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0),
            headerDate = new Date(year, month, 1);
        return new DatePipe().transform(headerDate, this.formatMonthTitle);
    }

    private compareEvent(event1, event2) {
        if (event1.allDay) {
            return 1;
        } else if (event2.allDay) {
            return -1;
        } else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    }

    select(selectedDate, events) {
        var views = this.views,
            dates,
            r;
        if (views) {
            dates = views[this.currentViewIndex].dates;
            var currentCalendarDate = this.calendarService.currentCalendarDate;
            var currentMonth = currentCalendarDate.getMonth();
            var currentYear = currentCalendarDate.getFullYear();
            var selectedMonth = selectedDate.getMonth();
            var selectedYear = selectedDate.getFullYear();
            var direction = 0;
            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            } else {
                direction = currentYear < selectedYear ? 1 : -1;
            }

            this.calendarService.setCurrentCalendarDate(selectedDate);
            if (direction === 0) {
                var currentViewStartDate = this.range.startTime,
                    oneDay = 86400000,
                    selectedDayDifference = Math.floor((selectedDate.getTime() - currentViewStartDate.getTime()) / oneDay);
                for (r = 0; r < 42; r += 1) {
                    dates[r].selected = false;
                }

                if (selectedDayDifference >= 0 && selectedDayDifference < 42) {
                    dates[selectedDayDifference].selected = true;
                    this.selectedDate = dates[selectedDayDifference];
                }
            } else {
                this.moveOnSelected = true;
                this.slideView(direction);
            }

            this.onTimeSelected.emit({selectedTime: selectedDate, events: events});
        }
    }

    slideView(direction) {
        if (direction === 1) {
            this.slider.slideNext();
        } else if (direction === -1) {
            this.slider.slidePrev();
        }
    }

    updateCurrentView(currentViewStartDate, view) {
        var currentCalendarDate = this.calendarService.currentCalendarDate,
            today = new Date(),
            oneDay = 86400000,
            r,
            selectedDayDifference = Math.floor((currentCalendarDate.getTime() - currentViewStartDate.getTime()) / oneDay),
            currentDayDifference = Math.floor((today.getTime() - currentViewStartDate.getTime()) / oneDay);

        for (r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }

        if (selectedDayDifference >= 0 && selectedDayDifference < 42) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        } else {
            this.selectedDate = {
                events: []
            };
        }

        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    }

    eventSelected(event) {
        this.onEventSelected.emit(event);
    }
}