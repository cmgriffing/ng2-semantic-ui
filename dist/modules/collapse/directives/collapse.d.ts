import { ElementRef, Renderer2 } from "@angular/core";
export declare class SuiCollapse {
    private _element;
    protected _renderer: Renderer2;
    isExpanded: boolean;
    readonly isCollapsed: boolean;
    isCollapsing: boolean;
    private _pristine;
    suiCollapse: boolean;
    collapseDuration: number;
    private readonly _animationDuration;
    constructor(_element: ElementRef, _renderer: Renderer2);
    hide(): void;
    show(): void;
    private animate;
}
