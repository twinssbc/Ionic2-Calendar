import {
    Component,
    OnInit,
    OnChanges,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    TemplateRef,
    OnDestroy,
    AfterViewInit,
    NgZone,
    ViewChild,
    ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Swiper } from 'swiper';
import { SwiperOptions } from 'swiper/types';

import { ICalendarComponent, IEvent, IMonthView, IMonthViewRow, ITimeSelected, IRange, CalendarMode, IDateFormatter, IMonthViewDisplayEventTemplateContext, IOccurence } from './calendar.interface';
import { CalendarService } from './calendar.service';

@Component({
    selector: 'monthview',
    templateUrl: './monthview.html',
    styleUrls: ['./monthview.css'],
})
export class MonthViewComponent implements ICalendarComponent, OnInit, OnDestroy, OnChanges, AfterViewInit {

    constructor(private calendarService: CalendarService, private zone: NgZone) {
    }

    private slider!: Swiper;
    @ViewChild('monthViewSwiper') swiperElement?: ElementRef;

    @Input() monthviewDisplayEventTemplate!: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input() monthviewInactiveDisplayEventTemplate!: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input() monthviewEventDetailTemplate!: TemplateRef<IMonthViewDisplayEventTemplateContext>;

    @Input() formatDay?: string;
    @Input() formatDayHeader?: string;
    @Input() formatMonthTitle?: string;
    @Input() eventSource!: IEvent[];
    @Input() startingDayMonth!: number;
    @Input() showEventDetail?: boolean;
    @Input() noEventsLabel?: string;
    @Input() autoSelect = true;
    @Input() markDisabled?: (date: Date) => boolean;
    @Input() locale!: string;
    @Input() dateFormatter?: IDateFormatter;
    @Input() dir = '';
    @Input() lockSwipeToPrev?: boolean = false;
    @Input() lockSwipeToNext?: boolean = false;
    @Input() lockSwipes?: boolean = false;
    @Input() sliderOptions?: SwiperOptions;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>();

    public views: IMonthView[] = [];
    public currentViewIndex = 0;
    public selectedDate?: IMonthViewRow;
    public range!: IRange;
    public mode: CalendarMode = 'month';
    public direction = 0;

    private moveOnSelected = false;
    private inited = false;

    private currentDateChangedFromParentSubscription?: Subscription;
    private eventSourceChangedSubscription?: Subscription;
    private slideChangedSubscription?: Subscription;
    private slideUpdatedSubscription?: Subscription;

    private formatDayLabel!: (date: Date) => string;
    private formatDayHeaderLabel!: (date: Date) => string;
    private formatTitle!: (date: Date) => string;

