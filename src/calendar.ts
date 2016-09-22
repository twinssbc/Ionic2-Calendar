import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import { CalendarService } from './calendar.service';

export interface IEvent {
    allDay: boolean;
    endTime: Date;
    startTime: Date;
    title: string;
};

export interface IRange {
    startTime: Date;
    endTime: Date;
};

export interface IView {};

export interface IDayView extends IView {
    allDayEvents: IDisplayAllDayEvent[];
    rows: IDayViewRow[];
}

export interface IDayViewRow {
    events: IDisplayEvent[];
    time: Date;
}

export interface IMonthView extends IView {
    dates: IMonthViewRow[];
}

export interface IMonthViewRow {
    current?: boolean;
    date: Date;
    events: IEvent[];
    hasEvent?: boolean;
    label: string;
    secondary: boolean;
    selected?: boolean;
}

export interface IWeekView extends IView {
    dates: IWeekViewDateRow[];
    rows: IWeekViewRow[][];
}

export interface IWeekViewDateRow {
    date: Date;
    events: IDisplayEvent[];
}

export interface IWeekViewRow {
    events: IDisplayEvent[];
    time: Date;
}

export interface IDisplayEvent {
    endIndex: number;
    endOffset?: number;
    event: IEvent;
    startIndex: number;
    startOffset?: number;
    overlapNumber?: number;
    position?: number;
}

export interface IDisplayAllDayEvent {
    event: IEvent;
}

export interface ICalendarComponent {
    currentViewIndex: number;
    direction: number;
    eventSource: IEvent[];
    getRange: { (date: Date): IRange; };
    getViewData: { (date: Date): IView };
    mode: CalendarMode;
    range: IRange;
    views: IView[];
    onDataLoaded: { (): void };
    onRangeChanged: EventEmitter<IRange>;
}

export interface ITimeSelected {
    events: IEvent[];
    selectedTime: Date;
};

export type CalendarMode = 'day' | 'month' | 'week';

export type QueryMode = 'local' | 'remote';

export enum Step {
    QuarterHour = 15,
    HalfHour = 30,
    Hour = 60
};

@Component({
    selector: 'calendar',
    template: `
        <div [ngSwitch]="calendarMode">
            <monthview *ngSwitchCase="'month'"
                [formatDay]="formatDay"
                [formatDayHeader]="formatDayHeader"
                [formatMonthTitle]="formatMonthTitle"
                [startingDayMonth]="startingDayMonth"
                [showEventDetail]="showEventDetail"
                [noEventsLabel]="noEventsLabel"
                [eventSource]="eventSource"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </monthview>
            <weekview *ngSwitchCase="'week'"
                [formatWeekTitle]="formatWeekTitle"
                [formatWeekViewDayHeader]="formatWeekViewDayHeader"
                [formatHourColumn]="formatHourColumn"
                [startingDayWeek]="startingDayWeek"
                [allDayLabel]="allDayLabel"
                [hourParts]="hourParts"
                [eventSource]="eventSource"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </weekview>
            <dayview *ngSwitchCase="'day'"
                [formatDayTitle]="formatDayTitle"
                [formatHourColumn]="formatHourColumn"
                [allDayLabel]="allDayLabel"
                [hourParts]="hourParts"
                [eventSource]="eventSource"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </dayview>
        </div>
    `,
    styles: [`
        :host > div { height: 100%; }
    `],
    directives: [MonthViewComponent, WeekViewComponent, DayViewComponent],
    providers: [CalendarService]
})
export class CalendarComponent implements OnInit {
    @Input()
    get currentDate(): Date {
        return this._currentDate;
    }
    set currentDate(val: Date) {
        this._currentDate = val;
        this.calendarService.currentDate = this.currentDate;
    }

    @Input() eventSource: IEvent[] = [];
    @Input() calendarMode: CalendarMode = 'month';
    @Input() formatDay: string = 'd';
    @Input() formatDayHeader: string = 'EEE';
    @Input() formatDayTitle: string = 'MMMM dd, yyyy';
    @Input() formatWeekTitle: string = 'MMMM yyyy, Week $n';
    @Input() formatMonthTitle: string = 'MMMM yyyy';
    @Input() formatWeekViewDayHeader: string = 'EEE d';
    @Input() formatHourColumn: string = 'ha';
    @Input() showEventDetail: boolean = true;
    @Input() startingDayMonth: number = 0;
    @Input() startingDayWeek: number = 0;
    @Input() allDayLabel: string = 'all day';
    @Input() noEventsLabel: string = 'No Events';
    @Input() queryMode: QueryMode = 'local';
    @Input() step: Step = Step.Hour;

    @Output() currentDateChanged = new EventEmitter<Date>();
    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>();

    private _currentDate: Date;
    private hourParts = 1;

    constructor(private calendarService: CalendarService) {}

    ngOnInit() {
        this.hourParts = 60 / this.step;
        this.calendarService.queryMode = this.queryMode;

        this.calendarService.currentDateChanged$.subscribe(currentDate => {
            this._currentDate = currentDate;
            this.currentDateChanged.emit(currentDate);
        });
    }

    rangeChanged(range: IRange) {
        this.onRangeChanged.emit(range);
    }

    eventSelected(event: IEvent) {
        this.onEventSelected.emit(event);
    }

    timeSelected(timeSelected: ITimeSelected) {
        this.onTimeSelected.emit(timeSelected);
    }

    titleChanged(title: string) {
        this.onTitleChanged.emit(title);
    }
}
