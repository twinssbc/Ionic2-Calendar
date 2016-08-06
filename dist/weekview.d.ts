import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CalendarService } from './calendar.service';
export declare class WeekViewComponent implements OnInit, OnChanges {
    private calendarService;
    slider: Slides;
    formatWeekTitle: string;
    formatWeekViewDayHeader: String;
    formatHourColumn: String;
    startingDayWeek: number;
    allDayLabel: String;
    hourParts: number;
    eventSource: any;
    onRangeChanged: EventEmitter<{}>;
    onEventSelected: EventEmitter<{}>;
    onTimeSelected: EventEmitter<{}>;
    onTitleChanged: EventEmitter<string>;
    inited: boolean;
    range: any;
    views: any[];
    currentViewIndex: number;
    private direction;
    slideOption: {
        runCallbacksOnInit: boolean;
        loop: boolean;
    };
    mode: String;
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onSlideChanged(): void;
    move(direction: any): void;
    static createDateObjects(startTime: any): any[];
    static getDates(startTime: any, n: any): any[];
    getViewData(startTime: Date): {
        rows: any[];
        dates: any[];
    };
    getRange(currentDate: any): {
        startTime: any;
        endTime: any;
    };
    onDataLoaded(): void;
    refreshView(): void;
    getTitle(): any;
    private static getISO8601WeekNumber(date);
    private static compareEventByStartOffset(eventA, eventB);
    select(selectedTime: any, events: any): void;
    placeEvents(orderedEvents: any): void;
    placeAllDayEvents(orderedEvents: any): void;
    overlap(event1: any, event2: any): boolean;
    calculatePosition(events: any): void;
    private static calculateWidth(orderedEvents);
    eventSelected(event: any): void;
}
