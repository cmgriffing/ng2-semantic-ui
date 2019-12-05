import { ViewContainerRef, ElementRef, EventEmitter } from "@angular/core";
import { IPopup } from "../classes/popup-controller";
import { TemplatePopupConfig } from "../classes/popup-template-controller";
import { PositioningService } from "../../../misc/util/services/positioning.service";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { IDynamicClasses } from "../../../misc/util/helpers/util";
export declare class SuiPopup implements IPopup {
    elementRef: ElementRef;
    config: TemplatePopupConfig<any>;
    transitionController: TransitionController;
    positioningService: PositioningService;
    private _isOpen;
    closingTimeout: number;
    onOpen: EventEmitter<void>;
    onClose: EventEmitter<void>;
    readonly isOpen: boolean;
    container: ViewContainerRef;
    anchor: ElementRef;
    readonly direction: string | undefined;
    readonly alignment: string | undefined;
    readonly dynamicClasses: IDynamicClasses;
    templateSibling: ViewContainerRef;
    tabindex: number;
    constructor(elementRef: ElementRef);
    open(): void;
    toggle(): void;
    close(): void;
    onClick(event: MouseEvent): void;
}
