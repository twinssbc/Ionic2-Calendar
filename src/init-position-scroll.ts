import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    SimpleChanges,
    OnChanges,
    AfterViewInit,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'init-position-scroll',
    template: `
        <div class="scroll-content" style="height:100%">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .scroll-content {
            overflow-y: auto;
            overflow-x: hidden;
        }        
    `],
    encapsulation: ViewEncapsulation.None
})
export class initPositionScrollComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() initPosition:number;
    @Input() emitEvent:boolean;
    @Output() onScroll = new EventEmitter<number>();

    private element:ElementRef;
    private scrollContent:HTMLElement;
    private handler:()=>void;
    private listenerAttached:boolean = false;

    constructor(el:ElementRef) {
        this.element = el;
    }

    ngOnChanges(changes:SimpleChanges) {
        let initPosition = changes['initPosition'];
        if (initPosition && initPosition.currentValue !== undefined && this.scrollContent) {
            const me =this;
            setTimeout(function() {
                me.scrollContent.scrollTop = initPosition.currentValue;
            }, 0);
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
