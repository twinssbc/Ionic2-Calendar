import { DatePipe } from "@angular/common";
import { Component, HostBinding, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./calendar.service";
import * as i2 from "@ionic/angular";
import * as i3 from "@angular/common";
import * as i4 from "./init-position-scroll";
const _c0 = ["weekSlider"];
function WeekViewComponent_th_7_ng_template_1_Template(rf, ctx) { }
const _c1 = function (a0) { return { viewDate: a0 }; };
function WeekViewComponent_th_7_Template(rf, ctx) { if (rf & 1) {
    const _r166 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 7);
    i0.ɵɵlistener("click", function WeekViewComponent_th_7_Template_th_click_0_listener() { i0.ɵɵrestoreView(_r166); const date_r163 = ctx.$implicit; const ctx_r165 = i0.ɵɵnextContext(); return ctx_r165.daySelected(date_r163); });
    i0.ɵɵtemplate(1, WeekViewComponent_th_7_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r163 = ctx.$implicit;
    const ctx_r154 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r154.getHighlightClass(date_r163));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r154.weekviewHeaderTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(3, _c1, date_r163));
} }
function WeekViewComponent_div_8_td_8_ng_template_1_Template(rf, ctx) { }
const _c2 = function (a0, a1) { return { day: a0, eventTemplate: a1 }; };
function WeekViewComponent_div_8_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_8_td_8_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r169 = ctx.$implicit;
    const ctx_r167 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r167.weekviewAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c2, day_r169, ctx_r167.weekviewAllDayEventTemplate));
} }
function WeekViewComponent_div_8_tr_12_td_3_ng_template_1_Template(rf, ctx) { }
const _c3 = function (a0, a1, a2) { return { tm: a0, hourParts: a1, eventTemplate: a2 }; };
function WeekViewComponent_div_8_tr_12_td_3_Template(rf, ctx) { if (rf & 1) {
    const _r177 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 20);
    i0.ɵɵlistener("click", function WeekViewComponent_div_8_tr_12_td_3_Template_td_click_0_listener() { i0.ɵɵrestoreView(_r177); const tm_r174 = ctx.$implicit; const ctx_r176 = i0.ɵɵnextContext(3); return ctx_r176.select(tm_r174.time, tm_r174.events); });
    i0.ɵɵtemplate(1, WeekViewComponent_div_8_tr_12_td_3_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r174 = ctx.$implicit;
    const ctx_r173 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r173.weekviewNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c3, tm_r174, ctx_r173.hourParts, ctx_r173.weekviewNormalEventTemplate));
} }
function WeekViewComponent_div_8_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WeekViewComponent_div_8_tr_12_td_3_Template, 2, 6, "td", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r171 = ctx.$implicit;
    const i_r172 = ctx.index;
    const ctx_r168 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r168.hourColumnLabels[i_r172], " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r171);
} }
function WeekViewComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r179 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 11);
    i0.ɵɵelementStart(5, "table", 12);
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵtemplate(8, WeekViewComponent_div_8_td_8_Template, 2, 5, "td", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "init-position-scroll", 14);
    i0.ɵɵlistener("onScroll", function WeekViewComponent_div_8_Template_init_position_scroll_onScroll_9_listener($event) { i0.ɵɵrestoreView(_r179); const ctx_r178 = i0.ɵɵnextContext(); return ctx_r178.setScrollPosition($event); });
    i0.ɵɵelementStart(10, "table", 15);
    i0.ɵɵelementStart(11, "tbody");
    i0.ɵɵtemplate(12, WeekViewComponent_div_8_tr_12_Template, 4, 2, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r155 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r155.allDayLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r155.views[0].dates);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("initPosition", ctx_r155.initScrollPosition)("emitEvent", ctx_r155.preserveScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r155.views[0].rows);
} }
function WeekViewComponent_div_9_td_8_ng_template_1_Template(rf, ctx) { }
const _c4 = function (a0) { return { day: a0 }; };
function WeekViewComponent_div_9_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_9_td_8_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r182 = ctx.$implicit;
    const ctx_r180 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r180.weekviewInactiveAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c4, day_r182));
} }
function WeekViewComponent_div_9_tr_12_td_3_ng_template_1_Template(rf, ctx) { }
const _c5 = function (a0, a1) { return { tm: a0, hourParts: a1 }; };
function WeekViewComponent_div_9_tr_12_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_9_tr_12_td_3_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r187 = ctx.$implicit;
    const ctx_r186 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r186.weekviewInactiveNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c5, tm_r187, ctx_r186.hourParts));
} }
function WeekViewComponent_div_9_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WeekViewComponent_div_9_tr_12_td_3_Template, 2, 5, "td", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r184 = ctx.$implicit;
    const i_r185 = ctx.index;
    const ctx_r181 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r181.hourColumnLabels[i_r185], " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r184);
} }
function WeekViewComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 11);
    i0.ɵɵelementStart(5, "table", 12);
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵtemplate(8, WeekViewComponent_div_9_td_8_Template, 2, 4, "td", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "init-position-scroll", 21);
    i0.ɵɵelementStart(10, "table", 15);
    i0.ɵɵelementStart(11, "tbody");
    i0.ɵɵtemplate(12, WeekViewComponent_div_9_tr_12_Template, 4, 2, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r156 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r156.allDayLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r156.views[0].dates);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("initPosition", ctx_r156.initScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r156.views[0].rows);
} }
function WeekViewComponent_th_15_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_th_15_Template(rf, ctx) { if (rf & 1) {
    const _r192 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 7);
    i0.ɵɵlistener("click", function WeekViewComponent_th_15_Template_th_click_0_listener() { i0.ɵɵrestoreView(_r192); const date_r189 = ctx.$implicit; const ctx_r191 = i0.ɵɵnextContext(); return ctx_r191.daySelected(date_r189); });
    i0.ɵɵtemplate(1, WeekViewComponent_th_15_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r189 = ctx.$implicit;
    const ctx_r157 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r157.getHighlightClass(date_r189));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r157.weekviewHeaderTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(3, _c1, date_r189));
} }
function WeekViewComponent_div_16_td_8_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_16_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_16_td_8_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r195 = ctx.$implicit;
    const ctx_r193 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r193.weekviewAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c2, day_r195, ctx_r193.weekviewAllDayEventTemplate));
} }
function WeekViewComponent_div_16_tr_12_td_3_div_1_ng_template_1_Template(rf, ctx) { }
const _c6 = function (a0) { return { "calendar-event-wrap": a0 }; };
function WeekViewComponent_div_16_tr_12_td_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, WeekViewComponent_div_16_tr_12_td_3_div_1_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r200 = i0.ɵɵnextContext().$implicit;
    const ctx_r201 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c6, tm_r200.events));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r201.weekviewNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(5, _c3, tm_r200, ctx_r201.hourParts, ctx_r201.weekviewNormalEventTemplate));
} }
function WeekViewComponent_div_16_tr_12_td_3_Template(rf, ctx) { if (rf & 1) {
    const _r205 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 20);
    i0.ɵɵlistener("click", function WeekViewComponent_div_16_tr_12_td_3_Template_td_click_0_listener() { i0.ɵɵrestoreView(_r205); const tm_r200 = ctx.$implicit; const ctx_r204 = i0.ɵɵnextContext(3); return ctx_r204.select(tm_r200.time, tm_r200.events); });
    i0.ɵɵtemplate(1, WeekViewComponent_div_16_tr_12_td_3_div_1_Template, 2, 9, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r200 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", tm_r200.events);
} }
function WeekViewComponent_div_16_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WeekViewComponent_div_16_tr_12_td_3_Template, 2, 1, "td", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r197 = ctx.$implicit;
    const i_r198 = ctx.index;
    const ctx_r194 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r194.hourColumnLabels[i_r198], " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r197);
} }
function WeekViewComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r207 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 11);
    i0.ɵɵelementStart(5, "table", 12);
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵtemplate(8, WeekViewComponent_div_16_td_8_Template, 2, 5, "td", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "init-position-scroll", 14);
    i0.ɵɵlistener("onScroll", function WeekViewComponent_div_16_Template_init_position_scroll_onScroll_9_listener($event) { i0.ɵɵrestoreView(_r207); const ctx_r206 = i0.ɵɵnextContext(); return ctx_r206.setScrollPosition($event); });
    i0.ɵɵelementStart(10, "table", 15);
    i0.ɵɵelementStart(11, "tbody");
    i0.ɵɵtemplate(12, WeekViewComponent_div_16_tr_12_Template, 4, 2, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r158 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r158.allDayLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r158.views[1].dates);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("initPosition", ctx_r158.initScrollPosition)("emitEvent", ctx_r158.preserveScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r158.views[1].rows);
} }
function WeekViewComponent_div_17_td_8_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_17_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_17_td_8_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r210 = ctx.$implicit;
    const ctx_r208 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r208.weekviewInactiveAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c4, day_r210));
} }
function WeekViewComponent_div_17_tr_12_td_3_div_1_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_17_tr_12_td_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, WeekViewComponent_div_17_tr_12_td_3_div_1_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r215 = i0.ɵɵnextContext().$implicit;
    const ctx_r216 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c6, tm_r215.events));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r216.weekviewInactiveNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(5, _c5, tm_r215, ctx_r216.hourParts));
} }
function WeekViewComponent_div_17_tr_12_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_17_tr_12_td_3_div_1_Template, 2, 8, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r215 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", tm_r215.events);
} }
function WeekViewComponent_div_17_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WeekViewComponent_div_17_tr_12_td_3_Template, 2, 1, "td", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r212 = ctx.$implicit;
    const i_r213 = ctx.index;
    const ctx_r209 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r209.hourColumnLabels[i_r213], " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r212);
} }
function WeekViewComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 11);
    i0.ɵɵelementStart(5, "table", 12);
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵtemplate(8, WeekViewComponent_div_17_td_8_Template, 2, 4, "td", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "init-position-scroll", 21);
    i0.ɵɵelementStart(10, "table", 15);
    i0.ɵɵelementStart(11, "tbody");
    i0.ɵɵtemplate(12, WeekViewComponent_div_17_tr_12_Template, 4, 2, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r159 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r159.allDayLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r159.views[1].dates);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("initPosition", ctx_r159.initScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r159.views[1].rows);
} }
function WeekViewComponent_th_23_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    const _r222 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 7);
    i0.ɵɵlistener("click", function WeekViewComponent_th_23_Template_th_click_0_listener() { i0.ɵɵrestoreView(_r222); const date_r219 = ctx.$implicit; const ctx_r221 = i0.ɵɵnextContext(); return ctx_r221.daySelected(date_r219); });
    i0.ɵɵtemplate(1, WeekViewComponent_th_23_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r219 = ctx.$implicit;
    const ctx_r160 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r160.getHighlightClass(date_r219));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r160.weekviewHeaderTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(3, _c1, date_r219));
} }
function WeekViewComponent_div_24_td_8_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_24_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_24_td_8_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r225 = ctx.$implicit;
    const ctx_r223 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r223.weekviewAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c2, day_r225, ctx_r223.weekviewAllDayEventTemplate));
} }
function WeekViewComponent_div_24_tr_12_td_3_div_1_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_24_tr_12_td_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, WeekViewComponent_div_24_tr_12_td_3_div_1_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r230 = i0.ɵɵnextContext().$implicit;
    const ctx_r231 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c6, tm_r230.events));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r231.weekviewNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction3(5, _c3, tm_r230, ctx_r231.hourParts, ctx_r231.weekviewNormalEventTemplate));
} }
function WeekViewComponent_div_24_tr_12_td_3_Template(rf, ctx) { if (rf & 1) {
    const _r235 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 20);
    i0.ɵɵlistener("click", function WeekViewComponent_div_24_tr_12_td_3_Template_td_click_0_listener() { i0.ɵɵrestoreView(_r235); const tm_r230 = ctx.$implicit; const ctx_r234 = i0.ɵɵnextContext(3); return ctx_r234.select(tm_r230.time, tm_r230.events); });
    i0.ɵɵtemplate(1, WeekViewComponent_div_24_tr_12_td_3_div_1_Template, 2, 9, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r230 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", tm_r230.events);
} }
function WeekViewComponent_div_24_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WeekViewComponent_div_24_tr_12_td_3_Template, 2, 1, "td", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r227 = ctx.$implicit;
    const i_r228 = ctx.index;
    const ctx_r224 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r224.hourColumnLabels[i_r228], " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r227);
} }
function WeekViewComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    const _r237 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 11);
    i0.ɵɵelementStart(5, "table", 12);
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵtemplate(8, WeekViewComponent_div_24_td_8_Template, 2, 5, "td", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "init-position-scroll", 14);
    i0.ɵɵlistener("onScroll", function WeekViewComponent_div_24_Template_init_position_scroll_onScroll_9_listener($event) { i0.ɵɵrestoreView(_r237); const ctx_r236 = i0.ɵɵnextContext(); return ctx_r236.setScrollPosition($event); });
    i0.ɵɵelementStart(10, "table", 15);
    i0.ɵɵelementStart(11, "tbody");
    i0.ɵɵtemplate(12, WeekViewComponent_div_24_tr_12_Template, 4, 2, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r161 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r161.allDayLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r161.views[2].dates);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("initPosition", ctx_r161.initScrollPosition)("emitEvent", ctx_r161.preserveScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r161.views[2].rows);
} }
function WeekViewComponent_div_25_td_8_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_25_td_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_25_td_8_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r240 = ctx.$implicit;
    const ctx_r238 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r238.weekviewInactiveAllDayEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c4, day_r240));
} }
function WeekViewComponent_div_25_tr_12_td_3_div_1_ng_template_1_Template(rf, ctx) { }
function WeekViewComponent_div_25_tr_12_td_3_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, WeekViewComponent_div_25_tr_12_td_3_div_1_ng_template_1_Template, 0, 0, "ng-template", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r245 = i0.ɵɵnextContext().$implicit;
    const ctx_r246 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c6, tm_r245.events));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r246.weekviewInactiveNormalEventSectionTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(5, _c5, tm_r245, ctx_r246.hourParts));
} }
function WeekViewComponent_div_25_tr_12_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtemplate(1, WeekViewComponent_div_25_tr_12_td_3_div_1_Template, 2, 8, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tm_r245 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", tm_r245.events);
} }
function WeekViewComponent_div_25_tr_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵelementStart(1, "td", 18);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WeekViewComponent_div_25_tr_12_td_3_Template, 2, 1, "td", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r242 = ctx.$implicit;
    const i_r243 = ctx.index;
    const ctx_r239 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r239.hourColumnLabels[i_r243], " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r242);
} }
function WeekViewComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 11);
    i0.ɵɵelementStart(5, "table", 12);
    i0.ɵɵelementStart(6, "tbody");
    i0.ɵɵelementStart(7, "tr");
    i0.ɵɵtemplate(8, WeekViewComponent_div_25_td_8_Template, 2, 4, "td", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "init-position-scroll", 21);
    i0.ɵɵelementStart(10, "table", 15);
    i0.ɵɵelementStart(11, "tbody");
    i0.ɵɵtemplate(12, WeekViewComponent_div_25_tr_12_Template, 4, 2, "tr", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r162 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r162.allDayLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r162.views[2].dates);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("initPosition", ctx_r162.initScrollPosition);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r162.views[2].rows);
} }
export class WeekViewComponent {
    constructor(calendarService, elm) {
        this.calendarService = calendarService;
        this.elm = elm;
        this.class = true;
        this.autoSelect = true;
        this.dir = "";
        this.scrollToHour = 0;
        this.onRangeChanged = new EventEmitter();
        this.onEventSelected = new EventEmitter();
        this.onTimeSelected = new EventEmitter();
        this.onTitleChanged = new EventEmitter(true);
        this.views = [];
        this.currentViewIndex = 0;
        this.direction = 0;
        this.mode = "week";
        this.inited = false;
        this.callbackOnInit = true;
    }
    ngOnInit() {
        if (!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;
        this.hourRange = (this.endHour - this.startHour) * this.hourSegments;
        if (this.dateFormatter && this.dateFormatter.formatWeekViewDayHeader) {
            this.formatDayHeader = this.dateFormatter.formatWeekViewDayHeader;
        }
        else {
            let datePipe = new DatePipe(this.locale);
            this.formatDayHeader = function (date) {
                return datePipe.transform(date, this.formatWeekViewDayHeader);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatWeekViewTitle) {
            this.formatTitle = this.dateFormatter.formatWeekViewTitle;
        }
        else {
            let datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date) {
                return datePipe.transform(date, this.formatWeekTitle);
            };
        }
        if (this.dateFormatter && this.dateFormatter.formatWeekViewHourColumn) {
            this.formatHourColumnLabel = this.dateFormatter.formatWeekViewHourColumn;
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
            let hourColumns = this.elm.nativeElement
                .querySelector(".weekview-normal-event-container")
                .querySelectorAll(".calendar-hour-column");
            let me = this;
            setTimeout(function () {
                me.initScrollPosition =
                    hourColumns[me.scrollToHour - me.startHour].offsetTop;
            }, 50);
        }
    }
    ngOnChanges(changes) {
        if (!this.inited)
            return;
        let eventSourceChange = changes["eventSource"];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }
        let lockSwipeToPrev = changes["lockSwipeToPrev"];
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }
        let lockSwipes = changes["lockSwipes"];
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
        let currentSlideIndex = this.slider.getActiveIndex(), direction = 0, currentViewIndex = this.currentViewIndex;
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
        if (direction === 0) {
            return;
        }
        this.direction = direction;
        let adjacent = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
        this.calendarService.setCurrentDate(adjacent);
        this.refreshView();
        this.direction = 0;
    }
    static createDateObjects(startTime, startHour, endHour, timeInterval) {
        let times = [], currentHour = startTime.getHours(), currentDate = startTime.getDate(), hourStep, minStep;
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
                let row = [];
                for (let day = 0; day < 7; day += 1) {
                    let time = new Date(startTime.getTime());
                    time.setHours(currentHour + hour, interval);
                    time.setDate(currentDate + day);
                    row.push({
                        events: [],
                        time: time
                    });
                }
                times.push(row);
            }
        }
        return times;
    }
    static getDates(startTime, n) {
        let dates = new Array(n), current = new Date(startTime.getTime()), i = 0;
        current.setHours(12); // Prevent repeated dates because of timezone bug
        while (i < n) {
            dates[i++] = {
                date: new Date(current.getTime()),
                events: [],
                dayHeader: ""
            };
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }
    getHourColumnLabels() {
        let hourColumnLabels = [];
        for (let hour = 0, length = this.views[0].rows.length; hour < length; hour += 1) {
            hourColumnLabels.push(this.formatHourColumnLabel(this.views[0].rows[hour][0].time));
        }
        return hourColumnLabels;
    }
    getViewData(startTime) {
        let dates = WeekViewComponent.getDates(startTime, 7);
        for (let i = 0; i < 7; i++) {
            dates[i].dayHeader = this.formatDayHeader(dates[i].date);
        }
        return {
            rows: WeekViewComponent.createDateObjects(startTime, this.startHour, this.endHour, this.hourSegments),
            dates: dates
        };
    }
    getRange(currentDate) {
        let year = currentDate.getFullYear(), month = currentDate.getMonth(), date = currentDate.getDate(), day = currentDate.getDay(), difference = day - this.startingDayWeek;
        if (difference < 0) {
            difference += 7;
        }
        let firstDayOfWeek = new Date(year, month, date - difference);
        let endTime = new Date(year, month, date - difference + 7);
        return {
            startTime: firstDayOfWeek,
            endTime: endTime
        };
    }
    onDataLoaded() {
        let eventSource = this.eventSource, len = eventSource ? eventSource.length : 0, startTime = this.range.startTime, endTime = this.range.endTime, utcStartTime = new Date(Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())), utcEndTime = new Date(Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())), currentViewIndex = this.currentViewIndex, rows = this.views[currentViewIndex].rows, dates = this.views[currentViewIndex].dates, oneHour = 3600000, oneDay = 86400000, 
        // add allday eps
        eps = 0.016, allDayEventInRange = false, normalEventInRange = false, rangeStartRowIndex = this.startHour * this.hourSegments, rangeEndRowIndex = this.endHour * this.hourSegments, allRows = 24 * this.hourSegments;
        for (let i = 0; i < 7; i += 1) {
            dates[i].events = [];
            dates[i].hasEvent = false;
        }
        for (let day = 0; day < 7; day += 1) {
            for (let hour = 0; hour < this.hourRange; hour += 1) {
                rows[hour][day].events = [];
            }
        }
        for (let i = 0; i < len; i += 1) {
            let event = eventSource[i];
            let eventStartTime = new Date(event.startTime.getTime());
            let eventEndTime = new Date(event.endTime.getTime());
            if (event.allDay) {
                if (eventEndTime <= utcStartTime ||
                    eventStartTime >= utcEndTime) {
                    continue;
                }
                else {
                    allDayEventInRange = true;
                    let allDayStartIndex;
                    if (eventStartTime <= utcStartTime) {
                        allDayStartIndex = 0;
                    }
                    else {
                        allDayStartIndex = Math.floor((eventStartTime.getTime() -
                            utcStartTime.getTime()) /
                            oneDay);
                    }
                    let allDayEndIndex;
                    if (eventEndTime >= utcEndTime) {
                        allDayEndIndex = Math.ceil((utcEndTime.getTime() - utcStartTime.getTime()) /
                            oneDay);
                    }
                    else {
                        allDayEndIndex = Math.ceil((eventEndTime.getTime() - utcStartTime.getTime()) /
                            oneDay);
                    }
                    let displayAllDayEvent = {
                        event: event,
                        startIndex: allDayStartIndex,
                        endIndex: allDayEndIndex
                    };
                    let eventSet = dates[allDayStartIndex].events;
                    if (eventSet) {
                        eventSet.push(displayAllDayEvent);
                    }
                    else {
                        eventSet = [];
                        eventSet.push(displayAllDayEvent);
                        dates[allDayStartIndex].events = eventSet;
                    }
                    dates[allDayStartIndex].hasEvent = true;
                }
            }
            else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                }
                else {
                    normalEventInRange = true;
                    let timeDiff;
                    let timeDifferenceStart;
                    if (eventStartTime <= startTime) {
                        timeDifferenceStart = 0;
                    }
                    else {
                        timeDiff =
                            eventStartTime.getTime() -
                                startTime.getTime() -
                                (eventStartTime.getTimezoneOffset() -
                                    startTime.getTimezoneOffset()) *
                                    60000;
                        timeDifferenceStart =
                            (timeDiff / oneHour) * this.hourSegments;
                    }
                    let timeDifferenceEnd;
                    if (eventEndTime >= endTime) {
                        timeDiff =
                            endTime.getTime() -
                                startTime.getTime() -
                                (endTime.getTimezoneOffset() -
                                    startTime.getTimezoneOffset()) *
                                    60000;
                        timeDifferenceEnd =
                            (timeDiff / oneHour) * this.hourSegments;
                    }
                    else {
                        timeDiff =
                            eventEndTime.getTime() -
                                startTime.getTime() -
                                (eventEndTime.getTimezoneOffset() -
                                    startTime.getTimezoneOffset()) *
                                    60000;
                        timeDifferenceEnd =
                            (timeDiff / oneHour) * this.hourSegments;
                    }
                    let startIndex = Math.floor(timeDifferenceStart), endIndex = Math.ceil(timeDifferenceEnd - eps), startRowIndex = startIndex % allRows, dayIndex = Math.floor(startIndex / allRows), endOfDay = dayIndex * allRows, startOffset = 0, endOffset = 0;
                    if (this.hourParts !== 1) {
                        if (startRowIndex < rangeStartRowIndex) {
                            startOffset = 0;
                        }
                        else {
                            startOffset = Math.floor((timeDifferenceStart - startIndex) *
                                this.hourParts);
                        }
                    }
                    do {
                        endOfDay += allRows;
                        let endRowIndex;
                        if (endOfDay < endIndex) {
                            endRowIndex = allRows;
                        }
                        else {
                            if (endOfDay === endIndex) {
                                endRowIndex = allRows;
                            }
                            else {
                                endRowIndex = endIndex % allRows;
                            }
                            if (this.hourParts !== 1) {
                                if (endRowIndex > rangeEndRowIndex) {
                                    endOffset = 0;
                                }
                                else {
                                    endOffset = Math.floor((endIndex - timeDifferenceEnd) *
                                        this.hourParts);
                                }
                            }
                        }
                        if (startRowIndex < rangeStartRowIndex) {
                            startRowIndex = 0;
                        }
                        else {
                            startRowIndex -= rangeStartRowIndex;
                        }
                        if (endRowIndex > rangeEndRowIndex) {
                            endRowIndex = rangeEndRowIndex;
                        }
                        endRowIndex -= rangeStartRowIndex;
                        if (startRowIndex < endRowIndex) {
                            let displayEvent = {
                                event: event,
                                startIndex: startRowIndex,
                                endIndex: endRowIndex,
                                startOffset: startOffset,
                                endOffset: endOffset
                            };
                            let eventSet = rows[startRowIndex][dayIndex].events;
                            if (eventSet) {
                                eventSet.push(displayEvent);
                            }
                            else {
                                eventSet = [];
                                eventSet.push(displayEvent);
                                rows[startRowIndex][dayIndex].events = eventSet;
                            }
                            dates[dayIndex].hasEvent = true;
                        }
                        startRowIndex = 0;
                        startOffset = 0;
                        dayIndex += 1;
                    } while (endOfDay < endIndex);
                }
            }
        }
        if (normalEventInRange) {
            for (let day = 0; day < 7; day += 1) {
                let orderedEvents = [];
                for (let hour = 0; hour < this.hourRange; hour += 1) {
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
            let orderedAllDayEvents = [];
            for (let day = 0; day < 7; day += 1) {
                if (dates[day].events) {
                    orderedAllDayEvents = orderedAllDayEvents.concat(dates[day].events);
                }
            }
            if (orderedAllDayEvents.length > 0) {
                this.placeAllDayEvents(orderedAllDayEvents);
            }
        }
        if (this.autoSelect) {
            let findSelected = false;
            let selectedDate;
            for (let r = 0; r < 7; r += 1) {
                if (dates[r].selected) {
                    selectedDate = dates[r];
                    findSelected = true;
                    break;
                }
            }
            if (findSelected) {
                let disabled = false;
                if (this.markDisabled) {
                    disabled = this.markDisabled(selectedDate.date);
                }
                this.onTimeSelected.emit({
                    selectedTime: selectedDate.date,
                    events: selectedDate.events.map(e => e.event),
                    disabled: disabled
                });
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
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    }
    getTitle() {
        let firstDayOfWeek = new Date(this.range.startTime.getTime());
        firstDayOfWeek.setHours(12, 0, 0, 0);
        return this.formatTitle(firstDayOfWeek);
    }
    getHighlightClass(date) {
        let className = "";
        if (date.hasEvent) {
            if (className) {
                className += " ";
            }
            className = "weekview-with-event";
        }
        if (date.selected) {
            if (className) {
                className += " ";
            }
            className += "weekview-selected";
        }
        if (date.current) {
            if (className) {
                className += " ";
            }
            className += "weekview-current";
        }
        return className;
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
        WeekViewComponent.calculateWidth(orderedEvents, this.hourRange, this.hourParts);
    }
    placeAllDayEvents(orderedEvents) {
        this.calculatePosition(orderedEvents);
    }
    overlap(event1, event2) {
        let earlyEvent = event1, lateEvent = event2;
        if (event1.startIndex > event2.startIndex ||
            (event1.startIndex === event2.startIndex &&
                event1.startOffset > event2.startOffset)) {
            earlyEvent = event2;
            lateEvent = event1;
        }
        if (earlyEvent.endIndex <= lateEvent.startIndex) {
            return false;
        }
        else {
            return !(earlyEvent.endIndex - lateEvent.startIndex === 1 &&
                earlyEvent.endOffset + lateEvent.startOffset >= this.hourParts);
        }
    }
    calculatePosition(events) {
        let len = events.length, maxColumn = 0, isForbidden = new Array(len);
        for (let i = 0; i < len; i += 1) {
            let col;
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
        if (this.dir === "rtl") {
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
                    while (index <
                        event.endIndex * hourParts - event.endOffset) {
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
    updateCurrentView(currentViewStartDate, view) {
        let currentCalendarDate = this.calendarService.currentDate, today = new Date(), oneDay = 86400000, selectedDayDifference = Math.floor((currentCalendarDate.getTime() -
            currentViewStartDate.getTime() -
            (currentCalendarDate.getTimezoneOffset() -
                currentViewStartDate.getTimezoneOffset()) *
                60000) /
            oneDay), currentDayDifference = Math.floor((today.getTime() -
            currentViewStartDate.getTime() -
            (today.getTimezoneOffset() -
                currentViewStartDate.getTimezoneOffset()) *
                60000) /
            oneDay);
        for (let r = 0; r < 7; r += 1) {
            view.dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 &&
            selectedDayDifference < 7 &&
            this.autoSelect) {
            view.dates[selectedDayDifference].selected = true;
        }
        if (currentDayDifference >= 0 && currentDayDifference < 7) {
            view.dates[currentDayDifference].current = true;
        }
    }
    daySelected(viewDate) {
        let selectedDate = viewDate.date, dates = this.views[this.currentViewIndex].dates, currentViewStartDate = this.range.startTime, oneDay = 86400000, selectedDayDifference = Math.floor((selectedDate.getTime() -
            currentViewStartDate.getTime() -
            (selectedDate.getTimezoneOffset() -
                currentViewStartDate.getTimezoneOffset()) *
                60000) /
            oneDay);
        this.calendarService.setCurrentDate(selectedDate);
        for (let r = 0; r < 7; r += 1) {
            dates[r].selected = false;
        }
        if (selectedDayDifference >= 0 && selectedDayDifference < 7) {
            dates[selectedDayDifference].selected = true;
        }
        let disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(selectedDate);
        }
        this.onTimeSelected.emit({
            selectedTime: selectedDate,
            events: viewDate.events.map(e => e.event),
            disabled: disabled
        });
    }
    setScrollPosition(scrollPosition) {
        this.initScrollPosition = scrollPosition;
    }
}
WeekViewComponent.ɵfac = function WeekViewComponent_Factory(t) { return new (t || WeekViewComponent)(i0.ɵɵdirectiveInject(i1.CalendarService), i0.ɵɵdirectiveInject(i0.ElementRef)); };
WeekViewComponent.ɵcmp = i0.ɵɵdefineComponent({ type: WeekViewComponent, selectors: [["weekview"]], viewQuery: function WeekViewComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.slider = _t.first);
    } }, hostVars: 2, hostBindings: function WeekViewComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("weekview", ctx.class);
    } }, inputs: { weekviewHeaderTemplate: "weekviewHeaderTemplate", weekviewAllDayEventTemplate: "weekviewAllDayEventTemplate", weekviewNormalEventTemplate: "weekviewNormalEventTemplate", weekviewAllDayEventSectionTemplate: "weekviewAllDayEventSectionTemplate", weekviewNormalEventSectionTemplate: "weekviewNormalEventSectionTemplate", weekviewInactiveAllDayEventSectionTemplate: "weekviewInactiveAllDayEventSectionTemplate", weekviewInactiveNormalEventSectionTemplate: "weekviewInactiveNormalEventSectionTemplate", formatWeekTitle: "formatWeekTitle", formatWeekViewDayHeader: "formatWeekViewDayHeader", formatHourColumn: "formatHourColumn", startingDayWeek: "startingDayWeek", allDayLabel: "allDayLabel", hourParts: "hourParts", eventSource: "eventSource", autoSelect: "autoSelect", markDisabled: "markDisabled", locale: "locale", dateFormatter: "dateFormatter", dir: "dir", scrollToHour: "scrollToHour", preserveScrollPosition: "preserveScrollPosition", lockSwipeToPrev: "lockSwipeToPrev", lockSwipes: "lockSwipes", startHour: "startHour", endHour: "endHour", sliderOptions: "sliderOptions", hourSegments: "hourSegments" }, outputs: { onRangeChanged: "onRangeChanged", onEventSelected: "onEventSelected", onTimeSelected: "onTimeSelected", onTitleChanged: "onTitleChanged" }, features: [i0.ɵɵNgOnChangesFeature()], decls: 26, vars: 11, consts: [[1, "slides-container", 3, "options", "dir", "ionSlideDidChange"], ["weekSlider", ""], [1, "slide-container"], [1, "table", "table-bordered", "table-fixed", "weekview-header"], [1, "calendar-hour-column"], ["class", "weekview-header text-center", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "weekview-header", "text-center", 3, "ngClass", "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "weekview-allday-table"], [1, "weekview-allday-label"], [1, "weekview-allday-content-wrapper", "scroll-content"], [1, "table", "table-fixed", "weekview-allday-content-table"], ["class", "calendar-cell", 4, "ngFor", "ngForOf"], [1, "weekview-normal-event-container", 3, "initPosition", "emitEvent", "onScroll"], [1, "table", "table-bordered", "table-fixed", "weekview-normal-event-table"], [4, "ngFor", "ngForOf"], [1, "calendar-cell"], [1, "calendar-hour-column", "text-center"], ["class", "calendar-cell", "tappable", "", 3, "click", 4, "ngFor", "ngForOf"], ["tappable", "", 1, "calendar-cell", 3, "click"], [1, "weekview-normal-event-container", 3, "initPosition"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"]], template: function WeekViewComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ion-slides", 0, 1);
        i0.ɵɵlistener("ionSlideDidChange", function WeekViewComponent_Template_ion_slides_ionSlideDidChange_0_listener() { return ctx.onSlideChanged(); });
        i0.ɵɵelementStart(2, "ion-slide", 2);
        i0.ɵɵelementStart(3, "table", 3);
        i0.ɵɵelementStart(4, "thead");
        i0.ɵɵelementStart(5, "tr");
        i0.ɵɵelement(6, "th", 4);
        i0.ɵɵtemplate(7, WeekViewComponent_th_7_Template, 2, 5, "th", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, WeekViewComponent_div_8_Template, 13, 5, "div", 6);
        i0.ɵɵtemplate(9, WeekViewComponent_div_9_Template, 13, 4, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "ion-slide", 2);
        i0.ɵɵelementStart(11, "table", 3);
        i0.ɵɵelementStart(12, "thead");
        i0.ɵɵelementStart(13, "tr");
        i0.ɵɵelement(14, "th", 4);
        i0.ɵɵtemplate(15, WeekViewComponent_th_15_Template, 2, 5, "th", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(16, WeekViewComponent_div_16_Template, 13, 5, "div", 6);
        i0.ɵɵtemplate(17, WeekViewComponent_div_17_Template, 13, 4, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(18, "ion-slide", 2);
        i0.ɵɵelementStart(19, "table", 3);
        i0.ɵɵelementStart(20, "thead");
        i0.ɵɵelementStart(21, "tr");
        i0.ɵɵelement(22, "th", 4);
        i0.ɵɵtemplate(23, WeekViewComponent_th_23_Template, 2, 5, "th", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(24, WeekViewComponent_div_24_Template, 13, 5, "div", 6);
        i0.ɵɵtemplate(25, WeekViewComponent_div_25_Template, 13, 4, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("options", ctx.sliderOptions)("dir", ctx.dir);
        i0.ɵɵadvance(7);
        i0.ɵɵproperty("ngForOf", ctx.views[0].dates);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 0 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 0 !== ctx.currentViewIndex);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngForOf", ctx.views[1].dates);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 1 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 1 !== ctx.currentViewIndex);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngForOf", ctx.views[2].dates);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 2 === ctx.currentViewIndex);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", 2 !== ctx.currentViewIndex);
    } }, directives: [i2.IonSlides, i2.IonSlide, i3.NgForOf, i3.NgIf, i3.NgClass, i3.NgTemplateOutlet, i4.initPositionScrollComponent], styles: [".table-fixed {\n    table-layout: fixed;\n}\n\n.table {\n    width: 100%;\n    max-width: 100%;\n    background-color: transparent;\n}\n\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n    padding: 8px;\n    line-height: 20px;\n    vertical-align: top;\n}\n\n.table > thead > tr > th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #ddd;\n}\n\n.table > thead:first-child > tr:first-child > th,\n.table > thead:first-child > tr:first-child > td {\n    border-top: 0;\n}\n\n.table > tbody + tbody {\n    border-top: 2px solid #ddd;\n}\n\n.table-bordered {\n    border: 1px solid #ddd;\n}\n\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n    border: 1px solid #ddd;\n}\n\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n    border-bottom-width: 2px;\n}\n\n.table-striped > tbody > tr:nth-child(odd) > td,\n.table-striped > tbody > tr:nth-child(odd) > th {\n    background-color: #f9f9f9;\n}\n\n.calendar-hour-column {\n    width: 50px;\n    white-space: nowrap;\n}\n\n.calendar-event-wrap {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n\n.calendar-event {\n    position: absolute;\n    padding: 2px;\n    cursor: pointer;\n    z-index: 10000;\n}\n\n.calendar-cell {\n    padding: 0 !important;\n    height: 37px;\n}\n\n.slides-container {\n    height: 100%;\n}\n\n.slide-container {\n    display: block;\n}\n\n.weekview-allday-label {\n    float: left;\n    height: 100%;\n    line-height: 50px;\n    text-align: center;\n    width: 50px;\n    border-left: 1px solid #ddd;\n}\n\n[dir=\"rtl\"] .weekview-allday-label {\n    float: right;\n    border-right: 1px solid #ddd;\n}\n\n.weekview-allday-content-wrapper {\n    margin-left: 50px;\n    overflow: hidden;\n    height: 51px;\n}\n\n[dir=\"rtl\"] .weekview-allday-content-wrapper {\n    margin-left: 0;\n    margin-right: 50px;\n}\n\n.weekview-allday-content-table {\n    min-height: 50px;\n}\n\n.weekview-allday-content-table td {\n    border-left: 1px solid #ddd;\n    border-right: 1px solid #ddd;\n}\n\n.weekview-header th {\n    overflow: hidden;\n    white-space: nowrap;\n    font-size: 14px;\n}\n\n.weekview-allday-table {\n    height: 50px;\n    position: relative;\n    border-bottom: 1px solid #ddd;\n    font-size: 14px;\n}\n\n.weekview-normal-event-container {\n    margin-top: 87px;\n    overflow: hidden;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    position: absolute;\n    font-size: 14px;\n}\n\n.scroll-content {\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n::-webkit-scrollbar,\n*::-webkit-scrollbar {\n    display: none;\n}\n\n.table > tbody > tr > td.calendar-hour-column {\n    padding-left: 0;\n    padding-right: 0;\n    vertical-align: middle;\n}\n\n@media (max-width: 750px) {\n    .weekview-allday-label,\n    .calendar-hour-column {\n        width: 31px;\n        font-size: 12px;\n    }\n\n    .weekview-allday-label {\n        padding-top: 4px;\n    }\n\n    .table > tbody > tr > td.calendar-hour-column {\n        padding-left: 0;\n        padding-right: 0;\n        vertical-align: middle;\n        line-height: 12px;\n    }\n\n    .table > thead > tr > th.weekview-header {\n        padding-left: 0;\n        padding-right: 0;\n        font-size: 12px;\n    }\n\n    .weekview-allday-label {\n        line-height: 20px;\n    }\n\n    .weekview-allday-content-wrapper {\n        margin-left: 31px;\n    }\n\n    [dir=\"rtl\"] .weekview-allday-content-wrapper {\n        margin-left: 0;\n        margin-right: 31px;\n    }\n}\n"], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WeekViewComponent, [{
        type: Component,
        args: [{
                selector: "weekview",
                templateUrl: "./weekview.html",
                styleUrls: ["./weekview.scss"],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: i1.CalendarService }, { type: i0.ElementRef }]; }, { slider: [{
            type: ViewChild,
            args: ["weekSlider"]
        }], class: [{
            type: HostBinding,
            args: ["class.weekview"]
        }], weekviewHeaderTemplate: [{
            type: Input
        }], weekviewAllDayEventTemplate: [{
            type: Input
        }], weekviewNormalEventTemplate: [{
            type: Input
        }], weekviewAllDayEventSectionTemplate: [{
            type: Input
        }], weekviewNormalEventSectionTemplate: [{
            type: Input
        }], weekviewInactiveAllDayEventSectionTemplate: [{
            type: Input
        }], weekviewInactiveNormalEventSectionTemplate: [{
            type: Input
        }], formatWeekTitle: [{
            type: Input
        }], formatWeekViewDayHeader: [{
            type: Input
        }], formatHourColumn: [{
            type: Input
        }], startingDayWeek: [{
            type: Input
        }], allDayLabel: [{
            type: Input
        }], hourParts: [{
            type: Input
        }], eventSource: [{
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
