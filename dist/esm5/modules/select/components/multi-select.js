import * as tslib_1 from "tslib";
import { Component, HostBinding, ElementRef, EventEmitter, Output, Input, Directive, Renderer2 } from "@angular/core";
import { KeyCode, customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiSelectBase } from "../classes/select-base";
var SuiMultiSelect = /** @class */ (function (_super) {
    tslib_1.__extends(SuiMultiSelect, _super);
    function SuiMultiSelect(element, renderer, localizationService) {
        var _this = _super.call(this, element, renderer, localizationService) || this;
        _this.selectedOptions = [];
        _this.selectedOptionsChange = new EventEmitter();
        _this.hasLabels = true;
        _this.multiSelectClasses = true;
        return _this;
    }
    Object.defineProperty(SuiMultiSelect.prototype, "filteredOptions", {
        get: function () {
            var _this = this;
            if (this.maxSelectedReached) {
                // If we have reached the maximum number of selections, then empty the results completely.
                return [];
            }
            var searchResults = this.searchService.results;
            if (!this.hasLabels) {
                return searchResults;
            }
            else {
                // Returns the search results \ selected options.
                return searchResults.filter(function (r) { return _this.selectedOptions.find(function (o) { return r === o; }) == undefined; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "availableOptions", {
        get: function () {
            return this.filteredOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "hasLabels", {
        get: function () {
            return this._hasLabels;
        },
        set: function (hasLabels) {
            this._hasLabels = hasLabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "placeholder", {
        get: function () {
            return this._placeholder || this.localeValues.multi.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "maxSelectedReached", {
        get: function () {
            if (this.maxSelected == undefined) {
                // If there is no maximum then we can immediately return.
                return false;
            }
            return this.selectedOptions.length === this.maxSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "maxSelectedMessage", {
        get: function () {
            return this._localizationService.interpolate(this.localeValues.multi.maxSelectedMessage, [["max", this.maxSelected.toString()]]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "selectedMessage", {
        get: function () {
            return this._localizationService.interpolate(this.localeValues.multi.selectedMessage, [["count", this.selectedOptions.length.toString()]]);
        },
        enumerable: true,
        configurable: true
    });
    SuiMultiSelect.prototype.optionsUpdateHook = function () {
        var _this = this;
        if (!this._writtenOptions && this.selectedOptions.length > 0) {
            // We need to check the options still exist.
            this.writeValue(this.selectedOptions.map(function (o) { return _this.valueGetter(o); }));
        }
        if (this._writtenOptions && this.searchService.options.length > 0) {
            // If there were values written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOptions = this._writtenOptions
                // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                .map(function (v) { return _this.findOption(_this.searchService.options, v); })
                .filter(function (v) { return v != undefined; });
            if (this.selectedOptions.length === this._writtenOptions.length) {
                this._writtenOptions = undefined;
            }
        }
    };
    SuiMultiSelect.prototype.initialiseRenderedOption = function (option) {
        _super.prototype.initialiseRenderedOption.call(this, option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive =
            !this.hasLabels &&
                this.selectedOptions.indexOf(option.value) !== -1;
    };
    SuiMultiSelect.prototype.selectOption = function (option) {
        var _this = this;
        if (this.selectedOptions.indexOf(option) !== -1) {
            this.deselectOption(option);
            return;
        }
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(function (o) { return _this.valueGetter(o); }));
        this.resetQuery(false);
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    };
    SuiMultiSelect.prototype.writeValue = function (values) {
        var _this = this;
        if (values instanceof Array) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel values to options.
                this.selectedOptions = values
                    // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                    .map(function (v) { return _this.findOption(_this.searchService.options, v); })
                    .filter(function (v) { return v != undefined; });
            }
            if (values.length > 0 && this.selectedOptions.length === 0) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial values.
                    this.searchService
                        .initialLookup(values)
                        .then(function (items) { return (_this.selectedOptions = items); });
                }
                else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOptions = values;
                }
            }
            if (values.length === 0) {
                this.selectedOptions = [];
            }
        }
        else {
            this.selectedOptions = [];
        }
    };
    SuiMultiSelect.prototype.deselectOption = function (option) {
        var _this = this;
        // Update selected options to the previously selected options \ {option}.
        this.selectedOptions = this.selectedOptions.filter(function (so) { return so !== option; });
        this.selectedOptionsChange.emit(this.selectedOptions.map(function (o) { return _this.valueGetter(o); }));
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    };
    SuiMultiSelect.prototype.onQueryInputKeydown = function (event) {
        if (event.keyCode === KeyCode.Backspace &&
            this.query === "" &&
            this.selectedOptions.length > 0) {
            // Deselect the rightmost option when the user presses backspace in the search input.
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    };
    SuiMultiSelect.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SuiLocalizationService }
    ]; };
    tslib_1.__decorate([
        Output()
    ], SuiMultiSelect.prototype, "selectedOptionsChange", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelect.prototype, "hasLabels", null);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelect.prototype, "placeholder", null);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelect.prototype, "maxSelected", void 0);
    tslib_1.__decorate([
        HostBinding("class.multiple")
    ], SuiMultiSelect.prototype, "multiSelectClasses", void 0);
    SuiMultiSelect = tslib_1.__decorate([
        Component({
            selector: "sui-multi-select",
            template: "\n        <!-- Dropdown icon -->\n        <i class=\"{{ icon }} icon\" (click)=\"onCaretClick($event)\"></i>\n\n        <ng-container *ngIf=\"hasLabels\">\n            <!-- Multi-select labels -->\n            <sui-multi-select-label\n                *ngFor=\"let selected of selectedOptions\"\n                [value]=\"selected\"\n                [query]=\"query\"\n                [formatter]=\"configuredFormatter\"\n                [template]=\"optionTemplate\"\n                (deselected)=\"deselectOption($event)\"\n            ></sui-multi-select-label>\n        </ng-container>\n\n        <!-- Query input -->\n        <input\n            suiSelectSearch\n            type=\"text\"\n            [hidden]=\"!isSearchable || isSearchExternal\"\n        />\n\n        <!-- Helper text -->\n        <div\n            class=\"text\"\n            [class.default]=\"hasLabels\"\n            [class.filtered]=\"!!query && !isSearchExternal\"\n        >\n            <!-- Placeholder text -->\n            <ng-container *ngIf=\"hasLabels; else selectedBlock\">{{\n                placeholder\n            }}</ng-container>\n\n            <!-- Summary shown when labels are hidden -->\n            <ng-template #selectedBlock> {{ selectedMessage }}</ng-template>\n        </div>\n\n        <!-- Select dropdown menu -->\n        <div\n            class=\"menu\"\n            suiDropdownMenu\n            [menuTransition]=\"transition\"\n            [menuTransitionDuration]=\"transitionDuration\"\n            [menuAutoSelectFirst]=\"true\"\n        >\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"availableOptions.length == 0\">\n                <div *ngIf=\"!maxSelectedReached\" class=\"message\">\n                    {{ localeValues.noResultsMessage }}\n                </div>\n                <div *ngIf=\"maxSelectedReached\" class=\"message\">\n                    {{ maxSelectedMessage }}\n                </div>\n            </ng-container>\n        </div>\n    ",
            styles: ["\n            :host input.search {\n                width: 12em !important;\n            }\n        "]
        })
    ], SuiMultiSelect);
    return SuiMultiSelect;
}(SuiSelectBase));
export { SuiMultiSelect };
// Value accessor directive for the select to support ngModel.
var SuiMultiSelectValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SuiMultiSelectValueAccessor, _super);
    function SuiMultiSelectValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiMultiSelectValueAccessor_1 = SuiMultiSelectValueAccessor;
    var SuiMultiSelectValueAccessor_1;
    SuiMultiSelectValueAccessor.ctorParameters = function () { return [
        { type: SuiMultiSelect }
    ]; };
    SuiMultiSelectValueAccessor = SuiMultiSelectValueAccessor_1 = tslib_1.__decorate([
        Directive({
            selector: "sui-multi-select",
            host: {
                "(selectedOptionsChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiMultiSelectValueAccessor_1)]
        })
    ], SuiMultiSelectValueAccessor);
    return SuiMultiSelectValueAccessor;
}(CustomValueAccessor));
export { SuiMultiSelectValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9tdWx0aS1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCxPQUFPLEVBQ1AsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXNFdkQ7SUFBMEMsMENBQW1CO0lBaUZ6RCx3QkFDSSxPQUFrQixFQUNsQixRQUFrQixFQUNsQixtQkFBMEM7UUFIOUMsWUFLSSxrQkFBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLFNBT2hEO1FBTEcsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckQsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzs7SUFDbkMsQ0FBQztJQXBGRCxzQkFBVywyQ0FBZTthQUExQjtZQUFBLGlCQWdCQztZQWZHLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUN6QiwwRkFBMEY7Z0JBQzFGLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFFRCxJQUFNLGFBQWEsR0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMs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RTFCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLG05REF3RFQ7cUJBRUcsc0dBSUM7U0FFUixDQUFDO09BQ1csY0FBYyxDQXNNMUI7SUFBRCxxQkFBQztDQUFBLEFBdE1ELENBQTBDLGFBQWEsR0FzTXREO1NBdE1ZLGNBQWM7QUF3TTNCLDhEQUE4RDtBQVM5RDtJQUF1RCx1REFHdEQ7SUFDRyxxQ0FBWSxJQUF5QjtlQUNqQyxrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO29DQU5RLDJCQUEyQjs7O2dCQUluQixjQUFjOztJQUp0QiwyQkFBMkI7UUFSdkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixJQUFJLEVBQUU7Z0JBQ0YseUJBQXlCLEVBQUUsa0JBQWtCO2dCQUM3QyxXQUFXLEVBQUUsYUFBYTthQUM3QjtZQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLDZCQUEyQixDQUFDLENBQUM7U0FDdkUsQ0FBQztPQUNXLDJCQUEyQixDQU92QztJQUFELGtDQUFDO0NBQUEsQUFQRCxDQUF1RCxtQkFBbUIsR0FPekU7U0FQWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgSW5wdXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsXG4gICAgS2V5Q29kZSxcbiAgICBjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeSxcbiAgICBDdXN0b21WYWx1ZUFjY2Vzc29yXG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IFN1aUxvY2FsaXphdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9pbmRleFwiO1xuaW1wb3J0IHsgU3VpU2VsZWN0QmFzZSB9IGZyb20gXCIuLi9jbGFzc2VzL3NlbGVjdC1iYXNlXCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1tdWx0aS1zZWxlY3RcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8IS0tIERyb3Bkb3duIGljb24gLS0+XG4gICAgICAgIDxpIGNsYXNzPVwie3sgaWNvbiB9fSBpY29uXCIgKGNsaWNrKT1cIm9uQ2FyZXRDbGljaygkZXZlbnQpXCI+PC9pPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNMYWJlbHNcIj5cbiAgICAgICAgICAgIDwhLS0gTXVsdGktc2VsZWN0IGxhYmVscyAtLT5cbiAgICAgICAgICAgIDxzdWktbXVsdGktc2VsZWN0LWxhYmVsXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlbGVjdGVkIG9mIHNlbGVjdGVkT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICBbcXVlcnldPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXR0ZXJdPVwiY29uZmlndXJlZEZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIm9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAoZGVzZWxlY3RlZCk9XCJkZXNlbGVjdE9wdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgID48L3N1aS1tdWx0aS1zZWxlY3QtbGFiZWw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwhLS0gUXVlcnkgaW5wdXQgLS0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgc3VpU2VsZWN0U2VhcmNoXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFpc1NlYXJjaGFibGUgfHwgaXNTZWFyY2hFeHRlcm5hbFwiXG4gICAgICAgIC8+XG5cbiAgICAgICAgPCEtLSBIZWxwZXIgdGV4dCAtLT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtjbGFzcy5kZWZhdWx0XT1cImhhc0xhYmVsc1wiXG4gICAgICAgICAgICBbY2xhc3MuZmlsdGVyZWRdPVwiISFxdWVyeSAmJiAhaXNTZWFyY2hFeHRlcm5hbFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDwhLS0gUGxhY2Vob2xkZXIgdGV4dCAtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNMYWJlbHM7IGVsc2Ugc2VsZWN0ZWRCbG9ja1wiPnt7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIH19PC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDwhLS0gU3VtbWFyeSBzaG93biB3aGVuIGxhYmVscyBhcmUgaGlkZGVuIC0tPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZEJsb2NrPiB7eyBzZWxlY3RlZE1lc3NhZ2UgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFNlbGVjdCBkcm9wZG93biBtZW51IC0tPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cIm1lbnVcIlxuICAgICAgICAgICAgc3VpRHJvcGRvd25NZW51XG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25dPVwidHJhbnNpdGlvblwiXG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25EdXJhdGlvbl09XCJ0cmFuc2l0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgW21lbnVBdXRvU2VsZWN0Rmlyc3RdPVwidHJ1ZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhdmFpbGFibGVPcHRpb25zLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFtYXhTZWxlY3RlZFJlYWNoZWRcIiBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgbG9jYWxlVmFsdWVzLm5vUmVzdWx0c01lc3NhZ2UgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibWF4U2VsZWN0ZWRSZWFjaGVkXCIgY2xhc3M9XCJtZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IG1heFNlbGVjdGVkTWVzc2FnZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0IGlucHV0LnNlYXJjaCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyZW0gIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpTXVsdGlTZWxlY3Q8VCwgVT4gZXh0ZW5kcyBTdWlTZWxlY3RCYXNlPFQsIFU+XG4gICAgaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8VVtdPiB7XG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uczpUW107XG4gICAgLy8gU3RvcmVzIHRoZSB2YWx1ZXMgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSBpdCBjYW4gYmUgbWF0Y2hlZCB0byBhbiBvcHRpb24gZnJvbSBgb3B0aW9uc2AuXG4gICAgcHJpdmF0ZSBfd3JpdHRlbk9wdGlvbnM/OlVbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbnNDaGFuZ2U6RXZlbnRFbWl0dGVyPFVbXT47XG5cbiAgICBwdWJsaWMgZ2V0IGZpbHRlcmVkT3B0aW9ucygpOlRbXSB7XG4gICAgICAgIGlmICh0aGlzLm1heFNlbGVjdGVkUmVhY2hlZCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzZWxlY3Rpb25zLCB0aGVuIGVtcHR5IHRoZSByZXN1bHRzIGNvbXBsZXRlbHkuXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHRzOlRbXSA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNMYWJlbHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hSZXN1bHRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmV0dXJucyB0aGUgc2VhcmNoIHJlc3VsdHMgXFwgc2VsZWN0ZWQgb3B0aW9ucy5cbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hSZXN1bHRzLmZpbHRlcihcbiAgICAgICAgICAgICAgICByID0+IHRoaXMuc2VsZWN0ZWRPcHRpb25zLmZpbmQobyA9PiByID09PSBvKSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGF2YWlsYWJsZU9wdGlvbnMoKTpUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzTGFiZWxzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaGFzTGFiZWxzKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNMYWJlbHM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBoYXNMYWJlbHMoaGFzTGFiZWxzOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGFzTGFiZWxzID0gaGFzTGFiZWxzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBwbGFjZWhvbGRlcigpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlciB8fCB0aGlzLmxvY2FsZVZhbHVlcy5tdWx0aS5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyOnN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1heFNlbGVjdGVkOm51bWJlcjtcblxuICAgIHB1YmxpYyBnZXQgbWF4U2VsZWN0ZWRSZWFjaGVkKCk6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm1heFNlbGVjdGVkID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gbWF4aW11bSB0aGVuIHdlIGNhbiBpbW1lZGlhdGVseSByZXR1cm4uXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA9PT0gdGhpcy5tYXhTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1heFNlbGVjdGVkTWVzc2FnZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLmludGVycG9sYXRlKFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVWYWx1ZXMubXVsdGkubWF4U2VsZWN0ZWRNZXNzYWdlLFxuICAgICAgICAgICAgW1tcIm1heFwiLCB0aGlzLm1heFNlbGVjdGVkLnRvU3RyaW5nKCldXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRNZXNzYWdlKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUoXG4gICAgICAgICAgICB0aGlzLmxvY2FsZVZhbHVlcy5tdWx0aS5zZWxlY3RlZE1lc3NhZ2UsXG4gICAgICAgICAgICBbW1wiY291bnRcIiwgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoLnRvU3RyaW5nKCldXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLm11bHRpcGxlXCIpXG4gICAgcHVibGljIG11bHRpU2VsZWN0Q2xhc3Nlczpib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBsb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgcmVuZGVyZXIsIGxvY2FsaXphdGlvblNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxVW10+KCk7XG5cbiAgICAgICAgdGhpcy5oYXNMYWJlbHMgPSB0cnVlO1xuICAgICAgICB0aGlzLm11bHRpU2VsZWN0Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9wdGlvbnNVcGRhdGVIb29rKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdHRlbk9wdGlvbnMgJiYgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayB0aGUgb3B0aW9ucyBzdGlsbCBleGlzdC5cbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3JpdHRlbk9wdGlvbnMgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgd2VyZSB2YWx1ZXMgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSB0aGUgb3B0aW9ucyBoYWQgYmVlbiBsb2FkZWQsIHRoaXMgcnVucyB0byBmaXggaXQuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuX3dyaXR0ZW5PcHRpb25zXG4gICAgICAgICAgICAgICAgLy8gbm9uLW51bGwgYXNzZXJ0aW9uIGFkZGVkIGhlcmUgYmVjYXVzZSBUeXBlc2NyaXB0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSBub24tbnVsbCBmaWx0ZXIuXG4gICAgICAgICAgICAgICAgLm1hcCh2ID0+IHRoaXMuZmluZE9wdGlvbih0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucywgdikhKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIodiA9PiB2ICE9IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPT09IHRoaXMuX3dyaXR0ZW5PcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXR0ZW5PcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihvcHRpb246U3VpU2VsZWN0T3B0aW9uPFQ+KTp2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGlzZVJlbmRlcmVkT3B0aW9uKG9wdGlvbik7XG5cbiAgICAgICAgLy8gQm9sZGVucyB0aGUgaXRlbSBzbyBpdCBhcHBlYXJzIHNlbGVjdGVkIGluIHRoZSBkcm9wZG93bi5cbiAgICAgICAgb3B0aW9uLmlzQWN0aXZlID1cbiAgICAgICAgICAgICF0aGlzLmhhc0xhYmVscyAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMuaW5kZXhPZihvcHRpb24udmFsdWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucmVzZXRRdWVyeShmYWxzZSk7XG5cbiAgICAgICAgLy8gQXV0b21hdGljYWxseSByZWZvY3VzIHRoZSBzZWFyY2ggaW5wdXQgZm9yIGJldHRlciBrZXlib2FyZCBhY2Nlc3NpYmlsaXR5LlxuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc0xhYmVscykge1xuICAgICAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWVzOlVbXSk6dm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQsIHdlIGNhbiBpbW1lZGlhdGVseSBtYXRjaCB0aGUgbmdNb2RlbCB2YWx1ZXMgdG8gb3B0aW9ucy5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAvLyBub24tbnVsbCBhc3NlcnRpb24gYWRkZWQgaGVyZSBiZWNhdXNlIFR5cGVzY3JpcHQgZG9lc24ndCByZWNvZ25pc2UgdGhlIG5vbi1udWxsIGZpbHRlci5cbiAgICAgICAgICAgICAgICAgICAgLm1hcCh2ID0+IHRoaXMuZmluZE9wdGlvbih0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucywgdikhKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHYgPT4gdiAhPSB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlRmllbGQgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLmhhc0l0ZW1Mb29rdXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlYXJjaCBzZXJ2aWNlIGhhcyBhIHNlbGVjdGVkIGxvb2t1cCBmdW5jdGlvbiwgbWFrZSB1c2Ugb2YgdGhhdCB0byBsb2FkIHRoZSBpbml0aWFsIHZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW5pdGlhbExvb2t1cCh2YWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihpdGVtcyA9PiAodGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBpdGVtcykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY2FjaGUgdGhlIHdyaXR0ZW4gdmFsdWUgZm9yIHdoZW4gb3B0aW9ucyBhcmUgc2V0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cml0dGVuT3B0aW9ucyA9IHZhbHVlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGVkIG9wdGlvbnMgdG8gdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgb3B0aW9ucyBcXCB7b3B0aW9ufS5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoc28gPT4gc28gIT09IG9wdGlvbik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgcmVmb2N1cyB0aGUgc2VhcmNoIGlucHV0IGZvciBiZXR0ZXIga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNMYWJlbHMpIHtcbiAgICAgICAgICAgIHRoaXMub25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblF1ZXJ5SW5wdXRLZXlkb3duKGV2ZW50OktleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkJhY2tzcGFjZSAmJlxuICAgICAgICAgICAgdGhpcy5xdWVyeSA9PT0gXCJcIiAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIERlc2VsZWN0IHRoZSByaWdodG1vc3Qgb3B0aW9uIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBiYWNrc3BhY2UgaW4gdGhlIHNlYXJjaCBpbnB1dC5cbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNbdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGRpcmVjdGl2ZSBmb3IgdGhlIHNlbGVjdCB0byBzdXBwb3J0IG5nTW9kZWwuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktbXVsdGktc2VsZWN0XCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIihzZWxlY3RlZE9wdGlvbnNDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvcjxULCBVPiBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgVVtdLFxuICAgIFN1aU11bHRpU2VsZWN0PFQsIFU+XG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OlN1aU11bHRpU2VsZWN0PFQsIFU+KSB7XG4gICAgICAgIHN1cGVyKGhvc3QpO1xuICAgIH1cbn1cbiJdfQ==