import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CalendarService } from './calendar.service';
export declare class DayViewComponent implements OnInit, OnChanges {
    private calendarService;
    slider: Slides;
    formatHourColumn: String;
    formatDayTitle: string;
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
    changeDetectorRef: any;
    mode: String;
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onSlideChanged(): void;
    move(direction: any): void;
    static createDateObjects(startTime: any): any[];
    getViewData(startTime: Date): {
        rows: any[];
        allDayEvents: any[];
    };
    getRange(currentDate: any): {
        startTime: Date;
        endTime: Date;
    };
    onDataLoaded(): void;
    refreshView(): void;
    getTitle(): string;
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
