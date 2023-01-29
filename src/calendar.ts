import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Inject, LOCALE_ID, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarService } from './calendar.service';
import SwiperCore from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { IEvent, CalendarMode, QueryMode, Step, IMonthViewDisplayEventTemplateContext, IMonthViewEventDetailTemplateContext, IDisplayWeekViewHeader, IDisplayAllDayEvent, IDisplayEvent, IWeekViewAllDayEventSectionTemplateContext, IDayViewAllDayEventSectionTemplateContext, IWeekViewNormalEventSectionTemplateContext, IDayViewNormalEventSectionTemplateContext, IDateFormatter, IRange, ITimeSelected } from './calendar.interface';

SwiperCore.use([IonicSlides]);


@Component({
    selector: 'calendar',
    template: `
        <ng-template #monthviewDefaultDisplayEventTemplate let-view="view" let-row="row" let-col="col">
            {{view.dates[row*7+col].label}}
        </ng-template>
        <ng-template #monthviewDefaultEventDetailTemplate let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">
            <ion-list class="event-detail-container" has-bouncing="false" *ngIf="showEventDetail" overflow-scroll="false">
                <ion-item *ngFor="let event of selectedDate?.events" (click)="eventSelected(event)">
                        <span *ngIf="!event.allDay" class="monthview-eventdetail-timecolumn">{{event.startTime|date: 'HH:mm'}}
                            -
                            {{event.endTime|date: 'HH:mm'}}
                        </span>
                    <span *ngIf="event.allDay" class="monthview-eventdetail-timecolumn">{{allDayLabel}}</span>
                    <span class="event-detail">  |  {{event.title}}</span>
                </ion-item>
                <ion-item *ngIf="selectedDate?.events.length==0">
                    <div class="no-events-label">{{noEventsLabel}}</div>
                </ion-item>
            </ion-list>
        </ng-template>
        <ng-template #defaultWeekviewHeaderTemplate let-viewDate="viewDate">
            {{ viewDate.dayHeader }}
        </ng-template>
        <ng-template #defaultAllDayEventTemplate let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </ng-template>
        <ng-template #defaultNormalEventTemplate let-displayEvent="displayEvent">
            <div class="calendar-event-inner">{{displayEvent.event.title}}</div>
        </ng-template>
        <ng-template #defaultWeekViewAllDayEventSectionTemplate let-day="day" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': day.events}" *ngIf="day.events"
                 [ngStyle]="{height: 25*day.events.length+'px'}">
                <div *ngFor="let displayEvent of day.events" class="calendar-event" tappable
                     (click)="eventSelected(displayEvent.event)"
                     [ngStyle]="{top: 25*displayEvent.position+'px', width: 100*(displayEvent.endIndex-displayEvent.startIndex)+'%', height: '25px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>
        <ng-template #defaultDayViewAllDayEventSectionTemplate let-allDayEvents="allDayEvents" let-eventTemplate="eventTemplate">
            <div *ngFor="let displayEvent of allDayEvents; let eventIndex=index"
                 class="calendar-event" tappable
                 (click)="eventSelected(displayEvent.event)"
                 [ngStyle]="{top: 25*eventIndex+'px',width: '100%',height:'25px'}">
                <ng-template [ngTemplateOutlet]="eventTemplate"
                             [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                </ng-template>
            </div>
        </ng-template>
        <ng-template #defaultNormalEventSectionTemplate let-tm="tm" let-hourParts="hourParts" let-eventTemplate="eventTemplate">
            <div [ngClass]="{'calendar-event-wrap': tm.events}" *ngIf="tm.events">
                <div *ngFor="let displayEvent of tm.events" class="calendar-event" tappable
                     (click)="eventSelected(displayEvent.event)"
                     [ngStyle]="{top: (37*displayEvent.startOffset/hourParts)+'px',left: 100/displayEvent.overlapNumber*displayEvent.position+'%', width: 100/displayEvent.overlapNumber+'%', height: 37*(displayEvent.endIndex -displayEvent.startIndex - (displayEvent.endOffset + displayEvent.startOffset)/hourParts)+'px'}">
                    <ng-template [ngTemplateOutlet]="eventTemplate"
                                 [ngTemplateOutletContext]="{displayEvent:displayEvent}">
                    </ng-template>
                </div>
            </div>
        </ng-template>
        <ng-template #defaultInactiveAllDayEventSectionTemplate>
        </ng-template>
        <ng-template #defaultInactiveNormalEventSectionTemplate>
        </ng-template>

        <div [ngSwitch]="calendarMode" class="{{calendarMode}}view-container">
            <monthview *ngSwitchCase="'month'"
                [formatDay]="formatDay"
                [formatDayHeader]="formatDayHeader"
                [formatMonthTitle]="formatMonthTitle"
                [startingDayMonth]="startingDayMonth"
                [showEventDetail]="showEventDetail"
                [noEventsLabel]="noEventsLabel"
                [autoSelect]="autoSelect"
                [eventSource]="eventSource"
                [markDisabled]="markDisabled"
                [monthviewDisplayEventTemplate]="monthviewDisplayEventTemplate||monthviewDefaultDisplayEventTemplate"
                [monthviewInactiveDisplayEventTemplate]="monthviewInactiveDisplayEventTemplate||monthviewDefaultDisplayEventTemplate"
                [monthviewEventDetailTemplate]="monthviewEventDetailTemplate||monthviewDefaultEventDetailTemplate"
                [locale]="locale"
                [dateFormatter]="dateFormatter"
                [dir]="dir"
                [lockSwipeToPrev]="lockSwipeToPrev"
                [lockSwipeToNext]="lockSwipeToNext"
                [lockSwipes]="lockSwipes"
                [sliderOptions]="sliderOptions"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </monthview>
            <weekview *ngSwitchCase="'week'"
                [formatWeekTitle]="formatWeekTitle"
                [formatWeekViewDayHeader]="formatWeekViewDayHeader"
                [formatHourColumn]="formatHourColumn"
                [startingDayWeek]="startingDayWeek"
                [allDayLabel]="allDayLabel"
                [hourParts]="hourParts"
                [autoSelect]="autoSelect"
                [hourSegments]="hourSegments"
                [eventSource]="eventSource"
                [markDisabled]="markDisabled"
                [weekviewHeaderTemplate]="weekviewHeaderTemplate||defaultWeekviewHeaderTemplate"
                [weekviewAllDayEventTemplate]="weekviewAllDayEventTemplate||defaultAllDayEventTemplate"
                [weekviewNormalEventTemplate]="weekviewNormalEventTemplate||defaultNormalEventTemplate"
                [weekviewAllDayEventSectionTemplate]="weekviewAllDayEventSectionTemplate||defaultWeekViewAllDayEventSectionTemplate"
                [weekviewNormalEventSectionTemplate]="weekviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate"
                [weekviewInactiveAllDayEventSectionTemplate]="weekviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate"
                [weekviewInactiveNormalEventSectionTemplate]="weekviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate"
                [locale]="locale"
                [dateFormatter]="dateFormatter"
                [dir]="dir"
                [scrollToHour]="scrollToHour"
                [preserveScrollPosition]="preserveScrollPosition"
                [lockSwipeToPrev]="lockSwipeToPrev"
                [lockSwipeToNext]="lockSwipeToNext"
                [lockSwipes]="lockSwipes"
                [startHour]="startHour"
                [endHour]="endHour"
                [sliderOptions]="sliderOptions"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onDayHeaderSelected)="daySelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </weekview>
            <dayview *ngSwitchCase="'day'"
                [formatDayTitle]="formatDayTitle"
                [formatHourColumn]="formatHourColumn"
                [allDayLabel]="allDayLabel"
                [hourParts]="hourParts"
                [hourSegments]="hourSegments"
                [eventSource]="eventSource"
                [markDisabled]="markDisabled"
                [dayviewAllDayEventTemplate]="dayviewAllDayEventTemplate||defaultAllDayEventTemplate"
                [dayviewNormalEventTemplate]="dayviewNormalEventTemplate||defaultNormalEventTemplate"
                [dayviewAllDayEventSectionTemplate]="dayviewAllDayEventSectionTemplate||defaultDayViewAllDayEventSectionTemplate"
                [dayviewNormalEventSectionTemplate]="dayviewNormalEventSectionTemplate||defaultNormalEventSectionTemplate"
                [dayviewInactiveAllDayEventSectionTemplate]="dayviewInactiveAllDayEventSectionTemplate||defaultInactiveAllDayEventSectionTemplate"
                [dayviewInactiveNormalEventSectionTemplate]="dayviewInactiveNormalEventSectionTemplate||defaultInactiveNormalEventSectionTemplate"
                [locale]="locale"
                [dateFormatter]="dateFormatter"
                [dir]="dir"
                [scrollToHour]="scrollToHour"
                [preserveScrollPosition]="preserveScrollPosition"
                [lockSwipeToPrev]="lockSwipeToPrev"
                [lockSwipeToNext]="lockSwipeToNext"
                [lockSwipes]="lockSwipes"
                [startHour]="startHour"
                [endHour]="endHour"
                [sliderOptions]="sliderOptions"
                (onRangeChanged)="rangeChanged($event)"
                (onEventSelected)="eventSelected($event)"
                (onTimeSelected)="timeSelected($event)"
                (onTitleChanged)="titleChanged($event)">
            </dayview>
        </div>
    `,
    styles: [`
        :host > div { height: 100%; }

        .event-detail-container {
          border-top: 2px darkgrey solid;
        }

        .no-events-label {
          font-weight: bold;
          color: darkgrey;
          text-align: center;
        }

        .event-detail {
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .monthview-eventdetail-timecolumn {
          width: 110px;
          overflow: hidden;
        }

        .calendar-event-inner {
          overflow: hidden;
          background-color: #3a87ad;
          color: white;
          height: 100%;
          width: 100%;
          padding: 2px;
          line-height: 15px;
          text-align: initial;
        }

        @media (max-width: 750px) {
          .calendar-event-inner {
            font-size: 12px;
          }
        }
    `],
    providers: [CalendarService]
})
export class CalendarComponent implements OnInit {
    @Input()
    get currentDate():Date {
        return this._currentDate;
    }

