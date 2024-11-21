import { EventEmitter, TemplateRef } from '@angular/core';
import 'moment-recur-ts'
import { Rule } from 'moment-recur-ts';

export interface IOccurence {
    eventUTCStartTime: number;
    eventUTCEndTime: number;
}

export interface IOccurences {

}
export interface IEvent  {
    allDay: boolean;
    endTime: Date;
    startTime: Date;
    title: string;
    category?: string;
    rruleFreq?: Rule.MeasureInput;
    rruleInterval?: Rule.UnitsInput;
    rruleUntil?: Date;
}

export interface IRange {
    startTime: Date;
    endTime: Date;
}

export interface IView {}

export interface IDayView extends IView {
    allDayEvents: IDisplayAllDayEvent[];
    rows: IDayViewRow[];
    categorizedAllDayEventsMap: Map<string, IDisplayAllDayEvent[]>;
}

/**
 * should be renamed to IDayViewCell since row could be vertically sliced into pieces of categories
 */
export interface IDayViewRow {
    events: IDisplayEvent[];
    eventsGroupByCategory?: Map<string, IDisplayEvent[]>;
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
    getRange: { (date: Date): IRange };
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
    disabled: boolean;
    category?: string;
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
    day: IWeekViewDateRow;
    eventTemplate?: TemplateRef<IDisplayAllDayEvent>;
}

export interface IWeekViewNormalEventSectionTemplateContext {
    tm: IWeekViewRow;
    eventTemplate?: TemplateRef<IDisplayEvent>;
    hourParts?: number;
}

export interface IDayViewAllDayEventSectionTemplateContext {
    allDayEvents: IDisplayAllDayEvent[];
    eventTemplate?: TemplateRef<IDisplayAllDayEvent>;
}

export interface IDayViewNormalEventSectionTemplateContext {
    tm: IDayViewRow;
    eventTemplate?: TemplateRef<IDisplayEvent>;
    hourParts?: number;
    category?: string;
}

export interface IDayViewCategoryItemTemplateContext {
    category: string;
}

export interface IDateFormatter {
    formatMonthViewDay?: { (date: Date): string };
    formatMonthViewDayHeader?: { (date: Date): string };
    formatMonthViewTitle?: { (date: Date): string };
    formatWeekViewDayHeader?: { (date: Date): string };
    formatWeekViewTitle?: { (date: Date): string };
    formatWeekViewHourColumn?: { (date: Date): string };
    formatDayViewTitle?: { (date: Date): string };
    formatDayViewHourColumn?: { (date: Date): string };
}

export type CalendarMode = 'day' | 'month' | 'week';

export type QueryMode = 'local' | 'remote';

export enum Step {
    QuarterHour = 15,
    HalfHour = 30,
    Hour = 60,
}
