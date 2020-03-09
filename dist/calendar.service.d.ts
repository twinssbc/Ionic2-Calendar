import { Observable } from "rxjs";
import { ICalendarComponent, CalendarMode, QueryMode } from './calendar';
import * as i0 from "@angular/core";
export declare class CalendarService {
    queryMode: QueryMode;
    currentDateChangedFromParent$: Observable<Date>;
    currentDateChangedFromChildren$: Observable<Date>;
    eventSourceChanged$: Observable<void>;
    slideChanged$: Observable<number>;
    private _currentDate;
    private currentDateChangedFromParent;
    private currentDateChangedFromChildren;
    private eventSourceChanged;
    private slideChanged;
    constructor();
    setCurrentDate(val: Date, fromParent?: boolean): void;
    get currentDate(): Date;
    rangeChanged(component: ICalendarComponent): void;
    private getStep;
    getAdjacentCalendarDate(mode: CalendarMode, direction: number): Date;
    getAdjacentViewStartTime(component: ICalendarComponent, direction: number): Date;
    populateAdjacentViews(component: ICalendarComponent): void;
    loadEvents(): void;
    slide(direction: number): void;
    static ɵfac: i0.ɵɵFactoryDef<CalendarService>;
    static ɵprov: i0.ɵɵInjectableDef<CalendarService>;
}
