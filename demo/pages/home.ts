import { NavController } from 'ionic-angular/index';
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    templateUrl: "pages/home.html"
})
export class HomePage {
    eventSource;
    viewTitle;

    isToday:boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };

    constructor(private navController:NavController) {

    }

    loadEvents() {
        this.eventSource = this.createRandomEvents();
        // this.eventSource = this.createStaticAllDayEvents();
        //  let eventSource = this.createStaticNormalDayEvents();
        //  let eventSource1 = this.createStaticNormalDayEvents2();
        //  let eventSource2 = this.createStaticNormalDayEvents3();
        //  this.eventSource = eventSource.concat(eventSource1).concat(eventSource2);
        //  this.eventSource = this.createStaticCrossDayEvents();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

    createStaticAllDayEvents() {
        var events = [];
        for (var i = -50; i < 50; i += 1) {
            var date = new Date();
            var startTime;
            var endTime;
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + i));
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + i + 1));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        }

        return events;
    }

    createStaticNormalDayEvents(): any[] {
        var events = [];
        for (var i = -50; i < 50; i += 1) {
            var date = new Date();
            var startTime;
            var endTime;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 0, 0, 0);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 1, 0, 0);
            events.push({
                title: 'Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
        return events;
    }

    createStaticNormalDayEvents2(): any[] {
        var events = [];
        for (var i = -50; i < 50; i += 1) {
            var date = new Date();
            var startTime;
            var endTime;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 12, 0, 0);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 14, 0, 0);
            events.push({
                title: 'Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }

        return events;
    }

    createStaticNormalDayEvents3(): any[] {
        var events = [];
        for (var i = -50; i < 50; i += 1) {
            var date = new Date();
            var startTime;
            var endTime;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 23, 0, 0);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 23, 59, 0);
            events.push({
                title: 'Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }

        return events;
    }

    createStaticCrossDayEvents(): any[] {
        var events = [];
        for (var i = -50; i < 50; i += 1) {
            var date = new Date();
            var startTime;
            var endTime;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i, 20, 0, 0);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i + 1, 11, 0, 0);
            events.push({
                title: 'Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }

        return events;
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
