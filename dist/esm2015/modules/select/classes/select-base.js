import * as tslib_1 from "tslib";
import { ViewChild, HostBinding, HostListener, Input, ContentChildren, ContentChild, EventEmitter, Output } from "@angular/core";
import { SuiSelectOption } from "../components/select-option";
import { SuiSelectSearch } from "../directives/select-search";
import { DropdownService } from "../../../modules/dropdown/services/dropdown.service";
import { SuiDropdownMenu } from "../../../modules/dropdown/directives/dropdown-menu";
import { SearchService } from "../../../modules/search/services/search.service";
import { Util, KeyCode } from "../../../misc/util/helpers/util";
// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
export class SuiSelectBase {
    constructor(_element, _renderer, _localizationService) {
        this._element = _element;
        this._renderer = _renderer;
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
        this._documentKeyDownListener = _renderer.listen("document", "keydown", (e) => this.onDocumentKeyDown(e));
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
        return this.manualSearch || this.internalSearch;
    }
    get tabIndexBinding() {
        if (this.isDisabled) {
            // If disabled, remove from tabindex.
            return -1;
        }
        if (this.dropdownService.isOpen && this.isSearchExternal) {
            // If open & in menu search, remove from tabindex (as input always autofocusses).
            return -1;
        }
        if (this.tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this.tabIndex;
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
        if (this.manualSearch) {
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
        option.markForCheck();
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
], SuiSelectBase.prototype, "internalSearch", void 0);
tslib_1.__decorate([
    ContentChild(SuiSelectSearch, { static: true })
], SuiSelectBase.prototype, "manualSearch", void 0);
tslib_1.__decorate([
    Input("tabindex")
], SuiSelectBase.prototype, "tabIndex", void 0);
tslib_1.__decorate([
    HostBinding("attr.tabindex")
], SuiSelectBase.prototype, "tabIndexBinding", null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NlbGVjdC9jbGFzc2VzL3NlbGVjdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFFWCxZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFLZixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN0RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2hGLE9BQU8sRUFDSCxJQUFJLEVBRUosT0FBTyxFQUVWLE1BQU0saUNBQWlDLENBQUM7QUFhekMsZ0ZBQWdGO0FBQ2hGLDZFQUE2RTtBQUM3RSxNQUFNLE9BQWdCLGFBQWE7SUFzTy9CLFlBQ1ksUUFBbUIsRUFDakIsU0FBbUIsRUFDbkIsb0JBQTJDO1FBRjdDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1FBRXJELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM3QyxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBTyxJQUFJLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFD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REMsS0FBSyxFQUFFO3lEQUN5QjtBQUdqQztJQURDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0RBQ2tCO0FBbUpwQztJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0Q0FhakM7QUFHRDtJQURDLFlBQVksQ0FBQyxTQUFTLENBQUM7OENBT3ZCO0FBR0Q7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7K0NBTXBDO0FBR0Q7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7K0NBT3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBWaWV3Q2hpbGQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgT25EZXN0cm95LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anMtY29tcGF0L1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IHsgU3VpU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc2VsZWN0LW9wdGlvblwiO1xuaW1wb3J0IHsgU3VpU2VsZWN0U2VhcmNoIH0gZnJvbSBcIi4uL2RpcmVjdGl2ZXMvc2VsZWN0LXNlYXJjaFwiO1xuaW1wb3J0IHsgRHJvcGRvd25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvZHJvcGRvd24vc2VydmljZXMvZHJvcGRvd24uc2VydmljZVwiO1xuaW1wb3J0IHsgU3VpRHJvcGRvd25NZW51IH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvZHJvcGRvd24vZGlyZWN0aXZlcy9kcm9wZG93bi1tZW51XCI7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC5zZXJ2aWNlXCI7XG5pbXBvcnQge1xuICAgIFV0aWwsXG4gICAgSGFuZGxlZEV2ZW50LFxuICAgIEtleUNvZGUsXG4gICAgSVRlbXBsYXRlUmVmQ29udGV4dFxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvdXRpbFwiO1xuaW1wb3J0IHtcbiAgICBJU2VsZWN0TG9jYWxlVmFsdWVzLFxuICAgIFJlY3Vyc2l2ZVBhcnRpYWxcbn0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW50ZXJmYWNlcy92YWx1ZXNcIjtcbmltcG9ydCB7IFN1aUxvY2FsaXphdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9zZXJ2aWNlcy9sb2NhbGl6YXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgRmlsdGVyRm4sIExvb2t1cEZuIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvc2VhcmNoL2hlbHBlcnMvbG9va3VwLWZuXCI7XG5pbXBvcnQgeyBJRm9jdXNFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9mb2N1cy1ldmVudFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25Db250ZXh0PFQ+IGV4dGVuZHMgSVRlbXBsYXRlUmVmQ29udGV4dDxUPiB7XG4gICAgcXVlcnk/OnN0cmluZztcbn1cblxuLy8gV2UgdXNlIGdlbmVyaWMgdHlwZSBUIHRvIHNwZWNpZnkgdGhlIHR5cGUgb2YgdGhlIG9wdGlvbnMgd2UgYXJlIHdvcmtpbmcgd2l0aCxcbi8vIGFuZCBVIHRvIHNwZWNpZnkgdGhlIHR5cGUgb2YgdGhlIHByb3BlcnR5IG9mIHRoZSBvcHRpb24gdXNlZCBhcyB0aGUgdmFsdWUuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3VpU2VsZWN0QmFzZTxULCBVPlxuICAgIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgZHJvcGRvd25TZXJ2aWNlOkRyb3Bkb3duU2VydmljZTtcbiAgICBwdWJsaWMgc2VhcmNoU2VydmljZTpTZWFyY2hTZXJ2aWNlPFQsIFU+O1xuXG4gICAgQFZpZXdDaGlsZChTdWlEcm9wZG93bk1lbnUsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJvdGVjdGVkIF9tZW51OlN1aURyb3Bkb3duTWVudTtcblxuICAgIC8vIEtlZXAgdHJhY2sgb2YgYWxsIG9mIHRoZSByZW5kZXJlZCBzZWxlY3Qgb3B0aW9ucy4gKFJlbmRlcmVkIGJ5IHRoZSB1c2VyIHVzaW5nICpuZ0ZvcikuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlTZWxlY3RPcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBwcm90ZWN0ZWQgX3JlbmRlcmVkT3B0aW9uczpRdWVyeUxpc3Q8U3VpU2VsZWN0T3B0aW9uPFQ+PjtcblxuICAgIC8vIEtlZXAgdHJhY2sgb2YgYWxsIG9mIHRoZSBzdWJzY3JpcHRpb25zIHRvIHRoZSBzZWxlY3RlZCBldmVudHMgb24gdGhlIHJlbmRlcmVkIG9wdGlvbnMuXG4gICAgcHJpdmF0ZSBfcmVuZGVyZWRTdWJzY3JpcHRpb25zOlN1YnNjcmlwdGlvbltdO1xuXG4gICAgLy8gU2V0cyB0aGUgU2VtYW50aWMgVUkgY2xhc3NlcyBvbiB0aGUgaG9zdCBlbGVtZW50LlxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZHJvcGRvd25cIilcbiAgICBwdWJsaWMgc2VsZWN0Q2xhc3Nlczpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnZpc2libGVcIilcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVudS5pc1Zpc2libGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNTZWFyY2hhYmxlOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgaXNTZWFyY2hFeHRlcm5hbDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc2VhcmNoXCIpXG4gICAgcHVibGljIGdldCBzZWFyY2hDbGFzcygpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NlYXJjaGFibGUgJiYgIXRoaXMuaXNTZWFyY2hFeHRlcm5hbDtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5sb2FkaW5nXCIpXG4gICAgcHVibGljIGdldCBpc1NlYXJjaGluZygpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLmlzU2VhcmNoaW5nO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoU3VpU2VsZWN0U2VhcmNoLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyBpbnRlcm5hbFNlYXJjaD86U3VpU2VsZWN0U2VhcmNoO1xuXG4gICAgQENvbnRlbnRDaGlsZChTdWlTZWxlY3RTZWFyY2gsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIG1hbnVhbFNlYXJjaD86U3VpU2VsZWN0U2VhcmNoO1xuXG4gICAgcHVibGljIGdldCBzZWFyY2hJbnB1dCgpOlN1aVNlbGVjdFNlYXJjaCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hbnVhbFNlYXJjaCB8fCB0aGlzLmludGVybmFsU2VhcmNoO1xuICAgIH1cblxuICAgIEBJbnB1dChcInRhYmluZGV4XCIpXG4gICAgcHVibGljIHRhYkluZGV4PzpudW1iZXI7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLnRhYmluZGV4XCIpXG4gICAgcHVibGljIGdldCB0YWJJbmRleEJpbmRpbmcoKTpudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAvLyBJZiBkaXNhYmxlZCwgcmVtb3ZlIGZyb20gdGFiaW5kZXguXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlbiAmJiB0aGlzLmlzU2VhcmNoRXh0ZXJuYWwpIHtcbiAgICAgICAgICAgIC8vIElmIG9wZW4gJiBpbiBtZW51IHNlYXJjaCwgcmVtb3ZlIGZyb20gdGFiaW5kZXggKGFzIGlucHV0IGFsd2F5cyBhdXRvZm9jdXNzZXMpLlxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRhYkluZGV4ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgY3VzdG9tIHRhYmluZGV4LCBkZWZhdWx0IHRvIHRoYXQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWJJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hDbGFzcykge1xuICAgICAgICAgICAgLy8gSWYgc2VhcmNoIGlucHV0IGVuYWJsZWQsIHRhYiBnb2VzIHRvIGlucHV0LlxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgcmV0dXJuIGRlZmF1bHQgb2YgMC5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZGlzYWJsZWRcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaXNEaXNhYmxlZCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9wZG93blNlcnZpY2UuaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzRGlzYWJsZWQodmFsdWU6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5pc0Rpc2FibGVkID0gISF2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9ucyhvcHRpb25zOlRbXSkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNVcGRhdGVIb29rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0ZpbHRlcihmaWx0ZXI6RmlsdGVyRm48VD4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1VwZGF0ZUhvb2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zTG9va3VwKGxvb2t1cDpMb29rdXBGbjxULCBVPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobG9va3VwKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0xvb2t1cCA9IGxvb2t1cDtcblxuICAgICAgICAgICAgdGhpcy5vcHRpb25zVXBkYXRlSG9vaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmaWx0ZXJlZE9wdGlvbnMoKTpUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHM7XG4gICAgfVxuXG4gICAgLy8gRGVwcmVjYXRlZFxuICAgIHB1YmxpYyBnZXQgYXZhaWxhYmxlT3B0aW9ucygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkT3B0aW9ucztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHF1ZXJ5KCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWFyY2hhYmxlID8gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcXVlcnkocXVlcnk6c3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChxdWVyeSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlVcGRhdGVIb29rKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVuZGVyZWQgdGV4dCBhcyBxdWVyeSBoYXMgY2hhbmdlZC5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkT3B0aW9ucy5mb3JFYWNoKHJvID0+XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXNlUmVuZGVyZWRPcHRpb24ocm8pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBsYWJlbEZpZWxkKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmllbGQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBsYWJlbEZpZWxkKGZpZWxkOnN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpZWxkID0gZmllbGQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYWJlbEdldHRlcigpOihvYmo6VCkgPT4gc3RyaW5nIHtcbiAgICAgICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHJldHJpZXZlIHRoZSBsYWJlbCBmcm9tIGFuIGl0ZW0uXG4gICAgICAgIHJldHVybiAob2JqOlQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gVXRpbC5PYmplY3QucmVhZFZhbHVlPFQsIHN0cmluZz4oXG4gICAgICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxGaWVsZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChsYWJlbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFiZWwudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlRmllbGQ6c3RyaW5nO1xuXG4gICAgcHVibGljIGdldCB2YWx1ZUdldHRlcigpOihvYmo6VCkgPT4gVSB7XG4gICAgICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byByZXRyaWV2ZSB0aGUgdmFsdWUgZnJvbSBhbiBpdGVtLlxuICAgICAgICByZXR1cm4gKG9iajpUKSA9PiBVdGlsLk9iamVjdC5yZWFkVmFsdWU8VCwgVT4ob2JqLCB0aGlzLnZhbHVlRmllbGQpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG9wdGlvblRlbXBsYXRlOlRlbXBsYXRlUmVmPElPcHRpb25Db250ZXh0PFQ+PjtcblxuICAgIHByaXZhdGUgX29wdGlvbkZvcm1hdHRlcj86KG86VCwgcT86c3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0IGNvbmZpZ3VyZWRGb3JtYXR0ZXIoKToob3B0aW9uOlQpID0+IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25Gb3JtYXR0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBvID0+XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9uRm9ybWF0dGVyIShcbiAgICAgICAgICAgICAgICAgICAgbyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NlYXJjaGFibGUgPyB0aGlzLnF1ZXJ5IDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0xvb2t1cCkge1xuICAgICAgICAgICAgcmV0dXJuIG8gPT4gdGhpcy5sYWJlbEdldHRlcihvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmhpZ2hsaWdodE1hdGNoZXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxHZXR0ZXIobyksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgfHwgXCJcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uRm9ybWF0dGVyKFxuICAgICAgICBmb3JtYXR0ZXI6KChvcHRpb246VCwgcXVlcnk/OnN0cmluZykgPT4gc3RyaW5nKSB8IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgICB0aGlzLl9vcHRpb25Gb3JtYXR0ZXIgPSBmb3JtYXR0ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9jYWxlVmFsdWVzOklTZWxlY3RMb2NhbGVWYWx1ZXM7XG4gICAgcHVibGljIGxvY2FsZU92ZXJyaWRlczpSZWN1cnNpdmVQYXJ0aWFsPElTZWxlY3RMb2NhbGVWYWx1ZXM+O1xuXG4gICAgcHVibGljIGdldCBsb2NhbGVWYWx1ZXMoKTpJU2VsZWN0TG9jYWxlVmFsdWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2Uub3ZlcnJpZGU8XCJzZWxlY3RcIj4oXG4gICAgICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMsXG4gICAgICAgICAgICB0aGlzLmxvY2FsZU92ZXJyaWRlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGljb246c3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgQE91dHB1dChcInRvdWNoZWRcIilcbiAgICBwdWJsaWMgb25Ub3VjaGVkOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIHByaXZhdGUgX2RvY3VtZW50S2V5RG93bkxpc3RlbmVyOigpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHJvdGVjdGVkIF9sb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2UgPSBuZXcgRHJvcGRvd25TZXJ2aWNlKCk7XG4gICAgICAgIC8vIFdlIGRvIHdhbnQgYW4gZW1wdHkgcXVlcnkgdG8gcmV0dXJuIGFsbCByZXN1bHRzLlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZTxULCBVPih0cnVlKTtcblxuICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKTtcbiAgICAgICAgdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbkxvY2FsZVVwZGF0ZSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucyA9IFtdO1xuXG4gICAgICAgIHRoaXMuaWNvbiA9IFwiZHJvcGRvd25cIjtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uID0gXCJzbGlkZSBkb3duXCI7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gMjAwO1xuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudEtleURvd25MaXN0ZW5lciA9IF9yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICBcImRvY3VtZW50XCIsXG4gICAgICAgICAgICBcImtleWRvd25cIixcbiAgICAgICAgICAgIChlOktleWJvYXJkRXZlbnQpID0+IHRoaXMub25Eb2N1bWVudEtleURvd24oZSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnNlbGVjdENsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVudS5zZXJ2aWNlID0gdGhpcy5kcm9wZG93blNlcnZpY2U7XG4gICAgICAgIC8vIFdlIG1hbnVhbGx5IHNwZWNpZnkgdGhlIG1lbnUgaXRlbXMgdG8gdGhlIG1lbnUgYmVjYXVzZSB0aGUgQENvbnRlbnRDaGlsZHJlbiBkb2Vzbid0IHBpY2sgdXAgb3VyIGR5bmFtaWNhbGx5IHJlbmRlcmVkIGl0ZW1zLlxuICAgICAgICB0aGlzLl9tZW51Lml0ZW1zID0gdGhpcy5fcmVuZGVyZWRPcHRpb25zO1xuXG4gICAgICAgIGlmICh0aGlzLm1hbnVhbFNlYXJjaCkge1xuICAgICAgICAgICAgdGhpcy5pc1NlYXJjaGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc1NlYXJjaEV4dGVybmFsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm9uUXVlcnlVcGRhdGVkLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocTpzdHJpbmcpID0+ICh0aGlzLnF1ZXJ5ID0gcSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm9uUXVlcnlLZXlEb3duLnN1YnNjcmliZSgoZTpLZXlib2FyZEV2ZW50KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25RdWVyeUlucHV0S2V5ZG93bihlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG11c3QgY2FsbCB0aGlzIGltbWVkaWF0ZWx5IGFzIGNoYW5nZXMgZG9lc24ndCBmaXJlIHdoZW4geW91IHN1YnNjcmliZS5cbiAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlZE9wdGlvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2NhbGVVcGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzID0gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5nZXQoKS5zZWxlY3Q7XG4gICAgfVxuXG4gICAgLy8gSG9vayBpcyBoZXJlIHNpbmNlIFR5cGVzY3JpcHQgZG9lc24ndCB5ZXQgc3VwcG9ydCBvdmVycmlkaW5nIGdldHRlcnMgJiBzZXR0ZXJzIHdoaWxlIHN0aWxsIGNhbGxpbmcgdGhlIHN1cGVyY2xhc3MuXG4gICAgcHJvdGVjdGVkIG9wdGlvbnNVcGRhdGVIb29rKCk6dm9pZCB7fVxuXG4gICAgLy8gSG9vayBpcyBoZXJlIHNpbmNlIFR5cGVzY3JpcHQgZG9lc24ndCB5ZXQgc3VwcG9ydCBvdmVycmlkaW5nIGdldHRlcnMgJiBzZXR0ZXJzIHdoaWxlIHN0aWxsIGNhbGxpbmcgdGhlIHN1cGVyY2xhc3MuXG4gICAgcHJvdGVjdGVkIHF1ZXJ5VXBkYXRlSG9vaygpOnZvaWQge31cblxuICAgIHByb3RlY3RlZCB1cGRhdGVRdWVyeShxdWVyeTpzdHJpbmcpOnZvaWQge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHF1ZXJ5IHRoZW4gb3BlbiB0aGUgZHJvcGRvd24sIGFzIGFmdGVyIGtleWJvYXJkIGlucHV0IGl0IHNob3VsZCBhbHdheXMgYmUgb3Blbi5cbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5KHF1ZXJ5LCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKHRydWUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0UXVlcnkoZGVsYXllZDpib29sZWFuID0gdHJ1ZSk6dm9pZCB7XG4gICAgICAgIC8vIFRoZSBzZWFyY2ggZGVsYXkgaXMgc2V0IHRvIHRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIHRvIGVuc3VyZSByZXN1bHRzXG4gICAgICAgIC8vIGFyZW4ndCByZW5kZXJlZCBhcyB0aGUgc2VsZWN0IGNsb3NlcyBhcyB0aGF0IGNhdXNlcyBhIHN1ZGRlbiBmbGFzaC5cbiAgICAgICAgaWYgKGRlbGF5ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2hEZWxheSA9IHRoaXMuX21lbnUubWVudVRyYW5zaXRpb25EdXJhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS51cGRhdGVRdWVyeURlbGF5ZWQoXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkoXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5xdWVyeSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKTp2b2lkIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgcHJldmlvdXMgc3Vic2NyaXB0aW9ucyB0byBhdm9pZCBtZW1vcnkgbGVha3Mgb24gbGFyZ2Ugc2VsZWN0cy5cbiAgICAgICAgdGhpcy5fcmVuZGVyZWRTdWJzY3JpcHRpb25zLmZvckVhY2gocnMgPT4gcnMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVkT3B0aW9ucy5mb3JFYWNoKHJvID0+IHtcbiAgICAgICAgICAgIC8vIFNsaWdodGx5IGRlbGF5IGluaXRpYWxpc2F0aW9uIHRvIGF2b2lkIGNoYW5nZSBhZnRlciBjaGVja2VkIGVycm9ycy4gVE9ETyAtIGxvb2sgaW50byBhdm9pZGluZyB0aGlzIVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihybykpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICByby5vblNlbGVjdGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNlbGVjdE9wdGlvbihyby52YWx1ZSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiBubyBvcHRpb25zIGhhdmUgYmVlbiBwcm92aWRlZCwgYXV0b2dlbmVyYXRlIHRoZW0gZnJvbSB0aGUgcmVuZGVyZWQgb25lcy5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAhdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNMb29rdXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLl9yZW5kZXJlZE9wdGlvbnMubWFwKHJvID0+IHJvLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0aWFsaXNlUmVuZGVyZWRPcHRpb24ob3B0aW9uOlN1aVNlbGVjdE9wdGlvbjxUPik6dm9pZCB7XG4gICAgICAgIG9wdGlvbi51c2VzVGVtcGxhdGUgPSAhIXRoaXMub3B0aW9uVGVtcGxhdGU7XG4gICAgICAgIG9wdGlvbi5mb3JtYXR0ZXIgPSB0aGlzLmNvbmZpZ3VyZWRGb3JtYXR0ZXI7XG5cbiAgICAgICAgaWYgKG9wdGlvbi51c2VzVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBsYXRlKG9wdGlvbi50ZW1wbGF0ZVNpYmxpbmcsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb24ubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IHNlbGVjdE9wdGlvbihvcHRpb246VCk6dm9pZDtcblxuICAgIHByb3RlY3RlZCBmaW5kT3B0aW9uKG9wdGlvbnM6VFtdLCB2YWx1ZTpVKTpUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgLy8gVHJpZXMgdG8gZmluZCBhbiBvcHRpb24gaW4gb3B0aW9ucyBhcnJheVxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG8gPT4gdmFsdWUgPT09IHRoaXMudmFsdWVHZXR0ZXIobykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNhcmV0Q2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93blNlcnZpY2UuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3Blbik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkNsaWNrKGU6SGFuZGxlZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKCFlLmV2ZW50SGFuZGxlZCAmJiAhdGhpcy5kcm9wZG93blNlcnZpY2UuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgIGUuZXZlbnRIYW5kbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRyb3Bkb3duIGlzIHNlYXJjaGFibGUsIGNsaWNraW5nIHNob3VsZCBrZWVwIGl0IG9wZW4sIG90aGVyd2lzZSB3ZSB0b2dnbGUgdGhlIG9wZW4gc3RhdGUuXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlYXJjaGFibGUgPyB0cnVlIDogIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlblxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gSW1tZWRpYXRlbHkgZm9jdXMgdGhlIHNlYXJjaCBpbnB1dCB3aGVuZXZlciBjbGlja2luZyBvbiB0aGUgc2VsZWN0LlxuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3VzaW5cIilcbiAgICBwdWJsaWMgb25Gb2N1c0luKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuICYmICF0aGlzLmRyb3Bkb3duU2VydmljZS5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KGU6SUZvY3VzRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXByZXNzXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25LZXlQcmVzcyhlOktleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLZXlDb2RlLkVudGVyKSB7XG4gICAgICAgICAgICAvLyBFbmFibGVzIHN1cHBvcnQgZm9yIGZvY3Vzc2luZyBhbmQgb3BlbmluZyB3aXRoIHRoZSBrZXlib2FyZCBhbG9uZS5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Eb2N1bWVudEtleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSAmJlxuICAgICAgICAgICAgIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlbiAmJlxuICAgICAgICAgICAgZS5rZXlDb2RlID09PSBLZXlDb2RlLkRvd25cbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBFbmFibGVzIHN1cHBvcnQgZm9yIGZvY3Vzc2luZyBhbmQgb3BlbmluZyB3aXRoIHRoZSBrZXlib2FyZCBhbG9uZS5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblF1ZXJ5SW5wdXRLZXlkb3duKGV2ZW50OktleWJvYXJkRXZlbnQpOnZvaWQge31cblxuICAgIHByb3RlY3RlZCBmb2N1cygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1NlYXJjaGFibGUgJiYgdGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgLy8gRm9jdXNzZXMgdGhlIHNlYXJjaCBpbnB1dCBvbmx5IHdoZW4gc2VhcmNoYWJsZS5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIZWxwZXIgdGhhdCBkcmF3cyB0aGUgcHJvdmlkZWQgdGVtcGxhdGUgYmVzaWRlIHRoZSBwcm92aWRlZCBWaWV3Q29udGFpbmVyUmVmLlxuICAgIHByb3RlY3RlZCBkcmF3VGVtcGxhdGUoc2libGluZ1JlZjpWaWV3Q29udGFpbmVyUmVmLCB2YWx1ZTpUKTp2b2lkIHtcbiAgICAgICAgc2libGluZ1JlZi5jbGVhcigpO1xuICAgICAgICAvLyBVc2Ugb2YgYCRpbXBsaWNpdGAgbWVhbnMgdXNlIG9mIDxuZy10ZW1wbGF0ZSBsZXQtb3B0aW9uPiBzeW50YXggaXMgc3VwcG9ydGVkLlxuICAgICAgICBzaWJsaW5nUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLm9wdGlvblRlbXBsYXRlLCB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IHZhbHVlLFxuICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRLZXlEb3duTGlzdGVuZXIoKTtcbiAgICB9XG59XG4iXX0=