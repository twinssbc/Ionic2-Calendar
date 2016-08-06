import { Observable } from 'rxjs/Observable';
export declare class CalendarService {
    currentCalendarDate: Date;
    queryMode: any;
    private currentCalendarDateChangedFromChildren;
    private currentCalendarDateChangedFromParent;
    currentCalendarDateChangedFromChildren$: Observable<Date>;
    currentCalendarDateChangedFromParent$: Observable<Date>;
    setCurrentCalendarDate(calendarDate: Date, fromParent?: boolean): void;
    rangeChanged(component: any): void;
    getAdjacentCalendarDate(mode: String, direction: any): Date;
    getAdjacentViewStartTime(component: any, direction: any): any;
    populateAdjacentViews(component: any): void;
}
