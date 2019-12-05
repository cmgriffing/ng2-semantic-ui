var SuiDatepickerDirective_1, SuiDatepickerDirectiveValueAccessor_1, SuiDatepickerDirectiveValidator_1;
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Renderer2, EventEmitter, Output, Input, HostListener, OnChanges, SimpleChanges } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
import { customValidatorFactory, CustomValidator } from "../../../misc/util/helpers/custom-validator";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
import { PositioningPlacement } from "../../../misc/util/services/positioning.service";
import { KeyCode } from "../../../misc/util/helpers/util";
import { SuiDatepicker, DatepickerMode } from "../components/datepicker";
import { YearConfig, MonthConfig, DatetimeConfig, TimeConfig, DateConfig } from "../classes/calendar-config";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
import { SuiPopupComponentController } from "../../../modules/popup/classes/popup-component-controller";
import { PopupConfig, PopupTrigger } from "../../../modules/popup/classes/popup-config";
let SuiDatepickerDirective = SuiDatepickerDirective_1 = class SuiDatepickerDirective extends SuiPopupComponentController {
    constructor(_renderer, element, _componentFactory, _localizationService) {
        super(_renderer, element, _componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        }));
        this._renderer = _renderer;
        this.element = element;
        this._componentFactory = _componentFactory;
        this._localizationService = _localizationService;
        // This ensures the popup is drawn correctly (i.e. no border).
        this._renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this._renderer.addClass(this.popup.elementRef.nativeElement, "calendar");
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this.onSelectedDateChange = new EventEmitter();
        this.onValidatorChange = new EventEmitter();
        this.mode = DatepickerMode.Datetime;
    }
    get selectedDate() {
        return this._selectedDate;
    }
    set selectedDate(date) {
        this._selectedDate = date;
        this.onSelectedDateChange.emit(date);
    }
    get mode() {
        return this._mode;
    }
    set mode(mode) {
        this._mode = mode || DatepickerMode.Datetime;
        switch (this._mode) {
            case DatepickerMode.Year:
                this.config = new YearConfig();
                break;
            case DatepickerMode.Month:
                this.config = new MonthConfig();
                break;
            case DatepickerMode.Date:
            default:
                this.config = new DateConfig();
                break;
            case DatepickerMode.Datetime:
                this.config = new DatetimeConfig();
                break;
            case DatepickerMode.Time:
                this.config = new TimeConfig();
                break;
        }
        this.writeValue(this.selectedDate);
    }
    get localeValues() {
        return this._localizationService.override(this._localeValues, this.localeOverrides);
    }
    set placement(placement) {
        this.popup.config.placement = placement;
    }
    set transition(transition) {
        this.popup.config.transition = transition;
    }
    set transitionDuration(duration) {
        this.popup.config.transitionDuration = duration;
    }
    popupOnOpen() {
        if (this.componentInstance) {
            this.componentInstance.service.config = this.config;
            this.componentInstance.service.localeValues = this.localeValues;
            this.componentInstance.service.currentDate =
                this.initialDate || new Date();
            this.componentInstance.service.selectedDate = this.selectedDate;
            this.componentInstance.service.maxDate = this.maxDate;
            this.componentInstance.service.minDate = this.minDate;
            if (this.firstDayOfWeek != undefined) {
                this.componentInstance.service.firstDayOfWeek = this.firstDayOfWeek;
            }
            this.componentInstance.service.reset();
            this.componentInstance.service.onDateChange.subscribe((d) => {
                this.selectedDate = d;
                this.close();
            });
        }
    }
    ngOnChanges({ maxDate, minDate, mode }) {
        if (maxDate || minDate || mode) {
            this.onValidatorChange.emit();
        }
    }
    onLocaleUpdate() {
        this._localeValues = this._localizationService.get().datepicker;
    }
    validate(c) {
        const value = c.value;
        if (value != undefined) {
            // We post process the min & max date because sometimes this puts the date outside of the allowed range.
            if (this.minDate && value < this.minDate) {
                return {
                    suiMinDate: { required: this.minDate, actual: value }
                };
            }
            if (this.maxDate && value > this.maxDate) {
                return {
                    suiMaxDate: { required: this.maxDate, actual: value }
                };
            }
        }
        // Angular expects null
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    writeValue(value) {
        this.selectedDate = value;
        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = value;
        }
    }
    onKeyDown(e) {
        if (e.keyCode === KeyCode.Escape) {
            this.close();
        }
    }
    setRendererValue(element, value) {
        this._renderer.setProperty(element.nativeElement, "value", value || "");
    }
};
SuiDatepickerDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: SuiComponentFactory },
    { type: SuiLocalizationService }
];
tslib_1.__decorate([
    Input("pickerMode")
], SuiDatepickerDirective.prototype, "mode", null);
tslib_1.__decorate([
    Input("pickerInitialDate")
], SuiDatepickerDirective.prototype, "initialDate", void 0);
tslib_1.__decorate([
    Input("pickerMaxDate")
], SuiDatepickerDirective.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Input("pickerMinDate")
], SuiDatepickerDirective.prototype, "minDate", void 0);
tslib_1.__decorate([
    Input("pickerFirstDayOfWeek")
], SuiDatepickerDirective.prototype, "firstDayOfWeek", void 0);
tslib_1.__decorate([
    Input("pickerLocaleOverrides")
], SuiDatepickerDirective.prototype, "localeOverrides", void 0);
tslib_1.__decorate([
    Input("pickerPlacement")
], SuiDatepickerDirective.prototype, "placement", null);
tslib_1.__decorate([
    Input("pickerTransition")
], SuiDatepickerDirective.prototype, "transition", null);
tslib_1.__decorate([
    Input("pickerTransitionDuration")
], SuiDatepickerDirective.prototype, "transitionDuration", null);
tslib_1.__decorate([
    Output("pickerSelectedDateChange")
], SuiDatepickerDirective.prototype, "onSelectedDateChange", void 0);
tslib_1.__decorate([
    Output("pickerValidatorChange")
], SuiDatepickerDirective.prototype, "onValidatorChange", void 0);
tslib_1.__decorate([
    HostListener("keydown", ["$event"])
], SuiDatepickerDirective.prototype, "onKeyDown", null);
SuiDatepickerDirective = SuiDatepickerDirective_1 = tslib_1.__decorate([
    Directive({
        selector: "[suiDatepicker]",
        providers: [customValidatorFactory(SuiDatepickerDirective_1)]
    })
], SuiDatepickerDirective);
export { SuiDatepickerDirective };
let SuiDatepickerDirectiveValueAccessor = SuiDatepickerDirectiveValueAccessor_1 = class SuiDatepickerDirectiveValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
        this.host = host;
    }
};
SuiDatepickerDirectiveValueAccessor.ctorParameters = () => [
    { type: SuiDatepickerDirective }
];
SuiDatepickerDirectiveValueAccessor = SuiDatepickerDirectiveValueAccessor_1 = tslib_1.__decorate([
    Directive({
        selector: "[suiDatepicker]",
        host: { "(pickerSelectedDateChange)": "onChange($event)" },
        providers: [customValueAccessorFactory(SuiDatepickerDirectiveValueAccessor_1)]
    })
], SuiDatepickerDirectiveValueAccessor);
export { SuiDatepickerDirectiveValueAccessor };
let SuiDatepickerDirectiveValidator = SuiDatepickerDirectiveValidator_1 = class SuiDatepickerDirectiveValidator extends CustomValidator {
    constructor(host) {
        super(host);
        this.host = host;
    }
};
SuiDatepickerDirectiveValidator.ctorParameters = () => [
    { type: SuiDatepickerDirective }
];
SuiDatepickerDirectiveValidator = SuiDatepickerDirectiveValidator_1 = tslib_1.__decorate([
    Directive({
        selector: "[suiDatepicker]",
        host: { "(pickerValidatorChange)": "onValidatorChange()" },
        providers: [customValidatorFactory(SuiDatepickerDirectiveValidator_1)]
    })
], SuiDatepickerDirectiveValidator);
export { SuiDatepickerDirectiveValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvZGlyZWN0aXZlcy9kYXRlcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULGFBQWEsRUFDaEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUVILDBCQUEwQixFQUMxQixtQkFBbUIsRUFDdEIsTUFBTSxrREFBa0QsQ0FBQztBQUMxRCxPQUFPLEVBRUgsc0JBQXNCLEVBQ3RCLGVBQWUsRUFDbEIsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN2RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBRUgsVUFBVSxFQUNWLFdBQVcsRUFDWCxjQUFjLEVBQ2QsVUFBVSxFQUNWLFVBQVUsRUFDYixNQUFNLDRCQUE0QixDQUFDO0FBS3BDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3hHLE9BQU8sRUFDSCxXQUFXLEVBQ1gsWUFBWSxFQUNmLE1BQU0sNkNBQTZDLENBQUM7QUFPckQsSUFBYSxzQkFBc0IsOEJBQW5DLE1BQWEsc0JBQ1QsU0FBUSwyQkFBMEM7SUE2RmxELFlBQ2MsU0FBbUIsRUFDdEIsT0FBa0IsRUFDZixpQkFBcUMsRUFDckMsb0JBQTJDO1FBRXJELEtBQUssQ0FDRCxTQUFTLEVBQ1QsT0FBTyxFQUNQLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsSUFBSSxXQUFXLENBQUM7WUFDWixPQUFPLEVBQUUsWUFBWSxDQUFDLEtBQUs7WUFDM0IsU0FBUyxFQUFFLG9CQUFvQixDQUFDLFVBQVU7WUFDMUMsVUFBVSxFQUFFLE9BQU87WUFDbkIsa0JBQWtCLEVBQUUsR0FBRztTQUMxQixDQUFDLENBQ0wsQ0FBQztRQWhCUSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9CO1FBQ3JDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7UUFlckQsOERBQThEO1FBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUNuQyxVQUFVLENBQ2IsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUN0RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQ3hCLENBQUM7UUFFRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVsRCxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7SUFDeEMsQ0FBQztJQXhIRCxJQUFXLFlBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFXLFlBQVksQ0FBQyxJQUFxQjtRQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFNRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLElBQW1CO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDN0MsUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2hCLEtBQUssY0FBYyxDQUFDLElBQUk7Z0JBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDL0IsTUFBTTtZQUNWLEtBQUssY0FBYyxDQUFDLEtBQUs7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDaEMsTUFBTTtZQUNWLEtBQUssY0FBYyxDQUFDLElBQUksQ0FBQztZQUN6QjtnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQy9CLE1BQU07WUFDVixLQUFLLGNBQWMsQ0FBQyxRQUFRO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ25DLE1BQU07WUFDVixLQUFLLGNBQWMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQy9CLE1BQU07U0FDYjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFtQkQsSUFBVyxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FDckMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FDdkIsQ0FBQztJQUNOLENBQUM7SUFHRCxJQUFXLFNBQVMsQ0FBQyxTQUE4QjtRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzVDLENBQUM7SUFHRCxJQUFXLFVBQVUsQ0FBQyxVQUFpQjtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQzlDLENBQUM7SUFHRCxJQUFXLGtCQUFrQixDQUFDLFFBQWU7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO0lBQ3BELENBQUM7SUE2Q00sV0FBVztRQUNkLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUV0RCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ3ZFO1lBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFnQjtRQUN2RCxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFTyxjQUFjO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUNwRSxDQUFDO0lBRU0sUUFBUSxDQUFDLENBQWlCO1FBQzdCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFdEIsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO1lBQ3BCLHdHQUF3RztZQUN4RyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RDLE9BQU87b0JBQ0gsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtpQkFDeEQsQ0FBQzthQUNMO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0QyxPQUFPO29CQUNILFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7aUJBQ3hELENBQUM7YUFDTDtTQUNKO1FBRUQsdUJBQXVCO1FBQ3ZCLDJDQUEyQztRQUMzQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQXNCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFHTSxTQUFTLENBQUMsQ0FBZTtRQUM1QixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRU0sZ0JBQWdCLENBQ25CLE9BQWtCLEVBQ2xCLEtBQXdCO1FBRXhCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQ0osQ0FBQTs7WUFqSDJCLFNBQVM7WUFDZCxVQUFVO1lBQ0csbUJBQW1CO1lBQ2hCLHNCQUFzQjs7QUE1RXpEO0lBREMsS0FBSyxDQUFDLFlBQVksQ0FBQztrREFHbkI7QUEwQkQ7SUFEQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7MkRBQ0Y7QUFHekI7SUFEQyxLQUFLLENBQUMsZUFBZSxDQUFDO3VEQUNGO0FBR3JCO0lBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzt1REFDRjtBQUdyQjtJQURDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs4REFDQTtBQUs5QjtJQURDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQzsrREFDa0M7QUFVakU7SUFEQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7dURBR3hCO0FBR0Q7SUFEQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7d0RBR3pCO0FBR0Q7SUFEQyxLQUFLLENBQUMsMEJBQTBCLENBQUM7Z0VBR2pDO0FBR0Q7SUFEQyxNQUFNLENBQUMsMEJBQTBCLENBQUM7b0VBQ1k7QUFHL0M7SUFEQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7aUVBQ1k7QUF3RzVDO0lBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3VEQUtuQztBQXhNUSxzQkFBc0I7SUFKbEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBc0IsQ0FBQyxDQUFDO0tBQzlELENBQUM7R0FDVyxzQkFBc0IsQ0FnTmxDO1NBaE5ZLHNCQUFzQjtBQXVObkMsSUFBYSxtQ0FBbUMsMkNBQWhELE1BQWEsbUNBQW9DLFNBQVEsbUJBR3hEO0lBQ0csWUFBbUIsSUFBMkI7UUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBREcsU0FBSSxHQUFKLElBQUksQ0FBdUI7SUFFOUMsQ0FBQztDQUNKLENBQUE7O1lBSDJCLHNCQUFzQjs7QUFKckMsbUNBQW1DO0lBTC9DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsSUFBSSxFQUFFLEVBQUUsNEJBQTRCLEVBQUUsa0JBQWtCLEVBQUU7UUFDMUQsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMscUNBQW1DLENBQUMsQ0FBQztLQUMvRSxDQUFDO0dBQ1csbUNBQW1DLENBTy9DO1NBUFksbUNBQW1DO0FBY2hELElBQWEsK0JBQStCLHVDQUE1QyxNQUFhLCtCQUFnQyxTQUFRLGVBRXBEO0lBQ0csWUFBbUIsSUFBMkI7UUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBREcsU0FBSSxHQUFKLElBQUksQ0FBdUI7SUFFOUMsQ0FBQztDQUNKLENBQUE7O1lBSDJCLHNCQUFzQjs7QUFIckMsK0JBQStCO0lBTDNDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsSUFBSSxFQUFFLEVBQUUseUJBQXlCLEVBQUUscUJBQXFCLEVBQUU7UUFDMUQsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUMsaUNBQStCLENBQUMsQ0FBQztLQUN2RSxDQUFDO0dBQ1csK0JBQStCLENBTTNDO1NBTlksK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcjIsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBJbnB1dCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsXG4gICAgY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsdWVBY2Nlc3NvclxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvY3VzdG9tLXZhbHVlLWFjY2Vzc29yXCI7XG5pbXBvcnQge1xuICAgIElDdXN0b21WYWxpZGF0b3JIb3N0LFxuICAgIGN1c3RvbVZhbGlkYXRvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsaWRhdG9yXG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9jdXN0b20tdmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBTdWlDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9zZXJ2aWNlcy9jb21wb25lbnQtZmFjdG9yeS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1BsYWNlbWVudCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvc2VydmljZXMvcG9zaXRpb25pbmcuc2VydmljZVwiO1xuaW1wb3J0IHsgS2V5Q29kZSB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy91dGlsXCI7XG5cbmltcG9ydCB7IFN1aURhdGVwaWNrZXIsIERhdGVwaWNrZXJNb2RlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IHtcbiAgICBDYWxlbmRhckNvbmZpZyxcbiAgICBZZWFyQ29uZmlnLFxuICAgIE1vbnRoQ29uZmlnLFxuICAgIERhdGV0aW1lQ29uZmlnLFxuICAgIFRpbWVDb25maWcsXG4gICAgRGF0ZUNvbmZpZ1xufSBmcm9tIFwiLi4vY2xhc3Nlcy9jYWxlbmRhci1jb25maWdcIjtcbmltcG9ydCB7XG4gICAgSURhdGVwaWNrZXJMb2NhbGVWYWx1ZXMsXG4gICAgUmVjdXJzaXZlUGFydGlhbFxufSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9pbnRlcmZhY2VzL3ZhbHVlc1wiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL3NlcnZpY2VzL2xvY2FsaXphdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbXBvbmVudENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9wb3B1cC9jbGFzc2VzL3BvcHVwLWNvbXBvbmVudC1jb250cm9sbGVyXCI7XG5pbXBvcnQge1xuICAgIFBvcHVwQ29uZmlnLFxuICAgIFBvcHVwVHJpZ2dlclxufSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9wb3B1cC9jbGFzc2VzL3BvcHVwLWNvbmZpZ1wiO1xuaW1wb3J0IHsgUG9wdXBBZnRlck9wZW4gfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9wb3B1cC9jbGFzc2VzL3BvcHVwLWxpZmVjeWNsZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpRGF0ZXBpY2tlcl1cIixcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWxpZGF0b3JGYWN0b3J5KFN1aURhdGVwaWNrZXJEaXJlY3RpdmUpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyRGlyZWN0aXZlXG4gICAgZXh0ZW5kcyBTdWlQb3B1cENvbXBvbmVudENvbnRyb2xsZXI8U3VpRGF0ZXBpY2tlcj5cbiAgICBpbXBsZW1lbnRzXG4gICAgICAgIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxEYXRlPixcbiAgICAgICAgSUN1c3RvbVZhbGlkYXRvckhvc3QsXG4gICAgICAgIE9uQ2hhbmdlcyxcbiAgICAgICAgUG9wdXBBZnRlck9wZW4ge1xuICAgIHByaXZhdGUgX3NlbGVjdGVkRGF0ZT86RGF0ZTtcblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWREYXRlKCk6RGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZERhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZWxlY3RlZERhdGUoZGF0ZTpEYXRlIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMub25TZWxlY3RlZERhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tb2RlOkRhdGVwaWNrZXJNb2RlO1xuICAgIHB1YmxpYyBjb25maWc6Q2FsZW5kYXJDb25maWc7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJNb2RlXCIpXG4gICAgcHVibGljIGdldCBtb2RlKCk6RGF0ZXBpY2tlck1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG1vZGUobW9kZTpEYXRlcGlja2VyTW9kZSkge1xuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZSB8fCBEYXRlcGlja2VyTW9kZS5EYXRldGltZTtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLlllYXI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgWWVhckNvbmZpZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlcGlja2VyTW9kZS5Nb250aDpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBNb250aENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBEYXRlcGlja2VyTW9kZS5EYXRlOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBEYXRlQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLkRhdGV0aW1lOlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IERhdGV0aW1lQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLlRpbWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgVGltZUNvbmZpZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KFwicGlja2VySW5pdGlhbERhdGVcIilcbiAgICBwdWJsaWMgaW5pdGlhbERhdGU/OkRhdGU7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJNYXhEYXRlXCIpXG4gICAgcHVibGljIG1heERhdGU/OkRhdGU7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJNaW5EYXRlXCIpXG4gICAgcHVibGljIG1pbkRhdGU/OkRhdGU7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJGaXJzdERheU9mV2Vla1wiKVxuICAgIHB1YmxpYyBmaXJzdERheU9mV2Vlaz86bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfbG9jYWxlVmFsdWVzOklEYXRlcGlja2VyTG9jYWxlVmFsdWVzO1xuXG4gICAgQElucHV0KFwicGlja2VyTG9jYWxlT3ZlcnJpZGVzXCIpXG4gICAgcHVibGljIGxvY2FsZU92ZXJyaWRlczpSZWN1cnNpdmVQYXJ0aWFsPElEYXRlcGlja2VyTG9jYWxlVmFsdWVzPjtcblxuICAgIHB1YmxpYyBnZXQgbG9jYWxlVmFsdWVzKCk6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vdmVycmlkZTxcImRhdGVwaWNrZXJcIj4oXG4gICAgICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMsXG4gICAgICAgICAgICB0aGlzLmxvY2FsZU92ZXJyaWRlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIEBJbnB1dChcInBpY2tlclBsYWNlbWVudFwiKVxuICAgIHB1YmxpYyBzZXQgcGxhY2VtZW50KHBsYWNlbWVudDpQb3NpdGlvbmluZ1BsYWNlbWVudCkge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgQElucHV0KFwicGlja2VyVHJhbnNpdGlvblwiKVxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbih0cmFuc2l0aW9uOnN0cmluZykge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJUcmFuc2l0aW9uRHVyYXRpb25cIilcbiAgICBwdWJsaWMgc2V0IHRyYW5zaXRpb25EdXJhdGlvbihkdXJhdGlvbjpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgfVxuXG4gICAgQE91dHB1dChcInBpY2tlclNlbGVjdGVkRGF0ZUNoYW5nZVwiKVxuICAgIHB1YmxpYyBvblNlbGVjdGVkRGF0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8RGF0ZT47XG5cbiAgICBAT3V0cHV0KFwicGlja2VyVmFsaWRhdG9yQ2hhbmdlXCIpXG4gICAgcHVibGljIG9uVmFsaWRhdG9yQ2hhbmdlOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9jb21wb25lbnRGYWN0b3J5OlN1aUNvbXBvbmVudEZhY3RvcnksXG4gICAgICAgIHByb3RlY3RlZCBfbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgX3JlbmRlcmVyLFxuICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgIF9jb21wb25lbnRGYWN0b3J5LFxuICAgICAgICAgICAgU3VpRGF0ZXBpY2tlcixcbiAgICAgICAgICAgIG5ldyBQb3B1cENvbmZpZyh7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogUG9wdXBUcmlnZ2VyLkZvY3VzLFxuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogUG9zaXRpb25pbmdQbGFjZW1lbnQuQm90dG9tTGVmdCxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcInNjYWxlXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoZSBwb3B1cCBpcyBkcmF3biBjb3JyZWN0bHkgKGkuZS4gbm8gYm9yZGVyKS5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5wb3B1cC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIFwidWlcIik7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICAgICAgdGhpcy5wb3B1cC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBcImNhbGVuZGFyXCJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm9uTG9jYWxlVXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2Uub25MYW5ndWFnZVVwZGF0ZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3RlZERhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgICAgIHRoaXMub25WYWxpZGF0b3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAgICAgdGhpcy5tb2RlID0gRGF0ZXBpY2tlck1vZGUuRGF0ZXRpbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcHVwT25PcGVuKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UubG9jYWxlVmFsdWVzID0gdGhpcy5sb2NhbGVWYWx1ZXM7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuY3VycmVudERhdGUgPVxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbERhdGUgfHwgbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5zZWxlY3RlZERhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5tYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLm1pbkRhdGUgPSB0aGlzLm1pbkRhdGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0RGF5T2ZXZWVrICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5maXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5yZXNldCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2Uub25EYXRlQ2hhbmdlLnN1YnNjcmliZSgoZDpEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKHsgbWF4RGF0ZSwgbWluRGF0ZSwgbW9kZSB9OlNpbXBsZUNoYW5nZXMpOnZvaWQge1xuICAgICAgICBpZiAobWF4RGF0ZSB8fCBtaW5EYXRlIHx8IG1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMub25WYWxpZGF0b3JDaGFuZ2UuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxvY2FsZVVwZGF0ZSgpOnZvaWQge1xuICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMgPSB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLmdldCgpLmRhdGVwaWNrZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlKGM6QWJzdHJhY3RDb250cm9sKTpWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYy52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBXZSBwb3N0IHByb2Nlc3MgdGhlIG1pbiAmIG1heCBkYXRlIGJlY2F1c2Ugc29tZXRpbWVzIHRoaXMgcHV0cyB0aGUgZGF0ZSBvdXRzaWRlIG9mIHRoZSBhbGxvd2VkIHJhbmdlLlxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZSA8IHRoaXMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1aU1pbkRhdGU6IHsgcmVxdWlyZWQ6IHRoaXMubWluRGF0ZSwgYWN0dWFsOiB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB2YWx1ZSA+IHRoaXMubWF4RGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN1aU1heERhdGU6IHsgcmVxdWlyZWQ6IHRoaXMubWF4RGF0ZSwgYWN0dWFsOiB2YWx1ZSB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFuZ3VsYXIgZXhwZWN0cyBudWxsXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6RGF0ZSB8IHVuZGVmaW5lZCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5zZWxlY3RlZERhdGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25LZXlEb3duKGU6S2V5Ym9hcmRFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtleUNvZGUuRXNjYXBlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UmVuZGVyZXJWYWx1ZShcbiAgICAgICAgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICB2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWRcbiAgICApOnZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eShlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwidmFsdWVcIiwgdmFsdWUgfHwgXCJcIik7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpRGF0ZXBpY2tlcl1cIixcbiAgICBob3N0OiB7IFwiKHBpY2tlclNlbGVjdGVkRGF0ZUNoYW5nZSlcIjogXCJvbkNoYW5nZSgkZXZlbnQpXCIgfSxcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeShTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWx1ZUFjY2Vzc29yIGV4dGVuZHMgQ3VzdG9tVmFsdWVBY2Nlc3NvcjxcbiAgICBEYXRlLFxuICAgIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVcbj4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0OlN1aURhdGVwaWNrZXJEaXJlY3RpdmUpIHtcbiAgICAgICAgc3VwZXIoaG9zdCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpRGF0ZXBpY2tlcl1cIixcbiAgICBob3N0OiB7IFwiKHBpY2tlclZhbGlkYXRvckNoYW5nZSlcIjogXCJvblZhbGlkYXRvckNoYW5nZSgpXCIgfSxcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWxpZGF0b3JGYWN0b3J5KFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWxpZGF0b3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsaWRhdG9yIGV4dGVuZHMgQ3VzdG9tVmFsaWRhdG9yPFxuICAgIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVcbj4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0OlN1aURhdGVwaWNrZXJEaXJlY3RpdmUpIHtcbiAgICAgICAgc3VwZXIoaG9zdCk7XG4gICAgfVxufVxuIl19