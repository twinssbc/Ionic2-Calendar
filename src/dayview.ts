import {DatePipe} from '@angular/common';
import {
    Component,
    OnInit,
    OnChanges,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    TemplateRef,
    ElementRef,
    AfterViewInit, 
    OnDestroy,
    NgZone
} from '@angular/core';
import {Subscription} from 'rxjs';
import { SwiperComponent } from 'swiper/angular';

import {
    ICalendarComponent,
    IDayView,
    IDayViewRow,
    IDisplayEvent,
    IEvent,
    ITimeSelected,
    IRange,
    CalendarMode,
    IDateFormatter,
    IDisplayAllDayEvent,
    IDayViewAllDayEventSectionTemplateContext,
    IDayViewNormalEventSectionTemplateContext
} from './calendar.interface';
import {CalendarService} from './calendar.service';

@Component({
    selector: 'dayview',
    template: `
        <swiper #swiper [config]="sliderOptions" [dir]="dir" [allowSlidePrev]="!lockSwipeToPrev && !lockSwipes" [allowSlideNext]="!lockSwipes" (slideChangeTransitionEnd)="onSlideChanged()" class="slides-container">
            <ng-template swiperSlide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[0].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[0].allDayEvents.length+'px'}"
                                    *ngIf="0===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[0].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="0!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[0].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="0===currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition"
                                      (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="0!==currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ng-template>
            <ng-template swiperSlide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[1].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[1].allDayEvents.length+'px'}"
                                    *ngIf="1===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[1].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="1!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[1].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="1===currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition"
                                      (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="1!==currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ng-template>
            <ng-template swiperSlide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[2].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[2].allDayEvents.length+'px'}"
                                    *ngIf="2===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[2].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="2!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[2].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="2===currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition"
                                      (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="2!==currentViewIndex" class="dayview-normal-event-container"
                                      [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ng-template>
        </swiper>
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

        .slides-container {
            height: 100%;
        }

        .slide-container {
            display: block !important;
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
            border-left: 1px solid #ddd;
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

        .scroll-content {
            overflow-y: auto;
            overflow-x: hidden;
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
export class DayViewComponent implements ICalendarComponent, OnInit, OnChanges, OnDestroy, AfterViewInit {

    constructor(private calendarService: CalendarService, private elm: ElementRef, private zone: NgZone) {
    }

    @HostBinding('class.dayview') class = true;
    @ViewChild('swiper', { static: false }) slider!: SwiperComponent;

    @Input() dayviewAllDayEventTemplate!: TemplateRef<IDisplayAllDayEvent>;
    @Input() dayviewNormalEventTemplate!: TemplateRef<IDisplayEvent>;
    @Input() dayviewAllDayEventSectionTemplate!: TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    @Input() dayviewNormalEventSectionTemplate!: TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    @Input() dayviewInactiveAllDayEventSectionTemplate!: TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    @Input() dayviewInactiveNormalEventSectionTemplate!: TemplateRef<IDayViewNormalEventSectionTemplateContext>;

    @Input() formatHourColumn?: string;
    @Input() formatDayTitle?: string;
    @Input() allDayLabel?: string;
    @Input() hourParts!: number;
    @Input() eventSource!: IEvent[];
    @Input() markDisabled?: (date: Date) => boolean;
    @Input() locale!: string;
    @Input() dateFormatter?: IDateFormatter;
    @Input() dir = '';
    @Input() scrollToHour = 0;
    @Input() preserveScrollPosition?: boolean;
    @Input() lockSwipeToPrev?: boolean;
    @Input() lockSwipeToNext?: boolean;
    @Input() lockSwipes?: boolean;
    @Input() startHour!: number;
    @Input() endHour!: number;
    @Input() sliderOptions: any;
    @Input() hourSegments!: number;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>(true);

    public views: IDayView[] = [];
    public currentViewIndex = 0;
    public direction = 0;
    public mode: CalendarMode = 'day';
    public range!: IRange;

    private inited = false;
    private callbackOnInit = true;
    private currentDateChangedFromParentSubscription?: Subscription;
    private eventSourceChangedSubscription?: Subscription;
    private slideChangedSubscription?: Subscription;
    private slideUpdatedSubscription?: Subscription;

    public hourColumnLabels!: string[];
    public initScrollPosition!: number;
    private formatTitle!: (date: Date) => string;
    private formatHourColumnLabel!: (date: Date) => string;
    private hourRange!: number;

    static createDateObjects(startTime: Date, startHour: number, endHour: number, timeInterval: number): IDayViewRow[] {
        const rows: IDayViewRow[] = [],
            currentHour = 0,
            currentDate = startTime.getDate();
        let time: Date,
            hourStep,
            minStep;

        if (timeInterval < 1) {
            hourStep = Math.floor(1 / timeInterval);
            minStep = 60;
        } else {
            hourStep = 1;
            minStep = Math.floor(60 / timeInterval);
        }

        for (let hour = startHour; hour < endHour; hour += hourStep) {
            for (let interval = 0; interval < 60; interval += minStep) {
                time = new Date(startTime.getTime());
                time.setHours(currentHour + hour, interval);
                time.setDate(currentDate);
                rows.push({
                    time,
                    events: []
                });
            }
        }
        return rows;
    }

    private static compareEventByStartOffset(eventA: IDisplayEvent, eventB: IDisplayEvent) {
        return eventA.startOffset - eventB.startOffset;
    }

    private static calculateWidth(orderedEvents: IDisplayEvent[], size: number, hourParts: number) {
        const totalSize = size * hourParts,
            cells: { calculated: boolean; events: IDisplayEvent[]; }[] = new Array(totalSize);

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
        const len = orderedEvents.length;
        for (let i = 0; i < len; i += 1) {
            const event = orderedEvents[i];
            let index = event.startIndex * hourParts + event.startOffset;
            while (index < event.endIndex * hourParts - event.endOffset) {
                cells[index].events.push(event);
                index += 1;
            }
        }

        let i = 0;
        while (i < len) {
            let event:IDisplayEvent|undefined = orderedEvents[i];
            if (!event.overlapNumber) {
                const overlapNumber = event.position + 1;
                event.overlapNumber = overlapNumber;
                const eventQueue = [event];
                while (event = eventQueue.shift()) {
                    let index = event.startIndex * hourParts + event.startOffset;
                    while (index < event.endIndex * hourParts - event.endOffset) {
                        if (!cells[index].calculated) {
                            cells[index].calculated = true;
                            if (cells[index].events) {
                                const eventCountInCell = cells[index].events.length;
                                for (let j = 0; j < eventCountInCell; j += 1) {
                                    const currentEventInCell = cells[index].events[j];
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

    ngOnInit() {
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;

        this.hourRange = (this.endHour - this.startHour) * this.hourSegments;
        if (this.dateFormatter && this.dateFormatter.formatDayViewTitle) {
            this.formatTitle = this.dateFormatter.formatDayViewTitle;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function(date: Date) {
                return datePipe.transform(date, this.formatDayTitle)||'';
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatDayViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatDayViewHourColumn;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatHourColumnLabel = function(date: Date) {
                return datePipe.transform(date, this.formatHourColumn)||'';
            };
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

        this.slideChangedSubscription = this.calendarService.slideChanged$.subscribe(direction => {
            if (direction === 1) {
                this.slider.swiperRef.slideNext();
            } else if (direction === -1) {
                this.slider.swiperRef.slidePrev();
            }
        });

        this.slideUpdatedSubscription = this.calendarService.slideUpdated$.subscribe(() => {
            this.slider.swiperRef.update();
        });
    }

    ngAfterViewInit() {
        const title = this.getTitle();
        this.onTitleChanged.emit(title);

        if (this.scrollToHour > 0) {
            const hourColumns = this.elm.nativeElement.querySelector('.dayview-normal-event-container').querySelectorAll('.calendar-hour-column');
            const me = this;
            setTimeout(() => {
                me.initScrollPosition = hourColumns[me.scrollToHour - me.startHour].offsetTop;
            }, 50);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.inited) {
            return;
        }
        if ((changes['startHour'] || changes['endHour']) && (!changes['startHour'].isFirstChange() || !changes['endHour'].isFirstChange())) {
            this.views = [];
            this.hourRange = (this.endHour - this.startHour) * this.hourSegments;
            this.direction = 0;
            this.refreshView();
            this.hourColumnLabels = this.getHourColumnLabels();
        }

        const eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }

        const lockSwipeToPrev = changes['lockSwipeToPrev'];
        if (lockSwipeToPrev) {
            this.slider.swiperRef.allowSlidePrev = !lockSwipeToPrev.currentValue;
        }

        const lockSwipeToNext = changes['lockSwipeToNext'];
        if (lockSwipeToPrev) {
            this.slider.swiperRef.allowSlideNext = !lockSwipeToNext.currentValue;
        }

        const lockSwipes = changes['lockSwipes'];
        if (lockSwipes) {
            this.slider.swiperRef.allowSlideNext = !lockSwipes.currentValue;
            this.slider.swiperRef.allowSlidePrev = !lockSwipes.currentValue;
        }
    }

    ngOnDestroy() {
        if (this.currentDateChangedFromParentSubscription) {
            this.currentDateChangedFromParentSubscription.unsubscribe();
            this.currentDateChangedFromParentSubscription = undefined;
        }

        if (this.eventSourceChangedSubscription) {
            this.eventSourceChangedSubscription.unsubscribe();
            this.eventSourceChangedSubscription = undefined;
        }

        if (this.slideChangedSubscription) {
            this.slideChangedSubscription.unsubscribe();
            this.slideChangedSubscription = undefined;
        }

        if (this.slideUpdatedSubscription) {
            this.slideUpdatedSubscription.unsubscribe();
            this.slideUpdatedSubscription = undefined;
        }
    }

    onSlideChanged() {
        this.zone.run(() => {
            if (this.callbackOnInit) {
                this.callbackOnInit = false;
                return;
            }

            let direction = 0;
            const currentViewIndex = this.currentViewIndex;

            let currentSlideIndex = this.slider.swiperRef.activeIndex;
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if(isNaN(currentSlideIndex)) {
                currentSlideIndex = currentViewIndex;
            }

            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            } else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                this.slider.swiperRef.slideTo(1, 0, false);
            } else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            } else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                this.slider.swiperRef.slideTo(3, 0, false);
            }
            this.currentViewIndex = currentSlideIndex;
            this.move(direction);
        });
    }

    move(direction: number) {
        if (direction === 0) {
            return;
        }

        this.direction = direction;
        const adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacentDate);
        this.refreshView();
        this.direction = 0;
    }

    private getHourColumnLabels(): string[] {
        const hourColumnLabels: string[] = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            // handle edge case for DST
            if (hour === 0 && this.views[0].rows[hour].time.getHours() !== this.startHour) {
                const time = new Date(this.views[0].rows[hour].time);
                time.setDate(time.getDate() + 1);
                time.setHours(this.startHour);
                hourColumnLabels.push(this.formatHourColumnLabel(time));
            } else {
                hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour].time));
            }
        }
        return hourColumnLabels;
    }

    getViewData(startTime: Date): IDayView {
        return {
            rows: DayViewComponent.createDateObjects(startTime, this.startHour, this.endHour, this.hourSegments),
            allDayEvents: []
        };
    }

    getRange(currentDate: Date): IRange {
        const year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            date = currentDate.getDate(),
            startTime = new Date(year, month, date, 12, 0, 0),
            endTime = new Date(year, month, date + 1, 12, 0, 0);

        return {
            startTime,
            endTime
        };
    }

    onDataLoaded() {
        const eventSource = this.eventSource,
            len = eventSource ? eventSource.length : 0,
            startTime = this.range.startTime,
            endTime = this.range.endTime,
            utcStartTime = Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()),
            utcEndTime = Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()),
            currentViewIndex = this.currentViewIndex,
            rows = this.views[currentViewIndex].rows,
            allDayEvents: IDisplayAllDayEvent[] = this.views[currentViewIndex].allDayEvents = [],
            oneHour = 3600000,
            eps = 0.016,
            rangeStartRowIndex = this.startHour * this.hourSegments,
            rangeEndRowIndex = this.endHour * this.hourSegments;
        let normalEventInRange = false;

        for (let hour = 0; hour < this.hourRange; hour += 1) {
            rows[hour].events = [];
        }

        for (let i = 0; i < len; i += 1) {
            const event = eventSource[i];
            const eventStartTime = event.startTime;
            const eventEndTime = event.endTime;
            let eventUTCStartTime: number,
                eventUTCEndTime: number;

            if (event.allDay) {
                eventUTCStartTime = eventStartTime.getTime();
                eventUTCEndTime = eventEndTime.getTime();
            } else {
                eventUTCStartTime = Date.UTC(eventStartTime.getFullYear(), eventStartTime.getMonth(), eventStartTime.getDate());
                eventUTCEndTime = Date.UTC(eventEndTime.getFullYear(), eventEndTime.getMonth(), eventEndTime.getDate() + 1);
            }

            if (eventUTCEndTime <= utcStartTime || eventUTCStartTime >= utcEndTime || eventStartTime >= eventEndTime) {
                continue;
            }

            if (event.allDay) {
                allDayEvents.push({
                    event
                });
            } else {
                normalEventInRange = true;

                let timeDifferenceStart: number;
                if (eventUTCStartTime < utcStartTime) {
                    timeDifferenceStart = 0;
                } else {
                    timeDifferenceStart = (eventStartTime.getHours() + eventStartTime.getMinutes() / 60) * this.hourSegments;
                }

                let timeDifferenceEnd: number;
                if (eventUTCEndTime > utcEndTime) {
                    timeDifferenceEnd = (utcEndTime - utcStartTime) / oneHour * this.hourSegments;
                } else {
                    timeDifferenceEnd = (eventEndTime.getHours() + eventEndTime.getMinutes() / 60) * this.hourSegments;
                }

                let startIndex = Math.floor(timeDifferenceStart);
                let endIndex = Math.ceil(timeDifferenceEnd - eps);
                let startOffset = 0;
                let endOffset = 0;
                if (this.hourParts !== 1) {
                    if (startIndex < rangeStartRowIndex) {
                        startOffset = 0;
                    } else {
                        startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    }
                    if (endIndex > rangeEndRowIndex) {
                        endOffset = 0;
                    } else {
                        endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                    }
                }

                if (startIndex < rangeStartRowIndex) {
                    startIndex = 0;
                } else {
                    startIndex -= rangeStartRowIndex;
                }
                if (endIndex > rangeEndRowIndex) {
                    endIndex = rangeEndRowIndex;
                }
                endIndex -= rangeStartRowIndex;

                if (startIndex < endIndex) {
                    const displayEvent:IDisplayEvent = {
                        event,
                        startIndex,
                        endIndex,
                        startOffset,
                        endOffset,
                        position:0
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
        }

        if (normalEventInRange) {
            let orderedEvents: IDisplayEvent[] = [];
            for (let hour = 0; hour < this.hourRange; hour += 1) {
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
            const title = this.getTitle();
            this.onTitleChanged.emit(title);
        }

        this.calendarService.populateAdjacentViews(this);
        this.calendarService.rangeChanged(this);
    }

    getTitle(): string {
        const startingDate = new Date(this.range.startTime.getTime());
        startingDate.setHours(12, 0, 0, 0);
        return this.formatTitle(startingDate);
    }

    select(selectedTime: Date, events: IDisplayEvent[]) {
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedTime);
        }

        this.onTimeSelected.emit({
            selectedTime,
            events: events.map(e => e.event),
            disabled
        });
    }

    placeEvents(orderedEvents: IDisplayEvent[]) {
        this.calculatePosition(orderedEvents);
        DayViewComponent.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
    }

    placeAllDayEvents(orderedEvents: IDisplayEvent[]) {
        this.calculatePosition(orderedEvents);
    }

    overlap(event1: IDisplayEvent, event2: IDisplayEvent): boolean {
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

    calculatePosition(events: IDisplayEvent[]) {
        const len = events.length,
            isForbidden: boolean[] = new Array(len);
        let maxColumn = 0,
            col: number;


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

    eventSelected(event: IEvent) {
        this.onEventSelected.emit(event);
    }

    setScrollPosition(scrollPosition: number) {
        this.initScrollPosition = scrollPosition;
    }
}
