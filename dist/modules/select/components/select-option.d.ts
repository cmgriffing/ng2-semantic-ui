import { EventEmitter, ViewContainerRef, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { SuiDropdownMenuItem } from "../../../modules/dropdown/directives/dropdown-menu";
import { HandledEvent } from "../../../misc/util/helpers/util";
export declare class SuiSelectOption<T> extends SuiDropdownMenuItem {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _changeDetector: ChangeDetectorRef;
    optionClasses: boolean;
    value: T;
    onSelected: EventEmitter<T>;
    isActive: boolean;
    renderedText?: string;
    formatter: (obj: T) => string;
    usesTemplate: boolean;
    templateSibling: ViewContainerRef;
    constructor(_renderer: Renderer2, element: ElementRef, _changeDetector: ChangeDetectorRef);
    markForCheck(): void;
    onClick(e: HandledEvent): void;
}
