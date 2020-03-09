import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./calendar.service";
import * as i2 from "@ionic/angular";
import * as i3 from "@angular/common";
var _c0 = ["monthSlider"];
function MonthViewComponent_table_4_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var dayHeader_r98 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dayHeader_r98);
} }
function MonthViewComponent_table_4_tr_5_td_1_ng_template_1_Template(rf, ctx) { }
var _c1 = function (a0, a1, a2) { return { view: a0, row: a1, col: a2 }; };
function MonthViewComponent_table_4_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    var _r104 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 7);
    i0.ɵɵlistener("click", function MonthViewComponent_table_4_tr_5_td_1_Template_td_click_0_listener() { i0.ɵɵrestoreView(_r104); var col_r101 = ctx.$implicit; var row_r99 = i0.ɵɵnextContext().$implicit; var ctx_r103 = i0.ɵɵnextContext(2); return ctx_r103.select(ctx_r103.views[0].dates[row_r99 * 7 + col_r101]); });
    i0.ɵɵtemplate(1, MonthViewComponent_table_4_tr_5_td_1_ng_template_1_Template, 0, 0, "ng-template", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var col_r101 = ctx.$implicit;
    var row_r99 = i0.ɵɵnextContext().$implicit;
    var ctx_r100 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r100.getHighlightClass(ctx_r100.views[0].dates[row_r99 * 7 + col_r101]));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r100.monthviewDisplayEventTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(3, _c1, ctx_r100.views[0], row_r99, col_r101));
} }
var _c2 = function () { return [0, 1, 2, 3, 4, 5, 6]; };
function MonthViewComponent_table_4_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, MonthViewComponent_table_4_tr_5_td_1_Template, 2, 7, "td", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
var _c3 = function () { return [0, 1, 2, 3, 4, 5]; };
function MonthViewComponent_table_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵtemplate(3, MonthViewComponent_table_4_th_3_Template, 3, 1, "th", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "tbody");
    i0.ɵɵtemplate(5, MonthViewComponent_table_4_tr_5_Template, 2, 2, "tr", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r89 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r89.views[0].dayHeaders);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(2, _c3));
} }
function MonthViewComponent_table_5_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var dayHeader_r109 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dayHeader_r109);
} }
function MonthViewComponent_table_5_tr_5_td_1_ng_template_1_Template(rf, ctx) { }
function MonthViewComponent_table_5_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, MonthViewComponent_table_5_tr_5_td_1_ng_template_1_Template, 0, 0, "ng-template", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var col_r112 = ctx.$implicit;
    var row_r110 = i0.ɵɵnextContext().$implicit;
    var ctx_r111 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r111.monthviewInactiveDisplayEventTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c1, ctx_r111.views[0], row_r110, col_r112));
} }
function MonthViewComponent_table_5_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, MonthViewComponent_table_5_tr_5_td_1_Template, 2, 6, "td", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function MonthViewComponent_table_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr", 8);
    i0.ɵɵtemplate(3, MonthViewComponent_table_5_th_3_Template, 3, 1, "th", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "tbody");
    i0.ɵɵtemplate(5, MonthViewComponent_table_5_tr_5_Template, 2, 2, "tr", 5);
    i0.ɵɵelement(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r90 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r90.views[0].dayHeaders);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(2, _c3));
} }
function MonthViewComponent_table_7_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var dayHeader_r117 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dayHeader_r117);
} }
function MonthViewComponent_table_7_tr_5_td_1_ng_template_1_Template(rf, ctx) { }
function MonthViewComponent_table_7_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    var _r123 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 7);
    i0.ɵɵlistener("click", function MonthViewComponent_table_7_tr_5_td_1_Template_td_click_0_listener() { i0.ɵɵrestoreView(_r123); var col_r120 = ctx.$implicit; var row_r118 = i0.ɵɵnextContext().$implicit; var ctx_r122 = i0.ɵɵnextContext(2); return ctx_r122.select(ctx_r122.views[1].dates[row_r118 * 7 + col_r120]); });
    i0.ɵɵtemplate(1, MonthViewComponent_table_7_tr_5_td_1_ng_template_1_Template, 0, 0, "ng-template", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var col_r120 = ctx.$implicit;
    var row_r118 = i0.ɵɵnextContext().$implicit;
    var ctx_r119 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r119.getHighlightClass(ctx_r119.views[1].dates[row_r118 * 7 + col_r120]));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r119.monthviewDisplayEventTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(3, _c1, ctx_r119.views[1], row_r118, col_r120));
} }
function MonthViewComponent_table_7_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, MonthViewComponent_table_7_tr_5_td_1_Template, 2, 7, "td", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function MonthViewComponent_table_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵtemplate(3, MonthViewComponent_table_7_th_3_Template, 3, 1, "th", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "tbody");
    i0.ɵɵtemplate(5, MonthViewComponent_table_7_tr_5_Template, 2, 2, "tr", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r91 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r91.views[1].dayHeaders);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(2, _c3));
} }
function MonthViewComponent_table_8_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var dayHeader_r128 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dayHeader_r128);
} }
function MonthViewComponent_table_8_tr_5_td_1_ng_template_1_Template(rf, ctx) { }
function MonthViewComponent_table_8_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, MonthViewComponent_table_8_tr_5_td_1_ng_template_1_Template, 0, 0, "ng-template", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var col_r131 = ctx.$implicit;
    var row_r129 = i0.ɵɵnextContext().$implicit;
    var ctx_r130 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r130.monthviewInactiveDisplayEventTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c1, ctx_r130.views[1], row_r129, col_r131));
} }
function MonthViewComponent_table_8_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, MonthViewComponent_table_8_tr_5_td_1_Template, 2, 6, "td", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function MonthViewComponent_table_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr", 8);
    i0.ɵɵtemplate(3, MonthViewComponent_table_8_th_3_Template, 3, 1, "th", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "tbody");
    i0.ɵɵtemplate(5, MonthViewComponent_table_8_tr_5_Template, 2, 2, "tr", 5);
    i0.ɵɵelement(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r92 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r92.views[1].dayHeaders);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(2, _c3));
} }
function MonthViewComponent_table_10_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var dayHeader_r136 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dayHeader_r136);
} }
function MonthViewComponent_table_10_tr_5_td_1_ng_template_1_Template(rf, ctx) { }
function MonthViewComponent_table_10_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    var _r142 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 7);
    i0.ɵɵlistener("click", function MonthViewComponent_table_10_tr_5_td_1_Template_td_click_0_listener() { i0.ɵɵrestoreView(_r142); var col_r139 = ctx.$implicit; var row_r137 = i0.ɵɵnextContext().$implicit; var ctx_r141 = i0.ɵɵnextContext(2); return ctx_r141.select(ctx_r141.views[2].dates[row_r137 * 7 + col_r139]); });
    i0.ɵɵtemplate(1, MonthViewComponent_table_10_tr_5_td_1_ng_template_1_Template, 0, 0, "ng-template", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var col_r139 = ctx.$implicit;
    var row_r137 = i0.ɵɵnextContext().$implicit;
    var ctx_r138 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r138.getHighlightClass(ctx_r138.views[2].dates[row_r137 * 7 + col_r139]));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r138.monthviewDisplayEventTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(3, _c1, ctx_r138.views[2], row_r137, col_r139));
} }
function MonthViewComponent_table_10_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, MonthViewComponent_table_10_tr_5_td_1_Template, 2, 7, "td", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function MonthViewComponent_table_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr");
    i0.ɵɵtemplate(3, MonthViewComponent_table_10_th_3_Template, 3, 1, "th", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "tbody");
    i0.ɵɵtemplate(5, MonthViewComponent_table_10_tr_5_Template, 2, 2, "tr", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r93 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r93.views[2].dayHeaders);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(2, _c3));
} }
function MonthViewComponent_table_11_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var dayHeader_r147 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dayHeader_r147);
} }
function MonthViewComponent_table_11_tr_5_td_1_ng_template_1_Template(rf, ctx) { }
function MonthViewComponent_table_11_tr_5_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtemplate(1, MonthViewComponent_table_11_tr_5_td_1_ng_template_1_Template, 0, 0, "ng-template", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var col_r150 = ctx.$implicit;
    var row_r148 = i0.ɵɵnextContext().$implicit;
    var ctx_r149 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r149.monthviewInactiveDisplayEventTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c1, ctx_r149.views[2], row_r148, col_r150));
} }
function MonthViewComponent_table_11_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, MonthViewComponent_table_11_tr_5_td_1_Template, 2, 6, "td", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function MonthViewComponent_table_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 4);
    i0.ɵɵelementStart(1, "thead");
    i0.ɵɵelementStart(2, "tr", 8);
    i0.ɵɵtemplate(3, MonthViewComponent_table_11_th_3_Template, 3, 1, "th", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "tbody");
    i0.ɵɵtemplate(5, MonthViewComponent_table_11_tr_5_Template, 2, 2, "tr", 5);
    i0.ɵɵelement(6, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r94 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r94.views[2].dayHeaders);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(2, _c3));
} }
function MonthViewComponent_ng_template_12_Template(rf, ctx) { }
var _c4 = function (a0, a1, a2) { return { showEventDetail: a0, selectedDate: a1, noEventsLabel: a2 }; };
var MonthViewComponent = /** @class */ (function () {
    function MonthViewComponent(calendarService) {
        this.calendarService = calendarService;
        this.autoSelect = true;
        this.dir = "";
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter(true);
        this.onTitleChanged = new EventEmitter(true);
        this.views = [];
        this.currentViewIndex = 0;
        this.mode = 'month';
        this.direction = 0;
        this.moveOnSelected = false;
        this.inited = false;
        this.callbackOnInit = true;
    }
    MonthViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        if (this.dateFormatter && this.dateFormatter.formatMonthViewDay) {
            this.formatDayLabel = this.dateFormatter.formatMonthViewDay;
        }
        else {
            var dayLabelDatePipe_1 = new DatePipe('en-US');
            this.formatDayLabel = function (date) {
                return dayLabelDatePipe_1.transform(date, this.formatDay);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatMonthViewDayHeader) {
            this.formatDayHeaderLabel = this.dateFormatter.formatMonthViewDayHeader;
        }
        else {
            var datePipe_1 = new DatePipe(this.locale);
            this.formatDayHeaderLabel = function (date) {
                return datePipe_1.transform(date, this.formatDayHeader);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatMonthViewTitle) {
            this.formatTitle = this.dateFormatter.formatMonthViewTitle;
        }
        else {
            var datePipe_2 = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe_2.transform(date, this.formatMonthTitle);
            };
        }
        if (this.lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(true);
        }
        if (this.lockSwipes) {
            this.slider.lockSwipes(true);
        }
        this.refreshView();
        this.inited = true;
        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(function (currentDate) {
            _this.refreshView();
        });
        this.eventSourceChangedSubscription = this.calendarService.eventSourceChanged$.subscribe(function () {
            _this.onDataLoaded();
        });
        this.slideChangedSubscription = this.calendarService.slideChanged$.subscribe(function (direction) {
            if (direction == 1) {
                _this.slider.slideNext();
            }
            else if (direction == -1) {
                _this.slider.slidePrev();
            }
        });
    };
    MonthViewComponent.prototype.ngOnDestroy = function () {
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
    };
    MonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (!this.inited)
            return;
        var eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
        var lockSwipeToPrev = changes['lockSwipeToPrev'];
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }
        var lockSwipes = changes['lockSwipes'];
        if (lockSwipes) {
            this.slider.lockSwipes(lockSwipes.currentValue);
        }
    };
    MonthViewComponent.prototype.ngAfterViewInit = function () {
        var title = this.getTitle();
        this.onTitleChanged.emit(title);
    };
    MonthViewComponent.prototype.onSlideChanged = function () {
        var _this = this;
        if (this.callbackOnInit) {
            this.callbackOnInit = false;
            return;
        }
        var direction = 0, currentViewIndex = this.currentViewIndex;
        this.slider.getActiveIndex().then(function (currentSlideIndex) {
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            }
            else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                _this.slider.slideTo(1, 0, false);
            }
            else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            }
            else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                _this.slider.slideTo(3, 0, false);
            }
            _this.currentViewIndex = currentSlideIndex;
            _this.move(direction);
        });
    };
    MonthViewComponent.prototype.move = function (direction) {
        if (direction === 0)
            return;
        this.direction = direction;
        if (!this.moveOnSelected) {
            var adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
            this.calendarService.setCurrentDate(adjacentDate);
        }
        this.refreshView();
        this.direction = 0;
        this.moveOnSelected = false;
    };
    MonthViewComponent.prototype.createDateObject = function (date) {
        var disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(date);
        }
        return {
            date: date,
            events: [],
            label: this.formatDayLabel(date),
            secondary: false,
            disabled: disabled
        };
    };
    MonthViewComponent.getDates = function (startDate, n) {
        var dates = new Array(n), current = new Date(startDate.getTime()), i = 0;
        current.setHours(12); // Prevent repeated dates because of timezone bug
        while (i < n) {
            dates[i++] = new Date(current.getTime());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };
    MonthViewComponent.prototype.getViewData = function (startTime) {
        var startDate = startTime, date = startDate.getDate(), month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;
        var dates = MonthViewComponent.getDates(startDate, 42);
        var days = [];
        for (var i = 0; i < 42; i++) {
            var dateObject = this.createDateObject(dates[i]);
            dateObject.secondary = dates[i].getMonth() !== month;
            days[i] = dateObject;
        }
        var dayHeaders = [];
        for (var i = 0; i < 7; i++) {
            dayHeaders.push(this.formatDayHeaderLabel(days[i].date));
        }
        return {
            dates: days,
            dayHeaders: dayHeaders
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
        if (date.disabled) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-disabled';
        }
        return className;
    };
    MonthViewComponent.prototype.getRange = function (currentDate) {
        var year = currentDate.getFullYear(), month = currentDate.getMonth(), firstDayOfMonth = new Date(year, month, 1), difference = this.startingDayMonth - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference, startDate = new Date(firstDayOfMonth.getTime());
        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }
        var endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);
        return {
            startTime: startDate,
            endTime: endDate
        };
    };
    MonthViewComponent.prototype.onDataLoaded = function () {
        var range = this.range, eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = range.startTime, endTime = range.endTime, utcStartTime = new Date(Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())), utcEndTime = new Date(Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())), currentViewIndex = this.currentViewIndex, dates = this.views[currentViewIndex].dates, oneDay = 86400000, eps = 0.0006;
        for (var r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }
        for (var i = 0; i < len; i += 1) {
            var event_1 = eventSource[i], eventStartTime = new Date(event_1.startTime.getTime()), eventEndTime = new Date(event_1.endTime.getTime()), st = void 0, et = void 0;
            if (event_1.allDay) {
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
            var timeDiff = void 0;
            var timeDifferenceStart = void 0;
            if (eventStartTime <= st) {
                timeDifferenceStart = 0;
            }
            else {
                timeDiff = eventStartTime.getTime() - st.getTime();
                if (!event_1.allDay) {
                    timeDiff = timeDiff - (eventStartTime.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceStart = timeDiff / oneDay;
            }
            var timeDifferenceEnd = void 0;
            if (eventEndTime >= et) {
                timeDiff = et.getTime() - st.getTime();
                if (!event_1.allDay) {
                    timeDiff = timeDiff - (et.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceEnd = timeDiff / oneDay;
            }
            else {
                timeDiff = eventEndTime.getTime() - st.getTime();
                if (!event_1.allDay) {
                    timeDiff = timeDiff - (eventEndTime.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceEnd = timeDiff / oneDay;
            }
            var index = Math.floor(timeDifferenceStart);
            while (index < timeDifferenceEnd - eps) {
                dates[index].hasEvent = true;
                var eventSet = dates[index].events;
                if (eventSet) {
                    eventSet.push(event_1);
                }
                else {
                    eventSet = [];
                    eventSet.push(event_1);
                    dates[index].events = eventSet;
                }
                index += 1;
            }
        }
        for (var r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }
        if (this.autoSelect) {
            var findSelected = false;
            for (var r = 0; r < 42; r += 1) {
                if (dates[r].selected) {
                    this.selectedDate = dates[r];
                    findSelected = true;
                    break;
                }
            }
            if (findSelected) {
                this.onTimeSelected.emit({
                    selectedTime: this.selectedDate.date,
                    events: this.selectedDate.events,
                    disabled: this.selectedDate.disabled
                });
            }
        }
    };
    ;
    MonthViewComponent.prototype.refreshView = function () {
        this.range = this.getRange(this.calendarService.currentDate);
        if (this.inited) {
            var title = this.getTitle();
            this.onTitleChanged.emit(title);
        }
        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    };
    MonthViewComponent.prototype.getTitle = function () {
        var currentViewStartDate = this.range.startTime, date = currentViewStartDate.getDate(), month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12, year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0), headerDate = new Date(year, month, 1, 12, 0, 0, 0);
        return this.formatTitle(headerDate);
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
    MonthViewComponent.prototype.select = function (viewDate) {
        if (!this.views)
            return;
        var selectedDate = viewDate.date, events = viewDate.events;
        if (!viewDate.disabled) {
            var dates = this.views[this.currentViewIndex].dates, currentCalendarDate = this.calendarService.currentDate, currentMonth = currentCalendarDate.getMonth(), currentYear = currentCalendarDate.getFullYear(), selectedMonth = selectedDate.getMonth(), selectedYear = selectedDate.getFullYear(), direction = 0;
            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            }
            else {
                direction = currentYear < selectedYear ? 1 : -1;
            }
            this.calendarService.setCurrentDate(selectedDate);
            if (direction === 0) {
                var currentViewStartDate = this.range.startTime, oneDay = 86400000, selectedDayDifference = Math.floor((selectedDate.getTime() - currentViewStartDate.getTime() - (selectedDate.getTimezoneOffset() - currentViewStartDate.getTimezoneOffset()) * 60000) / oneDay);
                for (var r = 0; r < 42; r += 1) {
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
        }
        this.onTimeSelected.emit({ selectedTime: selectedDate, events: events, disabled: viewDate.disabled });
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
        var currentCalendarDate = this.calendarService.currentDate, today = new Date(), oneDay = 86400000, selectedDayDifference = Math.floor((currentCalendarDate.getTime() - currentViewStartDate.getTime() - (currentCalendarDate.getTimezoneOffset() - currentViewStartDate.getTimezoneOffset()) * 60000) / oneDay), currentDayDifference = Math.floor((today.getTime() - currentViewStartDate.getTime() - (today.getTimezoneOffset() - currentViewStartDate.getTimezoneOffset()) * 60000) / oneDay);
        for (var r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 && selectedDayDifference < 42 && !view.dates[selectedDayDifference].disabled && (this.autoSelect || this.moveOnSelected)) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        }
        else {
            this.selectedDate = {
                date: null,
                events: [],
                label: null,
                secondary: null,
                disabled: false
            };
        }
        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    };
    MonthViewComponent.prototype.eventSelected = function (event) {
        this.onEventSelected.emit(event);
    };
    MonthViewComponent.ɵfac = function MonthViewComponent_Factory(t) { return new (t || MonthViewComponent)(i0.ɵɵdirectiveInject(i1.CalendarService)); };
    MonthViewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MonthViewComponent, selectors: [["monthview"]], viewQuery: function MonthViewComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.slider = _t.first);
        } }, inputs: { monthviewDisplayEventTemplate: "monthviewDisplayEventTemplate", monthviewInactiveDisplayEventTemplate: "monthviewInactiveDisplayEventTemplate", monthviewEventDetailTemplate: "monthviewEventDetailTemplate", formatDay: "formatDay", formatDayHeader: "formatDayHeader", formatMonthTitle: "formatMonthTitle", eventSource: "eventSource", startingDayMonth: "startingDayMonth", showEventDetail: "showEventDetail", noEventsLabel: "noEventsLabel", autoSelect: "autoSelect", markDisabled: "markDisabled", locale: "locale", dateFormatter: "dateFormatter", dir: "dir", lockSwipeToPrev: "lockSwipeToPrev", lockSwipes: "lockSwipes", sliderOptions: "sliderOptions" }, outputs: { onRangeChanged: "onRangeChanged", onEventSelected: "onEventSelected", onTimeSelected: "onTimeSelected", onTitleChanged: "onTitleChanged" }, features: [i0.ɵɵNgOnChangesFeature()], decls: 13, vars: 14, consts: [[3, "options", "dir", "ionSlideDidChange"], ["monthSlider", ""], ["class", "table table-bordered table-fixed monthview-datetable", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "table", "table-bordered", "table-fixed", "monthview-datetable"], [4, "ngFor", "ngForOf"], ["tappable", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["tappable", "", 3, "ngClass", "click"], [1, "text-center"]], template: function MonthViewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelementStart(1, "ion-slides", 0, 1);
            i0.ɵɵlistener("ionSlideDidChange", function MonthViewComponent_Template_ion_slides_ionSlideDidChange_1_listener() { return ctx.onSlideChanged(); });
            i0.ɵɵelementStart(3, "ion-slide");
            i0.ɵɵtemplate(4, MonthViewComponent_table_4_Template, 6, 3, "table", 2);
            i0.ɵɵtemplate(5, MonthViewComponent_table_5_Template, 7, 3, "table", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "ion-slide");
            i0.ɵɵtemplate(7, MonthViewComponent_table_7_Template, 6, 3, "table", 2);
            i0.ɵɵtemplate(8, MonthViewComponent_table_8_Template, 7, 3, "table", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "ion-slide");
            i0.ɵɵtemplate(10, MonthViewComponent_table_10_Template, 6, 3, "table", 2);
            i0.ɵɵtemplate(11, MonthViewComponent_table_11_Template, 7, 3, "table", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, MonthViewComponent_ng_template_12_Template, 0, 0, "ng-template", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("options", ctx.sliderOptions)("dir", ctx.dir);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", 0 === ctx.currentViewIndex);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", 0 !== ctx.currentViewIndex);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", 1 === ctx.currentViewIndex);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", 1 !== ctx.currentViewIndex);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", 2 === ctx.currentViewIndex);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", 2 !== ctx.currentViewIndex);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", ctx.monthviewEventDetailTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(10, _c4, ctx.showEventDetail, ctx.selectedDate, ctx.noEventsLabel));
        } }, directives: [i2.IonSlides, i2.IonSlide, i3.NgIf, i3.NgTemplateOutlet, i3.NgForOf, i3.NgClass], styles: [".text-muted[_ngcontent-%COMP%] {\n          color: #999;\n        }\n\n        .table-fixed[_ngcontent-%COMP%] {\n          table-layout: fixed;\n        }\n\n        .table[_ngcontent-%COMP%] {\n          width: 100%;\n          max-width: 100%;\n          background-color: transparent;\n        }\n\n        .table[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]    > tfoot[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]    > tfoot[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] {\n          padding: 8px;\n          line-height: 20px;\n          vertical-align: top;\n        }\n\n        .table[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%] {\n          vertical-align: bottom;\n          border-bottom: 2px solid #ddd;\n        }\n\n        .table[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]:first-child    > tr[_ngcontent-%COMP%]:first-child    > th[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]:first-child    > tr[_ngcontent-%COMP%]:first-child    > td[_ngcontent-%COMP%] {\n          border-top: 0\n        }\n\n        .table[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    + tbody[_ngcontent-%COMP%] {\n          border-top: 2px solid #ddd;\n        }\n\n        .table-bordered[_ngcontent-%COMP%] {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table-bordered[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table-bordered[_ngcontent-%COMP%]    > tfoot[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table-bordered[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%], .table-bordered[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%], .table-bordered[_ngcontent-%COMP%]    > tfoot[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], .table-bordered[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] {\n          border-bottom-width: 2px;\n        }\n\n        .table-striped[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]:nth-child(odd)    > td[_ngcontent-%COMP%], .table-striped[_ngcontent-%COMP%]    > tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]:nth-child(odd)    > th[_ngcontent-%COMP%] {\n          background-color: #f9f9f9\n        }\n\n        .monthview-primary-with-event[_ngcontent-%COMP%] {\n          background-color: #3a87ad;\n          color: white;\n        }\n\n        .monthview-current[_ngcontent-%COMP%] {\n          background-color: #f0f0f0;\n        }\n\n        .monthview-selected[_ngcontent-%COMP%] {\n          background-color: #009900;\n          color: white;\n        }\n\n        .monthview-datetable[_ngcontent-%COMP%]   td.monthview-disabled[_ngcontent-%COMP%] {\n            color: lightgrey;\n            cursor: default;\n        }\n\n        .monthview-datetable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n          text-align: center;\n        }\n\n        .monthview-datetable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n          cursor: pointer;\n          text-align: center;\n        }\n\n        .monthview-secondary-with-event[_ngcontent-%COMP%] {\n          background-color: #d9edf7;\n        }\n\n        [_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar {\n          display: none;\n        }"] });
    return MonthViewComponent;
}());
export { MonthViewComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MonthViewComponent, [{
        type: Component,
        args: [{
                selector: 'monthview',
                template: "\n        <div>\n            <ion-slides #monthSlider [options]=\"sliderOptions\" [dir]=\"dir\" (ionSlideDidChange)=\"onSlideChanged()\">\n                <ion-slide>\n                    <table *ngIf=\"0===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let dayHeader of views[0].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" tappable (click)=\"select(views[0].dates[row*7+col])\"\n                                [ngClass]=\"getHighlightClass(views[0].dates[row*7+col])\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewDisplayEventTemplate\"\n                                [ngTemplateOutletContext]=\"{view: views[0], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"0!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let dayHeader of views[0].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewInactiveDisplayEventTemplate\"\n                                [ngTemplateOutletContext]=\"{view: views[0], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n                <ion-slide>\n                    <table *ngIf=\"1===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let dayHeader of views[1].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" tappable (click)=\"select(views[1].dates[row*7+col])\"\n                                [ngClass]=\"getHighlightClass(views[1].dates[row*7+col])\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewDisplayEventTemplate\"\n                                [ngTemplateOutletContext]=\"{view: views[1], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"1!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let dayHeader of views[1].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewInactiveDisplayEventTemplate\"\n                                [ngTemplateOutletContext]=\"{view: views[1], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n                <ion-slide>\n                    <table *ngIf=\"2===currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr>\n                            <th *ngFor=\"let dayHeader of views[2].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\" tappable (click)=\"select(views[2].dates[row*7+col])\"\n                                [ngClass]=\"getHighlightClass(views[2].dates[row*7+col])\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewDisplayEventTemplate\"\n                                [ngTemplateOutletContext]=\"{view: views[2], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <table *ngIf=\"2!==currentViewIndex\" class=\"table table-bordered table-fixed monthview-datetable\">\n                        <thead>\n                        <tr class=\"text-center\">\n                            <th *ngFor=\"let dayHeader of views[2].dayHeaders\">\n                                <small>{{dayHeader}}</small>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr *ngFor=\"let row of [0,1,2,3,4,5]\">\n                            <td *ngFor=\"let col of [0,1,2,3,4,5,6]\">\n                                <ng-template [ngTemplateOutlet]=\"monthviewInactiveDisplayEventTemplate\"\n                                [ngTemplateOutletContext]=\"{view: views[2], row: row, col: col}\">\n                                </ng-template>\n                            </td>\n                        <tr>\n                        </tbody>\n                    </table>\n                </ion-slide>\n            </ion-slides>\n            <ng-template [ngTemplateOutlet]=\"monthviewEventDetailTemplate\"\n            [ngTemplateOutletContext]=\"{showEventDetail:showEventDetail, selectedDate: selectedDate, noEventsLabel: noEventsLabel}\">\n            </ng-template>\n        </div>\n    ",
                styles: ["\n        .text-muted {\n          color: #999;\n        }\n\n        .table-fixed {\n          table-layout: fixed;\n        }\n\n        .table {\n          width: 100%;\n          max-width: 100%;\n          background-color: transparent;\n        }\n\n        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,\n        .table > tbody > tr > td, .table > tfoot > tr > td {\n          padding: 8px;\n          line-height: 20px;\n          vertical-align: top;\n        }\n\n        .table > thead > tr > th {\n          vertical-align: bottom;\n          border-bottom: 2px solid #ddd;\n        }\n\n        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {\n          border-top: 0\n        }\n\n        .table > tbody + tbody {\n          border-top: 2px solid #ddd;\n        }\n\n        .table-bordered {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,\n        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {\n          border: 1px solid #ddd;\n        }\n\n        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {\n          border-bottom-width: 2px;\n        }\n\n        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {\n          background-color: #f9f9f9\n        }\n\n        .monthview-primary-with-event {\n          background-color: #3a87ad;\n          color: white;\n        }\n\n        .monthview-current {\n          background-color: #f0f0f0;\n        }\n\n        .monthview-selected {\n          background-color: #009900;\n          color: white;\n        }\n\n        .monthview-datetable td.monthview-disabled {\n            color: lightgrey;\n            cursor: default;\n        }\n\n        .monthview-datetable th {\n          text-align: center;\n        }\n\n        .monthview-datetable td {\n          cursor: pointer;\n          text-align: center;\n        }\n\n        .monthview-secondary-with-event {\n          background-color: #d9edf7;\n        }\n\n        ::-webkit-scrollbar,\n        *::-webkit-scrollbar {\n          display: none;\n        }\n    "]
            }]
    }], function () { return [{ type: i1.CalendarService }]; }, { slider: [{
            type: ViewChild,
            args: ['monthSlider']
        }], monthviewDisplayEventTemplate: [{
            type: Input
        }], monthviewInactiveDisplayEventTemplate: [{
            type: Input
        }], monthviewEventDetailTemplate: [{
            type: Input
        }], formatDay: [{
            type: Input
        }], formatDayHeader: [{
            type: Input
        }], formatMonthTitle: [{
            type: Input
        }], eventSource: [{
            type: Input
        }], startingDayMonth: [{
            type: Input
        }], showEventDetail: [{
            type: Input
        }], noEventsLabel: [{
            type: Input
        }], autoSelect: [{
            type: Input
        }], markDisabled: [{
            type: Input
        }], locale: [{
            type: Input
        }], dateFormatter: [{
            type: Input
        }], dir: [{
            type: Input
        }], lockSwipeToPrev: [{
            type: Input
        }], lockSwipes: [{
            type: Input
        }], sliderOptions: [{
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
