import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    Inject,
    LOCALE_ID,
    NgZone,
} from "@angular/core";
import { Subscription } from "rxjs";
import { CalendarService } from "./calendar.service";
import SwiperCore from "swiper";
import { IonicSlides } from "@ionic/angular";
import {
    IEvent,
    CalendarMode,
    QueryMode,
    Step,
    IMonthViewDisplayEventTemplateContext,
    IMonthViewEventDetailTemplateContext,
    IDisplayWeekViewHeader,
    IDisplayAllDayEvent,
    IDisplayEvent,
    IWeekViewAllDayEventSectionTemplateContext,
    IDayViewAllDayEventSectionTemplateContext,
    IWeekViewNormalEventSectionTemplateContext,
    IDayViewNormalEventSectionTemplateContext,
    IDateFormatter,
    IRange,
    ITimeSelected,
} from "./calendar.interface";

SwiperCore.use([IonicSlides]);

@Component({
    selector: "calendar",
    templateUrl: "./calendar.html",
    styleUrls: ["./calendar.css"],
    providers: [CalendarService],
})
export class CalendarComponent implements OnInit {
    @Input()
    get currentDate(): Date {
        return this._currentDate;
    }

    set currentDate(val: Date) {
        if (!val) {
            val = new Date();
        }

        this._currentDate = val;
        this.calendarService.setCurrentDate(val, true);
        this.onCurrentDateChanged.emit(this._currentDate);
    }

    @Input() eventSource: IEvent[] = [];
    @Input() calendarMode: CalendarMode = "month";
    @Input() formatDay: string = "d";
    @Input() formatDayHeader: string = "EEE";
    @Input() formatDayTitle: string = "MMMM dd, yyyy";
    @Input() formatWeekTitle: string = "MMMM yyyy, 'Week' w";
    @Input() formatMonthTitle: string = "MMMM yyyy";
    @Input() formatWeekViewDayHeader: string = "EEE d";
    @Input() formatHourColumn: string = "ha";
    @Input() showEventDetail: boolean = true;
    @Input() startingDayMonth: number = 0;
    @Input() startingDayWeek: number = 0;
    @Input() allDayLabel: string = "all day";
    @Input() noEventsLabel: string = "No Events";
    @Input() queryMode: QueryMode = "local";
    @Input() step: Step = Step.Hour;
    @Input() timeInterval: number = 60;
    @Input() autoSelect: boolean = true;
    @Input() markDisabled?: (date: Date) => boolean;
    @Input()
    monthviewDisplayEventTemplate?: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input()
    monthviewInactiveDisplayEventTemplate?: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input()
    monthviewEventDetailTemplate?: TemplateRef<IMonthViewEventDetailTemplateContext>;
    @Input() weekviewHeaderTemplate?: TemplateRef<IDisplayWeekViewHeader>;
    @Input() weekviewAllDayEventTemplate?: TemplateRef<IDisplayAllDayEvent>;
    @Input() weekviewNormalEventTemplate?: TemplateRef<IDisplayEvent>;
    @Input() dayviewAllDayEventTemplate?: TemplateRef<IDisplayAllDayEvent>;
    @Input() dayviewNormalEventTemplate?: TemplateRef<IDisplayEvent>;
    @Input()
    weekviewAllDayEventSectionTemplate?: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    @Input()
    weekviewNormalEventSectionTemplate?: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    @Input()
    dayviewAllDayEventSectionTemplate?: TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    @Input()
    dayviewNormalEventSectionTemplate?: TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    @Input()
    weekviewInactiveAllDayEventSectionTemplate?: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    @Input()
    weekviewInactiveNormalEventSectionTemplate?: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    @Input()
    dayviewInactiveAllDayEventSectionTemplate?: TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    @Input()
    dayviewInactiveNormalEventSectionTemplate?: TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    @Input() dateFormatter?: IDateFormatter;
    @Input() dir: string = "";
    @Input() scrollToHour: number = 0;
    @Input() preserveScrollPosition: boolean = false;
    @Input() lockSwipeToPrev: boolean = false;
    @Input() lockSwipeToNext: boolean = false;
    @Input() lockSwipes: boolean = false;
    @Input() locale: string = "";
    @Input() startHour: number = 0;
    @Input() endHour: number = 24;
    @Input() sliderOptions: any;

    @Output() onCurrentDateChanged = new EventEmitter<Date>();
    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onDayHeaderSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>(true);

    private _currentDate: Date = new Date();
    public hourParts = 1;
    public hourSegments = 1;
    private currentDateChangedFromChildrenSubscription?: Subscription;

    constructor(
        private calendarService: CalendarService,
        @Inject(LOCALE_ID) private appLocale: string,
        private ngZone: NgZone
    ) {
        this.locale = appLocale;
    }

    ngOnInit(): void {
        if (this.autoSelect) {
            if (this.autoSelect.toString() === "false") {
                this.autoSelect = false;
            } else {
                this.autoSelect = true;
            }
        }
        this.hourSegments = 60 / this.timeInterval;
        this.hourParts = 60 / this.step;
        if (this.hourParts <= this.hourSegments) {
            this.hourParts = 1;
        } else {
            this.hourParts = this.hourParts / this.hourSegments;
        }
        this.startHour = parseInt(this.startHour.toString());
        this.endHour = parseInt(this.endHour.toString());
        this.calendarService.queryMode = this.queryMode;

        this.currentDateChangedFromChildrenSubscription =
            this.calendarService.currentDateChangedFromChildren$.subscribe(
                (currentDate: Date) => {
                    this._currentDate = currentDate;
                    this.onCurrentDateChanged.emit(currentDate);
                }
            );
    }

    ngOnDestroy(): void {
        if (this.currentDateChangedFromChildrenSubscription) {
            this.currentDateChangedFromChildrenSubscription.unsubscribe();
            this.currentDateChangedFromChildrenSubscription = undefined;
        }
    }

    public rangeChanged(range: IRange): void {
        this.onRangeChanged.emit(range);
    }

    public eventSelected(event: IEvent): void {
        this.onEventSelected.emit(event);
    }

    public timeSelected(timeSelected: ITimeSelected): void {
        this.onTimeSelected.emit(timeSelected);
    }

    public daySelected(daySelected: ITimeSelected): void {
        this.onDayHeaderSelected.emit(daySelected);
    }

    public titleChanged(title: string): void {
        this.onTitleChanged.emit(title);
    }

    public loadEvents(): void {
        this.calendarService.loadEvents();
    }

    public slideNext(): void {
        this.calendarService.slide(1);
    }

    public slidePrev(): void {
        this.calendarService.slide(-1);
    }

    public update(): void {
        this.calendarService.update();
    }
}
