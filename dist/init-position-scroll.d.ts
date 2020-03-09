import { EventEmitter, ElementRef, SimpleChanges, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class initPositionScrollComponent implements OnChanges, AfterViewInit, OnDestroy {
    initPosition: number;
    emitEvent: boolean;
    onScroll: EventEmitter<number>;
    private element;
    private scrollContent;
    private handler;
    private listenerAttached;
    constructor(el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<initPositionScrollComponent>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<initPositionScrollComponent, "init-position-scroll", never, { "initPosition": "initPosition"; "emitEvent": "emitEvent"; }, { "onScroll": "onScroll"; }, never>;
}
