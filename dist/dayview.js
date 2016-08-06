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
var DayViewComponent = (function () {
    function DayViewComponent(calendarService) {
        this.calendarService = calendarService;
        this.onRangeChanged = new core_1.EventEmitter(true);
        this.onEventSelected = new core_1.EventEmitter(true);
        this.onTimeSelected = new core_1.EventEmitter(true);
        this.onTitleChanged = new core_1.EventEmitter(true);
        this.inited = false;
        this.views = [];
        this.currentViewIndex = 0;
        this.direction = 0;
        this.slideOption = {
            runCallbacksOnInit: false,
            loop: true
        };
        this.mode = 'day';
    }
    DayViewComponent.prototype.ngOnInit = function () {
        var me = this;
        this.inited = true;
        this.refreshView();
        this.calendarService.currentCalendarDateChangedFromParent$.subscribe(function (currentDate) {
            me.refreshView();
        });
    };
    DayViewComponent.prototype.ngOnChanges = function (changes) {
        if (!this.inited) {
            return;
        }
        var eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
    };
    DayViewComponent.prototype.onSlideChanged = function () {
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
    DayViewComponent.prototype.move = function (direction) {
        if (direction == 0) {
            return;
        }
        this.direction = direction;
        this.calendarService.setCurrentCalendarDate(this.calendarService.getAdjacentCalendarDate(this.mode, direction));
        this.refreshView();
        this.direction = 0;
    };
    DayViewComponent.createDateObjects = function (startTime) {
        var rows = [], time, currentHour = startTime.getHours(), currentDate = startTime.getDate();
        for (var hour = 0; hour < 24; hour += 1) {
            time = new Date(startTime.getTime());
            time.setHours(currentHour + hour);
            time.setDate(currentDate);
            rows.push({
                time: time
            });
        }
        return rows;
    };
    DayViewComponent.prototype.getViewData = function (startTime) {
        return {
            rows: DayViewComponent.createDateObjects(startTime),
            allDayEvents: []
        };
    };
    DayViewComponent.prototype.getRange = function (currentDate) {
        var year = currentDate.getFullYear(), month = currentDate.getMonth(), date = currentDate.getDate(), startTime = new Date(year, month, date), endTime = new Date(year, month, date + 1);
        return {
            startTime: startTime,
            endTime: endTime
        };
    };
    DayViewComponent.prototype.onDataLoaded = function () {
        var eventSource = this.eventSource, hour, len = eventSource ? eventSource.length : 0, startTime = this.range.startTime, endTime = this.range.endTime, timeZoneOffset = -new Date().getTimezoneOffset(), utcStartTime = new Date(startTime.getTime() + timeZoneOffset * 60 * 1000), utcEndTime = new Date(endTime.getTime() + timeZoneOffset * 60 * 1000), currentViewIndex = this.currentViewIndex, rows = this.views[currentViewIndex].rows, allDayEvents = this.views[currentViewIndex].allDayEvents = [], oneHour = 3600000, eps = 0.016, eventSet, normalEventInRange = false;
        for (hour = 0; hour < 24; hour += 1) {
            rows[hour].events = [];
        }
        for (var i = 0; i < len; i += 1) {
            var event = eventSource[i];
            var eventStartTime = new Date(event.startTime);
            var eventEndTime = new Date(event.endTime);
            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                }
                else {
                    allDayEvents.push({
                        event: event
                    });
                }
            }
            else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                }
                else {
                    normalEventInRange = true;
                }
                var timeDifferenceStart;
                if (eventStartTime <= startTime) {
                    timeDifferenceStart = 0;
                }
                else {
                    timeDifferenceStart = (eventStartTime.getTime() - startTime.getTime()) / oneHour;
                }
                var timeDifferenceEnd;
                if (eventEndTime >= endTime) {
                    timeDifferenceEnd = (endTime.getTime() - startTime.getTime()) / oneHour;
                }
                else {
                    timeDifferenceEnd = (eventEndTime.getTime() - startTime.getTime()) / oneHour;
                }
                var startIndex = Math.floor(timeDifferenceStart);
                var endIndex = Math.ceil(timeDifferenceEnd - eps);
                var startOffset = 0;
                var endOffset = 0;
                if (this.hourParts !== 1) {
                    startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                }
                var displayEvent = {
                    event: event,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    startOffset: startOffset,
                    endOffset: endOffset
                };
                eventSet = rows[startIndex].events;
                if (eventSet) {
                    eventSet.push(displayEvent);
                }
                else {
                    eventSet = [];
                    eventSet.push(displayEvent);
                    rows[startIndex].events = eventSet;
                }
            }
        }
        if (normalEventInRange) {
            var orderedEvents = [];
            for (hour = 0; hour < 24; hour += 1) {
                if (rows[hour].events) {
                    rows[hour].events.sort(DayViewComponent.compareEventByStartOffset);
                    orderedEvents = orderedEvents.concat(rows[hour].events);
                }
            }
            if (orderedEvents.length > 0) {
                this.placeEvents(orderedEvents);
            }
        }
    };
    DayViewComponent.prototype.refreshView = function () {
        this.range = this.getRange(this.calendarService.currentCalendarDate);
        var title = this.getTitle();
        this.onTitleChanged.emit(title);
        this.calendarService.populateAdjacentViews(this);
        this.calendarService.rangeChanged(this);
    };
    DayViewComponent.prototype.getTitle = function () {
        var startingDate = this.range.startTime;
        return new common_1.DatePipe().transform(startingDate, this.formatDayTitle);
    };
    DayViewComponent.getISO8601WeekNumber = function (date) {
        var checkDate = new Date(date);
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    DayViewComponent.compareEventByStartOffset = function (eventA, eventB) {
        return eventA.startOffset - eventB.startOffset;
    };
    DayViewComponent.prototype.select = function (selectedTime, events) {
        this.onTimeSelected.emit({ selectedTime: selectedTime, events: events });
    };
    DayViewComponent.prototype.placeEvents = function (orderedEvents) {
        this.calculatePosition(orderedEvents);
        DayViewComponent.calculateWidth(orderedEvents);
    };
    DayViewComponent.prototype.placeAllDayEvents = function (orderedEvents) {
        this.calculatePosition(orderedEvents);
    };
    DayViewComponent.prototype.overlap = function (event1, event2) {
        var earlyEvent = event1, lateEvent = event2;
        if (event1.startIndex > event2.startIndex || (event1.startIndex === event2.startIndex && event1.startOffset > event2.startOffset)) {
            earlyEvent = event2;
            lateEvent = event1;
        }
        if (earlyEvent.endIndex <= lateEvent.startIndex) {
            return false;
        }
        else {
            return !(earlyEvent.endIndex - lateEvent.startIndex === 1 && earlyEvent.endOffset + lateEvent.startOffset > this.hourParts);
        }
    };
    DayViewComponent.prototype.calculatePosition = function (events) {
        var i, j, len = events.length, maxColumn = 0, col, isForbidden = new Array(len);
        for (i = 0; i < len; i += 1) {
            for (col = 0; col < maxColumn; col += 1) {
                isForbidden[col] = false;
            }
            for (j = 0; j < i; j += 1) {
                if (this.overlap(events[i], events[j])) {
                    isForbidden[events[j].position] = true;
                }
            }
            for (col = 0; col < maxColumn; col += 1) {
                if (!isForbidden[col]) {
                    break;
                }
            }
            if (col < maxColumn) {
                events[i].position = col;
            }
            else {
                events[i].position = maxColumn++;
            }
        }
    };
    DayViewComponent.calculateWidth = function (orderedEvents) {
        var cells = new Array(24), event, index, i, j, len, eventCountInCell, currentEventInCell;
        orderedEvents.sort(function (eventA, eventB) {
            return eventB.position - eventA.position;
        });
        for (i = 0; i < 24; i += 1) {
            cells[i] = {
                calculated: false,
                events: []
            };
        }
        len = orderedEvents.length;
        for (i = 0; i < len; i += 1) {
            event = orderedEvents[i];
            index = event.startIndex;
            while (index < event.endIndex) {
                cells[index].events.push(event);
                index += 1;
            }
        }
        i = 0;
        while (i < len) {
            event = orderedEvents[i];
            if (!event.overlapNumber) {
                var overlapNumber = event.position + 1;
                event.overlapNumber = overlapNumber;
                var eventQueue = [event];
                while ((event = eventQueue.shift())) {
                    index = event.startIndex;
                    while (index < event.endIndex) {
                        if (!cells[index].calculated) {
                            cells[index].calculated = true;
                            if (cells[index].events) {
                                eventCountInCell = cells[index].events.length;
                                for (j = 0; j < eventCountInCell; j += 1) {
                                    currentEventInCell = cells[index].events[j];
                                    if (!currentEventInCell.overlapNumber) {
                                        currentEventInCell.overlapNumber = overlapNumber;
                                        eventQueue.push(currentEventInCell);
                                    }
                                }
                            }
                        }
                        index += 1;
                    }
                }
            }
            i += 1;
        }
    };
    DayViewComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    __decorate([
        core_1.ViewChild('daySlider'), 
        __metadata('design:type', ionic_angular_1.Slides)
    ], DayViewComponent.prototype, "slider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DayViewComponent.prototype, "formatHourColumn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DayViewComponent.prototype, "formatDayTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DayViewComponent.prototype, "allDayLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DayViewComponent.prototype, "hourParts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DayViewComponent.prototype, "eventSource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayViewComponent.prototype, "onRangeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayViewComponent.prototype, "onEventSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayViewComponent.prototype, "onTimeSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DayViewComponent.prototype, "onTitleChanged", void 0);
    DayViewComponent = __decorate([
        core_1.Component({
            selector: 'dayview',
            template: "\n        <div class=\"dayview\">\n            <ion-slides #daySlider [options]=\"slideOption\" (ionDidChange)=\"onSlideChanged()\">\n                <ion-slide *ngFor=\"let view of views; let viewIndex=index\">\n                    <div class=\"dayview-allday-table\">\n                        <div class=\"dayview-allday-label\">{{allDayLabel}}</div>\n                        <ion-scroll scrollY=\"true\" zoom=\"false\" class=\"dayview-allday-content-wrapper\">\n                            <table class=\"table table-bordered dayview-allday-content-table\">\n                                <tbody>\n                                <tr>\n                                    <td class=\"calendar-cell\" [ngClass]=\"{'calendar-event-wrap':allDayEvents}\"\n                                        *ngIf=\"viewIndex===currentViewIndex\">\n                                        <div *ngFor=\"let displayEvent of view.allDayEvents; let eventIndex=index\"\n                                             class=\"calendar-event\"\n                                             (click)=\"eventSelected(displayEvent.event)\"\n                                             [ngStyle]=\"{top: 25*eventIndex+'px',width: '100%',height:'25px'}\">\n                                            <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n                                        </div>\n                                    </td>\n                                    <td class=\"calendar-cell\" *ngIf=\"viewIndex!==currentViewIndex\">\n                                    </td>\n                                </tr>\n                                </tbody>\n                            </table>\n                        </ion-scroll>\n                    </div>\n                    <ion-scroll scrollY=\"true\" class=\"dayview-normal-event-container\">\n                        <table class=\"table table-bordered table-fixed dayview-normal-event-table\"\n                               *ngIf=\"viewIndex===currentViewIndex\">\n                            <tbody>\n                            <tr *ngFor=\"let tm of view.rows\">\n                                <td class=\"calendar-hour-column text-center\">\n                                    {{tm.time | date: formatHourColumn}}\n                                </td>\n                                <td class=\"calendar-cell\" (click)=\"select(tm.time, tm.events)\">\n                                    <div [ngClass]=\"{'calendar-event-wrap': tm.events}\" *ngIf=\"tm.events\">\n                                        <div *ngFor=\"let displayEvent of tm.events\" class=\"calendar-event\"\n                                             (click)=\"eventSelected(displayEvent.event)\"\n                                             [ngStyle]=\"{top: (37*displayEvent.startOffset/hourParts)+'px', left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}\">\n                                            <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n                                        </div>\n                                    </div>\n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>\n                        <table class=\"table table-bordered table-fixed dayview-normal-event-table\"\n                               *ngIf=\"viewIndex!==currentViewIndex\">\n                            <tbody>\n                            <tr *ngFor=\"let tm of view.rows\">\n                                <td class=\"calendar-hour-column text-center\">\n                                    {{tm.time | date: formatHourColumn}}\n                                </td>\n                                <td class=\"calendar-cell\">\n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>\n                    </ion-scroll>\n                </ion-slide>\n            </ion-slides>\n        </div>\n    ",
            styles: ["\n        .scrollable {\n          width: 100%;\n          overflow-x: hidden;\n          overflow-y: auto;\n        }\n\n        .table-fixed {\n          table-layout: fixed;\n        }\n\n        .table {\n          width: 100%;\n          max-width: 100%;\n          background-color: transparent;\n        }\n\n        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,\n        .table > tbody > tr > td, .table > tfoot > tr > td {\n          padding: 8px;\n          line-height: 20px;\n          vertical-align: top;\n        }\n\n        .table > thead > tr > th {\n          vertical-align: bottom;\n          border-bottom: 2px solid #ddd;\n        }\n\n        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {\n          border-top: 0\n        }\n\n        .table > tbody + tbody {\n          border-top: 2px solid #ddd;\n        }\n\n        .table-bordered {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,\n        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {\n          border-bottom-width: 2px;\n        }\n\n        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {\n          background-color: #f9f9f9\n        }\n\n        .calendar-hour-column {\n          width: 50px;\n          white-space: nowrap;\n        }\n\n        .calendar-event-wrap {\n          position: relative;\n          width: 100%;\n          height: 100%;\n        }\n\n        .calendar-event {\n          position: absolute;\n          padding: 2px;\n          cursor: pointer;\n          z-index: 10000;\n        }\n\n        .calendar-event-inner {\n          overflow: hidden;\n          background-color: #3a87ad;\n          color: white;\n          height: 100%;\n          width: 100%;\n          padding: 2px;\n          line-height: 15px;\n        }\n\n        .calendar-cell {\n          padding: 0 !important;\n          height: 37px;\n        }\n\n        .dayview-allday-label {\n          float: left;\n          height: 100%;\n          line-height: 50px;\n          text-align: center;\n          width: 50px;\n        }\n\n        .dayview-allday-content-wrapper {\n          margin-left: 50px;\n          overflow: hidden;\n          height: 51px;\n        }\n\n        .dayview-allday-content-table {\n          min-height: 50px;\n        }\n\n        .dayview-allday-content-table td {\n          border-left: 1px solid #ddd;\n          border-right: 1px solid #ddd;\n        }\n\n        .dayview {\n          height: 100%;\n        }\n\n        .dayview-allday-table {\n          height: 50px;\n          position: relative;\n          border-bottom: 1px solid #ddd;\n          font-size: 14px;\n        }\n\n        .dayview-normal-event-container {\n          margin-top: 50px;\n          overflow: hidden;\n          left: 0;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          position: absolute;\n          font-size: 14px;\n        }\n\n        .dayview .slide-zoom {\n          height: 100%;\n        }\n\n        .dayview-allday-content-wrapper scroll-content {\n          width: 100%;\n        }\n\n        ::-webkit-scrollbar,\n        *::-webkit-scrollbar {\n          display: none;\n        }\n\n        .table > tbody > tr > td.calendar-hour-column {\n          padding-left: 0;\n          padding-right: 0;\n          vertical-align: middle;\n        }\n\n        @media (max-width: 750px) {\n          .dayview-allday-label, .calendar-hour-column {\n            width: 31px;\n            font-size: 12px;\n          }\n\n          .dayview-allday-label {\n            padding-top: 4px;\n          }\n\n          .table > tbody > tr > td.calendar-hour-column {\n            padding-left: 0;\n            padding-right: 0;\n            vertical-align: middle;\n            line-height: 12px;\n          }\n\n          .dayview-allday-label {\n            line-height: 20px;\n          }\n\n          .dayview-allday-content-wrapper {\n            margin-left: 31px;\n          }\n\n          .calendar-event-inner {\n            font-size: 12px;\n          }\n        }\n    "],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [calendar_service_1.CalendarService])
    ], DayViewComponent);
    return DayViewComponent;
}());
exports.DayViewComponent = DayViewComponent;
//# sourceMappingURL=dayview.js.map