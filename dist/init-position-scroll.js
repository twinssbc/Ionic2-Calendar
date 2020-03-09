import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class initPositionScrollComponent {
    constructor(el) {
        this.onScroll = new EventEmitter();
        this.listenerAttached = false;
        this.element = el;
    }
    ngOnChanges(changes) {
        let initPosition = changes['initPosition'];
        if (initPosition && initPosition.currentValue !== undefined && this.scrollContent) {
            const me = this;
            setTimeout(function () {
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
initPositionScrollComponent.ɵfac = function initPositionScrollComponent_Factory(t) { return new (t || initPositionScrollComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
initPositionScrollComponent.ɵcmp = i0.ɵɵdefineComponent({ type: initPositionScrollComponent, selectors: [["init-position-scroll"]], inputs: { initPosition: "initPosition", emitEvent: "emitEvent" }, outputs: { onScroll: "onScroll" }, features: [i0.ɵɵNgOnChangesFeature()], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "scroll-content", 2, "height", "100%"]], template: function initPositionScrollComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵelementEnd();
    } }, styles: ["\n        .scroll-content {\n            overflow-y: auto;\n            overflow-x: hidden;\n        }        \n    "], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(initPositionScrollComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { initPosition: [{
            type: Input
        }], emitEvent: [{
            type: Input
        }], onScroll: [{
            type: Output
        }] }); })();
