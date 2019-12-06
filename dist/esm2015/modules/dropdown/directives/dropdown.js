var SuiDropdown_1;
import * as tslib_1 from "tslib";
import { Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild, ElementRef, HostListener, QueryList, ContentChildren } from "@angular/core";
import { KeyCode } from "../../../misc/util/index";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
import { SuiDropdownMenu } from "./dropdown-menu";
let SuiDropdown = SuiDropdown_1 = class SuiDropdown {
    constructor(_element) {
        this._element = _element;
        this.service = new DropdownService();
        this.service.isOpenChange.subscribe(() => {
            if (this.service.isOpen) {
                this._element.nativeElement.focus();
            }
        });
    }
    get children() {
        // @ContentChildren includes the current element by default.
        return this._children.filter(c => c !== this);
    }
    get isOpenChange() {
        return this.service.isOpenChange;
    }
    get isActive() {
        // This is to ensure nested dropdowns don't get made bold.
        return this.service.isOpen && !this.service.isNested;
    }
    get isOpen() {
        return this.service.isOpen;
    }
    set isOpen(value) {
        // If we are opening the dropdown, we want to always open its parents.
        this.service.setOpenState(value, !!value);
    }
    get isDisabled() {
        return this.service.isDisabled;
    }
    set isDisabled(value) {
        this.service.setDisabledState(value);
    }
    get tabIndex() {
        if (this.isDisabled || this.service.isNested) {
            // If disabled, remove from tabindex.
            return undefined;
        }
        if (this._tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this._tabIndex;
        }
        // Otherwise, return default of 0.
        return 0;
    }
    get autoClose() {
        return this.service.autoCloseMode;
    }
    set autoClose(value) {
        this.service.autoCloseMode = value;
    }
    ngAfterContentInit() {
        if (!this._menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this._menu.service = this.service;
        this.childrenUpdated();
        this._children.changes.subscribe(() => this.childrenUpdated());
    }
    childrenUpdated() {
        // Reregister child dropdowns each time the menu content changes.
        this.children
            .map(c => c.service)
            .forEach(s => this.service.registerChild(s));
    }
    onClick(e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            this.service.toggleOpenState();
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.externallyClose();
        }
    }
    onKeypress(e) {
        // Block the keyboard event from being fired on parent dropdowns.
        if (!e.eventHandled) {
            if (e.keyCode === KeyCode.Enter) {
                e.eventHandled = true;
                this.service.setOpenState(true);
            }
        }
    }
    externallyClose() {
        if (this.service.autoCloseMode === DropdownAutoCloseType.ItemClick ||
            this.service.autoCloseMode === DropdownAutoCloseType.OutsideClick) {
            // No need to reflect in parent since they are also bound to document.
            this.service.setOpenState(false);
        }
    }
};
SuiDropdown.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    ContentChild(SuiDropdownMenu, { static: true })
], SuiDropdown.prototype, "_menu", void 0);
tslib_1.__decorate([
    ContentChildren(SuiDropdown_1, { descendants: true })
], SuiDropdown.prototype, "_children", void 0);
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
], SuiDropdown.prototype, "_tabIndex", void 0);
tslib_1.__decorate([
    HostBinding("attr.tabindex")
], SuiDropdown.prototype, "tabIndex", null);
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
export { SuiDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2Ryb3Bkb3duL2RpcmVjdGl2ZXMvZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFnQixPQUFPLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RSxPQUFPLEVBQ0gsZUFBZSxFQUNmLHFCQUFxQixFQUN4QixNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtsRCxJQUFhLFdBQVcsbUJBQXhCLE1BQWEsV0FBVztJQXVFcEIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJFRCxJQUFXLFFBQVE7UUFDZiw0REFBNEQ7UUFDNUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBR0QsSUFBVyxZQUFZO1FBQ25CLE9BQU8sSUFB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QUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtLQUM1QixDQUFDO0dBQ1csV0FBVyxDQXdJdkI7U0F4SVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgUXVlcnlMaXN0LFxuICAgIENvbnRlbnRDaGlsZHJlblxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSGFuZGxlZEV2ZW50LCBLZXlDb2RlLCBJRm9jdXNFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7XG4gICAgRHJvcGRvd25TZXJ2aWNlLFxuICAgIERyb3Bkb3duQXV0b0Nsb3NlVHlwZVxufSBmcm9tIFwiLi4vc2VydmljZXMvZHJvcGRvd24uc2VydmljZVwiO1xuaW1wb3J0IHsgU3VpRHJvcGRvd25NZW51IH0gZnJvbSBcIi4vZHJvcGRvd24tbWVudVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpRHJvcGRvd25dXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpRHJvcGRvd24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBwdWJsaWMgc2VydmljZTpEcm9wZG93blNlcnZpY2U7XG5cbiAgICBAQ29udGVudENoaWxkKFN1aURyb3Bkb3duTWVudSwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9tZW51OlN1aURyb3Bkb3duTWVudTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oU3VpRHJvcGRvd24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9jaGlsZHJlbjpRdWVyeUxpc3Q8U3VpRHJvcGRvd24+O1xuXG4gICAgcHVibGljIGdldCBjaGlsZHJlbigpOlN1aURyb3Bkb3duW10ge1xuICAgICAgICAvLyBAQ29udGVudENoaWxkcmVuIGluY2x1ZGVzIHRoZSBjdXJyZW50IGVsZW1lbnQgYnkgZGVmYXVsdC5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmZpbHRlcihjID0+IGMgIT09IHRoaXMpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBnZXQgaXNPcGVuQ2hhbmdlKCk6RXZlbnRFbWl0dGVyPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc09wZW5DaGFuZ2U7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpOmJvb2xlYW4ge1xuICAgICAgICAvLyBUaGlzIGlzIHRvIGVuc3VyZSBuZXN0ZWQgZHJvcGRvd25zIGRvbid0IGdldCBtYWRlIGJvbGQuXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNPcGVuICYmICF0aGlzLnNlcnZpY2UuaXNOZXN0ZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzT3BlbigpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzT3BlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzT3Blbih2YWx1ZTpib29sZWFuKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBvcGVuaW5nIHRoZSBkcm9wZG93biwgd2Ugd2FudCB0byBhbHdheXMgb3BlbiBpdHMgcGFyZW50cy5cbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNldE9wZW5TdGF0ZSh2YWx1ZSwgISF2YWx1ZSk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZGlzYWJsZWRcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaXNEaXNhYmxlZCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc0Rpc2FibGVkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNldERpc2FibGVkU3RhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dChcInRhYmluZGV4XCIpXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXg/Om51bWJlcjtcblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIudGFiaW5kZXhcIilcbiAgICBwdWJsaWMgZ2V0IHRhYkluZGV4KCk6bnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCB0aGlzLnNlcnZpY2UuaXNOZXN0ZWQpIHtcbiAgICAgICAgICAgIC8vIElmIGRpc2FibGVkLCByZW1vdmUgZnJvbSB0YWJpbmRleC5cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RhYkluZGV4ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgY3VzdG9tIHRhYmluZGV4LCBkZWZhdWx0IHRvIHRoYXQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFiSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCByZXR1cm4gZGVmYXVsdCBvZiAwLlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgYXV0b0Nsb3NlKCk6RHJvcGRvd25BdXRvQ2xvc2VUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5hdXRvQ2xvc2VNb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYXV0b0Nsb3NlKHZhbHVlOkRyb3Bkb3duQXV0b0Nsb3NlVHlwZSkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuYXV0b0Nsb3NlTW9kZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgRHJvcGRvd25TZXJ2aWNlKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5pc09wZW5DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2UuaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tZW51KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJZb3UgbXVzdCBzZXQgW3N1aURyb3Bkb3duTWVudV0gb24gdGhlIG1lbnUgZWxlbWVudC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZW51LnNlcnZpY2UgPSB0aGlzLnNlcnZpY2U7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlblVwZGF0ZWQoKTtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGlsZHJlblVwZGF0ZWQoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGlsZHJlblVwZGF0ZWQoKTp2b2lkIHtcbiAgICAgICAgLy8gUmVyZWdpc3RlciBjaGlsZCBkcm9wZG93bnMgZWFjaCB0aW1lIHRoZSBtZW51IGNvbnRlbnQgY2hhbmdlcy5cbiAgICAgICAgdGhpcy5jaGlsZHJlblxuICAgICAgICAgICAgLm1hcChjID0+IGMuc2VydmljZSlcbiAgICAgICAgICAgIC5mb3JFYWNoKHMgPT4gdGhpcy5zZXJ2aWNlLnJlZ2lzdGVyQ2hpbGQocykpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uQ2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS50b2dnbGVPcGVuU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uRm9jdXNPdXQoZTpJRm9jdXNFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXh0ZXJuYWxseUNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwia2V5cHJlc3NcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbktleXByZXNzKGU6SGFuZGxlZEV2ZW50ICYgS2V5Ym9hcmRFdmVudCk6dm9pZCB7XG4gICAgICAgIC8vIEJsb2NrIHRoZSBrZXlib2FyZCBldmVudCBmcm9tIGJlaW5nIGZpcmVkIG9uIHBhcmVudCBkcm9wZG93bnMuXG4gICAgICAgIGlmICghZS5ldmVudEhhbmRsZWQpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtleUNvZGUuRW50ZXIpIHtcbiAgICAgICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0T3BlblN0YXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleHRlcm5hbGx5Q2xvc2UoKTp2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmF1dG9DbG9zZU1vZGUgPT09IERyb3Bkb3duQXV0b0Nsb3NlVHlwZS5JdGVtQ2xpY2sgfHxcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hdXRvQ2xvc2VNb2RlID09PSBEcm9wZG93bkF1dG9DbG9zZVR5cGUuT3V0c2lkZUNsaWNrXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byByZWZsZWN0IGluIHBhcmVudCBzaW5jZSB0aGV5IGFyZSBhbHNvIGJvdW5kIHRvIGRvY3VtZW50LlxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=