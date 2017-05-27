import { Scroll } from 'ionic-angular';
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

@Component({
    selector: 'initpositionscroll',
    template: `
        <ion-scroll scrollY="true" zoom="false" style="height:100%">
            <ng-content></ng-content>
        </ion-scroll>
    `
})
export class initPositionScrollComponent extends Scroll {
    @Input() initPosition :number;
    @Input() active:boolean;
    @Output() onScroll = new EventEmitter<number>();

    private element: ElementRef;
    private scrollContent: HTMLElement;
    private scrollPosition: number;
    private handler: ()=>void;
    private listenerAttached: boolean = false;
    constructor(el: ElementRef) {
        super(el);
        this.element = el;
    }

    ngAfterViewInit()    {
        const scrollContent = this.scrollContent = this.element.nativeElement.querySelector('.scroll-content');
        if (scrollContent) {
            let hourColumns = scrollContent.querySelectorAll('.calendar-hour-column');
            this.scrollPosition = hourColumns[this.initPosition].offsetTop;
            this.scrollContent.scrollTop = this.scrollPosition;

            let onScroll = this.onScroll;
            this.handler = function() {
                onScroll.emit(scrollContent.scrollTop);
            };
            if (this.active) {
                this.listenerAttached = true;
                scrollContent.addEventListener('scroll', this.handler);
            }
        }
    }

    ngOnDestroy() {
        if(this.listenerAttached) {
            this.scrollContent.removeEventListener('scroll', this.handler);
        }
    }
}
