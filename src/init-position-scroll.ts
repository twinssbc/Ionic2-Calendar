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
    ViewEncapsulation,
    NgZone,
} from "@angular/core";

@Component({
    selector: "init-position-scroll",
    template: `
        <div class="scroll-content" style="height:100%">
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `
            .scroll-content {
                overflow-y: auto;
                overflow-x: hidden;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class initPositionScrollComponent
    implements OnChanges, AfterViewInit, OnDestroy
{
    @Input() initPosition!: number;
    @Input() emitEvent?: boolean;
    @Output() onScroll = new EventEmitter<number>();

    private element: ElementRef;
    private scrollContent!: HTMLElement;
    private handler!: () => void;
    private listenerAttached: boolean = false;

    constructor(el: ElementRef, private ngZone: NgZone) {
        this.element = el;
    }

    ngOnChanges(changes: SimpleChanges): void {
        let initPosition = changes["initPosition"];
        if (
            initPosition &&
            initPosition.currentValue !== undefined &&
            this.scrollContent &&
            initPosition.currentValue != this.scrollContent.scrollTop
        ) {
            const me = this;
            this.ngZone.run(() => {
                me.scrollContent.scrollTop = initPosition.currentValue;
            });
        }
    }

    ngAfterViewInit(): void {
        const scrollContent = (this.scrollContent =
            this.element.nativeElement.querySelector(".scroll-content"));
        if (this.initPosition !== undefined) {
            scrollContent.scrollTop = this.initPosition;
        }

        if (this.emitEvent && !this.listenerAttached) {
            let onScroll = this.onScroll;
            let me = this;
            this.handler = function () {
                if (me.initPosition != scrollContent.scrollTop) {
                    onScroll.emit(scrollContent.scrollTop);
                }
            };
            this.listenerAttached = true;
            scrollContent.addEventListener("scroll", this.handler);
        }
    }

    ngOnDestroy(): void {
        if (this.listenerAttached) {
            this.scrollContent.removeEventListener("scroll", this.handler);
            this.listenerAttached = false;
        }
    }
}
