import { ElementRef, Renderer2 } from "@angular/core";
import { SidebarService } from "../services/sidebar.service";
export declare class SuiSidebarSibling {
    protected _renderer: Renderer2;
    private _element;
    private _service;
    service: SidebarService;
    isDimmedWhenVisible: boolean;
    readonly isVisible: boolean;
    readonly isDimmed: boolean;
    siblingClasses: boolean;
    constructor(_renderer: Renderer2, _element: ElementRef);
    private updateTransform;
    onClick(event: MouseEvent): void;
}
