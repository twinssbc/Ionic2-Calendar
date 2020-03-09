import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
var _c0 = ["*"];
var initPositionScrollComponent = /** @class */ (function () {
    function initPositionScrollComponent(el) {
        this.onScroll = new EventEmitter();
        this.listenerAttached = false;
        this.element = el;
    }
    initPositionScrollComponent.prototype.ngOnChanges = function (changes) {
        var initPosition = changes['initPosition'];
        if (initPosition && initPosition.currentValue !== undefined && this.scrollContent) {
            var me_1 = this;
            setTimeout(function () {
                me_1.scrollContent.scrollTop = initPosition.currentValue;
            }, 0);
        }
    };
    initPositionScrollComponent.prototype.ngAfterViewInit = function () {
        var scrollContent = this.scrollContent = this.element.nativeElement.querySelector('.scroll-content');
        if (this.initPosition !== undefined) {
            scrollContent.scrollTop = this.initPosition;
        }
        if (this.emitEvent && !this.listenerAttached) {
            var onScroll_1 = this.onScroll;
            this.handler = function () {
                onScroll_1.emit(scrollContent.scrollTop);
            };
            this.listenerAttached = true;
            scrollContent.addEventListener('scroll', this.handler);
        }
    };
    initPositionScrollComponent.prototype.ngOnDestroy = function () {
        if (this.listenerAttached) {
            this.scrollContent.removeEventListener('scroll', this.handler);
        }
    };
    initPositionScrollComponent.ɵfac = function initPositionScrollComponent_Factory(t) { return new (t || initPositionScrollComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    initPositionScrollComponent.ɵcmp = i0.ɵɵdefineComponent({ type: initPositionScrollComponent, selectors: [["init-position-scroll"]], inputs: { initPosition: "initPosition", emitEvent: "emitEvent" }, outputs: { onScroll: "onScroll" }, features: [i0.ɵɵNgOnChangesFeature()], ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "scroll-content", 2, "height", "100%"]], template: function initPositionScrollComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵprojection(1);
            i0.ɵɵelementEnd();
        } }, styles: ["\n        .scroll-content {\n            overflow-y: auto;\n            overflow-x: hidden;\n        }        \n    "], encapsulation: 2 });
    return initPositionScrollComponent;
}());
export { initPositionScrollComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(initPositionScrollComponent, [{
        type: Component,
        args: [{
                selector: 'init-position-scroll',
                template: "\n        <div class=\"scroll-content\" style=\"height:100%\">\n            <ng-content></ng-content>\n        </div>\n    ",
                styles: ["\n        .scroll-content {\n            overflow-y: auto;\n            overflow-x: hidden;\n        }        \n    "],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { initPosition: [{
            type: Input
        }], emitEvent: [{
            type: Input
        }], onScroll: [{
            type: Output
        }] }); })();
