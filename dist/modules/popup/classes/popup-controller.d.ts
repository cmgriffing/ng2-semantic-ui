import { ElementRef, OnDestroy, Renderer2 } from "@angular/core";
import { PopupConfig, IPopupConfig } from "./popup-config";
import { SuiPopup } from "../components/popup";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
export interface IPopup {
    open(): void;
    close(): void;
    toggle(): void;
}
export declare abstract class SuiPopupController implements IPopup, OnDestroy {
    protected _renderer: Renderer2;
    protected _element: ElementRef;
    protected _componentFactory: SuiComponentFactory;
    protected _config: PopupConfig;
    private _componentRef;
    readonly popup: SuiPopup;
    private _openingTimeout;
    private _documentListener;
    constructor(_renderer: Renderer2, _element: ElementRef, _componentFactory: SuiComponentFactory, _config: PopupConfig);
    configure(config?: IPopupConfig): void;
    openDelayed(): void;
    open(): void;
    close(): void;
    toggleDelayed(): void;
    toggle(): void;
    private onMouseEnter;
    private onMouseLeave;
    private onClick;
    onDocumentClick(e: MouseEvent): void;
    onFocusIn(): void;
    onFocusOut(e: any): void;
    protected cleanup(): void;
    ngOnDestroy(): void;
}
