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
var WeekViewComponent = (function () {
    function WeekViewComponent(calendarService) {
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
        this.mode = 'week';
    }
    WeekViewComponent.prototype.ngOnInit = function () {
        var me = this;
        this.inited = true;
        this.refreshView();
        this.calendarService.currentCalendarDateChangedFromParent$.subscribe(function (currentDate) {
            me.refreshView();
        });
    };
    WeekViewComponent.prototype.ngOnChanges = function (changes) {
        if (!this.inited) {
            return;
        }
        var eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
    };
    WeekViewComponent.prototype.onSlideChanged = function () {
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
    WeekViewComponent.prototype.move = function (direction) {
        if (direction == 0) {
            return;
        }
        this.direction = direction;
        this.calendarService.setCurrentCalendarDate(this.calendarService.getAdjacentCalendarDate(this.mode, direction));
        this.refreshView();
        this.direction = 0;
    };
    WeekViewComponent.createDateObjects = function (startTime) {
        var times = [], row, time, currentHour = startTime.getHours(), currentDate = startTime.getDate();
        for (var hour = 0; hour < 24; hour += 1) {
            row = [];
            for (var day = 0; day < 7; day += 1) {
                time = new Date(startTime.getTime());
                time.setHours(currentHour + hour);
                time.setDate(currentDate + day);
                row.push({
                    time: time
                });
            }
            times.push(row);
        }
        return times;
    };
    WeekViewComponent.getDates = function (startTime, n) {
        var dates = new Array(n), current = new Date(startTime), i = 0;
        current.setHours(12);
        while (i < n) {
            dates[i++] = {
                date: new Date(current.getTime())
            };
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };
    WeekViewComponent.prototype.getViewData = function (startTime) {
        return {
            rows: WeekViewComponent.createDateObjects(startTime),
            dates: WeekViewComponent.getDates(startTime, 7)
        };
    };
    WeekViewComponent.prototype.getRange = function (currentDate) {
        var year = currentDate.getFullYear(), month = currentDate.getMonth(), date = currentDate.getDate(), day = currentDate.getDay(), difference = day - this.startingDayWeek, firstDayOfWeek, endTime;
        if (difference < 0) {
            difference += 7;
        }
        firstDayOfWeek = new Date(year, month, date - difference);
        endTime = new Date(year, month, date - difference + 7);
        return {
            startTime: firstDayOfWeek,
            endTime: endTime
        };
    };
    WeekViewComponent.prototype.onDataLoaded = function () {
        var eventSource = this.eventSource, i, day, hour, len = eventSource ? eventSource.length : 0, startTime = this.range.startTime, endTime = this.range.endTime, timeZoneOffset = -new Date().getTimezoneOffset(), utcStartTime = new Date(startTime.getTime() + timeZoneOffset * 60000), utcEndTime = new Date(endTime.getTime() + timeZoneOffset * 60000), currentViewIndex = this.currentViewIndex, rows = this.views[currentViewIndex].rows, dates = this.views[currentViewIndex].dates, oneHour = 3600000, oneDay = 86400000, eps = 0.016, eventSet, allDayEventInRange = false, normalEventInRange = false;
        for (i = 0; i < 7; i += 1) {
            dates[i].events = [];
        }
        for (day = 0; day < 7; day += 1) {
            for (hour = 0; hour < 24; hour += 1) {
                rows[hour][day].events = [];
            }
        }
        for (i = 0; i < len; i += 1) {
            var event = eventSource[i];
            var eventStartTime = new Date(event.startTime);
            var eventEndTime = new Date(event.endTime);
            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                }
                else {
                    allDayEventInRange = true;
                    var allDayStartIndex;
                    if (eventStartTime <= utcStartTime) {
                        allDayStartIndex = 0;
                    }
                    else {
                        allDayStartIndex = Math.floor((eventStartTime.getTime() - utcStartTime.getTime()) / oneDay);
                    }
                    var allDayEndIndex;
                    if (eventEndTime >= utcEndTime) {
                        allDayEndIndex = Math.ceil((utcEndTime.getTime() - utcStartTime.getTime()) / oneDay);
                    }
                    else {
                        allDayEndIndex = Math.ceil((eventEndTime.getTime() - utcStartTime.getTime()) / oneDay);
                    }
                    var displayAllDayEvent = {
                        event: event,
                        startIndex: allDayStartIndex,
                        endIndex: allDayEndIndex
                    };
                    eventSet = dates[allDayStartIndex].events;
                    if (eventSet) {
                        eventSet.push(displayAllDayEvent);
                    }
                    else {
                        eventSet = [];
                        eventSet.push(displayAllDayEvent);
                        dates[allDayStartIndex].events = eventSet;
                    }
                }
            }
            else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                }
                else {
                    normalEventInRange = true;
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
                    var startRowIndex = startIndex % 24;
                    var dayIndex = Math.floor(startIndex / 24);
                    var endOfDay = dayIndex * 24;
                    var endRowIndex;
                    var startOffset = 0;
                    var endOffset = 0;
                    if (this.hourParts !== 1) {
                        startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    }
                    do {
                        endOfDay += 24;
                        if (endOfDay <= endIndex) {
                            endRowIndex = 24;
                        }
                        else {
                            endRowIndex = endIndex % 24;
                            if (this.hourParts !== 1) {
                                endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                            }
                        }
                        var displayEvent = {
                            event: event,
                            startIndex: startRowIndex,
                            endIndex: endRowIndex,
                            startOffset: startOffset,
                            endOffset: endOffset
                        };
                        eventSet = rows[startRowIndex][dayIndex].events;
                        if (eventSet) {
                            eventSet.push(displayEvent);
                        }
                        else {
                            eventSet = [];
                            eventSet.push(displayEvent);
                            rows[startRowIndex][dayIndex].events = eventSet;
                        }
                        startRowIndex = 0;
                        startOffset = 0;
                        dayIndex += 1;
                    } while (endOfDay < endIndex);
                }
            }
        }
        if (normalEventInRange) {
            for (day = 0; day < 7; day += 1) {
                var orderedEvents = [];
                for (hour = 0; hour < 24; hour += 1) {
                    if (rows[hour][day].events) {
                        rows[hour][day].events.sort(WeekViewComponent.compareEventByStartOffset);
                        orderedEvents = orderedEvents.concat(rows[hour][day].events);
                    }
                }
                if (orderedEvents.length > 0) {
                    this.placeEvents(orderedEvents);
                }
            }
        }
        if (allDayEventInRange) {
            var orderedAllDayEvents = [];
            for (day = 0; day < 7; day += 1) {
                if (dates[day].events) {
                    orderedAllDayEvents = orderedAllDayEvents.concat(dates[day].events);
                }
            }
            if (orderedAllDayEvents.length > 0) {
                this.placeAllDayEvents(orderedAllDayEvents);
            }
        }
    };
    WeekViewComponent.prototype.refreshView = function () {
        this.range = this.getRange(this.calendarService.currentCalendarDate);
        var title = this.getTitle();
        this.onTitleChanged.emit(title);
        this.calendarService.populateAdjacentViews(this);
        this.calendarService.rangeChanged(this);
    };
    WeekViewComponent.prototype.getTitle = function () {
        var firstDayOfWeek = this.range.startTime, weekNumberIndex, weekFormatPattern = '$n', title;
        weekNumberIndex = this.formatWeekTitle.indexOf(weekFormatPattern);
        title = new common_1.DatePipe().transform(firstDayOfWeek, this.formatWeekTitle);
        if (weekNumberIndex !== -1) {
            title = title.replace(weekFormatPattern, WeekViewComponent.getISO8601WeekNumber(firstDayOfWeek));
        }
        return title;
    };
    WeekViewComponent.getISO8601WeekNumber = function (date) {
        var checkDate = new Date(date);
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    WeekViewComponent.compareEventByStartOffset = function (eventA, eventB) {
        return eventA.startOffset - eventB.startOffset;
    };
    WeekViewComponent.prototype.select = function (selectedTime, events) {
        this.onTimeSelected.emit({ selectedTime: selectedTime, events: events });
    };
    WeekViewComponent.prototype.placeEvents = function (orderedEvents) {
        this.calculatePosition(orderedEvents);
        WeekViewComponent.calculateWidth(orderedEvents);
    };
    WeekViewComponent.prototype.placeAllDayEvents = function (orderedEvents) {
        this.calculatePosition(orderedEvents);
    };
    WeekViewComponent.prototype.overlap = function (event1, event2) {
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
    WeekViewComponent.prototype.calculatePosition = function (events) {
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
    WeekViewComponent.calculateWidth = function (orderedEvents) {
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
    WeekViewComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    __decorate([
        core_1.ViewChild('weekSlider'), 
        __metadata('design:type', ionic_angular_1.Slides)
    ], WeekViewComponent.prototype, "slider", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WeekViewComponent.prototype, "formatWeekTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WeekViewComponent.prototype, "formatWeekViewDayHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WeekViewComponent.prototype, "formatHourColumn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WeekViewComponent.prototype, "startingDayWeek", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WeekViewComponent.prototype, "allDayLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], WeekViewComponent.prototype, "hourParts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WeekViewComponent.prototype, "eventSource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekViewComponent.prototype, "onRangeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekViewComponent.prototype, "onEventSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekViewComponent.prototype, "onTimeSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeekViewComponent.prototype, "onTitleChanged", void 0);
    WeekViewComponent = __decorate([
        core_1.Component({
            selector: 'weekview',
            template: "\n        <div class=\"weekview\">\n            <ion-slides #weekSlider [options]=\"slideOption\" (ionDidChange)=\"onSlideChanged()\">\n                <ion-slide *ngFor=\"let view of views; let viewIndex=index\">\n                    <table class=\"table table-bordered table-fixed weekview-header\">\n                        <thead>\n                        <tr>\n                            <th class=\"calendar-hour-column\"></th>\n                            <th class=\"weekview-header text-center\" *ngFor=\"let dt of view.dates\">{{dt.date|date:\n                                formatWeekViewDayHeader}}\n                            </th>\n                        </tr>\n                        </thead>\n                    </table>\n                    <!--<div>{{viewIndex}}:{{currentViewIndex}}</div>-->\n                    <div *ngIf=\"viewIndex===currentViewIndex\">\n                        <div class=\"weekview-allday-table\">\n                            <div class=\"weekview-allday-label\">{{allDayLabel}}</div>\n                            <ion-scroll scrollY=\"true\" class=\"weekview-allday-content-wrapper\" zoom=\"false\">\n                                <table class=\"table table-fixed weekview-allday-content-table\">\n                                    <tbody>\n                                    <tr>\n                                        <td *ngFor=\"let day of view.dates\" class=\"calendar-cell\">\n                                            <div [ngClass]=\"{'calendar-event-wrap': day.events}\" *ngIf=\"day.events\"\n                                                 [ngStyle]=\"{height: 25*day.events.length+'px'}\">\n                                                <div *ngFor=\"let displayEvent of day.events\" class=\"calendar-event\"\n                                                     (click)=\"eventSelected(displayEvent.event)\"\n                                                     [ngStyle]=\"{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}\">\n                                                    <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n                                                </div>\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </ion-scroll>\n                        </div>\n                        <ion-scroll scrollY=\"true\" class=\"weekview-normal-event-container\" zoom=\"false\">\n                            <table class=\"table table-bordered table-fixed weekview-normal-event-table\">\n                                <tbody>\n                                <tr *ngFor=\"let row of view.rows\">\n                                    <td class=\"calendar-hour-column text-center\">\n                                        {{row[0].time | date: formatHourColumn}}\n                                    </td>\n                                    <td *ngFor=\"let tm of row\" class=\"calendar-cell\" (click)=\"select(tm.time, tm.events)\">\n                                        <div [ngClass]=\"{'calendar-event-wrap': tm.events}\" *ngIf=\"tm.events\">\n                                            <div *ngFor=\"let displayEvent of tm.events\" class=\"calendar-event\"\n                                                 (click)=\"eventSelected(displayEvent.event)\"\n                                                 [ngStyle]=\"{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}\">\n                                                <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n                                            </div>\n                                        </div>\n                                    </td>\n                                </tr>\n                                </tbody>\n                            </table>\n                        </ion-scroll>\n                    </div>\n                    <div *ngIf=\"viewIndex!==currentViewIndex\">\n                        <div class=\"weekview-allday-table\">\n                            <div class=\"weekview-allday-label\">{{allDayLabel}}</div>\n                            <ion-scroll scrollY=\"true\" class=\"weekview-allday-content-wrapper\" zoom=\"false\">\n                                <table class=\"table table-fixed weekview-allday-content-table\">\n                                    <tbody>\n                                    <tr>\n                                        <td *ngFor=\"let day of views[1].dates\" class=\"calendar-cell\">\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </ion-scroll>\n                        </div>\n                        <ion-scroll scrollY=\"true\" class=\"weekview-normal-event-container\" zoom=\"false\">\n                            <table class=\"table table-bordered table-fixed weekview-normal-event-table\">\n                                <tbody>\n                                <tr *ngFor=\"let row of views[1].rows\">\n                                    <td class=\"calendar-hour-column text-center\">\n                                        {{row[0].time | date: formatHourColumn}}\n                                    </td>\n                                    <td *ngFor=\"let tm of row\" class=\"calendar-cell\">\n                                    </td>\n                                </tr>\n                                </tbody>\n                            </table>\n                        </ion-scroll>\n                    </div>\n                </ion-slide>\n            </ion-slides>\n        </div>\n    ",
            styles: ["\n        .scrollable {\n          width: 100%;\n          overflow-x: hidden;\n          overflow-y: auto;\n        }\n\n        .table-fixed {\n          table-layout: fixed;\n        }\n\n        .table {\n          width: 100%;\n          max-width: 100%;\n          background-color: transparent;\n        }\n\n        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,\n        .table > tbody > tr > td, .table > tfoot > tr > td {\n          padding: 8px;\n          line-height: 20px;\n          vertical-align: top;\n        }\n\n        .table > thead > tr > th {\n          vertical-align: bottom;\n          border-bottom: 2px solid #ddd;\n        }\n\n        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {\n          border-top: 0\n        }\n\n        .table > tbody + tbody {\n          border-top: 2px solid #ddd;\n        }\n\n        .table-bordered {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,\n        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {\n          border-bottom-width: 2px;\n        }\n\n        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {\n          background-color: #f9f9f9\n        }\n\n        .calendar-hour-column {\n          width: 50px;\n          white-space: nowrap;\n        }\n\n        .calendar-event-wrap {\n          position: relative;\n          width: 100%;\n          height: 100%;\n        }\n\n        .calendar-event {\n          position: absolute;\n          padding: 2px;\n          cursor: pointer;\n          z-index: 10000;\n        }\n\n        .calendar-event-inner {\n          overflow: hidden;\n          background-color: #3a87ad;\n          color: white;\n          height: 100%;\n          width: 100%;\n          padding: 2px;\n          line-height: 15px;\n        }\n\n        .calendar-cell {\n          padding: 0 !important;\n          height: 37px;\n        }\n\n        .weekview-allday-label {\n          float: left;\n          height: 100%;\n          line-height: 50px;\n          text-align: center;\n          width: 50px;\n        }\n\n        .weekview-allday-content-wrapper {\n          margin-left: 50px;\n          overflow: hidden;\n          height: 51px;\n        }\n\n        .weekview-allday-content-table {\n          min-height: 50px;\n        }\n\n        .weekview-allday-content-table td {\n          border-left: 1px solid #ddd;\n          border-right: 1px solid #ddd;\n        }\n\n        .weekview {\n          height: 100%;\n        }\n\n        .weekview-header th {\n          overflow: hidden;\n          white-space: nowrap;\n          font-size: 14px;\n        }\n\n        .weekview-allday-table {\n          height: 50px;\n          position: relative;\n          border-bottom: 1px solid #ddd;\n          font-size: 14px;\n        }\n\n        .weekview-normal-event-container {\n          margin-top: 87px;\n          overflow: hidden;\n          left: 0;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          position: absolute;\n          font-size: 14px;\n        }\n\n        .weekview .slide-zoom {\n          height: 100%;\n        }\n\n        .weekview-allday-content-wrapper scroll-content {\n          width: 100%;\n        }\n\n        ::-webkit-scrollbar,\n        *::-webkit-scrollbar {\n          display: none;\n        }\n\n        .table > tbody > tr > td.calendar-hour-column {\n          padding-left: 0;\n          padding-right: 0;\n          vertical-align: middle;\n        }\n\n        @media (max-width: 750px) {\n          .weekview-allday-label, .calendar-hour-column {\n            width: 31px;\n            font-size: 12px;\n          }\n\n          .weekview-allday-label {\n            padding-top: 4px;\n          }\n\n          .table > tbody > tr > td.calendar-hour-column {\n            padding-left: 0;\n            padding-right: 0;\n            vertical-align: middle;\n            line-height: 12px;\n          }\n\n          .table > thead > tr > th.weekview-header {\n            padding-left: 0;\n            padding-right: 0;\n            font-size: 12px;\n          }\n\n          .weekview-allday-label {\n            line-height: 20px;\n          }\n\n          .weekview-allday-content-wrapper {\n            margin-left: 31px;\n          }\n\n          .calendar-event-inner {\n            font-size: 12px;\n          }\n        }\n    "],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [calendar_service_1.CalendarService])
    ], WeekViewComponent);
    return WeekViewComponent;
}());
exports.WeekViewComponent = WeekViewComponent;
//# sourceMappingURL=weekview.js.map