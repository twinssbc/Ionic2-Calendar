import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';

import {
    CalendarMode,
    ICalendarComponent,
    IDateFormatter,
    IDayView,
    IDayViewAllDayEventSectionTemplateContext,
    IDayViewCategoryItemTemplateContext,
    IDayViewNormalEventSectionTemplateContext,
    IDayViewRow,
    IDisplayAllDayEvent,
    IDisplayEvent,
    IEvent,
    IRange,
    ITimeSelected
} from './calendar.interface';
import { CalendarService } from './calendar.service';

@Component({
    selector: 'dayview',
    templateUrl: './dayview.html',
    styleUrls: ['./dayview.css'],
    encapsulation: ViewEncapsulation.None
})
export class DayViewComponent implements ICalendarComponent, OnInit, OnChanges, OnDestroy, AfterViewInit {
    constructor(private calendarService: CalendarService, private elm: ElementRef, private zone: NgZone) { }

    private slider!: Swiper;
    @ViewChild('dayViewSwiper') swiperElement?: ElementRef;

    @HostBinding('class.dayview') class = true;

    @Input() dayviewCategoryItemTemplate!: TemplateRef<IDayViewCategoryItemTemplateContext>;
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
    @Input() lockSwipeToPrev?: boolean = false;
    @Input() lockSwipeToNext?: boolean = false;
    @Input() lockSwipes?: boolean = false;
    @Input() startHour!: number;
    @Input() endHour!: number;
    @Input() sliderOptions?: SwiperOptions;
    @Input() hourSegments!: number;
    @Input() dayviewCategorySource?: Set<string>;
    @Input() dayviewShowCategoryView?: boolean;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>(true);

    public readonly sliderIndexList = [0, 1, 2];
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
        let time: Date, hourStep, minStep;

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
                    events: [],
                    eventsGroupByCategory: new Map()
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
            cells: { calculated: boolean; events: IDisplayEvent[] }[] = new Array(totalSize);

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
                while ((event = eventQueue.shift())) {
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
        if (this.dateFormatter && this.dateFormatter.formatDayViewTitle) {
            this.formatTitle = this.dateFormatter.formatDayViewTitle;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date: Date) {
                return datePipe.transform(date, this.formatDayTitle) || '';
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatDayViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatDayViewHourColumn;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatHourColumnLabel = function (date: Date) {
                return datePipe.transform(date, this.formatHourColumn) || '';
            };
        }

        this.refreshView();
        this.hourColumnLabels = this.getHourColumnLabels();

        this.inited = true;

        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(
            currentDate => {
                this.refreshView();
            }
        );

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
            const hourColumns = this.elm.nativeElement
                .querySelector('.dayview-normal-event-container')
                .querySelectorAll('.calendar-hour-column');
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
        if (
            (changes['startHour'] || changes['endHour']) &&
            (!changes['startHour'].isFirstChange() || !changes['endHour'].isFirstChange())
        ) {
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
            allDayEvents: [],
            categorizedAllDayEventsMap: new Map<string, IDisplayAllDayEvent[]>()
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
            allDayEvents: IDisplayAllDayEvent[] = (this.views[currentViewIndex].allDayEvents = []),
            oneHour = 3600000,
            eps = 0.016,
            rangeStartRowIndex = this.startHour * this.hourSegments,
            rangeEndRowIndex = this.endHour * this.hourSegments;
        let normalEventInRange = false;

        for (let hour = 0; hour < this.hourRange; hour += 1) {
            rows[hour].events = [];
            rows[hour].eventsGroupByCategory = undefined;
        }

        for (let i = 0; i < len; i += 1) {
            const event = eventSource[i];
            for (let occurence of this.calendarService.getEventOccurences(event, utcStartTime, utcEndTime)) {
                let eventUTCStartTime = occurence.eventUTCStartTime
                let eventUTCEndTime = occurence.eventUTCEndTime

                const eventStartTime = event.startTime;
                const eventEndTime = event.endTime;

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
                        timeDifferenceStart =
                            (eventStartTime.getHours() + eventStartTime.getMinutes() / 60) * this.hourSegments;
                    }

                    let timeDifferenceEnd: number;
                    if (eventUTCEndTime > utcEndTime) {
                        timeDifferenceEnd = ((utcEndTime - utcStartTime) / oneHour) * this.hourSegments;
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
                        const displayEvent: IDisplayEvent = {
                            event,
                            startIndex,
                            endIndex,
                            startOffset,
                            endOffset,
                            position: 0
                        };

                        let eventSet = rows[startIndex].events;
                        if (eventSet) {
                            eventSet.push(displayEvent);
                        } else {
                            eventSet = [];
                            eventSet.push(displayEvent);
                            rows[startIndex].events = eventSet;
                        }

                        // setup eventsGroupedByCategory
                        if (this.dayviewShowCategoryView && this.dayviewCategorySource && event.category) {
                            let groupedEvents = rows[startIndex].eventsGroupByCategory;
                            if (groupedEvents) {
                                if (Array.isArray(groupedEvents.get(event.category))) {
                                    groupedEvents.get(event.category)?.push(displayEvent);
                                } else {
                                    groupedEvents.set(event.category, [displayEvent]);
                                }
                            } else {
                                groupedEvents = new Map();
                                groupedEvents.set(event.category, [displayEvent]);
                                rows[startIndex].eventsGroupByCategory = groupedEvents;
                            }
                        }
                    }
                }
            }
        }

