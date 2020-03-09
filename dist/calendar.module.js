import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MonthViewComponent } from './monthview';
import { WeekViewComponent } from './weekview';
import { DayViewComponent } from './dayview';
import { CalendarComponent } from './calendar';
import { initPositionScrollComponent } from './init-position-scroll';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/common";
export class NgCalendarModule {
}
NgCalendarModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgCalendarModule });
NgCalendarModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgCalendarModule_Factory(t) { return new (t || NgCalendarModule)(); }, imports: [[IonicModule, CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgCalendarModule, { declarations: [MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent, initPositionScrollComponent], imports: [IonicModule, CommonModule], exports: [CalendarComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgCalendarModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent, initPositionScrollComponent
                ],
                imports: [IonicModule, CommonModule],
                exports: [CalendarComponent],
                entryComponents: [CalendarComponent]
            }]
    }], null, null); })();
i0.ɵɵsetComponentScope(CalendarComponent, [MonthViewComponent, WeekViewComponent, DayViewComponent, CalendarComponent, initPositionScrollComponent, i1.IonApp, i1.IonAvatar, i1.IonBackButton, i1.IonBackdrop, i1.IonBadge, i1.IonButton, i1.IonButtons, i1.IonCard, i1.IonCardContent, i1.IonCardHeader, i1.IonCardSubtitle, i1.IonCardTitle, i1.IonCheckbox, i1.IonChip, i1.IonCol, i1.IonContent, i1.IonDatetime, i1.IonFab, i1.IonFabButton, i1.IonFabList, i1.IonFooter, i1.IonGrid, i1.IonHeader, i1.IonIcon, i1.IonImg, i1.IonInfiniteScroll, i1.IonInfiniteScrollContent, i1.IonInput, i1.IonItem, i1.IonItemDivider, i1.IonItemGroup, i1.IonItemOption, i1.IonItemOptions, i1.IonItemSliding, i1.IonLabel, i1.IonList, i1.IonListHeader, i1.IonMenu, i1.IonMenuButton, i1.IonMenuToggle, i1.IonNav, i1.IonNavLink, i1.IonNote, i1.IonProgressBar, i1.IonRadio, i1.IonRadioGroup, i1.IonRange, i1.IonRefresher, i1.IonRefresherContent, i1.IonReorder, i1.IonReorderGroup, i1.IonRippleEffect, i1.IonRow, i1.IonSearchbar, i1.IonSegment, i1.IonSegmentButton, i1.IonSelect, i1.IonSelectOption, i1.IonSkeletonText, i1.IonSlide, i1.IonSlides, i1.IonSpinner, i1.IonSplitPane, i1.IonTabBar, i1.IonTabButton, i1.IonText, i1.IonTextarea, i1.IonThumbnail, i1.IonToggle, i1.IonToolbar, i1.IonTitle, i1.IonTabs, i1.BooleanValueAccessor, i1.NumericValueAccessor, i1.RadioValueAccessor, i1.SelectValueAccessor, i1.TextValueAccessor, i1.IonRouterOutlet, i1.IonBackButtonDelegate, i1.NavDelegate, i1.RouterLinkDelegate, i1.VirtualFooter, i1.VirtualHeader, i1.VirtualItem, i1.IonVirtualScroll, i2.NgClass, i2.NgComponentOutlet, i2.NgForOf, i2.NgIf, i2.NgTemplateOutlet, i2.NgStyle, i2.NgSwitch, i2.NgSwitchCase, i2.NgSwitchDefault, i2.NgPlural, i2.NgPluralCase], [i2.AsyncPipe, i2.UpperCasePipe, i2.LowerCasePipe, i2.JsonPipe, i2.SlicePipe, i2.DecimalPipe, i2.PercentPipe, i2.TitleCasePipe, i2.CurrencyPipe, i2.DatePipe, i2.I18nPluralPipe, i2.I18nSelectPipe, i2.KeyValuePipe]);
