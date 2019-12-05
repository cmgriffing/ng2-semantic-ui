import * as tslib_1 from "tslib";
import { Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild, ElementRef, HostListener, QueryList, ContentChildren, OnInit } from "@angular/core";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
import { SuiDropdownMenu } from "./dropdown-menu";
import { KeyCode } from "../../../misc/util/helpers/util";
var SuiDropdown = /** @class */ (function () {
    function SuiDropdown(_element) {
        this._element = _element;
    }
    SuiDropdown_1 = SuiDropdown;
    Object.defineProperty(SuiDropdown.prototype, "filteredChildren", {
        get: function () {
            var _this = this;
            // @ContentChildren includes the current element by default.
            return this.children.filter(function (c) { return c !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isOpenChange", {
        get: function () {
            return this.service.isOpenChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isActive", {
        get: function () {
            // This is to ensure nested dropdowns don't get made bold.
            return this.service.isOpen && !this.service.isNested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isOpen", {
        get: function () {
            return this.service.isOpen;
        },
        set: function (value) {
            // If we are opening the dropdown, we want to always open its parents.
            this.service.setOpenState(value, !!value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isDisabled", {
        get: function () {
            return this.service.isDisabled;
        },
        set: function (value) {
            this.service.setDisabledState(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "tabIndexBinding", {
        get: function () {
            if (this.isDisabled || this.service.isNested) {
                // If disabled, remove from tabindex.
                return undefined;
            }
            if (this.tabIndex != undefined) {
                // If custom tabindex, default to that.
                return this.tabIndex;
            }
            // Otherwise, return default of 0.
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "autoClose", {
        get: function () {
            return this.service.autoCloseMode;
        },
        set: function (value) {
            this.service.autoCloseMode = value;
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdown.prototype.ngOnInit = function () {
        var _this = this;
        this.service = new DropdownService();
        this.service.isOpenChange.subscribe(function () {
            if (_this.service.isOpen) {
                _this._element.nativeElement.focus();
            }
        });
    };
    SuiDropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this.menu.service = this.service;
        this.childrenUpdated();
        this.children.changes.subscribe(function () { return _this.childrenUpdated(); });
    };
    SuiDropdown.prototype.childrenUpdated = function () {
        var _this = this;
        // Reregister child dropdowns each time the menu content changes.
        this.filteredChildren
            .map(function (c) { return c.service; })
            .forEach(function (s) { return _this.service.registerChild(s); });
    };
    SuiDropdown.prototype.onClick = function (e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            this.service.toggleOpenState();
        }
    };
    SuiDropdown.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.externallyClose();
        }
    };
    SuiDropdown.prototype.onKeypress = function (e) {
        // Block the keyboard event from being fired on parent dropdowns.
        if (!e.eventHandled) {
            if (e.keyCode === KeyCode.Enter) {
                e.eventHandled = true;
                this.service.setOpenState(true);
            }
        }
    };
    SuiDropdown.prototype.externallyClose = function () {
        if (this.service.autoCloseMode === DropdownAutoCloseType.ItemClick ||
            this.service.autoCloseMode === DropdownAutoCloseType.OutsideClick) {
            // No need to reflect in parent since they are also bound to document.
            this.service.setOpenState(false);
        }
    };
    var SuiDropdown_1;
    SuiDropdown.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        ContentChild(SuiDropdownMenu, { static: true })
    ], SuiDropdown.prototype, "menu", void 0);
    tslib_1.__decorate([
        ContentChildren(SuiDropdown_1, { descendants: true })
    ], SuiDropdown.prototype, "children", void 0);
    tslib_1.__decorate([
        Output()
    ], SuiDropdown.prototype, "isOpenChange", null);
    tslib_1.__decorate([
        HostBinding("class.active")
    ], SuiDropdown.prototype, "isActive", null);
    tslib_1.__decorate([
        Input()
    ], SuiDropdown.prototype, "isOpen", null);
    tslib_1.__decorate([
        HostBinding("class.disabled"),
        Input()
    ], SuiDropdown.prototype, "isDisabled", null);
    tslib_1.__decorate([
        Input("tabindex")
    ], SuiDropdown.prototype, "tabIndex", void 0);
    tslib_1.__decorate([
        HostBinding("attr.tabindex")
    ], SuiDropdown.prototype, "tabIndexBinding", null);
    tslib_1.__decorate([
        Input()
    ], SuiDropdown.prototype, "autoClose", null);
    tslib_1.__decorate([
        HostListener("click", ["$event"])
    ], SuiDropdown.prototype, "onClick", null);
    tslib_1.__decorate([
        HostListener("focusout", ["$event"])
    ], SuiDropdown.prototype, "onFocusOut", null);
    tslib_1.__decorate([
        HostListener("keypress", ["$event"])
    ], SuiDropdown.prototype, "onKeypress", null);
    SuiDropdown = SuiDropdown_1 = tslib_1.__decorate([
        Directive({
            selector: "[suiDropdown]"
        })
    ], SuiDropdown);
    return SuiDropdown;
}());
export { SuiDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2Ryb3Bkb3duL2RpcmVjdGl2ZXMvZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsZUFBZSxFQUNmLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsZUFBZSxFQUNmLHFCQUFxQixFQUN4QixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQWdCLE9BQU8sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTXhFO0lBdUVJLHFCQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBQUcsQ0FBQztvQkF2RWxDLFdBQVc7SUFTcEIsc0JBQVcseUNBQWdCO2FBQTNCO1lBQUEsaUJBR0M7WUFGRyw0REFBNEQ7WUFDNUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxLQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxxQ0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxpQ0FBUTthQUFuQjtZQUNJLDBEQUEwRDtZQUMxRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDekQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVywrQkFBTTthQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDL0IsQ0FBQzthQUVELFVBQWtCLEtBQWE7WUFDM0Isc0VBQXNFO1lBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BTEE7SUFTRCxzQkFBVyxtQ0FBVTthQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDbkMsQ0FBQzthQUVELFVBQXNCLEtBQWE7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0FKQTtJQVVELHNCQUFXLHdDQUFlO2FBQTFCO1lBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxxQ0FBcUM7Z0JBQ3JDLE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtnQkFDNUIsdUNBQXVDO2dCQUN2QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDeEI7WUFDRCxrQ0FBa0M7WUFDbEMsT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLGtDQUFTO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUN0QyxDQUFDO2FBRUQsVUFBcUIsS0FBMkI7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUM7OztPQUpBO0lBUU0sOEJBQVEsR0FBZjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHdDQUFrQixHQUF6QjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUNYLHFEQUFxRCxDQUN4RCxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWpDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxxQ0FBZSxHQUF2QjtRQUFBLGlCQUtDO1FBSkcsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxnQkFBZ0I7YUFDaEIsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sRUFBVCxDQUFTLENBQUM7YUFDbkIsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBR00sNkJBQU8sR0FBZCxVQUFlLENBQWM7UUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDakIsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFHTyxnQ0FBVSxHQUFsQixVQUFtQixDQUFhO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFHTSxnQ0FBVSxHQUFqQixVQUFrQixDQUE4QjtRQUM1QyxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQzdCLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztTQUNKO0lBQ0wsQ0FBQztJQUVPLHFDQUFlLEdBQXZCO1FBQ0ksSUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsS0FBSyxxQkFBcUIsQ0FBQyxTQUFTO1lBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLHFCQUFxQixDQUFDLFlBQVksRUFDbkU7WUFDRSxzRUFBc0U7WUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDOzs7Z0JBbEU0QixVQUFVOztJQW5FdkM7UUFEQyxZQUFZLENBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzZDQUNwQjtJQUc1QjtRQURDLGVBQWUsQ0FBQyxhQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7aURBQ2I7SUFRdkM7UUFEQyxNQUFNLEVBQUU7bURBR1I7SUFHRDtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7K0NBSTNCO0lBR0Q7UUFEQyxLQUFLLEVBQUU7NkNBR1A7SUFTRDtRQUZDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3QixLQUFLLEVBQUU7aURBR1A7SUFPRDtRQURDLEtBQUssQ0FBQyxVQUFVLENBQUM7aURBQ007SUFHeEI7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO3NEQVk1QjtJQUdEO1FBREMsS0FBSyxFQUFFO2dEQUdQO0lBcUNEO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzhDQU9qQztJQUdEO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lEQUtwQztJQUdEO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lEQVVwQztJQS9IUSxXQUFXO1FBSHZCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1NBQzVCLENBQUM7T0FDVyxXQUFXLENBMEl2QjtJQUFELGtCQUFDO0NBQUEsQUExSUQsSUEwSUM7U0ExSVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgUXVlcnlMaXN0LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBPbkluaXRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgRHJvcGRvd25TZXJ2aWNlLFxuICAgIERyb3Bkb3duQXV0b0Nsb3NlVHlwZVxufSBmcm9tIFwiLi4vc2VydmljZXMvZHJvcGRvd24uc2VydmljZVwiO1xuaW1wb3J0IHsgU3VpRHJvcGRvd25NZW51IH0gZnJvbSBcIi4vZHJvcGRvd24tbWVudVwiO1xuaW1wb3J0IHsgSGFuZGxlZEV2ZW50LCBLZXlDb2RlIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcbmltcG9ydCB7IElGb2N1c0V2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2ZvY3VzLWV2ZW50XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlEcm9wZG93bl1cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlEcm9wZG93biBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gICAgcHVibGljIHNlcnZpY2U6RHJvcGRvd25TZXJ2aWNlO1xuXG4gICAgQENvbnRlbnRDaGlsZChTdWlEcm9wZG93bk1lbnUsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIG1lbnU6U3VpRHJvcGRvd25NZW51O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlEcm9wZG93biwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHB1YmxpYyBjaGlsZHJlbjpRdWVyeUxpc3Q8U3VpRHJvcGRvd24+O1xuXG4gICAgcHVibGljIGdldCBmaWx0ZXJlZENoaWxkcmVuKCk6U3VpRHJvcGRvd25bXSB7XG4gICAgICAgIC8vIEBDb250ZW50Q2hpbGRyZW4gaW5jbHVkZXMgdGhlIGN1cnJlbnQgZWxlbWVudCBieSBkZWZhdWx0LlxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoYyA9PiBjICE9PSB0aGlzKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzT3BlbkNoYW5nZSgpOkV2ZW50RW1pdHRlcjxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNPcGVuQ2hhbmdlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0byBlbnN1cmUgbmVzdGVkIGRyb3Bkb3ducyBkb24ndCBnZXQgbWFkZSBib2xkLlxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzT3BlbiAmJiAhdGhpcy5zZXJ2aWNlLmlzTmVzdGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBpc09wZW4oKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc09wZW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc09wZW4odmFsdWU6Ym9vbGVhbikge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgb3BlbmluZyB0aGUgZHJvcGRvd24sIHdlIHdhbnQgdG8gYWx3YXlzIG9wZW4gaXRzIHBhcmVudHMuXG4gICAgICAgIHRoaXMuc2VydmljZS5zZXRPcGVuU3RhdGUodmFsdWUsICEhdmFsdWUpO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRpc2FibGVkXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWQoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNEaXNhYmxlZCh2YWx1ZTpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZXREaXNhYmxlZFN0YXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJ0YWJpbmRleFwiKVxuICAgIHB1YmxpYyB0YWJJbmRleD86bnVtYmVyO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci50YWJpbmRleFwiKVxuICAgIHB1YmxpYyBnZXQgdGFiSW5kZXhCaW5kaW5nKCk6bnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCB0aGlzLnNlcnZpY2UuaXNOZXN0ZWQpIHtcbiAgICAgICAgICAgIC8vIElmIGRpc2FibGVkLCByZW1vdmUgZnJvbSB0YWJpbmRleC5cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGFiSW5kZXggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiBjdXN0b20gdGFiaW5kZXgsIGRlZmF1bHQgdG8gdGhhdC5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYkluZGV4O1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgcmV0dXJuIGRlZmF1bHQgb2YgMC5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGF1dG9DbG9zZSgpOkRyb3Bkb3duQXV0b0Nsb3NlVHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuYXV0b0Nsb3NlTW9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGF1dG9DbG9zZSh2YWx1ZTpEcm9wZG93bkF1dG9DbG9zZVR5cGUpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmF1dG9DbG9zZU1vZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IERyb3Bkb3duU2VydmljZSgpO1xuICAgICAgICB0aGlzLnNlcnZpY2UuaXNPcGVuQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJZb3UgbXVzdCBzZXQgW3N1aURyb3Bkb3duTWVudV0gb24gdGhlIG1lbnUgZWxlbWVudC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuVXBkYXRlZCgpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hpbGRyZW5VcGRhdGVkKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hpbGRyZW5VcGRhdGVkKCk6dm9pZCB7XG4gICAgICAgIC8vIFJlcmVnaXN0ZXIgY2hpbGQgZHJvcGRvd25zIGVhY2ggdGltZSB0aGUgbWVudSBjb250ZW50IGNoYW5nZXMuXG4gICAgICAgIHRoaXMuZmlsdGVyZWRDaGlsZHJlblxuICAgICAgICAgICAgLm1hcChjID0+IGMuc2VydmljZSlcbiAgICAgICAgICAgIC5mb3JFYWNoKHMgPT4gdGhpcy5zZXJ2aWNlLnJlZ2lzdGVyQ2hpbGQocykpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uQ2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS50b2dnbGVPcGVuU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHJpdmF0ZSBvbkZvY3VzT3V0KGU6SUZvY3VzRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsbHlDbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXByZXNzXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25LZXlwcmVzcyhlOkhhbmRsZWRFdmVudCAmIEtleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICAvLyBCbG9jayB0aGUga2V5Ym9hcmQgZXZlbnQgZnJvbSBiZWluZyBmaXJlZCBvbiBwYXJlbnQgZHJvcGRvd25zLlxuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLZXlDb2RlLkVudGVyKSB7XG4gICAgICAgICAgICAgICAgZS5ldmVudEhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXh0ZXJuYWxseUNsb3NlKCk6dm9pZCB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hdXRvQ2xvc2VNb2RlID09PSBEcm9wZG93bkF1dG9DbG9zZVR5cGUuSXRlbUNsaWNrIHx8XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuYXV0b0Nsb3NlTW9kZSA9PT0gRHJvcGRvd25BdXRvQ2xvc2VUeXBlLk91dHNpZGVDbGlja1xuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gcmVmbGVjdCBpbiBwYXJlbnQgc2luY2UgdGhleSBhcmUgYWxzbyBib3VuZCB0byBkb2N1bWVudC5cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19