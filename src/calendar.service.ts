import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

import { ICalendarComponent, IView, CalendarMode, QueryMode } from './calendar';

@Injectable()
export class CalendarService {
    queryMode: QueryMode;
    currentDateChangedFromParent$: Observable<Date>;
    currentDateChangedFromChildren$: Observable<Date>;
    eventSourceChanged$: Observable<void>;
    slideChanged$: Observable<number>;

    private _currentDate: Date;
    private currentDateChangedFromParent = new Subject<Date>();
    private currentDateChangedFromChildren = new Subject<Date>();
    private eventSourceChanged = new Subject<void>();
    private slideChanged = new Subject<number>();

    constructor() {
        this.currentDateChangedFromParent$ = this.currentDateChangedFromParent.asObservable();
        this.currentDateChangedFromChildren$ = this.currentDateChangedFromChildren.asObservable();
        this.eventSourceChanged$ = this.eventSourceChanged.asObservable();
        this.slideChanged$ = this.slideChanged.asObservable();
    }

    setCurrentDate(val: Date, fromParent: boolean = false) {
        this._currentDate = val;
        if (fromParent) {
            this.currentDateChangedFromParent.next(val);
        } else {
            this.currentDateChangedFromChildren.next(val);
        }
    }

    get currentDate(): Date {
        return this._currentDate;
    }

    rangeChanged(component: ICalendarComponent) {
        if (this.queryMode === 'local') {
            if (component.eventSource && component.onDataLoaded) {
                component.onDataLoaded();
            }
        } else if (this.queryMode === 'remote') {
            component.onRangeChanged.emit(component.range);
        }
    }

    private getStep(mode: CalendarMode): { years: number; months: number; days: number; } {
        switch (mode) {
            case 'month':
                return {
                    years: 0,
                    months: 1,
                    days: 0
                };
            case 'week':
                return {
                    years: 0,
                    months: 0,
                    days: 7
                };
            case 'day':
                return {
                    years: 0,
                    months: 0,
                    days: 1
                };
        }
    }

    getAdjacentCalendarDate(mode: CalendarMode, direction: number): Date {
        let step = this.getStep(mode);
        let calculateCalendarDate = new Date(this.currentDate.getTime()),
            year = calculateCalendarDate.getFullYear() + direction * step.years,
            month = calculateCalendarDate.getMonth() + direction * step.months,
            date = calculateCalendarDate.getDate() + direction * step.days;

        calculateCalendarDate.setFullYear(year, month, date);

        if (mode === 'month') {
            let firstDayInNextMonth = new Date(year, month + 1, 1);
            if (firstDayInNextMonth.getTime() <= calculateCalendarDate.getTime()) {
                calculateCalendarDate = new Date(firstDayInNextMonth.getTime() - 24 * 60 * 60 * 1000);
            }
        }
        return calculateCalendarDate;
    }

    getAdjacentViewStartTime(component: ICalendarComponent, direction: number): Date {
        let adjacentCalendarDate = this.getAdjacentCalendarDate(component.mode, direction);
        return component.getRange(adjacentCalendarDate).startTime;
    }

    populateAdjacentViews(component: ICalendarComponent) {
        let currentViewStartDate: Date,
            currentViewData: IView[],
            toUpdateViewIndex: number,
            currentViewIndex = component.currentViewIndex;

        if (component.direction === 1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
            toUpdateViewIndex = (currentViewIndex + 1) % 3;
            component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
        } else if (component.direction === -1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
            toUpdateViewIndex = (currentViewIndex + 2) % 3;
            component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
        } else {
            if (!component.views) {
                currentViewData = [];
                currentViewStartDate = component.range.startTime;
                currentViewData.push(component.getViewData(currentViewStartDate));
                currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
                currentViewData.push(component.getViewData(currentViewStartDate));
                currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
                currentViewData.push(component.getViewData(currentViewStartDate));
                component.views = currentViewData;
            } else {
                currentViewStartDate = component.range.startTime;
                component.views[currentViewIndex] = component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
                toUpdateViewIndex = (currentViewIndex + 2) % 3;
                component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
                toUpdateViewIndex = (currentViewIndex + 1) % 3;
                component.views[toUpdateViewIndex] = component.getViewData(currentViewStartDate);
            }
        }
    }

    loadEvents() {
        this.eventSourceChanged.next();
    }

    slide(direction: number) {
        this.slideChanged.next(direction);
    }
}