    set currentDate(val:Date) {
        if (!val) {
            val = new Date();
        }

        this._currentDate = val;
        this.calendarService.setCurrentDate(val, true);
        this.onCurrentDateChanged.emit(this._currentDate);
    }

    @Input() eventSource:IEvent[] = [];
    @Input() calendarMode:CalendarMode = 'month';
    @Input() formatDay:string = 'd';
    @Input() formatDayHeader:string = 'EEE';
    @Input() formatDayTitle:string = 'MMMM dd, yyyy';
    @Input() formatWeekTitle:string = 'MMMM yyyy, \'Week\' w';
    @Input() formatMonthTitle:string = 'MMMM yyyy';
    @Input() formatWeekViewDayHeader:string = 'EEE d';
    @Input() formatHourColumn:string = 'ha';
    @Input() showEventDetail:boolean = true;
    @Input() startingDayMonth:number = 0;
    @Input() startingDayWeek:number = 0;
    @Input() allDayLabel:string = 'all day';
    @Input() noEventsLabel:string = 'No Events';
    @Input() queryMode:QueryMode = 'local';
    @Input() step:Step = Step.Hour;
    @Input() timeInterval:number = 60;
    @Input() autoSelect:boolean = true;
    @Input() markDisabled?:(date:Date) => boolean;
    @Input() monthviewDisplayEventTemplate?:TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input() monthviewInactiveDisplayEventTemplate?:TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input() monthviewEventDetailTemplate?:TemplateRef<IMonthViewEventDetailTemplateContext>;
    @Input() weekviewHeaderTemplate?:TemplateRef<IDisplayWeekViewHeader>;
    @Input() weekviewAllDayEventTemplate?:TemplateRef<IDisplayAllDayEvent>;
    @Input() weekviewNormalEventTemplate?:TemplateRef<IDisplayEvent>;
    @Input() dayviewAllDayEventTemplate?:TemplateRef<IDisplayAllDayEvent>;
    @Input() dayviewNormalEventTemplate?:TemplateRef<IDisplayEvent>;
    @Input() weekviewAllDayEventSectionTemplate?:TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    @Input() weekviewNormalEventSectionTemplate?:TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    @Input() dayviewAllDayEventSectionTemplate?:TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    @Input() dayviewNormalEventSectionTemplate?:TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    @Input() weekviewInactiveAllDayEventSectionTemplate?:TemplateRef<IWeekViewAllDayEventSectionTemplateContext>;
    @Input() weekviewInactiveNormalEventSectionTemplate?:TemplateRef<IWeekViewNormalEventSectionTemplateContext>;
    @Input() dayviewInactiveAllDayEventSectionTemplate?:TemplateRef<IDayViewAllDayEventSectionTemplateContext>;
    @Input() dayviewInactiveNormalEventSectionTemplate?:TemplateRef<IDayViewNormalEventSectionTemplateContext>;
    @Input() dateFormatter?:IDateFormatter;
    @Input() dir:string = "";
    @Input() scrollToHour:number = 0;
    @Input() preserveScrollPosition:boolean = false;
    @Input() lockSwipeToPrev:boolean = false;
    @Input() lockSwipeToNext:boolean = false;
    @Input() lockSwipes:boolean = false;
    @Input() locale:string = "";
    @Input() startHour:number = 0;
    @Input() endHour:number = 24;
    @Input() sliderOptions:any;

