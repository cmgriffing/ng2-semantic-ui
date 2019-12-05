import { EventEmitter, ElementRef } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
export declare class SuiCheckbox implements ICustomValueAccessorHost<boolean> {
    checkboxClasses: boolean;
    name: string;
    isChecked: boolean;
    onCheckChange: EventEmitter<boolean>;
    onTouched: EventEmitter<void>;
    isDisabled: boolean;
    isReadonly: boolean;
    readonly checkedAttribute: string | undefined;
    readonly isDisabledAttribute: string | undefined;
    checkboxElement: ElementRef;
    constructor();
    onMouseDown(e: MouseEvent): void;
    onClick(): void;
    onFocusOut(): void;
    toggle(): void;
    writeValue(value: boolean): void;
    private focusCheckbox;
}
export declare class SuiCheckboxValueAccessor extends CustomValueAccessor<boolean, SuiCheckbox> {
    constructor(host: SuiCheckbox);
}
