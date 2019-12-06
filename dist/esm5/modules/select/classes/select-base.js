import * as tslib_1 from "tslib";
import { ViewChild, HostBinding, HostListener, Input, ContentChildren, ContentChild, EventEmitter, Output } from "@angular/core";
import { DropdownService, SuiDropdownMenu } from "../../dropdown/index";
import { SearchService } from "../../search/index";
import { Util, KeyCode } from "../../../misc/util/index";
import { SuiSelectOption } from "../components/select-option";
import { SuiSelectSearch } from "../directives/select-search";
// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
var SuiSelectBase = /** @class */ (function () {
    function SuiSelectBase(_element, renderer, _localizationService) {
        var _this = this;
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService(true);
        this.isSearchable = false;
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(function () {
            return _this.onLocaleUpdate();
        });
        this._renderedSubscriptions = [];
        this.icon = "dropdown";
        this.transition = "slide down";
        this.transitionDuration = 200;
        this.onTouched = new EventEmitter();
        this._documentKeyDownListener = renderer.listen("document", "keydown", function (e) { return _this.onDocumentKeyDown(e); });
        this.selectClasses = true;
    }
    Object.defineProperty(SuiSelectBase.prototype, "isActive", {
        get: function () {
            return this.dropdownService.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "isVisible", {
        get: function () {
            return this._menu.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "searchClass", {
        get: function () {
            return this.isSearchable && !this.isSearchExternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "isSearching", {
        get: function () {
            return this.searchService.isSearching;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "searchInput", {
        get: function () {
            return this._manualSearch || this._internalSearch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "tabIndex", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "isDisabled", {
        get: function () {
            return this.dropdownService.isDisabled;
        },
        set: function (value) {
            this.dropdownService.isDisabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "options", {
        set: function (options) {
            if (options) {
                this.searchService.options = options;
                this.optionsUpdateHook();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "optionsFilter", {
        set: function (filter) {
            if (filter) {
                this.searchService.optionsFilter = filter;
                this.optionsUpdateHook();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "optionsLookup", {
        set: function (lookup) {
            if (lookup) {
                this.searchService.optionsLookup = lookup;
                this.optionsUpdateHook();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "filteredOptions", {
        get: function () {
            return this.searchService.results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "availableOptions", {
        // Deprecated
        get: function () {
            return this.filteredOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "query", {
        get: function () {
            return this.isSearchable ? this.searchService.query : undefined;
        },
        set: function (query) {
            var _this = this;
            if (query != undefined) {
                this.queryUpdateHook();
                this.updateQuery(query);
                // Update the rendered text as query has changed.
                this._renderedOptions.forEach(function (ro) {
                    return _this.initialiseRenderedOption(ro);
                });
                if (this.searchInput) {
                    this.searchInput.query = query;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "labelField", {
        get: function () {
            return this.searchService.optionsField;
        },
        set: function (field) {
            this.searchService.optionsField = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "labelGetter", {
        get: function () {
            var _this = this;
            // Helper function to retrieve the label from an item.
            return function (obj) {
                var label = Util.Object.readValue(obj, _this.labelField);
                if (label != undefined) {
                    return label.toString();
                }
                return "";
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "valueGetter", {
        get: function () {
            var _this = this;
            // Helper function to retrieve the value from an item.
            return function (obj) { return Util.Object.readValue(obj, _this.valueField); };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "configuredFormatter", {
        get: function () {
            var _this = this;
            if (this._optionFormatter) {
                return function (o) {
                    return _this._optionFormatter(o, _this.isSearchable ? _this.query : undefined);
                };
            }
            else if (this.searchService.optionsLookup) {
                return function (o) { return _this.labelGetter(o); };
            }
            else {
                return function (o) {
                    return _this.searchService.highlightMatches(_this.labelGetter(o), _this.query || "");
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "optionFormatter", {
        set: function (formatter) {
            this._optionFormatter = formatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    SuiSelectBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._renderedOptions;
        if (this._manualSearch) {
            this.isSearchable = true;
            this.isSearchExternal = true;
        }
        if (this.searchInput) {
            this.searchInput.onQueryUpdated.subscribe(function (q) { return (_this.query = q); });
            this.searchInput.onQueryKeyDown.subscribe(function (e) {
                return _this.onQueryInputKeydown(e);
            });
        }
        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(function () {
            return _this.onAvailableOptionsRendered();
        });
    };
    SuiSelectBase.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().select;
    };
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    SuiSelectBase.prototype.optionsUpdateHook = function () { };
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    SuiSelectBase.prototype.queryUpdateHook = function () { };
    SuiSelectBase.prototype.updateQuery = function (query) {
        var _this = this;
        // Update the query then open the dropdown, as after keyboard input it should always be open.
        this.searchService.updateQuery(query, function () {
            return _this.dropdownService.setOpenState(true);
        });
    };
    SuiSelectBase.prototype.resetQuery = function (delayed) {
        if (delayed === void 0) { delayed = true; }
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
    };
    SuiSelectBase.prototype.onAvailableOptionsRendered = function () {
        var _this = this;
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSubscriptions.forEach(function (rs) { return rs.unsubscribe(); });
        this._renderedSubscriptions = [];
        this._renderedOptions.forEach(function (ro) {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(function () { return _this.initialiseRenderedOption(ro); });
            _this._renderedSubscriptions.push(ro.onSelected.subscribe(function () { return _this.selectOption(ro.value); }));
        });
        // If no options have been provided, autogenerate them from the rendered ones.
        if (this.searchService.options.length === 0 &&
            !this.searchService.optionsLookup) {
            this.options = this._renderedOptions.map(function (ro) { return ro.value; });
        }
    };
    SuiSelectBase.prototype.initialiseRenderedOption = function (option) {
        option.usesTemplate = !!this.optionTemplate;
        option.formatter = this.configuredFormatter;
        if (option.usesTemplate) {
            this.drawTemplate(option.templateSibling, option.value);
        }
        option.changeDetector.markForCheck();
    };
    SuiSelectBase.prototype.findOption = function (options, value) {
        var _this = this;
        // Tries to find an option in options array
        return options.find(function (o) { return value === _this.valueGetter(o); });
    };
    SuiSelectBase.prototype.onCaretClick = function (e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (!this.dropdownService.isAnimating) {
                this.dropdownService.setOpenState(!this.dropdownService.isOpen);
                this.focus();
            }
        }
    };
    SuiSelectBase.prototype.onClick = function (e) {
        if (!e.eventHandled && !this.dropdownService.isAnimating) {
            e.eventHandled = true;
            // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
            this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);
            // Immediately focus the search input whenever clicking on the select.
            this.focus();
        }
    };
    SuiSelectBase.prototype.onFocusIn = function () {
        if (!this.dropdownService.isOpen && !this.dropdownService.isAnimating) {
            this.dropdownService.setOpenState(true);
            this.focus();
        }
    };
    SuiSelectBase.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
            this.onTouched.emit();
        }
    };
    SuiSelectBase.prototype.onKeyPress = function (e) {
        if (e.keyCode === KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
        }
    };
    SuiSelectBase.prototype.onDocumentKeyDown = function (e) {
        if (this._element.nativeElement.contains(e.target) &&
            !this.dropdownService.isOpen &&
            e.keyCode === KeyCode.Down) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
            e.preventDefault();
        }
    };
    SuiSelectBase.prototype.onQueryInputKeydown = function (event) { };
    SuiSelectBase.prototype.focus = function () {
        if (this.isSearchable && this.searchInput) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this.searchInput.focus();
        }
        else {
            this._element.nativeElement.focus();
        }
    };
    // Helper that draws the provided template beside the provided ViewContainerRef.
    SuiSelectBase.prototype.drawTemplate = function (siblingRef, value) {
        siblingRef.clear();
        // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
        siblingRef.createEmbeddedView(this.optionTemplate, {
            $implicit: value,
            query: this.query
        });
    };
    SuiSelectBase.prototype.ngOnDestroy = function () {
        this._renderedSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._documentKeyDownListener();
    };
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
    return SuiSelectBase;
}());
export { SuiSelectBase };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NlbGVjdC9jbGFzc2VzL3NlbGVjdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFFWCxZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFLZixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQXNCLE1BQU0sb0JBQW9CLENBQUM7QUFDdkUsT0FBTyxFQUNILElBQUksRUFHSixPQUFPLEVBRVYsTUFBTSwwQkFBMEIsQ0FBQztBQU1sQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTTlELGdGQUFnRjtBQUNoRiw2RUFBNkU7QUFDN0U7SUFzT0ksdUJBQ1ksUUFBbUIsRUFDM0IsUUFBa0IsRUFDUixvQkFBMkM7UUFIekQsaUJBNkJDO1FBNUJXLGFBQVEsR0FBUixRQUFRLENBQVc7UUFFakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtRQUVyRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQU8sSUFBSSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDakQsT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFO1FBQXJCLENBQXFCLENBQ3hCLENBQUM7UUFDRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7UUFFOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUMzQyxVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQUMsQ0FBZSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUNqRCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQTlPRCxzQkFBVyxtQ0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxvQ0FBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFRRCxzQkFBVyxzQ0FBVzthQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLHNDQUFXO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQVFELHNCQUFXLHNDQUFXO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDdEQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyxtQ0FBUTthQUFuQjtZQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIscUNBQXFDO2dCQUNyQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdEQsaUZBQWlGO2dCQUNqRixPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO2dCQUM3Qix1Q0FBdUM7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUN6QjtZQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsOENBQThDO2dCQUM5QyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFDRCxrQ0FBa0M7WUFDbEMsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQUlELHNCQUFXLHFDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxDQUFDO2FBRUQsVUFBc0IsS0FBYTtZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzlDLENBQUM7OztPQUpBO0lBT0Qsc0JBQVcsa0NBQU87YUFBbEIsVUFBbUIsT0FBVztZQUMxQixJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBRXJDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyx3Q0FBYTthQUF4QixVQUF5QixNQUE4QjtZQUNuRCxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyx3Q0FBYTthQUF4QixVQUF5QixNQUFpQztZQUN0RCxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQ0FBZTthQUExQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVywyQ0FBZ0I7UUFEM0IsYUFBYTthQUNiO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0NBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDcEUsQ0FBQzthQUVELFVBQWlCLEtBQXdCO1lBQXpDLGlCQWFDO1lBWkcsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO2dCQUNwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7b0JBQzVCLE9BQUEsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsQ0FBQztnQkFBakMsQ0FBaUMsQ0FDcEMsQ0FBQztnQkFFRixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztpQkFDbEM7YUFDSjtRQUNMLENBQUM7OztPQWZBO0lBa0JELHNCQUFXLHFDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUMzQyxDQUFDO2FBRUQsVUFBc0IsS0FBd0I7WUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVDLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsc0NBQVc7YUFBdEI7WUFBQSxpQkFZQztZQVhHLHNEQUFzRDtZQUN0RCxPQUFPLFVBQUMsR0FBSztnQkFDVCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDL0IsR0FBRyxFQUNILEtBQUksQ0FBQyxVQUFVLENBQ2xCLENBQUM7Z0JBQ0YsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO29CQUNwQixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDM0I7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUM7UUFDTixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLHNDQUFXO2FBQXRCO1lBQUEsaUJBR0M7WUFGRyxzREFBc0Q7WUFDdEQsT0FBTyxVQUFDLEdBQUssSUFBSyxPQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFPLEdBQUcsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQWpELENBQWlELENBQUM7UUFDeEUsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyw4Q0FBbUI7YUFBOUI7WUFBQSxpQkFnQkM7WUFmRyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkIsT0FBTyxVQUFBLENBQUM7b0JBQ0osT0FBQSxLQUFJLENBQUMsZ0JBQWlCLENBQ2xCLENBQUMsRUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQzdDO2dCQUhELENBR0MsQ0FBQzthQUNUO2lCQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pDLE9BQU8sVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFDO2FBQ25DO2lCQUFNO2dCQUNILE9BQU8sVUFBQSxDQUFDO29CQUNKLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FDL0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFDbkIsS0FBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQ25CO2dCQUhELENBR0MsQ0FBQzthQUNUO1FBQ0wsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVywwQ0FBZTthQUExQixVQUNJLFNBQTJEO1lBRTNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyx1Q0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FDckMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FDdkIsQ0FBQztRQUNOLENBQUM7OztPQUFBO0lBK0NNLDBDQUFrQixHQUF6QjtRQUFBLGlCQXdCQztRQXZCRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzFDLDhIQUE4SDtRQUM5SCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFekMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNyQyxVQUFDLENBQVEsSUFBSyxPQUFBLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FDakMsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQWU7Z0JBQ3RELE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUEzQixDQUEyQixDQUM5QixDQUFDO1NBQ0w7UUFFRCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDcEMsT0FBQSxLQUFJLENBQUMsMEJBQTBCLEVBQUU7UUFBakMsQ0FBaUMsQ0FDcEMsQ0FBQztJQUNOLENBQUM7SUFFTyxzQ0FBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNoRSxDQUFDO0lBRUQscUhBQXFIO0lBQzNHLHlDQUFpQixHQUEzQixjQUFvQyxDQUFDO0lBRXJDLHFIQUFxSDtJQUMzRyx1Q0FBZSxHQUF6QixjQUFrQyxDQUFDO0lBRXpCLG1DQUFXLEdBQXJCLFVBQXNCLEtBQVk7UUFBbEMsaUJBS0M7UUFKRyw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ2xDLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQXZDLENBQXVDLENBQzFDLENBQUM7SUFDTixDQUFDO0lBRVMsa0NBQVUsR0FBcEIsVUFBcUIsT0FBc0I7UUFBdEIsd0JBQUEsRUFBQSxjQUFzQjtRQUN2Qyx1RUFBdUU7UUFDdkUsc0VBQXNFO1FBQ3RFLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUNuRSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRVMsa0RBQTBCLEdBQXBDO1FBQUEsaUJBcUJDO1FBcEJHLHNGQUFzRjtRQUN0RixJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtZQUM1QixzR0FBc0c7WUFDdEcsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztZQUVwRCxLQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FDN0QsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsOEVBQThFO1FBQzlFLElBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDdkMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFDbkM7WUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxFQUFSLENBQVEsQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUVTLGdEQUF3QixHQUFsQyxVQUFtQyxNQUF5QjtRQUN4RCxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBRTVDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNEO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBSVMsa0NBQVUsR0FBcEIsVUFBcUIsT0FBVyxFQUFFLEtBQU87UUFBekMsaUJBR0M7UUFGRywyQ0FBMkM7UUFDM0MsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSyxLQUFLLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsQ0FBYztRQUM5QixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUNqQixDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFaEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hCO1NBQ0o7SUFDTCxDQUFDO0lBR00sK0JBQU8sR0FBZCxVQUFlLENBQWM7UUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtZQUN0RCxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUV0QixtR0FBbUc7WUFDbkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FDMUQsQ0FBQztZQUVGLHNFQUFzRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBR00saUNBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRTtZQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBR00sa0NBQVUsR0FBakIsVUFBa0IsQ0FBYTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUdNLGtDQUFVLEdBQWpCLFVBQWtCLENBQWU7UUFDN0IsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDN0IscUVBQXFFO1lBQ3JFLG9GQUFvRjtZQUNwRixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFTSx5Q0FBaUIsR0FBeEIsVUFBeUIsQ0FBZTtRQUNwQyxJQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzlDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNO1lBQzVCLENBQUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLElBQUksRUFDNUI7WUFDRSxxRUFBcUU7WUFDckUsb0ZBQW9GO1lBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXBDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFTSwyQ0FBbUIsR0FBMUIsVUFBMkIsS0FBbUIsSUFBUSxDQUFDO0lBRTdDLDZCQUFLLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2QyxrREFBa0Q7WUFDbEQsb0ZBQW9GO1lBQ3BGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELGdGQUFnRjtJQUN0RSxvQ0FBWSxHQUF0QixVQUF1QixVQUEyQixFQUFFLEtBQU87UUFDdkQsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLGdGQUFnRjtRQUNoRixVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMvQyxTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG1DQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBOWJEO1FBREMsU0FBUyxDQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztnREFDYjtJQUloQztRQURDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7MkRBQ0M7SUFRekQ7UUFGQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzt3REFDRDtJQUc3QjtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7aURBRzNCO0lBR0Q7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO2tEQUc1QjtJQUdEO1FBREMsS0FBSyxFQUFFO3VEQUNvQjtJQUs1QjtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7b0RBRzNCO0lBR0Q7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO29EQUc1QjtJQUdEO1FBREMsU0FBUyxDQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzswREFDSjtJQUd6QztRQURDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQ1Q7SUFPdkM7UUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDO29EQUNRO0lBRzFCO1FBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQztpREFvQjVCO0lBSUQ7UUFGQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7UUFDN0IsS0FBSyxFQUFFO21EQUdQO0lBT0Q7UUFEQyxLQUFLLEVBQUU7Z0RBT1A7SUFHRDtRQURDLEtBQUssRUFBRTtzREFPUDtJQUdEO1FBREMsS0FBSyxFQUFFO3NEQU9QO0lBK0JEO1FBREMsS0FBSyxFQUFFO21EQUdQO0lBcUJEO1FBREMsS0FBSyxFQUFFO3FEQUNpQjtJQVF6QjtRQURDLEtBQUssRUFBRTt5REFDNkM7SUF1QnJEO1FBREMsS0FBSyxFQUFFO3dEQUtQO0lBYUQ7UUFEQyxLQUFLLEVBQUU7K0NBQ1c7SUFHbkI7UUFEQyxLQUFLLEVBQUU7cURBQ2lCO0lBR3pCO1FBREMsS0FBSyxFQUFFOzZEQUN5QjtJQUdqQztRQURDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0RBQ2tCO0lBbUpwQztRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnREFhakM7SUFHRDtRQURDLFlBQVksQ0FBQyxTQUFTLENBQUM7a0RBT3ZCO0lBR0Q7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7bURBTXBDO0lBR0Q7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7bURBT3BDO0lBMENMLG9CQUFDO0NBQUEsQUFyY0QsSUFxY0M7U0FyY3FCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIFZpZXdDaGlsZCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgUXVlcnlMaXN0LFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIE91dHB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgUmVuZGVyZXIyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqcy9TdWJzY3JpcHRpb25cIjtcbmltcG9ydCB7IERyb3Bkb3duU2VydmljZSwgU3VpRHJvcGRvd25NZW51IH0gZnJvbSBcIi4uLy4uL2Ryb3Bkb3duL2luZGV4XCI7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlLCBMb29rdXBGbiwgRmlsdGVyRm4gfSBmcm9tIFwiLi4vLi4vc2VhcmNoL2luZGV4XCI7XG5pbXBvcnQge1xuICAgIFV0aWwsXG4gICAgSVRlbXBsYXRlUmVmQ29udGV4dCxcbiAgICBIYW5kbGVkRXZlbnQsXG4gICAgS2V5Q29kZSxcbiAgICBJRm9jdXNFdmVudFxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQge1xuICAgIElTZWxlY3RMb2NhbGVWYWx1ZXMsXG4gICAgUmVjdXJzaXZlUGFydGlhbCxcbiAgICBTdWlMb2NhbGl6YXRpb25TZXJ2aWNlXG59IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zZWxlY3Qtb3B0aW9uXCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RTZWFyY2ggfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9zZWxlY3Qtc2VhcmNoXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbkNvbnRleHQ8VD4gZXh0ZW5kcyBJVGVtcGxhdGVSZWZDb250ZXh0PFQ+IHtcbiAgICBxdWVyeT86c3RyaW5nO1xufVxuXG4vLyBXZSB1c2UgZ2VuZXJpYyB0eXBlIFQgdG8gc3BlY2lmeSB0aGUgdHlwZSBvZiB0aGUgb3B0aW9ucyB3ZSBhcmUgd29ya2luZyB3aXRoLFxuLy8gYW5kIFUgdG8gc3BlY2lmeSB0aGUgdHlwZSBvZiB0aGUgcHJvcGVydHkgb2YgdGhlIG9wdGlvbiB1c2VkIGFzIHRoZSB2YWx1ZS5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdWlTZWxlY3RCYXNlPFQsIFU+XG4gICAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBkcm9wZG93blNlcnZpY2U6RHJvcGRvd25TZXJ2aWNlO1xuICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOlNlYXJjaFNlcnZpY2U8VCwgVT47XG5cbiAgICBAVmlld0NoaWxkKFN1aURyb3Bkb3duTWVudSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcm90ZWN0ZWQgX21lbnU6U3VpRHJvcGRvd25NZW51O1xuXG4gICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgb2YgdGhlIHJlbmRlcmVkIHNlbGVjdCBvcHRpb25zLiAoUmVuZGVyZWQgYnkgdGhlIHVzZXIgdXNpbmcgKm5nRm9yKS5cbiAgICBAQ29udGVudENoaWxkcmVuKFN1aVNlbGVjdE9wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHByb3RlY3RlZCBfcmVuZGVyZWRPcHRpb25zOlF1ZXJ5TGlzdDxTdWlTZWxlY3RPcHRpb248VD4+O1xuXG4gICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgb2YgdGhlIHN1YnNjcmlwdGlvbnMgdG8gdGhlIHNlbGVjdGVkIGV2ZW50cyBvbiB0aGUgcmVuZGVyZWQgb3B0aW9ucy5cbiAgICBwcml2YXRlIF9yZW5kZXJlZFN1YnNjcmlwdGlvbnM6U3Vic2NyaXB0aW9uW107XG5cbiAgICAvLyBTZXRzIHRoZSBTZW1hbnRpYyBVSSBjbGFzc2VzIG9uIHRoZSBob3N0IGVsZW1lbnQuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kcm9wZG93blwiKVxuICAgIHB1YmxpYyBzZWxlY3RDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5hY3RpdmVcIilcbiAgICBwdWJsaWMgZ2V0IGlzQWN0aXZlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duU2VydmljZS5pc09wZW47XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudmlzaWJsZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZW51LmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc1NlYXJjaGFibGU6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBpc1NlYXJjaEV4dGVybmFsOmJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5zZWFyY2hcIilcbiAgICBwdWJsaWMgZ2V0IHNlYXJjaENsYXNzKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2VhcmNoYWJsZSAmJiAhdGhpcy5pc1NlYXJjaEV4dGVybmFsO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmxvYWRpbmdcIilcbiAgICBwdWJsaWMgZ2V0IGlzU2VhcmNoaW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UuaXNTZWFyY2hpbmc7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChTdWlTZWxlY3RTZWFyY2gsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxTZWFyY2g/OlN1aVNlbGVjdFNlYXJjaDtcblxuICAgIEBDb250ZW50Q2hpbGQoU3VpU2VsZWN0U2VhcmNoLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX21hbnVhbFNlYXJjaD86U3VpU2VsZWN0U2VhcmNoO1xuXG4gICAgcHVibGljIGdldCBzZWFyY2hJbnB1dCgpOlN1aVNlbGVjdFNlYXJjaCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYW51YWxTZWFyY2ggfHwgdGhpcy5faW50ZXJuYWxTZWFyY2g7XG4gICAgfVxuXG4gICAgQElucHV0KFwidGFiaW5kZXhcIilcbiAgICBwcml2YXRlIF90YWJJbmRleD86bnVtYmVyO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci50YWJpbmRleFwiKVxuICAgIHB1YmxpYyBnZXQgdGFiSW5kZXgoKTpudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAvLyBJZiBkaXNhYmxlZCwgcmVtb3ZlIGZyb20gdGFiaW5kZXguXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlbiAmJiB0aGlzLmlzU2VhcmNoRXh0ZXJuYWwpIHtcbiAgICAgICAgICAgIC8vIElmIG9wZW4gJiBpbiBtZW51IHNlYXJjaCwgcmVtb3ZlIGZyb20gdGFiaW5kZXggKGFzIGlucHV0IGFsd2F5cyBhdXRvZm9jdXNzZXMpLlxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90YWJJbmRleCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIElmIGN1c3RvbSB0YWJpbmRleCwgZGVmYXVsdCB0byB0aGF0LlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhYkluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaENsYXNzKSB7XG4gICAgICAgICAgICAvLyBJZiBzZWFyY2ggaW5wdXQgZW5hYmxlZCwgdGFiIGdvZXMgdG8gaW5wdXQuXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gZGVmYXVsdCBvZiAwLlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kaXNhYmxlZFwiKVxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBpc0Rpc2FibGVkKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duU2VydmljZS5pc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNEaXNhYmxlZCh2YWx1ZTpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzRGlzYWJsZWQgPSAhIXZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6VFtdKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1VwZGF0ZUhvb2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zRmlsdGVyKGZpbHRlcjpGaWx0ZXJGbjxUPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpbHRlciA9IGZpbHRlcjtcblxuICAgICAgICAgICAgdGhpcy5vcHRpb25zVXBkYXRlSG9vaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNMb29rdXAobG9va3VwOkxvb2t1cEZuPFQsIFU+IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChsb29rdXApIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zTG9va3VwID0gbG9va3VwO1xuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNVcGRhdGVIb29rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZpbHRlcmVkT3B0aW9ucygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cztcbiAgICB9XG5cbiAgICAvLyBEZXByZWNhdGVkXG4gICAgcHVibGljIGdldCBhdmFpbGFibGVPcHRpb25zKCk6VFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRPcHRpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcXVlcnkoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NlYXJjaGFibGUgPyB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBxdWVyeShxdWVyeTpzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHF1ZXJ5ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeVVwZGF0ZUhvb2soKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUXVlcnkocXVlcnkpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSByZW5kZXJlZCB0ZXh0IGFzIHF1ZXJ5IGhhcyBjaGFuZ2VkLlxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZWRPcHRpb25zLmZvckVhY2gocm8gPT5cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihybylcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGxhYmVsRmllbGQoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWVsZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGxhYmVsRmllbGQoZmllbGQ6c3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmllbGQgPSBmaWVsZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxhYmVsR2V0dGVyKCk6KG9iajpUKSA9PiBzdHJpbmcge1xuICAgICAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgdGhlIGxhYmVsIGZyb20gYW4gaXRlbS5cbiAgICAgICAgcmV0dXJuIChvYmo6VCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBVdGlsLk9iamVjdC5yZWFkVmFsdWU8VCwgc3RyaW5nPihcbiAgICAgICAgICAgICAgICBvYmosXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbEZpZWxkXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGxhYmVsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdmFsdWVGaWVsZDpzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlR2V0dGVyKCk6KG9iajpUKSA9PiBVIHtcbiAgICAgICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHJldHJpZXZlIHRoZSB2YWx1ZSBmcm9tIGFuIGl0ZW0uXG4gICAgICAgIHJldHVybiAob2JqOlQpID0+IFV0aWwuT2JqZWN0LnJlYWRWYWx1ZTxULCBVPihvYmosIHRoaXMudmFsdWVGaWVsZCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3B0aW9uVGVtcGxhdGU6VGVtcGxhdGVSZWY8SU9wdGlvbkNvbnRleHQ8VD4+O1xuXG4gICAgcHJpdmF0ZSBfb3B0aW9uRm9ybWF0dGVyPzoobzpULCBxPzpzdHJpbmcpID0+IHN0cmluZztcblxuICAgIHB1YmxpYyBnZXQgY29uZmlndXJlZEZvcm1hdHRlcigpOihvcHRpb246VCkgPT4gc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbkZvcm1hdHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG8gPT5cbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25Gb3JtYXR0ZXIhKFxuICAgICAgICAgICAgICAgICAgICBvLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA/IHRoaXMucXVlcnkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zTG9va3VwKSB7XG4gICAgICAgICAgICByZXR1cm4gbyA9PiB0aGlzLmxhYmVsR2V0dGVyKG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG8gPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuaGlnaGxpZ2h0TWF0Y2hlcyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbEdldHRlcihvKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeSB8fCBcIlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25Gb3JtYXR0ZXIoXG4gICAgICAgIGZvcm1hdHRlcjooKG9wdGlvbjpULCBxdWVyeT86c3RyaW5nKSA9PiBzdHJpbmcpIHwgdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbkZvcm1hdHRlciA9IGZvcm1hdHRlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2NhbGVWYWx1ZXM6SVNlbGVjdExvY2FsZVZhbHVlcztcbiAgICBwdWJsaWMgbG9jYWxlT3ZlcnJpZGVzOlJlY3Vyc2l2ZVBhcnRpYWw8SVNlbGVjdExvY2FsZVZhbHVlcz47XG5cbiAgICBwdWJsaWMgZ2V0IGxvY2FsZVZhbHVlcygpOklTZWxlY3RMb2NhbGVWYWx1ZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vdmVycmlkZTxcInNlbGVjdFwiPihcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsZVZhbHVlcyxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlT3ZlcnJpZGVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaWNvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRyYW5zaXRpb25EdXJhdGlvbjpudW1iZXI7XG5cbiAgICBAT3V0cHV0KFwidG91Y2hlZFwiKVxuICAgIHB1YmxpYyBvblRvdWNoZWQ6RXZlbnRFbWl0dGVyPHZvaWQ+O1xuXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRLZXlEb3duTGlzdGVuZXI6KCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHJlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHJvdGVjdGVkIF9sb2NhbGl6YXRpb25TZXJ2aWNlOlN1aUxvY2FsaXphdGlvblNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2UgPSBuZXcgRHJvcGRvd25TZXJ2aWNlKCk7XG4gICAgICAgIC8vIFdlIGRvIHdhbnQgYW4gZW1wdHkgcXVlcnkgdG8gcmV0dXJuIGFsbCByZXN1bHRzLlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZTxULCBVPih0cnVlKTtcblxuICAgICAgICB0aGlzLmlzU2VhcmNoYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKTtcbiAgICAgICAgdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbkxvY2FsZVVwZGF0ZSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucyA9IFtdO1xuXG4gICAgICAgIHRoaXMuaWNvbiA9IFwiZHJvcGRvd25cIjtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uID0gXCJzbGlkZSBkb3duXCI7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gMjAwO1xuXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudEtleURvd25MaXN0ZW5lciA9IHJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgIFwiZG9jdW1lbnRcIixcbiAgICAgICAgICAgIFwia2V5ZG93blwiLFxuICAgICAgICAgICAgKGU6S2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5vbkRvY3VtZW50S2V5RG93bihlKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLl9tZW51LnNlcnZpY2UgPSB0aGlzLmRyb3Bkb3duU2VydmljZTtcbiAgICAgICAgLy8gV2UgbWFudWFsbHkgc3BlY2lmeSB0aGUgbWVudSBpdGVtcyB0byB0aGUgbWVudSBiZWNhdXNlIHRoZSBAQ29udGVudENoaWxkcmVuIGRvZXNuJ3QgcGljayB1cCBvdXIgZHluYW1pY2FsbHkgcmVuZGVyZWQgaXRlbXMuXG4gICAgICAgIHRoaXMuX21lbnUuaXRlbXMgPSB0aGlzLl9yZW5kZXJlZE9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMuX21hbnVhbFNlYXJjaCkge1xuICAgICAgICAgICAgdGhpcy5pc1NlYXJjaGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc1NlYXJjaEV4dGVybmFsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm9uUXVlcnlVcGRhdGVkLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocTpzdHJpbmcpID0+ICh0aGlzLnF1ZXJ5ID0gcSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm9uUXVlcnlLZXlEb3duLnN1YnNjcmliZSgoZTpLZXlib2FyZEV2ZW50KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25RdWVyeUlucHV0S2V5ZG93bihlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG11c3QgY2FsbCB0aGlzIGltbWVkaWF0ZWx5IGFzIGNoYW5nZXMgZG9lc24ndCBmaXJlIHdoZW4geW91IHN1YnNjcmliZS5cbiAgICAgICAgdGhpcy5vbkF2YWlsYWJsZU9wdGlvbnNSZW5kZXJlZCgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlZE9wdGlvbnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2NhbGVVcGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzID0gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5nZXQoKS5zZWxlY3Q7XG4gICAgfVxuXG4gICAgLy8gSG9vayBpcyBoZXJlIHNpbmNlIFR5cGVzY3JpcHQgZG9lc24ndCB5ZXQgc3VwcG9ydCBvdmVycmlkaW5nIGdldHRlcnMgJiBzZXR0ZXJzIHdoaWxlIHN0aWxsIGNhbGxpbmcgdGhlIHN1cGVyY2xhc3MuXG4gICAgcHJvdGVjdGVkIG9wdGlvbnNVcGRhdGVIb29rKCk6dm9pZCB7fVxuXG4gICAgLy8gSG9vayBpcyBoZXJlIHNpbmNlIFR5cGVzY3JpcHQgZG9lc24ndCB5ZXQgc3VwcG9ydCBvdmVycmlkaW5nIGdldHRlcnMgJiBzZXR0ZXJzIHdoaWxlIHN0aWxsIGNhbGxpbmcgdGhlIHN1cGVyY2xhc3MuXG4gICAgcHJvdGVjdGVkIHF1ZXJ5VXBkYXRlSG9vaygpOnZvaWQge31cblxuICAgIHByb3RlY3RlZCB1cGRhdGVRdWVyeShxdWVyeTpzdHJpbmcpOnZvaWQge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHF1ZXJ5IHRoZW4gb3BlbiB0aGUgZHJvcGRvd24sIGFzIGFmdGVyIGtleWJvYXJkIGlucHV0IGl0IHNob3VsZCBhbHdheXMgYmUgb3Blbi5cbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5KHF1ZXJ5LCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKHRydWUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0UXVlcnkoZGVsYXllZDpib29sZWFuID0gdHJ1ZSk6dm9pZCB7XG4gICAgICAgIC8vIFRoZSBzZWFyY2ggZGVsYXkgaXMgc2V0IHRvIHRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIHRvIGVuc3VyZSByZXN1bHRzXG4gICAgICAgIC8vIGFyZW4ndCByZW5kZXJlZCBhcyB0aGUgc2VsZWN0IGNsb3NlcyBhcyB0aGF0IGNhdXNlcyBhIHN1ZGRlbiBmbGFzaC5cbiAgICAgICAgaWYgKGRlbGF5ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2hEZWxheSA9IHRoaXMuX21lbnUubWVudVRyYW5zaXRpb25EdXJhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS51cGRhdGVRdWVyeURlbGF5ZWQoXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkoXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5xdWVyeSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25BdmFpbGFibGVPcHRpb25zUmVuZGVyZWQoKTp2b2lkIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgcHJldmlvdXMgc3Vic2NyaXB0aW9ucyB0byBhdm9pZCBtZW1vcnkgbGVha3Mgb24gbGFyZ2Ugc2VsZWN0cy5cbiAgICAgICAgdGhpcy5fcmVuZGVyZWRTdWJzY3JpcHRpb25zLmZvckVhY2gocnMgPT4gcnMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVkT3B0aW9ucy5mb3JFYWNoKHJvID0+IHtcbiAgICAgICAgICAgIC8vIFNsaWdodGx5IGRlbGF5IGluaXRpYWxpc2F0aW9uIHRvIGF2b2lkIGNoYW5nZSBhZnRlciBjaGVja2VkIGVycm9ycy4gVE9ETyAtIGxvb2sgaW50byBhdm9pZGluZyB0aGlzIVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmluaXRpYWxpc2VSZW5kZXJlZE9wdGlvbihybykpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZFN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICByby5vblNlbGVjdGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNlbGVjdE9wdGlvbihyby52YWx1ZSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiBubyBvcHRpb25zIGhhdmUgYmVlbiBwcm92aWRlZCwgYXV0b2dlbmVyYXRlIHRoZW0gZnJvbSB0aGUgcmVuZGVyZWQgb25lcy5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAhdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNMb29rdXBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLl9yZW5kZXJlZE9wdGlvbnMubWFwKHJvID0+IHJvLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0aWFsaXNlUmVuZGVyZWRPcHRpb24ob3B0aW9uOlN1aVNlbGVjdE9wdGlvbjxUPik6dm9pZCB7XG4gICAgICAgIG9wdGlvbi51c2VzVGVtcGxhdGUgPSAhIXRoaXMub3B0aW9uVGVtcGxhdGU7XG4gICAgICAgIG9wdGlvbi5mb3JtYXR0ZXIgPSB0aGlzLmNvbmZpZ3VyZWRGb3JtYXR0ZXI7XG5cbiAgICAgICAgaWYgKG9wdGlvbi51c2VzVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBsYXRlKG9wdGlvbi50ZW1wbGF0ZVNpYmxpbmcsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb24uY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFic3RyYWN0IHNlbGVjdE9wdGlvbihvcHRpb246VCk6dm9pZDtcblxuICAgIHByb3RlY3RlZCBmaW5kT3B0aW9uKG9wdGlvbnM6VFtdLCB2YWx1ZTpVKTpUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgLy8gVHJpZXMgdG8gZmluZCBhbiBvcHRpb24gaW4gb3B0aW9ucyBhcnJheVxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maW5kKG8gPT4gdmFsdWUgPT09IHRoaXMudmFsdWVHZXR0ZXIobykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNhcmV0Q2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93blNlcnZpY2UuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3Blbik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkNsaWNrKGU6SGFuZGxlZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKCFlLmV2ZW50SGFuZGxlZCAmJiAhdGhpcy5kcm9wZG93blNlcnZpY2UuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgIGUuZXZlbnRIYW5kbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRyb3Bkb3duIGlzIHNlYXJjaGFibGUsIGNsaWNraW5nIHNob3VsZCBrZWVwIGl0IG9wZW4sIG90aGVyd2lzZSB3ZSB0b2dnbGUgdGhlIG9wZW4gc3RhdGUuXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlYXJjaGFibGUgPyB0cnVlIDogIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlblxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gSW1tZWRpYXRlbHkgZm9jdXMgdGhlIHNlYXJjaCBpbnB1dCB3aGVuZXZlciBjbGlja2luZyBvbiB0aGUgc2VsZWN0LlxuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3VzaW5cIilcbiAgICBwdWJsaWMgb25Gb2N1c0luKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuICYmICF0aGlzLmRyb3Bkb3duU2VydmljZS5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KGU6SUZvY3VzRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXByZXNzXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25LZXlQcmVzcyhlOktleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLZXlDb2RlLkVudGVyKSB7XG4gICAgICAgICAgICAvLyBFbmFibGVzIHN1cHBvcnQgZm9yIGZvY3Vzc2luZyBhbmQgb3BlbmluZyB3aXRoIHRoZSBrZXlib2FyZCBhbG9uZS5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Eb2N1bWVudEtleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSAmJlxuICAgICAgICAgICAgIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzT3BlbiAmJlxuICAgICAgICAgICAgZS5rZXlDb2RlID09PSBLZXlDb2RlLkRvd25cbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBFbmFibGVzIHN1cHBvcnQgZm9yIGZvY3Vzc2luZyBhbmQgb3BlbmluZyB3aXRoIHRoZSBrZXlib2FyZCBhbG9uZS5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblF1ZXJ5SW5wdXRLZXlkb3duKGV2ZW50OktleWJvYXJkRXZlbnQpOnZvaWQge31cblxuICAgIHByb3RlY3RlZCBmb2N1cygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1NlYXJjaGFibGUgJiYgdGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgLy8gRm9jdXNzZXMgdGhlIHNlYXJjaCBpbnB1dCBvbmx5IHdoZW4gc2VhcmNoYWJsZS5cbiAgICAgICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIZWxwZXIgdGhhdCBkcmF3cyB0aGUgcHJvdmlkZWQgdGVtcGxhdGUgYmVzaWRlIHRoZSBwcm92aWRlZCBWaWV3Q29udGFpbmVyUmVmLlxuICAgIHByb3RlY3RlZCBkcmF3VGVtcGxhdGUoc2libGluZ1JlZjpWaWV3Q29udGFpbmVyUmVmLCB2YWx1ZTpUKTp2b2lkIHtcbiAgICAgICAgc2libGluZ1JlZi5jbGVhcigpO1xuICAgICAgICAvLyBVc2Ugb2YgYCRpbXBsaWNpdGAgbWVhbnMgdXNlIG9mIDxuZy10ZW1wbGF0ZSBsZXQtb3B0aW9uPiBzeW50YXggaXMgc3VwcG9ydGVkLlxuICAgICAgICBzaWJsaW5nUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLm9wdGlvblRlbXBsYXRlLCB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IHZhbHVlLFxuICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRLZXlEb3duTGlzdGVuZXIoKTtcbiAgICB9XG59XG4iXX0=