import { TemplateRef, Renderer2, ElementRef } from "@angular/core";
import { SuiPopupController, IPopup } from "./popup-controller";
import { PopupConfig, IPopupConfig } from "./popup-config";
import { SuiComponentFactory, IImplicitContext } from "../../../misc/util/services/component-factory.service";
export interface ITemplatePopupContext<T> extends IImplicitContext<IPopup> {
    context?: T;
}
export interface ITemplatePopupConfig<T> extends IPopupConfig {
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
}
export declare class TemplatePopupConfig<T> extends PopupConfig {
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
}
export declare class SuiPopupTemplateController<T> extends SuiPopupController {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _componentFactory: SuiComponentFactory;
    protected _config: PopupConfig;
    template?: TemplateRef<ITemplatePopupContext<T>>;
    context?: T;
    constructor(_renderer: Renderer2, element: ElementRef, _componentFactory: SuiComponentFactory, _config: PopupConfig);
    configure(config?: ITemplatePopupConfig<T>): void;
    open(): void;
}
