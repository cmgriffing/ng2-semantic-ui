import * as tslib_1 from "tslib";
import { Component, ViewChild, HostBinding, Input, AfterViewInit, HostListener, EventEmitter, Output, Directive, ElementRef, TemplateRef, Renderer2, OnDestroy } from "@angular/core";
import { SearchService } from "../services/search.service";
import { Util } from "../../../misc/util/helpers/util";
import { DropdownService } from "../../../modules/dropdown/services/dropdown.service";
import { SuiDropdownMenu } from "../../../modules/dropdown/directives/dropdown-menu";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
var SuiSearch = /** @class */ (function () {
    function SuiSearch(_element, _renderer, _localizationService) {
        var _this = this;
        this._element = _element;
        this._renderer = _renderer;
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
        this._documentClickListener = _renderer.listen("document", "click", function (e) { return _this.onDocumentClick(e); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWFyY2gvY29tcG9uZW50cy9zZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxJQUFJLEVBQXVCLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUtyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQTJEdkc7SUE4SUksbUJBQ1ksUUFBbUIsRUFDakIsU0FBbUIsRUFDckIsb0JBQTJDO1FBSHZELGlCQTZCQztRQTVCVyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDckIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtRQUVuRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBUSxDQUFDO1FBRS9DLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQ2pELE9BQUEsS0FBSSxDQUFDLGNBQWMsRUFBRTtRQUFyQixDQUFxQixDQUN4QixDQUFDO1FBRUYs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S3ZCO0lBVUQ7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7K0NBS3BDO0lBek5RLFNBQVM7UUFwRHJCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSx1eENBbUNUO3FCQUVHLDBTQVVDO1NBRVIsQ0FBQztPQUNXLFNBQVMsQ0E0T3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQTVPRCxJQTRPQztTQTVPWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0NoaWxkLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUmVuZGVyZXIyLFxuICAgIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgTG9va3VwRm4sIEZpbHRlckZuIH0gZnJvbSBcIi4uL2hlbHBlcnMvbG9va3VwLWZuXCI7XG5pbXBvcnQgeyBVdGlsLCBJVGVtcGxhdGVSZWZDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcbmltcG9ydCB7IERyb3Bkb3duU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL2Ryb3Bkb3duL3NlcnZpY2VzL2Ryb3Bkb3duLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1aURyb3Bkb3duTWVudSB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL2Ryb3Bkb3duL2RpcmVjdGl2ZXMvZHJvcGRvd24tbWVudVwiO1xuaW1wb3J0IHtcbiAgICBJU2VhcmNoTG9jYWxlVmFsdWVzLFxuICAgIFJlY3Vyc2l2ZVBhcnRpYWxcbn0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW50ZXJmYWNlcy92YWx1ZXNcIjtcbmltcG9ydCB7IFN1aUxvY2FsaXphdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9zZXJ2aWNlcy9sb2NhbGl6YXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgSUZvY3VzRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvZm9jdXMtZXZlbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVzdWx0Q29udGV4dDxUPiBleHRlbmRzIElUZW1wbGF0ZVJlZkNvbnRleHQ8VD4ge1xuICAgIHF1ZXJ5OnN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXNlYXJjaFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aSBpbnB1dFwiIFtjbGFzcy5pY29uXT1cImhhc0ljb25cIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInByb21wdFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicXVlcnlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiaGFzSWNvblwiIGNsYXNzPVwic2VhcmNoIGljb25cIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInJlc3VsdHNcIlxuICAgICAgICAgICAgc3VpRHJvcGRvd25NZW51XG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25dPVwidHJhbnNpdGlvblwiXG4gICAgICAgICAgICBbbWVudVRyYW5zaXRpb25EdXJhdGlvbl09XCJ0cmFuc2l0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgbWVudVNlbGVjdGVkSXRlbUNsYXNzPVwiYWN0aXZlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHN1aS1zZWFyY2gtcmVzdWx0XG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHIgb2YgcmVzdWx0c1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJpdGVtXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwiclwiXG4gICAgICAgICAgICAgICAgW3F1ZXJ5XT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICBbZm9ybWF0dGVyXT1cInJlc3VsdEZvcm1hdHRlclwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cInJlc3VsdFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHIpXCJcbiAgICAgICAgICAgID48L3N1aS1zZWFyY2gtcmVzdWx0PlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzdWx0cy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibWVzc2FnZSBlbXB0eVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj57eyBsb2NhbGVWYWx1ZXMubm9SZXN1bHRzLmhlYWRlciB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBsb2NhbGVWYWx1ZXMubm9SZXN1bHRzLm1lc3NhZ2UgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAvKiBFbnN1cmVzIHJlc3VsdHMgZGl2IGhhcyBtYXJnaW4uICovXG4gICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBGaXhlcyBwb3NpdGlvbmluZyB3aGVuIHJlc3VsdHMgYXJlIHB1c2hlZCBhYm92ZSB0aGUgc2VhcmNoLiAqL1xuICAgICAgICAgICAgLnJlc3VsdHMge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNWVtO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTZWFyY2g8VD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBkcm9wZG93blNlcnZpY2U6RHJvcGRvd25TZXJ2aWNlO1xuICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOlNlYXJjaFNlcnZpY2U8VCwgVD47XG5cbiAgICBAVmlld0NoaWxkKFN1aURyb3Bkb3duTWVudSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9tZW51OlN1aURyb3Bkb3duTWVudTtcblxuICAgIC8vIFNldHMgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICAvLyBEb2luZyBpdCBvbiB0aGUgaG9zdCBlbmFibGVzIHVzZSBpbiBtZW51cyBldGMuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5zZWFyY2hcIilcbiAgICBwdWJsaWMgc2VhcmNoQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9wZG93blNlcnZpY2UuaXNPcGVuO1xuICAgIH1cblxuICAgIC8vIFNldHMgd2hldGhlciB0aGUgc2VhcmNoIGVsZW1lbnQgaGFzIGEgdmlzaWJsZSBzZWFyY2ggaWNvbi5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBoYXNJY29uOmJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjpzdHJpbmc7XG5cbiAgICAvLyBHZXRzICYgc2V0cyB0aGUgcGxhY2Vob2xkZXIgdGV4dCBkaXNwbGF5ZWQgaW5zaWRlIHRoZSB0ZXh0IGlucHV0LlxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBwbGFjZWhvbGRlcigpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlciB8fCB0aGlzLmxvY2FsZVZhbHVlcy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyOnN0cmluZykge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvY2FsZVZhbHVlczpJU2VhcmNoTG9jYWxlVmFsdWVzO1xuXG4gICAgcHVibGljIGxvY2FsZU92ZXJyaWRlczpSZWN1cnNpdmVQYXJ0aWFsPElTZWFyY2hMb2NhbGVWYWx1ZXM+O1xuXG4gICAgcHVibGljIGdldCBsb2NhbGVWYWx1ZXMoKTpJU2VhcmNoTG9jYWxlVmFsdWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2Uub3ZlcnJpZGU8XCJzZWFyY2hcIj4oXG4gICAgICAgICAgICB0aGlzLl9sb2NhbGVWYWx1ZXMsXG4gICAgICAgICAgICB0aGlzLmxvY2FsZU92ZXJyaWRlc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcXVlcnkoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcXVlcnkocXVlcnk6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIEluaXRpYWxpc2UgYSBkZWxheWVkIHNlYXJjaC5cbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnVwZGF0ZVF1ZXJ5RGVsYXllZChxdWVyeSwgKCkgPT5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgcmVzdWx0cyBvcGVuIHN0YXRlIGRlcGVuZGluZyBvbiB3aGV0aGVyIGEgcXVlcnkgaGFzIGJlZW4gZW50ZXJlZC5cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkubGVuZ3RoID4gMFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zKG9wdGlvbnM6VFtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0ZpbHRlcihmaWx0ZXI6RmlsdGVyRm48VD4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm9wdGlvbnNGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0xvb2t1cChsb29rdXBGbjpMb29rdXBGbjxUPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0xvb2t1cCA9IGxvb2t1cEZuO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBvcHRpb25zRmllbGQoZmllbGQ6c3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zRmllbGQgPSBmaWVsZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXN1bHRGb3JtYXR0ZXI/OihyOlQsIHE6c3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0IHJlc3VsdEZvcm1hdHRlcigpOihyZXN1bHQ6VCwgcXVlcnk6c3RyaW5nKSA9PiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fcmVzdWx0Rm9ybWF0dGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0Rm9ybWF0dGVyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5vcHRpb25zTG9va3VwKSB7XG4gICAgICAgICAgICByZXR1cm4gciA9PiB0aGlzLnJlYWRWYWx1ZShyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAociwgcSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuaGlnaGxpZ2h0TWF0Y2hlcyh0aGlzLnJlYWRWYWx1ZShyKSwgcSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcmVzdWx0Rm9ybWF0dGVyKFxuICAgICAgICBmb3JtYXR0ZXI6KHJlc3VsdDpULCBxdWVyeTpzdHJpbmcpID0+IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLl9yZXN1bHRGb3JtYXR0ZXIgPSBmb3JtYXR0ZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmVzdWx0VGVtcGxhdGU6VGVtcGxhdGVSZWY8SVJlc3VsdENvbnRleHQ8VD4+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmV0YWluU2VsZWN0ZWRSZXN1bHQ6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBzZWFyY2hEZWxheShkZWxheTpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaERlbGF5ID0gZGVsYXk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MubG9hZGluZ1wiKVxuICAgIHB1YmxpYyBnZXQgaXNTZWFyY2hpbmcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5pc1NlYXJjaGluZztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtYXhSZXN1bHRzOm51bWJlcjtcblxuICAgIHB1YmxpYyBnZXQgcmVzdWx0cygpOlRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5zbGljZSgwLCB0aGlzLm1heFJlc3VsdHMpO1xuICAgIH1cblxuICAgIC8vIFN0b3JlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJlc3VsdC5cbiAgICBwdWJsaWMgc2VsZWN0ZWRSZXN1bHQ/OlQ7XG5cbiAgICAvLyBFbWl0cyB3aGVuZXZlciBhIG5ldyByZXN1bHQgaXMgc2VsZWN0ZWQuXG4gICAgQE91dHB1dChcInJlc3VsdFNlbGVjdGVkXCIpXG4gICAgcHVibGljIG9uUmVzdWx0U2VsZWN0ZWQ6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRDbGlja0xpc3RlbmVyOigpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlID0gbmV3IERyb3Bkb3duU2VydmljZSgpO1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZTxULCBUPigpO1xuXG4gICAgICAgIHRoaXMub25Mb2NhbGVVcGRhdGUoKTtcbiAgICAgICAgdGhpcy5fbG9jYWxpemF0aW9uU2VydmljZS5vbkxhbmd1YWdlVXBkYXRlLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbkxvY2FsZVVwZGF0ZSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hDbGFzc2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oYXNJY29uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXRhaW5TZWxlY3RlZFJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VhcmNoRGVsYXkgPSAyMDA7XG4gICAgICAgIHRoaXMubWF4UmVzdWx0cyA9IDc7XG5cbiAgICAgICAgdGhpcy5vblJlc3VsdFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IFwic2NhbGVcIjtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gPSAyMDA7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgIFwiZG9jdW1lbnRcIixcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIChlOk1vdXNlRXZlbnQpID0+IHRoaXMub25Eb2N1bWVudENsaWNrKGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLl9tZW51LnNlcnZpY2UgPSB0aGlzLmRyb3Bkb3duU2VydmljZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTG9jYWxlVXBkYXRlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2xvY2FsZVZhbHVlcyA9IHRoaXMuX2xvY2FsaXphdGlvblNlcnZpY2UuZ2V0KCkuc2VhcmNoO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdHMgYSByZXN1bHQuXG4gICAgcHVibGljIHNlbGVjdChyZXN1bHQ6VCk6dm9pZCB7XG4gICAgICAgIHRoaXMub25SZXN1bHRTZWxlY3RlZC5lbWl0KHJlc3VsdCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucmV0YWluU2VsZWN0ZWRSZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkodGhpcy5yZWFkVmFsdWUocmVzdWx0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UudXBkYXRlUXVlcnkoXCJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNpblwiKVxuICAgIHB1YmxpYyBvbkZvY3VzSW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duU2VydmljZS5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBPbmx5IG9wZW4gb24gY2xpY2sgd2hlbiB0aGVyZSBpcyBhIHF1ZXJ5IGVudGVyZWQuXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KGU6SUZvY3VzRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duU2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uRG9jdW1lbnRDbGljayhlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWFkcyB0aGUgc3BlY2lmaWVkIGZpZWxkIGZyb20gYW4gaXRlbS5cbiAgICBwdWJsaWMgcmVhZFZhbHVlKG9iamVjdDpUKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gVXRpbC5PYmplY3QucmVhZFZhbHVlPFQsIHN0cmluZz4oXG4gICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub3B0aW9uc0ZpZWxkXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgIH1cbn1cbiJdfQ==