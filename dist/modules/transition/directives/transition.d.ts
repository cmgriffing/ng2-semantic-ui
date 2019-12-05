import { Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "../classes/transition-controller";
export declare class SuiTransition {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _changeDetector: ChangeDetectorRef;
    private _controller;
    suiTransition: TransitionController;
    transitionClass: boolean;
    readonly isVisible: boolean;
    readonly isHidden: boolean;
    constructor(_renderer: Renderer2, element: ElementRef, _changeDetector: ChangeDetectorRef);
    setTransitionController(transitionController: TransitionController): void;
}
