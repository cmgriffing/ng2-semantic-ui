import * as tslib_1 from "tslib";
import { Component, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Directive, Input, Renderer2 } from "@angular/core";
import { SuiSelectBase } from "../classes/select-base";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
var SuiSelect = /** @class */ (function (_super) {
    tslib_1.__extends(SuiSelect, _super);
    function SuiSelect(element, _renderer, _localizationService) {
        var _this = _super.call(this, element, _renderer, _localizationService) || this;
        _this.element = element;
        _this._renderer = _renderer;
        _this._localizationService = _localizationService;
        _this.selectedOptionChange = new EventEmitter();
        return _this;
    }
    Object.defineProperty(SuiSelect.prototype, "placeholder", {
        get: function () {
            return this._placeholder || this.localeValues.single.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    SuiSelect.prototype.optionsUpdateHook = function () {
        if (!this._writtenOption && this.selectedOption) {
            // We need to check the option still exists.
            this.writeValue(this.valueGetter(this.selectedOption));
        }
        if (this._writtenOption && this.searchService.options.length > 0) {
            // If there was an value written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOption = this.findOption(this.searchService.options, this._writtenOption);
            if (this.selectedOption) {
                this._writtenOption = undefined;
                this.drawSelectedOption();
            }
        }
    };
    SuiSelect.prototype.queryUpdateHook = function () {
        // When the query is updated, we just abandon the current selection.
        this.selectedOption = undefined;
    };
    SuiSelect.prototype.selectOption = function (option) {
        // Choose and emit the selected option.
        this.selectedOption = option;
        this.selectedOptionChange.emit(this.valueGetter(option));
        this.dropdownService.setOpenState(false);
        this.resetQuery();
        this.drawSelectedOption();
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
    };
    SuiSelect.prototype.writeValue = function (value) {
        var _this = this;
        if (value != undefined) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel value to an option.
                this.selectedOption = this.findOption(this.searchService.options, value);
                this.drawSelectedOption();
            }
            if (this.selectedOption == undefined) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial value.
                    this.searchService.initialLookup(value).then(function (i) {
                        _this.selectedOption = i;
                        _this.drawSelectedOption();
                    });
                }
                else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOption = value;
                }
            }
        }
        else {
            this.selectedOption = undefined;
            this.drawSelectedOption();
        }
    };
    SuiSelect.prototype.initialiseRenderedOption = function (option) {
        _super.prototype.initialiseRenderedOption.call(this, option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive = option.value === this.selectedOption;
    };
    SuiSelect.prototype.drawSelectedOption = function () {
        // Updates the active class on the newly selected option.
        if (this._renderedOptions) {
            this.onAvailableOptionsRendered();
        }
        if (this.selectedOption != undefined && this.optionTemplate) {
            this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
        }
    };
    SuiSelect.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SuiLocalizationService }
    ]; };
    tslib_1.__decorate([
        ViewChild("optionTemplateSibling", {
            read: ViewContainerRef,
            static: true
        })
    ], SuiSelect.prototype, "_optionTemplateSibling", void 0);
    tslib_1.__decorate([
        Output()
    ], SuiSelect.prototype, "selectedOptionChange", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiSelect.prototype, "placeholder", null);
    SuiSelect = tslib_1.__decorate([
        Component({
            selector: "sui-select",
            template: "\n        <!-- Query input -->\n        <input\n            suiSelectSearch\n            type=\"text\"\n            [hidden]=\"!isSearchable || isSearchExternal\"\n        />\n\n        <!-- Placeholder text -->\n        <div\n            *ngIf=\"selectedOption == undefined\"\n            class=\"default text\"\n            [class.filtered]=\"query\"\n        >\n            {{ placeholder }}\n        </div>\n        <!-- Selected item -->\n        <div\n            class=\"text\"\n            [class.filtered]=\"query || selectedOption == undefined\"\n        >\n            <span #optionTemplateSibling></span>\n            <span\n                *ngIf=\"!optionTemplate && selectedOption != undefined\"\n                [innerHTML]=\"configuredFormatter(selectedOption)\"\n            ></span>\n        </div>\n        <!-- Dropdown icon -->\n        <i class=\"{{ icon }} icon\" (click)=\"onCaretClick($event)\"></i>\n        <!-- Select dropdown menu -->\n        <div\n            class=\"menu\"\n            suiDropdownMenu\n            [menuTransition]=\"transition\"\n            [menuTransitionDuration]=\"transitionDuration\"\n            [menuAutoSelectFirst]=\"isSearchable\"\n        >\n            <ng-content></ng-content>\n            <div\n                *ngIf=\"isSearchable && availableOptions.length === 0\"\n                class=\"message\"\n            >\n                {{ localeValues.noResultsMessage }}\n            </div>\n        </div>\n    "
        })
    ], SuiSelect);
    return SuiSelect;
}(SuiSelectBase));
export { SuiSelect };
// Value accessor directive for the select to support ngModel.
var SuiSelectValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SuiSelectValueAccessor, _super);
    function SuiSelectValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiSelectValueAccessor_1 = SuiSelectValueAccessor;
    var SuiSelectValueAccessor_1;
    SuiSelectValueAccessor.ctorParameters = function () { return [
        { type: SuiSelect }
    ]; };
    SuiSelectValueAccessor = SuiSelectValueAccessor_1 = tslib_1.__decorate([
        Directive({
            selector: "sui-select",
            host: {
                "(selectedOptionChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiSelectValueAccessor_1)]
        })
    ], SuiSelectValueAccessor);
    return SuiSelectValueAccessor;
}(CustomValueAccessor));
export { SuiSelectValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUNILDBCQUEwQixFQUMxQixtQkFBbUIsRUFFdEIsTUFBTSxrREFBa0QsQ0FBQztBQUMxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQW1Edkc7SUFBcUMscUNBQW1CO0lBMEJwRCxtQkFDVyxPQUFrQixFQUNmLFNBQW1CLEVBQ25CLG9CQUEyQztRQUh6RCxZQUtJLGtCQUFNLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLENBQUMsU0FHbEQ7UUFQVSxhQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2YsZUFBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQiwwQkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1FBSXJELEtBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOztJQUN0RCxDQUFDO0lBaEJELHNCQUFXLGtDQUFXO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyRSxDQUFDO2FBRUQsVUFBdUIsV0FBa0I7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDcEMsQ0FBQzs7O09BSkE7SUFnQlMscUNBQWlCLEdBQTNCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElB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e1xuICAgIENvbXBvbmVudCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBTdWlTZWxlY3RCYXNlIH0gZnJvbSBcIi4uL2NsYXNzZXMvc2VsZWN0LWJhc2VcIjtcbmltcG9ydCB7IFN1aVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuL3NlbGVjdC1vcHRpb25cIjtcbmltcG9ydCB7XG4gICAgY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsdWVBY2Nlc3NvcixcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Rcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2N1c3RvbS12YWx1ZS1hY2Nlc3NvclwiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL3NlcnZpY2VzL2xvY2FsaXphdGlvbi5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zZWxlY3RcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8IS0tIFF1ZXJ5IGlucHV0IC0tPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHN1aVNlbGVjdFNlYXJjaFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCIhaXNTZWFyY2hhYmxlIHx8IGlzU2VhcmNoRXh0ZXJuYWxcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDwhLS0gUGxhY2Vob2xkZXIgdGV4dCAtLT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJzZWxlY3RlZE9wdGlvbiA9PSB1bmRlZmluZWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJkZWZhdWx0IHRleHRcIlxuICAgICAgICAgICAgW2NsYXNzLmZpbHRlcmVkXT1cInF1ZXJ5XCJcbiAgICAgICAgPlxuICAgICAgICAgICAge3sgcGxhY2Vob2xkZXIgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gU2VsZWN0ZWQgaXRlbSAtLT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtjbGFzcy5maWx0ZXJlZF09XCJxdWVyeSB8fCBzZWxlY3RlZE9wdGlvbiA9PSB1bmRlZmluZWRcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiAjb3B0aW9uVGVtcGxhdGVTaWJsaW5nPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhb3B0aW9uVGVtcGxhdGUgJiYgc2VsZWN0ZWRPcHRpb24gIT0gdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cImNvbmZpZ3VyZWRGb3JtYXR0ZXIoc2VsZWN0ZWRPcHRpb24pXCJcbiAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIERyb3Bkb3duIGljb24gLS0+XG4gICAgICAgIDxpIGNsYXNzPVwie3sgaWNvbiB9fSBpY29uXCIgKGNsaWNrKT1cIm9uQ2FyZXRDbGljaygkZXZlbnQpXCI+PC9pPlxuICAgICAgICA8IS0tIFNlbGVjdCBkcm9wZG93biBtZW51IC0tPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cIm1lbnVcIlxuICAgICAgICAgICAgc3VpRHJvcGRvd25NZW51XG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25dPVwidHJhbnNpdGlvblwiXG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25EdXJhdGlvbl09XCJ0cmFuc2l0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgW21lbnVBdXRvU2VsZWN0Rmlyc3RdPVwiaXNTZWFyY2hhYmxlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNTZWFyY2hhYmxlICYmIGF2YWlsYWJsZU9wdGlvbnMubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1lc3NhZ2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt7IGxvY2FsZVZhbHVlcy5ub1Jlc3VsdHNNZXNzYWdlIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlTZWxlY3Q8VCwgVT4gZXh0ZW5kcyBTdWlTZWxlY3RCYXNlPFQsIFU+XG4gICAgaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8VT4ge1xuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbj86VDtcbiAgICAvLyBTdG9yZXMgdGhlIHZhbHVlIHdyaXR0ZW4gYnkgbmdNb2RlbCBiZWZvcmUgaXQgY2FuIGJlIG1hdGNoZWQgdG8gYW4gb3B0aW9uIGZyb20gYG9wdGlvbnNgLlxuICAgIHByaXZhdGUgX3dyaXR0ZW5PcHRpb24/OlU7XG5cbiAgICBAVmlld0NoaWxkKFwib3B0aW9uVGVtcGxhdGVTaWJsaW5nXCIsIHtcbiAgICAgICAgcmVhZDogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgc3RhdGljOiB0cnVlXG4gICAgfSlcbiAgICBwcml2YXRlIF9vcHRpb25UZW1wbGF0ZVNpYmxpbmc6Vmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbkNoYW5nZTpFdmVudEVtaXR0ZXI8VT47XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgcGxhY2Vob2xkZXIoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXIgfHwgdGhpcy5sb2NhbGVWYWx1ZXMuc2luZ2xlLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBwcm90ZWN0ZWQgX2xvY2FsaXphdGlvblNlcnZpY2U6U3VpTG9jYWxpemF0aW9uU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50LCBfcmVuZGVyZXIsIF9sb2NhbGl6YXRpb25TZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxVPigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvcHRpb25zVXBkYXRlSG9vaygpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3dyaXR0ZW5PcHRpb24gJiYgdGhpcy5zZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayB0aGUgb3B0aW9uIHN0aWxsIGV4aXN0cy5cbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLnZhbHVlR2V0dGVyKHRoaXMuc2VsZWN0ZWRPcHRpb24pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl93cml0dGVuT3B0aW9uICYmIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIHdhcyBhbiB2YWx1ZSB3cml0dGVuIGJ5IG5nTW9kZWwgYmVmb3JlIHRoZSBvcHRpb25zIGhhZCBiZWVuIGxvYWRlZCwgdGhpcyBydW5zIHRvIGZpeCBpdC5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB0aGlzLmZpbmRPcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdHRlbk9wdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdHRlbk9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTZWxlY3RlZE9wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHF1ZXJ5VXBkYXRlSG9vaygpOnZvaWQge1xuICAgICAgICAvLyBXaGVuIHRoZSBxdWVyeSBpcyB1cGRhdGVkLCB3ZSBqdXN0IGFiYW5kb24gdGhlIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RPcHRpb24ob3B0aW9uOlQpOnZvaWQge1xuICAgICAgICAvLyBDaG9vc2UgYW5kIGVtaXQgdGhlIHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbkNoYW5nZS5lbWl0KHRoaXMudmFsdWVHZXR0ZXIob3B0aW9uKSk7XG5cbiAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKGZhbHNlKTtcblxuICAgICAgICB0aGlzLnJlc2V0UXVlcnkoKTtcblxuICAgICAgICB0aGlzLmRyYXdTZWxlY3RlZE9wdGlvbigpO1xuXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgcmVmb2N1cyB0aGUgc2VhcmNoIGlucHV0IGZvciBiZXR0ZXIga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOlUpOnZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIGxvYWRlZCwgd2UgY2FuIGltbWVkaWF0ZWx5IG1hdGNoIHRoZSBuZ01vZGVsIHZhbHVlIHRvIGFuIG9wdGlvbi5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U2VsZWN0ZWRPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlRmllbGQgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLmhhc0l0ZW1Mb29rdXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlYXJjaCBzZXJ2aWNlIGhhcyBhIHNlbGVjdGVkIGxvb2t1cCBmdW5jdGlvbiwgbWFrZSB1c2Ugb2YgdGhhdCB0byBsb2FkIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuaW5pdGlhbExvb2t1cCh2YWx1ZSkudGhlbihpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3U2VsZWN0ZWRPcHRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBjYWNoZSB0aGUgd3JpdHRlbiB2YWx1ZSBmb3Igd2hlbiBvcHRpb25zIGFyZSBzZXQuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyaXR0ZW5PcHRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5kcmF3U2VsZWN0ZWRPcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0aWFsaXNlUmVuZGVyZWRPcHRpb24ob3B0aW9uOlN1aVNlbGVjdE9wdGlvbjxUPik6dm9pZCB7XG4gICAgICAgIHN1cGVyLmluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihvcHRpb24pO1xuXG4gICAgICAgIC8vIEJvbGRlbnMgdGhlIGl0ZW0gc28gaXQgYXBwZWFycyBzZWxlY3RlZCBpbiB0aGUgZHJvcGRvd24uXG4gICAgICAgIG9wdGlvbi5pc0FjdGl2ZSA9IG9wdGlvbi52YWx1ZSA9PT0gdGhpcy5zZWxlY3RlZE9wdGlvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdTZWxlY3RlZE9wdGlvbigpOnZvaWQge1xuICAgICAgICAvLyBVcGRhdGVzIHRoZSBhY3RpdmUgY2xhc3Mgb24gdGhlIG5ld2x5IHNlbGVjdGVkIG9wdGlvbi5cbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVkT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPcHRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9uVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBsYXRlKHRoaXMuX29wdGlvblRlbXBsYXRlU2libGluZywgdGhpcy5zZWxlY3RlZE9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGRpcmVjdGl2ZSBmb3IgdGhlIHNlbGVjdCB0byBzdXBwb3J0IG5nTW9kZWwuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktc2VsZWN0XCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIihzZWxlY3RlZE9wdGlvbkNoYW5nZSlcIjogXCJvbkNoYW5nZSgkZXZlbnQpXCIsXG4gICAgICAgIFwiKHRvdWNoZWQpXCI6IFwib25Ub3VjaGVkKClcIlxuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnkoU3VpU2VsZWN0VmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlbGVjdFZhbHVlQWNjZXNzb3I8VCwgVT4gZXh0ZW5kcyBDdXN0b21WYWx1ZUFjY2Vzc29yPFxuICAgIFUsXG4gICAgU3VpU2VsZWN0PFQsIFU+XG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OlN1aVNlbGVjdDxULCBVPikge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=