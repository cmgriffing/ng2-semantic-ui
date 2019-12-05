import { ElementRef, Renderer2, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ICustomValueAccessorHost, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
import { ICustomValidatorHost, CustomValidator } from "../../../misc/util/helpers/custom-validator";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
import { PositioningPlacement } from "../../../misc/util/services/positioning.service";
import { SuiDatepicker, DatepickerMode } from "../components/datepicker";
import { CalendarConfig } from "../classes/calendar-config";
import { IDatepickerLocaleValues, RecursivePartial } from "../../../behaviors/localization/interfaces/values";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
import { SuiPopupComponentController } from "../../../modules/popup/classes/popup-component-controller";
import { PopupAfterOpen } from "../../../modules/popup/classes/popup-lifecycle";
export declare class SuiDatepickerDirective extends SuiPopupComponentController<SuiDatepicker> implements ICustomValueAccessorHost<Date>, ICustomValidatorHost, OnChanges, PopupAfterOpen {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _componentFactory: SuiComponentFactory;
    protected _localizationService: SuiLocalizationService;
    private _selectedDate?;
    selectedDate: Date | undefined;
    private _mode;
    config: CalendarConfig;
    mode: DatepickerMode;
    initialDate?: Date;
    maxDate?: Date;
    minDate?: Date;
    firstDayOfWeek?: number;
    private _localeValues;
    localeOverrides: RecursivePartial<IDatepickerLocaleValues>;
    readonly localeValues: IDatepickerLocaleValues;
    placement: PositioningPlacement;
    transition: string;
    transitionDuration: number;
    onSelectedDateChange: EventEmitter<Date>;
    onValidatorChange: EventEmitter<void>;
    constructor(_renderer: Renderer2, element: ElementRef, _componentFactory: SuiComponentFactory, _localizationService: SuiLocalizationService);
    popupOnOpen(): void;
    ngOnChanges({ maxDate, minDate, mode }: SimpleChanges): void;
    private onLocaleUpdate;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: Date | undefined): void;
    onKeyDown(e: KeyboardEvent): void;
    setRendererValue(element: ElementRef, value: string | undefined): void;
}
export declare class SuiDatepickerDirectiveValueAccessor extends CustomValueAccessor<Date, SuiDatepickerDirective> {
    host: SuiDatepickerDirective;
    constructor(host: SuiDatepickerDirective);
}
export declare class SuiDatepickerDirectiveValidator extends CustomValidator<SuiDatepickerDirective> {
    host: SuiDatepickerDirective;
    constructor(host: SuiDatepickerDirective);
}
