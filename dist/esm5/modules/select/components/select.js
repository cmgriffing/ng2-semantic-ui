import * as tslib_1 from "tslib";
import { Component, ViewContainerRef, ViewChild, Output, EventEmitter, ElementRef, Directive, Input, Renderer2 } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiSelectBase } from "../classes/select-base";
var SuiSelect = /** @class */ (function (_super) {
    tslib_1.__extends(SuiSelect, _super);
    function SuiSelect(element, renderer, localizationService) {
        var _this = _super.call(this, element, renderer, localizationService) || this;
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
            static: true,
            read: ViewContainerRef
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW9EdkQ7SUFBcUMscUNBQW1CO0lBMEJwRCxtQkFDSSxPQUFrQixFQUNsQixRQUFrQixFQUNsQixtQkFBMEM7UUFIOUMsWUFLSSxrQkFBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLFNBR2hEO1FBREcsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7O0lBQ3RELENBQUM7SUFoQkQsc0JBQVcsa0NBQVc7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JFLENBQUM7YUFFRCxVQUF1QixXQUFrQjtZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDOzs7T0FKQTtJQWdCUyxxQ0FBaUIsR0FBM0I7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzdDLDRDQUE0QztZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMs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LEVBQUU7WUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0wsQ0FBQzs7Z0JBN0ZXLFVBQVU7Z0JBQ1QsU0FBUztnQkFDRSxzQkFBc0I7O0lBbkI5QztRQUpDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRSxnQkFBZ0I7U0FDekIsQ0FBQzs2REFDOEM7SUFHaEQ7UUFEQyxNQUFNLEVBQUU7MkRBQ21DO0lBSzVDO1FBREMsS0FBSyxFQUFFO2dEQUdQO0lBcEJRLFNBQVM7UUFqRHJCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSx3OENBNkNUO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0F5SHJCO0lBQUQsZ0JBQUM7Q0FBQSxBQXpIRCxDQUFxQyxhQUFhLEdBeUhqRDtTQXpIWSxTQUFTO0FBMkh0Qiw4REFBOEQ7QUFTOUQ7SUFBa0Qsa0RBR2pEO0lBQ0csZ0NBQVksSUFBb0I7ZUFDNUIsa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQzsrQkFOUSxzQkFBc0I7OztnQkFJZCxTQUFTOztJQUpqQixzQkFBc0I7UUFSbEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFO2dCQUNGLHdCQUF3QixFQUFFLGtCQUFrQjtnQkFDNUMsV0FBVyxFQUFFLGFBQWE7YUFDN0I7WUFDRCxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyx3QkFBc0IsQ0FBQyxDQUFDO1NBQ2xFLENBQUM7T0FDVyxzQkFBc0IsQ0FPbEM7SUFBRCw2QkFBQztDQUFBLEFBUEQsQ0FBa0QsbUJBQW1CLEdBT3BFO1NBUFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0LFxuICAgIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LFxuICAgIEN1c3RvbVZhbHVlQWNjZXNzb3Jcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RCYXNlIH0gZnJvbSBcIi4uL2NsYXNzZXMvc2VsZWN0LWJhc2VcIjtcbmltcG9ydCB7IFN1aVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuL3NlbGVjdC1vcHRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXNlbGVjdFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDwhLS0gUXVlcnkgaW5wdXQgLS0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgc3VpU2VsZWN0U2VhcmNoXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFpc1NlYXJjaGFibGUgfHwgaXNTZWFyY2hFeHRlcm5hbFwiXG4gICAgICAgIC8+XG5cbiAgICAgICAgPCEtLSBQbGFjZWhvbGRlciB0ZXh0IC0tPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdJZj1cInNlbGVjdGVkT3B0aW9uID09IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICBjbGFzcz1cImRlZmF1bHQgdGV4dFwiXG4gICAgICAgICAgICBbY2xhc3MuZmlsdGVyZWRdPVwicXVlcnlcIlxuICAgICAgICA+XG4gICAgICAgICAgICB7eyBwbGFjZWhvbGRlciB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSBTZWxlY3RlZCBpdGVtIC0tPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInRleHRcIlxuICAgICAgICAgICAgW2NsYXNzLmZpbHRlcmVkXT1cInF1ZXJ5IHx8IHNlbGVjdGVkT3B0aW9uID09IHVuZGVmaW5lZFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuICNvcHRpb25UZW1wbGF0ZVNpYmxpbmc+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFvcHRpb25UZW1wbGF0ZSAmJiBzZWxlY3RlZE9wdGlvbiAhPSB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiY29uZmlndXJlZEZvcm1hdHRlcihzZWxlY3RlZE9wdGlvbilcIlxuICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gRHJvcGRvd24gaWNvbiAtLT5cbiAgICAgICAgPGkgY2xhc3M9XCJ7eyBpY29uIH19IGljb25cIiAoY2xpY2spPVwib25DYXJldENsaWNrKCRldmVudClcIj48L2k+XG4gICAgICAgIDwhLS0gU2VsZWN0IGRyb3Bkb3duIG1lbnUgLS0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwibWVudVwiXG4gICAgICAgICAgICBzdWlEcm9wZG93bk1lbnVcbiAgICAgICAgICAgIFttZW51VHJhbnNpdGlvbl09XCJ0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgIFttZW51VHJhbnNpdGlvbkR1cmF0aW9uXT1cInRyYW5zaXRpb25EdXJhdGlvblwiXG4gICAgICAgICAgICBbbWVudUF1dG9TZWxlY3RGaXJzdF09XCJpc1NlYXJjaGFibGVcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKm5nSWY9XCJpc1NlYXJjaGFibGUgJiYgYXZhaWxhYmxlT3B0aW9ucy5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibWVzc2FnZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3sgbG9jYWxlVmFsdWVzLm5vUmVzdWx0c01lc3NhZ2UgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlbGVjdDxULCBVPiBleHRlbmRzIFN1aVNlbGVjdEJhc2U8VCwgVT5cbiAgICBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxVPiB7XG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uPzpUO1xuICAgIC8vIFN0b3JlcyB0aGUgdmFsdWUgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSBpdCBjYW4gYmUgbWF0Y2hlZCB0byBhbiBvcHRpb24gZnJvbSBgb3B0aW9uc2AuXG4gICAgcHJpdmF0ZSBfd3JpdHRlbk9wdGlvbj86VTtcblxuICAgIEBWaWV3Q2hpbGQoXCJvcHRpb25UZW1wbGF0ZVNpYmxpbmdcIiwge1xuICAgICAgICBzdGF0aWM6IHRydWUsXG4gICAgICAgIHJlYWQ6IFZpZXdDb250YWluZXJSZWZcbiAgICB9KVxuICAgIHByaXZhdGUgX29wdGlvblRlbXBsYXRlU2libGluZzpWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uQ2hhbmdlOkV2ZW50RW1pdHRlcjxVPjtcblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBwbGFjZWhvbGRlcigpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlciB8fCB0aGlzLmxvY2FsZVZhbHVlcy5zaW5nbGUucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBwbGFjZWhvbGRlcihwbGFjZWhvbGRlcjpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICByZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIGxvY2FsaXphdGlvblNlcnZpY2U6U3VpTG9jYWxpemF0aW9uU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50LCByZW5kZXJlciwgbG9jYWxpemF0aW9uU2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VT4oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3B0aW9uc1VwZGF0ZUhvb2soKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl93cml0dGVuT3B0aW9uICYmIHRoaXMuc2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgdGhlIG9wdGlvbiBzdGlsbCBleGlzdHMuXG4gICAgICAgICAgICB0aGlzLndyaXRlVmFsdWUodGhpcy52YWx1ZUdldHRlcih0aGlzLnNlbGVjdGVkT3B0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3JpdHRlbk9wdGlvbiAmJiB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYW4gdmFsdWUgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSB0aGUgb3B0aW9ucyBoYWQgYmVlbiBsb2FkZWQsIHRoaXMgcnVucyB0byBmaXggaXQuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKFxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXR0ZW5PcHRpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXR0ZW5PcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U2VsZWN0ZWRPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBxdWVyeVVwZGF0ZUhvb2soKTp2b2lkIHtcbiAgICAgICAgLy8gV2hlbiB0aGUgcXVlcnkgaXMgdXBkYXRlZCwgd2UganVzdCBhYmFuZG9uIHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgLy8gQ2hvb3NlIGFuZCBlbWl0IHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSBvcHRpb247XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25DaGFuZ2UuZW1pdCh0aGlzLnZhbHVlR2V0dGVyKG9wdGlvbikpO1xuXG4gICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5yZXNldFF1ZXJ5KCk7XG5cbiAgICAgICAgdGhpcy5kcmF3U2VsZWN0ZWRPcHRpb24oKTtcblxuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IHJlZm9jdXMgdGhlIHNlYXJjaCBpbnB1dCBmb3IgYmV0dGVyIGtleWJvYXJkIGFjY2Vzc2liaWxpdHkuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpVKTp2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQsIHdlIGNhbiBpbW1lZGlhdGVseSBtYXRjaCB0aGUgbmdNb2RlbCB2YWx1ZSB0byBhbiBvcHRpb24uXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9IHRoaXMuZmluZE9wdGlvbihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NlbGVjdGVkT3B0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE9wdGlvbiA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUZpZWxkICYmIHRoaXMuc2VhcmNoU2VydmljZS5oYXNJdGVtTG9va3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzZWFyY2ggc2VydmljZSBoYXMgYSBzZWxlY3RlZCBsb29rdXAgZnVuY3Rpb24sIG1ha2UgdXNlIG9mIHRoYXQgdG8gbG9hZCB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmluaXRpYWxMb29rdXAodmFsdWUpLnRoZW4oaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NlbGVjdGVkT3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY2FjaGUgdGhlIHdyaXR0ZW4gdmFsdWUgZm9yIHdoZW4gb3B0aW9ucyBhcmUgc2V0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cml0dGVuT3B0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuZHJhd1NlbGVjdGVkT3B0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGlzZVJlbmRlcmVkT3B0aW9uKG9wdGlvbjpTdWlTZWxlY3RPcHRpb248VD4pOnZvaWQge1xuICAgICAgICBzdXBlci5pbml0aWFsaXNlUmVuZGVyZWRPcHRpb24ob3B0aW9uKTtcblxuICAgICAgICAvLyBCb2xkZW5zIHRoZSBpdGVtIHNvIGl0IGFwcGVhcnMgc2VsZWN0ZWQgaW4gdGhlIGRyb3Bkb3duLlxuICAgICAgICBvcHRpb24uaXNBY3RpdmUgPSBvcHRpb24udmFsdWUgPT09IHRoaXMuc2VsZWN0ZWRPcHRpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3U2VsZWN0ZWRPcHRpb24oKTp2b2lkIHtcbiAgICAgICAgLy8gVXBkYXRlcyB0aGUgYWN0aXZlIGNsYXNzIG9uIHRoZSBuZXdseSBzZWxlY3RlZCBvcHRpb24uXG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uICE9IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvblRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdUZW1wbGF0ZSh0aGlzLl9vcHRpb25UZW1wbGF0ZVNpYmxpbmcsIHRoaXMuc2VsZWN0ZWRPcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBWYWx1ZSBhY2Nlc3NvciBkaXJlY3RpdmUgZm9yIHRoZSBzZWxlY3QgdG8gc3VwcG9ydCBuZ01vZGVsLlxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXNlbGVjdFwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCIoc2VsZWN0ZWRPcHRpb25DaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aVNlbGVjdFZhbHVlQWNjZXNzb3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTZWxlY3RWYWx1ZUFjY2Vzc29yPFQsIFU+IGV4dGVuZHMgQ3VzdG9tVmFsdWVBY2Nlc3NvcjxcbiAgICBVLFxuICAgIFN1aVNlbGVjdDxULCBVPlxuPiB7XG4gICAgY29uc3RydWN0b3IoaG9zdDpTdWlTZWxlY3Q8VCwgVT4pIHtcbiAgICAgICAgc3VwZXIoaG9zdCk7XG4gICAgfVxufVxuIl19