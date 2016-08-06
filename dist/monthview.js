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
var common_1 = require('@angular/common');
var ionic_angular_1 = require('ionic-angular');
var calendar_service_1 = require('./calendar.service');
var MonthViewComponent = (function () {
    function MonthViewComponent(calendarService) {
        this.calendarService = calendarService;
        this.onRangeChanged = new core_1.EventEmitter(true);
        this.onEventSelected = new core_1.EventEmitter(true);
        this.onTimeSelected = new core_1.EventEmitter(true);
        this.onTitleChanged = new core_1.EventEmitter(true);
        this.inited = false;
        this.views = [];
        this.mode = 'month';
        this.currentViewIndex = 0;
        this.direction = 0;
        this.moveOnSelected = false;
        this.slideOption = {
            runCallbacksOnInit: false,
            loop: true
        };
    }
    MonthViewComponent.prototype.ngOnInit = function () {
        var me = this;
        this.inited = true;
        this.refreshView();
        this.calendarService.currentCalendarDateChangedFromParent$.subscribe(function (currentDate) {
            me.refreshView();
        });
    };
    MonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (!this.inited) {
            return;
        }
        var eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
    };
    MonthViewComponent.prototype.onSlideChanged = function () {
        var me = this;
        setTimeout(function () {
            var currentSlideIndex = me.slider.getActiveIndex(), direction = 0, currentViewIndex = me.currentViewIndex;
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (currentSlideIndex - currentViewIndex === 1 || (currentSlideIndex === 0 && currentViewIndex === 2)) {
                direction = 1;
            }
            else if (currentViewIndex - currentSlideIndex === 1 || (currentSlideIndex === 2 && currentViewIndex === 0)) {
                direction = -1;
            }
            me.currentViewIndex = currentSlideIndex;
            me.move(direction);
        }, 200);
    };
    MonthViewComponent.prototype.move = function (direction) {
        if (direction == 0) {
            return;
        }
        this.direction = direction;
        if (this.moveOnSelected) {
            this.moveOnSelected = false;
        }
        else {
            this.calendarService.setCurrentCalendarDate(this.calendarService.getAdjacentCalendarDate(this.mode, direction));
        }
        this.refreshView();
        this.direction = 0;
    };
    MonthViewComponent.createDateObject = function (date, format) {
        return {
            date: date,
            label: new common_1.DatePipe().transform(date, format),
            secondary: false
        };
    };
    MonthViewComponent.getDates = function (startDate, n) {
        var dates = new Array(n), current = new Date(startDate), i = 0;
        current.setHours(12);
        while (i < n) {
            dates[i++] = new Date(current.toString());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };
    MonthViewComponent.prototype.getViewData = function (startTime) {
        var startDate = startTime, date = startDate.getDate(), month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;
        var days = MonthViewComponent.getDates(startDate, 42);
        for (var i = 0; i < 42; i++) {
            var dateObject = MonthViewComponent.createDateObject(days[i], this.formatDay);
            dateObject.secondary = days[i].getMonth() !== month;
            days[i] = dateObject;
        }
        return {
            dates: days
        };
    };
    MonthViewComponent.prototype.getHighlightClass = function (date) {
        var className = '';
        if (date.hasEvent) {
            if (date.secondary) {
                className = 'monthview-secondary-with-event';
            }
            else {
                className = 'monthview-primary-with-event';
            }
        }
        if (date.selected) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-selected';
        }
        if (date.current) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-current';
        }
        if (date.secondary) {
            if (className) {
                className += ' ';
            }
            className += 'text-muted';
        }
        return className;
    };
    MonthViewComponent.prototype.getRange = function (currentDate) {
        var year = currentDate.getFullYear(), month = currentDate.getMonth(), firstDayOfMonth = new Date(year, month, 1), difference = this.startingDayMonth - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference, startDate = new Date(firstDayOfMonth.getTime()), endDate;
        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }
        endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);
        return {
            startTime: startDate,
            endTime: endDate
        };
    };
    MonthViewComponent.prototype.onDataLoaded = function () {
        var range = this.range, eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = range.startTime, endTime = range.endTime, timeZoneOffset = -new Date().getTimezoneOffset(), utcStartTime = new Date(startTime.getTime() + timeZoneOffset * 60 * 1000), utcEndTime = new Date(endTime.getTime() + timeZoneOffset * 60 * 1000), currentViewIndex = this.currentViewIndex, dates = this.views[currentViewIndex].dates, oneDay = 86400000, eps = 0.001;
        for (var r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }
        for (var i = 0; i < len; i += 1) {
            var event = eventSource[i];
            var eventStartTime = new Date(event.startTime);
            var eventEndTime = new Date(event.endTime);
            var st;
            var et;
            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                }
                else {
                    st = utcStartTime;
                    et = utcEndTime;
                }
            }
            else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                }
                else {
                    st = startTime;
                    et = endTime;
                }
            }
            var timeDifferenceStart;
            if (eventStartTime <= st) {
                timeDifferenceStart = 0;
            }
            else {
                timeDifferenceStart = (eventStartTime.getTime() - st.getTime()) / oneDay;
            }
            var timeDifferenceEnd;
            if (eventEndTime >= et) {
                timeDifferenceEnd = (et.getTime() - st.getTime()) / oneDay;
            }
            else {
                timeDifferenceEnd = (eventEndTime.getTime() - st.getTime()) / oneDay;
            }
            var index = Math.floor(timeDifferenceStart);
            var eventSet;
            while (index < timeDifferenceEnd - eps) {
                dates[index].hasEvent = true;
                eventSet = dates[index].events;
                if (eventSet) {
                    eventSet.push(event);
                }
                else {
                    eventSet = [];
                    eventSet.push(event);
                    dates[index].events = eventSet;
                }
                index += 1;
            }
        }
        for (r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }
        var findSelected = false;
        for (r = 0; r < 42; r += 1) {
            if (dates[r].selected) {
                this.selectedDate = dates[r];
                findSelected = true;
                break;
            }
            if (findSelected) {
                break;
            }
        }
    };
    ;
    MonthViewComponent.prototype.refreshView = function () {
        this.range = this.getRange(this.calendarService.currentCalendarDate);
        var title = this.getTitle();
        this.onTitleChanged.emit(title);
        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    };
    MonthViewComponent.prototype.getTitle = function () {
        var currentViewStartDate = this.range.startTime, date = currentViewStartDate.getDate(), month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12, year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0), headerDate = new Date(year, month, 1);
        return new common_1.DatePipe().transform(headerDate, this.formatMonthTitle);
    };
    MonthViewComponent.prototype.compareEvent = function (event1, event2) {
        if (event1.allDay) {
            return 1;
        }
        else if (event2.allDay) {
            return -1;
        }
        else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    };
    MonthViewComponent.prototype.select = function (selectedDate, events) {
        var views = this.views, dates, r;
        if (views) {
            dates = views[this.currentViewIndex].dates;
            var currentCalendarDate = this.calendarService.currentCalendarDate;
            var currentMonth = currentCalendarDate.getMonth();
            var currentYear = currentCalendarDate.getFullYear();
            var selectedMonth = selectedDate.getMonth();
            var selectedYear = selectedDate.getFullYear();
            var direction = 0;
            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            }
            else {
                direction = currentYear < selectedYear ? 1 : -1;
            }
            this.calendarService.setCurrentCalendarDate(selectedDate);
            if (direction === 0) {
                var currentViewStartDate = this.range.startTime, oneDay = 86400000, selectedDayDifference = Math.floor((selectedDate.getTime() - currentViewStartDate.getTime()) / oneDay);
                for (r = 0; r < 42; r += 1) {
                    dates[r].selected = false;
                }
                if (selectedDayDifference >= 0 && selectedDayDifference < 42) {
                    dates[selectedDayDifference].selected = true;
                    this.selectedDate = dates[selectedDayDifference];
                }
            }
            else {
                this.moveOnSelected = true;
                this.slideView(direction);
            }
            this.onTimeSelected.emit({ selectedTime: selectedDate, events: events });
        }
    };
    MonthViewComponent.prototype.slideView = function (direction) {
        if (direction === 1) {
            this.slider.slideNext();
        }
        else if (direction === -1) {
            this.slider.slidePrev();
        }
    };
    MonthViewComponent.prototype.updateCurrentView = function (currentViewStartDate, view) {
        var currentCalendarDate = this.calendarService.currentCalendarDate, today = new Date(), oneDay = 86400000, r, selectedDayDifference = Math.floor((currentCalendarDate.getTime() - currentViewStartDate.getTime()) / oneDay), currentDayDifference = Math.floor((today.getTime() - currentViewStartDate.getTime()) / oneDay);
        for (r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 && selectedDayDifference < 42) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        }
        else {
            this.selectedDate = {
                events: []
            };
        }
        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    };
    MonthViewComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    __decorate([
        core_1.ViewChild('monthSlider'), 
        __metadata('design:type', ionic_angular_1.Slides)
    ], MonthViewComponent.prototype, "slider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MonthViewComponent.prototype, "formatDay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MonthViewComponent.prototype, "formatDayHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MonthViewComponent.prototype, "formatMonthTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MonthViewComponent.prototype, "eventSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MonthViewComponent.prototype, "startingDayMonth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MonthViewComponent.prototype, "showEventDetail", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MonthViewComponent.prototype, "noEventsLabel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MonthViewComponent.prototype, "onRangeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MonthViewComponent.prototype, "onEventSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MonthViewComponent.prototype, "onTimeSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MonthViewComponent.prototype, "onTitleChanged", void 0);
    MonthViewComponent = __decorate([
        core_1.Component({
            selector: 'monthview',
            template: "\n        <div>\n            <ion-slides #monthSlider [options]=\"slideOption\" (ionDidChange)=\"onSlideChanged()\">\n                <ion-slide *ngFor=\"let view of views; let viewIndex=index\">\n                    <table *ngIf=\"viewIndex===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let day of view.dates.slice(0,7)\">\n                                <small>{{day.date | date: formatDayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" (click)=\"select(view.dates[row*7+col].date)\"\n                                [ngClass]=\"getHighlightClass(view.dates[row*7+col])\">{{view.dates[row*7+col].label}}\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"viewIndex!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let day of view.dates.slice(0,7)\">\n                                <small>{{day.date | date: formatDayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                {{view.dates[row*7+col].label}}\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n            </ion-slides>\n            <ion-list class=\"event-detail-container2\" has-bouncing=\"false\" *ngIf=\"showEventDetail\" overflow-scroll=\"false\">\n                <ion-item *ngFor=\"let event of selectedDate?.events\" (click)=\"eventSelected(event)\">\n                        <span *ngIf=\"!event.allDay\" class=\"monthview-eventdetail-timecolumn\">{{event.startTime|date: 'HH:mm'}}\n                            -\n                            {{event.endTime|date: 'HH:mm'}}\n                        </span>\n                    <span *ngIf=\"event.allDay\" class=\"monthview-eventdetail-timecolumn\">All day</span>\n                    <span class=\"event-detail\">  |  {{event.title}}</span>\n                </ion-item>\n                <ion-item *ngIf=\"!selectedDate?.events\">\n                    <td class=\"no-events-label\">{{noEventsLabel}}</td>\n                </ion-item>\n            </ion-list>\n        </div>\n    ",
            styles: ["\n        .scrollable {\n          width: 100%;\n          overflow-x: hidden;\n          overflow-y: auto;\n        }\n\n        .text-muted {\n          color: #999;\n        }\n\n        .table-fixed {\n          table-layout: fixed;\n        }\n\n        .table {\n          width: 100%;\n          max-width: 100%;\n          background-color: transparent;\n        }\n\n        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,\n        .table > tbody > tr > td, .table > tfoot > tr > td {\n          padding: 8px;\n          line-height: 20px;\n          vertical-align: top;\n        }\n\n        .table > thead > tr > th {\n          vertical-align: bottom;\n          border-bottom: 2px solid #ddd;\n        }\n\n        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {\n          border-top: 0\n        }\n\n        .table > tbody + tbody {\n          border-top: 2px solid #ddd;\n        }\n\n        .table-bordered {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,\n        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {\n          border-bottom-width: 2px;\n        }\n\n        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {\n          background-color: #f9f9f9\n        }\n\n        .no-event-label {\n          font-weight: bold;\n          color: darkgrey;\n          text-align: center;\n        }\n\n        .event-detail-container {\n          border-top: 2px darkgrey solid;\n          margin-top: 262px;\n        }\n\n        .event-detail {\n          cursor: pointer;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n        }\n\n        .monthview-primary-with-event {\n          background-color: #3a87ad;\n          color: white;\n        }\n\n        .monthview-current {\n          background-color: lightgrey;\n        }\n\n        .monthview-selected {\n          background-color: #009900;\n          color: white;\n        }\n\n        .monthview-eventdetail-timecolumn {\n          width: 110px;\n          overflow: hidden;\n        }\n\n        .monthview-datetable th {\n          text-align: center;\n        }\n\n        .monthview-datetable td {\n          cursor: pointer;\n          text-align: center;\n        }\n\n        .monthview-secondary-with-event {\n          background-color: #d9edf7;\n        }\n\n        ::-webkit-scrollbar,\n        *::-webkit-scrollbar {\n          display: none;\n        }\n\n        @media (max-width: 750px) {\n          .table > tbody > tr > td.calendar-hour-column {\n            padding-left: 0;\n            padding-right: 0;\n            vertical-align: middle;\n            line-height: 12px;\n          }\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [calendar_service_1.CalendarService])
    ], MonthViewComponent);
    return MonthViewComponent;
}());
exports.MonthViewComponent = MonthViewComponent;
//# sourceMappingURL=monthview.js.map