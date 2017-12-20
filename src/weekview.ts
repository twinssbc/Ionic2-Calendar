import { DatePipe } from '@angular/common';
import { Slides } from 'ionic-angular';
import { Component, OnInit, OnChanges, HostBinding, Input, Output, EventEmitter, SimpleChanges, ViewChild, ViewEncapsulation, TemplateRef, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ICalendarComponent, IDisplayEvent, IEvent, ITimeSelected, IRange, IWeekView, IWeekViewRow, IWeekViewDateRow, CalendarMode, IDateFormatter } from './calendar';
import { CalendarService } from './calendar.service';
import { IDisplayAllDayEvent } from "./calendar";

@Component({
    selector: 'weekview',
    template: `
        <ion-slides #weekSlider [loop]="true" [dir]="dir" [spaceBetween]="spaceBetween" (ionSlideDidChange)="onSlideChanged()">
            <ion-slide>
                <table class="table table-bordered table-fixed weekview-header">
                    <thead>
                    <tr>
                        <th class="calendar-hour-column"></th>
                        <th class="weekview-header text-center" *ngFor="let dayHeader of views[0].dayHeaders">{{dayHeader}}
                        </th>
                    </tr>
                    </thead>
                </table>
                <div *ngIf="0===currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" class="weekview-allday-content-wrapper" zoom="false">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[0].dates" class="calendar-cell">
                                        <div [ngClass]="{'calendar-event-wrap': day.events}" *ngIf="day.events"
                                             [ngStyle]="{height: 25*day.events.length+'px'}">
                                            <div *ngFor="let displayEvent of day.events" class="calendar-event" tappable
                                                 (click)="eventSelected(displayEvent.event)"
                                                 [ngStyle]="{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}">
                                                <ng-template [ngTemplateOutlet]="weekviewAllDayEventTemplate"
                                                    [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                                                </ng-template>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[0].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                                             (click)="eventSelected(displayEvent.event)"
                                             [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                             <ng-template [ngTemplateOutlet]="weekviewNormalEventTemplate"
                                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                                             </ng-template>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
                <div *ngIf="0!==currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" class="weekview-allday-content-wrapper" zoom="false">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[0].dates" class="calendar-cell">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[0].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
            </ion-slide>
            <ion-slide>
                <table class="table table-bordered table-fixed weekview-header">
                    <thead>
                    <tr>
                        <th class="calendar-hour-column"></th>
                        <th class="weekview-header text-center" *ngFor="let dayHeader of views[1].dayHeaders">{{dayHeader}}
                        </th>
                    </tr>
                    </thead>
                </table>
                <div *ngIf="1===currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" class="weekview-allday-content-wrapper" zoom="false">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[1].dates" class="calendar-cell">
                                        <div [ngClass]="{'calendar-event-wrap': day.events}" *ngIf="day.events"
                                             [ngStyle]="{height: 25*day.events.length+'px'}">
                                            <div *ngFor="let displayEvent of day.events" class="calendar-event" tappable
                                                 (click)="eventSelected(displayEvent.event)"
                                                 [ngStyle]="{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}">
                                                <ng-template [ngTemplateOutlet]="weekviewAllDayEventTemplate"
                                                    [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                                                </ng-template>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[1].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                                             (click)="eventSelected(displayEvent.event)"
                                             [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                             <ng-template [ngTemplateOutlet]="weekviewNormalEventTemplate"
                                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                                             </ng-template>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
                <div *ngIf="1!==currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" class="weekview-allday-content-wrapper" zoom="false">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[1].dates" class="calendar-cell">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[1].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
            </ion-slide>
            <ion-slide>
                <table class="table table-bordered table-fixed weekview-header">
                    <thead>
                    <tr>
                        <th class="calendar-hour-column"></th>
                        <th class="weekview-header text-center" *ngFor="let dayHeader of views[2].dayHeaders">{{dayHeader}}
                        </th>
                    </tr>
                    </thead>
                </table>
                <div *ngIf="2===currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" class="weekview-allday-content-wrapper" zoom="false">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[2].dates" class="calendar-cell">
                                        <div [ngClass]="{'calendar-event-wrap': day.events}" *ngIf="day.events"
                                             [ngStyle]="{height: 25*day.events.length+'px'}">
                                            <div *ngFor="let displayEvent of day.events" class="calendar-event" tappable
                                                 (click)="eventSelected(displayEvent.event)"
                                                 [ngStyle]="{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}">
                                                <ng-template [ngTemplateOutlet]="weekviewAllDayEventTemplate"
                                                    [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                                                </ng-template>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[2].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                    <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                                        <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                                             (click)="eventSelected(displayEvent.event)"
                                             [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                                             <ng-template [ngTemplateOutlet]="weekviewNormalEventTemplate"
                                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                                             </ng-template>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
                <div *ngIf="2!==currentViewIndex">
                    <div class="weekview-allday-table">
                        <div class="weekview-allday-label">{{allDayLabel}}</div>
                        <ion-scroll scrollY="true" class="weekview-allday-content-wrapper" zoom="false">
                            <table class="table table-fixed weekview-allday-content-table">
                                <tbody>
                                <tr>
                                    <td *ngFor="let day of views[2].dates" class="calendar-cell">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </ion-scroll>
                    </div>
                    <init-position-scroll class="weekview-normal-event-container" [initPosition]="initScrollPosition">
                        <table class="table table-bordered table-fixed weekview-normal-event-table">
                            <tbody>
                            <tr *ngFor="let row of views[2].rows; let i = index">
                                <td class="calendar-hour-column text-center">
                                    {{hourColumnLabels[i]}}
                                </td>
                                <td *ngFor="let tm of row" class="calendar-cell">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </init-position-scroll>
                </div>
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

        .weekview-allday-label {
          float: left;
          height: 100%;
          line-height: 50px;
          text-align: center;
          width: 50px;
          border-left: 1px solid #ddd;
        }

        [dir="rtl"] .weekview-allday-label {
            float: right;
            border-right: 1px solid #ddd;
        }

        .weekview-allday-content-wrapper {
          margin-left: 50px;
          overflow: hidden;
          height: 51px;
        }

        [dir="rtl"] .weekview-allday-content-wrapper {
          margin-left: 0;
          margin-right: 50px;
        }

        .weekview-allday-content-table {
          min-height: 50px;
        }

        .weekview-allday-content-table td {
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }

        .weekview-header th {
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
        }

        .weekview-allday-table {
          height: 50px;
          position: relative;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        .weekview-normal-event-container {
          margin-top: 87px;
          overflow: hidden;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
          font-size: 14px;
        }

        .weekview .slide-zoom {
          height: 100%;
        }

        .weekview-allday-content-wrapper scroll-content {
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
          .weekview-allday-label, .calendar-hour-column {
            width: 31px;
            font-size: 12px;
          }

          .weekview-allday-label {
            padding-top: 4px;
          }

          .table > tbody > tr > td.calendar-hour-column {
            padding-left: 0;
            padding-right: 0;
            vertical-align: middle;
            line-height: 12px;
          }

          .table > thead > tr > th.weekview-header {
            padding-left: 0;
            padding-right: 0;
            font-size: 12px;
          }

          .weekview-allday-label {
            line-height: 20px;
          }

          .weekview-allday-content-wrapper {
            margin-left: 31px;
          }

          [dir="rtl"] .weekview-allday-content-wrapper {
            margin-left: 0;
            margin-right: 31px;
          }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class WeekViewComponent implements ICalendarComponent, OnInit, OnChanges {
    @ViewChild('weekSlider') slider:Slides;
    @HostBinding('class.weekview') class = true;

    @Input() weekviewAllDayEventTemplate:TemplateRef<IDisplayAllDayEvent>;
    @Input() weekviewNormalEventTemplate:TemplateRef<IDisplayEvent>;

    @Input() formatWeekTitle:string;
    @Input() formatWeekViewDayHeader:string;
    @Input() formatHourColumn:string;
    @Input() startingDayWeek:number;
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
    @Input() lockSwipes:boolean;
    @Input() startHour:number;
    @Input() endHour:number;
    @Input() spaceBetween:number;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>(true);

    public views:IWeekView[] = [];
    public currentViewIndex = 0;
    public range:IRange;
    public direction = 0;
    public mode:CalendarMode = 'week';

    private inited = false;
    private callbackOnInit = true;
    private currentDateChangedFromParentSubscription:Subscription;
    private eventSourceChangedSubscription:Subscription;
    private localeSourceChangedSubscription:Subscription;
    private hourColumnLabels:string[];
    private initScrollPosition:number;
    private formatDayHeader:(date:Date) => string;
    private formatTitle:(date:Date) => string;
    private formatHourColumnLabel:(date:Date) => string;
    private hourRange:number;

    constructor(private calendarService:CalendarService, private elm:ElementRef) {
    }

    ngOnInit() {
        this.hourRange = this.endHour - this.startHour;
        if (this.dateFormatter && this.dateFormatter.formatWeekViewDayHeader) {
            this.formatDayHeader = this.dateFormatter.formatWeekViewDayHeader;
        } else {
            this.formatDayHeader = function (date:Date) {
              let datePipe = new DatePipe(this.locale);
                return datePipe.transform(date, this.formatWeekViewDayHeader);
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatWeekViewTitle) {
            this.formatTitle = this.dateFormatter.formatWeekViewTitle;
        } else {
            this.formatTitle = function (date:Date) {
              let datePipe = new DatePipe(this.locale);
                return datePipe.transform(date, this.formatWeekTitle);
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatWeekViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatWeekViewHourColumn;
        } else {
            this.formatHourColumnLabel = function (date:Date) {
              let datePipe = new DatePipe(this.locale);
                return datePipe.transform(date, this.formatHourColumn);
            };
        }

        if (this.lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(true);
        }

        if (this.lockSwipes) {
            this.slider.lockSwipes(true);
        }

        this.refreshView();
        this.hourColumnLabels = this.getHourColumnLabels();
        this.inited = true;

        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(currentDate => {
            this.refreshView();
        });

        this.localeSourceChangedSubscription = this.calendarService.localeSourceChanged$.subscribe(language => {
          this.locale = language;
          this.getTitle();
          this.hourColumnLabels = this.getHourColumnLabels();
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
            let hourColumns = this.elm.nativeElement.querySelector('.weekview-normal-event-container').querySelectorAll('.calendar-hour-column');
            let me = this;
            setTimeout(function () {
                me.initScrollPosition = hourColumns[me.scrollToHour - me.startHour].offsetTop;
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

        let lockSwipes = changes['lockSwipesv'];
        if (lockSwipes) {
            this.slider.lockSwipes(lockSwipes.currentValue);
        }
    }

    ngOnDestroy() {
        if (this.currentDateChangedFromParentSubscription) {
            this.currentDateChangedFromParentSubscription.unsubscribe();
            this.currentDateChangedFromParentSubscription = null;
        }

        if (this.localeSourceChangedSubscription) {
          this.localeSourceChangedSubscription.unsubscribe();
          this.localeSourceChangedSubscription = null;
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
        if (direction === 0) {
            return;
        }
        this.direction = direction;
        let adjacent = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacent);
        this.refreshView();
        this.direction = 0;
    }

    static createDateObjects(startTime:Date, startHour: number, endHour: number):IWeekViewRow[][] {
        let times:IWeekViewRow[][] = [],
            currentHour = startTime.getHours(),
            currentDate = startTime.getDate();

        for (let hour = startHour; hour < endHour; hour += 1) {
            let row:IWeekViewRow[] = [];
            for (let day = 0; day < 7; day += 1) {
                let time = new Date(startTime.getTime());
                time.setHours(currentHour + hour);
                time.setDate(currentDate + day);
                row.push({
                    events: [],
                    time: time
                });
            }
            times.push(row);
        }
        return times;
    }

    static getDates(startTime:Date, n:number):IWeekViewDateRow[] {
        let dates = new Array(n),
            current = new Date(startTime.getTime()),
            i = 0;
        current.setHours(12); // Prevent repeated dates because of timezone bug
        while (i < n) {
            dates[i++] = {
                date: new Date(current.getTime()),
                events: []
            };
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    private getHourColumnLabels():string[] {
        let hourColumnLabels:string[] = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour][0].time));
        }
        return hourColumnLabels;
    }

    getViewData(startTime:Date):IWeekView {
        let dates = WeekViewComponent.getDates(startTime, 7);
        let dayHeaders:string[] = [];
        for (let i = 0; i < 7; i++) {
            dayHeaders.push(this.formatDayHeader(dates[i].date));
        }

        return {
            rows: WeekViewComponent.createDateObjects(startTime, this.startHour, this.endHour),
            dates: dates,
            dayHeaders: dayHeaders
        };
    }

    getRange(currentDate:Date):IRange {
        let year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            date = currentDate.getDate(),
            day = currentDate.getDay(),
            difference = day - this.startingDayWeek;

        if (difference < 0) {
            difference += 7;
        }

        let firstDayOfWeek = new Date(year, month, date - difference);
        let endTime = new Date(year, month, date - difference + 7);

        return {
            startTime: firstDayOfWeek,
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
            dates = this.views[currentViewIndex].dates,
            oneHour = 3600000,
            oneDay = 86400000,
        // add allday eps
            eps = 0.016,
            allDayEventInRange = false,
            normalEventInRange = false;

        for (let i = 0; i < 7; i += 1) {
            dates[i].events = [];
        }

        for (let day = 0; day < 7; day += 1) {
            for (let hour = 0; hour < this.hourRange; hour += 1) {
                rows[hour][day].events = [];
            }
        }
        for (let i = 0; i < len; i += 1) {
            let event = eventSource[i];
            let eventStartTime = new Date(event.startTime.getTime());
            let eventEndTime = new Date(event.endTime.getTime());

            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                } else {
                    allDayEventInRange = true;

                    let allDayStartIndex:number;
                    if (eventStartTime <= utcStartTime) {
                        allDayStartIndex = 0;
                    } else {
                        allDayStartIndex = Math.floor((eventStartTime.getTime() - utcStartTime.getTime()) / oneDay);
                    }

                    let allDayEndIndex:number;
                    if (eventEndTime >= utcEndTime) {
                        allDayEndIndex = Math.ceil((utcEndTime.getTime() - utcStartTime.getTime()) / oneDay);
                    } else {
                        allDayEndIndex = Math.ceil((eventEndTime.getTime() - utcStartTime.getTime()) / oneDay);
                    }

                    let displayAllDayEvent:IDisplayEvent = {
                        event: event,
                        startIndex: allDayStartIndex,
                        endIndex: allDayEndIndex
                    };

                    let eventSet = dates[allDayStartIndex].events;
                    if (eventSet) {
                        eventSet.push(displayAllDayEvent);
                    } else {
                        eventSet = [];
                        eventSet.push(displayAllDayEvent);
                        dates[allDayStartIndex].events = eventSet;
                    }
                }
            } else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                } else {
                    normalEventInRange = true;

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

                    let startIndex = Math.floor(timeDifferenceStart),
                        endIndex = Math.ceil(timeDifferenceEnd - eps),
                        startRowIndex = startIndex % 24,
                        dayIndex = Math.floor(startIndex / 24),
                        endOfDay = dayIndex * 24,
                        startOffset = 0,
                        endOffset = 0;

                    if (this.hourParts !== 1) {
                        if (startRowIndex < this.startHour) {
                            startOffset = 0;
                        } else {
                            startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                        }
                    }

                    do {
                        endOfDay += 24;
                        let endRowIndex:number;
                        if (endOfDay <= endIndex) {
                            endRowIndex = 24;
                        } else {
                            endRowIndex = endIndex % 24;
                            if (this.hourParts !== 1) {
                                if (endRowIndex > this.endHour) {
                                    endOffset = 0;
                                } else {
                                    endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                                }
                            }
                        }
                        if(startRowIndex < this.startHour) {
                            startRowIndex = 0;
                        } else {
                            startRowIndex -= this.startHour;
                        }
                        if(endRowIndex > this.endHour) {
                            endRowIndex = this.endHour;
                        }
                        endRowIndex -= this.startHour;

                        if(startRowIndex < endRowIndex) {
                            let displayEvent = {
                                event: event,
                                startIndex: startRowIndex,
                                endIndex: endRowIndex,
                                startOffset: startOffset,
                                endOffset: endOffset
                            };
                            let eventSet = rows[startRowIndex][dayIndex].events;
                            if (eventSet) {
                                eventSet.push(displayEvent);
                            } else {
                                eventSet = [];
                                eventSet.push(displayEvent);
                                rows[startRowIndex][dayIndex].events = eventSet;
                            }
                        }
                        startRowIndex = 0;
                        startOffset = 0;
                        dayIndex += 1;
                    } while (endOfDay < endIndex);
                }
            }
        }

        if (normalEventInRange) {
            for (let day = 0; day < 7; day += 1) {
                let orderedEvents:IDisplayEvent[] = [];
                for (let hour = 0; hour < this.hourRange; hour += 1) {
                    if (rows[hour][day].events) {
                        rows[hour][day].events.sort(WeekViewComponent.compareEventByStartOffset);
                        orderedEvents = orderedEvents.concat(rows[hour][day].events);
                    }
                }
                if (orderedEvents.length > 0) {
                    this.placeEvents(orderedEvents);
                }
            }
        }

        if (allDayEventInRange) {
            let orderedAllDayEvents:IDisplayEvent[] = [];
            for (let day = 0; day < 7; day += 1) {
                if (dates[day].events) {
                    orderedAllDayEvents = orderedAllDayEvents.concat(dates[day].events);
                }
            }
            if (orderedAllDayEvents.length > 0) {
                this.placeAllDayEvents(orderedAllDayEvents);
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
        let firstDayOfWeek = new Date(this.range.startTime.getTime());
        firstDayOfWeek.setHours(12, 0, 0, 0);
        return this.formatTitle(firstDayOfWeek);
    }

    private static compareEventByStartOffset(eventA:IDisplayEvent, eventB:IDisplayEvent):number {
        return eventA.startOffset - eventB.startOffset;
    }

    select(selectedTime:Date, events:IDisplayEvent[]) {
        let disabled = false;
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
        WeekViewComponent.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
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
            return !(earlyEvent.endIndex - lateEvent.startIndex === 1 && earlyEvent.endOffset + lateEvent.startOffset >= this.hourParts);
        }
    }

    calculatePosition(events:IDisplayEvent[]) {
        let len = events.length,
            maxColumn = 0,
            isForbidden = new Array(len);

        for (let i = 0; i < len; i += 1) {
            let col:number;
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

    private static calculateWidth(orderedEvents:IDisplayEvent[], size:number, hourParts:number) {
        let totalSize = size * hourParts,
            cells = new Array(totalSize);

        // sort by position in descending order, the right most columns should be calculated first
        orderedEvents.sort((eventA, eventB) => {
            return eventB.position - eventA.position;
        });
        for (let i = 0; i < totalSize; i += 1) {
            cells[i] = {
                calculated: false,
                events: []
            };
        }
        let len = orderedEvents.length;
        for (let i = 0; i < len; i += 1) {
            let event = orderedEvents[i];
            let index = event.startIndex * hourParts + event.startOffset;
            while (index < event.endIndex * hourParts - event.endOffset) {
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
                    let index = event.startIndex * hourParts + event.startOffset;
                    while (index < event.endIndex * hourParts - event.endOffset) {
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
