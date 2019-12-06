var SuiMultiSelectValueAccessor_1;
import * as tslib_1 from "tslib";
import { Component, HostBinding, ElementRef, EventEmitter, Output, Input, Directive, Renderer2 } from "@angular/core";
import { KeyCode, customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
import { SuiSelectBase } from "../classes/select-base";
let SuiMultiSelect = class SuiMultiSelect extends SuiSelectBase {
    constructor(element, renderer, localizationService) {
        super(element, renderer, localizationService);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9tdWx0aS1zZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsT0FBTyxFQUNQLDBCQUEwQixFQUMxQixtQkFBbUIsRUFDdEIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFzRXZELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQXFCLFNBQVEsYUFBbUI7SUFpRnpELFlBQ0ksT0FBa0IsRUFDbEIsUUFBa0IsRUFDbEIsbUJBQTBDO1FBRTFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBcEZELElBQVcsZUFBZTtRQUN0QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QiwwRkFBMEY7WUFDMUYsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELE1BQU0sYUFBYSxHQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBRXJELElBQUksQ0FBQyxJQUFJLENBQUMsU0FB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LENBQUM7Q0FDSixDQUFBOztZQUhvQixjQUFjOztBQUp0QiwyQkFBMkI7SUFSdkMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixJQUFJLEVBQUU7WUFDRix5QkFBeUIsRUFBRSxrQkFBa0I7WUFDN0MsV0FBVyxFQUFFLGFBQWE7U0FDN0I7UUFDRCxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyw2QkFBMkIsQ0FBQyxDQUFDO0tBQ3ZFLENBQUM7R0FDVywyQkFBMkIsQ0FPdkM7U0FQWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgSW5wdXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsXG4gICAgS2V5Q29kZSxcbiAgICBjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeSxcbiAgICBDdXN0b21WYWx1ZUFjY2Vzc29yXG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IFN1aUxvY2FsaXphdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9pbmRleFwiO1xuaW1wb3J0IHsgU3VpU2VsZWN0QmFzZSB9IGZyb20gXCIuLi9jbGFzc2VzL3NlbGVjdC1iYXNlXCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1tdWx0aS1zZWxlY3RcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8IS0tIERyb3Bkb3duIGljb24gLS0+XG4gICAgICAgIDxpIGNsYXNzPVwie3sgaWNvbiB9fSBpY29uXCIgKGNsaWNrKT1cIm9uQ2FyZXRDbGljaygkZXZlbnQpXCI+PC9pPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNMYWJlbHNcIj5cbiAgICAgICAgICAgIDwhLS0gTXVsdGktc2VsZWN0IGxhYmVscyAtLT5cbiAgICAgICAgICAgIDxzdWktbXVsdGktc2VsZWN0LWxhYmVsXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlbGVjdGVkIG9mIHNlbGVjdGVkT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICBbcXVlcnldPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXR0ZXJdPVwiY29uZmlndXJlZEZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIm9wdGlvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAoZGVzZWxlY3RlZCk9XCJkZXNlbGVjdE9wdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgID48L3N1aS1tdWx0aS1zZWxlY3QtbGFiZWw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDwhLS0gUXVlcnkgaW5wdXQgLS0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgc3VpU2VsZWN0U2VhcmNoXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFpc1NlYXJjaGFibGUgfHwgaXNTZWFyY2hFeHRlcm5hbFwiXG4gICAgICAgIC8+XG5cbiAgICAgICAgPCEtLSBIZWxwZXIgdGV4dCAtLT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0XCJcbiAgICAgICAgICAgIFtjbGFzcy5kZWZhdWx0XT1cImhhc0xhYmVsc1wiXG4gICAgICAgICAgICBbY2xhc3MuZmlsdGVyZWRdPVwiISFxdWVyeSAmJiAhaXNTZWFyY2hFeHRlcm5hbFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDwhLS0gUGxhY2Vob2xkZXIgdGV4dCAtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNMYWJlbHM7IGVsc2Ugc2VsZWN0ZWRCbG9ja1wiPnt7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIH19PC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDwhLS0gU3VtbWFyeSBzaG93biB3aGVuIGxhYmVscyBhcmUgaGlkZGVuIC0tPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3RlZEJsb2NrPiB7eyBzZWxlY3RlZE1lc3NhZ2UgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIFNlbGVjdCBkcm9wZG93biBtZW51IC0tPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cIm1lbnVcIlxuICAgICAgICAgICAgc3VpRHJvcGRvd25NZW51XG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25dPVwidHJhbnNpdGlvblwiXG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25EdXJhdGlvbl09XCJ0cmFuc2l0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgW21lbnVBdXRvU2VsZWN0Rmlyc3RdPVwidHJ1ZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhdmFpbGFibGVPcHRpb25zLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFtYXhTZWxlY3RlZFJlYWNoZWRcIiBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgbG9jYWxlVmFsdWVzLm5vUmVzdWx0c01lc3NhZ2UgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibWF4U2VsZWN0ZWRSZWFjaGVkXCIgY2xhc3M9XCJtZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IG1heFNlbGVjdGVkTWVzc2FnZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0IGlucHV0LnNlYXJjaCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyZW0gIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpTXVsdGlTZWxlY3Q8VCwgVT4gZXh0ZW5kcyBTdWlTZWxlY3RCYXNlPFQsIFU+XG4gICAgaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8VVtdPiB7XG4gICAgcHVibGljIHNlbGVjdGVkT3B0aW9uczpUW107XG4gICAgLy8gU3RvcmVzIHRoZSB2YWx1ZXMgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSBpdCBjYW4gYmUgbWF0Y2hlZCB0byBhbiBvcHRpb24gZnJvbSBgb3B0aW9uc2AuXG4gICAgcHJpdmF0ZSBfd3JpdHRlbk9wdGlvbnM/OlVbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBzZWxlY3RlZE9wdGlvbnNDaGFuZ2U6RXZlbnRFbWl0dGVyPFVbXT47XG5cbiAgICBwdWJsaWMgZ2V0IGZpbHRlcmVkT3B0aW9ucygpOlRbXSB7XG4gICAgICAgIGlmICh0aGlzLm1heFNlbGVjdGVkUmVhY2hlZCkge1xuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSByZWFjaGVkIHRoZSBtYXhpbXVtIG51bWJlciBvZiBzZWxlY3Rpb25zLCB0aGVuIGVtcHR5IHRoZSByZXN1bHRzIGNvbXBsZXRlbHkuXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHRzOlRbXSA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNMYWJlbHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hSZXN1bHRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmV0dXJucyB0aGUgc2VhcmNoIHJlc3VsdHMgXFwgc2VsZWN0ZWQgb3B0aW9ucy5cbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hSZXN1bHRzLmZpbHRlcihcbiAgICAgICAgICAgICAgICByID0+IHRoaXMuc2VsZWN0ZWRPcHRpb25zLmZpbmQobyA9PiByID09PSBvKSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGF2YWlsYWJsZU9wdGlvbnMoKTpUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzTGFiZWxzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaGFzTGFiZWxzKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNMYWJlbHM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBoYXNMYWJlbHMoaGFzTGFiZWxzOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGFzTGFiZWxzID0gaGFzTGFiZWxzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBwbGFjZWhvbGRlcigpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlciB8fCB0aGlzLmxvY2FsZVZhbHVlcy5tdWx0aS5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyOnN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1heFNlbGVjdGVkOm51bWJlcjtcblxuICAgIHB1YmxpYyBnZXQgbWF4U2VsZWN0ZWRSZWFjaGVkKCk6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm1heFNlbGVjdGVkID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gbWF4aW11bSB0aGVuIHdlIGNhbiBpbW1lZGlhdGVseSByZXR1cm4uXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA9PT0gdGhpcy5tYXhTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1heFNlbGVjdGVkTWVzc2FnZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLmludGVycG9sYXRlKFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVWYWx1ZXMubXVsdGkubWF4U2VsZWN0ZWRNZXNzYWdlLFxuICAgICAgICAgICAgW1tcIm1heFwiLCB0aGlzLm1heFNlbGVjdGVkLnRvU3RyaW5nKCldXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWRNZXNzYWdlKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUoXG4gICAgICAgICAgICB0aGlzLmxvY2FsZVZhbHVlcy5tdWx0aS5zZWxlY3RlZE1lc3NhZ2UsXG4gICAgICAgICAgICBbW1wiY291bnRcIiwgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoLnRvU3RyaW5nKCldXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLm11bHRpcGxlXCIpXG4gICAgcHVibGljIG11bHRpU2VsZWN0Q2xhc3Nlczpib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBsb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgcmVuZGVyZXIsIGxvY2FsaXphdGlvblNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxVW10+KCk7XG5cbiAgICAgICAgdGhpcy5oYXNMYWJlbHMgPSB0cnVlO1xuICAgICAgICB0aGlzLm11bHRpU2VsZWN0Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9wdGlvbnNVcGRhdGVIb29rKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdHRlbk9wdGlvbnMgJiYgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayB0aGUgb3B0aW9ucyBzdGlsbCBleGlzdC5cbiAgICAgICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fd3JpdHRlbk9wdGlvbnMgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgd2VyZSB2YWx1ZXMgd3JpdHRlbiBieSBuZ01vZGVsIGJlZm9yZSB0aGUgb3B0aW9ucyBoYWQgYmVlbiBsb2FkZWQsIHRoaXMgcnVucyB0byBmaXggaXQuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuX3dyaXR0ZW5PcHRpb25zXG4gICAgICAgICAgICAgICAgLy8gbm9uLW51bGwgYXNzZXJ0aW9uIGFkZGVkIGhlcmUgYmVjYXVzZSBUeXBlc2NyaXB0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSBub24tbnVsbCBmaWx0ZXIuXG4gICAgICAgICAgICAgICAgLm1hcCh2ID0+IHRoaXMuZmluZE9wdGlvbih0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucywgdikhKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIodiA9PiB2ICE9IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPT09IHRoaXMuX3dyaXR0ZW5PcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXR0ZW5PcHRpb25zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihvcHRpb246U3VpU2VsZWN0T3B0aW9uPFQ+KTp2b2lkIHtcbiAgICAgICAgc3VwZXIuaW5pdGlhbGlzZVJlbmRlcmVkT3B0aW9uKG9wdGlvbik7XG5cbiAgICAgICAgLy8gQm9sZGVucyB0aGUgaXRlbSBzbyBpdCBhcHBlYXJzIHNlbGVjdGVkIGluIHRoZSBkcm9wZG93bi5cbiAgICAgICAgb3B0aW9uLmlzQWN0aXZlID1cbiAgICAgICAgICAgICF0aGlzLmhhc0xhYmVscyAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMuaW5kZXhPZihvcHRpb24udmFsdWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucmVzZXRRdWVyeShmYWxzZSk7XG5cbiAgICAgICAgLy8gQXV0b21hdGljYWxseSByZWZvY3VzIHRoZSBzZWFyY2ggaW5wdXQgZm9yIGJldHRlciBrZXlib2FyZCBhY2Nlc3NpYmlsaXR5LlxuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhhc0xhYmVscykge1xuICAgICAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWVzOlVbXSk6dm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQsIHdlIGNhbiBpbW1lZGlhdGVseSBtYXRjaCB0aGUgbmdNb2RlbCB2YWx1ZXMgdG8gb3B0aW9ucy5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAvLyBub24tbnVsbCBhc3NlcnRpb24gYWRkZWQgaGVyZSBiZWNhdXNlIFR5cGVzY3JpcHQgZG9lc24ndCByZWNvZ25pc2UgdGhlIG5vbi1udWxsIGZpbHRlci5cbiAgICAgICAgICAgICAgICAgICAgLm1hcCh2ID0+IHRoaXMuZmluZE9wdGlvbih0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucywgdikhKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHYgPT4gdiAhPSB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlRmllbGQgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLmhhc0l0ZW1Mb29rdXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNlYXJjaCBzZXJ2aWNlIGhhcyBhIHNlbGVjdGVkIGxvb2t1cCBmdW5jdGlvbiwgbWFrZSB1c2Ugb2YgdGhhdCB0byBsb2FkIHRoZSBpbml0aWFsIHZhbHVlcy5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuaW5pdGlhbExvb2t1cCh2YWx1ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihpdGVtcyA9PiAodGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBpdGVtcykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY2FjaGUgdGhlIHdyaXR0ZW4gdmFsdWUgZm9yIHdoZW4gb3B0aW9ucyBhcmUgc2V0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cml0dGVuT3B0aW9ucyA9IHZhbHVlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkIHtcbiAgICAgICAgLy8gVXBkYXRlIHNlbGVjdGVkIG9wdGlvbnMgdG8gdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgb3B0aW9ucyBcXCB7b3B0aW9ufS5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5maWx0ZXIoc28gPT4gc28gIT09IG9wdGlvbik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zQ2hhbmdlLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5tYXAobyA9PiB0aGlzLnZhbHVlR2V0dGVyKG8pKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgcmVmb2N1cyB0aGUgc2VhcmNoIGlucHV0IGZvciBiZXR0ZXIga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eS5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNMYWJlbHMpIHtcbiAgICAgICAgICAgIHRoaXMub25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblF1ZXJ5SW5wdXRLZXlkb3duKGV2ZW50OktleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkJhY2tzcGFjZSAmJlxuICAgICAgICAgICAgdGhpcy5xdWVyeSA9PT0gXCJcIiAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIERlc2VsZWN0IHRoZSByaWdodG1vc3Qgb3B0aW9uIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBiYWNrc3BhY2UgaW4gdGhlIHNlYXJjaCBpbnB1dC5cbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RPcHRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNbdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGRpcmVjdGl2ZSBmb3IgdGhlIHNlbGVjdCB0byBzdXBwb3J0IG5nTW9kZWwuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktbXVsdGktc2VsZWN0XCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIihzZWxlY3RlZE9wdGlvbnNDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvcjxULCBVPiBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgVVtdLFxuICAgIFN1aU11bHRpU2VsZWN0PFQsIFU+XG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OlN1aU11bHRpU2VsZWN0PFQsIFU+KSB7XG4gICAgICAgIHN1cGVyKGhvc3QpO1xuICAgIH1cbn1cbiJdfQ==