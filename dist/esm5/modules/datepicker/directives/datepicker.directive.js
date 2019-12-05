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
var SuiDatepickerDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDatepickerDirective, _super);
    function SuiDatepickerDirective(_renderer, element, _componentFactory, _localizationService) {
        var _this = _super.call(this, _renderer, element, _componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        })) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._localizationService = _localizationService;
        // This ensures the popup is drawn correctly (i.e. no border).
        _this._renderer.addClass(_this.popup.elementRef.nativeElement, "ui");
        _this._renderer.addClass(_this.popup.elementRef.nativeElement, "calendar");
        _this.onLocaleUpdate();
        _this._localizationService.onLanguageUpdate.subscribe(function () {
            return _this.onLocaleUpdate();
        });
        _this.onSelectedDateChange = new EventEmitter();
        _this.onValidatorChange = new EventEmitter();
        _this.mode = DatepickerMode.Datetime;
        return _this;
    }
    SuiDatepickerDirective_1 = SuiDatepickerDirective;
    Object.defineProperty(SuiDatepickerDirective.prototype, "selectedDate", {
        get: function () {
            return this._selectedDate;
        },
        set: function (date) {
            this._selectedDate = date;
            this.onSelectedDateChange.emit(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "placement", {
        set: function (placement) {
            this.popup.config.placement = placement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "transition", {
        set: function (transition) {
            this.popup.config.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "transitionDuration", {
        set: function (duration) {
            this.popup.config.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    SuiDatepickerDirective.prototype.popupOnOpen = function () {
        var _this = this;
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
            this.componentInstance.service.onDateChange.subscribe(function (d) {
                _this.selectedDate = d;
                _this.close();
            });
        }
    };
    SuiDatepickerDirective.prototype.ngOnChanges = function (_a) {
        var maxDate = _a.maxDate, minDate = _a.minDate, mode = _a.mode;
        if (maxDate || minDate || mode) {
            this.onValidatorChange.emit();
        }
    };
    SuiDatepickerDirective.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().datepicker;
    };
    SuiDatepickerDirective.prototype.validate = function (c) {
        var value = c.value;
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
    };
    SuiDatepickerDirective.prototype.writeValue = function (value) {
        this.selectedDate = value;
        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = value;
        }
    };
    SuiDatepickerDirective.prototype.onKeyDown = function (e) {
        if (e.keyCode === KeyCode.Escape) {
            this.close();
        }
    };
    SuiDatepickerDirective.prototype.setRendererValue = function (element, value) {
        this._renderer.setProperty(element.nativeElement, "value", value || "");
    };
    var SuiDatepickerDirective_1;
    SuiDatepickerDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: SuiComponentFactory },
        { type: SuiLocalizationService }
    ]; };
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
    return SuiDatepickerDirective;
}(SuiPopupComponentController));
export { SuiDatepickerDirective };
var SuiDatepickerDirectiveValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDatepickerDirectiveValueAccessor, _super);
    function SuiDatepickerDirectiveValueAccessor(host) {
        var _this = _super.call(this, host) || this;
        _this.host = host;
        return _this;
    }
    SuiDatepickerDirectiveValueAccessor_1 = SuiDatepickerDirectiveValueAccessor;
    var SuiDatepickerDirectiveValueAccessor_1;
    SuiDatepickerDirectiveValueAccessor.ctorParameters = function () { return [
        { type: SuiDatepickerDirective }
    ]; };
    SuiDatepickerDirectiveValueAccessor = SuiDatepickerDirectiveValueAccessor_1 = tslib_1.__decorate([
        Directive({
            selector: "[suiDatepicker]",
            host: { "(pickerSelectedDateChange)": "onChange($event)" },
            providers: [customValueAccessorFactory(SuiDatepickerDirectiveValueAccessor_1)]
        })
    ], SuiDatepickerDirectiveValueAccessor);
    return SuiDatepickerDirectiveValueAccessor;
}(CustomValueAccessor));
export { SuiDatepickerDirectiveValueAccessor };
var SuiDatepickerDirectiveValidator = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDatepickerDirectiveValidator, _super);
    function SuiDatepickerDirectiveValidator(host) {
        var _this = _super.call(this, host) || this;
        _this.host = host;
        return _this;
    }
    SuiDatepickerDirectiveValidator_1 = SuiDatepickerDirectiveValidator;
    var SuiDatepickerDirectiveValidator_1;
    SuiDatepickerDirectiveValidator.ctorParameters = function () { return [
        { type: SuiDatepickerDirective }
    ]; };
    SuiDatepickerDirectiveValidator = SuiDatepickerDirectiveValidator_1 = tslib_1.__decorate([
        Directive({
            selector: "[suiDatepicker]",
            host: { "(pickerValidatorChange)": "onValidatorChange()" },
            providers: [customValidatorFactory(SuiDatepickerDirectiveValidator_1)]
        })
    ], SuiDatepickerDirectiveValidator);
    return SuiDatepickerDirectiveValidator;
}(CustomValidator));
export { SuiDatepickerDirectiveValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvZGlyZWN0aXZlcy9kYXRlcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFlBQVksRUFDWixTQUFTLEVBQ1QsYUFBYSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLGtEQUFrRCxDQUFDO0FBQzFELE9BQU8sRUFFSCxzQkFBc0IsRUFDdEIsZUFBZSxFQUNsQixNQUFNLDZDQUE2QyxDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFFSCxVQUFVLEVBQ1YsV0FBVyxFQUNYLGNBQWMsRUFDZCxVQUFVLEVBQ1YsVUFBVSxFQUNiLE1BQU0sNEJBQTRCLENBQUM7QUFLcEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdkcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDeEcsT0FBTyxFQUNILFdBQVcsRUFDWCxZQUFZLEVBQ2YsTUFBTSw2Q0FBNkMsQ0FBQztBQU9yRDtJQUNZLGtEQUEwQztJQTZGbEQsZ0NBQ2MsU0FBbUIsRUFDdEIsT0FBa0IsRUFDZixpQkFBcUMsRUFDckMsb0JBQTJDO1FB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Qjs7SUFIckMsK0JBQStCO1FBTDNDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLEVBQUUseUJBQXlCLEVBQUUscUJBQXFCLEVBQUU7WUFDMUQsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUMsaUNBQStCLENBQUMsQ0FBQztTQUN2RSxDQUFDO09BQ1csK0JBQStCLENBTTNDO0lBQUQsc0NBQUM7Q0FBQSxBQU5ELENBQXFELGVBQWUsR0FNbkU7U0FOWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFJlbmRlcmVyMixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0LFxuICAgIElucHV0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBPbkNoYW5nZXMsXG4gICAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1xuICAgIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdCxcbiAgICBjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeSxcbiAgICBDdXN0b21WYWx1ZUFjY2Vzc29yXG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9jdXN0b20tdmFsdWUtYWNjZXNzb3JcIjtcbmltcG9ydCB7XG4gICAgSUN1c3RvbVZhbGlkYXRvckhvc3QsXG4gICAgY3VzdG9tVmFsaWRhdG9yRmFjdG9yeSxcbiAgICBDdXN0b21WYWxpZGF0b3Jcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2N1c3RvbS12YWxpZGF0b3JcIjtcbmltcG9ydCB7IFN1aUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL3NlcnZpY2VzL2NvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2VcIjtcbmltcG9ydCB7IFBvc2l0aW9uaW5nUGxhY2VtZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9zZXJ2aWNlcy9wb3NpdGlvbmluZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBLZXlDb2RlIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcblxuaW1wb3J0IHsgU3VpRGF0ZXBpY2tlciwgRGF0ZXBpY2tlck1vZGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9kYXRlcGlja2VyXCI7XG5pbXBvcnQge1xuICAgIENhbGVuZGFyQ29uZmlnLFxuICAgIFllYXJDb25maWcsXG4gICAgTW9udGhDb25maWcsXG4gICAgRGF0ZXRpbWVDb25maWcsXG4gICAgVGltZUNvbmZpZyxcbiAgICBEYXRlQ29uZmlnXG59IGZyb20gXCIuLi9jbGFzc2VzL2NhbGVuZGFyLWNvbmZpZ1wiO1xuaW1wb3J0IHtcbiAgICBJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcyxcbiAgICBSZWN1cnNpdmVQYXJ0aWFsXG59IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2ludGVyZmFjZXMvdmFsdWVzXCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vc2VydmljZXMvbG9jYWxpemF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1aVBvcHVwQ29tcG9uZW50Q29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3BvcHVwL2NsYXNzZXMvcG9wdXAtY29tcG9uZW50LWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7XG4gICAgUG9wdXBDb25maWcsXG4gICAgUG9wdXBUcmlnZ2VyXG59IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3BvcHVwL2NsYXNzZXMvcG9wdXAtY29uZmlnXCI7XG5pbXBvcnQgeyBQb3B1cEFmdGVyT3BlbiB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3BvcHVwL2NsYXNzZXMvcG9wdXAtbGlmZWN5Y2xlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlEYXRlcGlja2VyXVwiLFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbGlkYXRvckZhY3RvcnkoU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSldXG59KVxuZXhwb3J0IGNsYXNzIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVcbiAgICBleHRlbmRzIFN1aVBvcHVwQ29tcG9uZW50Q29udHJvbGxlcjxTdWlEYXRlcGlja2VyPlxuICAgIGltcGxlbWVudHNcbiAgICAgICAgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0PERhdGU+LFxuICAgICAgICBJQ3VzdG9tVmFsaWRhdG9ySG9zdCxcbiAgICAgICAgT25DaGFuZ2VzLFxuICAgICAgICBQb3B1cEFmdGVyT3BlbiB7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWREYXRlPzpEYXRlO1xuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZERhdGUoKTpEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkRGF0ZShkYXRlOkRhdGUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkRGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21vZGU6RGF0ZXBpY2tlck1vZGU7XG4gICAgcHVibGljIGNvbmZpZzpDYWxlbmRhckNvbmZpZztcblxuICAgIEBJbnB1dChcInBpY2tlck1vZGVcIilcbiAgICBwdWJsaWMgZ2V0IG1vZGUoKTpEYXRlcGlja2VyTW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbW9kZShtb2RlOkRhdGVwaWNrZXJNb2RlKSB7XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlIHx8IERhdGVwaWNrZXJNb2RlLkRhdGV0aW1lO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX21vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBZZWFyQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE1vbnRoQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLkRhdGU6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IERhdGVDb25maWcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuRGF0ZXRpbWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgRGF0ZXRpbWVDb25maWcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuVGltZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUaW1lQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJJbml0aWFsRGF0ZVwiKVxuICAgIHB1YmxpYyBpbml0aWFsRGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlck1heERhdGVcIilcbiAgICBwdWJsaWMgbWF4RGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlck1pbkRhdGVcIilcbiAgICBwdWJsaWMgbWluRGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlckZpcnN0RGF5T2ZXZWVrXCIpXG4gICAgcHVibGljIGZpcnN0RGF5T2ZXZWVrPzpudW1iZXI7XG5cbiAgICBwcml2YXRlIF9sb2NhbGVWYWx1ZXM6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXM7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJMb2NhbGVPdmVycmlkZXNcIilcbiAgICBwdWJsaWMgbG9jYWxlT3ZlcnJpZGVzOlJlY3Vyc2l2ZVBhcnRpYWw8SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXM+O1xuXG4gICAgcHVibGljIGdldCBsb2NhbGVWYWx1ZXMoKTpJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLm92ZXJyaWRlPFwiZGF0ZXBpY2tlclwiPihcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsZVZhbHVlcyxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlT3ZlcnJpZGVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQElucHV0KFwicGlja2VyUGxhY2VtZW50XCIpXG4gICAgcHVibGljIHNldCBwbGFjZW1lbnQocGxhY2VtZW50OlBvc2l0aW9uaW5nUGxhY2VtZW50KSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnBsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJUcmFuc2l0aW9uXCIpXG4gICAgcHVibGljIHNldCB0cmFuc2l0aW9uKHRyYW5zaXRpb246c3RyaW5nKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIH1cblxuICAgIEBJbnB1dChcInBpY2tlclRyYW5zaXRpb25EdXJhdGlvblwiKVxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbkR1cmF0aW9uKGR1cmF0aW9uOm51bWJlcikge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB9XG5cbiAgICBAT3V0cHV0KFwicGlja2VyU2VsZWN0ZWREYXRlQ2hhbmdlXCIpXG4gICAgcHVibGljIG9uU2VsZWN0ZWREYXRlQ2hhbmdlOkV2ZW50RW1pdHRlcjxEYXRlPjtcblxuICAgIEBPdXRwdXQoXCJwaWNrZXJWYWxpZGF0b3JDaGFuZ2VcIilcbiAgICBwdWJsaWMgb25WYWxpZGF0b3JDaGFuZ2U6RXZlbnRFbWl0dGVyPHZvaWQ+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX2NvbXBvbmVudEZhY3Rvcnk6U3VpQ29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgcHJvdGVjdGVkIF9sb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBfcmVuZGVyZXIsXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgX2NvbXBvbmVudEZhY3RvcnksXG4gICAgICAgICAgICBTdWlEYXRlcGlja2VyLFxuICAgICAgICAgICAgbmV3IFBvcHVwQ29uZmlnKHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBQb3B1cFRyaWdnZXIuRm9jdXMsXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50OiBQb3NpdGlvbmluZ1BsYWNlbWVudC5Cb3R0b21MZWZ0LFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IFwic2NhbGVcIixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDIwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBUaGlzIGVuc3VyZXMgdGhlIHBvcHVwIGlzIGRyYXduIGNvcnJlY3RseSAoaS5lLiBubyBib3JkZXIpLlxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnBvcHVwLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXCJ1aVwiKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgICAgICB0aGlzLnBvcHVwLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIFwiY2FsZW5kYXJcIlxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKTtcbiAgICAgICAgdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbkxvY2FsZVVwZGF0ZSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdGVkRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgICAgICAgdGhpcy5vblZhbGlkYXRvckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICB0aGlzLm1vZGUgPSBEYXRlcGlja2VyTW9kZS5EYXRldGltZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wdXBPbk9wZW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5sb2NhbGVWYWx1ZXMgPSB0aGlzLmxvY2FsZVZhbHVlcztcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5jdXJyZW50RGF0ZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsRGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLnNlbGVjdGVkRGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLm1heERhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UubWluRGF0ZSA9IHRoaXMubWluRGF0ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3REYXlPZldlZWsgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLmZpcnN0RGF5T2ZXZWVrID0gdGhpcy5maXJzdERheU9mV2VlaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLnJlc2V0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5vbkRhdGVDaGFuZ2Uuc3Vic2NyaWJlKChkOkRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoeyBtYXhEYXRlLCBtaW5EYXRlLCBtb2RlIH06U2ltcGxlQ2hhbmdlcyk6dm9pZCB7XG4gICAgICAgIGlmIChtYXhEYXRlIHx8IG1pbkRhdGUgfHwgbW9kZSkge1xuICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRvckNoYW5nZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTG9jYWxlVXBkYXRlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2xvY2FsZVZhbHVlcyA9IHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2UuZ2V0KCkuZGF0ZXBpY2tlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGUoYzpBYnN0cmFjdENvbnRyb2wpOlZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjLnZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFdlIHBvc3QgcHJvY2VzcyB0aGUgbWluICYgbWF4IGRhdGUgYmVjYXVzZSBzb21ldGltZXMgdGhpcyBwdXRzIHRoZSBkYXRlIG91dHNpZGUgb2YgdGhlIGFsbG93ZWQgcmFuZ2UuXG4gICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHZhbHVlIDwgdGhpcy5taW5EYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3VpTWluRGF0ZTogeyByZXF1aXJlZDogdGhpcy5taW5EYXRlLCBhY3R1YWw6IHZhbHVlIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHZhbHVlID4gdGhpcy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3VpTWF4RGF0ZTogeyByZXF1aXJlZDogdGhpcy5tYXhEYXRlLCBhY3R1YWw6IHZhbHVlIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQW5ndWxhciBleHBlY3RzIG51bGxcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpEYXRlIHwgdW5kZWZpbmVkKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLnNlbGVjdGVkRGF0ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbktleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS2V5Q29kZS5Fc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRSZW5kZXJlclZhbHVlKFxuICAgICAgICBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHZhbHVlOnN0cmluZyB8IHVuZGVmaW5lZFxuICAgICk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KGVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ2YWx1ZVwiLCB2YWx1ZSB8fCBcIlwiKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlEYXRlcGlja2VyXVwiLFxuICAgIGhvc3Q6IHsgXCIocGlja2VyU2VsZWN0ZWREYXRlQ2hhbmdlKVwiOiBcIm9uQ2hhbmdlKCRldmVudClcIiB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWx1ZUFjY2Vzc29yKV1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBDdXN0b21WYWx1ZUFjY2Vzc29yPFxuICAgIERhdGUsXG4gICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVxuPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGhvc3Q6U3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSkge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlEYXRlcGlja2VyXVwiLFxuICAgIGhvc3Q6IHsgXCIocGlja2VyVmFsaWRhdG9yQ2hhbmdlKVwiOiBcIm9uVmFsaWRhdG9yQ2hhbmdlKClcIiB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbGlkYXRvckZhY3RvcnkoU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbGlkYXRvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWxpZGF0b3IgZXh0ZW5kcyBDdXN0b21WYWxpZGF0b3I8XG4gICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVxuPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGhvc3Q6U3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSkge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=