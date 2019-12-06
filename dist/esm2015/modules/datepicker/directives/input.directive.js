import * as tslib_1 from "tslib";
import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { DateUtil } from "../../../misc/util/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { PopupTrigger } from "../../popup/index";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor } from "./datepicker.directive";
import { InternalDateParser, DateParser } from "../classes/date-parser";
import * as bowser from "bowser";
import "../helpers/is-webview";
import * as isUAWebView from "is-ua-webview";
const isWebView = isUAWebView["default"] || isUAWebView;
let SuiDatepickerInputDirective = class SuiDatepickerInputDirective {
    constructor(datepicker, valueAccessor, element, localizationService) {
        this.datepicker = datepicker;
        this.valueAccessor = valueAccessor;
        this.element = element;
        this.useNativeOnMobile = true;
        this.fallbackActive = false;
        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(() => this.updateValue(this.selectedDateString));
        localizationService.onLanguageUpdate.subscribe(() => this.updateValue(this.selectedDateString));
    }
    get useNativeOnMobile() {
        return this._useNativeOnMobile;
    }
    set useNativeOnMobile(fallback) {
        this._useNativeOnMobile = fallback;
        const isOnMobile = bowser.mobile || bowser.tablet || isWebView(navigator.userAgent);
        this.fallbackActive = this.useNativeOnMobile && isOnMobile;
    }
    get fallbackActive() {
        return this._fallbackActive;
    }
    set fallbackActive(active) {
        this._fallbackActive = active;
        // If the fallback is active, then the trigger must be manual so the datepicker never opens.
        this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
        // Update the input value (this will insert the `T` as required).
        this.updateValue(this.selectedDateString);
    }
    get parser() {
        if (this.fallbackActive) {
            return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
        }
        return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
    }
    get selectedDateString() {
        if (this.datepicker.selectedDate) {
            return this.parser.format(this.datepicker.selectedDate);
        }
    }
    get type() {
        if (this.fallbackActive) {
            return this.datepicker.config.fallback;
        }
        return "text";
    }
    get max() {
        if (this.fallbackActive && this.datepicker.maxDate) {
            // Since HTML doesn't use a date object max is somewhat tricky.
            // Our Datepicker will always choose the 1st date on the provided precision,
            // meaning anything below the maxDate will work, hence endOf.
            const max = DateUtil.endOf(this.datepicker.config.precision, DateUtil.clone(this.datepicker.maxDate));
            return this.parser.format(max);
        }
    }
    get min() {
        if (this.fallbackActive && this.datepicker.minDate) {
            // Since HTML doesn't use a date object min is somewhat tricky.
            // We use 1 minute before the next date at the configured precision since
            // our Datepicker picks the first available date at that precision.
            const min = DateUtil.clone(this.datepicker.minDate);
            return this.parser.format(min);
        }
    }
    updateValue(value) {
        // Only update the current value if it is different to what it's being updated to.
        // This is so that the editing position isn't changed when manually typing the date.
        if (!this._lastUpdateTyped) {
            this.datepicker.renderer.setProperty(this.element.nativeElement, "value", value || "");
        }
        this._lastUpdateTyped = false;
    }
    typeValue(value) {
        this._lastUpdateTyped = true;
        this._currentInputValue = value;
        if (!value) {
            // Delete the selected date if no date was entered manually.
            return this.datepicker.writeValue(undefined);
        }
        const parsed = this.parser.parse(value, this.datepicker.selectedDate);
        if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
            return this.datepicker.writeValue(parsed);
        }
        return this.datepicker.writeValue(undefined);
    }
    onFocusOut() {
        this.valueAccessor.onTouched();
    }
};
SuiDatepickerInputDirective.ctorParameters = () => [
    { type: SuiDatepickerDirective, decorators: [{ type: Host }] },
    { type: SuiDatepickerDirectiveValueAccessor, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: SuiLocalizationService }
];
tslib_1.__decorate([
    Input("pickerUseNativeOnMobile")
], SuiDatepickerInputDirective.prototype, "useNativeOnMobile", null);
tslib_1.__decorate([
    HostBinding("attr.type")
], SuiDatepickerInputDirective.prototype, "type", null);
tslib_1.__decorate([
    HostBinding("attr.max")
], SuiDatepickerInputDirective.prototype, "max", null);
tslib_1.__decorate([
    HostBinding("attr.min")
], SuiDatepickerInputDirective.prototype, "min", null);
tslib_1.__decorate([
    HostListener("input", ["$event.target.value"])
], SuiDatepickerInputDirective.prototype, "typeValue", null);
tslib_1.__decorate([
    HostListener("focusout")
], SuiDatepickerInputDirective.prototype, "onFocusOut", null);
SuiDatepickerInputDirective = tslib_1.__decorate([
    Directive({
        selector: "input[suiDatepicker]"
    }),
    tslib_1.__param(0, Host()),
    tslib_1.__param(1, Host())
], SuiDatepickerInputDirective);
export { SuiDatepickerInputDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL2RpcmVjdGl2ZXMvaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFFBQVEsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLG1DQUFtQyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxLQUFLLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDN0MsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQVcsQ0FBQztBQUt4RCxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQTBFcEMsWUFBMkIsVUFBaUMsRUFDakMsYUFBaUQsRUFDekQsT0FBa0IsRUFDekIsbUJBQTBDO1FBSDNCLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFvQztRQUN6RCxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBRWpDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFF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Q2xFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFHTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0NBQ0osQ0FBQTs7WUE5Q3lDLHNCQUFzQix1QkFBL0MsSUFBSTtZQUN3QixtQ0FBbUMsdUJBQS9ELElBQUk7WUFDVSxVQUFVO1lBQ0wsc0JBQXNCOztBQXpFdEQ7SUFEQyxLQUFLLENBQUMseUJBQXlCLENBQUM7b0VBR2hDO0FBdUNEO0lBREMsV0FBVyxDQUFDLFdBQVcsQ0FBQzt1REFNeEI7QUFHRDtJQURDLFdBQVcsQ0FBQyxVQUFVLENBQUM7c0RBU3ZCO0FBR0Q7SUFEQyxXQUFXLENBQUMsVUFBVSxDQUFDO3NEQVN2QjtBQTRCRDtJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzREQWU5QztBQUdEO0lBREMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs2REFHeEI7QUF2SFEsMkJBQTJCO0lBSHZDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxzQkFBc0I7S0FDbkMsQ0FBQztJQTJFZSxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtJQUNOLG1CQUFBLElBQUksRUFBRSxDQUFBO0dBM0VWLDJCQUEyQixDQXdIdkM7U0F4SFksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERhdGVVdGlsLCBEYXRlUHJlY2lzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBQb3B1cFRyaWdnZXIgfSBmcm9tIFwiLi4vLi4vcG9wdXAvaW5kZXhcIjtcbmltcG9ydCB7IFN1aURhdGVwaWNrZXJEaXJlY3RpdmUsIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vZGF0ZXBpY2tlci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IEludGVybmFsRGF0ZVBhcnNlciwgRGF0ZVBhcnNlciB9IGZyb20gXCIuLi9jbGFzc2VzL2RhdGUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBib3dzZXIgZnJvbSBcImJvd3NlclwiO1xuXG5pbXBvcnQgXCIuLi9oZWxwZXJzL2lzLXdlYnZpZXdcIjtcbmltcG9ydCAqIGFzIGlzVUFXZWJWaWV3IGZyb20gXCJpcy11YS13ZWJ2aWV3XCI7XG5jb25zdCBpc1dlYlZpZXcgPSBpc1VBV2ViVmlld1tcImRlZmF1bHRcIl0gfHwgaXNVQVdlYlZpZXc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlucHV0W3N1aURhdGVwaWNrZXJdXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlIHtcbiAgICBwcml2YXRlIF91c2VOYXRpdmVPbk1vYmlsZTpib29sZWFuO1xuXG4gICAgQElucHV0KFwicGlja2VyVXNlTmF0aXZlT25Nb2JpbGVcIilcbiAgICBwdWJsaWMgZ2V0IHVzZU5hdGl2ZU9uTW9iaWxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VOYXRpdmVPbk1vYmlsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHVzZU5hdGl2ZU9uTW9iaWxlKGZhbGxiYWNrOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdXNlTmF0aXZlT25Nb2JpbGUgPSBmYWxsYmFjaztcbiAgICAgICAgY29uc3QgaXNPbk1vYmlsZSA9IGJvd3Nlci5tb2JpbGUgfHwgYm93c2VyLnRhYmxldCB8fCBpc1dlYlZpZXcobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tBY3RpdmUgPSB0aGlzLnVzZU5hdGl2ZU9uTW9iaWxlICYmIGlzT25Nb2JpbGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tBY3RpdmU6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBnZXQgZmFsbGJhY2tBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrQWN0aXZlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZmFsbGJhY2tBY3RpdmUoYWN0aXZlOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZmFsbGJhY2tBY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIC8vIElmIHRoZSBmYWxsYmFjayBpcyBhY3RpdmUsIHRoZW4gdGhlIHRyaWdnZXIgbXVzdCBiZSBtYW51YWwgc28gdGhlIGRhdGVwaWNrZXIgbmV2ZXIgb3BlbnMuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5wb3B1cC5jb25maWcudHJpZ2dlciA9IHRoaXMuZmFsbGJhY2tBY3RpdmUgPyBQb3B1cFRyaWdnZXIuTWFudWFsIDogUG9wdXBUcmlnZ2VyLkZvY3VzO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGlucHV0IHZhbHVlICh0aGlzIHdpbGwgaW5zZXJ0IHRoZSBgVGAgYXMgcmVxdWlyZWQpLlxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBhcnNlcigpOkRhdGVQYXJzZXIge1xuICAgICAgICBpZiAodGhpcy5mYWxsYmFja0FjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbERhdGVQYXJzZXIodGhpcy5kYXRlcGlja2VyLm1vZGUsIHRoaXMuZGF0ZXBpY2tlci5sb2NhbGVWYWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVBhcnNlcih0aGlzLmRhdGVwaWNrZXIubG9jYWxlVmFsdWVzLmZvcm1hdHNbdGhpcy5kYXRlcGlja2VyLm1vZGVdLCB0aGlzLmRhdGVwaWNrZXIubG9jYWxlVmFsdWVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jdXJyZW50SW5wdXRWYWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBfbGFzdFVwZGF0ZVR5cGVkOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkRGF0ZVN0cmluZygpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIuZm9ybWF0KHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZERhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci50eXBlXCIpXG4gICAgcHVibGljIGdldCB0eXBlKCk6c3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuZmFsbGJhY2tBY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXIuY29uZmlnLmZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLm1heFwiKVxuICAgIHB1YmxpYyBnZXQgbWF4KCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuZmFsbGJhY2tBY3RpdmUgJiYgdGhpcy5kYXRlcGlja2VyLm1heERhdGUpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIEhUTUwgZG9lc24ndCB1c2UgYSBkYXRlIG9iamVjdCBtYXggaXMgc29tZXdoYXQgdHJpY2t5LlxuICAgICAgICAgICAgLy8gT3VyIERhdGVwaWNrZXIgd2lsbCBhbHdheXMgY2hvb3NlIHRoZSAxc3QgZGF0ZSBvbiB0aGUgcHJvdmlkZWQgcHJlY2lzaW9uLFxuICAgICAgICAgICAgLy8gbWVhbmluZyBhbnl0aGluZyBiZWxvdyB0aGUgbWF4RGF0ZSB3aWxsIHdvcmssIGhlbmNlIGVuZE9mLlxuICAgICAgICAgICAgY29uc3QgbWF4ID0gRGF0ZVV0aWwuZW5kT2YodGhpcy5kYXRlcGlja2VyLmNvbmZpZy5wcmVjaXNpb24sIERhdGVVdGlsLmNsb25lKHRoaXMuZGF0ZXBpY2tlci5tYXhEYXRlKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIuZm9ybWF0KG1heCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLm1pblwiKVxuICAgIHB1YmxpYyBnZXQgbWluKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuZmFsbGJhY2tBY3RpdmUgJiYgdGhpcy5kYXRlcGlja2VyLm1pbkRhdGUpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIEhUTUwgZG9lc24ndCB1c2UgYSBkYXRlIG9iamVjdCBtaW4gaXMgc29tZXdoYXQgdHJpY2t5LlxuICAgICAgICAgICAgLy8gV2UgdXNlIDEgbWludXRlIGJlZm9yZSB0aGUgbmV4dCBkYXRlIGF0IHRoZSBjb25maWd1cmVkIHByZWNpc2lvbiBzaW5jZVxuICAgICAgICAgICAgLy8gb3VyIERhdGVwaWNrZXIgcGlja3MgdGhlIGZpcnN0IGF2YWlsYWJsZSBkYXRlIGF0IHRoYXQgcHJlY2lzaW9uLlxuICAgICAgICAgICAgY29uc3QgbWluID0gRGF0ZVV0aWwuY2xvbmUodGhpcy5kYXRlcGlja2VyLm1pbkRhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VyLmZvcm1hdChtaW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEhvc3QoKSBwdWJsaWMgZGF0ZXBpY2tlcjpTdWlEYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICAgICAgICAgIEBIb3N0KCkgcHVibGljIHZhbHVlQWNjZXNzb3I6U3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbHVlQWNjZXNzb3IsXG4gICAgICAgICAgICAgICAgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBsb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy51c2VOYXRpdmVPbk1vYmlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBXaGVuZXZlciB0aGUgZGF0ZXBpY2tlciB2YWx1ZSB1cGRhdGVzLCB1cGRhdGUgdGhlIGlucHV0IHRleHQgYWxvbmdzaWRlIGl0LlxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIub25TZWxlY3RlZERhdGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nKSk7XG5cbiAgICAgICAgbG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLnNlbGVjdGVkRGF0ZVN0cmluZykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUodmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkKTp2b2lkIHtcbiAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIGN1cnJlbnQgdmFsdWUgaWYgaXQgaXMgZGlmZmVyZW50IHRvIHdoYXQgaXQncyBiZWluZyB1cGRhdGVkIHRvLlxuICAgICAgICAvLyBUaGlzIGlzIHNvIHRoYXQgdGhlIGVkaXRpbmcgcG9zaXRpb24gaXNuJ3QgY2hhbmdlZCB3aGVuIG1hbnVhbGx5IHR5cGluZyB0aGUgZGF0ZS5cbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0VXBkYXRlVHlwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ2YWx1ZVwiLCB2YWx1ZSB8fCBcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGVUeXBlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJpbnB1dFwiLCBbXCIkZXZlbnQudGFyZ2V0LnZhbHVlXCJdKVxuICAgIHB1YmxpYyB0eXBlVmFsdWUodmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVR5cGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY3VycmVudElucHV0VmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgdGhlIHNlbGVjdGVkIGRhdGUgaWYgbm8gZGF0ZSB3YXMgZW50ZXJlZCBtYW51YWxseS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXIud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5wYXJzZXIucGFyc2UodmFsdWUsIHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZERhdGUpO1xuICAgICAgICBpZiAoIWlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpICYmIHZhbHVlID09PSB0aGlzLnBhcnNlci5mb3JtYXQocGFyc2VkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlci53cml0ZVZhbHVlKHBhcnNlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlci53cml0ZVZhbHVlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIpXG4gICAgcHVibGljIG9uRm9jdXNPdXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yLm9uVG91Y2hlZCgpO1xuICAgIH1cbn1cbiJdfQ==