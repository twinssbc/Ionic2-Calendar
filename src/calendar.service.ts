import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import {
    ICalendarComponent,
    IView,
    CalendarMode,
    QueryMode,
} from "./calendar.interface";

@Injectable()
export class CalendarService {
    queryMode!: QueryMode;
    currentDateChangedFromParent$: Observable<Date>;
    currentDateChangedFromChildren$: Observable<Date>;
    eventSourceChanged$: Observable<void>;
    slideChanged$: Observable<number>;
    slideUpdated$: Observable<void>;

    private _currentDate: Date = new Date();
    private currentDateChangedFromParent = new Subject<Date>();
    private currentDateChangedFromChildren = new Subject<Date>();
    private eventSourceChanged = new Subject<void>();
    private slideChanged = new Subject<number>();
    private slideUpdated = new Subject<void>();

    constructor() {
        this.currentDateChangedFromParent$ =
            this.currentDateChangedFromParent.asObservable();
        this.currentDateChangedFromChildren$ =
            this.currentDateChangedFromChildren.asObservable();
        this.eventSourceChanged$ = this.eventSourceChanged.asObservable();
        this.slideChanged$ = this.slideChanged.asObservable();
        this.slideUpdated$ = this.slideUpdated.asObservable();
    }

    public setCurrentDate(val: Date, fromParent: boolean = false): void {
        this._currentDate = new Date(val);
        if (fromParent) {
            this.currentDateChangedFromParent.next(val);
        } else {
            this.currentDateChangedFromChildren.next(val);
        }
    }

    public get currentDate(): Date {
        return this._currentDate;
    }

    public rangeChanged(component: ICalendarComponent): void {
        if (this.queryMode === "local") {
            if (component.eventSource && component.onDataLoaded) {
                component.onDataLoaded();
            }
        } else if (this.queryMode === "remote") {
            let rangeStart = new Date(component.range.startTime.getTime()),
                rangeEnd = new Date(component.range.endTime.getTime());

            rangeStart.setHours(0);
            if (rangeStart.getHours() === 23) {
                rangeStart.setTime(rangeStart.getTime() + 3600000);
            }

            rangeEnd.setHours(0);
            if (rangeEnd.getHours() === 23) {
                rangeEnd.setTime(rangeEnd.getTime() + 3600000);
            }
            component.onRangeChanged.emit({
                startTime: rangeStart,
                endTime: rangeEnd,
            });
        }
    }

    private getStep(mode: CalendarMode): {
        years: number;
        months: number;
        days: number;
    } {
        switch (mode) {
            case "month":
                return {
                    years: 0,
                    months: 1,
                    days: 0,
                };
            case "week":
                return {
                    years: 0,
                    months: 0,
                    days: 7,
                };
            case "day":
                return {
                    years: 0,
                    months: 0,
                    days: 1,
                };
        }
    }

    public getAdjacentCalendarDate(
        mode: CalendarMode,
        direction: number
    ): Date {
        let calculateCalendarDate = this.currentDate;
        const step = this.getStep(mode),
            year = calculateCalendarDate.getFullYear() + direction * step.years,
            month = calculateCalendarDate.getMonth() + direction * step.months,
            date = calculateCalendarDate.getDate() + direction * step.days;

        calculateCalendarDate = new Date(year, month, date, 12, 0, 0);

        if (mode === "month") {
            const firstDayInNextMonth = new Date(year, month + 1, 1, 12, 0, 0);
            if (
                firstDayInNextMonth.getTime() <= calculateCalendarDate.getTime()
            ) {
                calculateCalendarDate = new Date(
                    firstDayInNextMonth.getTime() - 24 * 60 * 60 * 1000
                );
            }
        }
        return calculateCalendarDate;
    }

    private getAdjacentViewStartTime(
        component: ICalendarComponent,
        direction: number
    ): Date {
        let adjacentCalendarDate = this.getAdjacentCalendarDate(
            component.mode,
            direction
        );
        return component.getRange(adjacentCalendarDate).startTime;
    }

    public populateAdjacentViews(component: ICalendarComponent): void {
        let currentViewStartDate: Date,
            currentViewData: IView[],
            toUpdateViewIndex: number,
            currentViewIndex = component.currentViewIndex;

        if (component.direction === 1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, 1);
            toUpdateViewIndex = (currentViewIndex + 1) % 3;
            component.views[toUpdateViewIndex] =
                component.getViewData(currentViewStartDate);
        } else if (component.direction === -1) {
            currentViewStartDate = this.getAdjacentViewStartTime(component, -1);
            toUpdateViewIndex = (currentViewIndex + 2) % 3;
            component.views[toUpdateViewIndex] =
                component.getViewData(currentViewStartDate);
        } else {
            if (!component.views) {
                currentViewData = [];
                currentViewStartDate = component.range.startTime;
                currentViewData.push(
                    component.getViewData(currentViewStartDate)
                );
                currentViewStartDate = this.getAdjacentViewStartTime(
                    component,
                    1
                );
                currentViewData.push(
                    component.getViewData(currentViewStartDate)
                );
                currentViewStartDate = this.getAdjacentViewStartTime(
                    component,
                    -1
                );
                currentViewData.push(
                    component.getViewData(currentViewStartDate)
                );
                component.views = currentViewData;
            } else {
                currentViewStartDate = component.range.startTime;
                component.views[currentViewIndex] =
                    component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(
                    component,
                    -1
                );
                toUpdateViewIndex = (currentViewIndex + 2) % 3;
                component.views[toUpdateViewIndex] =
                    component.getViewData(currentViewStartDate);
                currentViewStartDate = this.getAdjacentViewStartTime(
                    component,
                    1
                );
                toUpdateViewIndex = (currentViewIndex + 1) % 3;
                component.views[toUpdateViewIndex] =
                    component.getViewData(currentViewStartDate);
            }
        }
    }

    public loadEvents(): void {
        this.eventSourceChanged.next();
    }

    public slide(direction: number): void {
        this.slideChanged.next(direction);
    }

    public update(): void {
        this.slideUpdated.next();
    }
}
