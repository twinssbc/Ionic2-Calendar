import { DatePipe } from '@angular/common';
import { Slides } from 'ionic-angular';
import { Component, OnInit, OnChanges, HostBinding, Input, Output, EventEmitter, SimpleChanges, ViewChild, ViewEncapsulation, TemplateRef, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ICalendarComponent, IDayView, IDayViewRow, IDisplayEvent, IEvent, ITimeSelected, IRange, CalendarMode, IDateFormatter } from './calendar';
import { CalendarService } from './calendar.service';
import { IDisplayAllDayEvent } from "./calendar";

@Component({
    selector: 'dayview',
    template: `
        <ion-slides #daySlider [loop]="true" [dir]="dir" (ionSlideDidChange)="onSlideChanged()">
            <ion-slide>
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <ion-scroll scrollY="true" zoom="false" class="dayview-allday-content-wrapper">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[0].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[0].allDayEvents.length+'px'}"
                                    *ngIf="0===currentViewIndex">
                                    <div *ngFor="let displayEvent of views[0].allDayEvents; let eventIndex=index"
                                         class="calendar-event" tappable
                                         (click)="eventSelected(displayEvent.event)"
                                         [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                                        <ng-template [ngTemplateOutlet]="dayviewAllDayEventTemplate"
                                            [ngOutletContext]="{displayEvent:displayEvent}">
                                        </ng-template>
                                    </div>
                                </td>
                                <td class="calendar-cell" *ngIf="0!==currentViewIndex">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ion-scroll>
                </div>
                <init-position-scroll *ngIf="0===currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                    <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                                         (click)="eventSelected(displayEvent.event)"
                                         [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px', left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                         <ng-template [ngTemplateOutlet]="dayviewNormalEventTemplate"
                                             [ngOutletContext]="{displayEvent:displayEvent}">
                                         </ng-template>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="0!==currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
            <ion-slide>
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <ion-scroll scrollY="true" zoom="false" class="dayview-allday-content-wrapper">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[1].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[1].allDayEvents.length+'px'}"
                                    *ngIf="1===currentViewIndex">
                                    <div *ngFor="let displayEvent of views[1].allDayEvents; let eventIndex=index"
                                         class="calendar-event" tappable
                                         (click)="eventSelected(displayEvent.event)"
                                         [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                                        <ng-template [ngTemplateOutlet]="dayviewAllDayEventTemplate"
                                            [ngOutletContext]="{displayEvent:displayEvent}">
                                        </ng-template>
                                    </div>
                                </td>
                                <td class="calendar-cell" *ngIf="1!==currentViewIndex">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ion-scroll>
                </div>
                <init-position-scroll *ngIf="1===currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                    <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                                         (click)="eventSelected(displayEvent.event)"
                                         [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px', left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                         <ng-template [ngTemplateOutlet]="dayviewNormalEventTemplate"
                                             [ngOutletContext]="{displayEvent:displayEvent}">
                                         </ng-template>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="1!==currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
            <ion-slide>
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <ion-scroll scrollY="true" zoom="false" class="dayview-allday-content-wrapper">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[2].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[2].allDayEvents.length+'px'}"
                                    *ngIf="2===currentViewIndex">
                                    <div *ngFor="let displayEvent of views[2].allDayEvents; let eventIndex=index"
                                         class="calendar-event" tappable
                                         (click)="eventSelected(displayEvent.event)"
                                         [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                                        <ng-template [ngTemplateOutlet]="dayviewAllDayEventTemplate"
                                            [ngOutletContext]="{displayEvent:displayEvent}">
                                        </ng-template>
                                    </div>
                                </td>
                                <td class="calendar-cell" *ngIf="2!==currentViewIndex">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ion-scroll>
                </div>
                <init-position-scroll *ngIf="2===currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                    <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                                         (click)="eventSelected(displayEvent.event)"
                                         [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px', left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                         <ng-template [ngTemplateOutlet]="dayviewNormalEventTemplate"
                                             [ngOutletContext]="{displayEvent:displayEvent}">
                                         </ng-template>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="2!==currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
        </ion-slides>
    `,
    styles: [`
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

        [dir="rtl"] .dayview-allday-label {
            border-right: 1px solid #ddd;
            float: right;
        }

        .dayview-allday-content-wrapper {
          margin-left: 50px;
          overflow: hidden;
          height: 51px;
        }

        [dir="rtl"] .dayview-allday-content-wrapper {
          margin-left: 0;
          margin-right: 50px;
        }

        .dayview-allday-content-table {
          min-height: 50px;
        }

        .dayview-allday-content-table td {
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
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

          [dir="rtl"] .dayview-allday-content-wrapper {
            margin-left: 0;
            margin-right: 31px;
          }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class DayViewComponent implements ICalendarComponent, OnInit, OnChanges {
    @ViewChild('daySlider') slider:Slides;
    @HostBinding('class.dayview') class = true;

    @Input() dayviewAllDayEventTemplate:TemplateRef<IDisplayAllDayEvent>;
    @Input() dayviewNormalEventTemplate:TemplateRef<IDisplayEvent>;

    @Input() formatHourColumn:string;
    @Input() formatDayTitle:string;
    @Input() allDayLabel:string;
    @Input() hourParts:number;
    @Input() eventSource:IEvent[];
    @Input() markDisabled:(date:Date) => boolean;
    @Input() locale:string;
    @Input() dateFormatter:IDateFormatter;
    @Input() dir:string = "";
    @Input() scrollToHour:number = 0;
    @Input() preserveScrollPosition:boolean;
    @Input() lockSwipeToPrev:boolean;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>(true);

    public slideOption = {
        runCallbacksOnInit: false,
        loop: true
    };
    public views:IDayView[] = [];
    public currentViewIndex = 0;
    public direction = 0;
    public mode:CalendarMode = 'day';
    public range:IRange;

    private inited = false;
    private callbackOnInit = true;
    private currentDateChangedFromParentSubscription:Subscription;
    private eventSourceChangedSubscription:Subscription;
    private hourColumnLabels:string[];
    private initScrollPosition:number;
    private formatTitle:(date:Date) => string;
    private formatHourColumnLabel:(date:Date) => string;

    constructor(private calendarService:CalendarService, private elm:ElementRef) {
    }

    ngOnInit() {
        if (this.dateFormatter && this.dateFormatter.formatDayViewTitle) {
            this.formatTitle = this.dateFormatter.formatDayViewTitle;
        } else {
            var datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date:Date) {
                return datePipe.transform(date, this.formatDayTitle);
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatDayViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatDayViewHourColumn;
        } else {
            var datePipe = new DatePipe(this.locale);
            this.formatHourColumnLabel = function (date:Date) {
                return datePipe.transform(date, this.formatHourColumn);
            };
        }

        if (this.lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(true);
        }

        this.refreshView();
        this.hourColumnLabels = this.getHourColumnLabels();

        this.inited = true;

        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(currentDate => {
            this.refreshView();
        });

        this.eventSourceChangedSubscription = this.calendarService.eventSourceChanged$.subscribe(() => {
            this.onDataLoaded();
        });
    }

    ngAfterViewInit() {
        let title = this.getTitle();
        this.onTitleChanged.emit(title);

        if (this.scrollToHour > 0) {
            let hourColumns = this.elm.nativeElement.querySelector('.dayview-normal-event-container').querySelectorAll('.calendar-hour-column');
            var me = this;
            setTimeout(function () {
                me.initScrollPosition = hourColumns[me.scrollToHour].offsetTop;
            }, 0);
        }
    }

    ngOnChanges(changes:SimpleChanges) {
        if (!this.inited) return;

        let eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }

        let lockSwipeToPrev = changes['lockSwipeToPrev'];
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }
    }

    ngOnDestroy() {
        if (this.currentDateChangedFromParentSubscription) {
            this.currentDateChangedFromParentSubscription.unsubscribe();
            this.currentDateChangedFromParentSubscription = null;
        }

        if (this.eventSourceChangedSubscription) {
            this.eventSourceChangedSubscription.unsubscribe();
            this.eventSourceChangedSubscription = null;
        }
    }

    onSlideChanged() {
        if (this.callbackOnInit) {
            this.callbackOnInit = false;
            return;
        }

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
        let adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacentDate);
        this.refreshView();
        this.direction = 0;
    }

    static createDateObjects(startTime:Date):IDayViewRow[] {
        let rows:IDayViewRow[] = [],
            time:Date,
            currentHour = startTime.getHours(),
            currentDate = startTime.getDate();

        for (let hour = 0; hour < 24; hour += 1) {
            time = new Date(startTime.getTime());
            time.setHours(currentHour + hour);
            time.setDate(currentDate);
            rows.push({
                time: time,
                events: []
            });
        }
        return rows;
    }

    private getHourColumnLabels():string[] {
        let hourColumnLabels:string[] = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour].time));
        }
        return hourColumnLabels;
    }

    getViewData(startTime:Date):IDayView {
        return {
            rows: DayViewComponent.createDateObjects(startTime),
            allDayEvents: []
        };
    }

    getRange(currentDate:Date):IRange {
        let year = currentDate.getFullYear(),
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
        let eventSource = this.eventSource,
            len = eventSource ? eventSource.length : 0,
            startTime = this.range.startTime,
            endTime = this.range.endTime,
            utcStartTime = new Date(Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())),
            utcEndTime = new Date(Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())),
            currentViewIndex = this.currentViewIndex,
            rows = this.views[currentViewIndex].rows,
            allDayEvents = this.views[currentViewIndex].allDayEvents,
            oneHour = 3600000,
            eps = 0.016,
            normalEventInRange = false;

        for (let hour = 0; hour < 24; hour += 1) {
            rows[hour].events = [];
        }

        for (let i = 0; i < len; i += 1) {
            let event = eventSource[i];
            let eventStartTime = new Date(event.startTime.getTime());
            let eventEndTime = new Date(event.endTime.getTime());

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

                let timeDiff:number;
                let timeDifferenceStart:number;
                if (eventStartTime <= startTime) {
                    timeDifferenceStart = 0;
                } else {
                    timeDiff = eventStartTime.getTime() - startTime.getTime() - (eventStartTime.getTimezoneOffset() - startTime.getTimezoneOffset()) * 60000;
                    timeDifferenceStart = timeDiff / oneHour;
                }

                let timeDifferenceEnd:number;
                if (eventEndTime >= endTime) {
                    timeDiff = endTime.getTime() - startTime.getTime() - (endTime.getTimezoneOffset() - startTime.getTimezoneOffset()) * 60000;
                    timeDifferenceEnd = timeDiff / oneHour;
                } else {
                    timeDiff = eventEndTime.getTime() - startTime.getTime() - (eventEndTime.getTimezoneOffset() - startTime.getTimezoneOffset()) * 60000;
                    timeDifferenceEnd = timeDiff / oneHour;
                }

                let startIndex = Math.floor(timeDifferenceStart);
                let endIndex = Math.ceil(timeDifferenceEnd - eps);
                let startOffset = 0;
                let endOffset = 0;
                if (this.hourParts !== 1) {
                    startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                }

                let displayEvent = {
                    event: event,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    startOffset: startOffset,
                    endOffset: endOffset
                };

                let eventSet = rows[startIndex].events;
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
            let orderedEvents:IDisplayEvent[] = [];
            for (let hour = 0; hour < 24; hour += 1) {
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
        this.range = this.getRange(this.calendarService.currentDate);
        if (this.inited) {
            let title = this.getTitle();
            this.onTitleChanged.emit(title);
        }

        this.calendarService.populateAdjacentViews(this);
        this.calendarService.rangeChanged(this);
    }

    getTitle():string {
        let startingDate = this.range.startTime;
        return this.formatTitle(startingDate);
    }

    private static compareEventByStartOffset(eventA:IDisplayEvent, eventB:IDisplayEvent) {
        return eventA.startOffset - eventB.startOffset;
    }

    select(selectedTime:Date, events:IDisplayEvent[]) {
        var disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedTime);
        }

        this.onTimeSelected.emit({
            selectedTime: selectedTime,
            events: events.map(e => e.event),
            disabled: disabled
        });
    }

    placeEvents(orderedEvents:IDisplayEvent[]) {
        this.calculatePosition(orderedEvents);
        DayViewComponent.calculateWidth(orderedEvents);
    }

    placeAllDayEvents(orderedEvents:IDisplayEvent[]) {
        this.calculatePosition(orderedEvents);
    }

    overlap(event1:IDisplayEvent, event2:IDisplayEvent):boolean {
        let earlyEvent = event1,
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

    calculatePosition(events:IDisplayEvent[]) {
        let len = events.length,
            maxColumn = 0,
            col:number,
            isForbidden:boolean[] = new Array(len);

        for (let i = 0; i < len; i += 1) {
            for (col = 0; col < maxColumn; col += 1) {
                isForbidden[col] = false;
            }
            for (let j = 0; j < i; j += 1) {
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

        if (this.dir === 'rtl') {
            for (let i = 0; i < len; i += 1) {
                events[i].position = maxColumn - 1 - events[i].position;
            }
        }
    }

    private static calculateWidth(orderedEvents:IDisplayEvent[]) {
        let cells:{ calculated: boolean; events: IDisplayEvent[]; }[] = new Array(24);

        // sort by position in descending order, the right most columns should be calculated first
        orderedEvents.sort((eventA, eventB) => {
            return eventB.position - eventA.position;
        });
        for (let i = 0; i < 24; i += 1) {
            cells[i] = {
                calculated: false,
                events: []
            };
        }
        let len = orderedEvents.length;
        for (let i = 0; i < len; i += 1) {
            let event = orderedEvents[i];
            let index = event.startIndex;
            while (index < event.endIndex) {
                cells[index].events.push(event);
                index += 1;
            }
        }

        let i = 0;
        while (i < len) {
            let event = orderedEvents[i];
            if (!event.overlapNumber) {
                let overlapNumber = event.position + 1;
                event.overlapNumber = overlapNumber;
                let eventQueue = [event];
                while ((event = eventQueue.shift())) {
                    let index = event.startIndex;
                    while (index < event.endIndex) {
                        if (!cells[index].calculated) {
                            cells[index].calculated = true;
                            if (cells[index].events) {
                                let eventCountInCell = cells[index].events.length;
                                for (let j = 0; j < eventCountInCell; j += 1) {
                                    let currentEventInCell = cells[index].events[j];
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

    eventSelected(event:IEvent) {
        this.onEventSelected.emit(event);
    }

    setScrollPosition(scrollPosition:number) {
        this.initScrollPosition = scrollPosition;
    }
}
