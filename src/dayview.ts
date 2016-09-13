import {Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Slides} from 'ionic-angular';
import {CalendarService} from './calendar.service';

@Component({
    selector: 'dayview',
    template: `
        <div class="dayview">
            <ion-slides #daySlider [options]="slideOption" (ionDidChange)="onSlideChanged()">
                <ion-slide *ngFor="let view of views; let viewIndex=index">
                    <div class="dayview-allday-table">
                        <div class="dayview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" zoom="false" class="dayview-allday-content-wrapper">
                            <table class="table table-bordered dayview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':view.allDayEvents.length>0}"
                                        [ngStyle]="{height: 25*view.allDayEvents.length+'px'}"
                                        *ngIf="viewIndex===currentViewIndex">
                                        <div *ngFor="let displayEvent of view.allDayEvents; let eventIndex=index"
                                             class="calendar-event"
                                             (click)="eventSelected(displayEvent.event)"
                                             [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                                            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
                                        </div>
                                    </td>
                                    <td class="calendar-cell" *ngIf="viewIndex!==currentViewIndex">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <ion-scroll scrollY="true" class="dayview-normal-event-container">
                        <table class="table table-bordered table-fixed dayview-normal-event-table"
                               *ngIf="viewIndex===currentViewIndex">
                            <tbody>
                            <tr *ngFor="let tm of view.rows">
                                <td class="calendar-hour-column text-center">
                                    {{tm.time | date: formatHourColumn}}
                                </td>
                                <td class="calendar-cell" (click)="select(tm.time, tm.events)">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <div *ngFor="let displayEvent of tm.events" class="calendar-event"
                                             (click)="eventSelected(displayEvent.event)"
                                             [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px', left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered table-fixed dayview-normal-event-table"
                               *ngIf="viewIndex!==currentViewIndex">
                            <tbody>
                            <tr *ngFor="let tm of view.rows">
                                <td class="calendar-hour-column text-center">
                                    {{tm.time | date: formatHourColumn}}
                                </td>
                                <td class="calendar-cell">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ion-scroll>
                </ion-slide>
            </ion-slides>
        </div>
    `,
    styles: [`
        .scrollable {
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
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

        .calendar-hour-column {
          width: 50px;
          white-space: nowrap;
        }

        .calendar-event-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .calendar-event {
          position: absolute;
          padding: 2px;
          cursor: pointer;
          z-index: 10000;
        }

        .calendar-event-inner {
          overflow: hidden;
          background-color: #3a87ad;
          color: white;
          height: 100%;
          width: 100%;
          padding: 2px;
          line-height: 15px;
        }

        .calendar-cell {
          padding: 0 !important;
          height: 37px;
        }

        .dayview-allday-label {
          float: left;
          height: 100%;
          line-height: 50px;
          text-align: center;
          width: 50px;
        }

        .dayview-allday-content-wrapper {
          margin-left: 50px;
          overflow: hidden;
          height: 51px;
        }

        .dayview-allday-content-table {
          min-height: 50px;
        }

        .dayview-allday-content-table td {
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }

        .dayview {
          height: 100%;
        }

        .dayview-allday-table {
          height: 50px;
          position: relative;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        .dayview-normal-event-container {
          margin-top: 50px;
          overflow: hidden;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
          font-size: 14px;
        }

        .dayview .slide-zoom {
          height: 100%;
        }

        .dayview-allday-content-wrapper scroll-content {
          width: 100%;
        }

        ::-webkit-scrollbar,
        *::-webkit-scrollbar {
          display: none;
        }

        .table > tbody > tr > td.calendar-hour-column {
          padding-left: 0;
          padding-right: 0;
          vertical-align: middle;
        }

        @media (max-width: 750px) {
          .dayview-allday-label, .calendar-hour-column {
            width: 31px;
            font-size: 12px;
          }

          .dayview-allday-label {
            padding-top: 4px;
          }

          .table > tbody > tr > td.calendar-hour-column {
            padding-left: 0;
            padding-right: 0;
            vertical-align: middle;
            line-height: 12px;
          }

          .dayview-allday-label {
            line-height: 20px;
          }

          .dayview-allday-content-wrapper {
            margin-left: 31px;
          }

          .calendar-event-inner {
            font-size: 12px;
          }
        }
    `],
    encapsulation: ViewEncapsulation.None,
})
export class DayViewComponent implements OnInit, OnChanges {
    @ViewChild('daySlider') slider:Slides;
    @Input() formatHourColumn:String;
    @Input() formatDayTitle:string;
    @Input() allDayLabel:String;
    @Input() hourParts:number;
    @Input() eventSource;
    @Output() onRangeChanged = new EventEmitter(true);
    @Output() onEventSelected = new EventEmitter(true);
    @Output() onTimeSelected = new EventEmitter(true);
    @Output() onTitleChanged = new EventEmitter<string>(true);

