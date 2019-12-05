import * as tslib_1 from "tslib";
import { Directive, ContentChild, forwardRef, Renderer2, ElementRef, AfterContentInit, ContentChildren, QueryList, Input, HostListener, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { DropdownAutoCloseType } from "../services/dropdown.service";
// Polyfill for IE
import "element-closest";
import { Transition, TransitionDirection } from "../../../modules/transition/classes/transition";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { KeyCode } from "../../../misc/util/helpers/util";
var SuiDropdownMenuItem = /** @class */ (function () {
    function SuiDropdownMenuItem(_renderer, element) {
        this._renderer = _renderer;
        this.element = element;
        this.isSelected = false;
        this.selectedClass = "selected";
    }
    Object.defineProperty(SuiDropdownMenuItem.prototype, "isDisabled", {
        get: function () {
            // We must use nativeElement as Angular doesn't have a way of reading class information.
            var element = this.element.nativeElement;
            return element.classList.contains("disabled");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenuItem.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            // Renderer is used to enable a dynamic class name.
            if (value) {
                this._renderer.addClass(this.element.nativeElement, this.selectedClass);
            }
            else {
                this._renderer.removeClass(this.element.nativeElement, this.selectedClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenuItem.prototype, "hasChildDropdown", {
        get: function () {
            return !!this.childDropdownMenu;
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdownMenuItem.prototype.performClick = function () {
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this.element.nativeElement.click();
    };
    SuiDropdownMenuItem.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        ContentChild(forwardRef(function () { return SuiDropdownMenu; }), { static: true })
    ], SuiDropdownMenuItem.prototype, "childDropdownMenu", void 0);
    SuiDropdownMenuItem = tslib_1.__decorate([
        Directive({
            // We must attach to every '.item' as Angular doesn't support > selectors.
            selector: ".item"
        })
    ], SuiDropdownMenuItem);
    return SuiDropdownMenuItem;
}());
export { SuiDropdownMenuItem };
var SuiDropdownMenu = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDropdownMenu, _super);
    function SuiDropdownMenu(_renderer, element, _changeDetector) {
        var _this = _super.call(this, _renderer, element, _changeDetector) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
        // Initialise transition functionality.
        _this._transitionController = new TransitionController(false);
        _this.setTransitionController(_this._transitionController);
        _this.menuTransition = "slide down";
        _this.menuTransitionDuration = 200;
        _this.menuAutoSelectFirst = false;
        _this.menuSelectedItemClass = "selected";
        _this._documentKeyDownListener = _renderer.listen("document", "keydown", function (e) { return _this.onDocumentKeyDown(e); });
        return _this;
    }
    Object.defineProperty(SuiDropdownMenu.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (value) {
            var _this = this;
            this._service = value;
            var previousIsOpen = this._service.isOpen;
            this._service.isOpenChange.subscribe(function (isOpen) {
                if (isOpen !== previousIsOpen) {
                    // Only run transitions if the open state has changed.
                    _this._transitionController.stopAll();
                    _this._transitionController.animate(new Transition(_this.menuTransition, _this.menuTransitionDuration, TransitionDirection.Either, function () { return (_this._service.isAnimating = false); }));
                }
                if (!isOpen) {
                    // Reset the item selections when a nested item is selected to avoid incosistent open states.
                    if (_this.selectedItems.length > 1) {
                        _this.resetSelection();
                    }
                }
                previousIsOpen = isOpen;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "items", {
        set: function (items) {
            this._itemsQueryOverride = items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "_itemsQuery", {
        get: function () {
            return this._itemsQueryOverride || this.itemsQueryInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "_items", {
        // Get the list of items, ignoring those that are disabled.
        get: function () {
            return this._itemsQuery.filter(function (i) { return !i.isDisabled; });
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdownMenu.prototype.onClick = function (e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (this._service.autoCloseMode === DropdownAutoCloseType.ItemClick) {
                var target = e.target;
                if (this.element.nativeElement.contains(target.closest(".item")) &&
                    !/input|textarea/i.test(target.tagName)) {
                    // Once an item is selected, we can close the entire dropdown.
                    this._service.setOpenState(false, true);
                }
            }
        }
    };
    SuiDropdownMenu.prototype.onDocumentKeyDown = function (e) {
        // Only the root dropdown (i.e. not nested dropdowns) is responsible for keeping track of the currently selected item.
        if (this._service.isOpen && !this._service.isNested) {
            // Stop document events like scrolling while open.
            var target = e.target;
            if (!/input/i.test(target.tagName) &&
                [
                    KeyCode.Escape,
                    KeyCode.Enter,
                    KeyCode.Up,
                    KeyCode.Down,
                    KeyCode.Left,
                    KeyCode.Right
                ].find(function (kC) { return kC === e.keyCode; })) {
                e.preventDefault();
            }
            // Gets the top selected item from the stack.
            var _a = tslib_1.__read(this.selectedItems.slice(-1), 1), selected = _a[0];
            // Keeping track of the menu containing the currently selected element allows us to easily determine its siblings.
            var selectedContainer = this;
            if (this.selectedItems.length >= 2) {
                var _b = tslib_1.__read(this.selectedItems.slice(-2), 1), selectedParent = _b[0];
                selectedContainer = selectedParent.childDropdownMenu;
            }
            switch (e.keyCode) {
                // Escape : close the entire dropdown.
                case KeyCode.Escape: {
                    this._service.setOpenState(false);
                    break;
                }
                // Down : select the next item below the current one, or the 1st if none selected.
                case KeyCode.Down:
                // Up : select the next item above the current one, or the 1st if none selected.
                case KeyCode.Up: {
                    this.selectedItems.pop();
                    this.selectedItems.push(selectedContainer.updateSelection(selected, e.keyCode));
                    // Prevent default regardless of whether we are in an input, to stop jumping to the start or end of the query string.
                    e.preventDefault();
                    break;
                }
                // Enter : if the item doesn't contain a nested dropdown, 'click' it. Otherwise, fall through to 'Right' action.
                case KeyCode.Enter: {
                    if (selected && !selected.hasChildDropdown) {
                        selected.performClick();
                        break;
                    }
                }
                // falls through
                // Right : if the selected item contains a nested dropdown, open the dropdown & select the 1st item.
                case KeyCode.Right: {
                    if (selected && selected.hasChildDropdown) {
                        selected.childDropdownMenu.service.setOpenState(true);
                        this.selectedItems.push(selected.childDropdownMenu.updateSelection(selected, e.keyCode));
                    }
                    break;
                }
                // Left : if the selected item is in a nested dropdown, close it and select the containing item.
                case KeyCode.Left: {
                    if (this.selectedItems.length >= 2) {
                        this.selectedItems.pop();
                        var _c = tslib_1.__read(this.selectedItems.slice(-1), 1), selectedParent = _c[0];
                        selectedParent.childDropdownMenu.service.setOpenState(false);
                        selectedParent.isSelected = true;
                    }
                    break;
                }
            }
        }
    };
    SuiDropdownMenu.prototype.resetSelection = function () {
        var _this = this;
        this.selectedItems = [];
        this._items.forEach(function (i) {
            i.selectedClass = _this.menuSelectedItemClass;
            i.isSelected = false;
        });
        if (this.menuAutoSelectFirst && this._items.length > 0) {
            // Autoselect 1st item if required & possible.
            this._items[0].isSelected = true;
            this.scrollToItem(this._items[0]);
            this.selectedItems.push(this._itemsQuery.first);
        }
    };
    // Determines the item to next be selected, based on the keyboard input & the currently selected item.
    SuiDropdownMenu.prototype.updateSelection = function (selectedItem, keyCode) {
        if (selectedItem) {
            // Remove the selected status on the previously selected item.
            selectedItem.isSelected = false;
        }
        var selectedIndex = this._items.findIndex(function (i) { return i === selectedItem; });
        var newSelection;
        switch (keyCode) {
            case KeyCode.Enter:
            case KeyCode.Right:
            case KeyCode.Down:
                selectedIndex += 1;
                break;
            case KeyCode.Up:
                if (selectedIndex === -1) {
                    // If none are selected, select the 1st item. Should this be `this.items.last - 1`?
                    selectedIndex = 0;
                    break;
                }
                selectedIndex -= 1;
                break;
        }
        // Select the item at the updated index. The || is to stop us selecting past the start or end of the item list.
        newSelection = this._items[selectedIndex] || selectedItem;
        if (newSelection) {
            // Set the selected status on the newly selected item.
            newSelection.isSelected = true;
            // Set the current scroll position to the location of the newly selected item.
            this.scrollToItem(newSelection);
        }
        return newSelection;
    };
    SuiDropdownMenu.prototype.scrollToItem = function (item) {
        var menu = this.element.nativeElement;
        var selectedRect = item.element.nativeElement.getBoundingClientRect();
        var menuRect = menu.getBoundingClientRect();
        var scrollAmount = 0;
        if (selectedRect.bottom > menuRect.bottom) {
            scrollAmount = selectedRect.bottom - menuRect.bottom;
        }
        if (selectedRect.top < menuRect.top) {
            scrollAmount = selectedRect.top - menuRect.top;
        }
        menu.scrollTop += Math.round(scrollAmount);
    };
    SuiDropdownMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.onItemsChanged();
        this._itemsQuery.changes.subscribe(function () { return _this.onItemsChanged(); });
    };
    SuiDropdownMenu.prototype.onItemsChanged = function () {
        // We use `_items` rather than `items` in case one or more have become disabled.
        this.resetSelection();
    };
    SuiDropdownMenu.prototype.ngOnDestroy = function () {
        this._documentKeyDownListener();
    };
    SuiDropdownMenu.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuTransition", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuTransitionDuration", void 0);
    tslib_1.__decorate([
        ContentChildren(SuiDropdownMenuItem)
    ], SuiDropdownMenu.prototype, "itemsQueryInternal", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuAutoSelectFirst", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuSelectedItemClass", void 0);
    tslib_1.__decorate([
        HostListener("click", ["$event"])
    ], SuiDropdownMenu.prototype, "onClick", null);
    SuiDropdownMenu = tslib_1.__decorate([
        Directive({
            selector: "[suiDropdownMenu]"
        })
    ], SuiDropdownMenu);
    return SuiDropdownMenu;
}(SuiTransition));
export { SuiDropdownMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZHJvcGRvd24vZGlyZWN0aXZlcy9kcm9wZG93bi1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFNBQVMsRUFDVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILHFCQUFxQixFQUN4QixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLGtCQUFrQjtBQUNsQixPQUFPLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDSCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ3RCLE1BQU0sZ0RBQWdELENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ2pHLE9BQU8sRUFFSCxPQUFPLEVBRVYsTUFBTSxpQ0FBaUMsQ0FBQztBQU16QztJQXNDSSw2QkFBc0IsU0FBbUIsRUFBUyxPQUFrQjtRQUE5QyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNoRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBekNELHNCQUFXLDJDQUFVO2FBQXJCO1lBQ0ksd0ZBQXdGO1lBQ3hGLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBd0IsQ0FBQztZQUN0RCxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FB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O2dFQUMyQjtJQUduQztRQURDLEtBQUssRUFBRTtrRUFDNEI7SUE2QnBDO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2tEQW9CakM7SUF2SFEsZUFBZTtRQUgzQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1NBQ2hDLENBQUM7T0FDVyxlQUFlLENBMFMzQjtJQUFELHNCQUFDO0NBQUEsQUExU0QsQ0FBcUMsYUFBYSxHQTBTakQ7U0ExU1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBmb3J3YXJkUmVmLFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBJbnB1dCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgT25EZXN0cm95XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIERyb3Bkb3duU2VydmljZSxcbiAgICBEcm9wZG93bkF1dG9DbG9zZVR5cGVcbn0gZnJvbSBcIi4uL3NlcnZpY2VzL2Ryb3Bkb3duLnNlcnZpY2VcIjtcbi8vIFBvbHlmaWxsIGZvciBJRVxuaW1wb3J0IFwiZWxlbWVudC1jbG9zZXN0XCI7XG5pbXBvcnQge1xuICAgIFRyYW5zaXRpb24sXG4gICAgVHJhbnNpdGlvbkRpcmVjdGlvblxufSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvblwiO1xuaW1wb3J0IHsgU3VpVHJhbnNpdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vZGlyZWN0aXZlcy90cmFuc2l0aW9uXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7XG4gICAgSGFuZGxlZEV2ZW50LFxuICAgIEtleUNvZGUsXG4gICAgSUF1Z21lbnRlZEVsZW1lbnRcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gV2UgbXVzdCBhdHRhY2ggdG8gZXZlcnkgJy5pdGVtJyBhcyBBbmd1bGFyIGRvZXNuJ3Qgc3VwcG9ydCA+IHNlbGVjdG9ycy5cbiAgICBzZWxlY3RvcjogXCIuaXRlbVwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aURyb3Bkb3duTWVudUl0ZW0ge1xuICAgIHB1YmxpYyBnZXQgaXNEaXNhYmxlZCgpOmJvb2xlYW4ge1xuICAgICAgICAvLyBXZSBtdXN0IHVzZSBuYXRpdmVFbGVtZW50IGFzIEFuZ3VsYXIgZG9lc24ndCBoYXZlIGEgd2F5IG9mIHJlYWRpbmcgY2xhc3MgaW5mb3JtYXRpb24uXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBFbGVtZW50O1xuICAgICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1NlbGVjdGVkOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IGlzU2VsZWN0ZWQoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc1NlbGVjdGVkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgLy8gUmVuZGVyZXIgaXMgdXNlZCB0byBlbmFibGUgYSBkeW5hbWljIGNsYXNzIG5hbWUuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENsYXNzXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENsYXNzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RvcmVzIHRoZSBjbGFzcyBuYW1lIHVzZWQgZm9yIGEgJ3NlbGVjdGVkJyBpdGVtLlxuICAgIHB1YmxpYyBzZWxlY3RlZENsYXNzOnN0cmluZztcblxuICAgIEBDb250ZW50Q2hpbGQoZm9yd2FyZFJlZigoKSA9PiBTdWlEcm9wZG93bk1lbnUpLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyBjaGlsZERyb3Bkb3duTWVudTpTdWlEcm9wZG93bk1lbnU7XG5cbiAgICBwdWJsaWMgZ2V0IGhhc0NoaWxkRHJvcGRvd24oKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jaGlsZERyb3Bkb3duTWVudTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMiwgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2xhc3MgPSBcInNlbGVjdGVkXCI7XG4gICAgfVxuXG4gICAgcHVibGljIHBlcmZvcm1DbGljaygpOnZvaWQge1xuICAgICAgICAvLyBVc2luZyBkaXJlY3RseSBiZWNhdXNlIFJlbmRlcmVyMiBkb2Vzbid0IGhhdmUgaW52b2tlRWxlbWVudE1ldGhvZCBtZXRob2QgYW55bW9yZS5cbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlEcm9wZG93bk1lbnVdXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpRHJvcGRvd25NZW51IGV4dGVuZHMgU3VpVHJhbnNpdGlvblxuICAgIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9zZXJ2aWNlOkRyb3Bkb3duU2VydmljZTtcbiAgICBwcml2YXRlIF90cmFuc2l0aW9uQ29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lbnVUcmFuc2l0aW9uOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lbnVUcmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgcHVibGljIGdldCBzZXJ2aWNlKCk6RHJvcGRvd25TZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZXJ2aWNlKHZhbHVlOkRyb3Bkb3duU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlID0gdmFsdWU7XG5cbiAgICAgICAgbGV0IHByZXZpb3VzSXNPcGVuID0gdGhpcy5fc2VydmljZS5pc09wZW47XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuaXNPcGVuQ2hhbmdlLnN1YnNjcmliZSgoaXNPcGVuOmJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChpc09wZW4gIT09IHByZXZpb3VzSXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBydW4gdHJhbnNpdGlvbnMgaWYgdGhlIG9wZW4gc3RhdGUgaGFzIGNoYW5nZWQuXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51VHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVudVRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb25EaXJlY3Rpb24uRWl0aGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gKHRoaXMuX3NlcnZpY2UuaXNBbmltYXRpbmcgPSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGl0ZW0gc2VsZWN0aW9ucyB3aGVuIGEgbmVzdGVkIGl0ZW0gaXMgc2VsZWN0ZWQgdG8gYXZvaWQgaW5jb3Npc3RlbnQgb3BlbiBzdGF0ZXMuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXZpb3VzSXNPcGVuID0gaXNPcGVuO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFN1aURyb3Bkb3duTWVudUl0ZW0pXG4gICAgcHVibGljIGl0ZW1zUXVlcnlJbnRlcm5hbDpRdWVyeUxpc3Q8U3VpRHJvcGRvd25NZW51SXRlbT47XG5cbiAgICBwcml2YXRlIF9pdGVtc1F1ZXJ5T3ZlcnJpZGU6UXVlcnlMaXN0PFN1aURyb3Bkb3duTWVudUl0ZW0+O1xuXG4gICAgcHVibGljIHNldCBpdGVtcyhpdGVtczpRdWVyeUxpc3Q8U3VpRHJvcGRvd25NZW51SXRlbT4pIHtcbiAgICAgICAgdGhpcy5faXRlbXNRdWVyeU92ZXJyaWRlID0gaXRlbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgX2l0ZW1zUXVlcnkoKTpRdWVyeUxpc3Q8U3VpRHJvcGRvd25NZW51SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNRdWVyeU92ZXJyaWRlIHx8IHRoaXMuaXRlbXNRdWVyeUludGVybmFsO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgbGlzdCBvZiBpdGVtcywgaWdub3JpbmcgdGhvc2UgdGhhdCBhcmUgZGlzYWJsZWQuXG4gICAgcHJpdmF0ZSBnZXQgX2l0ZW1zKCk6U3VpRHJvcGRvd25NZW51SXRlbVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zUXVlcnkuZmlsdGVyKGkgPT4gIWkuaXNEaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgLy8gU3RhY2sgdGhhdCBrZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0uXG4gICAgLy8gU2VsZWN0ZWQgaXRlbXMgbG93ZXIgaW4gdGhlIHN0YWNrIGFyZSBuZWNlc3NhcmlseSB0aGUgcGFyZW50IG9mIHRoZSBpdGVtIG9uZSBoaWdoZXIuXG4gICAgcHVibGljIHNlbGVjdGVkSXRlbXM6U3VpRHJvcGRvd25NZW51SXRlbVtdO1xuXG4gICAgLy8gU2V0cyB3aGV0aGVyIG9yIG5vdCB0byBhdXRvbWF0aWNhbGx5IHNlbGVjdCB0aGUgMXN0IGl0ZW0gd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLlxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lbnVBdXRvU2VsZWN0Rmlyc3Q6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG1lbnVTZWxlY3RlZEl0ZW1DbGFzczpzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9kb2N1bWVudEtleURvd25MaXN0ZW5lcjooKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yOkNoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKF9yZW5kZXJlciwgZWxlbWVudCwgX2NoYW5nZURldGVjdG9yKTtcblxuICAgICAgICAvLyBJbml0aWFsaXNlIHRyYW5zaXRpb24gZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIgPSBuZXcgVHJhbnNpdGlvbkNvbnRyb2xsZXIoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25Db250cm9sbGVyKHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLm1lbnVUcmFuc2l0aW9uID0gXCJzbGlkZSBkb3duXCI7XG4gICAgICAgIHRoaXMubWVudVRyYW5zaXRpb25EdXJhdGlvbiA9IDIwMDtcblxuICAgICAgICB0aGlzLm1lbnVBdXRvU2VsZWN0Rmlyc3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWRJdGVtQ2xhc3MgPSBcInNlbGVjdGVkXCI7XG5cbiAgICAgICAgdGhpcy5fZG9jdW1lbnRLZXlEb3duTGlzdGVuZXIgPSBfcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgXCJkb2N1bWVudFwiLFxuICAgICAgICAgICAgXCJrZXlkb3duXCIsXG4gICAgICAgICAgICAoZTpLZXlib2FyZEV2ZW50KSA9PiB0aGlzLm9uRG9jdW1lbnRLZXlEb3duKGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25DbGljayhlOkhhbmRsZWRFdmVudCAmIE1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmF1dG9DbG9zZU1vZGUgPT09IERyb3Bkb3duQXV0b0Nsb3NlVHlwZS5JdGVtQ2xpY2tcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIElBdWdtZW50ZWRFbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xvc2VzdChcIi5pdGVtXCIpXG4gICAgICAgICAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgICAgICAgICAgIS9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QodGFyZ2V0LnRhZ05hbWUpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9uY2UgYW4gaXRlbSBpcyBzZWxlY3RlZCwgd2UgY2FuIGNsb3NlIHRoZSBlbnRpcmUgZHJvcGRvd24uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3BlblN0YXRlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Eb2N1bWVudEtleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgLy8gT25seSB0aGUgcm9vdCBkcm9wZG93biAoaS5lLiBub3QgbmVzdGVkIGRyb3Bkb3ducykgaXMgcmVzcG9uc2libGUgZm9yIGtlZXBpbmcgdHJhY2sgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLlxuICAgICAgICBpZiAodGhpcy5fc2VydmljZS5pc09wZW4gJiYgIXRoaXMuX3NlcnZpY2UuaXNOZXN0ZWQpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgZG9jdW1lbnQgZXZlbnRzIGxpa2Ugc2Nyb2xsaW5nIHdoaWxlIG9wZW4uXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBFbGVtZW50O1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEvaW5wdXQvaS50ZXN0KHRhcmdldC50YWdOYW1lKSAmJlxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgS2V5Q29kZS5Fc2NhcGUsXG4gICAgICAgICAgICAgICAgICAgIEtleUNvZGUuRW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIEtleUNvZGUuVXAsXG4gICAgICAgICAgICAgICAgICAgIEtleUNvZGUuRG93bixcbiAgICAgICAgICAgICAgICAgICAgS2V5Q29kZS5MZWZ0LFxuICAgICAgICAgICAgICAgICAgICBLZXlDb2RlLlJpZ2h0XG4gICAgICAgICAgICAgICAgXS5maW5kKGtDID0+IGtDID09PSBlLmtleUNvZGUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEdldHMgdGhlIHRvcCBzZWxlY3RlZCBpdGVtIGZyb20gdGhlIHN0YWNrLlxuICAgICAgICAgICAgY29uc3QgW3NlbGVjdGVkXSA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5zbGljZSgtMSk7XG4gICAgICAgICAgICAvLyBLZWVwaW5nIHRyYWNrIG9mIHRoZSBtZW51IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IGFsbG93cyB1cyB0byBlYXNpbHkgZGV0ZXJtaW5lIGl0cyBzaWJsaW5ncy5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENvbnRhaW5lcjpTdWlEcm9wZG93bk1lbnUgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtzZWxlY3RlZFBhcmVudF0gPSB0aGlzLnNlbGVjdGVkSXRlbXMuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29udGFpbmVyID0gc2VsZWN0ZWRQYXJlbnQuY2hpbGREcm9wZG93bk1lbnU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gRXNjYXBlIDogY2xvc2UgdGhlIGVudGlyZSBkcm9wZG93bi5cbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuRXNjYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3BlblN0YXRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERvd24gOiBzZWxlY3QgdGhlIG5leHQgaXRlbSBiZWxvdyB0aGUgY3VycmVudCBvbmUsIG9yIHRoZSAxc3QgaWYgbm9uZSBzZWxlY3RlZC5cbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuRG93bjpcbiAgICAgICAgICAgICAgICAvLyBVcCA6IHNlbGVjdCB0aGUgbmV4dCBpdGVtIGFib3ZlIHRoZSBjdXJyZW50IG9uZSwgb3IgdGhlIDFzdCBpZiBub25lIHNlbGVjdGVkLlxuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5VcDoge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb250YWluZXIudXBkYXRlU2VsZWN0aW9uKHNlbGVjdGVkLCBlLmtleUNvZGUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgd2UgYXJlIGluIGFuIGlucHV0LCB0byBzdG9wIGp1bXBpbmcgdG8gdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgcXVlcnkgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbnRlciA6IGlmIHRoZSBpdGVtIGRvZXNuJ3QgY29udGFpbiBhIG5lc3RlZCBkcm9wZG93biwgJ2NsaWNrJyBpdC4gT3RoZXJ3aXNlLCBmYWxsIHRocm91Z2ggdG8gJ1JpZ2h0JyBhY3Rpb24uXG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkVudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiAhc2VsZWN0ZWQuaGFzQ2hpbGREcm9wZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQucGVyZm9ybUNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgLy8gUmlnaHQgOiBpZiB0aGUgc2VsZWN0ZWQgaXRlbSBjb250YWlucyBhIG5lc3RlZCBkcm9wZG93biwgb3BlbiB0aGUgZHJvcGRvd24gJiBzZWxlY3QgdGhlIDFzdCBpdGVtLlxuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5SaWdodDoge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQuaGFzQ2hpbGREcm9wZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuY2hpbGREcm9wZG93bk1lbnUuc2VydmljZS5zZXRPcGVuU3RhdGUodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmNoaWxkRHJvcGRvd25NZW51LnVwZGF0ZVNlbGVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUua2V5Q29kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIExlZnQgOiBpZiB0aGUgc2VsZWN0ZWQgaXRlbSBpcyBpbiBhIG5lc3RlZCBkcm9wZG93biwgY2xvc2UgaXQgYW5kIHNlbGVjdCB0aGUgY29udGFpbmluZyBpdGVtLlxuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5MZWZ0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtzZWxlY3RlZFBhcmVudF0gPSB0aGlzLnNlbGVjdGVkSXRlbXMuc2xpY2UoLTEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFBhcmVudC5jaGlsZERyb3Bkb3duTWVudS5zZXJ2aWNlLnNldE9wZW5TdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUGFyZW50LmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZXNldFNlbGVjdGlvbigpOnZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGkuc2VsZWN0ZWRDbGFzcyA9IHRoaXMubWVudVNlbGVjdGVkSXRlbUNsYXNzO1xuICAgICAgICAgICAgaS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1lbnVBdXRvU2VsZWN0Rmlyc3QgJiYgdGhpcy5faXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gQXV0b3NlbGVjdCAxc3QgaXRlbSBpZiByZXF1aXJlZCAmIHBvc3NpYmxlLlxuICAgICAgICAgICAgdGhpcy5faXRlbXNbMF0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvSXRlbSh0aGlzLl9pdGVtc1swXSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaCh0aGlzLl9pdGVtc1F1ZXJ5LmZpcnN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERldGVybWluZXMgdGhlIGl0ZW0gdG8gbmV4dCBiZSBzZWxlY3RlZCwgYmFzZWQgb24gdGhlIGtleWJvYXJkIGlucHV0ICYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLlxuICAgIHB1YmxpYyB1cGRhdGVTZWxlY3Rpb24oXG4gICAgICAgIHNlbGVjdGVkSXRlbTpTdWlEcm9wZG93bk1lbnVJdGVtLFxuICAgICAgICBrZXlDb2RlOktleUNvZGVcbiAgICApOlN1aURyb3Bkb3duTWVudUl0ZW0ge1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlbGVjdGVkIHN0YXR1cyBvbiB0aGUgcHJldmlvdXNseSBzZWxlY3RlZCBpdGVtLlxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RlZEluZGV4ID0gdGhpcy5faXRlbXMuZmluZEluZGV4KGkgPT4gaSA9PT0gc2VsZWN0ZWRJdGVtKTtcblxuICAgICAgICBsZXQgbmV3U2VsZWN0aW9uOlN1aURyb3Bkb3duTWVudUl0ZW07XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuRW50ZXI6XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuUmlnaHQ6XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuRG93bjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuVXA6XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vbmUgYXJlIHNlbGVjdGVkLCBzZWxlY3QgdGhlIDFzdCBpdGVtLiBTaG91bGQgdGhpcyBiZSBgdGhpcy5pdGVtcy5sYXN0IC0gMWA/XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4IC09IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZWxlY3QgdGhlIGl0ZW0gYXQgdGhlIHVwZGF0ZWQgaW5kZXguIFRoZSB8fCBpcyB0byBzdG9wIHVzIHNlbGVjdGluZyBwYXN0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGl0ZW0gbGlzdC5cbiAgICAgICAgbmV3U2VsZWN0aW9uID0gdGhpcy5faXRlbXNbc2VsZWN0ZWRJbmRleF0gfHwgc2VsZWN0ZWRJdGVtO1xuXG4gICAgICAgIGlmIChuZXdTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgc2VsZWN0ZWQgc3RhdHVzIG9uIHRoZSBuZXdseSBzZWxlY3RlZCBpdGVtLlxuICAgICAgICAgICAgbmV3U2VsZWN0aW9uLmlzU2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIHRvIHRoZSBsb2NhdGlvbiBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgaXRlbS5cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9JdGVtKG5ld1NlbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3U2VsZWN0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzY3JvbGxUb0l0ZW0oaXRlbTpTdWlEcm9wZG93bk1lbnVJdGVtKTp2b2lkIHtcbiAgICAgICAgY29uc3QgbWVudTpFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUmVjdDpDbGllbnRSZWN0ID0gaXRlbS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgY29uc3QgbWVudVJlY3QgPSBtZW51LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBzY3JvbGxBbW91bnQgPSAwO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFJlY3QuYm90dG9tID4gbWVudVJlY3QuYm90dG9tKSB7XG4gICAgICAgICAgICBzY3JvbGxBbW91bnQgPSBzZWxlY3RlZFJlY3QuYm90dG9tIC0gbWVudVJlY3QuYm90dG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkUmVjdC50b3AgPCBtZW51UmVjdC50b3ApIHtcbiAgICAgICAgICAgIHNjcm9sbEFtb3VudCA9IHNlbGVjdGVkUmVjdC50b3AgLSBtZW51UmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICBtZW51LnNjcm9sbFRvcCArPSBNYXRoLnJvdW5kKHNjcm9sbEFtb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLm9uSXRlbXNDaGFuZ2VkKCk7XG4gICAgICAgIHRoaXMuX2l0ZW1zUXVlcnkuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkl0ZW1zQ2hhbmdlZCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uSXRlbXNDaGFuZ2VkKCk6dm9pZCB7XG4gICAgICAgIC8vIFdlIHVzZSBgX2l0ZW1zYCByYXRoZXIgdGhhbiBgaXRlbXNgIGluIGNhc2Ugb25lIG9yIG1vcmUgaGF2ZSBiZWNvbWUgZGlzYWJsZWQuXG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRLZXlEb3duTGlzdGVuZXIoKTtcbiAgICB9XG59XG4iXX0=