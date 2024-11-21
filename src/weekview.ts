import { DatePipe } from '@angular/common';
import {
    Component,
    OnInit,
    OnChanges,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    ViewEncapsulation,
    TemplateRef,
    ElementRef,
    OnDestroy,
    AfterViewInit,
    NgZone,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';

import type {
    ICalendarComponent,
    IDisplayEvent,
    IEvent,
    ITimeSelected,
    IRange,
    IWeekView,
    IWeekViewRow,
    IWeekViewDateRow,
    CalendarMode,
    IDateFormatter,
    IDisplayWeekViewHeader,
    IDisplayAllDayEvent,
    IWeekViewAllDayEventSectionTemplateContext,
    IWeekViewNormalEventSectionTemplateContext
} from './calendar.interface';
import { CalendarService } from './calendar.service';

@Component({
    selector: 'weekview',
    templateUrl: './weekview.html',
    styleUrls: ['./weekview.css'],
    encapsulation: ViewEncapsulation.None
})
export class WeekViewComponent implements ICalendarComponent, OnInit, OnChanges, OnDestroy, AfterViewInit {

    constructor(private calendarService: CalendarService, private elm: ElementRef, private zone: NgZone) {
    }

    private slider!: Swiper;
    @ViewChild('weekViewSwiper') swiperElement?: ElementRef;

    @HostBinding('class.weekview') class = true;

    @Input() weekviewHeaderTemplate!: TemplateRef<IDisplayWeekViewHeader>;
    @Input() weekviewAllDayEventTemplate!: TemplateRef<IDisplayAllDayEvent>;
    @Input() weekviewNormalEventTemplate!: TemplateRef<IDisplayEvent>;
    @Input() weekviewAllDayEventSectionTemplate!: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    @Input() weekviewNormalEventSectionTemplate!: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    @Input() weekviewInactiveAllDayEventSectionTemplate!: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    @Input() weekviewInactiveNormalEventSectionTemplate!: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;

    @Input() formatWeekTitle?: string;
    @Input() formatWeekViewDayHeader?: string;
    @Input() formatHourColumn?: string;
    @Input() startingDayWeek!: number;
    @Input() allDayLabel?: string;
    @Input() hourParts!: number;
    @Input() eventSource!: IEvent[];
    @Input() autoSelect = true;
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
    @Input() sliderOptions?: SwiperOptions;
    @Input() hourSegments!: number;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onDayHeaderSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>();

    public readonly sliderIndexList = [0, 1, 2];
    public views: IWeekView[] = [];
    public currentViewIndex = 0;
    public range!: IRange;
    public direction = 0;
    public mode: CalendarMode = 'week';

    private inited = false;
    private currentDateChangedFromParentSubscription?: Subscription;
    private eventSourceChangedSubscription?: Subscription;
    private slideChangedSubscription?: Subscription;
    private slideUpdatedSubscription?: Subscription;

    public hourColumnLabels!: string[];
    public initScrollPosition!: number;
    private formatDayHeader!: (date: Date) => string;
    private formatTitle!: (date: Date) => string;
    private formatHourColumnLabel!: (date: Date) => string;
    private hourRange!: number;

    static createDateObjects(startTime: Date, startHour: number, endHour: number, timeInterval: number): IWeekViewRow[][] {
        const times: IWeekViewRow[][] = [],
            currentHour = 0,
            currentDate = startTime.getDate();
        let hourStep,
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
                const row: IWeekViewRow[] = [];
                for (let day = 0; day < 7; day += 1) {
                    const time = new Date(startTime.getTime());
                    time.setHours(currentHour + hour, interval);
                    time.setDate(currentDate + day);
                    row.push({
                        events: [],
                        time
                    });
                }
                times.push(row);
            }
        }
        return times;
    }

    static getDates(startTime: Date, n: number): IWeekViewDateRow[] {
        const dates = new Array(n),
            current = new Date(startTime.getTime());
        let i = 0;
        while (i < n) {
            dates[i++] = {
                date: new Date(current.getTime()),
                events: [],
                dayHeader: ''
            };
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    private static compareEventByStartOffset(eventA: IDisplayEvent, eventB: IDisplayEvent): number {
        return eventA.startOffset - eventB.startOffset;
    }

    private static calculateWidth(orderedEvents: IDisplayEvent[], size: number, hourParts: number) {
        const totalSize = size * hourParts,
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
            let event: IDisplayEvent | undefined = orderedEvents[i];
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
        this.sliderOptions.allowSlidePrev = !this.lockSwipeToPrev;
        this.sliderOptions.allowSlideNext = !this.lockSwipeToNext;
        this.sliderOptions.allowTouchMove = !this.lockSwipes;

        this.hourRange = (this.endHour - this.startHour) * this.hourSegments;
        if (this.dateFormatter && this.dateFormatter.formatWeekViewDayHeader) {
            this.formatDayHeader = this.dateFormatter.formatWeekViewDayHeader;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatDayHeader = function (date: Date) {
                return datePipe.transform(date, this.formatWeekViewDayHeader) || '';
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatWeekViewTitle) {
            this.formatTitle = this.dateFormatter.formatWeekViewTitle;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date: Date) {
                return datePipe.transform(date, this.formatWeekTitle) || '';
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatWeekViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatWeekViewHourColumn;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatHourColumnLabel = function (date: Date) {
                return datePipe.transform(date, this.formatHourColumn) || '';
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
                this.slider.slideNext();
            } else if (direction === -1) {
                this.slider.slidePrev();
            }
        });

        this.slideUpdatedSubscription = this.calendarService.slideUpdated$.subscribe(() => {
            this.slider.update();
        });
    }

    ngAfterViewInit() {
        this.slider = new Swiper(this.swiperElement?.nativeElement, this.sliderOptions);
        let me = this;
        this.slider.on('slideNextTransitionEnd', function () {
            me.onSlideChanged(1);
        });

        this.slider.on('slidePrevTransitionEnd', function () {
            me.onSlideChanged(-1);
        });

        if (this.dir === 'rtl') {
            this.slider.changeLanguageDirection('rtl');
        }

        const title = this.getTitle();
        this.onTitleChanged.emit(title);

        if (this.scrollToHour > 0) {
            const hourColumns = this.elm.nativeElement.querySelector('.weekview-normal-event-container').querySelectorAll('.calendar-hour-column');
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
            this.slider.allowSlidePrev = !lockSwipeToPrev.currentValue;
        }

        const lockSwipeToNext = changes['lockSwipeToNext'];
        if (lockSwipeToPrev) {
            this.slider.allowSlideNext = !lockSwipeToNext.currentValue;
        }

        const lockSwipes = changes['lockSwipes'];
        if (lockSwipes) {
            this.slider.allowTouchMove = !lockSwipes.currentValue;
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

    onSlideChanged(direction: number) {
        this.currentViewIndex = (this.currentViewIndex + direction + 3) % 3;
        this.move(direction);
    }

    move(direction: number) {
        if (direction === 0) {
            return;
        }
        this.direction = direction;
        const adjacent = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacent);
        this.refreshView();
        this.direction = 0;
    }

    private getHourColumnLabels(): string[] {
        const hourColumnLabels: string[] = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            // handle edge case for DST
            if (hour === 0 && this.views[0].rows[hour][0].time.getHours() !== this.startHour) {
                const time = new Date(this.views[0].rows[hour][0].time);
                time.setDate(time.getDate() + 1);
                time.setHours(this.startHour);
                hourColumnLabels.push(this.formatHourColumnLabel(time));
            } else {
                hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour][0].time));
            }
        }
        return hourColumnLabels;
    }

    getViewData(startTime: Date): IWeekView {
        const dates = WeekViewComponent.getDates(startTime, 7);
        for (let i = 0; i < 7; i++) {
            dates[i].dayHeader = this.formatDayHeader(dates[i].date);
        }

        return {
            rows: WeekViewComponent.createDateObjects(startTime, this.startHour, this.endHour, this.hourSegments),
            dates
        };
    }

    getRange(currentDate: Date): IRange {
        const year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            date = currentDate.getDate(),
            day = currentDate.getDay();
        let difference = day - this.startingDayWeek;

        if (difference < 0) {
            difference += 7;
        }

        // set hour to 12 to avoid DST problem
        const firstDayOfWeek = new Date(year, month, date - difference, 12, 0, 0),
            endTime = new Date(year, month, date - difference + 7, 12, 0, 0);

        return {
            startTime: firstDayOfWeek,
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
            dates = this.views[currentViewIndex].dates,
            oneHour = 3600000,
            oneDay = 86400000,
            // add allday eps
            eps = 0.016,
            rangeStartRowIndex = this.startHour * this.hourSegments,
            rangeEndRowIndex = this.endHour * this.hourSegments,
            allRows = 24 * this.hourSegments;
        let allDayEventInRange = false,
            normalEventInRange = false;

        for (let i = 0; i < 7; i += 1) {
            dates[i].events = [];
            dates[i].hasEvent = false;
        }

        for (let day = 0; day < 7; day += 1) {
            for (let hour = 0; hour < this.hourRange; hour += 1) {
                rows[hour][day].events = [];
            }
        }
        for (let i = 0; i < len; i += 1) {
            const event = eventSource[i];
            for (let occurence of this.calendarService.getEventOccurences(event, utcStartTime, utcEndTime)) {
                let eventUTCStartTime = occurence.eventUTCStartTime
                let eventUTCEndTime = occurence.eventUTCEndTime

                if (event.allDay) {
                    allDayEventInRange = true;

                    let allDayStartIndex: number;
                    if (eventUTCStartTime <= utcStartTime) {
                        allDayStartIndex = 0;
                    } else {
                        allDayStartIndex = Math.round((eventUTCStartTime - utcStartTime) / oneDay);
                    }

                    let allDayEndIndex: number;
                    if (eventUTCEndTime >= utcEndTime) {
                        allDayEndIndex = Math.round((utcEndTime - utcStartTime) / oneDay);
                    } else {
                        allDayEndIndex = Math.round((eventUTCEndTime - utcStartTime) / oneDay);
                    }

                    const displayAllDayEvent: IDisplayEvent = {
                        event,
                        startIndex: allDayStartIndex,
                        endIndex: allDayEndIndex,
                        startOffset: 0,
                        endOffset: 0,
                        position: 0
                    };

                    let eventSet = dates[allDayStartIndex].events;
                    if (eventSet) {
                        eventSet.push(displayAllDayEvent);
                    } else {
                        eventSet = [];
                        eventSet.push(displayAllDayEvent);
                        dates[allDayStartIndex].events = eventSet;
                    }
                    dates[allDayStartIndex].hasEvent = true;
                } else {
                    normalEventInRange = true;

                    let timeDifferenceStart: number;
                    if (eventUTCStartTime < utcStartTime) {
                        timeDifferenceStart = 0;
                    } else {
                        timeDifferenceStart = (eventUTCStartTime - utcStartTime) / oneHour * this.hourSegments + (event.startTime.getHours() + event.startTime.getMinutes() / 60) * this.hourSegments;
                    }

                    let timeDifferenceEnd: number;
                    if (eventUTCEndTime > utcEndTime) {
                        timeDifferenceEnd = (utcEndTime - utcStartTime) / oneHour * this.hourSegments;
                    } else {
                        timeDifferenceEnd = (eventUTCEndTime - oneDay - utcStartTime) / oneHour * this.hourSegments + (event.endTime.getHours() + event.endTime.getMinutes() / 60) * this.hourSegments;
                    }

                    const startIndex = Math.floor(timeDifferenceStart),
                        endIndex = Math.ceil(timeDifferenceEnd - eps);
                    let startRowIndex = startIndex % allRows,
                        dayIndex = Math.floor(startIndex / allRows),
                        endOfDay = dayIndex * allRows,
                        startOffset = 0,
                        endOffset = 0;

                    if (this.hourParts !== 1) {
                        if (startRowIndex < rangeStartRowIndex) {
                            startOffset = 0;
                        } else {
                            startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                        }
                    }

                    do {
                        endOfDay += allRows;
                        let endRowIndex: number;
                        if (endOfDay < endIndex) {
                            endRowIndex = allRows;
                        } else {
                            if (endOfDay === endIndex) {
                                endRowIndex = allRows;
                            } else {
                                endRowIndex = endIndex % allRows;
                            }
                            if (this.hourParts !== 1) {
                                if (endRowIndex > rangeEndRowIndex) {
                                    endOffset = 0;
                                } else {
                                    endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                                }
                            }
                        }
                        if (startRowIndex < rangeStartRowIndex) {
                            startRowIndex = 0;
                        } else {
                            startRowIndex -= rangeStartRowIndex;
                        }
                        if (endRowIndex > rangeEndRowIndex) {
                            endRowIndex = rangeEndRowIndex;
                        }
                        endRowIndex -= rangeStartRowIndex;

                        if (startRowIndex < endRowIndex) {
                            const displayEvent = {
                                event,
                                startIndex: startRowIndex,
                                endIndex: endRowIndex,
                                startOffset,
                                endOffset,
                                position: 0
                            };
                            let eventSet = rows[startRowIndex][dayIndex].events;
                            if (eventSet) {
                                eventSet.push(displayEvent);
                            } else {
                                eventSet = [];
                                eventSet.push(displayEvent);
                                rows[startRowIndex][dayIndex].events = eventSet;
                            }
                            dates[dayIndex].hasEvent = true;
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
                let orderedEvents: IDisplayEvent[] = [];
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
            let orderedAllDayEvents: IDisplayEvent[] = [];
            for (let day = 0; day < 7; day += 1) {
                if (dates[day].events) {
                    orderedAllDayEvents = orderedAllDayEvents.concat(dates[day].events);
                }
            }
            if (orderedAllDayEvents.length > 0) {
                this.placeAllDayEvents(orderedAllDayEvents);
            }
        }

        if (this.autoSelect) {
            let selectedDate;
            for (let r = 0; r < 7; r += 1) {
                if (dates[r].selected) {
                    selectedDate = dates[r];
                    break;
                }
            }

            if (selectedDate) {
                let disabled = false;
                if (this.markDisabled) {
                    disabled = this.markDisabled(selectedDate.date);
                }

                this.onTimeSelected.emit({
                    selectedTime: selectedDate.date,
                    events: selectedDate.events.map(e => e.event),
                    disabled
                });
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
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    }

    getTitle(): string {
        const firstDayOfWeek = new Date(this.range.startTime.getTime());
        firstDayOfWeek.setHours(12, 0, 0, 0);
        return this.formatTitle(firstDayOfWeek);
    }

    getHighlightClass(date: IWeekViewDateRow): string {
        let className = '';

        if (date.hasEvent) {
            if (className) {
                className += ' ';
            }
            className = 'weekview-with-event';
        }

        if (date.selected) {
            if (className) {
                className += ' ';
            }
            className += 'weekview-selected';
        }

        if (date.current) {
            if (className) {
                className += ' ';
            }
            className += 'weekview-current';
        }

        return className;
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
        WeekViewComponent.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
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
            isForbidden = new Array(len);
        let maxColumn = 0;

        for (let i = 0; i < len; i += 1) {
            let col: number;
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

    updateCurrentView(currentViewStartDate: Date, view: IWeekView) {
        const currentCalendarDate = this.calendarService.currentDate,
            today = new Date(),
            oneDay = 86400000,
            selectedDayDifference = Math.round((Date.UTC(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), currentCalendarDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay),
            currentDayDifference = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);

        for (let r = 0; r < 7; r += 1) {
            view.dates[r].selected = false;
        }

        if (selectedDayDifference >= 0 && selectedDayDifference < 7 && this.autoSelect) {
            view.dates[selectedDayDifference].selected = true;
        }

        if (currentDayDifference >= 0 && currentDayDifference < 7) {
            view.dates[currentDayDifference].current = true;
        }
    }

    daySelected(viewDate: IWeekViewDateRow) {
        const selectedDate = viewDate.date,
            dates = this.views[this.currentViewIndex].dates,
            currentViewStartDate = this.range.startTime,
            oneDay = 86400000,
            selectedDayDifference = Math.round((Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);

        this.calendarService.setCurrentDate(selectedDate);

        for (let r = 0; r < 7; r += 1) {
            dates[r].selected = false;
        }

        if (selectedDayDifference >= 0 && selectedDayDifference < 7) {
            dates[selectedDayDifference].selected = true;
        }

        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedDate);
        }

        this.onDayHeaderSelected.emit({ selectedTime: selectedDate, events: viewDate.events.map(e => e.event), disabled });
    }

    setScrollPosition(scrollPosition: number) {
        this.initScrollPosition = scrollPosition;
    }
}
