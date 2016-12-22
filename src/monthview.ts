import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Slides } from 'ionic-angular';

import { ICalendarComponent, IEvent, IMonthView, IMonthViewRow, ITimeSelected, IRange, CalendarMode } from './calendar';
import { CalendarService } from './calendar.service';

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
                            <td *ngFor="let col of [0,1,2,3,4,5,6]" (click)="select(view.dates[row*7+col])"
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
          background-color: #f0f0f0;
        }

        .monthview-selected {
          background-color: #009900;
          color: white;
        }

        .monthview-datetable td.monthview-disabled {
            color: lightgrey;
            cursor: default;
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
export class MonthViewComponent implements ICalendarComponent, OnInit, OnChanges {
    @ViewChild('monthSlider') slider:Slides;

    @Input() formatDay:string;
    @Input() formatDayHeader:string;
    @Input() formatMonthTitle:string;
    @Input() eventSource:IEvent[];
    @Input() startingDayMonth:number;
    @Input() showEventDetail:boolean;
    @Input() noEventsLabel:string;
    @Input() markDisabled:(date:Date) => boolean;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>(true);
    @Output() onTitleChanged = new EventEmitter<string>(true);

    public slideOption = {
        runCallbacksOnInit: false,
        loop: true
    };
    public views:IMonthView[] = [];
    public currentViewIndex = 0;
    public selectedDate:IMonthViewRow;
    public range:IRange;
    public mode:CalendarMode = 'month';
    public direction = 0;

    private moveOnSelected = false;
    private inited = false;

    constructor(private calendarService:CalendarService) {
    }

    ngOnInit() {
        this.refreshView();
        this.inited = true;

        this.calendarService.currentDateChanged$.subscribe(currentDate => {
            this.refreshView();
        });
    }

    ngOnChanges(changes:SimpleChanges) {
        if (!this.inited) return;

        let eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
    }

    ngAfterViewInit() {
        let title = this.getTitle();
        this.onTitleChanged.emit(title);
    }

    onSlideChanged() {
        let currentSlideIndex = this.slider.getActiveIndex(),
            direction = 0,
            currentViewIndex = this.currentViewIndex;

        currentSlideIndex = (currentSlideIndex + 2) % 3;
        if (currentSlideIndex - currentViewIndex === 1) {
            direction = 1;
        } else if (currentSlideIndex === 0 && currentViewIndex === 2) {
            direction = 1;
            this.slider.slideTo(1, 0, false);
        } else if (currentViewIndex - currentSlideIndex === 1) {
            direction = -1;
        } else if (currentSlideIndex === 2 && currentViewIndex === 0) {
            direction = -1;
            this.slider.slideTo(3, 0, false);
        }
        this.currentViewIndex = currentSlideIndex;
        this.move(direction);
    }

    move(direction:number) {
        if (direction === 0) return;

        this.direction = direction;
        if (this.moveOnSelected) {
            this.moveOnSelected = false;
        } else {
            let adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
            this.calendarService.setCurrentDateWithoutEvent(adjacentDate);
        }
        this.refreshView();
        this.direction = 0;
    }

    createDateObject(date:Date, format:string):IMonthViewRow {
        var disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(date);
        }

        return {
            date: date,
            events: [],
            label: new DatePipe('en-US').transform(date, format),
            secondary: false,
            disabled: disabled
        };
    }

    static getDates(startDate:Date, n:number):Date[] {
        let dates = new Array(n),
            current = new Date(startDate.getTime()),
            i = 0;
        current.setHours(12); // Prevent repeated dates because of timezone bug
        while (i < n) {
            dates[i++] = new Date(current.getTime());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    getViewData(startTime:Date):IMonthView {
        let startDate = startTime,
            date = startDate.getDate(),
            month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;

        let dates = MonthViewComponent.getDates(startDate, 42);
        let days:IMonthViewRow[] = [];
        for (let i = 0; i < 42; i++) {
            let dateObject = this.createDateObject(dates[i], this.formatDay);
            dateObject.secondary = dates[i].getMonth() !== month;
            days[i] = dateObject;
        }

        return {
            dates: days
        };
    }

    getHighlightClass(date:IMonthViewRow):string {
        let className = '';

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

        if (date.disabled) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-disabled';
        }
        return className;
    }

    getRange(currentDate:Date):IRange {
        let year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            firstDayOfMonth = new Date(year, month, 1),
            difference = this.startingDayMonth - firstDayOfMonth.getDay(),
            numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
            startDate = new Date(firstDayOfMonth.getTime());

        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }

        let endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);

        return {
            startTime: startDate,
            endTime: endDate
        };
    }

    onDataLoaded() {
        let range = this.range,
            eventSource = this.eventSource,
            len = eventSource ? eventSource.length : 0,
            startTime = range.startTime,
            endTime = range.endTime,
            utcStartTime = new Date(Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())),
            utcEndTime = new Date(Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())),
            currentViewIndex = this.currentViewIndex,
            dates = this.views[currentViewIndex].dates,
            oneDay = 86400000,
            eps = 0.001;

        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }

        for (let i = 0; i < len; i += 1) {
            let event = eventSource[i],
                eventStartTime = new Date(event.startTime.getTime()),
                eventEndTime = new Date(event.endTime.getTime()),
                st:Date,
                et:Date;

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

            let timeDiff:number;
            let timeDifferenceStart:number;
            if (eventStartTime <= st) {
                timeDifferenceStart = 0;
            } else {
                timeDiff = eventStartTime.getTime() - st.getTime();
                if (!event.allDay) {
                    timeDiff = timeDiff - (eventStartTime.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceStart = timeDiff / oneDay;
            }

            let timeDifferenceEnd:number;
            if (eventEndTime >= et) {
                timeDiff = et.getTime() - st.getTime();
                if (!event.allDay) {
                    timeDiff = timeDiff - (et.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceEnd = timeDiff / oneDay;
            } else {
                timeDiff = eventEndTime.getTime() - st.getTime();
                if (!event.allDay) {
                    timeDiff = timeDiff - (eventEndTime.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceEnd = timeDiff / oneDay;
            }

            let index = Math.floor(timeDifferenceStart);
            while (index < timeDifferenceEnd - eps) {
                dates[index].hasEvent = true;
                let eventSet = dates[index].events;
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

        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }

        let findSelected = false;
        for (let r = 0; r < 42; r += 1) {
            if (dates[r].selected) {
                this.selectedDate = dates[r];
                findSelected = true;
                break;
            }
            if (findSelected) {
                break;
            }
        }

        if (findSelected) {
            this.onTimeSelected.emit({
                selectedTime: this.selectedDate.date,
                events: this.selectedDate.events,
                disabled: this.selectedDate.disabled
            });
        }
    };

    refreshView() {
        this.range = this.getRange(this.calendarService.currentDate);

        if (this.inited) {
            let title = this.getTitle();
            this.onTitleChanged.emit(title);
        }
        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    }

    getTitle():string {
        let currentViewStartDate = this.range.startTime,
            date = currentViewStartDate.getDate(),
            month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12,
            year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0),
            headerDate = new Date(year, month, 1);
        return new DatePipe(undefined).transform(headerDate, this.formatMonthTitle);
    }

    private compareEvent(event1:IEvent, event2:IEvent):number {
        if (event1.allDay) {
            return 1;
        } else if (event2.allDay) {
            return -1;
        } else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    }

    select(viewDate:IMonthViewRow) {
        if (!this.views) return;

        let selectedDate = viewDate.date,
            events = viewDate.events;

        if (!viewDate.disabled) {
            let dates = this.views[this.currentViewIndex].dates,
            currentCalendarDate = this.calendarService.currentDate,
            currentMonth = currentCalendarDate.getMonth(),
            currentYear = currentCalendarDate.getFullYear(),
            selectedMonth = selectedDate.getMonth(),
            selectedYear = selectedDate.getFullYear(),
            direction = 0;

            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            } else {
                direction = currentYear < selectedYear ? 1 : -1;
            }

            this.calendarService.setCurrentDateWithoutEvent(selectedDate);
            if (direction === 0) {
                let currentViewStartDate = this.range.startTime,
                    oneDay = 86400000,
                    selectedDayDifference = Math.floor((selectedDate.getTime() - currentViewStartDate.getTime()) / oneDay);
                for (let r = 0; r < 42; r += 1) {
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
        }

        this.onTimeSelected.emit({selectedTime: selectedDate, events: events, disabled: viewDate.disabled});
    }

    slideView(direction:number) {
        if (direction === 1) {
            this.slider.slideNext();
        } else if (direction === -1) {
            this.slider.slidePrev();
        }
    }

    updateCurrentView(currentViewStartDate:Date, view:IMonthView) {
        let currentCalendarDate = this.calendarService.currentDate,
            today = new Date(),
            oneDay = 86400000,
            selectedDayDifference = Math.floor((currentCalendarDate.getTime() - currentViewStartDate.getTime()) / oneDay),
            currentDayDifference = Math.floor((today.getTime() - currentViewStartDate.getTime()) / oneDay);

        for (let r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }

        if (selectedDayDifference >= 0 && selectedDayDifference < 42 && !view.dates[selectedDayDifference].disabled) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        } else {
            this.selectedDate = {
                date: null,
                events: [],
                label: null,
                secondary: null,
                disabled: false
            };
        }

        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    }

    eventSelected(event:IEvent) {
        this.onEventSelected.emit(event);
    }
}
