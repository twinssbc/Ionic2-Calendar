import {Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {MonthViewComponent} from './monthview';
import {WeekViewComponent} from "./weekview";
import {DayViewComponent} from "./dayview";
import {CalendarService} from "./calendar.service";

@Component({
    selector: 'calendar',
    template: `
        <div [ngSwitch]="calendarMode" class="calendar-container">
            <monthview *ngSwitchCase="'month'" [formatDay]="formatDay" [formatDayHeader]="formatDayHeader" [formatMonthTitle]="formatMonthTitle"
             [startingDayMonth]="startingDayMonth" [showEventDetail]="showEventDetail" [noEventsLabel]="noEventsLabel" [eventSource]="eventSource"
             (onRangeChanged)="rangeChanged($event)" (onEventSelected)="eventSelected($event)" (onTimeSelected)="timeSelected($event)" (onTitleChanged)="titleChanged($event)">
            </monthview>
            <weekview *ngSwitchCase="'week'" [formatWeekTitle]="formatWeekTitle" [formatWeekViewDayHeader]="formatWeekViewDayHeader"
             [formatHourColumn]="formatHourColumn" [startingDayWeek]="startingDayWeek" [allDayLabel]="allDayLabel"
             [hourParts]="hourParts" [eventSource]="eventSource"
             (onRangeChanged)="rangeChanged($event)" (onEventSelected)="eventSelected($event)" (onTimeSelected)="timeSelected($event)" (onTitleChanged)="titleChanged($event)">
            </weekview>
            <dayview *ngSwitchCase="'day'" [formatDayTitle]="formatDayTitle" [formatHourColumn]="formatHourColumn" [allDayLabel]="allDayLabel"
             [hourParts]="hourParts" [eventSource]="eventSource"
             (onRangeChanged)="rangeChanged($event)" (onEventSelected)="eventSelected($event)" (onTimeSelected)="timeSelected($event)" (onTitleChanged)="titleChanged($event)">
            </dayview>
        </div>
    `,
    styles: [`
        .calendar-container {height: 100%;}
    `],
    directives: [MonthViewComponent, WeekViewComponent, DayViewComponent],
    providers: [CalendarService]
})
export class CalendarComponent implements OnInit, OnChanges {
    @Input() eventSource;
    @Input() calendarMode:String;
    @Input() currentDate:Date;
    @Output() currentDateChange = new EventEmitter(true);
    @Output() onRangeChanged = new EventEmitter(true);
    @Output() onEventSelected = new EventEmitter(true);
    @Output() onTimeSelected = new EventEmitter(true);
    @Output() onTitleChanged = new EventEmitter<string>(true);

    formatDay:String = 'd';
    formatDayHeader:String = 'EEE';
    formatDayTitle:String = 'MMMM dd, yyyy';
    formatWeekTitle:String = 'MMMM yyyy, Week $n';
    formatMonthTitle:String = 'MMMM yyyy';
    formatWeekViewDayHeader:String = 'EEE d';
    formatHourColumn:String = 'ha';
    showEventDetail:Boolean = true;
    startingDayMonth:number = 0;
    startingDayWeek:number = 0;
    allDayLabel:String = 'all day';
    noEventsLabel:String = 'No Events';
    queryMode:String = 'local';
    step:any = 60;

    hourParts:number = 1;
    inited = false;
    currentDateChangeFromChild = false;

    constructor(private elementRef:ElementRef, private calendarService:CalendarService) {
        var native = this.elementRef.nativeElement;

        this.setAttributeValue(native, 'formatDay');
        this.setAttributeValue(native, 'formatDayHeader');
        this.setAttributeValue(native, 'formatDayTitle');
        this.setAttributeValue(native, 'formatWeekTitle');
        this.setAttributeValue(native, 'formatMonthTitle');
        this.setAttributeValue(native, 'formatWeekViewDayHeader');
        this.setAttributeValue(native, 'formatHourColumn');
        this.setAttributeValue(native, 'showEventDetail');
        this.setAttributeValue(native, 'startingDayMonth');
        this.setAttributeValue(native, 'startingDayWeek');
        this.setAttributeValue(native, 'allDayLabel');
        this.setAttributeValue(native, 'noEventsLabel');
        this.setAttributeValue(native, 'queryMode');
        this.setAttributeValue(native, 'step');
    }

    ngOnInit() {
        this.inited = true;
        this.calendarMode = this.calendarMode || 'month';
        if (!this.currentDate) {
            this.currentDate = new Date();
        }
        this.calendarService.setCurrentCalendarDate(this.currentDate, true);
        this.step = parseInt(this.step);
        if (this.step === 60 || this.step === 30 || this.step === 15) {
            this.hourParts = Math.floor(60 / this.step);
        } else {
            throw new Error('Invalid step parameter: ' + this.step);
        }
        this.calendarService.queryMode = this.queryMode;

        this.calendarService.currentCalendarDateChangedFromChildren$.subscribe(
            currentDate => {
                this.currentDateChangeFromChild = true;
                this.currentDate = currentDate;
                this.currentDateChange.emit(currentDate);
            });
    }

    ngOnChanges(changes) {
        if (!this.inited) {
            return;
        }
        var currentDate = changes['currentDate'];
        if (currentDate && currentDate.currentValue) {
            if (this.currentDateChangeFromChild) {
                this.currentDateChangeFromChild = false;
            } else {
                this.calendarService.setCurrentCalendarDate(currentDate.currentValue, true);
            }
        }
    }

    rangeChanged(event) {
        this.onRangeChanged.emit(event);
    }

    eventSelected(event) {
        this.onEventSelected.emit(event);
    }

    timeSelected(event) {
        this.onTimeSelected.emit(event);
    }

    titleChanged(title) {
        this.onTitleChanged.emit(title);
    }

    private setAttributeValue(nativeElement, attributeName) {
        var attributeValue = nativeElement.getAttribute(attributeName);
        if (attributeValue) {
            this[attributeName] = attributeValue;
        }
    }
}