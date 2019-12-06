import * as tslib_1 from "tslib";
import { Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, Directive, ElementRef, TemplateRef, Renderer2, OnDestroy } from "@angular/core";
import { Util } from "../../../misc/util/index";
import { DropdownService, SuiDropdownMenu } from "../../dropdown/index";
import { ISearchLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization/index";
import { SearchService } from "../services/search.service";
let SuiSearch = class SuiSearch {
    constructor(_element, renderer, _localizationService) {
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService();
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this.searchClasses = true;
        this.hasIcon = true;
        this.retainSelectedResult = true;
        this.searchDelay = 200;
        this.maxResults = 7;
        this.onResultSelected = new EventEmitter();
        this.transition = "scale";
        this.transitionDuration = 200;
        this._documentClickListener = renderer.listen("document", "click", (e) => this.onDocumentClick(e));
    }
    get isActive() {
        return this.dropdownService.isOpen;
    }
    // Gets & sets the placeholder text displayed inside the text input.
    get placeholder() {
        return this._placeholder || this.localeValues.placeholder;
    }
    set placeholder(placeholder) {
        this._placeholder = placeholder;
    }
    get localeValues() {
        return this._localizationService.override(this._localeValues, this.localeOverrides);
    }
    get query() {
        return this.searchService.query;
    }
    set query(query) {
        this.selectedResult = undefined;
        // Initialise a delayed search.
        this.searchService.updateQueryDelayed(query, () => 
        // Set the results open state depending on whether a query has been entered.
        this.dropdownService.setOpenState(this.searchService.query.length > 0));
    }
    set options(options) {
        if (options) {
            this.searchService.options = options;
        }
    }
    set optionsFilter(filter) {
        if (filter) {
            this.searchService.optionsFilter = filter;
        }
    }
    set optionsLookup(lookupFn) {
        this.searchService.optionsLookup = lookupFn;
    }
    set optionsField(field) {
        this.searchService.optionsField = field;
    }
    get resultFormatter() {
        if (this._resultFormatter) {
            return this._resultFormatter;
        }
        else if (this.searchService.optionsLookup) {
            return r => this.readValue(r);
        }
        else {
            return (r, q) => this.searchService.highlightMatches(this.readValue(r), q);
        }
    }
    set resultFormatter(formatter) {
        this._resultFormatter = formatter;
    }
    set searchDelay(delay) {
        this.searchService.searchDelay = delay;
    }
    get isSearching() {
        return this.searchService.isSearching;
    }
    get results() {
        return this.searchService.results.slice(0, this.maxResults);
    }
    ngAfterViewInit() {
        this._menu.service = this.dropdownService;
    }
    onLocaleUpdate() {
        this._localeValues = this._localizationService.get().search;
    }
    // Selects a result.
    select(result) {
        this.onResultSelected.emit(result);
        this.dropdownService.setOpenState(false);
        if (this.retainSelectedResult) {
            this.selectedResult = result;
            this.searchService.updateQuery(this.readValue(result));
        }
        else {
            this.searchService.updateQuery("");
        }
    }
    onClick(e) {
        this.open();
    }
    onFocusIn() {
        if (!this.dropdownService.isAnimating) {
            this.open();
        }
    }
    open() {
        if (this.searchService.query.length > 0) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
        }
    }
    onDocumentClick(e) {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    }
    // Reads the specified field from an item.
    readValue(object) {
        return Util.Object.readValue(object, this.searchService.optionsField);
    }
    ngOnDestroy() {
        this._documentClickListener();
    }
};
SuiSearch.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SuiLocalizationService }
];
tslib_1.__decorate([
    ViewChild(SuiDropdownMenu, { static: true })
], SuiSearch.prototype, "_menu", void 0);
tslib_1.__decorate([
    HostBinding("class.ui"),
    HostBinding("class.search")
], SuiSearch.prototype, "searchClasses", void 0);
tslib_1.__decorate([
    HostBinding("class.active")
], SuiSearch.prototype, "isActive", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "hasIcon", void 0);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "placeholder", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "options", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "optionsFilter", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "optionsLookup", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "optionsField", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "resultFormatter", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "resultTemplate", void 0);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "retainSelectedResult", void 0);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "searchDelay", null);
tslib_1.__decorate([
    HostBinding("class.loading")
], SuiSearch.prototype, "isSearching", null);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "maxResults", void 0);
tslib_1.__decorate([
    Output("resultSelected")
], SuiSearch.prototype, "onResultSelected", void 0);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "transition", void 0);
tslib_1.__decorate([
    Input()
], SuiSearch.prototype, "transitionDuration", void 0);
tslib_1.__decorate([
    HostListener("focusin")
], SuiSearch.prototype, "onFocusIn", null);
tslib_1.__decorate([
    HostListener("focusout", ["$event"])
], SuiSearch.prototype, "onFocusOut", null);
SuiSearch = tslib_1.__decorate([
    Component({
        selector: "sui-search",
        template: `
        <div class="ui input" [class.icon]="hasIcon" (click)="onClick($event)">
            <input
                class="prompt"
                type="text"
                [attr.placeholder]="placeholder"
                autocomplete="off"
                [(ngModel)]="query"
            />
            <i *ngIf="hasIcon" class="search icon"></i>
        </div>
        <div
            class="results"
            suiDropdownMenu
            [menuTransition]="transition"
            [menuTransitionDuration]="transitionDuration"
            menuSelectedItemClass="active"
        >
            <sui-search-result
                *ngFor="let r of results"
                class="item"
                [value]="r"
                [query]="query"
                [formatter]="resultFormatter"
                [template]="resultTemplate"
                (click)="select(r)"
            ></sui-search-result>

            <div *ngIf="results.length == 0" class="message empty">
                <div class="header">{{ localeValues.noResults.header }}</div>
                <div class="description">
                    {{ localeValues.noResults.message }}
                </div>
            </div>
        </div>
    `,
        styles: [`
            /* Ensures results div has margin. */
            :host {
                display: inline-block;
            }

            /* Fixes positioning when results are pushed above the search. */
            .results {
                margin-bottom: 0.5em;
            }
        `]
    })
], SuiSearch);
export { SuiSearch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWFyY2gvY29tcG9uZW50cy9zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILElBQUksRUFHUCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUNILG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3pCLE1BQU0sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBMkQzRCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBOElsQixZQUNZLFFBQW1CLEVBQzNCLFFBQWtCLEVBQ1Ysb0JBQTJDO1FBRjNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFFbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtRQUVuRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBUSxDQUFDO1FBRS9DLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUN0RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQ3hCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FB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RSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7d0NBQ2Y7QUFNOUI7SUFGQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLFdBQVcsQ0FBQyxjQUFjLENBQUM7Z0RBQ0M7QUFHN0I7SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDO3lDQUczQjtBQUlEO0lBREMsS0FBSyxFQUFFOzBDQUNlO0FBTXZCO0lBREMsS0FBSyxFQUFFOzRDQUdQO0FBaUNEO0lBREMsS0FBSyxFQUFFO3dDQUtQO0FBR0Q7SUFEQyxLQUFLLEVBQUU7OENBS1A7QUFHRDtJQURDLEtBQUssRUFBRTs4Q0FHUDtBQUdEO0lBREMsS0FBSyxFQUFFOzZDQUdQO0FBZ0JEO0lBREMsS0FBSyxFQUFFO2dEQUtQO0FBR0Q7SUFEQyxLQUFLLEVBQUU7aURBQzZDO0FBR3JEO0lBREMsS0FBSyxFQUFFO3VEQUM0QjtBQUdwQztJQURDLEtBQUssRUFBRTs0Q0FHUDtBQUdEO0lBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs0Q0FHNUI7QUFHRDtJQURDLEtBQUssRUFBRTs2Q0FDaUI7QUFXekI7SUFEQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7bURBQ2U7QUFHeEM7SUFEQyxLQUFLLEVBQUU7NkNBQ2lCO0FBR3pCO0lBREMsS0FBSyxFQUFFO3FEQUN5QjtBQTZEakM7SUFEQyxZQUFZLENBQUMsU0FBUyxDQUFDOzBDQUt2QjtBQVVEO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzJDQUtwQztBQXpOUSxTQUFTO0lBcERyQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUNUO2lCQUVHOzs7Ozs7Ozs7O1NBVUM7S0FFUixDQUFDO0dBQ1csU0FBUyxDQTRPckI7U0E1T1ksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdDaGlsZCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFJlbmRlcmVyMixcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgVXRpbCxcbiAgICBJVGVtcGxhdGVSZWZDb250ZXh0LFxuICAgIElGb2N1c0V2ZW50XG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IERyb3Bkb3duU2VydmljZSwgU3VpRHJvcGRvd25NZW51IH0gZnJvbSBcIi4uLy4uL2Ryb3Bkb3duL2luZGV4XCI7XG5pbXBvcnQge1xuICAgIElTZWFyY2hMb2NhbGVWYWx1ZXMsXG4gICAgUmVjdXJzaXZlUGFydGlhbCxcbiAgICBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlXG59IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3NlYXJjaC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb29rdXBGbiwgRmlsdGVyRm4gfSBmcm9tIFwiLi4vaGVscGVycy9sb29rdXAtZm5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVzdWx0Q29udGV4dDxUPiBleHRlbmRzIElUZW1wbGF0ZVJlZkNvbnRleHQ8VD4ge1xuICAgIHF1ZXJ5OnN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXNlYXJjaFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBpbnB1dFwiIFtjbGFzcy5pY29uXT1cImhhc0ljb25cIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInByb21wdFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicXVlcnlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiaGFzSWNvblwiIGNsYXNzPVwic2VhcmNoIGljb25cIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInJlc3VsdHNcIlxuICAgICAgICAgICAgc3VpRHJvcGRvd25NZW51XG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25dPVwidHJhbnNpdGlvblwiXG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25EdXJhdGlvbl09XCJ0cmFuc2l0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgbWVudVNlbGVjdGVkSXRlbUNsYXNzPVwiYWN0aXZlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHN1aS1zZWFyY2gtcmVzdWx0XG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHIgb2YgcmVzdWx0c1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwiclwiXG4gICAgICAgICAgICAgICAgW3F1ZXJ5XT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0dGVyXT1cInJlc3VsdEZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cInJlc3VsdFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHIpXCJcbiAgICAgICAgICAgID48L3N1aS1zZWFyY2gtcmVzdWx0PlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzdWx0cy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibWVzc2FnZSBlbXB0eVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj57eyBsb2NhbGVWYWx1ZXMubm9SZXN1bHRzLmhlYWRlciB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBsb2NhbGVWYWx1ZXMubm9SZXN1bHRzLm1lc3NhZ2UgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAvKiBFbnN1cmVzIHJlc3VsdHMgZGl2IGhhcyBtYXJnaW4uICovXG4gICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBGaXhlcyBwb3NpdGlvbmluZyB3aGVuIHJlc3VsdHMgYXJlIHB1c2hlZCBhYm92ZSB0aGUgc2VhcmNoLiAqL1xuICAgICAgICAgICAgLnJlc3VsdHMge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNWVtO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTZWFyY2g8VD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBkcm9wZG93blNlcnZpY2U6RHJvcGRvd25TZXJ2aWNlO1xuICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOlNlYXJjaFNlcnZpY2U8VCwgVD47XG5cbiAgICBAVmlld0NoaWxkKFN1aURyb3Bkb3duTWVudSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9tZW51OlN1aURyb3Bkb3duTWVudTtcblxuICAgIC8vIFNldHMgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICAvLyBEb2luZyBpdCBvbiB0aGUgaG9zdCBlbmFibGVzIHVzZSBpbiBtZW51cyBldGMuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5zZWFyY2hcIilcbiAgICBwdWJsaWMgc2VhcmNoQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuO1xuICAgIH1cblxuICAgIC8vIFNldHMgd2hldGhlciB0aGUgc2VhcmNoIGVsZW1lbnQgaGFzIGEgdmlzaWJsZSBzZWFyY2ggaWNvbi5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBoYXNJY29uOmJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjpzdHJpbmc7XG5cbiAgICAvLyBHZXRzICYgc2V0cyB0aGUgcGxhY2Vob2xkZXIgdGV4dCBkaXNwbGF5ZWQgaW5zaWRlIHRoZSB0ZXh0IGlucHV0LlxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBwbGFjZWhvbGRlcigpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlciB8fCB0aGlzLmxvY2FsZVZhbHVlcy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyOnN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvY2FsZVZhbHVlczpJU2VhcmNoTG9jYWxlVmFsdWVzO1xuXG4gICAgcHVibGljIGxvY2FsZU92ZXJyaWRlczpSZWN1cnNpdmVQYXJ0aWFsPElTZWFyY2hMb2NhbGVWYWx1ZXM+O1xuXG4gICAgcHVibGljIGdldCBsb2NhbGVWYWx1ZXMoKTpJU2VhcmNoTG9jYWxlVmFsdWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2Uub3ZlcnJpZGU8XCJzZWFyY2hcIj4oXG4gICAgICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMsXG4gICAgICAgICAgICB0aGlzLmxvY2FsZU92ZXJyaWRlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcXVlcnkoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcXVlcnkocXVlcnk6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIEluaXRpYWxpc2UgYSBkZWxheWVkIHNlYXJjaC5cbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5RGVsYXllZChxdWVyeSwgKCkgPT5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgcmVzdWx0cyBvcGVuIHN0YXRlIGRlcGVuZGluZyBvbiB3aGV0aGVyIGEgcXVlcnkgaGFzIGJlZW4gZW50ZXJlZC5cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkubGVuZ3RoID4gMFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6VFtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0ZpbHRlcihmaWx0ZXI6RmlsdGVyRm48VD4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0xvb2t1cChsb29rdXBGbjpMb29rdXBGbjxUPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0xvb2t1cCA9IGxvb2t1cEZuO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zRmllbGQoZmllbGQ6c3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmllbGQgPSBmaWVsZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXN1bHRGb3JtYXR0ZXI/OihyOlQsIHE6c3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0IHJlc3VsdEZvcm1hdHRlcigpOihyZXN1bHQ6VCwgcXVlcnk6c3RyaW5nKSA9PiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fcmVzdWx0Rm9ybWF0dGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0Rm9ybWF0dGVyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zTG9va3VwKSB7XG4gICAgICAgICAgICByZXR1cm4gciA9PiB0aGlzLnJlYWRWYWx1ZShyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAociwgcSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuaGlnaGxpZ2h0TWF0Y2hlcyh0aGlzLnJlYWRWYWx1ZShyKSwgcSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcmVzdWx0Rm9ybWF0dGVyKFxuICAgICAgICBmb3JtYXR0ZXI6KHJlc3VsdDpULCBxdWVyeTpzdHJpbmcpID0+IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLl9yZXN1bHRGb3JtYXR0ZXIgPSBmb3JtYXR0ZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmVzdWx0VGVtcGxhdGU6VGVtcGxhdGVSZWY8SVJlc3VsdENvbnRleHQ8VD4+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmV0YWluU2VsZWN0ZWRSZXN1bHQ6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBzZWFyY2hEZWxheShkZWxheTpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaERlbGF5ID0gZGVsYXk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MubG9hZGluZ1wiKVxuICAgIHB1YmxpYyBnZXQgaXNTZWFyY2hpbmcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5pc1NlYXJjaGluZztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXhSZXN1bHRzOm51bWJlcjtcblxuICAgIHB1YmxpYyBnZXQgcmVzdWx0cygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5zbGljZSgwLCB0aGlzLm1heFJlc3VsdHMpO1xuICAgIH1cblxuICAgIC8vIFN0b3JlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJlc3VsdC5cbiAgICBwdWJsaWMgc2VsZWN0ZWRSZXN1bHQ/OlQ7XG5cbiAgICAvLyBFbWl0cyB3aGVuZXZlciBhIG5ldyByZXN1bHQgaXMgc2VsZWN0ZWQuXG4gICAgQE91dHB1dChcInJlc3VsdFNlbGVjdGVkXCIpXG4gICAgcHVibGljIG9uUmVzdWx0U2VsZWN0ZWQ6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRDbGlja0xpc3RlbmVyOigpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICByZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX2xvY2FsaXphdGlvblNlcnZpY2U6U3VpTG9jYWxpemF0aW9uU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZSA9IG5ldyBEcm9wZG93blNlcnZpY2UoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2U8VCwgVD4oKTtcblxuICAgICAgICB0aGlzLm9uTG9jYWxlVXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2Uub25MYW5ndWFnZVVwZGF0ZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoQ2xhc3NlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFzSWNvbiA9IHRydWU7XG4gICAgICAgIHRoaXMucmV0YWluU2VsZWN0ZWRSZXN1bHQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlYXJjaERlbGF5ID0gMjAwO1xuICAgICAgICB0aGlzLm1heFJlc3VsdHMgPSA3O1xuXG4gICAgICAgIHRoaXMub25SZXN1bHRTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBcInNjYWxlXCI7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gMjAwO1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgIFwiZG9jdW1lbnRcIixcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIChlOk1vdXNlRXZlbnQpID0+IHRoaXMub25Eb2N1bWVudENsaWNrKGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLl9tZW51LnNlcnZpY2UgPSB0aGlzLmRyb3Bkb3duU2VydmljZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTG9jYWxlVXBkYXRlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2xvY2FsZVZhbHVlcyA9IHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2UuZ2V0KCkuc2VhcmNoO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdHMgYSByZXN1bHQuXG4gICAgcHVibGljIHNlbGVjdChyZXN1bHQ6VCk6dm9pZCB7XG4gICAgICAgIHRoaXMub25SZXN1bHRTZWxlY3RlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucmV0YWluU2VsZWN0ZWRSZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkodGhpcy5yZWFkVmFsdWUocmVzdWx0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkoXCJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNpblwiKVxuICAgIHB1YmxpYyBvbkZvY3VzSW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duU2VydmljZS5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBPbmx5IG9wZW4gb24gY2xpY2sgd2hlbiB0aGVyZSBpcyBhIHF1ZXJ5IGVudGVyZWQuXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KGU6SUZvY3VzRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uRG9jdW1lbnRDbGljayhlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWFkcyB0aGUgc3BlY2lmaWVkIGZpZWxkIGZyb20gYW4gaXRlbS5cbiAgICBwdWJsaWMgcmVhZFZhbHVlKG9iamVjdDpUKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gVXRpbC5PYmplY3QucmVhZFZhbHVlPFQsIHN0cmluZz4oXG4gICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpZWxkXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgIH1cbn1cbiJdfQ==