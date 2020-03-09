import { Component, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { CalendarService } from './calendar.service';
import * as i0 from "@angular/core";
import * as i1 from "./calendar.service";
function CalendarComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    var view_r23 = ctx.view;
    var row_r24 = ctx.row;
    var col_r25 = ctx.col;
    i0.ɵɵtextInterpolate1(" ", view_r23.dates[row_r24 * 7 + col_r25].label, " ");
} }
function CalendarComponent_ng_template_2_ion_list_0_ion_item_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var event_r32 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(2, 2, event_r32.startTime, "HH:mm"), " - ", i0.ɵɵpipeBind2(3, 5, event_r32.endTime, "HH:mm"), " ");
} }
function CalendarComponent_ng_template_2_ion_list_0_ion_item_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r34 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r34.allDayLabel);
} }
function CalendarComponent_ng_template_2_ion_list_0_ion_item_1_Template(rf, ctx) { if (rf & 1) {
    var _r37 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-item", 18);
    i0.ɵɵlistener("click", function CalendarComponent_ng_template_2_ion_list_0_ion_item_1_Template_ion_item_click_0_listener() { i0.ɵɵrestoreView(_r37); var event_r32 = ctx.$implicit; var ctx_r36 = i0.ɵɵnextContext(3); return ctx_r36.eventSelected(event_r32); });
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_2_ion_list_0_ion_item_1_span_1_Template, 4, 8, "span", 19);
    i0.ɵɵtemplate(2, CalendarComponent_ng_template_2_ion_list_0_ion_item_1_span_2_Template, 2, 1, "span", 19);
    i0.ɵɵelementStart(3, "span", 20);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var event_r32 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !event_r32.allDay);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", event_r32.allDay);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" | ", event_r32.title, "");
} }
function CalendarComponent_ng_template_2_ion_list_0_ion_item_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ion-item");
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var noEventsLabel_r28 = i0.ɵɵnextContext(2).noEventsLabel;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(noEventsLabel_r28);
} }
function CalendarComponent_ng_template_2_ion_list_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ion-list", 15);
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_2_ion_list_0_ion_item_1_Template, 5, 3, "ion-item", 16);
    i0.ɵɵtemplate(2, CalendarComponent_ng_template_2_ion_list_0_ion_item_2_Template, 3, 1, "ion-item", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var selectedDate_r27 = i0.ɵɵnextContext().selectedDate;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", selectedDate_r27 == null ? null : selectedDate_r27.events);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (selectedDate_r27 == null ? null : selectedDate_r27.events.length) == 0);
} }
function CalendarComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CalendarComponent_ng_template_2_ion_list_0_Template, 3, 2, "ion-list", 14);
} if (rf & 2) {
    var showEventDetail_r26 = ctx.showEventDetail;
    i0.ɵɵproperty("ngIf", showEventDetail_r26);
} }
function CalendarComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    var viewDate_r40 = ctx.viewDate;
    i0.ɵɵtextInterpolate1(" ", viewDate_r40.dayHeader, " ");
} }
function CalendarComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var displayEvent_r41 = ctx.displayEvent;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(displayEvent_r41.event.title);
} }
function CalendarComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var displayEvent_r42 = ctx.displayEvent;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(displayEvent_r42.event.title);
} }
function CalendarComponent_ng_template_10_div_0_div_1_ng_template_1_Template(rf, ctx) { }
var _c0 = function (a0, a1) { return { top: a0, width: a1, height: "25px" }; };
var _c1 = function (a0) { return { displayEvent: a0 }; };
function CalendarComponent_ng_template_10_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    var _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function CalendarComponent_ng_template_10_div_0_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r50); var displayEvent_r47 = ctx.$implicit; var ctx_r49 = i0.ɵɵnextContext(3); return ctx_r49.eventSelected(displayEvent_r47.event); });
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_10_div_0_div_1_ng_template_1_Template, 0, 0, "ng-template", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var displayEvent_r47 = ctx.$implicit;
    var eventTemplate_r44 = i0.ɵɵnextContext(2).eventTemplate;
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(3, _c0, 25 * displayEvent_r47.position + "px", 100 * (displayEvent_r47.endIndex - displayEvent_r47.startIndex) + "%"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", eventTemplate_r44)("ngTemplateOutletContext", i0.ɵɵpureFunction1(6, _c1, displayEvent_r47));
} }
var _c2 = function (a0) { return { "calendar-event-wrap": a0 }; };
var _c3 = function (a0) { return { height: a0 }; };
function CalendarComponent_ng_template_10_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_10_div_0_div_1_Template, 2, 8, "div", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var day_r43 = i0.ɵɵnextContext().day;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c2, day_r43.events))("ngStyle", i0.ɵɵpureFunction1(5, _c3, 25 * day_r43.events.length + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", day_r43.events);
} }
function CalendarComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CalendarComponent_ng_template_10_div_0_Template, 2, 7, "div", 24);
} if (rf & 2) {
    var day_r43 = ctx.day;
    i0.ɵɵproperty("ngIf", day_r43.events);
} }
function CalendarComponent_ng_template_12_div_0_ng_template_1_Template(rf, ctx) { }
var _c4 = function (a0) { return { top: a0, width: "100%", height: "25px" }; };
function CalendarComponent_ng_template_12_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r60 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function CalendarComponent_ng_template_12_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r60); var displayEvent_r56 = ctx.$implicit; var ctx_r59 = i0.ɵɵnextContext(2); return ctx_r59.eventSelected(displayEvent_r56.event); });
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_12_div_0_ng_template_1_Template, 0, 0, "ng-template", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var displayEvent_r56 = ctx.$implicit;
    var eventIndex_r57 = ctx.index;
    var eventTemplate_r54 = i0.ɵɵnextContext().eventTemplate;
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(3, _c4, 25 * eventIndex_r57 + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", eventTemplate_r54)("ngTemplateOutletContext", i0.ɵɵpureFunction1(5, _c1, displayEvent_r56));
} }
function CalendarComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CalendarComponent_ng_template_12_div_0_Template, 2, 7, "div", 26);
} if (rf & 2) {
    var allDayEvents_r53 = ctx.allDayEvents;
    i0.ɵɵproperty("ngForOf", allDayEvents_r53);
} }
function CalendarComponent_ng_template_14_div_0_div_1_ng_template_1_Template(rf, ctx) { }
var _c5 = function (a0, a1, a2, a3) { return { top: a0, left: a1, width: a2, height: a3 }; };
function CalendarComponent_ng_template_14_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    var _r70 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵlistener("click", function CalendarComponent_ng_template_14_div_0_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r70); var displayEvent_r67 = ctx.$implicit; var ctx_r69 = i0.ɵɵnextContext(3); return ctx_r69.eventSelected(displayEvent_r67.event); });
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_14_div_0_div_1_ng_template_1_Template, 0, 0, "ng-template", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var displayEvent_r67 = ctx.$implicit;
    var ctx_r71 = i0.ɵɵnextContext(2);
    var hourParts_r63 = ctx_r71.hourParts;
    var eventTemplate_r64 = ctx_r71.eventTemplate;
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction4(3, _c5, 37 * displayEvent_r67.startOffset / hourParts_r63 + "px", 100 / displayEvent_r67.overlapNumber * displayEvent_r67.position + "%", 100 / displayEvent_r67.overlapNumber + "%", 37 * (displayEvent_r67.endIndex - displayEvent_r67.startIndex - (displayEvent_r67.endOffset + displayEvent_r67.startOffset) / hourParts_r63) + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", eventTemplate_r64)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c1, displayEvent_r67));
} }
function CalendarComponent_ng_template_14_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtemplate(1, CalendarComponent_ng_template_14_div_0_div_1_Template, 2, 10, "div", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var tm_r62 = i0.ɵɵnextContext().tm;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c2, tm_r62.events));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", tm_r62.events);
} }
function CalendarComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CalendarComponent_ng_template_14_div_0_Template, 2, 4, "div", 29);
} if (rf & 2) {
    var tm_r62 = ctx.tm;
    i0.ɵɵproperty("ngIf", tm_r62.events);
} }
function CalendarComponent_ng_template_16_Template(rf, ctx) { }
function CalendarComponent_ng_template_18_Template(rf, ctx) { }
function CalendarComponent_monthview_21_Template(rf, ctx) { if (rf & 1) {
    var _r74 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "monthview", 31);
    i0.ɵɵlistener("onRangeChanged", function CalendarComponent_monthview_21_Template_monthview_onRangeChanged_0_listener($event) { i0.ɵɵrestoreView(_r74); var ctx_r73 = i0.ɵɵnextContext(); return ctx_r73.rangeChanged($event); })("onEventSelected", function CalendarComponent_monthview_21_Template_monthview_onEventSelected_0_listener($event) { i0.ɵɵrestoreView(_r74); var ctx_r75 = i0.ɵɵnextContext(); return ctx_r75.eventSelected($event); })("onTimeSelected", function CalendarComponent_monthview_21_Template_monthview_onTimeSelected_0_listener($event) { i0.ɵɵrestoreView(_r74); var ctx_r76 = i0.ɵɵnextContext(); return ctx_r76.timeSelected($event); })("onTitleChanged", function CalendarComponent_monthview_21_Template_monthview_onTitleChanged_0_listener($event) { i0.ɵɵrestoreView(_r74); var ctx_r77 = i0.ɵɵnextContext(); return ctx_r77.titleChanged($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r20 = i0.ɵɵnextContext();
    var _r0 = i0.ɵɵreference(1);
    var _r2 = i0.ɵɵreference(3);
    i0.ɵɵproperty("formatDay", ctx_r20.formatDay)("formatDayHeader", ctx_r20.formatDayHeader)("formatMonthTitle", ctx_r20.formatMonthTitle)("startingDayMonth", ctx_r20.startingDayMonth)("showEventDetail", ctx_r20.showEventDetail)("noEventsLabel", ctx_r20.noEventsLabel)("autoSelect", ctx_r20.autoSelect)("eventSource", ctx_r20.eventSource)("markDisabled", ctx_r20.markDisabled)("monthviewDisplayEventTemplate", ctx_r20.monthviewDisplayEventTemplate || _r0)("monthviewInactiveDisplayEventTemplate", ctx_r20.monthviewInactiveDisplayEventTemplate || _r0)("monthviewEventDetailTemplate", ctx_r20.monthviewEventDetailTemplate || _r2)("locale", ctx_r20.locale)("dateFormatter", ctx_r20.dateFormatter)("dir", ctx_r20.dir)("lockSwipeToPrev", ctx_r20.lockSwipeToPrev)("lockSwipes", ctx_r20.lockSwipes)("sliderOptions", ctx_r20.sliderOptions);
} }
function CalendarComponent_weekview_22_Template(rf, ctx) { if (rf & 1) {
    var _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "weekview", 32);
    i0.ɵɵlistener("onRangeChanged", function CalendarComponent_weekview_22_Template_weekview_onRangeChanged_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r78 = i0.ɵɵnextContext(); return ctx_r78.rangeChanged($event); })("onEventSelected", function CalendarComponent_weekview_22_Template_weekview_onEventSelected_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r80 = i0.ɵɵnextContext(); return ctx_r80.eventSelected($event); })("onTimeSelected", function CalendarComponent_weekview_22_Template_weekview_onTimeSelected_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r81 = i0.ɵɵnextContext(); return ctx_r81.timeSelected($event); })("onTitleChanged", function CalendarComponent_weekview_22_Template_weekview_onTitleChanged_0_listener($event) { i0.ɵɵrestoreView(_r79); var ctx_r82 = i0.ɵɵnextContext(); return ctx_r82.titleChanged($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r21 = i0.ɵɵnextContext();
    var _r4 = i0.ɵɵreference(5);
    var _r6 = i0.ɵɵreference(7);
    var _r8 = i0.ɵɵreference(9);
    var _r10 = i0.ɵɵreference(11);
    var _r14 = i0.ɵɵreference(15);
    var _r16 = i0.ɵɵreference(17);
    var _r18 = i0.ɵɵreference(19);
    i0.ɵɵproperty("formatWeekTitle", ctx_r21.formatWeekTitle)("formatWeekViewDayHeader", ctx_r21.formatWeekViewDayHeader)("formatHourColumn", ctx_r21.formatHourColumn)("startingDayWeek", ctx_r21.startingDayWeek)("allDayLabel", ctx_r21.allDayLabel)("hourParts", ctx_r21.hourParts)("autoSelect", ctx_r21.autoSelect)("hourSegments", ctx_r21.hourSegments)("eventSource", ctx_r21.eventSource)("markDisabled", ctx_r21.markDisabled)("weekviewHeaderTemplate", ctx_r21.weekviewHeaderTemplate || _r4)("weekviewAllDayEventTemplate", ctx_r21.weekviewAllDayEventTemplate || _r6)("weekviewNormalEventTemplate", ctx_r21.weekviewNormalEventTemplate || _r8)("weekviewAllDayEventSectionTemplate", ctx_r21.weekviewAllDayEventSectionTemplate || _r10)("weekviewNormalEventSectionTemplate", ctx_r21.weekviewNormalEventSectionTemplate || _r14)("weekviewInactiveAllDayEventSectionTemplate", ctx_r21.weekviewInactiveAllDayEventSectionTemplate || _r16)("weekviewInactiveNormalEventSectionTemplate", ctx_r21.weekviewInactiveNormalEventSectionTemplate || _r18)("locale", ctx_r21.locale)("dateFormatter", ctx_r21.dateFormatter)("dir", ctx_r21.dir)("scrollToHour", ctx_r21.scrollToHour)("preserveScrollPosition", ctx_r21.preserveScrollPosition)("lockSwipeToPrev", ctx_r21.lockSwipeToPrev)("lockSwipes", ctx_r21.lockSwipes)("startHour", ctx_r21.startHour)("endHour", ctx_r21.endHour)("sliderOptions", ctx_r21.sliderOptions);
} }
function CalendarComponent_dayview_23_Template(rf, ctx) { if (rf & 1) {
    var _r84 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "dayview", 33);
    i0.ɵɵlistener("onRangeChanged", function CalendarComponent_dayview_23_Template_dayview_onRangeChanged_0_listener($event) { i0.ɵɵrestoreView(_r84); var ctx_r83 = i0.ɵɵnextContext(); return ctx_r83.rangeChanged($event); })("onEventSelected", function CalendarComponent_dayview_23_Template_dayview_onEventSelected_0_listener($event) { i0.ɵɵrestoreView(_r84); var ctx_r85 = i0.ɵɵnextContext(); return ctx_r85.eventSelected($event); })("onTimeSelected", function CalendarComponent_dayview_23_Template_dayview_onTimeSelected_0_listener($event) { i0.ɵɵrestoreView(_r84); var ctx_r86 = i0.ɵɵnextContext(); return ctx_r86.timeSelected($event); })("onTitleChanged", function CalendarComponent_dayview_23_Template_dayview_onTitleChanged_0_listener($event) { i0.ɵɵrestoreView(_r84); var ctx_r87 = i0.ɵɵnextContext(); return ctx_r87.titleChanged($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r22 = i0.ɵɵnextContext();
    var _r6 = i0.ɵɵreference(7);
    var _r8 = i0.ɵɵreference(9);
    var _r12 = i0.ɵɵreference(13);
    var _r14 = i0.ɵɵreference(15);
    var _r16 = i0.ɵɵreference(17);
    var _r18 = i0.ɵɵreference(19);
    i0.ɵɵproperty("formatDayTitle", ctx_r22.formatDayTitle)("formatHourColumn", ctx_r22.formatHourColumn)("allDayLabel", ctx_r22.allDayLabel)("hourParts", ctx_r22.hourParts)("hourSegments", ctx_r22.hourSegments)("eventSource", ctx_r22.eventSource)("markDisabled", ctx_r22.markDisabled)("dayviewAllDayEventTemplate", ctx_r22.dayviewAllDayEventTemplate || _r6)("dayviewNormalEventTemplate", ctx_r22.dayviewNormalEventTemplate || _r8)("dayviewAllDayEventSectionTemplate", ctx_r22.dayviewAllDayEventSectionTemplate || _r12)("dayviewNormalEventSectionTemplate", ctx_r22.dayviewNormalEventSectionTemplate || _r14)("dayviewInactiveAllDayEventSectionTemplate", ctx_r22.dayviewInactiveAllDayEventSectionTemplate || _r16)("dayviewInactiveNormalEventSectionTemplate", ctx_r22.dayviewInactiveNormalEventSectionTemplate || _r18)("locale", ctx_r22.locale)("dateFormatter", ctx_r22.dateFormatter)("dir", ctx_r22.dir)("scrollToHour", ctx_r22.scrollToHour)("preserveScrollPosition", ctx_r22.preserveScrollPosition)("lockSwipeToPrev", ctx_r22.lockSwipeToPrev)("lockSwipes", ctx_r22.lockSwipes)("startHour", ctx_r22.startHour)("endHour", ctx_r22.endHour)("sliderOptions", ctx_r22.sliderOptions);
} }
export var Step;
(function (Step) {
    Step[Step["QuarterHour"] = 15] = "QuarterHour";
    Step[Step["HalfHour"] = 30] = "HalfHour";
    Step[Step["Hour"] = 60] = "Hour";
})(Step || (Step = {}));
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(calendarService, appLocale) {
        this.calendarService = calendarService;
        this.appLocale = appLocale;
        this.eventSource = [];
        this.calendarMode = 'month';
        this.formatDay = 'd';
        this.formatDayHeader = 'EEE';
        this.formatDayTitle = 'MMMM dd, yyyy';
        this.formatWeekTitle = 'MMMM yyyy, \'Week\' w';
        this.formatMonthTitle = 'MMMM yyyy';
        this.formatWeekViewDayHeader = 'EEE d';
        this.formatHourColumn = 'ha';
        this.showEventDetail = true;
        this.startingDayMonth = 0;
        this.startingDayWeek = 0;
        this.allDayLabel = 'all day';
        this.noEventsLabel = 'No Events';
        this.queryMode = 'local';
        this.step = Step.Hour;
        this.timeInterval = 60;
        this.autoSelect = true;
        this.dir = "";
        this.scrollToHour = 0;
        this.preserveScrollPosition = false;
        this.lockSwipeToPrev = false;
        this.lockSwipes = false;
        this.locale = "";
        this.startHour = 0;
        this.endHour = 24;
        this.onCurrentDateChanged = new EventEmitter();
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter();
        this.onTitleChanged = new EventEmitter();
        this.hourParts = 1;
        this.hourSegments = 1;
        this.locale = appLocale;
    }
    Object.defineProperty(CalendarComponent.prototype, "currentDate", {
        get: function () {
            return this._currentDate;
        },
        set: function (val) {
            if (!val) {
                val = new Date();
            }
            this._currentDate = val;
            this.calendarService.setCurrentDate(val, true);
            this.onCurrentDateChanged.emit(this._currentDate);
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.autoSelect) {
            if (this.autoSelect.toString() === 'false') {
                this.autoSelect = false;
            }
            else {
                this.autoSelect = true;
            }
        }
        this.hourSegments = 60 / this.timeInterval;
        this.hourParts = 60 / this.step;
        if (this.hourParts <= this.hourSegments) {
            this.hourParts = 1;
        }
        else {
            this.hourParts = this.hourParts / this.hourSegments;
        }
        this.startHour = parseInt(this.startHour.toString());
        this.endHour = parseInt(this.endHour.toString());
        this.calendarService.queryMode = this.queryMode;
        this.currentDateChangedFromChildrenSubscription = this.calendarService.currentDateChangedFromChildren$.subscribe(function (currentDate) {
            _this._currentDate = currentDate;
            _this.onCurrentDateChanged.emit(currentDate);
        });
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        if (this.currentDateChangedFromChildrenSubscription) {
            this.currentDateChangedFromChildrenSubscription.unsubscribe();
            this.currentDateChangedFromChildrenSubscription = null;
        }
    };
    CalendarComponent.prototype.rangeChanged = function (range) {
        this.onRangeChanged.emit(range);
    };
    CalendarComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    CalendarComponent.prototype.timeSelected = function (timeSelected) {
        this.onTimeSelected.emit(timeSelected);
    };
    CalendarComponent.prototype.titleChanged = function (title) {
        this.onTitleChanged.emit(title);
    };
    CalendarComponent.prototype.loadEvents = function () {
        this.calendarService.loadEvents();
    };
    CalendarComponent.prototype.slideNext = function () {
        this.calendarService.slide(1);
    };
    CalendarComponent.prototype.slidePrev = function () {
        this.calendarService.slide(-1);
    };
    CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(i0.ɵɵdirectiveInject(i1.CalendarService), i0.ɵɵdirectiveInject(LOCALE_ID)); };
    CalendarComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CalendarComponent, selectors: [["calendar"]], inputs: { currentDate: "currentDate", eventSource: "eventSource", calendarMode: "calendarMode", formatDay: "formatDay", formatDayHeader: "formatDayHeader", formatDayTitle: "formatDayTitle", formatWeekTitle: "formatWeekTitle", formatMonthTitle: "formatMonthTitle", formatWeekViewDayHeader: "formatWeekViewDayHeader", formatHourColumn: "formatHourColumn", showEventDetail: "showEventDetail", startingDayMonth: "startingDayMonth", startingDayWeek: "startingDayWeek", allDayLabel: "allDayLabel", noEventsLabel: "noEventsLabel", queryMode: "queryMode", step: "step", timeInterval: "timeInterval", autoSelect: "autoSelect", markDisabled: "markDisabled", monthviewDisplayEventTemplate: "monthviewDisplayEventTemplate", monthviewInactiveDisplayEventTemplate: "monthviewInactiveDisplayEventTemplate", monthviewEventDetailTemplate: "monthviewEventDetailTemplate", weekviewHeaderTemplate: "weekviewHeaderTemplate", weekviewAllDayEventTemplate: "weekviewAllDayEventTemplate", weekviewNormalEventTemplate: "weekviewNormalEventTemplate", dayviewAllDayEventTemplate: "dayviewAllDayEventTemplate", dayviewNormalEventTemplate: "dayviewNormalEventTemplate", weekviewAllDayEventSectionTemplate: "weekviewAllDayEventSectionTemplate", weekviewNormalEventSectionTemplate: "weekviewNormalEventSectionTemplate", dayviewAllDayEventSectionTemplate: "dayviewAllDayEventSectionTemplate", dayviewNormalEventSectionTemplate: "dayviewNormalEventSectionTemplate", weekviewInactiveAllDayEventSectionTemplate: "weekviewInactiveAllDayEventSectionTemplate", weekviewInactiveNormalEventSectionTemplate: "weekviewInactiveNormalEventSectionTemplate", dayviewInactiveAllDayEventSectionTemplate: "dayviewInactiveAllDayEventSectionTemplate", dayviewInactiveNormalEventSectionTemplate: "dayviewInactiveNormalEventSectionTemplate", dateFormatter: "dateFormatter", dir: "dir", scrollToHour: "scrollToHour", preserveScrollPosition: "preserveScrollPosition", lockSwipeToPrev: "lockSwipeToPrev", lockSwipes: "lockSwipes", locale: "locale", startHour: "startHour", endHour: "endHour", sliderOptions: "sliderOptions" }, outputs: { onCurrentDateChanged: "onCurrentDateChanged", onRangeChanged: "onRangeChanged", onEventSelected: "onEventSelected", onTimeSelected: "onTimeSelected", onTitleChanged: "onTitleChanged" }, features: [i0.ɵɵProvidersFeature([CalendarService])], decls: 24, vars: 7, consts: [["monthviewDefaultDisplayEventTemplate", ""], ["monthviewDefaultEventDetailTemplate", ""], ["defaultWeekviewHeaderTemplate", ""], ["defaultAllDayEventTemplate", ""], ["defaultNormalEventTemplate", ""], ["defaultWeekViewAllDayEventSectionTemplate", ""], ["defaultDayViewAllDayEventSectionTemplate", ""], ["defaultNormalEventSectionTemplate", ""], ["defaultInactiveAllDayEventSectionTemplate", ""], ["defaultInactiveNormalEventSectionTemplate", ""], [3, "ngSwitch"], [3, "formatDay", "formatDayHeader", "formatMonthTitle", "startingDayMonth", "showEventDetail", "noEventsLabel", "autoSelect", "eventSource", "markDisabled", "monthviewDisplayEventTemplate", "monthviewInactiveDisplayEventTemplate", "monthviewEventDetailTemplate", "locale", "dateFormatter", "dir", "lockSwipeToPrev", "lockSwipes", "sliderOptions", "onRangeChanged", "onEventSelected", "onTimeSelected", "onTitleChanged", 4, "ngSwitchCase"], [3, "formatWeekTitle", "formatWeekViewDayHeader", "formatHourColumn", "startingDayWeek", "allDayLabel", "hourParts", "autoSelect", "hourSegments", "eventSource", "markDisabled", "weekviewHeaderTemplate", "weekviewAllDayEventTemplate", "weekviewNormalEventTemplate", "weekviewAllDayEventSectionTemplate", "weekviewNormalEventSectionTemplate", "weekviewInactiveAllDayEventSectionTemplate", "weekviewInactiveNormalEventSectionTemplate", "locale", "dateFormatter", "dir", "scrollToHour", "preserveScrollPosition", "lockSwipeToPrev", "lockSwipes", "startHour", "endHour", "sliderOptions", "onRangeChanged", "onEventSelected", "onTimeSelected", "onTitleChanged", 4, "ngSwitchCase"], [3, "formatDayTitle", "formatHourColumn", "allDayLabel", "hourParts", "hourSegments", "eventSource", "markDisabled", "dayviewAllDayEventTemplate", "dayviewNormalEventTemplate", "dayviewAllDayEventSectionTemplate", "dayviewNormalEventSectionTemplate", "dayviewInactiveAllDayEventSectionTemplate", "dayviewInactiveNormalEventSectionTemplate", "locale", "dateFormatter", "dir", "scrollToHour", "preserveScrollPosition", "lockSwipeToPrev", "lockSwipes", "startHour", "endHour", "sliderOptions", "onRangeChanged", "onEventSelected", "onTimeSelected", "onTitleChanged", 4, "ngSwitchCase"], ["class", "event-detail-container", "has-bouncing", "false", "overflow-scroll", "false", 4, "ngIf"], ["has-bouncing", "false", "overflow-scroll", "false", 1, "event-detail-container"], [3, "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "click"], ["class", "monthview-eventdetail-timecolumn", 4, "ngIf"], [1, "event-detail"], [1, "monthview-eventdetail-timecolumn"], [1, "no-events-label"], [1, "calendar-event-inner"], [3, "ngClass", "ngStyle", 4, "ngIf"], [3, "ngClass", "ngStyle"], ["class", "calendar-event", "tappable", "", 3, "ngStyle", "click", 4, "ngFor", "ngForOf"], ["tappable", "", 1, "calendar-event", 3, "ngStyle", "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"], [3, "formatDay", "formatDayHeader", "formatMonthTitle", "startingDayMonth", "showEventDetail", "noEventsLabel", "autoSelect", "eventSource", "markDisabled", "monthviewDisplayEventTemplate", "monthviewInactiveDisplayEventTemplate", "monthviewEventDetailTemplate", "locale", "dateFormatter", "dir", "lockSwipeToPrev", "lockSwipes", "sliderOptions", "onRangeChanged", "onEventSelected", "onTimeSelected", "onTitleChanged"], [3, "formatWeekTitle", "formatWeekViewDayHeader", "formatHourColumn", "startingDayWeek", "allDayLabel", "hourParts", "autoSelect", "hourSegments", "eventSource", "markDisabled", "weekviewHeaderTemplate", "weekviewAllDayEventTemplate", "weekviewNormalEventTemplate", "weekviewAllDayEventSectionTemplate", "weekviewNormalEventSectionTemplate", "weekviewInactiveAllDayEventSectionTemplate", "weekviewInactiveNormalEventSectionTemplate", "locale", "dateFormatter", "dir", "scrollToHour", "preserveScrollPosition", "lockSwipeToPrev", "lockSwipes", "startHour", "endHour", "sliderOptions", "onRangeChanged", "onEventSelected", "onTimeSelected", "onTitleChanged"], [3, "formatDayTitle", "formatHourColumn", "allDayLabel", "hourParts", "hourSegments", "eventSource", "markDisabled", "dayviewAllDayEventTemplate", "dayviewNormalEventTemplate", "dayviewAllDayEventSectionTemplate", "dayviewNormalEventSectionTemplate", "dayviewInactiveAllDayEventSectionTemplate", "dayviewInactiveNormalEventSectionTemplate", "locale", "dateFormatter", "dir", "scrollToHour", "preserveScrollPosition", "lockSwipeToPrev", "lockSwipes", "startHour", "endHour", "sliderOptions", "onRangeChanged", "onEventSelected", "onTimeSelected", "onTitleChanged"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CalendarComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(2, CalendarComponent_ng_template_2_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(4, CalendarComponent_ng_template_4_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(6, CalendarComponent_ng_template_6_Template, 2, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(8, CalendarComponent_ng_template_8_Template, 2, 1, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(10, CalendarComponent_ng_template_10_Template, 1, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(12, CalendarComponent_ng_template_12_Template, 1, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(14, CalendarComponent_ng_template_14_Template, 1, 1, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(16, CalendarComponent_ng_template_16_Template, 0, 0, "ng-template", null, 8, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(18, CalendarComponent_ng_template_18_Template, 0, 0, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(20, "div", 10);
            i0.ɵɵtemplate(21, CalendarComponent_monthview_21_Template, 1, 18, "monthview", 11);
            i0.ɵɵtemplate(22, CalendarComponent_weekview_22_Template, 1, 27, "weekview", 12);
            i0.ɵɵtemplate(23, CalendarComponent_dayview_23_Template, 1, 23, "dayview", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵclassMapInterpolate1("", ctx.calendarMode, "view-container");
            i0.ɵɵproperty("ngSwitch", ctx.calendarMode);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "month");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "week");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "day");
        } }, styles: ["[_nghost-%COMP%]    > div[_ngcontent-%COMP%] { height: 100%; }\n\n        .event-detail-container[_ngcontent-%COMP%] {\n          border-top: 2px darkgrey solid;\n        }\n\n        .no-events-label[_ngcontent-%COMP%] {\n          font-weight: bold;\n          color: darkgrey;\n          text-align: center;\n        }\n\n        .event-detail[_ngcontent-%COMP%] {\n          cursor: pointer;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n        }\n\n        .monthview-eventdetail-timecolumn[_ngcontent-%COMP%] {\n          width: 110px;\n          overflow: hidden;\n        }\n\n        .calendar-event-inner[_ngcontent-%COMP%] {\n          overflow: hidden;\n          background-color: #3a87ad;\n          color: white;\n          height: 100%;\n          width: 100%;\n          padding: 2px;\n          line-height: 15px;\n          text-align: initial;\n        }\n\n        @media (max-width: 750px) {\n          .calendar-event-inner[_ngcontent-%COMP%] {\n            font-size: 12px;\n          }\n        }"] });
    return CalendarComponent;
}());
export { CalendarComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CalendarComponent, [{
        type: Component,
        args: [{
                selector: 'calendar',
                template: "\n        <ng-template #monthviewDefaultDisplayEventTemplate let-view=\"view\" let-row=\"row\" let-col=\"col\">\n            {{view.dates[row*7+col].label}}\n        </ng-template>\n        <ng-template #monthviewDefaultEventDetailTemplate let-showEventDetail=\"showEventDetail\" let-selectedDate=\"selectedDate\" let-noEventsLabel=\"noEventsLabel\">\n            <ion-list class=\"event-detail-container\" has-bouncing=\"false\" *ngIf=\"showEventDetail\" overflow-scroll=\"false\">\n                <ion-item *ngFor=\"let event of selectedDate?.events\" (click)=\"eventSelected(event)\">\n                        <span *ngIf=\"!event.allDay\" class=\"monthview-eventdetail-timecolumn\">{{event.startTime|date: 'HH:mm'}}\n                            -\n                            {{event.endTime|date: 'HH:mm'}}\n                        </span>\n                    <span *ngIf=\"event.allDay\" class=\"monthview-eventdetail-timecolumn\">{{allDayLabel}}</span>\n                    <span class=\"event-detail\">  |  {{event.title}}</span>\n                </ion-item>\n                <ion-item *ngIf=\"selectedDate?.events.length==0\">\n                    <div class=\"no-events-label\">{{noEventsLabel}}</div>\n                </ion-item>\n            </ion-list>\n        </ng-template>\n        <ng-template #defaultWeekviewHeaderTemplate let-viewDate=\"viewDate\">\n            {{ viewDate.dayHeader }}\n        </ng-template>\n        <ng-template #defaultAllDayEventTemplate let-displayEvent=\"displayEvent\">\n            <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n        </ng-template>\n        <ng-template #defaultNormalEventTemplate let-displayEvent=\"displayEvent\">\n            <div class=\"calendar-event-inner\">{{displayEvent.event.title}}</div>\n        </ng-template>\n        <ng-template #defaultWeekViewAllDayEventSectionTemplate let-day=\"day\" let-eventTemplate=\"eventTemplate\">\n            <div [ngClass]=\"{'calendar-event-wrap': day.events}\" *ngIf=\"day.events\"\n                 [ngStyle]=\"{height: 25*day.events.length+'px'}\">\n                <div *ngFor=\"let displayEvent of day.events\" class=\"calendar-event\" tappable\n                     (click)=\"eventSelected(displayEvent.event)\"\n                     [ngStyle]=\"{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}\">\n                    <ng-template [ngTemplateOutlet]=\"eventTemplate\"\n                                 [ngTemplateOutletContext]=\"{displayEvent:displayEvent}\">\n                    </ng-template>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template #defaultDayViewAllDayEventSectionTemplate let-allDayEvents=\"allDayEvents\" let-eventTemplate=\"eventTemplate\">\n            <div *ngFor=\"let displayEvent of allDayEvents; let eventIndex=index\"\n                 class=\"calendar-event\" tappable\n                 (click)=\"eventSelected(displayEvent.event)\"\n                 [ngStyle]=\"{top: 25*eventIndex+'px',width: '100%',height:'25px'}\">\n                <ng-template [ngTemplateOutlet]=\"eventTemplate\"\n                             [ngTemplateOutletContext]=\"{displayEvent:displayEvent}\">\n                </ng-template>\n            </div>\n        </ng-template>\n        <ng-template #defaultNormalEventSectionTemplate let-tm=\"tm\" let-hourParts=\"hourParts\" let-eventTemplate=\"eventTemplate\">\n            <div [ngClass]=\"{'calendar-event-wrap': tm.events}\" *ngIf=\"tm.events\">\n                <div *ngFor=\"let displayEvent of tm.events\" class=\"calendar-event\" tappable\n                     (click)=\"eventSelected(displayEvent.event)\"\n                     [ngStyle]=\"{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}\">\n                    <ng-template [ngTemplateOutlet]=\"eventTemplate\"\n                                 [ngTemplateOutletContext]=\"{displayEvent:displayEvent}\">\n                    </ng-template>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template #defaultInactiveAllDayEventSectionTemplate>\n        </ng-template>\n        <ng-template #defaultInactiveNormalEventSectionTemplate>\n        </ng-template>\n\n        <div [ngSwitch]=\"calendarMode\" class=\"{{calendarMode}}view-container\">\n            <monthview *ngSwitchCase=\"'month'\"\n                [formatDay]=\"formatDay\"\n                [formatDayHeader]=\"formatDayHeader\"\n                [formatMonthTitle]=\"formatMonthTitle\"\n                [startingDayMonth]=\"startingDayMonth\"\n                [showEventDetail]=\"showEventDetail\"\n                [noEventsLabel]=\"noEventsLabel\"\n                [autoSelect]=\"autoSelect\"\n                [eventSource]=\"eventSource\"\n                [markDisabled]=\"markDisabled\"\n                [monthviewDisplayEventTemplate]=\"monthviewDisplayEventTemplate||monthviewDefaultDisplayEventTemplate\"\n                [monthviewInactiveDisplayEventTemplate]=\"monthviewInactiveDisplayEventTemplate||monthviewDefaultDisplayEventTemplate\"\n                [monthviewEventDetailTemplate]=\"monthviewEventDetailTemplate||monthviewDefaultEventDetailTemplate\"\n                [locale]=\"locale\"\n                [dateFormatter]=\"dateFormatter\"\n                [dir]=\"dir\"\n                [lockSwipeToPrev]=\"lockSwipeToPrev\"\n                [lockSwipes]=\"lockSwipes\"\n                [sliderOptions]=\"sliderOptions\"\n                (onRangeChanged)=\"rangeChanged($event)\"\n                (onEventSelected)=\"eventSelected($event)\"\n                (onTimeSelected)=\"timeSelected($event)\"\n                (onTitleChanged)=\"titleChanged($event)\">\n            </monthview>\n            <weekview *ngSwitchCase=\"'week'\"\n                [formatWeekTitle]=\"formatWeekTitle\"\n                [formatWeekViewDayHeader]=\"formatWeekViewDayHeader\"\n                [formatHourColumn]=\"formatHourColumn\"\n                [startingDayWeek]=\"startingDayWeek\"\n                [allDayLabel]=\"allDayLabel\"\n                [hourParts]=\"hourParts\"\n                [autoSelect]=\"autoSelect\"\n                [hourSegments]=\"hourSegments\"\n                [eventSource]=\"eventSource\"\n                [markDisabled]=\"markDisabled\"\n                [weekviewHeaderTemplate]=\"weekviewHeaderTemplate||defaultWeekviewHeaderTemplate\"\n                [weekviewAllDayEventTemplate]=\"weekviewAllDayEventTemplate||defaultAllDayEventTemplate\"\n                [weekviewNormalEventTemplate]=\"weekviewNormalEventTemplate||defaultNormalEventTemplate\"\n                [weekviewAllDayEventSectionTemplate]=\"weekviewAllDayEventSectionTemplate||defaultWeekViewAllDayEventSectionTemplate\"\n                [weekviewNormalEventSectionTemplate]=\"weekviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate\"\n                [weekviewInactiveAllDayEventSectionTemplate]=\"weekviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate\"\n                [weekviewInactiveNormalEventSectionTemplate]=\"weekviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate\"\n                [locale]=\"locale\"\n                [dateFormatter]=\"dateFormatter\"\n                [dir]=\"dir\"\n                [scrollToHour]=\"scrollToHour\"\n                [preserveScrollPosition]=\"preserveScrollPosition\"\n                [lockSwipeToPrev]=\"lockSwipeToPrev\"\n                [lockSwipes]=\"lockSwipes\"\n                [startHour]=\"startHour\"\n                [endHour]=\"endHour\"\n                [sliderOptions]=\"sliderOptions\"\n                (onRangeChanged)=\"rangeChanged($event)\"\n                (onEventSelected)=\"eventSelected($event)\"\n                (onTimeSelected)=\"timeSelected($event)\"\n                (onTitleChanged)=\"titleChanged($event)\">\n            </weekview>\n            <dayview *ngSwitchCase=\"'day'\"\n                [formatDayTitle]=\"formatDayTitle\"\n                [formatHourColumn]=\"formatHourColumn\"\n                [allDayLabel]=\"allDayLabel\"\n                [hourParts]=\"hourParts\"\n                [hourSegments]=\"hourSegments\"\n                [eventSource]=\"eventSource\"\n                [markDisabled]=\"markDisabled\"\n                [dayviewAllDayEventTemplate]=\"dayviewAllDayEventTemplate||defaultAllDayEventTemplate\"\n                [dayviewNormalEventTemplate]=\"dayviewNormalEventTemplate||defaultNormalEventTemplate\"\n                [dayviewAllDayEventSectionTemplate]=\"dayviewAllDayEventSectionTemplate||defaultDayViewAllDayEventSectionTemplate\"\n                [dayviewNormalEventSectionTemplate]=\"dayviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate\"\n                [dayviewInactiveAllDayEventSectionTemplate]=\"dayviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate\"\n                [dayviewInactiveNormalEventSectionTemplate]=\"dayviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate\"\n                [locale]=\"locale\"\n                [dateFormatter]=\"dateFormatter\"\n                [dir]=\"dir\"\n                [scrollToHour]=\"scrollToHour\"\n                [preserveScrollPosition]=\"preserveScrollPosition\"\n                [lockSwipeToPrev]=\"lockSwipeToPrev\"\n                [lockSwipes]=\"lockSwipes\"\n                [startHour]=\"startHour\"\n                [endHour]=\"endHour\"\n                [sliderOptions]=\"sliderOptions\"\n                (onRangeChanged)=\"rangeChanged($event)\"\n                (onEventSelected)=\"eventSelected($event)\"\n                (onTimeSelected)=\"timeSelected($event)\"\n                (onTitleChanged)=\"titleChanged($event)\">\n            </dayview>\n        </div>\n    ",
                styles: ["\n        :host > div { height: 100%; }\n\n        .event-detail-container {\n          border-top: 2px darkgrey solid;\n        }\n\n        .no-events-label {\n          font-weight: bold;\n          color: darkgrey;\n          text-align: center;\n        }\n\n        .event-detail {\n          cursor: pointer;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n        }\n\n        .monthview-eventdetail-timecolumn {\n          width: 110px;\n          overflow: hidden;\n        }\n\n        .calendar-event-inner {\n          overflow: hidden;\n          background-color: #3a87ad;\n          color: white;\n          height: 100%;\n          width: 100%;\n          padding: 2px;\n          line-height: 15px;\n          text-align: initial;\n        }\n\n        @media (max-width: 750px) {\n          .calendar-event-inner {\n            font-size: 12px;\n          }\n        }\n    "],
                providers: [CalendarService]
            }]
    }], function () { return [{ type: i1.CalendarService }, { type: undefined, decorators: [{
                type: Inject,
                args: [LOCALE_ID]
            }] }]; }, { currentDate: [{
            type: Input
        }], eventSource: [{
            type: Input
        }], calendarMode: [{
            type: Input
        }], formatDay: [{
            type: Input
        }], formatDayHeader: [{
            type: Input
        }], formatDayTitle: [{
            type: Input
        }], formatWeekTitle: [{
            type: Input
        }], formatMonthTitle: [{
            type: Input
        }], formatWeekViewDayHeader: [{
            type: Input
        }], formatHourColumn: [{
            type: Input
        }], showEventDetail: [{
            type: Input
        }], startingDayMonth: [{
            type: Input
        }], startingDayWeek: [{
            type: Input
        }], allDayLabel: [{
            type: Input
        }], noEventsLabel: [{
            type: Input
        }], queryMode: [{
            type: Input
        }], step: [{
            type: Input
        }], timeInterval: [{
            type: Input
        }], autoSelect: [{
            type: Input
        }], markDisabled: [{
            type: Input
        }], monthviewDisplayEventTemplate: [{
            type: Input
        }], monthviewInactiveDisplayEventTemplate: [{
            type: Input
        }], monthviewEventDetailTemplate: [{
            type: Input
        }], weekviewHeaderTemplate: [{
            type: Input
        }], weekviewAllDayEventTemplate: [{
            type: Input
        }], weekviewNormalEventTemplate: [{
            type: Input
        }], dayviewAllDayEventTemplate: [{
            type: Input
        }], dayviewNormalEventTemplate: [{
            type: Input
        }], weekviewAllDayEventSectionTemplate: [{
            type: Input
        }], weekviewNormalEventSectionTemplate: [{
            type: Input
        }], dayviewAllDayEventSectionTemplate: [{
            type: Input
        }], dayviewNormalEventSectionTemplate: [{
            type: Input
        }], weekviewInactiveAllDayEventSectionTemplate: [{
            type: Input
        }], weekviewInactiveNormalEventSectionTemplate: [{
            type: Input
        }], dayviewInactiveAllDayEventSectionTemplate: [{
            type: Input
        }], dayviewInactiveNormalEventSectionTemplate: [{
            type: Input
        }], dateFormatter: [{
            type: Input
        }], dir: [{
            type: Input
        }], scrollToHour: [{
            type: Input
        }], preserveScrollPosition: [{
            type: Input
        }], lockSwipeToPrev: [{
            type: Input
        }], lockSwipes: [{
            type: Input
        }], locale: [{
            type: Input
        }], startHour: [{
            type: Input
        }], endHour: [{
            type: Input
        }], sliderOptions: [{
            type: Input
        }], onCurrentDateChanged: [{
            type: Output
        }], onRangeChanged: [{
            type: Output
        }], onEventSelected: [{
            type: Output
        }], onTimeSelected: [{
            type: Output
        }], onTitleChanged: [{
            type: Output
        }] }); })();
