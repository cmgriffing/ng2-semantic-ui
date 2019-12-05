import { EventEmitter, ElementRef, Renderer2 } from "@angular/core";
import { SuiSelectBase } from "../classes/select-base";
import { SuiSelectOption } from "./select-option";
import { CustomValueAccessor, ICustomValueAccessorHost } from "../../../misc/util/helpers/custom-value-accessor";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
export declare class SuiSelect<T, U> extends SuiSelectBase<T, U> implements ICustomValueAccessorHost<U> {
    element: ElementRef;
    protected _renderer: Renderer2;
    protected _localizationService: SuiLocalizationService;
    selectedOption?: T;
    private _writtenOption?;
    private _optionTemplateSibling;
    selectedOptionChange: EventEmitter<U>;
    private _placeholder;
    placeholder: string;
    constructor(element: ElementRef, _renderer: Renderer2, _localizationService: SuiLocalizationService);
    protected optionsUpdateHook(): void;
    protected queryUpdateHook(): void;
    selectOption(option: T): void;
    writeValue(value: U): void;
    protected initialiseRenderedOption(option: SuiSelectOption<T>): void;
    private drawSelectedOption;
}
export declare class SuiSelectValueAccessor<T, U> extends CustomValueAccessor<U, SuiSelect<T, U>> {
    constructor(host: SuiSelect<T, U>);
}
