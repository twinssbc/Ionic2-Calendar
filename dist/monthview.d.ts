import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CalendarService } from './calendar.service';
export declare class MonthViewComponent implements OnInit, OnChanges {
    private calendarService;
    slider: Slides;
    formatDay: String;
    formatDayHeader: String;
    formatMonthTitle: string;
    eventSource: any;
    startingDayMonth: number;
    showEventDetail: boolean;
    noEventsLabel: String;
    onRangeChanged: EventEmitter<{}>;
    onEventSelected: EventEmitter<{}>;
    onTimeSelected: EventEmitter<{}>;
    onTitleChanged: EventEmitter<string>;
    inited: boolean;
    range: any;
    views: any[];
    mode: String;
    currentViewIndex: number;
    selectedDate: any;
    private direction;
    moveOnSelected: boolean;
    slideOption: {
        runCallbacksOnInit: boolean;
        loop: boolean;
    };
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    onSlideChanged(): void;
    move(direction: any): void;
    static createDateObject(date: any, format: any): {
        date: any;
        label: string;
        secondary: boolean;
    };
    static getDates(startDate: any, n: any): any[];
    getViewData(startTime: Date): {
        dates: any[];
    };
    getHighlightClass(date: any): string;
    getRange(currentDate: any): {
        startTime: Date;
        endTime: any;
    };
    onDataLoaded(): void;
    refreshView(): void;
    getTitle(): string;
    private compareEvent(event1, event2);
    select(selectedDate: any, events: any): void;
    slideView(direction: any): void;
    updateCurrentView(currentViewStartDate: any, view: any): void;
    eventSelected(event: any): void;
}
