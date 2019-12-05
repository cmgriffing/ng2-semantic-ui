import { ElementRef, Type, Renderer2 } from "@angular/core";
import { SuiPopupController } from "./popup-controller";
import { PopupConfig } from "./popup-config";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
export declare class SuiPopupComponentController<T> extends SuiPopupController {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _componentFactory: SuiComponentFactory;
    protected _component: Type<T>;
    protected _config: PopupConfig;
    private _contentComponentRef?;
    readonly componentInstance: T | undefined;
    constructor(_renderer: Renderer2, element: ElementRef, _componentFactory: SuiComponentFactory, _component: Type<T>, _config: PopupConfig);
    open(): void;
    protected cleanup(): void;
}
