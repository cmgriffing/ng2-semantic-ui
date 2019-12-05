import { EventEmitter } from "@angular/core";
import { CustomValueAccessor, ICustomValueAccessorHost } from "../../../misc/util/helpers/custom-value-accessor";
export declare class SuiRating implements ICustomValueAccessorHost<number> {
    ratingClasses: boolean;
    value: number;
    valueChange: EventEmitter<number>;
    private _maximum;
    maximum: number;
    isReadonly: boolean;
    readonly icons: undefined[];
    hoveredIndex: number;
    constructor();
    onClick(i: number): void;
    onMouseover(i: number): void;
    onMouseout(): void;
    writeValue(value: number): void;
}
export declare class SuiRatingValueAccessor extends CustomValueAccessor<number, SuiRating> {
    constructor(host: SuiRating);
}