        if (normalEventInRange) {
            if (this.dayviewShowCategoryView && this.dayviewCategorySource) {
                for (const category of this.dayviewCategorySource) {
                    let displayEvents: IDisplayEvent[] = [];

                    for (let hour = 0; hour < this.hourRange; hour += 1) {
                        let groupedEvents = rows[hour].eventsGroupByCategory?.get(category);
                        if (groupedEvents) {
                            groupedEvents.sort(DayViewComponent.compareEventByStartOffset);
                            displayEvents = displayEvents.concat(groupedEvents);
                        }
                    }

                    if (displayEvents.length > 0) {
                        this.placeEvents(displayEvents);
                    }
                }
            } else {
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

        if (this.dayviewShowCategoryView && this.dayviewCategorySource) {
            this.categorizeAllDayEvents(allDayEvents);
        }
    }

    categorizeAllDayEvents(allDayEvents: IDisplayAllDayEvent[]) {
        const categoryIdAllDayEventsMap = (this.views[
            this.currentViewIndex
        ].categorizedAllDayEventsMap = new Map<string, IDisplayAllDayEvent[]>());

        for (const displayAllDayEvent of allDayEvents) {
            if (displayAllDayEvent.event.category) {
                if (categoryIdAllDayEventsMap.get(displayAllDayEvent.event.category)) {
                    categoryIdAllDayEventsMap.get(displayAllDayEvent.event.category)?.push(displayAllDayEvent);
                } else {
                    categoryIdAllDayEventsMap.set(displayAllDayEvent.event.category, [displayAllDayEvent]);
                }
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

    select(row: IDayViewRow, category?: string) {
        const selectedTime = row.time;
        let events = row.events;
        if (category) {
            events = row.eventsGroupByCategory?.get(category) || [];
        }

        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedTime);
        }

        this.onTimeSelected.emit({
            selectedTime,
            category,
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
        if (
            event1.startIndex > event2.startIndex ||
            (event1.startIndex === event2.startIndex && event1.startOffset > event2.startOffset)
        ) {
            earlyEvent = event2;
            lateEvent = event1;
        }

        if (earlyEvent.endIndex <= lateEvent.startIndex) {
            return false;
        } else {
            return !(
                earlyEvent.endIndex - lateEvent.startIndex === 1 &&
                earlyEvent.endOffset + lateEvent.startOffset >= this.hourParts
            );
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
