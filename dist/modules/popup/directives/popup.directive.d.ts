import { ElementRef, TemplateRef, Renderer2 } from "@angular/core";
import { PopupTrigger } from "../classes/popup-config";
import { SuiPopupConfig } from "../services/popup.service";
import { SuiPopupTemplateController, ITemplatePopupContext, ITemplatePopupConfig } from "../classes/popup-template-controller";
import { PositioningPlacement } from "../../../misc/util/services/positioning.service";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
export declare class SuiPopupDirective<T> extends SuiPopupTemplateController<T> {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _componentFactory: SuiComponentFactory;
    protected _popupDefaults: SuiPopupConfig;
    popupHeader: string;
    popupText: string;
    popupInverted: boolean;
    popupBasic: boolean;
    popupTransition: string;
    popupTransitionDuration: number;
    popupPlacement: PositioningPlacement;
    popupDelay: number;
    popupTrigger: PopupTrigger;
    popupTemplate: TemplateRef<ITemplatePopupContext<T>> | undefined;
    popupTemplateContext: T | undefined;
    popupConfig: ITemplatePopupConfig<T> | undefined;
    constructor(_renderer: Renderer2, element: ElementRef, _componentFactory: SuiComponentFactory, _popupDefaults: SuiPopupConfig);
}
