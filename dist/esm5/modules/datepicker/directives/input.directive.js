import * as tslib_1 from "tslib";
import { Directive, Host, Input, ElementRef, HostBinding, HostListener } from "@angular/core";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor } from "./datepicker.directive";
import { InternalDateParser, DateParser } from "../classes/date-parser";
import * as bowser from "bowser";
import "../helpers/is-webview";
import * as isUAWebView from "is-ua-webview";
import { DateUtil } from "../../../misc/util/helpers/date";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
import { PopupTrigger } from "../../../modules/popup/classes/popup-config";
var isWebView = isUAWebView["default"] || isUAWebView;
var SuiDatepickerInputDirective = /** @class */ (function () {
    function SuiDatepickerInputDirective(datepicker, valueAccessor, element, _localizationService) {
        var _this = this;
        this.datepicker = datepicker;
        this.valueAccessor = valueAccessor;
        this.element = element;
        this._localizationService = _localizationService;
        this.useNativeOnMobile = true;
        this.fallbackActive = false;
        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
        _localizationService.onLanguageUpdate.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
    }
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "useNativeOnMobile", {
        get: function () {
            return this._useNativeOnMobile;
        },
        set: function (fallback) {
            this._useNativeOnMobile = fallback;
            var isOnMobile = bowser.mobile || bowser.tablet || isWebView(navigator.userAgent);
            this.fallbackActive = this.useNativeOnMobile && isOnMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "fallbackActive", {
        get: function () {
            return this._fallbackActive;
        },
        set: function (active) {
            this._fallbackActive = active;
            // If the fallback is active, then the trigger must be manual so the datepicker never opens.
            this.datepicker.popup.config.trigger = this.fallbackActive
                ? PopupTrigger.Manual
                : PopupTrigger.Focus;
            // Update the input value (this will insert the `T` as required).
            this.updateValue(this.selectedDateString);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "parser", {
        get: function () {
            if (this.fallbackActive) {
                return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
            }
            return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "selectedDateString", {
        get: function () {
            if (this.datepicker.selectedDate) {
                return this.parser.format(this.datepicker.selectedDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "type", {
        get: function () {
            if (this.fallbackActive) {
                return this.datepicker.config.fallback;
            }
            return "text";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "max", {
        get: function () {
            if (this.fallbackActive && this.datepicker.maxDate) {
                // Since HTML doesn't use a date object max is somewhat tricky.
                // Our Datepicker will always choose the 1st date on the provided precision,
                // meaning anything below the maxDate will work, hence endOf.
                var max = DateUtil.endOf(this.datepicker.config.precision, DateUtil.clone(this.datepicker.maxDate));
                return this.parser.format(max);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "min", {
        get: function () {
            if (this.fallbackActive && this.datepicker.minDate) {
                // Since HTML doesn't use a date object min is somewhat tricky.
                // We use 1 minute before the next date at the configured precision since
                // our Datepicker picks the first available date at that precision.
                var min = DateUtil.clone(this.datepicker.minDate);
                return this.parser.format(min);
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiDatepickerInputDirective.prototype.updateValue = function (value) {
        // Only update the current value if it is different to what it's being updated to.
        // This is so that the editing position isn't changed when manually typing the date.
        if (!this._lastUpdateTyped) {
            this.datepicker.setRendererValue(this.element.nativeElement, value);
        }
        this._lastUpdateTyped = false;
    };
    SuiDatepickerInputDirective.prototype.typeValue = function (value) {
        this._lastUpdateTyped = true;
        this._currentInputValue = value;
        if (!value) {
            // Delete the selected date if no date was entered manually.
            return this.datepicker.writeValue(undefined);
        }
        var parsed = this.parser.parse(value, this.datepicker.selectedDate);
        if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
            return this.datepicker.writeValue(parsed);
        }
        return this.datepicker.writeValue(undefined);
    };
    SuiDatepickerInputDirective.prototype.onFocusOut = function () {
        this.valueAccessor.onTouched();
    };
    SuiDatepickerInputDirective.ctorParameters = function () { return [
        { type: SuiDatepickerDirective, decorators: [{ type: Host }] },
        { type: SuiDatepickerDirectiveValueAccessor, decorators: [{ type: Host }] },
        { type: ElementRef },
        { type: SuiLocalizationService }
    ]; };
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
    return SuiDatepickerInputDirective;
}());
export { SuiDatepickerInputDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL2RpcmVjdGl2ZXMvaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULElBQUksRUFDSixLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILHNCQUFzQixFQUN0QixtQ0FBbUMsRUFDdEMsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFakMsT0FBTyx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEtBQUssV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdkcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzNFLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxXQUFXLENBQUM7QUFLeEQ7SUFzRkkscUNBQ21CLFVBQWlDLEVBQ2pDLGFBQWlELEVBQ3pELE9BQWtCLEVBQ2pCLG9CQUEyQztRQUp2RCxpQkFpQkM7UUFoQmtCLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFvQztRQUN6RCxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7UUFFbkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxH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LENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdNLGdEQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztnQkFoRDZCLHNCQUFzQix1QkFBL0MsSUFBSTtnQkFDd0IsbUNBQW1DLHVCQUEvRCxJQUFJO2dCQUNVLFVBQVU7Z0JBQ0ksc0JBQXNCOztJQXRGdkQ7UUFEQyxLQUFLLENBQUMseUJBQXlCLENBQUM7d0VBR2hDO0lBZ0REO1FBREMsV0FBVyxDQUFDLFdBQVcsQ0FBQzsyREFNeEI7SUFHRDtRQURDLFdBQVcsQ0FBQyxVQUFVLENBQUM7MERBWXZCO0lBR0Q7UUFEQyxXQUFXLENBQUMsVUFBVSxDQUFDOzBEQVN2QjtJQWdDRDtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dFQWU5QztJQUdEO1FBREMsWUFBWSxDQUFDLFVBQVUsQ0FBQztpRUFHeEI7SUF2SVEsMkJBQTJCO1FBSHZDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7U0FDbkMsQ0FBQztRQXdGTyxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtRQUNOLG1CQUFBLElBQUksRUFBRSxDQUFBO09BeEZGLDJCQUEyQixDQXdJdkM7SUFBRCxrQ0FBQztDQUFBLEFBeElELElBd0lDO1NBeElZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEhvc3QsXG4gICAgSW5wdXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvclxufSBmcm9tIFwiLi9kYXRlcGlja2VyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgSW50ZXJuYWxEYXRlUGFyc2VyLCBEYXRlUGFyc2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvZGF0ZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIGJvd3NlciBmcm9tIFwiYm93c2VyXCI7XG5cbmltcG9ydCBcIi4uL2hlbHBlcnMvaXMtd2Vidmlld1wiO1xuaW1wb3J0ICogYXMgaXNVQVdlYlZpZXcgZnJvbSBcImlzLXVhLXdlYnZpZXdcIjtcbmltcG9ydCB7IERhdGVVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2RhdGVcIjtcbmltcG9ydCB7IFN1aUxvY2FsaXphdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9zZXJ2aWNlcy9sb2NhbGl6YXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgUG9wdXBUcmlnZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvcG9wdXAvY2xhc3Nlcy9wb3B1cC1jb25maWdcIjtcbmNvbnN0IGlzV2ViVmlldyA9IGlzVUFXZWJWaWV3W1wiZGVmYXVsdFwiXSB8fCBpc1VBV2ViVmlldztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW5wdXRbc3VpRGF0ZXBpY2tlcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VySW5wdXREaXJlY3RpdmUge1xuICAgIHByaXZhdGUgX3VzZU5hdGl2ZU9uTW9iaWxlOmJvb2xlYW47XG5cbiAgICBASW5wdXQoXCJwaWNrZXJVc2VOYXRpdmVPbk1vYmlsZVwiKVxuICAgIHB1YmxpYyBnZXQgdXNlTmF0aXZlT25Nb2JpbGUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZU5hdGl2ZU9uTW9iaWxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdXNlTmF0aXZlT25Nb2JpbGUoZmFsbGJhY2s6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VOYXRpdmVPbk1vYmlsZSA9IGZhbGxiYWNrO1xuICAgICAgICBjb25zdCBpc09uTW9iaWxlID1cbiAgICAgICAgICAgIGJvd3Nlci5tb2JpbGUgfHwgYm93c2VyLnRhYmxldCB8fCBpc1dlYlZpZXcobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tBY3RpdmUgPSB0aGlzLnVzZU5hdGl2ZU9uTW9iaWxlICYmIGlzT25Nb2JpbGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmFsbGJhY2tBY3RpdmU6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBnZXQgZmFsbGJhY2tBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrQWN0aXZlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZmFsbGJhY2tBY3RpdmUoYWN0aXZlOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZmFsbGJhY2tBY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIC8vIElmIHRoZSBmYWxsYmFjayBpcyBhY3RpdmUsIHRoZW4gdGhlIHRyaWdnZXIgbXVzdCBiZSBtYW51YWwgc28gdGhlIGRhdGVwaWNrZXIgbmV2ZXIgb3BlbnMuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5wb3B1cC5jb25maWcudHJpZ2dlciA9IHRoaXMuZmFsbGJhY2tBY3RpdmVcbiAgICAgICAgICAgID8gUG9wdXBUcmlnZ2VyLk1hbnVhbFxuICAgICAgICAgICAgOiBQb3B1cFRyaWdnZXIuRm9jdXM7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5wdXQgdmFsdWUgKHRoaXMgd2lsbCBpbnNlcnQgdGhlIGBUYCBhcyByZXF1aXJlZCkuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5zZWxlY3RlZERhdGVTdHJpbmcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcGFyc2VyKCk6RGF0ZVBhcnNlciB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxiYWNrQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEludGVybmFsRGF0ZVBhcnNlcihcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIubW9kZSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIubG9jYWxlVmFsdWVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVBhcnNlcihcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5sb2NhbGVWYWx1ZXMuZm9ybWF0c1t0aGlzLmRhdGVwaWNrZXIubW9kZV0sXG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIubG9jYWxlVmFsdWVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3VycmVudElucHV0VmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgX2xhc3RVcGRhdGVUeXBlZDpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZERhdGVTdHJpbmcoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VyLmZvcm1hdCh0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIudHlwZVwiKVxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOnN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxiYWNrQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLmNvbmZpZy5mYWxsYmFjaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJ0ZXh0XCI7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci5tYXhcIilcbiAgICBwdWJsaWMgZ2V0IG1heCgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxiYWNrQWN0aXZlICYmIHRoaXMuZGF0ZXBpY2tlci5tYXhEYXRlKSB7XG4gICAgICAgICAgICAvLyBTaW5jZSBIVE1MIGRvZXNuJ3QgdXNlIGEgZGF0ZSBvYmplY3QgbWF4IGlzIHNvbWV3aGF0IHRyaWNreS5cbiAgICAgICAgICAgIC8vIE91ciBEYXRlcGlja2VyIHdpbGwgYWx3YXlzIGNob29zZSB0aGUgMXN0IGRhdGUgb24gdGhlIHByb3ZpZGVkIHByZWNpc2lvbixcbiAgICAgICAgICAgIC8vIG1lYW5pbmcgYW55dGhpbmcgYmVsb3cgdGhlIG1heERhdGUgd2lsbCB3b3JrLCBoZW5jZSBlbmRPZi5cbiAgICAgICAgICAgIGNvbnN0IG1heCA9IERhdGVVdGlsLmVuZE9mKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5jb25maWcucHJlY2lzaW9uLFxuICAgICAgICAgICAgICAgIERhdGVVdGlsLmNsb25lKHRoaXMuZGF0ZXBpY2tlci5tYXhEYXRlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlci5mb3JtYXQobWF4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIubWluXCIpXG4gICAgcHVibGljIGdldCBtaW4oKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5mYWxsYmFja0FjdGl2ZSAmJiB0aGlzLmRhdGVwaWNrZXIubWluRGF0ZSkge1xuICAgICAgICAgICAgLy8gU2luY2UgSFRNTCBkb2Vzbid0IHVzZSBhIGRhdGUgb2JqZWN0IG1pbiBpcyBzb21ld2hhdCB0cmlja3kuXG4gICAgICAgICAgICAvLyBXZSB1c2UgMSBtaW51dGUgYmVmb3JlIHRoZSBuZXh0IGRhdGUgYXQgdGhlIGNvbmZpZ3VyZWQgcHJlY2lzaW9uIHNpbmNlXG4gICAgICAgICAgICAvLyBvdXIgRGF0ZXBpY2tlciBwaWNrcyB0aGUgZmlyc3QgYXZhaWxhYmxlIGRhdGUgYXQgdGhhdCBwcmVjaXNpb24uXG4gICAgICAgICAgICBjb25zdCBtaW4gPSBEYXRlVXRpbC5jbG9uZSh0aGlzLmRhdGVwaWNrZXIubWluRGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIuZm9ybWF0KG1pbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEhvc3QoKSBwdWJsaWMgZGF0ZXBpY2tlcjpTdWlEYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBASG9zdCgpIHB1YmxpYyB2YWx1ZUFjY2Vzc29yOlN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWx1ZUFjY2Vzc29yLFxuICAgICAgICBwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9sb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy51c2VOYXRpdmVPbk1vYmlsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBXaGVuZXZlciB0aGUgZGF0ZXBpY2tlciB2YWx1ZSB1cGRhdGVzLCB1cGRhdGUgdGhlIGlucHV0IHRleHQgYWxvbmdzaWRlIGl0LlxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIub25TZWxlY3RlZERhdGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nKVxuICAgICAgICApO1xuXG4gICAgICAgIF9sb2NhbGl6YXRpb25TZXJ2aWNlLm9uTGFuZ3VhZ2VVcGRhdGUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUodmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkKTp2b2lkIHtcbiAgICAgICAgLy8gT25seSB1cGRhdGUgdGhlIGN1cnJlbnQgdmFsdWUgaWYgaXQgaXMgZGlmZmVyZW50IHRvIHdoYXQgaXQncyBiZWluZyB1cGRhdGVkIHRvLlxuICAgICAgICAvLyBUaGlzIGlzIHNvIHRoYXQgdGhlIGVkaXRpbmcgcG9zaXRpb24gaXNuJ3QgY2hhbmdlZCB3aGVuIG1hbnVhbGx5IHR5cGluZyB0aGUgZGF0ZS5cbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0VXBkYXRlVHlwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZXRSZW5kZXJlclZhbHVlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0VXBkYXRlVHlwZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiaW5wdXRcIiwgW1wiJGV2ZW50LnRhcmdldC52YWx1ZVwiXSlcbiAgICBwdWJsaWMgdHlwZVZhbHVlKHZhbHVlOnN0cmluZyB8IHVuZGVmaW5lZCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGVUeXBlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRJbnB1dFZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBzZWxlY3RlZCBkYXRlIGlmIG5vIGRhdGUgd2FzIGVudGVyZWQgbWFudWFsbHkuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLndyaXRlVmFsdWUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMucGFyc2VyLnBhcnNlKHZhbHVlLCB0aGlzLmRhdGVwaWNrZXIuc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgaWYgKCFpc05hTihwYXJzZWQuZ2V0VGltZSgpKSAmJiB2YWx1ZSA9PT0gdGhpcy5wYXJzZXIuZm9ybWF0KHBhcnNlZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXIud3JpdGVWYWx1ZShwYXJzZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXIud3JpdGVWYWx1ZSh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVBY2Nlc3Nvci5vblRvdWNoZWQoKTtcbiAgICB9XG59XG4iXX0=