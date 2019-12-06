import * as tslib_1 from "tslib";
import { Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, Directive, ElementRef, TemplateRef, Renderer2, OnDestroy } from "@angular/core";
import { Util } from "../../../misc/util/index";
import { DropdownService, SuiDropdownMenu } from "../../dropdown/index";
import { ISearchLocaleValues, RecursivePartial, SuiLocalizationService } from "../../../behaviors/localization/index";
import { SearchService } from "../services/search.service";
var SuiSearch = /** @class */ (function () {
    function SuiSearch(_element, renderer, _localizationService) {
        var _this = this;
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService();
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(function () {
            return _this.onLocaleUpdate();
        });
        this.searchClasses = true;
        this.hasIcon = true;
        this.retainSelectedResult = true;
        this.searchDelay = 200;
        this.maxResults = 7;
        this.onResultSelected = new EventEmitter();
        this.transition = "scale";
        this.transitionDuration = 200;
        this._documentClickListener = renderer.listen("document", "click", function (e) { return _this.onDocumentClick(e); });
    }
    Object.defineProperty(SuiSearch.prototype, "isActive", {
        get: function () {
            return this.dropdownService.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "placeholder", {
        // Gets & sets the placeholder text displayed inside the text input.
        get: function () {
            return this._placeholder || this.localeValues.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "query", {
        get: function () {
            return this.searchService.query;
        },
        set: function (query) {
            var _this = this;
            this.selectedResult = undefined;
            // Initialise a delayed search.
            this.searchService.updateQueryDelayed(query, function () {
                // Set the results open state depending on whether a query has been entered.
                return _this.dropdownService.setOpenState(_this.searchService.query.length > 0);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "options", {
        set: function (options) {
            if (options) {
                this.searchService.options = options;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsFilter", {
        set: function (filter) {
            if (filter) {
                this.searchService.optionsFilter = filter;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsLookup", {
        set: function (lookupFn) {
            this.searchService.optionsLookup = lookupFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsField", {
        set: function (field) {
            this.searchService.optionsField = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "resultFormatter", {
        get: function () {
            var _this = this;
            if (this._resultFormatter) {
                return this._resultFormatter;
            }
            else if (this.searchService.optionsLookup) {
                return function (r) { return _this.readValue(r); };
            }
            else {
                return function (r, q) {
                    return _this.searchService.highlightMatches(_this.readValue(r), q);
                };
            }
        },
        set: function (formatter) {
            this._resultFormatter = formatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "searchDelay", {
        set: function (delay) {
            this.searchService.searchDelay = delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "isSearching", {
        get: function () {
            return this.searchService.isSearching;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "results", {
        get: function () {
            return this.searchService.results.slice(0, this.maxResults);
        },
        enumerable: true,
        configurable: true
    });
    SuiSearch.prototype.ngAfterViewInit = function () {
        this._menu.service = this.dropdownService;
    };
    SuiSearch.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().search;
    };
    // Selects a result.
    SuiSearch.prototype.select = function (result) {
        this.onResultSelected.emit(result);
        this.dropdownService.setOpenState(false);
        if (this.retainSelectedResult) {
            this.selectedResult = result;
            this.searchService.updateQuery(this.readValue(result));
        }
        else {
            this.searchService.updateQuery("");
        }
    };
    SuiSearch.prototype.onClick = function (e) {
        this.open();
    };
    SuiSearch.prototype.onFocusIn = function () {
        if (!this.dropdownService.isAnimating) {
            this.open();
        }
    };
    SuiSearch.prototype.open = function () {
        if (this.searchService.query.length > 0) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    };
    SuiSearch.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
        }
    };
    SuiSearch.prototype.onDocumentClick = function (e) {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    };
    // Reads the specified field from an item.
    SuiSearch.prototype.readValue = function (object) {
        return Util.Object.readValue(object, this.searchService.optionsField);
    };
    SuiSearch.prototype.ngOnDestroy = function () {
        this._documentClickListener();
    };
    SuiSearch.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SuiLocalizationService }
    ]; };
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
            template: "\n        <div class=\"ui input\" [class.icon]=\"hasIcon\" (click)=\"onClick($event)\">\n            <input\n                class=\"prompt\"\n                type=\"text\"\n                [attr.placeholder]=\"placeholder\"\n                autocomplete=\"off\"\n                [(ngModel)]=\"query\"\n            />\n            <i *ngIf=\"hasIcon\" class=\"search icon\"></i>\n        </div>\n        <div\n            class=\"results\"\n            suiDropdownMenu\n            [menuTransition]=\"transition\"\n            [menuTransitionDuration]=\"transitionDuration\"\n            menuSelectedItemClass=\"active\"\n        >\n            <sui-search-result\n                *ngFor=\"let r of results\"\n                class=\"item\"\n                [value]=\"r\"\n                [query]=\"query\"\n                [formatter]=\"resultFormatter\"\n                [template]=\"resultTemplate\"\n                (click)=\"select(r)\"\n            ></sui-search-result>\n\n            <div *ngIf=\"results.length == 0\" class=\"message empty\">\n                <div class=\"header\">{{ localeValues.noResults.header }}</div>\n                <div class=\"description\">\n                    {{ localeValues.noResults.message }}\n                </div>\n            </div>\n        </div>\n    ",
            styles: ["\n            /* Ensures results div has margin. */\n            :host {\n                display: inline-block;\n            }\n\n            /* Fixes positioning when results are pushed above the search. */\n            .results {\n                margin-bottom: 0.5em;\n            }\n        "]
        })
    ], SuiSearch);
    return SuiSearch;
}());
export { SuiSearch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWFyY2gvY29tcG9uZW50cy9zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILElBQUksRUFHUCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUNILG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3pCLE1BQU0sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBMkQzRDtJQThJSSxtQkFDWSxRQUFtQixFQUMzQixRQUFrQixFQUNWLG9CQUEyQztRQUh2RCxpQkE2QkM7UUE1QlcsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUVuQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1FBRW5ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFRLENBQUM7UUFFL0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDakQsT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFO1FBQXJCLENBQXFCLENBQ3hCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMx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LENBQUMsUUFBUSxDQUFDLENBQUM7K0NBS3BDO0lBek5RLFNBQVM7UUFwRHJCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSx1eENBbUNUO3FCQUVHLDBTQVVDO1NBRVIsQ0FBQztPQUNXLFNBQVMsQ0E0T3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQTVPRCxJQTRPQztTQTVPWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0NoaWxkLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUmVuZGVyZXIyLFxuICAgIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBVdGlsLFxuICAgIElUZW1wbGF0ZVJlZkNvbnRleHQsXG4gICAgSUZvY3VzRXZlbnRcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHsgRHJvcGRvd25TZXJ2aWNlLCBTdWlEcm9wZG93bk1lbnUgfSBmcm9tIFwiLi4vLi4vZHJvcGRvd24vaW5kZXhcIjtcbmltcG9ydCB7XG4gICAgSVNlYXJjaExvY2FsZVZhbHVlcyxcbiAgICBSZWN1cnNpdmVQYXJ0aWFsLFxuICAgIFN1aUxvY2FsaXphdGlvblNlcnZpY2Vcbn0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvb2t1cEZuLCBGaWx0ZXJGbiB9IGZyb20gXCIuLi9oZWxwZXJzL2xvb2t1cC1mblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXN1bHRDb250ZXh0PFQ+IGV4dGVuZHMgSVRlbXBsYXRlUmVmQ29udGV4dDxUPiB7XG4gICAgcXVlcnk6c3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktc2VhcmNoXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpIGlucHV0XCIgW2NsYXNzLmljb25dPVwiaGFzSWNvblwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwicHJvbXB0XCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJxdWVyeVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJoYXNJY29uXCIgY2xhc3M9XCJzZWFyY2ggaWNvblwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwicmVzdWx0c1wiXG4gICAgICAgICAgICBzdWlEcm9wZG93bk1lbnVcbiAgICAgICAgICAgIFttZW51VHJhbnNpdGlvbl09XCJ0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgIFttZW51VHJhbnNpdGlvbkR1cmF0aW9uXT1cInRyYW5zaXRpb25EdXJhdGlvblwiXG4gICAgICAgICAgICBtZW51U2VsZWN0ZWRJdGVtQ2xhc3M9XCJhY3RpdmVcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c3VpLXNlYXJjaC1yZXN1bHRcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgciBvZiByZXN1bHRzXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJyXCJcbiAgICAgICAgICAgICAgICBbcXVlcnldPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgIFtmb3JtYXR0ZXJdPVwicmVzdWx0Rm9ybWF0dGVyXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwicmVzdWx0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QocilcIlxuICAgICAgICAgICAgPjwvc3VpLXNlYXJjaC1yZXN1bHQ+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJyZXN1bHRzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJtZXNzYWdlIGVtcHR5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPnt7IGxvY2FsZVZhbHVlcy5ub1Jlc3VsdHMuaGVhZGVyIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGxvY2FsZVZhbHVlcy5ub1Jlc3VsdHMubWVzc2FnZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC8qIEVuc3VyZXMgcmVzdWx0cyBkaXYgaGFzIG1hcmdpbi4gKi9cbiAgICAgICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEZpeGVzIHBvc2l0aW9uaW5nIHdoZW4gcmVzdWx0cyBhcmUgcHVzaGVkIGFib3ZlIHRoZSBzZWFyY2guICovXG4gICAgICAgICAgICAucmVzdWx0cyB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlYXJjaDxUPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgcHVibGljIGRyb3Bkb3duU2VydmljZTpEcm9wZG93blNlcnZpY2U7XG4gICAgcHVibGljIHNlYXJjaFNlcnZpY2U6U2VhcmNoU2VydmljZTxULCBUPjtcblxuICAgIEBWaWV3Q2hpbGQoU3VpRHJvcGRvd25NZW51LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX21lbnU6U3VpRHJvcGRvd25NZW51O1xuXG4gICAgLy8gU2V0cyB0aGUgU2VtYW50aWMgVUkgY2xhc3NlcyBvbiB0aGUgaG9zdCBlbGVtZW50LlxuICAgIC8vIERvaW5nIGl0IG9uIHRoZSBob3N0IGVuYWJsZXMgdXNlIGluIG1lbnVzIGV0Yy5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnNlYXJjaFwiKVxuICAgIHB1YmxpYyBzZWFyY2hDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5hY3RpdmVcIilcbiAgICBwdWJsaWMgZ2V0IGlzQWN0aXZlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duU2VydmljZS5pc09wZW47XG4gICAgfVxuXG4gICAgLy8gU2V0cyB3aGV0aGVyIHRoZSBzZWFyY2ggZWxlbWVudCBoYXMgYSB2aXNpYmxlIHNlYXJjaCBpY29uLlxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGhhc0ljb246Ym9vbGVhbjtcblxuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyOnN0cmluZztcblxuICAgIC8vIEdldHMgJiBzZXRzIHRoZSBwbGFjZWhvbGRlciB0ZXh0IGRpc3BsYXllZCBpbnNpZGUgdGhlIHRleHQgaW5wdXQuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHBsYWNlaG9sZGVyKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyIHx8IHRoaXMubG9jYWxlVmFsdWVzLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9jYWxlVmFsdWVzOklTZWFyY2hMb2NhbGVWYWx1ZXM7XG5cbiAgICBwdWJsaWMgbG9jYWxlT3ZlcnJpZGVzOlJlY3Vyc2l2ZVBhcnRpYWw8SVNlYXJjaExvY2FsZVZhbHVlcz47XG5cbiAgICBwdWJsaWMgZ2V0IGxvY2FsZVZhbHVlcygpOklTZWFyY2hMb2NhbGVWYWx1ZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vdmVycmlkZTxcInNlYXJjaFwiPihcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsZVZhbHVlcyxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlT3ZlcnJpZGVzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBxdWVyeSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBxdWVyeShxdWVyeTpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gSW5pdGlhbGlzZSBhIGRlbGF5ZWQgc2VhcmNoLlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnlEZWxheWVkKHF1ZXJ5LCAoKSA9PlxuICAgICAgICAgICAgLy8gU2V0IHRoZSByZXN1bHRzIG9wZW4gc3RhdGUgZGVwZW5kaW5nIG9uIHdoZXRoZXIgYSBxdWVyeSBoYXMgYmVlbiBlbnRlcmVkLlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5sZW5ndGggPiAwXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnMob3B0aW9uczpUW10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zRmlsdGVyKGZpbHRlcjpGaWx0ZXJGbjxUPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zTG9va3VwKGxvb2t1cEZuOkxvb2t1cEZuPFQ+IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zTG9va3VwID0gbG9va3VwRm47XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNGaWVsZChmaWVsZDpzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWVsZCA9IGZpZWxkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc3VsdEZvcm1hdHRlcj86KHI6VCwgcTpzdHJpbmcpID0+IHN0cmluZztcblxuICAgIHB1YmxpYyBnZXQgcmVzdWx0Rm9ybWF0dGVyKCk6KHJlc3VsdDpULCBxdWVyeTpzdHJpbmcpID0+IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl9yZXN1bHRGb3JtYXR0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHRGb3JtYXR0ZXI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNMb29rdXApIHtcbiAgICAgICAgICAgIHJldHVybiByID0+IHRoaXMucmVhZFZhbHVlKHIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChyLCBxKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5oaWdobGlnaHRNYXRjaGVzKHRoaXMucmVhZFZhbHVlKHIpLCBxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCByZXN1bHRGb3JtYXR0ZXIoXG4gICAgICAgIGZvcm1hdHRlcjoocmVzdWx0OlQsIHF1ZXJ5OnN0cmluZykgPT4gc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdEZvcm1hdHRlciA9IGZvcm1hdHRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByZXN1bHRUZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJUmVzdWx0Q29udGV4dDxUPj47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyByZXRhaW5TZWxlY3RlZFJlc3VsdDpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHNlYXJjaERlbGF5KGRlbGF5Om51bWJlcikge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoRGVsYXkgPSBkZWxheTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5sb2FkaW5nXCIpXG4gICAgcHVibGljIGdldCBpc1NlYXJjaGluZygpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLmlzU2VhcmNoaW5nO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1heFJlc3VsdHM6bnVtYmVyO1xuXG4gICAgcHVibGljIGdldCByZXN1bHRzKCk6VFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLnNsaWNlKDAsIHRoaXMubWF4UmVzdWx0cyk7XG4gICAgfVxuXG4gICAgLy8gU3RvcmVzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcmVzdWx0LlxuICAgIHB1YmxpYyBzZWxlY3RlZFJlc3VsdD86VDtcblxuICAgIC8vIEVtaXRzIHdoZW5ldmVyIGEgbmV3IHJlc3VsdCBpcyBzZWxlY3RlZC5cbiAgICBAT3V0cHV0KFwicmVzdWx0U2VsZWN0ZWRcIilcbiAgICBwdWJsaWMgb25SZXN1bHRTZWxlY3RlZDpFdmVudEVtaXR0ZXI8VD47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRyYW5zaXRpb25EdXJhdGlvbjpudW1iZXI7XG5cbiAgICBwcml2YXRlIF9kb2N1bWVudENsaWNrTGlzdGVuZXI6KCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHJlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlID0gbmV3IERyb3Bkb3duU2VydmljZSgpO1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZTxULCBUPigpO1xuXG4gICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKTtcbiAgICAgICAgdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbkxvY2FsZVVwZGF0ZSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hDbGFzc2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oYXNJY29uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXRhaW5TZWxlY3RlZFJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VhcmNoRGVsYXkgPSAyMDA7XG4gICAgICAgIHRoaXMubWF4UmVzdWx0cyA9IDc7XG5cbiAgICAgICAgdGhpcy5vblJlc3VsdFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IFwic2NhbGVcIjtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gPSAyMDA7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgXCJkb2N1bWVudFwiLFxuICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgKGU6TW91c2VFdmVudCkgPT4gdGhpcy5vbkRvY3VtZW50Q2xpY2soZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX21lbnUuc2VydmljZSA9IHRoaXMuZHJvcGRvd25TZXJ2aWNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2NhbGVVcGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fbG9jYWxlVmFsdWVzID0gdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5nZXQoKS5zZWFyY2g7XG4gICAgfVxuXG4gICAgLy8gU2VsZWN0cyBhIHJlc3VsdC5cbiAgICBwdWJsaWMgc2VsZWN0KHJlc3VsdDpUKTp2b2lkIHtcbiAgICAgICAgdGhpcy5vblJlc3VsdFNlbGVjdGVkLmVtaXQocmVzdWx0KTtcbiAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKGZhbHNlKTtcblxuICAgICAgICBpZiAodGhpcy5yZXRhaW5TZWxlY3RlZFJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS51cGRhdGVRdWVyeSh0aGlzLnJlYWRWYWx1ZShyZXN1bHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS51cGRhdGVRdWVyeShcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKGU6TW91c2VFdmVudCk6dm9pZCB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c2luXCIpXG4gICAgcHVibGljIG9uRm9jdXNJbigpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd25TZXJ2aWNlLmlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbigpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIE9ubHkgb3BlbiBvbiBjbGljayB3aGVuIHRoZXJlIGlzIGEgcXVlcnkgZW50ZXJlZC5cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uRm9jdXNPdXQoZTpJRm9jdXNFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Eb2N1bWVudENsaWNrKGU6TW91c2VFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blNlcnZpY2Uuc2V0T3BlblN0YXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlYWRzIHRoZSBzcGVjaWZpZWQgZmllbGQgZnJvbSBhbiBpdGVtLlxuICAgIHB1YmxpYyByZWFkVmFsdWUob2JqZWN0OlQpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBVdGlsLk9iamVjdC5yZWFkVmFsdWU8VCwgc3RyaW5nPihcbiAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmllbGRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgfVxufVxuIl19