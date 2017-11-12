import { Scroll } from 'ionic-angular';
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';

@Component({
    selector: 'init-position-scroll',
    template: `
        <ion-scroll scrollY="true" zoom="false" style="height:100%">
            <ng-content></ng-content>
        </ion-scroll>
    `
})
export class initPositionScrollComponent extends Scroll {
    @Input() initPosition:number;
    @Input() emitEvent:boolean;
    @Output() onScroll = new EventEmitter<number>();

    private element:ElementRef;
    private scrollContent:HTMLElement;
    private handler:()=>void;
    private listenerAttached:boolean = false;

    constructor(el:ElementRef) {
        super();
        this.element = el;
    }

    ngOnChanges(changes:SimpleChanges) {
        let initPosition = changes['initPosition'];
        if (initPosition && initPosition.currentValue !== undefined && this.scrollContent) {
            this.scrollContent.scrollTop = initPosition.currentValue;
        }
    }

    ngAfterViewInit() {
        const scrollContent = this.scrollContent = this.element.nativeElement.querySelector('.scroll-content');
        if (this.initPosition !== undefined) {
            scrollContent.scrollTop = this.initPosition;
        }

        if (this.emitEvent && !this.listenerAttached) {
            let onScroll = this.onScroll;
            this.handler = function () {
                onScroll.emit(scrollContent.scrollTop);
            };
            this.listenerAttached = true;
            scrollContent.addEventListener('scroll', this.handler);
        }
    }

    ngOnDestroy() {
        if (this.listenerAttached) {
            this.scrollContent.removeEventListener('scroll', this.handler);
        }
    }
}