    static getDates(startDate: Date, n: number): Date[] {
        const dates = new Array(n),
            current = new Date(startDate.getTime());
        let i = 0;
        while (i < n) {
            dates[i++] = new Date(current.getTime());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    ngOnInit() {
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        this.sliderOptions.allowSlidePrev = !this.lockSwipeToPrev;
        this.sliderOptions.allowSlideNext = !this.lockSwipeToNext;
        this.sliderOptions.allowTouchMove = !this.lockSwipes;

        if (this.dateFormatter && this.dateFormatter.formatMonthViewDay) {
            this.formatDayLabel = this.dateFormatter.formatMonthViewDay;
        } else {
            const dayLabelDatePipe = new DatePipe('en-US');
            this.formatDayLabel = function (date: Date) {
                return dayLabelDatePipe.transform(date, this.formatDay) || '';
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatMonthViewDayHeader) {
            this.formatDayHeaderLabel = this.dateFormatter.formatMonthViewDayHeader;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatDayHeaderLabel = function (date: Date) {
                return datePipe.transform(date, this.formatDayHeader) || '';
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatMonthViewTitle) {
            this.formatTitle = this.dateFormatter.formatMonthViewTitle;
        } else {
            const datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date: Date) {
                return datePipe.transform(date, this.formatMonthTitle) || '';
            };
        }

        this.refreshView();
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

    ngOnChanges(changes: SimpleChanges) {
        if (!this.inited) {
            return;
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
        if (lockSwipeToNext) {
            this.slider.allowSlideNext = !lockSwipeToNext.currentValue;
        }

        const lockSwipes = changes['lockSwipes'];
        if (lockSwipes) {
            this.slider.allowTouchMove = !lockSwipes.currentValue;
        }
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

        if (this.dir == 'rtl') {
            this.slider.changeLanguageDirection('rtl');
        }

        const title = this.getTitle();
        this.onTitleChanged.emit(title);
    }

    setSwiperInstance(swiper: any) {
        this.slider = swiper;
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
        if (!this.moveOnSelected) {
            const adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
            this.calendarService.setCurrentDate(adjacentDate);
        }
        this.refreshView();
        this.direction = 0;
        this.moveOnSelected = false;
    }

    createDateObject(date: Date): IMonthViewRow {
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(date);
        }

        return {
            date,
            events: [],
            label: this.formatDayLabel(date),
            secondary: false,
            disabled
        };
    }

    getViewData(startTime: Date): IMonthView {
        const startDate = startTime,
            date = startDate.getDate(),
            month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;

        const dates = MonthViewComponent.getDates(startDate, 42);
        const days: IMonthViewRow[] = [];
        for (let i = 0; i < 42; i++) {
            const dateObject = this.createDateObject(dates[i]);
            dateObject.secondary = dates[i].getMonth() !== month;
            days[i] = dateObject;
        }

        const dayHeaders: string[] = [];
        for (let i = 0; i < 7; i++) {
            dayHeaders.push(this.formatDayHeaderLabel(days[i].date));
        }
        return {
            dates: days,
            dayHeaders
        };
    }

    getHighlightClass(date: IMonthViewRow): string {
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

    getRange(currentDate: Date): IRange {
        const year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            firstDayOfMonth = new Date(year, month, 1, 12, 0, 0), // set hour to 12 to avoid DST problem

            difference = this.startingDayMonth - firstDayOfMonth.getDay(),
            numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
            startDate = new Date(firstDayOfMonth.getTime());

        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }

        const endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);

        return {
            startTime: startDate,
            endTime: endDate
        };
    }

    onDataLoaded() {
        const range = this.range,
            eventSource = this.eventSource,
            len = eventSource ? eventSource.length : 0,
            startTime = range.startTime,
            endTime = range.endTime,
            utcStartTime = Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()),
            utcEndTime = Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()),
            currentViewIndex = this.currentViewIndex,
            dates = this.views[currentViewIndex].dates,
            oneDay = 86400000,
            eps = 0.0006;

        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }

        for (let i = 0; i < len; i += 1) {
            const event = eventSource[i]
            for (let occurence of this.calendarService.getEventOccurences(event, utcStartTime, utcEndTime)) {
                let eventUTCStartTime = occurence.eventUTCStartTime
                let eventUTCEndTime = occurence.eventUTCEndTime

                let timeDifferenceStart: number,
                    timeDifferenceEnd: number;

                if (eventUTCStartTime < utcStartTime) {
                    timeDifferenceStart = 0;
                } else {
                    timeDifferenceStart = (eventUTCStartTime - utcStartTime) / oneDay;
                }

                if (eventUTCEndTime > utcEndTime) {
                    timeDifferenceEnd = (utcEndTime - utcStartTime) / oneDay;
                } else {
                    timeDifferenceEnd = (eventUTCEndTime - utcStartTime) / oneDay;
                }

                let index = Math.floor(timeDifferenceStart);
                const endIndex = Math.ceil(timeDifferenceEnd - eps);
                while (index < endIndex) {
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
        }

        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }

        if (this.autoSelect) {
            let findSelected = false;
            for (let r = 0; r < 42; r += 1) {
                if (dates[r].selected) {
                    this.selectedDate = dates[r];
                    findSelected = true;
                    break;
                }
            }

            if (findSelected && this.selectedDate) {
                this.onTimeSelected.emit({
                    selectedTime: this.selectedDate.date,
                    events: this.selectedDate.events,
                    disabled: this.selectedDate.disabled
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
        const currentViewStartDate = this.range.startTime,
            date = currentViewStartDate.getDate(),
            month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12,
            year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0),
            headerDate = new Date(year, month, 1, 12, 0, 0, 0);
        return this.formatTitle(headerDate);
    }

    private compareEvent(event1: IEvent, event2: IEvent): number {
        if (event1.allDay) {
            return 1;
        } else if (event2.allDay) {
            return -1;
        } else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    }

    select(viewDate: IMonthViewRow) {
        if (!this.views) {
            return;
        }

        const selectedDate = viewDate.date,
            events = viewDate.events;

        if (!viewDate.disabled) {
            const dates = this.views[this.currentViewIndex].dates,
                currentCalendarDate = this.calendarService.currentDate,
                currentMonth = currentCalendarDate.getMonth(),
                currentYear = currentCalendarDate.getFullYear(),
                selectedMonth = selectedDate.getMonth(),
                selectedYear = selectedDate.getFullYear();
            let direction = 0;

            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            } else {
                direction = currentYear < selectedYear ? 1 : -1;
            }

            this.calendarService.setCurrentDate(selectedDate);
            if (direction === 0) {
                const currentViewStartDate = this.range.startTime,
                    oneDay = 86400000,
                    selectedDayDifference = Math.round((Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);

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

        this.onTimeSelected.emit({ selectedTime: selectedDate, events, disabled: viewDate.disabled });
    }

    slideView(direction: number) {
        if (direction === 1) {
            this.slider.slideNext();
        } else if (direction === -1) {
            this.slider.slidePrev();
        }
    }

    updateCurrentView(currentViewStartDate: Date, view: IMonthView) {
        const currentCalendarDate = this.calendarService.currentDate,
            today = new Date(),
            oneDay = 86400000,
            selectedDayDifference = Math.round((Date.UTC(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), currentCalendarDate.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay),
            currentDayDifference = Math.round((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(currentViewStartDate.getFullYear(), currentViewStartDate.getMonth(), currentViewStartDate.getDate())) / oneDay);

        for (let r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }

        if (selectedDayDifference >= 0 && selectedDayDifference < 42 && !view.dates[selectedDayDifference].disabled && (this.autoSelect || this.moveOnSelected)) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        } else {
            this.selectedDate = undefined;
        }

        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    }

    eventSelected(event: IEvent) {
        this.onEventSelected.emit(event);
    }
}
