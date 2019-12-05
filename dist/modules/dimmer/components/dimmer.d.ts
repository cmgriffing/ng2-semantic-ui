import { EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { SuiTransition } from "../../../modules/transition/directives/transition";
export declare class SuiDimmer extends SuiTransition {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _changeDetector: ChangeDetectorRef;
    dimmerClasses: boolean;
    private _transitionController;
    private _isDimmed;
    isDimmed: boolean;
    isDimmedChange: EventEmitter<boolean>;
    isClickable: boolean;
    transition: string;
    transitionDuration: number;
    wrapContent: boolean;
    constructor(_renderer: Renderer2, element: ElementRef, _changeDetector: ChangeDetectorRef);
    onClick(): void;
}
