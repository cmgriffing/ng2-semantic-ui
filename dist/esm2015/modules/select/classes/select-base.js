import * as tslib_1 from "tslib";
import { ViewChild, HostBinding, HostListener, Input, ContentChildren, ContentChild, EventEmitter, Output } from "@angular/core";
import { DropdownService, SuiDropdownMenu } from "../../dropdown/index";
import { SearchService } from "../../search/index";
import { Util, KeyCode } from "../../../misc/util/index";
import { SuiSelectOption } from "../components/select-option";
import { SuiSelectSearch } from "../directives/select-search";
// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
export class SuiSelectBase {
    constructor(_element, renderer, _localizationService) {
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService(true);
        this.isSearchable = false;
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this._renderedSubscriptions = [];
        this.icon = "dropdown";
        this.transition = "slide down";
        this.transitionDuration = 200;
        this.onTouched = new EventEmitter();
        this._documentKeyDownListener = renderer.listen("document", "keydown", (e) => this.onDocumentKeyDown(e));
        this.selectClasses = true;
    }
    get isActive() {
        return this.dropdownService.isOpen;
    }
    get isVisible() {
        return this._menu.isVisible;
    }
    get searchClass() {
        return this.isSearchable && !this.isSearchExternal;
    }
    get isSearching() {
        return this.searchService.isSearching;
    }
    get searchInput() {
        return this._manualSearch || this._internalSearch;
    }
    get tabIndex() {
        if (this.isDisabled) {
            // If disabled, remove from tabindex.
            return -1;
        }
        if (this.dropdownService.isOpen && this.isSearchExternal) {
            // If open & in menu search, remove from tabindex (as input always autofocusses).
            return -1;
        }
        if (this._tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this._tabIndex;
        }
        if (this.searchClass) {
            // If search input enabled, tab goes to input.
            return -1;
        }
        // Otherwise, return default of 0.
        return 0;
    }
    get isDisabled() {
        return this.dropdownService.isDisabled;
    }
    set isDisabled(value) {
        this.dropdownService.isDisabled = !!value;
    }
    set options(options) {
        if (options) {
            this.searchService.options = options;
            this.optionsUpdateHook();
        }
    }
    set optionsFilter(filter) {
        if (filter) {
            this.searchService.optionsFilter = filter;
            this.optionsUpdateHook();
        }
    }
    set optionsLookup(lookup) {
        if (lookup) {
            this.searchService.optionsLookup = lookup;
            this.optionsUpdateHook();
        }
    }
    get filteredOptions() {
        return this.searchService.results;
    }
    // Deprecated
    get availableOptions() {
        return this.filteredOptions;
    }
    get query() {
        return this.isSearchable ? this.searchService.query : undefined;
    }
    set query(query) {
        if (query != undefined) {
            this.queryUpdateHook();
            this.updateQuery(query);
            // Update the rendered text as query has changed.
            this._renderedOptions.forEach(ro => this.initialiseRenderedOption(ro));
            if (this.searchInput) {
                this.searchInput.query = query;
            }
        }
    }
    get labelField() {
        return this.searchService.optionsField;
    }
    set labelField(field) {
        this.searchService.optionsField = field;
    }
    get labelGetter() {
        // Helper function to retrieve the label from an item.
        return (obj) => {
            const label = Util.Object.readValue(obj, this.labelField);
            if (label != undefined) {
                return label.toString();
            }
            return "";
        };
    }
    get valueGetter() {
        // Helper function to retrieve the value from an item.
        return (obj) => Util.Object.readValue(obj, this.valueField);
    }
    get configuredFormatter() {
        if (this._optionFormatter) {
            return o => this._optionFormatter(o, this.isSearchable ? this.query : undefined);
        }
        else if (this.searchService.optionsLookup) {
            return o => this.labelGetter(o);
        }
        else {
            return o => this.searchService.highlightMatches(this.labelGetter(o), this.query || "");
        }
    }
    set optionFormatter(formatter) {
        this._optionFormatter = formatter;
    }
    get localeValues() {
        return this._localizationService.override(this._localeValues, this.localeOverrides);
    }
    ngAfterContentInit() {
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._renderedOptions;
        if (this._manualSearch) {
            this.isSearchable = true;
            this.isSearchExternal = true;
        }
        if (this.searchInput) {
            this.searchInput.onQueryUpdated.subscribe((q) => (this.query = q));
            this.searchInput.onQueryKeyDown.subscribe((e) => this.onQueryInputKeydown(e));
        }
        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
    }
    onLocaleUpdate() {
        this._localeValues = this._localizationService.get().select;
    }
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    optionsUpdateHook() { }
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    queryUpdateHook() { }
    updateQuery(query) {
        // Update the query then open the dropdown, as after keyboard input it should always be open.
        this.searchService.updateQuery(query, () => this.dropdownService.setOpenState(true));
    }
    resetQuery(delayed = true) {
        // The search delay is set to the transition duration to ensure results
        // aren't rendered as the select closes as that causes a sudden flash.
        if (delayed) {
            this.searchService.searchDelay = this._menu.menuTransitionDuration;
            this.searchService.updateQueryDelayed("");
        }
        else {
            this.searchService.updateQuery("");
        }
        if (this.searchInput) {
            this.searchInput.query = "";
        }
    }
    onAvailableOptionsRendered() {
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSubscriptions = [];
        this._renderedOptions.forEach(ro => {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(() => this.initialiseRenderedOption(ro));
            this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
        });
        // If no options have been provided, autogenerate them from the rendered ones.
        if (this.searchService.options.length === 0 &&
            !this.searchService.optionsLookup) {
            this.options = this._renderedOptions.map(ro => ro.value);
        }
    }
    initialiseRenderedOption(option) {
        option.usesTemplate = !!this.optionTemplate;
        option.formatter = this.configuredFormatter;
        if (option.usesTemplate) {
            this.drawTemplate(option.templateSibling, option.value);
        }
        option.changeDetector.markForCheck();
    }
    findOption(options, value) {
        // Tries to find an option in options array
        return options.find(o => value === this.valueGetter(o));
    }
    onCaretClick(e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (!this.dropdownService.isAnimating) {
                this.dropdownService.setOpenState(!this.dropdownService.isOpen);
                this.focus();
            }
        }
    }
    onClick(e) {
        if (!e.eventHandled && !this.dropdownService.isAnimating) {
            e.eventHandled = true;
            // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
            this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);
            // Immediately focus the search input whenever clicking on the select.
            this.focus();
        }
    }
    onFocusIn() {
        if (!this.dropdownService.isOpen && !this.dropdownService.isAnimating) {
            this.dropdownService.setOpenState(true);
            this.focus();
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
            this.onTouched.emit();
        }
    }
    onKeyPress(e) {
        if (e.keyCode === KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
        }
    }
    onDocumentKeyDown(e) {
        if (this._element.nativeElement.contains(e.target) &&
            !this.dropdownService.isOpen &&
            e.keyCode === KeyCode.Down) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
            e.preventDefault();
        }
    }
    onQueryInputKeydown(event) { }
    focus() {
        if (this.isSearchable && this.searchInput) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this.searchInput.focus();
        }
        else {
            this._element.nativeElement.focus();
        }
    }
    // Helper that draws the provided template beside the provided ViewContainerRef.
    drawTemplate(siblingRef, value) {
        siblingRef.clear();
        // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
        siblingRef.createEmbeddedView(this.optionTemplate, {
            $implicit: value,
            query: this.query
        });
    }
    ngOnDestroy() {
        this._renderedSubscriptions.forEach(s => s.unsubscribe());
        this._documentKeyDownListener();
    }
}
tslib_1.__decorate([
    ViewChild(SuiDropdownMenu, { static: true })
], SuiSelectBase.prototype, "_menu", void 0);
tslib_1.__decorate([
    ContentChildren(SuiSelectOption, { descendants: true })
], SuiSelectBase.prototype, "_renderedOptions", void 0);
tslib_1.__decorate([
    HostBinding("class.ui"),
    HostBinding("class.dropdown")
], SuiSelectBase.prototype, "selectClasses", void 0);
tslib_1.__decorate([
    HostBinding("class.active")
], SuiSelectBase.prototype, "isActive", null);
tslib_1.__decorate([
    HostBinding("class.visible")
], SuiSelectBase.prototype, "isVisible", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "isSearchable", void 0);
tslib_1.__decorate([
    HostBinding("class.search")
], SuiSelectBase.prototype, "searchClass", null);
tslib_1.__decorate([
    HostBinding("class.loading")
], SuiSelectBase.prototype, "isSearching", null);
tslib_1.__decorate([
    ViewChild(SuiSelectSearch, { static: true })
], SuiSelectBase.prototype, "_internalSearch", void 0);
tslib_1.__decorate([
    ContentChild(SuiSelectSearch, { static: true })
], SuiSelectBase.prototype, "_manualSearch", void 0);
tslib_1.__decorate([
    Input("tabindex")
], SuiSelectBase.prototype, "_tabIndex", void 0);
tslib_1.__decorate([
    HostBinding("attr.tabindex")
], SuiSelectBase.prototype, "tabIndex", null);
tslib_1.__decorate([
    HostBinding("class.disabled"),
    Input()
], SuiSelectBase.prototype, "isDisabled", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "options", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "optionsFilter", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "optionsLookup", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "labelField", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "valueField", void 0);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "optionTemplate", void 0);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "optionFormatter", null);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "icon", void 0);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "transition", void 0);
tslib_1.__decorate([
    Input()
], SuiSelectBase.prototype, "transitionDuration", void 0);
tslib_1.__decorate([
    Output("touched")
], SuiSelectBase.prototype, "onTouched", void 0);
tslib_1.__decorate([
    HostListener("click", ["$event"])
], SuiSelectBase.prototype, "onClick", null);
tslib_1.__decorate([
    HostListener("focusin")
], SuiSelectBase.prototype, "onFocusIn", null);
tslib_1.__decorate([
    HostListener("focusout", ["$event"])
], SuiSelectBase.prototype, "onFocusOut", null);
tslib_1.__decorate([
    HostListener("keypress", ["$event"])
], SuiSelectBase.prototype, "onKeyPress", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NlbGVjdC9jbGFzc2VzL3NlbGVjdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFFWCxZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFLZixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQXNCLE1BQU0sb0JBQW9CLENBQUM7QUFDdkUsT0FBTyxFQUNILElBQUksRUFHSixPQUFPLEVBRVYsTUFBTSwwQkFBMEIsQ0FBQztBQU1sQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTTlELGdGQUFnRjtBQUNoRiw2RUFBNkU7QUFDN0UsTUFBTSxPQUFnQixhQUFhO0lBc08vQixZQUNZLFFBQW1CLEVBQzNCLFFBQWtCLEVBQ1Isb0JBQTJDO1FBRjdDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFFakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtRQUVyRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQU8sSUFBSSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQ3RELElBQUksQ0FB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O2dEQUNrQjtBQW1KcEM7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7NENBYWpDO0FBR0Q7SUFEQyxZQUFZLENBQUMsU0FBUyxDQUFDOzhDQU92QjtBQUdEO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOytDQU1wQztBQUdEO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOytDQU9wQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgVmlld0NoaWxkLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IHsgRHJvcGRvd25TZXJ2aWNlLCBTdWlEcm9wZG93bk1lbnUgfSBmcm9tIFwiLi4vLi4vZHJvcGRvd24vaW5kZXhcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UsIExvb2t1cEZuLCBGaWx0ZXJGbiB9IGZyb20gXCIuLi8uLi9zZWFyY2gvaW5kZXhcIjtcbmltcG9ydCB7XG4gICAgVXRpbCxcbiAgICBJVGVtcGxhdGVSZWZDb250ZXh0LFxuICAgIEhhbmRsZWRFdmVudCxcbiAgICBLZXlDb2RlLFxuICAgIElGb2N1c0V2ZW50XG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7XG4gICAgSVNlbGVjdExvY2FsZVZhbHVlcyxcbiAgICBSZWN1cnNpdmVQYXJ0aWFsLFxuICAgIFN1aUxvY2FsaXphdGlvblNlcnZpY2Vcbn0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL3NlbGVjdC1vcHRpb25cIjtcbmltcG9ydCB7IFN1aVNlbGVjdFNlYXJjaCB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL3NlbGVjdC1zZWFyY2hcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uQ29udGV4dDxUPiBleHRlbmRzIElUZW1wbGF0ZVJlZkNvbnRleHQ8VD4ge1xuICAgIHF1ZXJ5PzpzdHJpbmc7XG59XG5cbi8vIFdlIHVzZSBnZW5lcmljIHR5cGUgVCB0byBzcGVjaWZ5IHRoZSB0eXBlIG9mIHRoZSBvcHRpb25zIHdlIGFyZSB3b3JraW5nIHdpdGgsXG4vLyBhbmQgVSB0byBzcGVjaWZ5IHRoZSB0eXBlIG9mIHRoZSBwcm9wZXJ0eSBvZiB0aGUgb3B0aW9uIHVzZWQgYXMgdGhlIHZhbHVlLlxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN1aVNlbGVjdEJhc2U8VCwgVT5cbiAgICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgcHVibGljIGRyb3Bkb3duU2VydmljZTpEcm9wZG93blNlcnZpY2U7XG4gICAgcHVibGljIHNlYXJjaFNlcnZpY2U6U2VhcmNoU2VydmljZTxULCBVPjtcblxuICAgIEBWaWV3Q2hpbGQoU3VpRHJvcGRvd25NZW51LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHByb3RlY3RlZCBfbWVudTpTdWlEcm9wZG93bk1lbnU7XG5cbiAgICAvLyBLZWVwIHRyYWNrIG9mIGFsbCBvZiB0aGUgcmVuZGVyZWQgc2VsZWN0IG9wdGlvbnMuIChSZW5kZXJlZCBieSB0aGUgdXNlciB1c2luZyAqbmdGb3IpLlxuICAgIEBDb250ZW50Q2hpbGRyZW4oU3VpU2VsZWN0T3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gICAgcHJvdGVjdGVkIF9yZW5kZXJlZE9wdGlvbnM6UXVlcnlMaXN0PFN1aVNlbGVjdE9wdGlvbjxUPj47XG5cbiAgICAvLyBLZWVwIHRyYWNrIG9mIGFsbCBvZiB0aGUgc3Vic2NyaXB0aW9ucyB0byB0aGUgc2VsZWN0ZWQgZXZlbnRzIG9uIHRoZSByZW5kZXJlZCBvcHRpb25zLlxuICAgIHByaXZhdGUgX3JlbmRlcmVkU3Vic2NyaXB0aW9uczpTdWJzY3JpcHRpb25bXTtcblxuICAgIC8vIFNldHMgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRyb3Bkb3duXCIpXG4gICAgcHVibGljIHNlbGVjdENsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlbjtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy52aXNpYmxlXCIpXG4gICAgcHVibGljIGdldCBpc1Zpc2libGUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbnUuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzU2VhcmNoYWJsZTpib29sZWFuO1xuXG4gICAgcHVibGljIGlzU2VhcmNoRXh0ZXJuYWw6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnNlYXJjaFwiKVxuICAgIHB1YmxpYyBnZXQgc2VhcmNoQ2xhc3MoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWFyY2hhYmxlICYmICF0aGlzLmlzU2VhcmNoRXh0ZXJuYWw7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MubG9hZGluZ1wiKVxuICAgIHB1YmxpYyBnZXQgaXNTZWFyY2hpbmcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5pc1NlYXJjaGluZztcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFN1aVNlbGVjdFNlYXJjaCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9pbnRlcm5hbFNlYXJjaD86U3VpU2VsZWN0U2VhcmNoO1xuXG4gICAgQENvbnRlbnRDaGlsZChTdWlTZWxlY3RTZWFyY2gsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfbWFudWFsU2VhcmNoPzpTdWlTZWxlY3RTZWFyY2g7XG5cbiAgICBwdWJsaWMgZ2V0IHNlYXJjaElucHV0KCk6U3VpU2VsZWN0U2VhcmNoIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hbnVhbFNlYXJjaCB8fCB0aGlzLl9pbnRlcm5hbFNlYXJjaDtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJ0YWJpbmRleFwiKVxuICAgIHByaXZhdGUgX3RhYkluZGV4PzpudW1iZXI7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLnRhYmluZGV4XCIpXG4gICAgcHVibGljIGdldCB0YWJJbmRleCgpOm51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIElmIGRpc2FibGVkLCByZW1vdmUgZnJvbSB0YWJpbmRleC5cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuICYmIHRoaXMuaXNTZWFyY2hFeHRlcm5hbCkge1xuICAgICAgICAgICAgLy8gSWYgb3BlbiAmIGluIG1lbnUgc2VhcmNoLCByZW1vdmUgZnJvbSB0YWJpbmRleCAoYXMgaW5wdXQgYWx3YXlzIGF1dG9mb2N1c3NlcykuXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RhYkluZGV4ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgY3VzdG9tIHRhYmluZGV4LCBkZWZhdWx0IHRvIHRoYXQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFiSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoQ2xhc3MpIHtcbiAgICAgICAgICAgIC8vIElmIHNlYXJjaCBpbnB1dCBlbmFibGVkLCB0YWIgZ29lcyB0byBpbnB1dC5cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHJldHVybiBkZWZhdWx0IG9mIDAuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRpc2FibGVkXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWQoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc0Rpc2FibGVkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2UuaXNEaXNhYmxlZCA9ICEhdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnMob3B0aW9uczpUW10pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICAgICAgdGhpcy5vcHRpb25zVXBkYXRlSG9vaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNGaWx0ZXIoZmlsdGVyOkZpbHRlckZuPFQ+IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmlsdGVyID0gZmlsdGVyO1xuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNVcGRhdGVIb29rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0xvb2t1cChsb29rdXA6TG9va3VwRm48VCwgVT4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGxvb2t1cCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNMb29rdXAgPSBsb29rdXA7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1VwZGF0ZUhvb2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZmlsdGVyZWRPcHRpb25zKCk6VFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzO1xuICAgIH1cblxuICAgIC8vIERlcHJlY2F0ZWRcbiAgICBwdWJsaWMgZ2V0IGF2YWlsYWJsZU9wdGlvbnMoKTpUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBxdWVyeSgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2VhcmNoYWJsZSA/IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHF1ZXJ5KHF1ZXJ5OnN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocXVlcnkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5VXBkYXRlSG9vaygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVyeShxdWVyeSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlbmRlcmVkIHRleHQgYXMgcXVlcnkgaGFzIGNoYW5nZWQuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZE9wdGlvbnMuZm9yRWFjaChybyA9PlxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGlzZVJlbmRlcmVkT3B0aW9uKHJvKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgbGFiZWxGaWVsZCgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpZWxkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbGFiZWxGaWVsZChmaWVsZDpzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWVsZCA9IGZpZWxkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGFiZWxHZXR0ZXIoKToob2JqOlQpID0+IHN0cmluZyB7XG4gICAgICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byByZXRyaWV2ZSB0aGUgbGFiZWwgZnJvbSBhbiBpdGVtLlxuICAgICAgICByZXR1cm4gKG9iajpUKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IFV0aWwuT2JqZWN0LnJlYWRWYWx1ZTxULCBzdHJpbmc+KFxuICAgICAgICAgICAgICAgIG9iaixcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsRmllbGRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAobGFiZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhYmVsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZUZpZWxkOnN0cmluZztcblxuICAgIHB1YmxpYyBnZXQgdmFsdWVHZXR0ZXIoKToob2JqOlQpID0+IFUge1xuICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgdGhlIHZhbHVlIGZyb20gYW4gaXRlbS5cbiAgICAgICAgcmV0dXJuIChvYmo6VCkgPT4gVXRpbC5PYmplY3QucmVhZFZhbHVlPFQsIFU+KG9iaiwgdGhpcy52YWx1ZUZpZWxkKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvcHRpb25UZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJT3B0aW9uQ29udGV4dDxUPj47XG5cbiAgICBwcml2YXRlIF9vcHRpb25Gb3JtYXR0ZXI/OihvOlQsIHE/OnN0cmluZykgPT4gc3RyaW5nO1xuXG4gICAgcHVibGljIGdldCBjb25maWd1cmVkRm9ybWF0dGVyKCk6KG9wdGlvbjpUKSA9PiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9uRm9ybWF0dGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbyA9PlxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbkZvcm1hdHRlciEoXG4gICAgICAgICAgICAgICAgICAgIG8sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTZWFyY2hhYmxlID8gdGhpcy5xdWVyeSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNMb29rdXApIHtcbiAgICAgICAgICAgIHJldHVybiBvID0+IHRoaXMubGFiZWxHZXR0ZXIobyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbyA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5oaWdobGlnaHRNYXRjaGVzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsR2V0dGVyKG8pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5IHx8IFwiXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbkZvcm1hdHRlcihcbiAgICAgICAgZm9ybWF0dGVyOigob3B0aW9uOlQsIHF1ZXJ5PzpzdHJpbmcpID0+IHN0cmluZykgfCB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgICAgdGhpcy5fb3B0aW9uRm9ybWF0dGVyID0gZm9ybWF0dGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvY2FsZVZhbHVlczpJU2VsZWN0TG9jYWxlVmFsdWVzO1xuICAgIHB1YmxpYyBsb2NhbGVPdmVycmlkZXM6UmVjdXJzaXZlUGFydGlhbDxJU2VsZWN0TG9jYWxlVmFsdWVzPjtcblxuICAgIHB1YmxpYyBnZXQgbG9jYWxlVmFsdWVzKCk6SVNlbGVjdExvY2FsZVZhbHVlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLm92ZXJyaWRlPFwic2VsZWN0XCI+KFxuICAgICAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzLFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVPdmVycmlkZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpY29uOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRyYW5zaXRpb246c3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbkR1cmF0aW9uOm51bWJlcjtcblxuICAgIEBPdXRwdXQoXCJ0b3VjaGVkXCIpXG4gICAgcHVibGljIG9uVG91Y2hlZDpFdmVudEVtaXR0ZXI8dm9pZD47XG5cbiAgICBwcml2YXRlIF9kb2N1bWVudEtleURvd25MaXN0ZW5lcjooKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBwcm90ZWN0ZWQgX2xvY2FsaXphdGlvblNlcnZpY2U6U3VpTG9jYWxpemF0aW9uU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZSA9IG5ldyBEcm9wZG93blNlcnZpY2UoKTtcbiAgICAgICAgLy8gV2UgZG8gd2FudCBhbiBlbXB0eSBxdWVyeSB0byByZXR1cm4gYWxsIHJlc3VsdHMuXG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlPFQsIFU+KHRydWUpO1xuXG4gICAgICAgIHRoaXMuaXNTZWFyY2hhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5vbkxvY2FsZVVwZGF0ZSgpO1xuICAgICAgICB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLm9uTGFuZ3VhZ2VVcGRhdGUuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLm9uTG9jYWxlVXBkYXRlKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRTdWJzY3JpcHRpb25zID0gW107XG5cbiAgICAgICAgdGhpcy5pY29uID0gXCJkcm9wZG93blwiO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBcInNsaWRlIGRvd25cIjtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gPSAyMDA7XG5cbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50S2V5RG93bkxpc3RlbmVyID0gcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgXCJkb2N1bWVudFwiLFxuICAgICAgICAgICAgXCJrZXlkb3duXCIsXG4gICAgICAgICAgICAoZTpLZXlib2FyZEV2ZW50KSA9PiB0aGlzLm9uRG9jdW1lbnRLZXlEb3duKGUpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX21lbnUuc2VydmljZSA9IHRoaXMuZHJvcGRvd25TZXJ2aWNlO1xuICAgICAgICAvLyBXZSBtYW51YWxseSBzcGVjaWZ5IHRoZSBtZW51IGl0ZW1zIHRvIHRoZSBtZW51IGJlY2F1c2UgdGhlIEBDb250ZW50Q2hpbGRyZW4gZG9lc24ndCBwaWNrIHVwIG91ciBkeW5hbWljYWxseSByZW5kZXJlZCBpdGVtcy5cbiAgICAgICAgdGhpcy5fbWVudS5pdGVtcyA9IHRoaXMuX3JlbmRlcmVkT3B0aW9ucztcblxuICAgICAgICBpZiAodGhpcy5fbWFudWFsU2VhcmNoKSB7XG4gICAgICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzU2VhcmNoRXh0ZXJuYWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQub25RdWVyeVVwZGF0ZWQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChxOnN0cmluZykgPT4gKHRoaXMucXVlcnkgPSBxKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQub25RdWVyeUtleURvd24uc3Vic2NyaWJlKChlOktleWJvYXJkRXZlbnQpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vblF1ZXJ5SW5wdXRLZXlkb3duKGUpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbXVzdCBjYWxsIHRoaXMgaW1tZWRpYXRlbHkgYXMgY2hhbmdlcyBkb2Vzbid0IGZpcmUgd2hlbiB5b3Ugc3Vic2NyaWJlLlxuICAgICAgICB0aGlzLm9uQXZhaWxhYmxlT3B0aW9uc1JlbmRlcmVkKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkT3B0aW9ucy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxvY2FsZVVwZGF0ZSgpOnZvaWQge1xuICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMgPSB0aGlzLl9sb2NhbGl6YXRpb25TZXJ2aWNlLmdldCgpLnNlbGVjdDtcbiAgICB9XG5cbiAgICAvLyBIb29rIGlzIGhlcmUgc2luY2UgVHlwZXNjcmlwdCBkb2Vzbid0IHlldCBzdXBwb3J0IG92ZXJyaWRpbmcgZ2V0dGVycyAmIHNldHRlcnMgd2hpbGUgc3RpbGwgY2FsbGluZyB0aGUgc3VwZXJjbGFzcy5cbiAgICBwcm90ZWN0ZWQgb3B0aW9uc1VwZGF0ZUhvb2soKTp2b2lkIHt9XG5cbiAgICAvLyBIb29rIGlzIGhlcmUgc2luY2UgVHlwZXNjcmlwdCBkb2Vzbid0IHlldCBzdXBwb3J0IG92ZXJyaWRpbmcgZ2V0dGVycyAmIHNldHRlcnMgd2hpbGUgc3RpbGwgY2FsbGluZyB0aGUgc3VwZXJjbGFzcy5cbiAgICBwcm90ZWN0ZWQgcXVlcnlVcGRhdGVIb29rKCk6dm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVF1ZXJ5KHF1ZXJ5OnN0cmluZyk6dm9pZCB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcXVlcnkgdGhlbiBvcGVuIHRoZSBkcm9wZG93biwgYXMgYWZ0ZXIga2V5Ym9hcmQgaW5wdXQgaXQgc2hvdWxkIGFsd2F5cyBiZSBvcGVuLlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkocXVlcnksICgpID0+XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUodHJ1ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVzZXRRdWVyeShkZWxheWVkOmJvb2xlYW4gPSB0cnVlKTp2b2lkIHtcbiAgICAgICAgLy8gVGhlIHNlYXJjaCBkZWxheSBpcyBzZXQgdG8gdGhlIHRyYW5zaXRpb24gZHVyYXRpb24gdG8gZW5zdXJlIHJlc3VsdHNcbiAgICAgICAgLy8gYXJlbid0IHJlbmRlcmVkIGFzIHRoZSBzZWxlY3QgY2xvc2VzIGFzIHRoYXQgY2F1c2VzIGEgc3VkZGVuIGZsYXNoLlxuICAgICAgICBpZiAoZGVsYXllZCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaERlbGF5ID0gdGhpcy5fbWVudS5tZW51VHJhbnNpdGlvbkR1cmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5RGVsYXllZChcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS51cGRhdGVRdWVyeShcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LnF1ZXJ5ID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpOnZvaWQge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBwcmV2aW91cyBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIG1lbW9yeSBsZWFrcyBvbiBsYXJnZSBzZWxlY3RzLlxuICAgICAgICB0aGlzLl9yZW5kZXJlZFN1YnNjcmlwdGlvbnMuZm9yRWFjaChycyA9PiBycy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRTdWJzY3JpcHRpb25zID0gW107XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZWRPcHRpb25zLmZvckVhY2gocm8gPT4ge1xuICAgICAgICAgICAgLy8gU2xpZ2h0bHkgZGVsYXkgaW5pdGlhbGlzYXRpb24gdG8gYXZvaWQgY2hhbmdlIGFmdGVyIGNoZWNrZWQgZXJyb3JzLiBUT0RPIC0gbG9vayBpbnRvIGF2b2lkaW5nIHRoaXMhXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW5pdGlhbGlzZVJlbmRlcmVkT3B0aW9uKHJvKSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgIHJvLm9uU2VsZWN0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2VsZWN0T3B0aW9uKHJvLnZhbHVlKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIElmIG5vIG9wdGlvbnMgaGF2ZSBiZWVuIHByb3ZpZGVkLCBhdXRvZ2VuZXJhdGUgdGhlbSBmcm9tIHRoZSByZW5kZXJlZCBvbmVzLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICF0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0xvb2t1cFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuX3JlbmRlcmVkT3B0aW9ucy5tYXAocm8gPT4gcm8udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihvcHRpb246U3VpU2VsZWN0T3B0aW9uPFQ+KTp2b2lkIHtcbiAgICAgICAgb3B0aW9uLnVzZXNUZW1wbGF0ZSA9ICEhdGhpcy5vcHRpb25UZW1wbGF0ZTtcbiAgICAgICAgb3B0aW9uLmZvcm1hdHRlciA9IHRoaXMuY29uZmlndXJlZEZvcm1hdHRlcjtcblxuICAgICAgICBpZiAob3B0aW9uLnVzZXNUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3VGVtcGxhdGUob3B0aW9uLnRlbXBsYXRlU2libGluZywgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbi5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgc2VsZWN0T3B0aW9uKG9wdGlvbjpUKTp2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGZpbmRPcHRpb24ob3B0aW9uczpUW10sIHZhbHVlOlUpOlQgfCB1bmRlZmluZWQge1xuICAgICAgICAvLyBUcmllcyB0byBmaW5kIGFuIG9wdGlvbiBpbiBvcHRpb25zIGFycmF5XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbmQobyA9PiB2YWx1ZSA9PT0gdGhpcy52YWx1ZUdldHRlcihvKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2FyZXRDbGljayhlOkhhbmRsZWRFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmICghZS5ldmVudEhhbmRsZWQpIHtcbiAgICAgICAgICAgIGUuZXZlbnRIYW5kbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duU2VydmljZS5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZSghdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uQ2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkICYmICF0aGlzLmRyb3Bkb3duU2VydmljZS5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgZS5ldmVudEhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZHJvcGRvd24gaXMgc2VhcmNoYWJsZSwgY2xpY2tpbmcgc2hvdWxkIGtlZXAgaXQgb3Blbiwgb3RoZXJ3aXNlIHdlIHRvZ2dsZSB0aGUgb3BlbiBzdGF0ZS5cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA/IHRydWUgOiAhdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBJbW1lZGlhdGVseSBmb2N1cyB0aGUgc2VhcmNoIGlucHV0IHdoZW5ldmVyIGNsaWNraW5nIG9uIHRoZSBzZWxlY3QuXG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNpblwiKVxuICAgIHB1YmxpYyBvbkZvY3VzSW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duU2VydmljZS5pc09wZW4gJiYgIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUodHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uRm9jdXNPdXQoZTpJRm9jdXNFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwia2V5cHJlc3NcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbktleVByZXNzKGU6S2V5Ym9hcmRFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtleUNvZGUuRW50ZXIpIHtcbiAgICAgICAgICAgIC8vIEVuYWJsZXMgc3VwcG9ydCBmb3IgZm9jdXNzaW5nIGFuZCBvcGVuaW5nIHdpdGggdGhlIGtleWJvYXJkIGFsb25lLlxuICAgICAgICAgICAgLy8gVXNpbmcgZGlyZWN0bHkgYmVjYXVzZSBSZW5kZXJlcjIgZG9lc24ndCBoYXZlIGludm9rZUVsZW1lbnRNZXRob2QgbWV0aG9kIGFueW1vcmUuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkRvY3VtZW50S2V5RG93bihlOktleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpICYmXG4gICAgICAgICAgICAhdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuICYmXG4gICAgICAgICAgICBlLmtleUNvZGUgPT09IEtleUNvZGUuRG93blxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIEVuYWJsZXMgc3VwcG9ydCBmb3IgZm9jdXNzaW5nIGFuZCBvcGVuaW5nIHdpdGggdGhlIGtleWJvYXJkIGFsb25lLlxuICAgICAgICAgICAgLy8gVXNpbmcgZGlyZWN0bHkgYmVjYXVzZSBSZW5kZXJlcjIgZG9lc24ndCBoYXZlIGludm9rZUVsZW1lbnRNZXRob2QgbWV0aG9kIGFueW1vcmUuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uUXVlcnlJbnB1dEtleWRvd24oZXZlbnQ6S2V5Ym9hcmRFdmVudCk6dm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGZvY3VzKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzU2VhcmNoYWJsZSAmJiB0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICAvLyBGb2N1c3NlcyB0aGUgc2VhcmNoIGlucHV0IG9ubHkgd2hlbiBzZWFyY2hhYmxlLlxuICAgICAgICAgICAgLy8gVXNpbmcgZGlyZWN0bHkgYmVjYXVzZSBSZW5kZXJlcjIgZG9lc24ndCBoYXZlIGludm9rZUVsZW1lbnRNZXRob2QgbWV0aG9kIGFueW1vcmUuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhlbHBlciB0aGF0IGRyYXdzIHRoZSBwcm92aWRlZCB0ZW1wbGF0ZSBiZXNpZGUgdGhlIHByb3ZpZGVkIFZpZXdDb250YWluZXJSZWYuXG4gICAgcHJvdGVjdGVkIGRyYXdUZW1wbGF0ZShzaWJsaW5nUmVmOlZpZXdDb250YWluZXJSZWYsIHZhbHVlOlQpOnZvaWQge1xuICAgICAgICBzaWJsaW5nUmVmLmNsZWFyKCk7XG4gICAgICAgIC8vIFVzZSBvZiBgJGltcGxpY2l0YCBtZWFucyB1c2Ugb2YgPG5nLXRlbXBsYXRlIGxldC1vcHRpb24+IHN5bnRheCBpcyBzdXBwb3J0ZWQuXG4gICAgICAgIHNpYmxpbmdSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMub3B0aW9uVGVtcGxhdGUsIHtcbiAgICAgICAgICAgICRpbXBsaWNpdDogdmFsdWUsXG4gICAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudEtleURvd25MaXN0ZW5lcigpO1xuICAgIH1cbn1cbiJdfQ==