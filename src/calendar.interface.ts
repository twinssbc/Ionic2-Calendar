import { EventEmitter, TemplateRef } from '@angular/core';

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
    endOffset: number;
    event: IEvent;
    startIndex: number;
    startOffset: number;
    overlapNumber?: number;
    position: number;
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
    getRange: { (date:Date): IRange; };
    getViewData: { (date:Date): IView };
    mode: CalendarMode;
    range: IRange;
    views: IView[];
    onDataLoaded: { (): void };
    onRangeChanged: EventEmitter<IRange>;
}

export interface ITimeSelected {
    events: IEvent[];
    selectedTime: Date;
    disabled: boolean;
}

export interface IMonthViewDisplayEventTemplateContext {
    view?: IView;
    row?: number;
    col?: number;
    showEventDetail?: boolean;
    selectedDate?: IMonthViewRow;
    noEventsLabel?: string;
}

export interface IMonthViewEventDetailTemplateContext {
    selectedDate: ITimeSelected;
    noEventsLabel: string;
}

export interface IWeekViewAllDayEventSectionTemplateContext {
    day: IWeekViewDateRow,
    eventTemplate?: TemplateRef<IDisplayAllDayEvent>,
}

export interface IWeekViewNormalEventSectionTemplateContext {
    tm: IWeekViewRow,
    eventTemplate?: TemplateRef<IDisplayEvent>,
    hourParts?: number
}

export interface IDayViewAllDayEventSectionTemplateContext {
    allDayEvents: IDisplayAllDayEvent[],
    eventTemplate?: TemplateRef<IDisplayAllDayEvent>
}

export interface IDayViewNormalEventSectionTemplateContext {
    tm: IDayViewRow,
    eventTemplate?: TemplateRef<IDisplayEvent>,
    hourParts?: number
}

export interface IDateFormatter {
    formatMonthViewDay?: { (date:Date): string; };
    formatMonthViewDayHeader?: { (date:Date): string; };
    formatMonthViewTitle?: { (date:Date): string; };
    formatWeekViewDayHeader?: { (date:Date): string; };
    formatWeekViewTitle?: { (date:Date): string; };
    formatWeekViewHourColumn?: { (date:Date): string; };
    formatDayViewTitle?: { (date:Date): string; };
    formatDayViewHourColumn?: { (date:Date): string; };
}

export type CalendarMode = 'day' | 'month' | 'week';

export type QueryMode = 'local' | 'remote';

export enum Step {
    QuarterHour = 15,
    HalfHour = 30,
    Hour = 60
}
