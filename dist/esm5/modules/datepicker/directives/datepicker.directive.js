import * as tslib_1 from "tslib";
import { Directive, ElementRef, Renderer2, EventEmitter, Output, Input, HostListener, OnChanges, SimpleChanges } from "@angular/core";
import { ICustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor, ICustomValidatorHost, customValidatorFactory, CustomValidator, PositioningPlacement, SuiComponentFactory, KeyCode } from "../../../misc/util/index";
import { IDatepickerLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiPopupComponentController, PopupConfig, PopupTrigger } from "../../popup/index";
import { SuiDatepicker, DatepickerMode } from "../components/datepicker";
import { YearConfig, MonthConfig, DatetimeConfig, TimeConfig, DateConfig } from "../classes/calendar-config";
var SuiDatepickerDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDatepickerDirective, _super);
    function SuiDatepickerDirective(renderer, element, componentFactory, localizationService) {
        var _this = _super.call(this, renderer, element, componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        })) || this;
        _this.renderer = renderer;
        _this.localizationService = localizationService;
        // This ensures the popup is drawn correctly (i.e. no border).
        _this.renderer.addClass(_this.popup.elementRef.nativeElement, "ui");
        _this.renderer.addClass(_this.popup.elementRef.nativeElement, "calendar");
        _this.onLocaleUpdate();
        _this.localizationService.onLanguageUpdate.subscribe(function () { return _this.onLocaleUpdate(); });
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
            return this.localizationService.override(this._localeValues, this.localeOverrides);
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
            this.componentInstance.service.currentDate = this.initialDate || new Date();
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
        this._localeValues = this.localizationService.get().datepicker;
    };
    SuiDatepickerDirective.prototype.validate = function (c) {
        var value = c.value;
        if (value != undefined) {
            // We post process the min & max date because sometimes this puts the date outside of the allowed range.
            if (this.minDate && value < this.minDate) {
                return { suiMinDate: { required: this.minDate, actual: value } };
            }
            if (this.maxDate && value > this.maxDate) {
                return { suiMaxDate: { required: this.maxDate, actual: value } };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvZGlyZWN0aXZlcy9kYXRlcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUM3RCxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFDekMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNILHdCQUF3QixFQUFFLDBCQUEwQixFQUFFLG1CQUFtQixFQUN6RSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUNwSCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFILE9BQU8sRUFBRSwyQkFBMkIsRUFBa0IsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNHLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxFQUFrQixVQUFVLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNN0g7SUFDZSxrREFBMEM7SUF1RnJELGdDQUFtQixRQUFrQixFQUN6QixPQUFrQixFQUNsQixnQkFBb0MsRUFDN0IsbUJBQTBDO1FBSDdELFlBS0ksa0JBQU0sUUFBUSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsSUFBSSxXQUFXLENBQUM7WUFDdEUsT0FBTyxFQUFFLFlBQVksQ0FBQyxLQUFLO1lBQzNCLFNBQVMs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QztPQUNXLHNCQUFzQixDQWtMbEM7SUFBRCw2QkFBQztDQUFBLEFBbExELENBQ2UsMkJBQTJCLEdBaUx6QztTQWxMWSxzQkFBc0I7QUF5TG5DO0lBQXlELCtEQUFpRDtJQUN0Ryw2Q0FBbUIsSUFBMkI7UUFBOUMsWUFBa0Qsa0JBQU0sSUFBSSxDQUFDLFNBQUc7UUFBN0MsVUFBSSxHQUFKLElBQUksQ0FBdUI7O0lBQWlCLENBQUM7NENBRHZELG1DQUFtQzs7O2dCQUNwQixzQkFBc0I7O0lBRHJDLG1DQUFtQztRQUwvQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLElBQUksRUFBRSxFQUFFLDRCQUE0QixFQUFFLGtCQUFrQixFQUFFO1lBQzFELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLHFDQUFtQyxDQUFDLENBQUM7U0FDL0UsQ0FBQztPQUNXLG1DQUFtQyxDQUUvQztJQUFELDBDQUFDO0NBQUEsQUFGRCxDQUF5RCxtQkFBbUIsR0FFM0U7U0FGWSxtQ0FBbUM7QUFTaEQ7SUFBcUQsMkRBQXVDO0lBQ3hGLHlDQUFtQixJQUEyQjtRQUE5QyxZQUFrRCxrQkFBTSxJQUFJLENBQUMsU0FBRztRQUE3QyxVQUFJLEdBQUosSUFBSSxDQUF1Qjs7SUFBaUIsQ0FBQzt3Q0FEdkQsK0JBQStCOzs7Z0JBQ2hCLHNCQUFzQjs7SUFEckMsK0JBQStCO1FBTDNDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLEVBQUUseUJBQXlCLEVBQUUscUJBQXFCLEVBQUU7WUFDMUQsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUMsaUNBQStCLENBQUMsQ0FBQztTQUN2RSxDQUFDO09BQ1csK0JBQStCLENBRTNDO0lBQUQsc0NBQUM7Q0FBQSxBQUZELENBQXFELGVBQWUsR0FFbkU7U0FGWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQsXG4gICAgSG9zdExpc3RlbmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LCBDdXN0b21WYWx1ZUFjY2Vzc29yLFxuICAgIElDdXN0b21WYWxpZGF0b3JIb3N0LCBjdXN0b21WYWxpZGF0b3JGYWN0b3J5LCBDdXN0b21WYWxpZGF0b3IsIFBvc2l0aW9uaW5nUGxhY2VtZW50LCBTdWlDb21wb25lbnRGYWN0b3J5LCBLZXlDb2RlXG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IElEYXRlcGlja2VyTG9jYWxlVmFsdWVzLCBSZWN1cnNpdmVQYXJ0aWFsLCBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aVBvcHVwQ29tcG9uZW50Q29udHJvbGxlciwgUG9wdXBBZnRlck9wZW4sIFBvcHVwQ29uZmlnLCBQb3B1cFRyaWdnZXIgfSBmcm9tIFwiLi4vLi4vcG9wdXAvaW5kZXhcIjtcbmltcG9ydCB7IFN1aURhdGVwaWNrZXIsIERhdGVwaWNrZXJNb2RlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWcsIFllYXJDb25maWcsIE1vbnRoQ29uZmlnLCBEYXRldGltZUNvbmZpZywgVGltZUNvbmZpZywgRGF0ZUNvbmZpZyB9IGZyb20gXCIuLi9jbGFzc2VzL2NhbGVuZGFyLWNvbmZpZ1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpRGF0ZXBpY2tlcl1cIixcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWxpZGF0b3JGYWN0b3J5KFN1aURhdGVwaWNrZXJEaXJlY3RpdmUpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyRGlyZWN0aXZlXG4gICAgICAgZXh0ZW5kcyBTdWlQb3B1cENvbXBvbmVudENvbnRyb2xsZXI8U3VpRGF0ZXBpY2tlcj5cbiAgICAgICBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxEYXRlPiwgSUN1c3RvbVZhbGlkYXRvckhvc3QsIE9uQ2hhbmdlcywgUG9wdXBBZnRlck9wZW4ge1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWREYXRlPzpEYXRlO1xuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZERhdGUoKTpEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkRGF0ZShkYXRlOkRhdGUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkRGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21vZGU6RGF0ZXBpY2tlck1vZGU7XG4gICAgcHVibGljIGNvbmZpZzpDYWxlbmRhckNvbmZpZztcblxuICAgIEBJbnB1dChcInBpY2tlck1vZGVcIilcbiAgICBwdWJsaWMgZ2V0IG1vZGUoKTpEYXRlcGlja2VyTW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbW9kZShtb2RlOkRhdGVwaWNrZXJNb2RlKSB7XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlIHx8IERhdGVwaWNrZXJNb2RlLkRhdGV0aW1lO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX21vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBZZWFyQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE1vbnRoQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLkRhdGU6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IERhdGVDb25maWcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuRGF0ZXRpbWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgRGF0ZXRpbWVDb25maWcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuVGltZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUaW1lQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJJbml0aWFsRGF0ZVwiKVxuICAgIHB1YmxpYyBpbml0aWFsRGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlck1heERhdGVcIilcbiAgICBwdWJsaWMgbWF4RGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlck1pbkRhdGVcIilcbiAgICBwdWJsaWMgbWluRGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlckZpcnN0RGF5T2ZXZWVrXCIpXG4gICAgcHVibGljIGZpcnN0RGF5T2ZXZWVrPzpudW1iZXI7XG5cbiAgICBwcml2YXRlIF9sb2NhbGVWYWx1ZXM6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXM7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJMb2NhbGVPdmVycmlkZXNcIilcbiAgICBwdWJsaWMgbG9jYWxlT3ZlcnJpZGVzOlJlY3Vyc2l2ZVBhcnRpYWw8SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXM+O1xuXG4gICAgcHVibGljIGdldCBsb2NhbGVWYWx1ZXMoKTpJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsaXphdGlvblNlcnZpY2Uub3ZlcnJpZGU8XCJkYXRlcGlja2VyXCI+KHRoaXMuX2xvY2FsZVZhbHVlcywgdGhpcy5sb2NhbGVPdmVycmlkZXMpO1xuICAgIH1cblxuICAgIEBJbnB1dChcInBpY2tlclBsYWNlbWVudFwiKVxuICAgIHB1YmxpYyBzZXQgcGxhY2VtZW50KHBsYWNlbWVudDpQb3NpdGlvbmluZ1BsYWNlbWVudCkge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgQElucHV0KFwicGlja2VyVHJhbnNpdGlvblwiKVxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbih0cmFuc2l0aW9uOnN0cmluZykge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJUcmFuc2l0aW9uRHVyYXRpb25cIilcbiAgICBwdWJsaWMgc2V0IHRyYW5zaXRpb25EdXJhdGlvbihkdXJhdGlvbjpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgfVxuXG4gICAgQE91dHB1dChcInBpY2tlclNlbGVjdGVkRGF0ZUNoYW5nZVwiKVxuICAgIHB1YmxpYyBvblNlbGVjdGVkRGF0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8RGF0ZT47XG5cbiAgICBAT3V0cHV0KFwicGlja2VyVmFsaWRhdG9yQ2hhbmdlXCIpXG4gICAgcHVibGljIG9uVmFsaWRhdG9yQ2hhbmdlOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3Rvcnk6U3VpQ29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlKSB7XG5cbiAgICAgICAgc3VwZXIocmVuZGVyZXIsIGVsZW1lbnQsIGNvbXBvbmVudEZhY3RvcnksIFN1aURhdGVwaWNrZXIsIG5ldyBQb3B1cENvbmZpZyh7XG4gICAgICAgICAgICB0cmlnZ2VyOiBQb3B1cFRyaWdnZXIuRm9jdXMsXG4gICAgICAgICAgICBwbGFjZW1lbnQ6IFBvc2l0aW9uaW5nUGxhY2VtZW50LkJvdHRvbUxlZnQsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBcInNjYWxlXCIsXG4gICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDIwMFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoZSBwb3B1cCBpcyBkcmF3biBjb3JyZWN0bHkgKGkuZS4gbm8gYm9yZGVyKS5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnBvcHVwLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXCJ1aVwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnBvcHVwLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXCJjYWxlbmRhclwiKTtcblxuICAgICAgICB0aGlzLm9uTG9jYWxlVXBkYXRlKCk7XG4gICAgICAgIHRoaXMubG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uTG9jYWxlVXBkYXRlKCkpO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3RlZERhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgICAgIHRoaXMub25WYWxpZGF0b3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAgICAgdGhpcy5tb2RlID0gRGF0ZXBpY2tlck1vZGUuRGF0ZXRpbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcHVwT25PcGVuKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UubG9jYWxlVmFsdWVzID0gdGhpcy5sb2NhbGVWYWx1ZXM7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuY3VycmVudERhdGUgPSB0aGlzLmluaXRpYWxEYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2Uuc2VsZWN0ZWREYXRlID0gdGhpcy5zZWxlY3RlZERhdGU7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UubWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5taW5EYXRlID0gdGhpcy5taW5EYXRlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maXJzdERheU9mV2VlayAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UucmVzZXQoKTtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLm9uRGF0ZUNoYW5nZS5zdWJzY3JpYmUoKGQ6RGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyh7IG1heERhdGUsIG1pbkRhdGUsIG1vZGUgfTpTaW1wbGVDaGFuZ2VzKTp2b2lkIHtcbiAgICAgICAgaWYgKG1heERhdGUgfHwgbWluRGF0ZSB8fCBtb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsaWRhdG9yQ2hhbmdlLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2NhbGVVcGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzID0gdGhpcy5sb2NhbGl6YXRpb25TZXJ2aWNlLmdldCgpLmRhdGVwaWNrZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlKGM6QWJzdHJhY3RDb250cm9sKTpWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYy52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBXZSBwb3N0IHByb2Nlc3MgdGhlIG1pbiAmIG1heCBkYXRlIGJlY2F1c2Ugc29tZXRpbWVzIHRoaXMgcHV0cyB0aGUgZGF0ZSBvdXRzaWRlIG9mIHRoZSBhbGxvd2VkIHJhbmdlLlxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZSA8IHRoaXMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN1aU1pbkRhdGU6IHsgcmVxdWlyZWQ6IHRoaXMubWluRGF0ZSwgYWN0dWFsOiB2YWx1ZSB9IH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdmFsdWUgPiB0aGlzLm1heERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWlNYXhEYXRlOiB7IHJlcXVpcmVkOiB0aGlzLm1heERhdGUsIGFjdHVhbDogdmFsdWUgfSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQW5ndWxhciBleHBlY3RzIG51bGxcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpEYXRlIHwgdW5kZWZpbmVkKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLnNlbGVjdGVkRGF0ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbktleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS2V5Q29kZS5Fc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aURhdGVwaWNrZXJdXCIsXG4gICAgaG9zdDogeyBcIihwaWNrZXJTZWxlY3RlZERhdGVDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiIH0sXG4gICAgcHJvdmlkZXJzOiBbY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnkoU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbHVlQWNjZXNzb3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvciBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8RGF0ZSwgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0OlN1aURhdGVwaWNrZXJEaXJlY3RpdmUpIHsgc3VwZXIoaG9zdCk7IH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aURhdGVwaWNrZXJdXCIsXG4gICAgaG9zdDogeyBcIihwaWNrZXJWYWxpZGF0b3JDaGFuZ2UpXCI6IFwib25WYWxpZGF0b3JDaGFuZ2UoKVwiIH0sXG4gICAgcHJvdmlkZXJzOiBbY3VzdG9tVmFsaWRhdG9yRmFjdG9yeShTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsaWRhdG9yKV1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbGlkYXRvciBleHRlbmRzIEN1c3RvbVZhbGlkYXRvcjxTdWlEYXRlcGlja2VyRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGhvc3Q6U3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSkgeyBzdXBlcihob3N0KTsgfVxufVxuIl19