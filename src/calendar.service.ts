import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CalendarService {
    currentCalendarDate: Date;
    queryMode;
    private currentCalendarDateChangedFromChildren = new Subject<Date>();
    private currentCalendarDateChangedFromParent = new Subject<Date>();

    currentCalendarDateChangedFromChildren$ = this.currentCalendarDateChangedFromChildren.asObservable();
    currentCalendarDateChangedFromParent$ = this.currentCalendarDateChangedFromParent.asObservable();

    setCurrentCalendarDate(calendarDate: Date, fromParent:boolean = false) {
        this.currentCalendarDate = calendarDate;
        if(fromParent) {
            this.currentCalendarDateChangedFromParent.next(calendarDate);
        } else {
            this.currentCalendarDateChangedFromChildren.next(calendarDate);
        }
    }

    rangeChanged(component) {
        if (this.queryMode === 'local') {
            if (component.eventSource && component.onDataLoaded) {
                component.onDataLoaded();
            }
        } else if (this.queryMode === 'remote') {
            component.onRangeChanged.emit({
                startTime: component.range.startTime,
                endTime: component.range.endTime
            });
        }
    }

    getAdjacentCalendarDate(mode:String, direction) {
        var step;
        switch(mode) {
            case 'month':
                step = {
                    years: 0,
                    months: 1,
                    days: 0
                };
                break;
            case 'week':
                step = {
                    years: 0,
                    months: 0,
                    days: 7
                };
                break;
            case 'day':
                step = {
                    years: 0,
                    months: 0,
                    days: 1
                };
                break;
            default:
                throw new Error('Unsupported mode');
        }
        var calculateCalendarDate = new Date(this.currentCalendarDate.getTime()),
            year = calculateCalendarDate.getFullYear() + direction * (step.years || 0),
            month = calculateCalendarDate.getMonth() + direction * (step.months || 0),
            date = calculateCalendarDate.getDate() + direction * (step.days || 0);

        calculateCalendarDate.setFullYear(year, month, date);

        if(mode === 'month') {
            var firstDayInNextMonth = new Date(year, month + 1, 1);
            if (firstDayInNextMonth.getTime() <= calculateCalendarDate.getTime()) {
                calculateCalendarDate = new Date(firstDayInNextMonth.getTime() - 24 * 60 * 60 * 1000);
            }
        }
        return calculateCalendarDate;
    }


    getAdjacentViewStartTime(component, direction) {
        var adjacentCalendarDate = this.getAdjacentCalendarDate(component.mode, direction);
        return component.getRange(adjacentCalendarDate).startTime;
    };

    populateAdjacentViews(component) {
        var currentViewStartDate,
            currentViewData,
            toUpdateViewIndex,
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
}