    inited:boolean = false;
    range;
    views = [];
    currentViewIndex = 0;
    private direction = 0;
    slideOption = {
        runCallbacksOnInit: false,
        loop: true
    };
    changeDetectorRef;
    mode:String = 'day';

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
        this.calendarService.setCurrentCalendarDate(this.calendarService.getAdjacentCalendarDate(this.mode, direction));
        this.refreshView();
        this.direction = 0;
    }

    static createDateObjects(startTime) {
        var rows = [],
            time,
            currentHour = startTime.getHours(),
            currentDate = startTime.getDate();

        for (var hour = 0; hour < 24; hour += 1) {
            time = new Date(startTime.getTime());
            time.setHours(currentHour + hour);
            time.setDate(currentDate);
            rows.push({
                time: time
            });
        }
        return rows;
    }

    getViewData(startTime:Date) {
        return {
            rows: DayViewComponent.createDateObjects(startTime),
            allDayEvents: []
        };
    }

    getRange(currentDate) {
        var year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            date = currentDate.getDate(),
            startTime = new Date(year, month, date),
            endTime = new Date(year, month, date + 1);

        return {
            startTime: startTime,
            endTime: endTime
        };
    }

    onDataLoaded() {
        var eventSource = this.eventSource,
            hour,
            len = eventSource ? eventSource.length : 0,
            startTime = this.range.startTime,
            endTime = this.range.endTime,
            timeZoneOffset = -new Date().getTimezoneOffset(),
            utcStartTime = new Date(startTime.getTime() + timeZoneOffset * 60 * 1000),
            utcEndTime = new Date(endTime.getTime() + timeZoneOffset * 60 * 1000),
            currentViewIndex = this.currentViewIndex,
            rows = this.views[currentViewIndex].rows,
            allDayEvents = this.views[currentViewIndex].allDayEvents = [],
            oneHour = 3600000,
            eps = 0.016,
            eventSet,
            normalEventInRange = false;

        for (hour = 0; hour < 24; hour += 1) {
            rows[hour].events = [];
        }

        for (var i = 0; i < len; i += 1) {
            var event = eventSource[i];
            var eventStartTime = new Date(event.startTime);
            var eventEndTime = new Date(event.endTime);

            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                } else {
                    allDayEvents.push({
                        event: event
                    });
                }
            } else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                } else {
                    normalEventInRange = true;
                }

                var timeDifferenceStart;
                if (eventStartTime <= startTime) {
                    timeDifferenceStart = 0;
                } else {
                    timeDifferenceStart = (eventStartTime.getTime() - startTime.getTime()) / oneHour;
                }

                var timeDifferenceEnd;
                if (eventEndTime >= endTime) {
                    timeDifferenceEnd = (endTime.getTime() - startTime.getTime()) / oneHour;
                } else {
                    timeDifferenceEnd = (eventEndTime.getTime() - startTime.getTime()) / oneHour;
                }

                var startIndex = Math.floor(timeDifferenceStart);
                var endIndex = Math.ceil(timeDifferenceEnd - eps);
                var startOffset = 0;
                var endOffset = 0;
                if (this.hourParts !== 1) {
                    startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                }

                var displayEvent = {
                    event: event,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    startOffset: startOffset,
                    endOffset: endOffset
                };

                eventSet = rows[startIndex].events;
                if (eventSet) {
                    eventSet.push(displayEvent);
                } else {
                    eventSet = [];
                    eventSet.push(displayEvent);
                    rows[startIndex].events = eventSet;
                }
            }
        }

        if (normalEventInRange) {
            var orderedEvents = [];
            for (hour = 0; hour < 24; hour += 1) {
                if (rows[hour].events) {
                    rows[hour].events.sort(DayViewComponent.compareEventByStartOffset);

                    orderedEvents = orderedEvents.concat(rows[hour].events);
                }
            }
            if (orderedEvents.length > 0) {
                this.placeEvents(orderedEvents);
            }
        }
    }

    refreshView() {
        this.range = this.getRange(this.calendarService.currentCalendarDate);
        var title = this.getTitle();
        this.onTitleChanged.emit(title);

        this.calendarService.populateAdjacentViews(this);
        this.calendarService.rangeChanged(this);
    }

    getTitle() {
        var startingDate = this.range.startTime;
        return new DatePipe().transform(startingDate, this.formatDayTitle);
    }

    private static getISO8601WeekNumber(date) {
        var checkDate = new Date(date);
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
        var time = checkDate.getTime();
        checkDate.setMonth(0); // Compare with Jan 1
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;

    }

    private static compareEventByStartOffset(eventA, eventB) {
        return eventA.startOffset - eventB.startOffset;
    }


    select(selectedTime, events) {
        this.onTimeSelected.emit({selectedTime: selectedTime, events: events});
    }

    placeEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
        DayViewComponent.calculateWidth(orderedEvents);
    }

    placeAllDayEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
    }

    overlap(event1, event2) {
        var earlyEvent = event1,
            lateEvent = event2;
        if (event1.startIndex > event2.startIndex || (event1.startIndex === event2.startIndex && event1.startOffset > event2.startOffset)) {
            earlyEvent = event2;
            lateEvent = event1;
        }

        if (earlyEvent.endIndex <= lateEvent.startIndex) {
            return false;
        } else {
            return !(earlyEvent.endIndex - lateEvent.startIndex === 1 && earlyEvent.endOffset + lateEvent.startOffset > this.hourParts);
        }
    }

    calculatePosition(events) {
        var i,
            j,
            len = events.length,
            maxColumn = 0,
            col,
            isForbidden = new Array(len);

        for (i = 0; i < len; i += 1) {
            for (col = 0; col < maxColumn; col += 1) {
                isForbidden[col] = false;
            }
            for (j = 0; j < i; j += 1) {
                if (this.overlap(events[i], events[j])) {
                    isForbidden[events[j].position] = true;
                }
            }
            for (col = 0; col < maxColumn; col += 1) {
                if (!isForbidden[col]) {
                    break;
                }
            }
            if (col < maxColumn) {
                events[i].position = col;
            } else {
                events[i].position = maxColumn++;
            }
        }
    }

    private static calculateWidth(orderedEvents) {
        var cells = new Array(24),
            event,
            index,
            i,
            j,
            len,
            eventCountInCell,
            currentEventInCell;

        //sort by position in descending order, the right most columns should be calculated first
        orderedEvents.sort(function (eventA, eventB) {
            return eventB.position - eventA.position;
        });
        for (i = 0; i < 24; i += 1) {
            cells[i] = {
                calculated: false,
                events: []
            };
        }
        len = orderedEvents.length;
        for (i = 0; i < len; i += 1) {
            event = orderedEvents[i];
            index = event.startIndex;
            while (index < event.endIndex) {
                cells[index].events.push(event);
                index += 1;
            }
        }

        i = 0;
        while (i < len) {
            event = orderedEvents[i];
            if (!event.overlapNumber) {
                var overlapNumber = event.position + 1;
                event.overlapNumber = overlapNumber;
                var eventQueue = [event];
                while ((event = eventQueue.shift())) {
                    index = event.startIndex;
                    while (index < event.endIndex) {
                        if (!cells[index].calculated) {
                            cells[index].calculated = true;
                            if (cells[index].events) {
                                eventCountInCell = cells[index].events.length;
                                for (j = 0; j < eventCountInCell; j += 1) {
                                    currentEventInCell = cells[index].events[j];
                                    if (!currentEventInCell.overlapNumber) {
                                        currentEventInCell.overlapNumber = overlapNumber;
                                        eventQueue.push(currentEventInCell);
                                    }
                                }
                            }
                        }
                        index += 1;
                    }
                }
            }
            i += 1;
        }
    }

    eventSelected(event) {
        this.onEventSelected.emit(event);
    }
}