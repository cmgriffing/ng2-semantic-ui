var SuiDatepickerDirective_1, SuiDatepickerDirectiveValueAccessor_1, SuiDatepickerDirectiveValidator_1;
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Renderer2, EventEmitter, Output, Input, HostListener, OnChanges, SimpleChanges } from "@angular/core";
import { ICustomValueAccessorHost, customValueAccessorFactory, CustomValueAccessor, ICustomValidatorHost, customValidatorFactory, CustomValidator, PositioningPlacement, SuiComponentFactory, KeyCode } from "../../../misc/util/index";
import { IDatepickerLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiPopupComponentController, PopupConfig, PopupTrigger } from "../../popup/index";
import { SuiDatepicker, DatepickerMode } from "../components/datepicker";
import { YearConfig, MonthConfig, DatetimeConfig, TimeConfig, DateConfig } from "../classes/calendar-config";
let SuiDatepickerDirective = SuiDatepickerDirective_1 = class SuiDatepickerDirective extends SuiPopupComponentController {
    constructor(renderer, element, componentFactory, localizationService) {
        super(renderer, element, componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        }));
        this.renderer = renderer;
        this.localizationService = localizationService;
        // This ensures the popup is drawn correctly (i.e. no border).
        this.renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this.renderer.addClass(this.popup.elementRef.nativeElement, "calendar");
        this.onLocaleUpdate();
        this.localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
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
        return this.localizationService.override(this._localeValues, this.localeOverrides);
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
            this.componentInstance.service.currentDate = this.initialDate || new Date();
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
        this._localeValues = this.localizationService.get().datepicker;
    }
    validate(c) {
        const value = c.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvZGlyZWN0aXZlcy9kYXRlcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFDN0QsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQ3pDLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCx3QkFBd0IsRUFBRSwwQkFBMEIsRUFBRSxtQkFBbUIsRUFDekUsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFDcEgsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxSCxPQUFPLEVBQUUsMkJBQTJCLEVBQWtCLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRyxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBa0IsVUFBVSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTTdILElBQWEsc0JBQXNCLDhCQUFuQyxNQUFhLHNCQUNOLFNBQVEsMkJBQTBDO0lBdUZyRCxZQUFtQixRQUFrQixFQUN6QixPQUFrQixFQUNsQixnQkFBb0MsRUFDN0IsbUJBQTBDO1FBRXpELEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxJQUFJLFdBQVcsQ0FBQztZQUN0RSxPQUFPLEVB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QUFJLENBQUMsQ0FBQztRQUEzQyxTQUFJLEdBQUosSUFBSSxDQUF1QjtJQUFpQixDQUFDO0NBQ25FLENBQUE7O1lBRDJCLHNCQUFzQjs7QUFEckMsbUNBQW1DO0lBTC9DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsSUFBSSxFQUFFLEVBQUUsNEJBQTRCLEVBQUUsa0JBQWtCLEVBQUU7UUFDMUQsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMscUNBQW1DLENBQUMsQ0FBQztLQUMvRSxDQUFDO0dBQ1csbUNBQW1DLENBRS9DO1NBRlksbUNBQW1DO0FBU2hELElBQWEsK0JBQStCLHVDQUE1QyxNQUFhLCtCQUFnQyxTQUFRLGVBQXVDO0lBQ3hGLFlBQW1CLElBQTJCO1FBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQTNDLFNBQUksR0FBSixJQUFJLENBQXVCO0lBQWlCLENBQUM7Q0FDbkUsQ0FBQTs7WUFEMkIsc0JBQXNCOztBQURyQywrQkFBK0I7SUFMM0MsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixJQUFJLEVBQUUsRUFBRSx5QkFBeUIsRUFBRSxxQkFBcUIsRUFBRTtRQUMxRCxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxpQ0FBK0IsQ0FBQyxDQUFDO0tBQ3ZFLENBQUM7R0FDVywrQkFBK0IsQ0FFM0M7U0FGWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQsXG4gICAgSG9zdExpc3RlbmVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LCBDdXN0b21WYWx1ZUFjY2Vzc29yLFxuICAgIElDdXN0b21WYWxpZGF0b3JIb3N0LCBjdXN0b21WYWxpZGF0b3JGYWN0b3J5LCBDdXN0b21WYWxpZGF0b3IsIFBvc2l0aW9uaW5nUGxhY2VtZW50LCBTdWlDb21wb25lbnRGYWN0b3J5LCBLZXlDb2RlXG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IElEYXRlcGlja2VyTG9jYWxlVmFsdWVzLCBSZWN1cnNpdmVQYXJ0aWFsLCBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aVBvcHVwQ29tcG9uZW50Q29udHJvbGxlciwgUG9wdXBBZnRlck9wZW4sIFBvcHVwQ29uZmlnLCBQb3B1cFRyaWdnZXIgfSBmcm9tIFwiLi4vLi4vcG9wdXAvaW5kZXhcIjtcbmltcG9ydCB7IFN1aURhdGVwaWNrZXIsIERhdGVwaWNrZXJNb2RlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWcsIFllYXJDb25maWcsIE1vbnRoQ29uZmlnLCBEYXRldGltZUNvbmZpZywgVGltZUNvbmZpZywgRGF0ZUNvbmZpZyB9IGZyb20gXCIuLi9jbGFzc2VzL2NhbGVuZGFyLWNvbmZpZ1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpRGF0ZXBpY2tlcl1cIixcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWxpZGF0b3JGYWN0b3J5KFN1aURhdGVwaWNrZXJEaXJlY3RpdmUpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyRGlyZWN0aXZlXG4gICAgICAgZXh0ZW5kcyBTdWlQb3B1cENvbXBvbmVudENvbnRyb2xsZXI8U3VpRGF0ZXBpY2tlcj5cbiAgICAgICBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxEYXRlPiwgSUN1c3RvbVZhbGlkYXRvckhvc3QsIE9uQ2hhbmdlcywgUG9wdXBBZnRlck9wZW4ge1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWREYXRlPzpEYXRlO1xuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZERhdGUoKTpEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkRGF0ZShkYXRlOkRhdGUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkRGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21vZGU6RGF0ZXBpY2tlck1vZGU7XG4gICAgcHVibGljIGNvbmZpZzpDYWxlbmRhckNvbmZpZztcblxuICAgIEBJbnB1dChcInBpY2tlck1vZGVcIilcbiAgICBwdWJsaWMgZ2V0IG1vZGUoKTpEYXRlcGlja2VyTW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbW9kZShtb2RlOkRhdGVwaWNrZXJNb2RlKSB7XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlIHx8IERhdGVwaWNrZXJNb2RlLkRhdGV0aW1lO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX21vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuWWVhcjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBZZWFyQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLk1vbnRoOlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IE1vbnRoQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERhdGVwaWNrZXJNb2RlLkRhdGU6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnID0gbmV3IERhdGVDb25maWcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuRGF0ZXRpbWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgRGF0ZXRpbWVDb25maWcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRGF0ZXBpY2tlck1vZGUuVGltZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyA9IG5ldyBUaW1lQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJJbml0aWFsRGF0ZVwiKVxuICAgIHB1YmxpYyBpbml0aWFsRGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlck1heERhdGVcIilcbiAgICBwdWJsaWMgbWF4RGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlck1pbkRhdGVcIilcbiAgICBwdWJsaWMgbWluRGF0ZT86RGF0ZTtcblxuICAgIEBJbnB1dChcInBpY2tlckZpcnN0RGF5T2ZXZWVrXCIpXG4gICAgcHVibGljIGZpcnN0RGF5T2ZXZWVrPzpudW1iZXI7XG5cbiAgICBwcml2YXRlIF9sb2NhbGVWYWx1ZXM6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXM7XG5cbiAgICBASW5wdXQoXCJwaWNrZXJMb2NhbGVPdmVycmlkZXNcIilcbiAgICBwdWJsaWMgbG9jYWxlT3ZlcnJpZGVzOlJlY3Vyc2l2ZVBhcnRpYWw8SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXM+O1xuXG4gICAgcHVibGljIGdldCBsb2NhbGVWYWx1ZXMoKTpJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsaXphdGlvblNlcnZpY2Uub3ZlcnJpZGU8XCJkYXRlcGlja2VyXCI+KHRoaXMuX2xvY2FsZVZhbHVlcywgdGhpcy5sb2NhbGVPdmVycmlkZXMpO1xuICAgIH1cblxuICAgIEBJbnB1dChcInBpY2tlclBsYWNlbWVudFwiKVxuICAgIHB1YmxpYyBzZXQgcGxhY2VtZW50KHBsYWNlbWVudDpQb3NpdGlvbmluZ1BsYWNlbWVudCkge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgQElucHV0KFwicGlja2VyVHJhbnNpdGlvblwiKVxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbih0cmFuc2l0aW9uOnN0cmluZykge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJwaWNrZXJUcmFuc2l0aW9uRHVyYXRpb25cIilcbiAgICBwdWJsaWMgc2V0IHRyYW5zaXRpb25EdXJhdGlvbihkdXJhdGlvbjpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgfVxuXG4gICAgQE91dHB1dChcInBpY2tlclNlbGVjdGVkRGF0ZUNoYW5nZVwiKVxuICAgIHB1YmxpYyBvblNlbGVjdGVkRGF0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8RGF0ZT47XG5cbiAgICBAT3V0cHV0KFwicGlja2VyVmFsaWRhdG9yQ2hhbmdlXCIpXG4gICAgcHVibGljIG9uVmFsaWRhdG9yQ2hhbmdlOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3Rvcnk6U3VpQ29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlKSB7XG5cbiAgICAgICAgc3VwZXIocmVuZGVyZXIsIGVsZW1lbnQsIGNvbXBvbmVudEZhY3RvcnksIFN1aURhdGVwaWNrZXIsIG5ldyBQb3B1cENvbmZpZyh7XG4gICAgICAgICAgICB0cmlnZ2VyOiBQb3B1cFRyaWdnZXIuRm9jdXMsXG4gICAgICAgICAgICBwbGFjZW1lbnQ6IFBvc2l0aW9uaW5nUGxhY2VtZW50LkJvdHRvbUxlZnQsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBcInNjYWxlXCIsXG4gICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDIwMFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoZSBwb3B1cCBpcyBkcmF3biBjb3JyZWN0bHkgKGkuZS4gbm8gYm9yZGVyKS5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnBvcHVwLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXCJ1aVwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnBvcHVwLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgXCJjYWxlbmRhclwiKTtcblxuICAgICAgICB0aGlzLm9uTG9jYWxlVXBkYXRlKCk7XG4gICAgICAgIHRoaXMubG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uTG9jYWxlVXBkYXRlKCkpO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3RlZERhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgICAgIHRoaXMub25WYWxpZGF0b3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAgICAgdGhpcy5tb2RlID0gRGF0ZXBpY2tlck1vZGUuRGF0ZXRpbWU7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcHVwT25PcGVuKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UubG9jYWxlVmFsdWVzID0gdGhpcy5sb2NhbGVWYWx1ZXM7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuY3VycmVudERhdGUgPSB0aGlzLmluaXRpYWxEYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2Uuc2VsZWN0ZWREYXRlID0gdGhpcy5zZWxlY3RlZERhdGU7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UubWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2Uuc2VydmljZS5taW5EYXRlID0gdGhpcy5taW5EYXRlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maXJzdERheU9mV2VlayAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UuZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlLnNlcnZpY2UucmVzZXQoKTtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLm9uRGF0ZUNoYW5nZS5zdWJzY3JpYmUoKGQ6RGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyh7IG1heERhdGUsIG1pbkRhdGUsIG1vZGUgfTpTaW1wbGVDaGFuZ2VzKTp2b2lkIHtcbiAgICAgICAgaWYgKG1heERhdGUgfHwgbWluRGF0ZSB8fCBtb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9uVmFsaWRhdG9yQ2hhbmdlLmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2NhbGVVcGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzID0gdGhpcy5sb2NhbGl6YXRpb25TZXJ2aWNlLmdldCgpLmRhdGVwaWNrZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlKGM6QWJzdHJhY3RDb250cm9sKTpWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYy52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBXZSBwb3N0IHByb2Nlc3MgdGhlIG1pbiAmIG1heCBkYXRlIGJlY2F1c2Ugc29tZXRpbWVzIHRoaXMgcHV0cyB0aGUgZGF0ZSBvdXRzaWRlIG9mIHRoZSBhbGxvd2VkIHJhbmdlLlxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZSA8IHRoaXMubWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHN1aU1pbkRhdGU6IHsgcmVxdWlyZWQ6IHRoaXMubWluRGF0ZSwgYWN0dWFsOiB2YWx1ZSB9IH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdmFsdWUgPiB0aGlzLm1heERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBzdWlNYXhEYXRlOiB7IHJlcXVpcmVkOiB0aGlzLm1heERhdGUsIGFjdHVhbDogdmFsdWUgfSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQW5ndWxhciBleHBlY3RzIG51bGxcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpEYXRlIHwgdW5kZWZpbmVkKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZS5zZXJ2aWNlLnNlbGVjdGVkRGF0ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbktleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gS2V5Q29kZS5Fc2NhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aURhdGVwaWNrZXJdXCIsXG4gICAgaG9zdDogeyBcIihwaWNrZXJTZWxlY3RlZERhdGVDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiIH0sXG4gICAgcHJvdmlkZXJzOiBbY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnkoU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbHVlQWNjZXNzb3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvciBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8RGF0ZSwgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBob3N0OlN1aURhdGVwaWNrZXJEaXJlY3RpdmUpIHsgc3VwZXIoaG9zdCk7IH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aURhdGVwaWNrZXJdXCIsXG4gICAgaG9zdDogeyBcIihwaWNrZXJWYWxpZGF0b3JDaGFuZ2UpXCI6IFwib25WYWxpZGF0b3JDaGFuZ2UoKVwiIH0sXG4gICAgcHJvdmlkZXJzOiBbY3VzdG9tVmFsaWRhdG9yRmFjdG9yeShTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsaWRhdG9yKV1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbGlkYXRvciBleHRlbmRzIEN1c3RvbVZhbGlkYXRvcjxTdWlEYXRlcGlja2VyRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGhvc3Q6U3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSkgeyBzdXBlcihob3N0KTsgfVxufVxuIl19