    @Output() onCurrentDateChanged = new EventEmitter<Date>();
    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>();
    @Output() onDayHeaderSelected = new EventEmitter<ITimeSelected>();
    @Output() onTitleChanged = new EventEmitter<string>(true);

    private _currentDate:Date =  new Date();
    public hourParts = 1;
    public hourSegments = 1;
    private currentDateChangedFromChildrenSubscription?:Subscription;

    constructor(private calendarService:CalendarService, @Inject(LOCALE_ID) private appLocale:string, private ngZone: NgZone) {
        this.locale = appLocale;
    }

    ngOnInit() {
        if (this.autoSelect) {
            if (this.autoSelect.toString() === 'false') {
                this.autoSelect = false;
            } else {
                this.autoSelect = true;
            }
        }
        this.hourSegments = 60 / this.timeInterval;
        this.hourParts = 60 / this.step;
        if(this.hourParts <= this.hourSegments) {
            this.hourParts = 1;
        } else {
            this.hourParts = this.hourParts / this.hourSegments;
        }
        this.startHour = parseInt(this.startHour.toString());
        this.endHour = parseInt(this.endHour.toString());
        this.calendarService.queryMode = this.queryMode;

        this.currentDateChangedFromChildrenSubscription = this.calendarService.currentDateChangedFromChildren$.subscribe(currentDate => {
            this._currentDate = currentDate;
            this.onCurrentDateChanged.emit(currentDate);
        });
    }

    ngOnDestroy() {
        if (this.currentDateChangedFromChildrenSubscription) {
            this.currentDateChangedFromChildrenSubscription.unsubscribe();
            this.currentDateChangedFromChildrenSubscription = undefined;
        }
    }

    rangeChanged(range:IRange) {
        this.onRangeChanged.emit(range);
    }

    eventSelected(event:IEvent) {
        this.onEventSelected.emit(event);
    }

    timeSelected(timeSelected:ITimeSelected) {
        this.onTimeSelected.emit(timeSelected);
    }

    daySelected(daySelected:ITimeSelected) {
        this.onDayHeaderSelected.emit(daySelected);
    }

    titleChanged(title:string) {
        this.onTitleChanged.emit(title);
    }

    loadEvents() {
        this.calendarService.loadEvents();
    }

    slideNext() {
        this.calendarService.slide(1);
    }

    slidePrev() {
        this.calendarService.slide(-1);
    }

    update() {
        this.calendarService.update();
    }
}
