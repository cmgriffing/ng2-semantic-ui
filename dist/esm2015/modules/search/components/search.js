import * as tslib_1 from "tslib";
import { Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, Directive, ElementRef, TemplateRef, Renderer2, OnDestroy } from "@angular/core";
import { SearchService } from "../services/search.service";
import { Util } from "../../../misc/util/helpers/util";
import { DropdownService } from "../../../modules/dropdown/services/dropdown.service";
import { SuiDropdownMenu } from "../../../modules/dropdown/directives/dropdown-menu";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
let SuiSearch = class SuiSearch {
    constructor(_element, _renderer, _localizationService) {
        this._element = _element;
        this._renderer = _renderer;
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
        this._documentClickListener = _renderer.listen("document", "click", (e) => this.onDocumentClick(e));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWFyY2gvY29tcG9uZW50cy9zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxJQUFJLEVBQXVCLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUtyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQTJEdkcsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQThJbEIsWUFDWSxRQUFtQixFQUNqQixTQUFtQixFQUNyQixvQkFBMkM7UUFGM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ3JCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7UUFFbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQVEsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FDdEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUN4QixDQUFD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IFZpZXdDaGlsZCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFJlbmRlcmVyMixcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvb2t1cEZuLCBGaWx0ZXJGbiB9IGZyb20gXCIuLi9oZWxwZXJzL2xvb2t1cC1mblwiO1xuaW1wb3J0IHsgVXRpbCwgSVRlbXBsYXRlUmVmQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy91dGlsXCI7XG5pbXBvcnQgeyBEcm9wZG93blNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9kcm9wZG93bi9zZXJ2aWNlcy9kcm9wZG93bi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdWlEcm9wZG93bk1lbnUgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy9kcm9wZG93bi9kaXJlY3RpdmVzL2Ryb3Bkb3duLW1lbnVcIjtcbmltcG9ydCB7XG4gICAgSVNlYXJjaExvY2FsZVZhbHVlcyxcbiAgICBSZWN1cnNpdmVQYXJ0aWFsXG59IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2ludGVyZmFjZXMvdmFsdWVzXCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vc2VydmljZXMvbG9jYWxpemF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IElGb2N1c0V2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2ZvY3VzLWV2ZW50XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3VsdENvbnRleHQ8VD4gZXh0ZW5kcyBJVGVtcGxhdGVSZWZDb250ZXh0PFQ+IHtcbiAgICBxdWVyeTpzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zZWFyY2hcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidWkgaW5wdXRcIiBbY2xhc3MuaWNvbl09XCJoYXNJY29uXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJwcm9tcHRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInF1ZXJ5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8aSAqbmdJZj1cImhhc0ljb25cIiBjbGFzcz1cInNlYXJjaCBpY29uXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJyZXN1bHRzXCJcbiAgICAgICAgICAgIHN1aURyb3Bkb3duTWVudVxuICAgICAgICAgICAgW21lbnVUcmFuc2l0aW9uXT1cInRyYW5zaXRpb25cIlxuICAgICAgICAgICAgW21lbnVUcmFuc2l0aW9uRHVyYXRpb25dPVwidHJhbnNpdGlvbkR1cmF0aW9uXCJcbiAgICAgICAgICAgIG1lbnVTZWxlY3RlZEl0ZW1DbGFzcz1cImFjdGl2ZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzdWktc2VhcmNoLXJlc3VsdFxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCByIG9mIHJlc3VsdHNcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cInJcIlxuICAgICAgICAgICAgICAgIFtxdWVyeV09XCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgW2Zvcm1hdHRlcl09XCJyZXN1bHRGb3JtYXR0ZXJcIlxuICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJyZXN1bHRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChyKVwiXG4gICAgICAgICAgICA+PC9zdWktc2VhcmNoLXJlc3VsdD5cblxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInJlc3VsdHMubGVuZ3RoID09IDBcIiBjbGFzcz1cIm1lc3NhZ2UgZW1wdHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+e3sgbG9jYWxlVmFsdWVzLm5vUmVzdWx0cy5oZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAge3sgbG9jYWxlVmFsdWVzLm5vUmVzdWx0cy5tZXNzYWdlIH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgLyogRW5zdXJlcyByZXN1bHRzIGRpdiBoYXMgbWFyZ2luLiAqL1xuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogRml4ZXMgcG9zaXRpb25pbmcgd2hlbiByZXN1bHRzIGFyZSBwdXNoZWQgYWJvdmUgdGhlIHNlYXJjaC4gKi9cbiAgICAgICAgICAgIC5yZXN1bHRzIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpU2VhcmNoPFQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgZHJvcGRvd25TZXJ2aWNlOkRyb3Bkb3duU2VydmljZTtcbiAgICBwdWJsaWMgc2VhcmNoU2VydmljZTpTZWFyY2hTZXJ2aWNlPFQsIFQ+O1xuXG4gICAgQFZpZXdDaGlsZChTdWlEcm9wZG93bk1lbnUsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfbWVudTpTdWlEcm9wZG93bk1lbnU7XG5cbiAgICAvLyBTZXRzIHRoZSBTZW1hbnRpYyBVSSBjbGFzc2VzIG9uIHRoZSBob3N0IGVsZW1lbnQuXG4gICAgLy8gRG9pbmcgaXQgb24gdGhlIGhvc3QgZW5hYmxlcyB1c2UgaW4gbWVudXMgZXRjLlxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc2VhcmNoXCIpXG4gICAgcHVibGljIHNlYXJjaENsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlbjtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHdoZXRoZXIgdGhlIHNlYXJjaCBlbGVtZW50IGhhcyBhIHZpc2libGUgc2VhcmNoIGljb24uXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaGFzSWNvbjpib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6c3RyaW5nO1xuXG4gICAgLy8gR2V0cyAmIHNldHMgdGhlIHBsYWNlaG9sZGVyIHRleHQgZGlzcGxheWVkIGluc2lkZSB0aGUgdGV4dCBpbnB1dC5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgcGxhY2Vob2xkZXIoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXIgfHwgdGhpcy5sb2NhbGVWYWx1ZXMucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBwbGFjZWhvbGRlcihwbGFjZWhvbGRlcjpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2NhbGVWYWx1ZXM6SVNlYXJjaExvY2FsZVZhbHVlcztcblxuICAgIHB1YmxpYyBsb2NhbGVPdmVycmlkZXM6UmVjdXJzaXZlUGFydGlhbDxJU2VhcmNoTG9jYWxlVmFsdWVzPjtcblxuICAgIHB1YmxpYyBnZXQgbG9jYWxlVmFsdWVzKCk6SVNlYXJjaExvY2FsZVZhbHVlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLm92ZXJyaWRlPFwic2VhcmNoXCI+KFxuICAgICAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzLFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVPdmVycmlkZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHF1ZXJ5KCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHF1ZXJ5KHF1ZXJ5OnN0cmluZykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBJbml0aWFsaXNlIGEgZGVsYXllZCBzZWFyY2guXG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS51cGRhdGVRdWVyeURlbGF5ZWQocXVlcnksICgpID0+XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHJlc3VsdHMgb3BlbiBzdGF0ZSBkZXBlbmRpbmcgb24gd2hldGhlciBhIHF1ZXJ5IGhhcyBiZWVuIGVudGVyZWQuXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Lmxlbmd0aCA+IDBcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9ucyhvcHRpb25zOlRbXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNGaWx0ZXIoZmlsdGVyOkZpbHRlckZuPFQ+IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNMb29rdXAobG9va3VwRm46TG9va3VwRm48VD4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNMb29rdXAgPSBsb29rdXBGbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0ZpZWxkKGZpZWxkOnN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpZWxkID0gZmllbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzdWx0Rm9ybWF0dGVyPzoocjpULCBxOnN0cmluZykgPT4gc3RyaW5nO1xuXG4gICAgcHVibGljIGdldCByZXN1bHRGb3JtYXR0ZXIoKToocmVzdWx0OlQsIHF1ZXJ5OnN0cmluZykgPT4gc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdEZvcm1hdHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdEZvcm1hdHRlcjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0xvb2t1cCkge1xuICAgICAgICAgICAgcmV0dXJuIHIgPT4gdGhpcy5yZWFkVmFsdWUocik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKHIsIHEpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmhpZ2hsaWdodE1hdGNoZXModGhpcy5yZWFkVmFsdWUociksIHEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHJlc3VsdEZvcm1hdHRlcihcbiAgICAgICAgZm9ybWF0dGVyOihyZXN1bHQ6VCwgcXVlcnk6c3RyaW5nKSA9PiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0Rm9ybWF0dGVyID0gZm9ybWF0dGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJlc3VsdFRlbXBsYXRlOlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHJldGFpblNlbGVjdGVkUmVzdWx0OmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgc2VhcmNoRGVsYXkoZGVsYXk6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2hEZWxheSA9IGRlbGF5O1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmxvYWRpbmdcIilcbiAgICBwdWJsaWMgZ2V0IGlzU2VhcmNoaW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UuaXNTZWFyY2hpbmc7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbWF4UmVzdWx0czpudW1iZXI7XG5cbiAgICBwdWJsaWMgZ2V0IHJlc3VsdHMoKTpUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMuc2xpY2UoMCwgdGhpcy5tYXhSZXN1bHRzKTtcbiAgICB9XG5cbiAgICAvLyBTdG9yZXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByZXN1bHQuXG4gICAgcHVibGljIHNlbGVjdGVkUmVzdWx0PzpUO1xuXG4gICAgLy8gRW1pdHMgd2hlbmV2ZXIgYSBuZXcgcmVzdWx0IGlzIHNlbGVjdGVkLlxuICAgIEBPdXRwdXQoXCJyZXN1bHRTZWxlY3RlZFwiKVxuICAgIHB1YmxpYyBvblJlc3VsdFNlbGVjdGVkOkV2ZW50RW1pdHRlcjxUPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRyYW5zaXRpb246c3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbkR1cmF0aW9uOm51bWJlcjtcblxuICAgIHByaXZhdGUgX2RvY3VtZW50Q2xpY2tMaXN0ZW5lcjooKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX2xvY2FsaXphdGlvblNlcnZpY2U6U3VpTG9jYWxpemF0aW9uU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZSA9IG5ldyBEcm9wZG93blNlcnZpY2UoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2U8VCwgVD4oKTtcblxuICAgICAgICB0aGlzLm9uTG9jYWxlVXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2Uub25MYW5ndWFnZVVwZGF0ZS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoQ2xhc3NlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFzSWNvbiA9IHRydWU7XG4gICAgICAgIHRoaXMucmV0YWluU2VsZWN0ZWRSZXN1bHQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlYXJjaERlbGF5ID0gMjAwO1xuICAgICAgICB0aGlzLm1heFJlc3VsdHMgPSA3O1xuXG4gICAgICAgIHRoaXMub25SZXN1bHRTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBcInNjYWxlXCI7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gMjAwO1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IF9yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICBcImRvY3VtZW50XCIsXG4gICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAoZTpNb3VzZUV2ZW50KSA9PiB0aGlzLm9uRG9jdW1lbnRDbGljayhlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVudS5zZXJ2aWNlID0gdGhpcy5kcm9wZG93blNlcnZpY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxvY2FsZVVwZGF0ZSgpOnZvaWQge1xuICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMgPSB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLmdldCgpLnNlYXJjaDtcbiAgICB9XG5cbiAgICAvLyBTZWxlY3RzIGEgcmVzdWx0LlxuICAgIHB1YmxpYyBzZWxlY3QocmVzdWx0OlQpOnZvaWQge1xuICAgICAgICB0aGlzLm9uUmVzdWx0U2VsZWN0ZWQuZW1pdChyZXN1bHQpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuXG4gICAgICAgIGlmICh0aGlzLnJldGFpblNlbGVjdGVkUmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5KHRoaXMucmVhZFZhbHVlKHJlc3VsdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5KFwiXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soZTpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3VzaW5cIilcbiAgICBwdWJsaWMgb25Gb2N1c0luKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kcm9wZG93blNlcnZpY2UuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gT25seSBvcGVuIG9uIGNsaWNrIHdoZW4gdGhlcmUgaXMgYSBxdWVyeSBlbnRlcmVkLlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25Gb2N1c091dChlOklGb2N1c0V2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkRvY3VtZW50Q2xpY2soZTpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVhZHMgdGhlIHNwZWNpZmllZCBmaWVsZCBmcm9tIGFuIGl0ZW0uXG4gICAgcHVibGljIHJlYWRWYWx1ZShvYmplY3Q6VCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFV0aWwuT2JqZWN0LnJlYWRWYWx1ZTxULCBzdHJpbmc+KFxuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWVsZFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOnZvaWQge1xuICAgICAgICB0aGlzLl9kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICB9XG59XG4iXX0=