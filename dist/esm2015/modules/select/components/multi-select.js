var SuiMultiSelectValueAccessor_1;
import * as tslib_1 from "tslib";
import { Component, HostBinding, ElementRef, EventEmitter, Output, Input, Directive, Renderer2 } from "@angular/core";
import { SuiSelectBase } from "../classes/select-base";
import { KeyCode } from "../../../misc/util/helpers/util";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
let SuiMultiSelect = class SuiMultiSelect extends SuiSelectBase {
    constructor(element, _renderer, _localizationService) {
        super(element, _renderer, _localizationService);
        this.element = element;
        this._renderer = _renderer;
        this._localizationService = _localizationService;
        this.selectedOptions = [];
        this.selectedOptionsChange = new EventEmitter();
        this.hasLabels = true;
        this.multiSelectClasses = true;
    }
    get filteredOptions() {
        if (this.maxSelectedReached) {
            // If we have reached the maximum number of selections, then empty the results completely.
            return [];
        }
        const searchResults = this.searchService.results;
        if (!this.hasLabels) {
            return searchResults;
        }
        else {
            // Returns the search results \ selected options.
            return searchResults.filter(r => this.selectedOptions.find(o => r === o) == undefined);
        }
    }
    get availableOptions() {
        return this.filteredOptions;
    }
    get hasLabels() {
        return this._hasLabels;
    }
    set hasLabels(hasLabels) {
        this._hasLabels = hasLabels;
    }
    get placeholder() {
        return this._placeholder || this.localeValues.multi.placeholder;
    }
    set placeholder(placeholder) {
        this._placeholder = placeholder;
    }
    get maxSelectedReached() {
        if (this.maxSelected == undefined) {
            // If there is no maximum then we can immediately return.
            return false;
        }
        return this.selectedOptions.length === this.maxSelected;
    }
    get maxSelectedMessage() {
        return this._localizationService.interpolate(this.localeValues.multi.maxSelectedMessage, [["max", this.maxSelected.toString()]]);
    }
    get selectedMessage() {
        return this._localizationService.interpolate(this.localeValues.multi.selectedMessage, [["count", this.selectedOptions.length.toString()]]);
    }
    optionsUpdateHook() {
        if (!this._writtenOptions && this.selectedOptions.length > 0) {
            // We need to check the options still exist.
            this.writeValue(this.selectedOptions.map(o => this.valueGetter(o)));
        }
        if (this._writtenOptions && this.searchService.options.length > 0) {
            // If there were values written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOptions = this._writtenOptions
                // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                .map(v => this.findOption(this.searchService.options, v))
                .filter(v => v != undefined);
            if (this.selectedOptions.length === this._writtenOptions.length) {
                this._writtenOptions = undefined;
            }
        }
    }
    initialiseRenderedOption(option) {
        super.initialiseRenderedOption(option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive =
            !this.hasLabels &&
                this.selectedOptions.indexOf(option.value) !== -1;
    }
    selectOption(option) {
        if (this.selectedOptions.indexOf(option) !== -1) {
            this.deselectOption(option);
            return;
        }
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));
        this.resetQuery(false);
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    }
    writeValue(values) {
        if (values instanceof Array) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel values to options.
                this.selectedOptions = values
                    // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                    .map(v => this.findOption(this.searchService.options, v))
                    .filter(v => v != undefined);
            }
            if (values.length > 0 && this.selectedOptions.length === 0) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial values.
                    this.searchService
                        .initialLookup(values)
                        .then(items => (this.selectedOptions = items));
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
    }
    deselectOption(option) {
        // Update selected options to the previously selected options \ {option}.
        this.selectedOptions = this.selectedOptions.filter(so => so !== option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    }
    onQueryInputKeydown(event) {
        if (event.keyCode === KeyCode.Backspace &&
            this.query === "" &&
            this.selectedOptions.length > 0) {
            // Deselect the rightmost option when the user presses backspace in the search input.
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    }
};
SuiMultiSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SuiLocalizationService }
];
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
        template: `
        <!-- Dropdown icon -->
        <i class="{{ icon }} icon" (click)="onCaretClick($event)"></i>

        <ng-container *ngIf="hasLabels">
            <!-- Multi-select labels -->
            <sui-multi-select-label
                *ngFor="let selected of selectedOptions"
                [value]="selected"
                [query]="query"
                [formatter]="configuredFormatter"
                [template]="optionTemplate"
                (deselected)="deselectOption($event)"
            ></sui-multi-select-label>
        </ng-container>

        <!-- Query input -->
        <input
            suiSelectSearch
            type="text"
            [hidden]="!isSearchable || isSearchExternal"
        />

        <!-- Helper text -->
        <div
            class="text"
            [class.default]="hasLabels"
            [class.filtered]="!!query && !isSearchExternal"
        >
            <!-- Placeholder text -->
            <ng-container *ngIf="hasLabels; else selectedBlock">{{
                placeholder
            }}</ng-container>

            <!-- Summary shown when labels are hidden -->
            <ng-template #selectedBlock> {{ selectedMessage }}</ng-template>
        </div>

        <!-- Select dropdown menu -->
        <div
            class="menu"
            suiDropdownMenu
            [menuTransition]="transition"
            [menuTransitionDuration]="transitionDuration"
            [menuAutoSelectFirst]="true"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="availableOptions.length == 0">
                <div *ngIf="!maxSelectedReached" class="message">
                    {{ localeValues.noResultsMessage }}
                </div>
                <div *ngIf="maxSelectedReached" class="message">
                    {{ maxSelectedMessage }}
                </div>
            </ng-container>
        </div>
    `,
        styles: [`
            :host input.search {
                width: 12em !important;
            }
        `]
    })
], SuiMultiSelect);
export { SuiMultiSelect };
// Value accessor directive for the select to support ngModel.
let SuiMultiSelectValueAccessor = SuiMultiSelectValueAccessor_1 = class SuiMultiSelectValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiMultiSelectValueAccessor.ctorParameters = () => [
    { type: SuiMultiSelect }
];
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
export { SuiMultiSelectValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9tdWx0aS1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFELE9BQU8sRUFDSCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBRXRCLE1BQU0sa0RBQWtELENBQUM7QUFDMUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFxRXZHLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQXFCLFNBQVEsYUFBbUI7SUFpRnpELFlBQ1csT0FBa0IsRUFDZixTQUFtQixFQUNuQixvQkFBMkM7UUFFckQsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUp6QyxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1FBSXJELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXJELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQXBGRCxJQUFXLGVBQWU7UUFDdEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFD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O0FBd00zQiw4REFBOEQ7QUFTOUQsSUFBYSwyQkFBMkIsbUNBQXhDLE1BQWEsMkJBQWtDLFNBQVEsbUJBR3REO0lBQ0csWUFBWSxJQUF5QjtRQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztDQUNKLENBQUE7O1lBSG9CLGNBQWM7O0FBSnRCLDJCQUEyQjtJQVJ2QyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLElBQUksRUFBRTtZQUNGLHlCQUF5QixFQUFFLGtCQUFrQjtZQUM3QyxXQUFXLEVBQUUsYUFBYTtTQUM3QjtRQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLDZCQUEyQixDQUFDLENBQUM7S0FDdkUsQ0FBQztHQUNXLDJCQUEyQixDQU92QztTQVBZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBJbnB1dCxcbiAgICBEaXJlY3RpdmUsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RCYXNlIH0gZnJvbSBcIi4uL2NsYXNzZXMvc2VsZWN0LWJhc2VcIjtcbmltcG9ydCB7IFN1aVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuL3NlbGVjdC1vcHRpb25cIjtcbmltcG9ydCB7IEtleUNvZGUgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvdXRpbFwiO1xuaW1wb3J0IHtcbiAgICBjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeSxcbiAgICBDdXN0b21WYWx1ZUFjY2Vzc29yLFxuICAgIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdFxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvY3VzdG9tLXZhbHVlLWFjY2Vzc29yXCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vc2VydmljZXMvbG9jYWxpemF0aW9uLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLW11bHRpLXNlbGVjdFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDwhLS0gRHJvcGRvd24gaWNvbiAtLT5cbiAgICAgICAgPGkgY2xhc3M9XCJ7eyBpY29uIH19IGljb25cIiAoY2xpY2spPVwib25DYXJldENsaWNrKCRldmVudClcIj48L2k+XG5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0xhYmVsc1wiPlxuICAgICAgICAgICAgPCEtLSBNdWx0aS1zZWxlY3QgbGFiZWxzIC0tPlxuICAgICAgICAgICAgPHN1aS1tdWx0aS1zZWxlY3QtbGFiZWxcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgc2VsZWN0ZWQgb2Ygc2VsZWN0ZWRPcHRpb25zXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIFtxdWVyeV09XCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdHRlcl09XCJjb25maWd1cmVkRm9ybWF0dGVyXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwib3B0aW9uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIChkZXNlbGVjdGVkKT1cImRlc2VsZWN0T3B0aW9uKCRldmVudClcIlxuICAgICAgICAgICAgPjwvc3VpLW11bHRpLXNlbGVjdC1sYWJlbD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgPCEtLSBRdWVyeSBpbnB1dCAtLT5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBzdWlTZWxlY3RTZWFyY2hcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtoaWRkZW5dPVwiIWlzU2VhcmNoYWJsZSB8fCBpc1NlYXJjaEV4dGVybmFsXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8IS0tIEhlbHBlciB0ZXh0IC0tPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInRleHRcIlxuICAgICAgICAgICAgW2NsYXNzLmRlZmF1bHRdPVwiaGFzTGFiZWxzXCJcbiAgICAgICAgICAgIFtjbGFzcy5maWx0ZXJlZF09XCIhIXF1ZXJ5ICYmICFpc1NlYXJjaEV4dGVybmFsXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPCEtLSBQbGFjZWhvbGRlciB0ZXh0IC0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0xhYmVsczsgZWxzZSBzZWxlY3RlZEJsb2NrXCI+e3tcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlclxuICAgICAgICAgICAgfX08L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPCEtLSBTdW1tYXJ5IHNob3duIHdoZW4gbGFiZWxzIGFyZSBoaWRkZW4gLS0+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3NlbGVjdGVkQmxvY2s+IHt7IHNlbGVjdGVkTWVzc2FnZSB9fTwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gU2VsZWN0IGRyb3Bkb3duIG1lbnUgLS0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwibWVudVwiXG4gICAgICAgICAgICBzdWlEcm9wZG93bk1lbnVcbiAgICAgICAgICAgIFttZW51VHJhbnNpdGlvbl09XCJ0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgIFttZW51VHJhbnNpdGlvbkR1cmF0aW9uXT1cInRyYW5zaXRpb25EdXJhdGlvblwiXG4gICAgICAgICAgICBbbWVudUF1dG9TZWxlY3RGaXJzdF09XCJ0cnVlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImF2YWlsYWJsZU9wdGlvbnMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIW1heFNlbGVjdGVkUmVhY2hlZFwiIGNsYXNzPVwibWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBsb2NhbGVWYWx1ZXMubm9SZXN1bHRzTWVzc2FnZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJtYXhTZWxlY3RlZFJlYWNoZWRcIiBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgbWF4U2VsZWN0ZWRNZXNzYWdlIH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3QgaW5wdXQuc2VhcmNoIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTJlbSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlNdWx0aVNlbGVjdDxULCBVPiBleHRlbmRzIFN1aVNlbGVjdEJhc2U8VCwgVT5cbiAgICBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxVW10+IHtcbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb25zOlRbXTtcbiAgICAvLyBTdG9yZXMgdGhlIHZhbHVlcyB3cml0dGVuIGJ5IG5nTW9kZWwgYmVmb3JlIGl0IGNhbiBiZSBtYXRjaGVkIHRvIGFuIG9wdGlvbiBmcm9tIGBvcHRpb25zYC5cbiAgICBwcml2YXRlIF93cml0dGVuT3B0aW9ucz86VVtdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uc0NoYW5nZTpFdmVudEVtaXR0ZXI8VVtdPjtcblxuICAgIHB1YmxpYyBnZXQgZmlsdGVyZWRPcHRpb25zKCk6VFtdIHtcbiAgICAgICAgaWYgKHRoaXMubWF4U2VsZWN0ZWRSZWFjaGVkKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHNlbGVjdGlvbnMsIHRoZW4gZW1wdHkgdGhlIHJlc3VsdHMgY29tcGxldGVseS5cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdHM6VFtdID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHM7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc0xhYmVscykge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXR1cm5zIHRoZSBzZWFyY2ggcmVzdWx0cyBcXCBzZWxlY3RlZCBvcHRpb25zLlxuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFJlc3VsdHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIHIgPT4gdGhpcy5zZWxlY3RlZE9wdGlvbnMuZmluZChvID0+IHIgPT09IG8pID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYXZhaWxhYmxlT3B0aW9ucygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkT3B0aW9ucztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNMYWJlbHM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBoYXNMYWJlbHMoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0xhYmVscztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGhhc0xhYmVscyhoYXNMYWJlbHM6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNMYWJlbHMgPSBoYXNMYWJlbHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6c3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHBsYWNlaG9sZGVyKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyIHx8IHRoaXMubG9jYWxlVmFsdWVzLm11bHRpLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWF4U2VsZWN0ZWQ6bnVtYmVyO1xuXG4gICAgcHVibGljIGdldCBtYXhTZWxlY3RlZFJlYWNoZWQoKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubWF4U2VsZWN0ZWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBtYXhpbXVtIHRoZW4gd2UgY2FuIGltbWVkaWF0ZWx5IHJldHVybi5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID09PSB0aGlzLm1heFNlbGVjdGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF4U2VsZWN0ZWRNZXNzYWdlKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUoXG4gICAgICAgICAgICB0aGlzLmxvY2FsZVZhbHVlcy5tdWx0aS5tYXhTZWxlY3RlZE1lc3NhZ2UsXG4gICAgICAgICAgICBbW1wibWF4XCIsIHRoaXMubWF4U2VsZWN0ZWQudG9TdHJpbmcoKV1dXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZE1lc3NhZ2UoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5pbnRlcnBvbGF0ZShcbiAgICAgICAgICAgIHRoaXMubG9jYWxlVmFsdWVzLm11bHRpLnNlbGVjdGVkTWVzc2FnZSxcbiAgICAgICAgICAgIFtbXCJjb3VudFwiLCB0aGlzLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGgudG9TdHJpbmcoKV1dXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MubXVsdGlwbGVcIilcbiAgICBwdWJsaWMgbXVsdGlTZWxlY3RDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHByb3RlY3RlZCBfbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnQsIF9yZW5kZXJlciwgX2xvY2FsaXphdGlvblNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxVW10+KCk7XG5cbiAgICAgICAgdGhpcy5oYXNMYWJlbHMgPSB0cnVlO1xuICAgICAgICB0aGlzLm11bHRpU2VsZWN0Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9wdGlvbnNVcGRhdGVIb29rKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdHRlbk9wdGlvbnMgJiYgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayB0aGUgb3B0aW9ucyBzdGlsbCBleGlzdC5cbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3JpdHRlbk9wdGlvbnMgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgd2VyZSB2YWx1ZXMgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSB0aGUgb3B0aW9ucyBoYWQgYmVlbiBsb2FkZWQsIHRoaXMgcnVucyB0byBmaXggaXQuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuX3dyaXR0ZW5PcHRpb25zXG4gICAgICAgICAgICAgICAgLy8gbm9uLW51bGwgYXNzZXJ0aW9uIGFkZGVkIGhlcmUgYmVjYXVzZSBUeXBlc2NyaXB0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSBub24tbnVsbCBmaWx0ZXIuXG4gICAgICAgICAgICAgICAgLm1hcCh2ID0+IHRoaXMuZmluZE9wdGlvbih0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucywgdikhKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIodiA9PiB2ICE9IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPT09IHRoaXMuX3dyaXR0ZW5PcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXR0ZW5PcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihvcHRpb246U3VpU2VsZWN0T3B0aW9uPFQ+KTp2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGlzZVJlbmRlcmVkT3B0aW9uKG9wdGlvbik7XG5cbiAgICAgICAgLy8gQm9sZGVucyB0aGUgaXRlbSBzbyBpdCBhcHBlYXJzIHNlbGVjdGVkIGluIHRoZSBkcm9wZG93bi5cbiAgICAgICAgb3B0aW9uLmlzQWN0aXZlID1cbiAgICAgICAgICAgICF0aGlzLmhhc0xhYmVscyAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMuaW5kZXhPZihvcHRpb24udmFsdWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucmVzZXRRdWVyeShmYWxzZSk7XG5cbiAgICAgICAgLy8gQXV0b21hdGljYWxseSByZWZvY3VzIHRoZSBzZWFyY2ggaW5wdXQgZm9yIGJldHRlciBrZXlib2FyZCBhY2Nlc3NpYmlsaXR5LlxuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc0xhYmVscykge1xuICAgICAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWVzOlVbXSk6dm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQsIHdlIGNhbiBpbW1lZGlhdGVseSBtYXRjaCB0aGUgbmdNb2RlbCB2YWx1ZXMgdG8gb3B0aW9ucy5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAvLyBub24tbnVsbCBhc3NlcnRpb24gYWRkZWQgaGVyZSBiZWNhdXNlIFR5cGVzY3JpcHQgZG9lc24ndCByZWNvZ25pc2UgdGhlIG5vbi1udWxsIGZpbHRlci5cbiAgICAgICAgICAgICAgICAgICAgLm1hcCh2ID0+IHRoaXMuZmluZE9wdGlvbih0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucywgdikhKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHYgPT4gdiAhPSB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlRmllbGQgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLmhhc0l0ZW1Mb29rdXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlYXJjaCBzZXJ2aWNlIGhhcyBhIHNlbGVjdGVkIGxvb2t1cCBmdW5jdGlvbiwgbWFrZSB1c2Ugb2YgdGhhdCB0byBsb2FkIHRoZSBpbml0aWFsIHZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW5pdGlhbExvb2t1cCh2YWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihpdGVtcyA9PiAodGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBpdGVtcykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY2FjaGUgdGhlIHdyaXR0ZW4gdmFsdWUgZm9yIHdoZW4gb3B0aW9ucyBhcmUgc2V0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cml0dGVuT3B0aW9ucyA9IHZhbHVlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGVkIG9wdGlvbnMgdG8gdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgb3B0aW9ucyBcXCB7b3B0aW9ufS5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoc28gPT4gc28gIT09IG9wdGlvbik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgcmVmb2N1cyB0aGUgc2VhcmNoIGlucHV0IGZvciBiZXR0ZXIga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNMYWJlbHMpIHtcbiAgICAgICAgICAgIHRoaXMub25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblF1ZXJ5SW5wdXRLZXlkb3duKGV2ZW50OktleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkJhY2tzcGFjZSAmJlxuICAgICAgICAgICAgdGhpcy5xdWVyeSA9PT0gXCJcIiAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIERlc2VsZWN0IHRoZSByaWdodG1vc3Qgb3B0aW9uIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBiYWNrc3BhY2UgaW4gdGhlIHNlYXJjaCBpbnB1dC5cbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNbdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGRpcmVjdGl2ZSBmb3IgdGhlIHNlbGVjdCB0byBzdXBwb3J0IG5nTW9kZWwuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktbXVsdGktc2VsZWN0XCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIihzZWxlY3RlZE9wdGlvbnNDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvcjxULCBVPiBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgVVtdLFxuICAgIFN1aU11bHRpU2VsZWN0PFQsIFU+XG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OlN1aU11bHRpU2VsZWN0PFQsIFU+KSB7XG4gICAgICAgIHN1cGVyKGhvc3QpO1xuICAgIH1cbn1cbiJdfQ==