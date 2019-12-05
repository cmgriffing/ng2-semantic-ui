import { EventEmitter, ViewContainerRef, Renderer2, ElementRef, ChangeDetectorRef, TemplateRef } from "@angular/core";
import { IOptionContext } from "../classes/select-base";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
import { HandledEvent } from "../../../misc/util/helpers/util";
export declare class SuiMultiSelectLabel<T> extends SuiTransition {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _changeDetector: ChangeDetectorRef;
    protected _componentFactory: SuiComponentFactory;
    labelClasses: boolean;
    private _transitionController;
    value: T;
    query?: string;
    onDeselected: EventEmitter<T>;
    formatter: (obj: T) => string;
    private _template?;
    template: TemplateRef<IOptionContext<T>> | undefined;
    templateSibling: ViewContainerRef;
    constructor(_renderer: Renderer2, element: ElementRef, _changeDetector: ChangeDetectorRef, _componentFactory: SuiComponentFactory);
    deselectOption(e: HandledEvent): void;
    onClick(e: HandledEvent): void;
}
