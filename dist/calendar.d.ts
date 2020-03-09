import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { CalendarService } from './calendar.service';
import * as i0 from "@angular/core";
export interface IEvent {
    allDay: boolean;
    endTime: Date;
    startTime: Date;
    title: string;
}
export interface IRange {
    startTime: Date;
    endTime: Date;
}
export interface IView {
}
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
    dayHeaders: string[];
}
export interface IMonthViewRow {
    current?: boolean;
    date: Date;
    events: IEvent[];
    hasEvent?: boolean;
    label: string;
    secondary: boolean;
    selected?: boolean;
    disabled: boolean;
}
export interface IWeekView extends IView {
    dates: IWeekViewDateRow[];
    rows: IWeekViewRow[][];
}
export interface IWeekViewDateRow {
    current?: boolean;
    date: Date;
    events: IDisplayEvent[];
    hasEvent?: boolean;
    selected?: boolean;
    dayHeader: string;
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
export interface IDisplayWeekViewHeader {
    viewDate: IWeekViewDateRow;
}
export interface IDisplayAllDayEvent {
    event: IEvent;
}
export interface ICalendarComponent {
    currentViewIndex: number;
    direction: number;
    eventSource: IEvent[];
    getRange: {
        (date: Date): IRange;
    };
    getViewData: {
        (date: Date): IView;
    };
    mode: CalendarMode;
    range: IRange;
    views: IView[];
    onDataLoaded: {
        (): void;
    };
    onRangeChanged: EventEmitter<IRange>;
}
export interface ITimeSelected {
    events: IEvent[];
    selectedTime: Date;
    disabled: boolean;
}
export interface IMonthViewDisplayEventTemplateContext {
    view: IView;
    row: number;
    col: number;
}
export interface IMonthViewEventDetailTemplateContext {
    selectedDate: ITimeSelected;
    noEventsLabel: string;
}
export interface IWeekViewAllDayEventSectionTemplateContext {
    day: IWeekViewDateRow;
    eventTemplate: TemplateRef<IDisplayAllDayEvent>;
}
export interface IWeekViewNormalEventSectionTemplateContext {
    tm: IWeekViewRow;
    eventTemplate: TemplateRef<IDisplayEvent>;
}
export interface IDayViewAllDayEventSectionTemplateContext {
    alldayEvents: IDisplayAllDayEvent[];
    eventTemplate: TemplateRef<IDisplayAllDayEvent>;
}
export interface IDayViewNormalEventSectionTemplateContext {
    tm: IDayViewRow;
    eventTemplate: TemplateRef<IDisplayEvent>;
}
export interface IDateFormatter {
    formatMonthViewDay?: {
        (date: Date): string;
    };
    formatMonthViewDayHeader?: {
        (date: Date): string;
    };
    formatMonthViewTitle?: {
        (date: Date): string;
    };
    formatWeekViewDayHeader?: {
        (date: Date): string;
    };
    formatWeekViewTitle?: {
        (date: Date): string;
    };
    formatWeekViewHourColumn?: {
        (date: Date): string;
    };
    formatDayViewTitle?: {
        (date: Date): string;
    };
    formatDayViewHourColumn?: {
        (date: Date): string;
    };
}
export declare type CalendarMode = 'day' | 'month' | 'week';
export declare type QueryMode = 'local' | 'remote';
export declare enum Step {
    QuarterHour = 15,
    HalfHour = 30,
    Hour = 60
}
export declare class CalendarComponent implements OnInit {
    private calendarService;
    private appLocale;
    get currentDate(): Date;
    set currentDate(val: Date);
    eventSource: IEvent[];
    calendarMode: CalendarMode;
    formatDay: string;
    formatDayHeader: string;
    formatDayTitle: string;
    formatWeekTitle: string;
    formatMonthTitle: string;
    formatWeekViewDayHeader: string;
    formatHourColumn: string;
    showEventDetail: boolean;
    startingDayMonth: number;
    startingDayWeek: number;
    allDayLabel: string;
    noEventsLabel: string;
    queryMode: QueryMode;
    step: Step;
    timeInterval: number;
    autoSelect: boolean;
    markDisabled: (date: Date) => boolean;
    monthviewDisplayEventTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    monthviewInactiveDisplayEventTemplate: TemplateRef<IMonthViewDisplayEventTemplateContext>;
    monthviewEventDetailTemplate: TemplateRef<IMonthViewEventDetailTemplateContext>;
    weekviewHeaderTemplate: TemplateRef<IDisplayWeekViewHeader>;
    weekviewAllDayEventTemplate: TemplateRef<IDisplayAllDayEvent>;
    weekviewNormalEventTemplate: TemplateRef<IDisplayEvent>;
    dayviewAllDayEventTemplate: TemplateRef<IDisplayAllDayEvent>;
    dayviewNormalEventTemplate: TemplateRef<IDisplayEvent>;
    weekviewAllDayEventSectionTemplate: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    weekviewNormalEventSectionTemplate: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    dayviewAllDayEventSectionTemplate: TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    dayviewNormalEventSectionTemplate: TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    weekviewInactiveAllDayEventSectionTemplate: TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    weekviewInactiveNormalEventSectionTemplate: TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    dayviewInactiveAllDayEventSectionTemplate: TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    dayviewInactiveNormalEventSectionTemplate: TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    dateFormatter: IDateFormatter;
    dir: string;
    scrollToHour: number;
    preserveScrollPosition: boolean;
    lockSwipeToPrev: boolean;
    lockSwipes: boolean;
    locale: string;
    startHour: number;
    endHour: number;
    sliderOptions: any;
    onCurrentDateChanged: EventEmitter<Date>;
    onRangeChanged: EventEmitter<IRange>;
    onEventSelected: EventEmitter<IEvent>;
    onTimeSelected: EventEmitter<ITimeSelected>;
    onTitleChanged: EventEmitter<string>;
    private _currentDate;
    hourParts: number;
    hourSegments: number;
    private currentDateChangedFromChildrenSubscription;
    constructor(calendarService: CalendarService, appLocale: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    rangeChanged(range: IRange): void;
    eventSelected(event: IEvent): void;
    timeSelected(timeSelected: ITimeSelected): void;
    titleChanged(title: string): void;
    loadEvents(): void;
    slideNext(): void;
    slidePrev(): void;
    static ɵfac: i0.ɵɵFactoryDef<CalendarComponent>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<CalendarComponent, "calendar", never, { "currentDate": "currentDate"; "eventSource": "eventSource"; "calendarMode": "calendarMode"; "formatDay": "formatDay"; "formatDayHeader": "formatDayHeader"; "formatDayTitle": "formatDayTitle"; "formatWeekTitle": "formatWeekTitle"; "formatMonthTitle": "formatMonthTitle"; "formatWeekViewDayHeader": "formatWeekViewDayHeader"; "formatHourColumn": "formatHourColumn"; "showEventDetail": "showEventDetail"; "startingDayMonth": "startingDayMonth"; "startingDayWeek": "startingDayWeek"; "allDayLabel": "allDayLabel"; "noEventsLabel": "noEventsLabel"; "queryMode": "queryMode"; "step": "step"; "timeInterval": "timeInterval"; "autoSelect": "autoSelect"; "markDisabled": "markDisabled"; "monthviewDisplayEventTemplate": "monthviewDisplayEventTemplate"; "monthviewInactiveDisplayEventTemplate": "monthviewInactiveDisplayEventTemplate"; "monthviewEventDetailTemplate": "monthviewEventDetailTemplate"; "weekviewHeaderTemplate": "weekviewHeaderTemplate"; "weekviewAllDayEventTemplate": "weekviewAllDayEventTemplate"; "weekviewNormalEventTemplate": "weekviewNormalEventTemplate"; "dayviewAllDayEventTemplate": "dayviewAllDayEventTemplate"; "dayviewNormalEventTemplate": "dayviewNormalEventTemplate"; "weekviewAllDayEventSectionTemplate": "weekviewAllDayEventSectionTemplate"; "weekviewNormalEventSectionTemplate": "weekviewNormalEventSectionTemplate"; "dayviewAllDayEventSectionTemplate": "dayviewAllDayEventSectionTemplate"; "dayviewNormalEventSectionTemplate": "dayviewNormalEventSectionTemplate"; "weekviewInactiveAllDayEventSectionTemplate": "weekviewInactiveAllDayEventSectionTemplate"; "weekviewInactiveNormalEventSectionTemplate": "weekviewInactiveNormalEventSectionTemplate"; "dayviewInactiveAllDayEventSectionTemplate": "dayviewInactiveAllDayEventSectionTemplate"; "dayviewInactiveNormalEventSectionTemplate": "dayviewInactiveNormalEventSectionTemplate"; "dateFormatter": "dateFormatter"; "dir": "dir"; "scrollToHour": "scrollToHour"; "preserveScrollPosition": "preserveScrollPosition"; "lockSwipeToPrev": "lockSwipeToPrev"; "lockSwipes": "lockSwipes"; "locale": "locale"; "startHour": "startHour"; "endHour": "endHour"; "sliderOptions": "sliderOptions"; }, { "onCurrentDateChanged": "onCurrentDateChanged"; "onRangeChanged": "onRangeChanged"; "onEventSelected": "onEventSelected"; "onTimeSelected": "onTimeSelected"; "onTitleChanged": "onTitleChanged"; }, never>;
}
