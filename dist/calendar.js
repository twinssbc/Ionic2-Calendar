"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var monthview_1 = require('./monthview');
var weekview_1 = require("./weekview");
var dayview_1 = require("./dayview");
var calendar_service_1 = require("./calendar.service");
var CalendarComponent = (function () {
    function CalendarComponent(elementRef, calendarService) {
        this.elementRef = elementRef;
        this.calendarService = calendarService;
        this.currentDateChange = new core_1.EventEmitter(true);
        this.onRangeChanged = new core_1.EventEmitter(true);
        this.onEventSelected = new core_1.EventEmitter(true);
        this.onTimeSelected = new core_1.EventEmitter(true);
        this.onTitleChanged = new core_1.EventEmitter(true);
        this.formatDay = 'd';
        this.formatDayHeader = 'EEE';
        this.formatDayTitle = 'MMMM dd, yyyy';
        this.formatWeekTitle = 'MMMM yyyy, Week $n';
        this.formatMonthTitle = 'MMMM yyyy';
        this.formatWeekViewDayHeader = 'EEE d';
        this.formatHourColumn = 'ha';
        this.showEventDetail = true;
        this.startingDayMonth = 0;
        this.startingDayWeek = 0;
        this.allDayLabel = 'all day';
        this.noEventsLabel = 'No Events';
        this.queryMode = 'local';
        this.step = 60;
        this.hourParts = 1;
        this.inited = false;
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
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inited = true;
        this.calendarMode = this.calendarMode || 'month';
        if (!this.currentDate) {
            this.currentDate = new Date();
            this.currentDateChange.emit(this.currentDate);
        }
        this.calendarService.setCurrentCalendarDate(this.currentDate, true);
        this.step = parseInt(this.step);
        if (this.step === 60 || this.step === 30 || this.step === 15) {
            this.hourParts = Math.floor(60 / this.step);
        }
        else {
            throw new Error('Invalid step parameter: ' + this.step);
        }
        this.calendarService.queryMode = this.queryMode;
        this.calendarService.currentCalendarDateChangedFromChildren$.subscribe(function (currentDate) {
            _this.currentDate = currentDate;
            _this.currentDateChange.emit(currentDate);
        });
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        if (!this.inited) {
            return;
        }
        var currentDate = changes['currentDate'];
        if (currentDate && currentDate.currentValue) {
            this.calendarService.setCurrentCalendarDate(currentDate.currentValue, true);
        }
    };
    CalendarComponent.prototype.rangeChanged = function (event) {
        this.onRangeChanged.emit(event);
    };
    CalendarComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    CalendarComponent.prototype.timeSelected = function (event) {
        this.onTimeSelected.emit(event);
    };
    CalendarComponent.prototype.titleChanged = function (title) {
        this.onTitleChanged.emit(title);
    };
    CalendarComponent.prototype.setAttributeValue = function (nativeElement, attributeName) {
        var attributeValue = nativeElement.getAttribute(attributeName);
        if (attributeValue) {
            this[attributeName] = attributeValue;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "eventSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "calendarMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], CalendarComponent.prototype, "currentDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "currentDateChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "onRangeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "onEventSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "onTimeSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "onTitleChanged", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            template: "\n        <div [ngSwitch]=\"calendarMode\" class=\"calendar-container\">\n            <monthview *ngSwitchCase=\"'month'\" [formatDay]=\"formatDay\" [formatDayHeader]=\"formatDayHeader\" [formatMonthTitle]=\"formatMonthTitle\"\n             [startingDayMonth]=\"startingDayMonth\" [showEventDetail]=\"showEventDetail\" [noEventsLabel]=\"noEventsLabel\" [eventSource]=\"eventSource\"\n             (onRangeChanged)=\"rangeChanged($event)\" (onEventSelected)=\"eventSelected($event)\" (onTimeSelected)=\"timeSelected($event)\" (onTitleChanged)=\"titleChanged($event)\">\n            </monthview>\n            <weekview *ngSwitchCase=\"'week'\" [formatWeekTitle]=\"formatWeekTitle\" [formatWeekViewDayHeader]=\"formatWeekViewDayHeader\"\n             [formatHourColumn]=\"formatHourColumn\" [startingDayWeek]=\"startingDayWeek\" [allDayLabel]=\"allDayLabel\"\n             [hourParts]=\"hourParts\" [eventSource]=\"eventSource\"\n             (onRangeChanged)=\"rangeChanged($event)\" (onEventSelected)=\"eventSelected($event)\" (onTimeSelected)=\"timeSelected($event)\" (onTitleChanged)=\"titleChanged($event)\">\n            </weekview>\n            <dayview *ngSwitchCase=\"'day'\" [formatDayTitle]=\"formatDayTitle\" [formatHourColumn]=\"formatHourColumn\" [allDayLabel]=\"allDayLabel\"\n             [hourParts]=\"hourParts\" [eventSource]=\"eventSource\"\n             (onRangeChanged)=\"rangeChanged($event)\" (onEventSelected)=\"eventSelected($event)\" (onTimeSelected)=\"timeSelected($event)\" (onTitleChanged)=\"titleChanged($event)\">\n            </dayview>\n        </div>\n    ",
            styles: ["\n        .calendar-container {height: 100%;}\n    "],
            directives: [monthview_1.MonthViewComponent, weekview_1.WeekViewComponent, dayview_1.DayViewComponent],
            providers: [calendar_service_1.CalendarService]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, calendar_service_1.CalendarService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.js.map