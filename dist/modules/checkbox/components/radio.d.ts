import { EventEmitter, ElementRef } from "@angular/core";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
export declare class SuiRadio<T> implements ICustomValueAccessorHost<T> {
    radioClasses: boolean;
    name: string;
    value: T;
    isChecked: boolean;
    currentValue: T;
    onCurrentValueChange: EventEmitter<T>;
    onTouched: EventEmitter<void>;
    isDisabled: boolean;
    isReadonly: boolean;
    radioElement: ElementRef;
    readonly checkedAttribute: string | undefined;
    readonly isDisabledAttribute: string | undefined;
    constructor();
    onMouseDown(e: MouseEvent): void;
    onClick(): void;
    onFocusOut(): void;
    update(): void;
    writeValue(value: T): void;
    private focusRadio;
}
export declare class SuiRadioValueAccessor<T> extends CustomValueAccessor<T, SuiRadio<T>> {
    constructor(host: SuiRadio<T>);
}
