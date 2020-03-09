import { DatePipe } from '@angular/common';
import { Component, HostBinding, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./calendar.service";
import * as i2 from "@ionic/angular";
import * as i3 from "@angular/common";
import * as i4 from "./init-position-scroll";
const _c0 = ["daySlider"];
function DayViewComponent_td_10_ng_template_1_Template(rf, ctx) { }
const _c1 = function (a0) { return { "calendar-event-wrap": a0 }; };
const _c2 = function (a0) { return { height: a0 }; };
const _c3 = function (a0, a1) { return { allDayEvents: a0, eventTemplate: a1 }; };
function DayViewComponent_td_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtemplate(1, DayViewComponent_td_10_ng_template_1_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r250 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx_r250.views[0].allDayEvents.length > 0))("ngStyle", i0.ɵɵpureFunction1(6, _c2, 25 * ctx_r250.views[0].allDayEvents.length + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r250.dayviewAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(8, _c3, ctx_r250.views[0].allDayEvents, ctx_r250.dayviewAllDayEventTemplate));
} }
function DayViewComponent_td_11_ng_template_1_Template(rf, ctx) { }
const _c4 = function (a0) { return { allDayEvents: a0 }; };
function DayViewComponent_td_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 13);
    i0.ɵɵtemplate(1, DayViewComponent_td_11_ng_template_1_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r251 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r251.dayviewInactiveAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c4, ctx_r251.views[0].allDayEvents));
} }
function DayViewComponent_init_position_scroll_12_tr_3_ng_template_4_Template(rf, ctx) { }
const _c5 = function (a0, a1, a2) { return { tm: a0, hourParts: a1, eventTemplate: a2 }; };
function DayViewComponent_init_position_scroll_12_tr_3_Template(rf, ctx) { if (rf & 1) {
    const _r269 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 18);
    i0.ɵɵlistener("click", function DayViewComponent_init_position_scroll_12_tr_3_Template_td_click_3_listener() { i0.ɵɵrestoreView(_r269); const tm_r265 = ctx.$implicit; const ctx_r268 = i0.ɵɵnextContext(2); return ctx_r268.select(tm_r265.time, tm_r265.events); });
    i0.ɵɵtemplate(4, DayViewComponent_init_position_scroll_12_tr_3_ng_template_4_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r265 = ctx.$implicit;
    const i_r266 = ctx.index;
    const ctx_r264 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r264.hourColumnLabels[i_r266], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r264.dayviewNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(3, _c5, tm_r265, ctx_r264.hourParts, ctx_r264.dayviewNormalEventTemplate));
} }
function DayViewComponent_init_position_scroll_12_Template(rf, ctx) { if (rf & 1) {
    const _r271 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "init-position-scroll", 14);
    i0.ɵɵlistener("onScroll", function DayViewComponent_init_position_scroll_12_Template_init_position_scroll_onScroll_0_listener($event) { i0.ɵɵrestoreView(_r271); const ctx_r270 = i0.ɵɵnextContext(); return ctx_r270.setScrollPosition($event); });
    i0.ɵɵelementStart(1, "table", 15);
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, DayViewComponent_init_position_scroll_12_tr_3_Template, 5, 7, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r252 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initPosition", ctx_r252.initScrollPosition)("emitEvent", ctx_r252.preserveScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r252.views[0].rows);
} }
function DayViewComponent_init_position_scroll_13_tr_3_ng_template_4_Template(rf, ctx) { }
const _c6 = function (a0, a1) { return { tm: a0, hourParts: a1 }; };
function DayViewComponent_init_position_scroll_13_tr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 13);
    i0.ɵɵtemplate(4, DayViewComponent_init_position_scroll_13_tr_3_ng_template_4_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r273 = ctx.$implicit;
    const i_r274 = ctx.index;
    const ctx_r272 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r272.hourColumnLabels[i_r274], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r272.dayviewInactiveNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(3, _c6, tm_r273, ctx_r272.hourParts));
} }
function DayViewComponent_init_position_scroll_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "init-position-scroll", 19);
    i0.ɵɵelementStart(1, "table", 15);
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, DayViewComponent_init_position_scroll_13_tr_3_Template, 5, 6, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r253 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initPosition", ctx_r253.initScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r253.views[0].rows);
} }
function DayViewComponent_td_22_ng_template_1_Template(rf, ctx) { }
function DayViewComponent_td_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtemplate(1, DayViewComponent_td_22_ng_template_1_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r254 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx_r254.views[1].allDayEvents.length > 0))("ngStyle", i0.ɵɵpureFunction1(6, _c2, 25 * ctx_r254.views[1].allDayEvents.length + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r254.dayviewAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(8, _c3, ctx_r254.views[1].allDayEvents, ctx_r254.dayviewAllDayEventTemplate));
} }
function DayViewComponent_td_23_ng_template_1_Template(rf, ctx) { }
function DayViewComponent_td_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 13);
    i0.ɵɵtemplate(1, DayViewComponent_td_23_ng_template_1_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r255 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r255.dayviewInactiveAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c4, ctx_r255.views[1].allDayEvents));
} }
function DayViewComponent_init_position_scroll_24_tr_3_ng_template_4_Template(rf, ctx) { }
function DayViewComponent_init_position_scroll_24_tr_3_Template(rf, ctx) { if (rf & 1) {
    const _r283 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 18);
    i0.ɵɵlistener("click", function DayViewComponent_init_position_scroll_24_tr_3_Template_td_click_3_listener() { i0.ɵɵrestoreView(_r283); const tm_r279 = ctx.$implicit; const ctx_r282 = i0.ɵɵnextContext(2); return ctx_r282.select(tm_r279.time, tm_r279.events); });
    i0.ɵɵtemplate(4, DayViewComponent_init_position_scroll_24_tr_3_ng_template_4_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r279 = ctx.$implicit;
    const i_r280 = ctx.index;
    const ctx_r278 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r278.hourColumnLabels[i_r280], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r278.dayviewNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(3, _c5, tm_r279, ctx_r278.hourParts, ctx_r278.dayviewNormalEventTemplate));
} }
function DayViewComponent_init_position_scroll_24_Template(rf, ctx) { if (rf & 1) {
    const _r285 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "init-position-scroll", 14);
    i0.ɵɵlistener("onScroll", function DayViewComponent_init_position_scroll_24_Template_init_position_scroll_onScroll_0_listener($event) { i0.ɵɵrestoreView(_r285); const ctx_r284 = i0.ɵɵnextContext(); return ctx_r284.setScrollPosition($event); });
    i0.ɵɵelementStart(1, "table", 15);
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, DayViewComponent_init_position_scroll_24_tr_3_Template, 5, 7, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r256 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initPosition", ctx_r256.initScrollPosition)("emitEvent", ctx_r256.preserveScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r256.views[1].rows);
} }
function DayViewComponent_init_position_scroll_25_tr_3_ng_template_4_Template(rf, ctx) { }
function DayViewComponent_init_position_scroll_25_tr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 13);
    i0.ɵɵtemplate(4, DayViewComponent_init_position_scroll_25_tr_3_ng_template_4_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r287 = ctx.$implicit;
    const i_r288 = ctx.index;
    const ctx_r286 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r286.hourColumnLabels[i_r288], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r286.dayviewInactiveNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(3, _c6, tm_r287, ctx_r286.hourParts));
} }
function DayViewComponent_init_position_scroll_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "init-position-scroll", 19);
    i0.ɵɵelementStart(1, "table", 15);
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, DayViewComponent_init_position_scroll_25_tr_3_Template, 5, 6, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r257 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initPosition", ctx_r257.initScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r257.views[1].rows);
} }
function DayViewComponent_td_34_ng_template_1_Template(rf, ctx) { }
function DayViewComponent_td_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵtemplate(1, DayViewComponent_td_34_ng_template_1_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r258 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c1, ctx_r258.views[2].allDayEvents.length > 0))("ngStyle", i0.ɵɵpureFunction1(6, _c2, 25 * ctx_r258.views[2].allDayEvents.length + "px"));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r258.dayviewAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(8, _c3, ctx_r258.views[2].allDayEvents, ctx_r258.dayviewAllDayEventTemplate));
} }
function DayViewComponent_td_35_ng_template_1_Template(rf, ctx) { }
function DayViewComponent_td_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 13);
    i0.ɵɵtemplate(1, DayViewComponent_td_35_ng_template_1_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r259 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r259.dayviewInactiveAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c4, ctx_r259.views[2].allDayEvents));
} }
function DayViewComponent_init_position_scroll_36_tr_3_ng_template_4_Template(rf, ctx) { }
function DayViewComponent_init_position_scroll_36_tr_3_Template(rf, ctx) { if (rf & 1) {
    const _r297 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 18);
    i0.ɵɵlistener("click", function DayViewComponent_init_position_scroll_36_tr_3_Template_td_click_3_listener() { i0.ɵɵrestoreView(_r297); const tm_r293 = ctx.$implicit; const ctx_r296 = i0.ɵɵnextContext(2); return ctx_r296.select(tm_r293.time, tm_r293.events); });
    i0.ɵɵtemplate(4, DayViewComponent_init_position_scroll_36_tr_3_ng_template_4_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r293 = ctx.$implicit;
    const i_r294 = ctx.index;
    const ctx_r292 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r292.hourColumnLabels[i_r294], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r292.dayviewNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(3, _c5, tm_r293, ctx_r292.hourParts, ctx_r292.dayviewNormalEventTemplate));
} }
function DayViewComponent_init_position_scroll_36_Template(rf, ctx) { if (rf & 1) {
    const _r299 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "init-position-scroll", 14);
    i0.ɵɵlistener("onScroll", function DayViewComponent_init_position_scroll_36_Template_init_position_scroll_onScroll_0_listener($event) { i0.ɵɵrestoreView(_r299); const ctx_r298 = i0.ɵɵnextContext(); return ctx_r298.setScrollPosition($event); });
    i0.ɵɵelementStart(1, "table", 15);
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, DayViewComponent_init_position_scroll_36_tr_3_Template, 5, 7, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r260 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initPosition", ctx_r260.initScrollPosition)("emitEvent", ctx_r260.preserveScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r260.views[2].rows);
} }
function DayViewComponent_init_position_scroll_37_tr_3_ng_template_4_Template(rf, ctx) { }
function DayViewComponent_init_position_scroll_37_tr_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 13);
    i0.ɵɵtemplate(4, DayViewComponent_init_position_scroll_37_tr_3_ng_template_4_Template, 0, 0, "ng-template", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r301 = ctx.$implicit;
    const i_r302 = ctx.index;
    const ctx_r300 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r300.hourColumnLabels[i_r302], " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r300.dayviewInactiveNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(3, _c6, tm_r301, ctx_r300.hourParts));
} }
function DayViewComponent_init_position_scroll_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "init-position-scroll", 19);
    i0.ɵɵelementStart(1, "table", 15);
    i0.ɵɵelementStart(2, "tbody");
    i0.ɵɵtemplate(3, DayViewComponent_init_position_scroll_37_tr_3_Template, 5, 6, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r261 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initPosition", ctx_r261.initScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r261.views[2].rows);
} }
export class DayViewComponent {
    constructor(calendarService, elm) {
        this.calendarService = calendarService;
        this.elm = elm;
        this.class = true;
        this.dir = "";
        this.scrollToHour = 0;
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter();
        this.onTitleChanged = new EventEmitter(true);
        this.views = [];
        this.currentViewIndex = 0;
        this.direction = 0;
        this.mode = 'day';
        this.inited = false;
        this.callbackOnInit = true;
    }
    ngOnInit() {
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        this.hourRange = (this.endHour - this.startHour) * this.hourSegments;
        if (this.dateFormatter && this.dateFormatter.formatDayViewTitle) {
            this.formatTitle = this.dateFormatter.formatDayViewTitle;
        }
        else {
            let datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe.transform(date, this.formatDayTitle);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatDayViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatDayViewHourColumn;
        }
        else {
            let datePipe = new DatePipe(this.locale);
            this.formatHourColumnLabel = function (date) {
                return datePipe.transform(date, this.formatHourColumn);
            };
        }
        if (this.lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(true);
        }
        if (this.lockSwipes) {
            this.slider.lockSwipes(true);
        }
        this.refreshView();
        this.hourColumnLabels = this.getHourColumnLabels();
        this.inited = true;
        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(currentDate => {
            this.refreshView();
        });
        this.eventSourceChangedSubscription = this.calendarService.eventSourceChanged$.subscribe(() => {
            this.onDataLoaded();
        });
        this.slideChangedSubscription = this.calendarService.slideChanged$.subscribe(direction => {
            if (direction == 1) {
                this.slider.slideNext();
            }
            else if (direction == -1) {
                this.slider.slidePrev();
            }
        });
    }
    ngAfterViewInit() {
        let title = this.getTitle();
        this.onTitleChanged.emit(title);
        if (this.scrollToHour > 0) {
            let hourColumns = this.elm.nativeElement.querySelector('.dayview-normal-event-container').querySelectorAll('.calendar-hour-column');
            let me = this;
            setTimeout(function () {
                me.initScrollPosition = hourColumns[me.scrollToHour - me.startHour].offsetTop;
            }, 50);
        }
    }
    ngOnChanges(changes) {
        if (!this.inited)
            return;
        let eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
        let lockSwipeToPrev = changes['lockSwipeToPrev'];
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }
        let lockSwipes = changes['lockSwipes'];
        if (lockSwipes) {
            this.slider.lockSwipes(lockSwipes.currentValue);
        }
    }
    ngOnDestroy() {
        if (this.currentDateChangedFromParentSubscription) {
            this.currentDateChangedFromParentSubscription.unsubscribe();
            this.currentDateChangedFromParentSubscription = null;
        }
        if (this.eventSourceChangedSubscription) {
            this.eventSourceChangedSubscription.unsubscribe();
            this.eventSourceChangedSubscription = null;
        }
        if (this.slideChangedSubscription) {
            this.slideChangedSubscription.unsubscribe();
            this.slideChangedSubscription = null;
        }
    }
    onSlideChanged() {
        if (this.callbackOnInit) {
            this.callbackOnInit = false;
            return;
        }
        let direction = 0, currentViewIndex = this.currentViewIndex;
        this.slider.getActiveIndex().then((currentSlideIndex) => {
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            }
            else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                this.slider.slideTo(1, 0, false);
            }
            else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            }
            else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                this.slider.slideTo(3, 0, false);
            }
            this.currentViewIndex = currentSlideIndex;
            this.move(direction);
        });
    }
    move(direction) {
        if (direction === 0)
            return;
        this.direction = direction;
        let adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacentDate);
        this.refreshView();
        this.direction = 0;
    }
    static createDateObjects(startTime, startHour, endHour, timeInterval) {
        let rows = [], time, currentHour = startTime.getHours(), currentDate = startTime.getDate(), hourStep, minStep;
        if (timeInterval < 1) {
            hourStep = Math.floor(1 / timeInterval);
            minStep = 60;
        }
        else {
            hourStep = 1;
            minStep = Math.floor(60 / timeInterval);
        }
        for (let hour = startHour; hour < endHour; hour += hourStep) {
            for (let interval = 0; interval < 60; interval += minStep) {
                time = new Date(startTime.getTime());
                time.setHours(currentHour + hour, interval);
                time.setDate(currentDate);
                rows.push({
                    time: time,
                    events: []
                });
            }
        }
        return rows;
    }
    getHourColumnLabels() {
        let hourColumnLabels = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour].time));
        }
        return hourColumnLabels;
    }
    getViewData(startTime) {
        return {
            rows: DayViewComponent.createDateObjects(startTime, this.startHour, this.endHour, this.hourSegments),
            allDayEvents: []
        };
    }
    getRange(currentDate) {
        let year = currentDate.getFullYear(), month = currentDate.getMonth(), date = currentDate.getDate(), startTime = new Date(year, month, date), endTime = new Date(year, month, date + 1);
        return {
            startTime: startTime,
            endTime: endTime
        };
    }
    onDataLoaded() {
        let eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = this.range.startTime, endTime = this.range.endTime, utcStartTime = new Date(Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())), utcEndTime = new Date(Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())), currentViewIndex = this.currentViewIndex, rows = this.views[currentViewIndex].rows, allDayEvents = this.views[currentViewIndex].allDayEvents = [], oneHour = 3600000, eps = 0.016, normalEventInRange = false, rangeStartRowIndex = this.startHour * this.hourSegments, rangeEndRowIndex = this.endHour * this.hourSegments;
        for (let hour = 0; hour < this.hourRange; hour += 1) {
            rows[hour].events = [];
        }
        for (let i = 0; i < len; i += 1) {
            let event = eventSource[i];
            let eventStartTime = new Date(event.startTime.getTime());
            let eventEndTime = new Date(event.endTime.getTime());
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
                let timeDiff;
                let timeDifferenceStart;
                if (eventStartTime <= startTime) {
                    timeDifferenceStart = 0;
                }
                else {
                    timeDiff = eventStartTime.getTime() - startTime.getTime() - (eventStartTime.getTimezoneOffset() - startTime.getTimezoneOffset()) * 60000;
                    timeDifferenceStart = timeDiff / oneHour * this.hourSegments;
                }
                let timeDifferenceEnd;
                if (eventEndTime >= endTime) {
                    timeDiff = endTime.getTime() - startTime.getTime() - (endTime.getTimezoneOffset() - startTime.getTimezoneOffset()) * 60000;
                    timeDifferenceEnd = timeDiff / oneHour * this.hourSegments;
                }
                else {
                    timeDiff = eventEndTime.getTime() - startTime.getTime() - (eventEndTime.getTimezoneOffset() - startTime.getTimezoneOffset()) * 60000;
                    timeDifferenceEnd = timeDiff / oneHour * this.hourSegments;
                }
                let startIndex = Math.floor(timeDifferenceStart);
                let endIndex = Math.ceil(timeDifferenceEnd - eps);
                let startOffset = 0;
                let endOffset = 0;
                if (this.hourParts !== 1) {
                    if (startIndex < rangeStartRowIndex) {
                        startOffset = 0;
                    }
                    else {
                        startOffset = Math.floor((timeDifferenceStart - startIndex) * this.hourParts);
                    }
                    if (endIndex > rangeEndRowIndex) {
                        endOffset = 0;
                    }
                    else {
                        endOffset = Math.floor((endIndex - timeDifferenceEnd) * this.hourParts);
                    }
                }
                if (startIndex < rangeStartRowIndex) {
                    startIndex = 0;
                }
                else {
                    startIndex -= rangeStartRowIndex;
                }
                if (endIndex > rangeEndRowIndex) {
                    endIndex = rangeEndRowIndex;
                }
                endIndex -= rangeStartRowIndex;
                if (startIndex < endIndex) {
                    let displayEvent = {
                        event: event,
                        startIndex: startIndex,
                        endIndex: endIndex,
                        startOffset: startOffset,
                        endOffset: endOffset
                    };
                    let eventSet = rows[startIndex].events;
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
        }
        if (normalEventInRange) {
            let orderedEvents = [];
            for (let hour = 0; hour < this.hourRange; hour += 1) {
                if (rows[hour].events) {
                    rows[hour].events.sort(DayViewComponent.compareEventByStartOffset);
                    orderedEvents = orderedEvents.concat(rows[hour].events);
                }
            }
            if (orderedEvents.length > 0) {
                this.placeEvents(orderedEvents);
            }
        }
    }
    refreshView() {
        this.range = this.getRange(this.calendarService.currentDate);
        if (this.inited) {
            let title = this.getTitle();
            this.onTitleChanged.emit(title);
        }
        this.calendarService.populateAdjacentViews(this);
        this.calendarService.rangeChanged(this);
    }
    getTitle() {
        let startingDate = new Date(this.range.startTime.getTime());
        startingDate.setHours(12, 0, 0, 0);
        return this.formatTitle(startingDate);
    }
    static compareEventByStartOffset(eventA, eventB) {
        return eventA.startOffset - eventB.startOffset;
    }
    select(selectedTime, events) {
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedTime);
        }
        this.onTimeSelected.emit({
            selectedTime: selectedTime,
            events: events.map(e => e.event),
            disabled: disabled
        });
    }
    placeEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
        DayViewComponent.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
    }
    placeAllDayEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
    }
    overlap(event1, event2) {
        let earlyEvent = event1, lateEvent = event2;
        if (event1.startIndex > event2.startIndex || (event1.startIndex === event2.startIndex && event1.startOffset > event2.startOffset)) {
            earlyEvent = event2;
            lateEvent = event1;
        }
        if (earlyEvent.endIndex <= lateEvent.startIndex) {
            return false;
        }
        else {
            return !(earlyEvent.endIndex - lateEvent.startIndex === 1 && earlyEvent.endOffset + lateEvent.startOffset >= this.hourParts);
        }
    }
    calculatePosition(events) {
        let len = events.length, maxColumn = 0, col, isForbidden = new Array(len);
        for (let i = 0; i < len; i += 1) {
            for (col = 0; col < maxColumn; col += 1) {
                isForbidden[col] = false;
            }
            for (let j = 0; j < i; j += 1) {
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
        if (this.dir === 'rtl') {
            for (let i = 0; i < len; i += 1) {
                events[i].position = maxColumn - 1 - events[i].position;
            }
        }
    }
    static calculateWidth(orderedEvents, size, hourParts) {
        let totalSize = size * hourParts, cells = new Array(totalSize);
        // sort by position in descending order, the right most columns should be calculated first
        orderedEvents.sort((eventA, eventB) => {
            return eventB.position - eventA.position;
        });
        for (let i = 0; i < totalSize; i += 1) {
            cells[i] = {
                calculated: false,
                events: []
            };
        }
        let len = orderedEvents.length;
        for (let i = 0; i < len; i += 1) {
            let event = orderedEvents[i];
            let index = event.startIndex * hourParts + event.startOffset;
            while (index < event.endIndex * hourParts - event.endOffset) {
                cells[index].events.push(event);
                index += 1;
            }
        }
        let i = 0;
        while (i < len) {
            let event = orderedEvents[i];
            if (!event.overlapNumber) {
                let overlapNumber = event.position + 1;
                event.overlapNumber = overlapNumber;
                let eventQueue = [event];
                while ((event = eventQueue.shift())) {
                    let index = event.startIndex * hourParts + event.startOffset;
                    while (index < event.endIndex * hourParts - event.endOffset) {
                        if (!cells[index].calculated) {
                            cells[index].calculated = true;
                            if (cells[index].events) {
                                let eventCountInCell = cells[index].events.length;
                                for (let j = 0; j < eventCountInCell; j += 1) {
                                    let currentEventInCell = cells[index].events[j];
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
    }
    eventSelected(event) {
        this.onEventSelected.emit(event);
    }
    setScrollPosition(scrollPosition) {
        this.initScrollPosition = scrollPosition;
    }
}
DayViewComponent.ɵfac = function DayViewComponent_Factory(t) { return new (t || DayViewComponent)(i0.ɵɵdirectiveInject(i1.CalendarService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
DayViewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DayViewComponent, selectors: [["dayview"]], viewQuery: function DayViewComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.slider = _t.first);
    } }, hostVars: 2, hostBindings: function DayViewComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("dayview", ctx.class);
    } }, inputs: { dayviewAllDayEventTemplate: "dayviewAllDayEventTemplate", dayviewNormalEventTemplate: "dayviewNormalEventTemplate", dayviewAllDayEventSectionTemplate: "dayviewAllDayEventSectionTemplate", dayviewNormalEventSectionTemplate: "dayviewNormalEventSectionTemplate", dayviewInactiveAllDayEventSectionTemplate: "dayviewInactiveAllDayEventSectionTemplate", dayviewInactiveNormalEventSectionTemplate: "dayviewInactiveNormalEventSectionTemplate", formatHourColumn: "formatHourColumn", formatDayTitle: "formatDayTitle", allDayLabel: "allDayLabel", hourParts: "hourParts", eventSource: "eventSource", markDisabled: "markDisabled", locale: "locale", dateFormatter: "dateFormatter", dir: "dir", scrollToHour: "scrollToHour", preserveScrollPosition: "preserveScrollPosition", lockSwipeToPrev: "lockSwipeToPrev", lockSwipes: "lockSwipes", startHour: "startHour", endHour: "endHour", sliderOptions: "sliderOptions", hourSegments: "hourSegments" }, outputs: { onRangeChanged: "onRangeChanged", onEventSelected: "onEventSelected", onTimeSelected: "onTimeSelected", onTitleChanged: "onTitleChanged" }, features: [i0.ɵɵNgOnChangesFeature()], decls: 38, vars: 17, consts: [[1, "slides-container", 3, "options", "dir", "ionSlideDidChange"], ["daySlider", ""], [1, "slide-container"], [1, "dayview-allday-table"], [1, "dayview-allday-label"], [1, "dayview-allday-content-wrapper", "scroll-content"], [1, "table", "table-bordered", "dayview-allday-content-table"], ["class", "calendar-cell", 3, "ngClass", "ngStyle", 4, "ngIf"], ["class", "calendar-cell", 4, "ngIf"], ["class", "dayview-normal-event-container", 3, "initPosition", "emitEvent", "onScroll", 4, "ngIf"], ["class", "dayview-normal-event-container", 3, "initPosition", 4, "ngIf"], [1, "calendar-cell", 3, "ngClass", "ngStyle"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "calendar-cell"], [1, "dayview-normal-event-container", 3, "initPosition", "emitEvent", "onScroll"], [1, "table", "table-bordered", "table-fixed", "dayview-normal-event-table"], [4, "ngFor", "ngForOf"], [1, "calendar-hour-column", "text-center"], ["tappable", "", 1, "calendar-cell", 3, "click"], [1, "dayview-normal-event-container", 3, "initPosition"]], template: function DayViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-slides", 0, 1);
        i0.ɵɵlistener("ionSlideDidChange", function DayViewComponent_Template_ion_slides_ionSlideDidChange_0_listener() { return ctx.onSlideChanged(); });
        i0.ɵɵelementStart(2, "ion-slide", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "div", 4);
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 5);
        i0.ɵɵelementStart(7, "table", 6);
        i0.ɵɵelementStart(8, "tbody");
        i0.ɵɵelementStart(9, "tr");
        i0.ɵɵtemplate(10, DayViewComponent_td_10_Template, 2, 11, "td", 7);
        i0.ɵɵtemplate(11, DayViewComponent_td_11_Template, 2, 4, "td", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(12, DayViewComponent_init_position_scroll_12_Template, 4, 3, "init-position-scroll", 9);
        i0.ɵɵtemplate(13, DayViewComponent_init_position_scroll_13_Template, 4, 2, "init-position-scroll", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "ion-slide", 2);
        i0.ɵɵelementStart(15, "div", 3);
        i0.ɵɵelementStart(16, "div", 4);
        i0.ɵɵtext(17);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "div", 5);
        i0.ɵɵelementStart(19, "table", 6);
        i0.ɵɵelementStart(20, "tbody");
        i0.ɵɵelementStart(21, "tr");
        i0.ɵɵtemplate(22, DayViewComponent_td_22_Template, 2, 11, "td", 7);
        i0.ɵɵtemplate(23, DayViewComponent_td_23_Template, 2, 4, "td", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, DayViewComponent_init_position_scroll_24_Template, 4, 3, "init-position-scroll", 9);
        i0.ɵɵtemplate(25, DayViewComponent_init_position_scroll_25_Template, 4, 2, "init-position-scroll", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(26, "ion-slide", 2);
        i0.ɵɵelementStart(27, "div", 3);
        i0.ɵɵelementStart(28, "div", 4);
        i0.ɵɵtext(29);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "div", 5);
        i0.ɵɵelementStart(31, "table", 6);
        i0.ɵɵelementStart(32, "tbody");
        i0.ɵɵelementStart(33, "tr");
        i0.ɵɵtemplate(34, DayViewComponent_td_34_Template, 2, 11, "td", 7);
        i0.ɵɵtemplate(35, DayViewComponent_td_35_Template, 2, 4, "td", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(36, DayViewComponent_init_position_scroll_36_Template, 4, 3, "init-position-scroll", 9);
        i0.ɵɵtemplate(37, DayViewComponent_init_position_scroll_37_Template, 4, 2, "init-position-scroll", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("options", ctx.sliderOptions)("dir", ctx.dir);
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate(ctx.allDayLabel);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", 0 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 0 !== ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 0 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 0 !== ctx.currentViewIndex);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.allDayLabel);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", 1 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 1 !== ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 1 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 1 !== ctx.currentViewIndex);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(ctx.allDayLabel);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", 2 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 2 !== ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 2 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 2 !== ctx.currentViewIndex);
    } }, directives: [i2.IonSlides, i2.IonSlide, i3.NgIf, i3.NgClass, i3.NgStyle, i3.NgTemplateOutlet, i4.initPositionScrollComponent, i3.NgForOf], styles: ["\n        .table-fixed {\n          table-layout: fixed;\n        }\n\n        .table {\n          width: 100%;\n          max-width: 100%;\n          background-color: transparent;\n        }\n\n        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,\n        .table > tbody > tr > td, .table > tfoot > tr > td {\n          padding: 8px;\n          line-height: 20px;\n          vertical-align: top;\n        }\n\n        .table > thead > tr > th {\n          vertical-align: bottom;\n          border-bottom: 2px solid #ddd;\n        }\n\n        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {\n          border-top: 0\n        }\n\n        .table > tbody + tbody {\n          border-top: 2px solid #ddd;\n        }\n\n        .table-bordered {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,\n        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {\n          border-bottom-width: 2px;\n        }\n\n        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {\n          background-color: #f9f9f9\n        }\n\n        .calendar-hour-column {\n          width: 50px;\n          white-space: nowrap;\n        }\n\n        .calendar-event-wrap {\n          position: relative;\n          width: 100%;\n          height: 100%;\n        }\n\n        .calendar-event {\n          position: absolute;\n          padding: 2px;\n          cursor: pointer;\n          z-index: 10000;\n        }\n\n        .slides-container {\n            height: 100%;\n        }\n\n        .slide-container {\n            display: block;\n        }\n\n        .calendar-cell {\n          padding: 0 !important;\n          height: 37px;\n        }\n\n        .dayview-allday-label {\n          float: left;\n          height: 100%;\n          line-height: 50px;\n          text-align: center;\n          width: 50px;\n          border-left: 1px solid #ddd;\n        }\n\n        [dir=\"rtl\"] .dayview-allday-label {\n            border-right: 1px solid #ddd;\n            float: right;\n        }\n\n        .dayview-allday-content-wrapper {\n          margin-left: 50px;\n          overflow: hidden;\n          height: 51px;\n        }\n\n        [dir=\"rtl\"] .dayview-allday-content-wrapper {\n          margin-left: 0;\n          margin-right: 50px;\n        }\n\n        .dayview-allday-content-table {\n          min-height: 50px;\n        }\n\n        .dayview-allday-content-table td {\n          border-left: 1px solid #ddd;\n          border-right: 1px solid #ddd;\n        }\n\n        .dayview-allday-table {\n          height: 50px;\n          position: relative;\n          border-bottom: 1px solid #ddd;\n          font-size: 14px;\n        }\n\n        .dayview-normal-event-container {\n          margin-top: 50px;\n          overflow: hidden;\n          left: 0;\n          right: 0;\n          top: 0;\n          bottom: 0;\n          position: absolute;\n          font-size: 14px;\n        }\n\n        .scroll-content {\n            overflow-y: auto;\n            overflow-x: hidden;\n        }\n\n        ::-webkit-scrollbar,\n        *::-webkit-scrollbar {\n          display: none;\n        }\n\n        .table > tbody > tr > td.calendar-hour-column {\n          padding-left: 0;\n          padding-right: 0;\n          vertical-align: middle;\n        }\n\n        @media (max-width: 750px) {\n          .dayview-allday-label, .calendar-hour-column {\n            width: 31px;\n            font-size: 12px;\n          }\n\n          .dayview-allday-label {\n            padding-top: 4px;\n          }\n\n          .table > tbody > tr > td.calendar-hour-column {\n            padding-left: 0;\n            padding-right: 0;\n            vertical-align: middle;\n            line-height: 12px;\n          }\n\n          .dayview-allday-label {\n            line-height: 20px;\n          }\n\n          .dayview-allday-content-wrapper {\n            margin-left: 31px;\n          }\n\n          [dir=\"rtl\"] .dayview-allday-content-wrapper {\n            margin-left: 0;\n            margin-right: 31px;\n          }\n        }\n    "], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DayViewComponent, [{
        type: Component,
        args: [{
                selector: 'dayview',
                template: `
        <ion-slides #daySlider [options]="sliderOptions" [dir]="dir" (ionSlideDidChange)="onSlideChanged()" class="slides-container">
            <ion-slide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[0].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[0].allDayEvents.length+'px'}"
                                    *ngIf="0===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[0].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="0!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[0].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="0===currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="0!==currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[0].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
            <ion-slide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[1].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[1].allDayEvents.length+'px'}"
                                    *ngIf="1===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[1].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="1!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[1].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="1===currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="1!==currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[1].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
            <ion-slide class="slide-container">
                <div class="dayview-allday-table">
                    <div class="dayview-allday-label">{{allDayLabel}}</div>
                    <div class="dayview-allday-content-wrapper scroll-content">
                        <table class="table table-bordered dayview-allday-content-table">
                            <tbody>
                            <tr>
                                <td class="calendar-cell" [ngClass]="{'calendar-event-wrap':views[2].allDayEvents.length>0}"
                                    [ngStyle]="{height: 25*views[2].allDayEvents.length+'px'}"
                                    *ngIf="2===currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[2].allDayEvents,eventTemplate:dayviewAllDayEventTemplate}">
                                    </ng-template>
                                </td>
                                <td class="calendar-cell" *ngIf="2!==currentViewIndex">
                                    <ng-template [ngTemplateOutlet]="dayviewInactiveAllDayEventSectionTemplate"
                                                 [ngTemplateOutletContext]="{allDayEvents:views[2].allDayEvents}">
                                    </ng-template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <init-position-scroll *ngIf="2===currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition" [emitEvent]="preserveScrollPosition" (onScroll)="setScrollPosition($event)">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell" tappable (click)="select(tm.time, tm.events)">
                                <ng-template [ngTemplateOutlet]="dayviewNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts, eventTemplate:dayviewNormalEventTemplate}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
                <init-position-scroll *ngIf="2!==currentViewIndex" class="dayview-normal-event-container" [initPosition]="initScrollPosition">
                    <table class="table table-bordered table-fixed dayview-normal-event-table">
                        <tbody>
                        <tr *ngFor="let tm of views[2].rows; let i = index">
                            <td class="calendar-hour-column text-center">
                                {{hourColumnLabels[i]}}
                            </td>
                            <td class="calendar-cell">
                                <ng-template [ngTemplateOutlet]="dayviewInactiveNormalEventSectionTemplate"
                                             [ngTemplateOutletContext]="{tm:tm, hourParts: hourParts}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </init-position-scroll>
            </ion-slide>
        </ion-slides>
    `,
                styles: [`
        .table-fixed {
          table-layout: fixed;
        }

        .table {
          width: 100%;
          max-width: 100%;
          background-color: transparent;
        }

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,
        .table > tbody > tr > td, .table > tfoot > tr > td {
          padding: 8px;
          line-height: 20px;
          vertical-align: top;
        }

        .table > thead > tr > th {
          vertical-align: bottom;
          border-bottom: 2px solid #ddd;
        }

        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {
          border-top: 0
        }

        .table > tbody + tbody {
          border-top: 2px solid #ddd;
        }

        .table-bordered {
          border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,
        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
          border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {
          border-bottom-width: 2px;
        }

        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {
          background-color: #f9f9f9
        }

        .calendar-hour-column {
          width: 50px;
          white-space: nowrap;
        }

        .calendar-event-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .calendar-event {
          position: absolute;
          padding: 2px;
          cursor: pointer;
          z-index: 10000;
        }

        .slides-container {
            height: 100%;
        }

        .slide-container {
            display: block;
        }

        .calendar-cell {
          padding: 0 !important;
          height: 37px;
        }

        .dayview-allday-label {
          float: left;
          height: 100%;
          line-height: 50px;
          text-align: center;
          width: 50px;
          border-left: 1px solid #ddd;
        }

        [dir="rtl"] .dayview-allday-label {
            border-right: 1px solid #ddd;
            float: right;
        }

        .dayview-allday-content-wrapper {
          margin-left: 50px;
          overflow: hidden;
          height: 51px;
        }

        [dir="rtl"] .dayview-allday-content-wrapper {
          margin-left: 0;
          margin-right: 50px;
        }

        .dayview-allday-content-table {
          min-height: 50px;
        }

        .dayview-allday-content-table td {
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }

        .dayview-allday-table {
          height: 50px;
          position: relative;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        .dayview-normal-event-container {
          margin-top: 50px;
          overflow: hidden;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
          font-size: 14px;
        }

        .scroll-content {
            overflow-y: auto;
            overflow-x: hidden;
        }

        ::-webkit-scrollbar,
        *::-webkit-scrollbar {
          display: none;
        }

        .table > tbody > tr > td.calendar-hour-column {
          padding-left: 0;
          padding-right: 0;
          vertical-align: middle;
        }

        @media (max-width: 750px) {
          .dayview-allday-label, .calendar-hour-column {
            width: 31px;
            font-size: 12px;
          }

          .dayview-allday-label {
            padding-top: 4px;
          }

          .table > tbody > tr > td.calendar-hour-column {
            padding-left: 0;
            padding-right: 0;
            vertical-align: middle;
            line-height: 12px;
          }

          .dayview-allday-label {
            line-height: 20px;
          }

          .dayview-allday-content-wrapper {
            margin-left: 31px;
          }

          [dir="rtl"] .dayview-allday-content-wrapper {
            margin-left: 0;
            margin-right: 31px;
          }
        }
    `],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: i1.CalendarService }, { type: i0.ElementRef }]; }, { slider: [{
            type: ViewChild,
            args: ['daySlider']
        }], class: [{
            type: HostBinding,
            args: ['class.dayview']
        }], dayviewAllDayEventTemplate: [{
            type: Input
        }], dayviewNormalEventTemplate: [{
            type: Input
        }], dayviewAllDayEventSectionTemplate: [{
            type: Input
        }], dayviewNormalEventSectionTemplate: [{
            type: Input
        }], dayviewInactiveAllDayEventSectionTemplate: [{
            type: Input
        }], dayviewInactiveNormalEventSectionTemplate: [{
            type: Input
        }], formatHourColumn: [{
            type: Input
        }], formatDayTitle: [{
            type: Input
        }], allDayLabel: [{
            type: Input
        }], hourParts: [{
            type: Input
        }], eventSource: [{
            type: Input
        }], markDisabled: [{
            type: Input
        }], locale: [{
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
        }], startHour: [{
            type: Input
        }], endHour: [{
            type: Input
        }], sliderOptions: [{
            type: Input
        }], hourSegments: [{
            type: Input
        }], onRangeChanged: [{
            type: Output
        }], onEventSelected: [{
            type: Output
        }], onTimeSelected: [{
            type: Output
        }], onTitleChanged: [{
            type: Output
        }] }); })();
