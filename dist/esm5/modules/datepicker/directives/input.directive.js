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
var isWebView = isUAWebView["default"] || isUAWebView;
var SuiDatepickerInputDirective = /** @class */ (function () {
    function SuiDatepickerInputDirective(datepicker, valueAccessor, element, localizationService) {
        var _this = this;
        this.datepicker = datepicker;
        this.valueAccessor = valueAccessor;
        this.element = element;
        this.useNativeOnMobile = true;
        this.fallbackActive = false;
        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
        localizationService.onLanguageUpdate.subscribe(function () {
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
            this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
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
            this.datepicker.renderer.setProperty(this.element.nativeElement, "value", value || "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL2RpcmVjdGl2ZXMvaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFFBQVEsRUFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLG1DQUFtQyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxLQUFLLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDN0MsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQVcsQ0FBQztBQUt4RDtJQTBFSSxxQ0FBMkIsVUFBaUMsRUFDakMsYUFBaUQsRUFDekQsT0FBa0IsRUFDekIsbUJBQTBDO1FBSHRELGlCQWFDO1FBYjBCLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFvQztRQUN6RCxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBRWpDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFFNUIsNkVBQTZFO1FBQzdFLElB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Q0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFHTSxnREFBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Z0JBN0NxQyxzQkFBc0IsdUJBQS9DLElBQUk7Z0JBQ3dCLG1DQUFtQyx1QkFBL0QsSUFBSTtnQkFDVSxVQUFVO2dCQUNMLHNCQUFzQjs7SUF6RXREO1FBREMsS0FBSyxDQUFDLHlCQUF5QixDQUFDO3dFQUdoQztJQXVDRDtRQURDLFdBQVcsQ0FBQyxXQUFXLENBQUM7MkRBTXhCO0lBR0Q7UUFEQyxXQUFXLENBQUMsVUFBVSxDQUFDOzBEQVN2QjtJQUdEO1FBREMsV0FBVyxDQUFDLFVBQVUsQ0FBQzswREFTdkI7SUE0QkQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQztnRUFlOUM7SUFHRDtRQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7aUVBR3hCO0lBdkhRLDJCQUEyQjtRQUh2QyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1NBQ25DLENBQUM7UUEyRWUsbUJBQUEsSUFBSSxFQUFFLENBQUE7UUFDTixtQkFBQSxJQUFJLEVBQUUsQ0FBQTtPQTNFViwyQkFBMkIsQ0F3SHZDO0lBQUQsa0NBQUM7Q0FBQSxBQXhIRCxJQXdIQztTQXhIWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIERhdGVQcmVjaXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFBvcHVwVHJpZ2dlciB9IGZyb20gXCIuLi8uLi9wb3B1cC9pbmRleFwiO1xuaW1wb3J0IHsgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSwgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbHVlQWNjZXNzb3IgfSBmcm9tIFwiLi9kYXRlcGlja2VyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgSW50ZXJuYWxEYXRlUGFyc2VyLCBEYXRlUGFyc2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvZGF0ZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIGJvd3NlciBmcm9tIFwiYm93c2VyXCI7XG5cbmltcG9ydCBcIi4uL2hlbHBlcnMvaXMtd2Vidmlld1wiO1xuaW1wb3J0ICogYXMgaXNVQVdlYlZpZXcgZnJvbSBcImlzLXVhLXdlYnZpZXdcIjtcbmNvbnN0IGlzV2ViVmlldyA9IGlzVUFXZWJWaWV3W1wiZGVmYXVsdFwiXSB8fCBpc1VBV2ViVmlldztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW5wdXRbc3VpRGF0ZXBpY2tlcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VySW5wdXREaXJlY3RpdmUge1xuICAgIHByaXZhdGUgX3VzZU5hdGl2ZU9uTW9iaWxlOmJvb2xlYW47XG5cbiAgICBASW5wdXQoXCJwaWNrZXJVc2VOYXRpdmVPbk1vYmlsZVwiKVxuICAgIHB1YmxpYyBnZXQgdXNlTmF0aXZlT25Nb2JpbGUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZU5hdGl2ZU9uTW9iaWxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdXNlTmF0aXZlT25Nb2JpbGUoZmFsbGJhY2s6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VOYXRpdmVPbk1vYmlsZSA9IGZhbGxiYWNrO1xuICAgICAgICBjb25zdCBpc09uTW9iaWxlID0gYm93c2VyLm1vYmlsZSB8fCBib3dzZXIudGFibGV0IHx8IGlzV2ViVmlldyhuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgdGhpcy5mYWxsYmFja0FjdGl2ZSA9IHRoaXMudXNlTmF0aXZlT25Nb2JpbGUgJiYgaXNPbk1vYmlsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mYWxsYmFja0FjdGl2ZTpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBmYWxsYmFja0FjdGl2ZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFsbGJhY2tBY3RpdmU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBmYWxsYmFja0FjdGl2ZShhY3RpdmU6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl9mYWxsYmFja0FjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgLy8gSWYgdGhlIGZhbGxiYWNrIGlzIGFjdGl2ZSwgdGhlbiB0aGUgdHJpZ2dlciBtdXN0IGJlIG1hbnVhbCBzbyB0aGUgZGF0ZXBpY2tlciBuZXZlciBvcGVucy5cbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLnBvcHVwLmNvbmZpZy50cmlnZ2VyID0gdGhpcy5mYWxsYmFja0FjdGl2ZSA/IFBvcHVwVHJpZ2dlci5NYW51YWwgOiBQb3B1cFRyaWdnZXIuRm9jdXM7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5wdXQgdmFsdWUgKHRoaXMgd2lsbCBpbnNlcnQgdGhlIGBUYCBhcyByZXF1aXJlZCkuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5zZWxlY3RlZERhdGVTdHJpbmcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcGFyc2VyKCk6RGF0ZVBhcnNlciB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxiYWNrQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEludGVybmFsRGF0ZVBhcnNlcih0aGlzLmRhdGVwaWNrZXIubW9kZSwgdGhpcy5kYXRlcGlja2VyLmxvY2FsZVZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGFyc2VyKHRoaXMuZGF0ZXBpY2tlci5sb2NhbGVWYWx1ZXMuZm9ybWF0c1t0aGlzLmRhdGVwaWNrZXIubW9kZV0sIHRoaXMuZGF0ZXBpY2tlci5sb2NhbGVWYWx1ZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2N1cnJlbnRJbnB1dFZhbHVlOnN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9sYXN0VXBkYXRlVHlwZWQ6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWREYXRlU3RyaW5nKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZXBpY2tlci5zZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlci5mb3JtYXQodGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLnR5cGVcIilcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTpzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5mYWxsYmFja0FjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlci5jb25maWcuZmFsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIubWF4XCIpXG4gICAgcHVibGljIGdldCBtYXgoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5mYWxsYmFja0FjdGl2ZSAmJiB0aGlzLmRhdGVwaWNrZXIubWF4RGF0ZSkge1xuICAgICAgICAgICAgLy8gU2luY2UgSFRNTCBkb2Vzbid0IHVzZSBhIGRhdGUgb2JqZWN0IG1heCBpcyBzb21ld2hhdCB0cmlja3kuXG4gICAgICAgICAgICAvLyBPdXIgRGF0ZXBpY2tlciB3aWxsIGFsd2F5cyBjaG9vc2UgdGhlIDFzdCBkYXRlIG9uIHRoZSBwcm92aWRlZCBwcmVjaXNpb24sXG4gICAgICAgICAgICAvLyBtZWFuaW5nIGFueXRoaW5nIGJlbG93IHRoZSBtYXhEYXRlIHdpbGwgd29yaywgaGVuY2UgZW5kT2YuXG4gICAgICAgICAgICBjb25zdCBtYXggPSBEYXRlVXRpbC5lbmRPZih0aGlzLmRhdGVwaWNrZXIuY29uZmlnLnByZWNpc2lvbiwgRGF0ZVV0aWwuY2xvbmUodGhpcy5kYXRlcGlja2VyLm1heERhdGUpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlci5mb3JtYXQobWF4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIubWluXCIpXG4gICAgcHVibGljIGdldCBtaW4oKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5mYWxsYmFja0FjdGl2ZSAmJiB0aGlzLmRhdGVwaWNrZXIubWluRGF0ZSkge1xuICAgICAgICAgICAgLy8gU2luY2UgSFRNTCBkb2Vzbid0IHVzZSBhIGRhdGUgb2JqZWN0IG1pbiBpcyBzb21ld2hhdCB0cmlja3kuXG4gICAgICAgICAgICAvLyBXZSB1c2UgMSBtaW51dGUgYmVmb3JlIHRoZSBuZXh0IGRhdGUgYXQgdGhlIGNvbmZpZ3VyZWQgcHJlY2lzaW9uIHNpbmNlXG4gICAgICAgICAgICAvLyBvdXIgRGF0ZXBpY2tlciBwaWNrcyB0aGUgZmlyc3QgYXZhaWxhYmxlIGRhdGUgYXQgdGhhdCBwcmVjaXNpb24uXG4gICAgICAgICAgICBjb25zdCBtaW4gPSBEYXRlVXRpbC5jbG9uZSh0aGlzLmRhdGVwaWNrZXIubWluRGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIuZm9ybWF0KG1pbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASG9zdCgpIHB1YmxpYyBkYXRlcGlja2VyOlN1aURhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgICAgICAgICAgQEhvc3QoKSBwdWJsaWMgdmFsdWVBY2Nlc3NvcjpTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIGxvY2FsaXphdGlvblNlcnZpY2U6U3VpTG9jYWxpemF0aW9uU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZU5hdGl2ZU9uTW9iaWxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mYWxsYmFja0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFdoZW5ldmVyIHRoZSBkYXRlcGlja2VyIHZhbHVlIHVwZGF0ZXMsIHVwZGF0ZSB0aGUgaW5wdXQgdGV4dCBhbG9uZ3NpZGUgaXQuXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5vblNlbGVjdGVkRGF0ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5zZWxlY3RlZERhdGVTdHJpbmcpKTtcblxuICAgICAgICBsb2NhbGl6YXRpb25TZXJ2aWNlLm9uTGFuZ3VhZ2VVcGRhdGUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSh2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQpOnZvaWQge1xuICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgY3VycmVudCB2YWx1ZSBpZiBpdCBpcyBkaWZmZXJlbnQgdG8gd2hhdCBpdCdzIGJlaW5nIHVwZGF0ZWQgdG8uXG4gICAgICAgIC8vIFRoaXMgaXMgc28gdGhhdCB0aGUgZWRpdGluZyBwb3NpdGlvbiBpc24ndCBjaGFuZ2VkIHdoZW4gbWFudWFsbHkgdHlwaW5nIHRoZSBkYXRlLlxuICAgICAgICBpZiAoIXRoaXMuX2xhc3RVcGRhdGVUeXBlZCkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcInZhbHVlXCIsIHZhbHVlIHx8IFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZVR5cGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImlucHV0XCIsIFtcIiRldmVudC50YXJnZXQudmFsdWVcIl0pXG4gICAgcHVibGljIHR5cGVWYWx1ZSh2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQpOnZvaWQge1xuICAgICAgICB0aGlzLl9sYXN0VXBkYXRlVHlwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jdXJyZW50SW5wdXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgc2VsZWN0ZWQgZGF0ZSBpZiBubyBkYXRlIHdhcyBlbnRlcmVkIG1hbnVhbGx5LlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZXBpY2tlci53cml0ZVZhbHVlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLnBhcnNlci5wYXJzZSh2YWx1ZSwgdGhpcy5kYXRlcGlja2VyLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGlmICghaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgJiYgdmFsdWUgPT09IHRoaXMucGFyc2VyLmZvcm1hdChwYXJzZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLndyaXRlVmFsdWUocGFyc2VkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VyLndyaXRlVmFsdWUodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIilcbiAgICBwdWJsaWMgb25Gb2N1c091dCgpOnZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQWNjZXNzb3Iub25Ub3VjaGVkKCk7XG4gICAgfVxufVxuIl19