var SuiDropdown_1;
import * as tslib_1 from "tslib";
import { Directive, Input, HostBinding, EventEmitter, Output, AfterContentInit, ContentChild, ElementRef, HostListener, QueryList, ContentChildren, OnInit } from "@angular/core";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
import { SuiDropdownMenu } from "./dropdown-menu";
import { KeyCode } from "../../../misc/util/helpers/util";
let SuiDropdown = SuiDropdown_1 = class SuiDropdown {
    constructor(_element) {
        this._element = _element;
    }
    get filteredChildren() {
        // @ContentChildren includes the current element by default.
        return this.children.filter(c => c !== this);
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
    get tabIndexBinding() {
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
    }
    get autoClose() {
        return this.service.autoCloseMode;
    }
    set autoClose(value) {
        this.service.autoCloseMode = value;
    }
    ngOnInit() {
        this.service = new DropdownService();
        this.service.isOpenChange.subscribe(() => {
            if (this.service.isOpen) {
                this._element.nativeElement.focus();
            }
        });
    }
    ngAfterContentInit() {
        if (!this.menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this.menu.service = this.service;
        this.childrenUpdated();
        this.children.changes.subscribe(() => this.childrenUpdated());
    }
    childrenUpdated() {
        // Reregister child dropdowns each time the menu content changes.
        this.filteredChildren
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
export { SuiDropdown };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2Ryb3Bkb3duL2RpcmVjdGl2ZXMvZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULGVBQWUsRUFDZixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILGVBQWUsRUFDZixxQkFBcUIsRUFDeEIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFnQixPQUFPLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU14RSxJQUFhLFdBQVcsbUJBQXhCLE1BQWEsV0FBVztJQXVFcEIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUE5RDNDLElBQVcsZ0JBQWdCO1FBQ3ZCLDREQUE0RDtRQUM1RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFHRCxJQUFXLFlBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBR0QsSUFBVyxRQUFRO1FBQ2YsMERBQTBEO1FBQzFELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUN6RCxDQUFDO0lBR0QsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJ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LENBQUMsQ0FBQzs2Q0FVcEM7QUEvSFEsV0FBVztJQUh2QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtLQUM1QixDQUFDO0dBQ1csV0FBVyxDQTBJdkI7U0ExSVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgUXVlcnlMaXN0LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBPbkluaXRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgRHJvcGRvd25TZXJ2aWNlLFxuICAgIERyb3Bkb3duQXV0b0Nsb3NlVHlwZVxufSBmcm9tIFwiLi4vc2VydmljZXMvZHJvcGRvd24uc2VydmljZVwiO1xuaW1wb3J0IHsgU3VpRHJvcGRvd25NZW51IH0gZnJvbSBcIi4vZHJvcGRvd24tbWVudVwiO1xuaW1wb3J0IHsgSGFuZGxlZEV2ZW50LCBLZXlDb2RlIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcbmltcG9ydCB7IElGb2N1c0V2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2ZvY3VzLWV2ZW50XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlEcm9wZG93bl1cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlEcm9wZG93biBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gICAgcHVibGljIHNlcnZpY2U6RHJvcGRvd25TZXJ2aWNlO1xuXG4gICAgQENvbnRlbnRDaGlsZChTdWlEcm9wZG93bk1lbnUsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIG1lbnU6U3VpRHJvcGRvd25NZW51O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlEcm9wZG93biwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHB1YmxpYyBjaGlsZHJlbjpRdWVyeUxpc3Q8U3VpRHJvcGRvd24+O1xuXG4gICAgcHVibGljIGdldCBmaWx0ZXJlZENoaWxkcmVuKCk6U3VpRHJvcGRvd25bXSB7XG4gICAgICAgIC8vIEBDb250ZW50Q2hpbGRyZW4gaW5jbHVkZXMgdGhlIGN1cnJlbnQgZWxlbWVudCBieSBkZWZhdWx0LlxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5maWx0ZXIoYyA9PiBjICE9PSB0aGlzKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzT3BlbkNoYW5nZSgpOkV2ZW50RW1pdHRlcjxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNPcGVuQ2hhbmdlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0byBlbnN1cmUgbmVzdGVkIGRyb3Bkb3ducyBkb24ndCBnZXQgbWFkZSBib2xkLlxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzT3BlbiAmJiAhdGhpcy5zZXJ2aWNlLmlzTmVzdGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBpc09wZW4oKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc09wZW47XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc09wZW4odmFsdWU6Ym9vbGVhbikge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgb3BlbmluZyB0aGUgZHJvcGRvd24sIHdlIHdhbnQgdG8gYWx3YXlzIG9wZW4gaXRzIHBhcmVudHMuXG4gICAgICAgIHRoaXMuc2VydmljZS5zZXRPcGVuU3RhdGUodmFsdWUsICEhdmFsdWUpO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRpc2FibGVkXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWQoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNEaXNhYmxlZCh2YWx1ZTpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZXREaXNhYmxlZFN0YXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJ0YWJpbmRleFwiKVxuICAgIHB1YmxpYyB0YWJJbmRleD86bnVtYmVyO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci50YWJpbmRleFwiKVxuICAgIHB1YmxpYyBnZXQgdGFiSW5kZXhCaW5kaW5nKCk6bnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCB8fCB0aGlzLnNlcnZpY2UuaXNOZXN0ZWQpIHtcbiAgICAgICAgICAgIC8vIElmIGRpc2FibGVkLCByZW1vdmUgZnJvbSB0YWJpbmRleC5cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGFiSW5kZXggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBJZiBjdXN0b20gdGFiaW5kZXgsIGRlZmF1bHQgdG8gdGhhdC5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYkluZGV4O1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgcmV0dXJuIGRlZmF1bHQgb2YgMC5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGF1dG9DbG9zZSgpOkRyb3Bkb3duQXV0b0Nsb3NlVHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuYXV0b0Nsb3NlTW9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGF1dG9DbG9zZSh2YWx1ZTpEcm9wZG93bkF1dG9DbG9zZVR5cGUpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmF1dG9DbG9zZU1vZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IERyb3Bkb3duU2VydmljZSgpO1xuICAgICAgICB0aGlzLnNlcnZpY2UuaXNPcGVuQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJZb3UgbXVzdCBzZXQgW3N1aURyb3Bkb3duTWVudV0gb24gdGhlIG1lbnUgZWxlbWVudC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnUuc2VydmljZSA9IHRoaXMuc2VydmljZTtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuVXBkYXRlZCgpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hpbGRyZW5VcGRhdGVkKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hpbGRyZW5VcGRhdGVkKCk6dm9pZCB7XG4gICAgICAgIC8vIFJlcmVnaXN0ZXIgY2hpbGQgZHJvcGRvd25zIGVhY2ggdGltZSB0aGUgbWVudSBjb250ZW50IGNoYW5nZXMuXG4gICAgICAgIHRoaXMuZmlsdGVyZWRDaGlsZHJlblxuICAgICAgICAgICAgLm1hcChjID0+IGMuc2VydmljZSlcbiAgICAgICAgICAgIC5mb3JFYWNoKHMgPT4gdGhpcy5zZXJ2aWNlLnJlZ2lzdGVyQ2hpbGQocykpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uQ2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS50b2dnbGVPcGVuU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHJpdmF0ZSBvbkZvY3VzT3V0KGU6SUZvY3VzRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmV4dGVybmFsbHlDbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXByZXNzXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25LZXlwcmVzcyhlOkhhbmRsZWRFdmVudCAmIEtleWJvYXJkRXZlbnQpOnZvaWQge1xuICAgICAgICAvLyBCbG9jayB0aGUga2V5Ym9hcmQgZXZlbnQgZnJvbSBiZWluZyBmaXJlZCBvbiBwYXJlbnQgZHJvcGRvd25zLlxuICAgICAgICBpZiAoIWUuZXZlbnRIYW5kbGVkKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLZXlDb2RlLkVudGVyKSB7XG4gICAgICAgICAgICAgICAgZS5ldmVudEhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXh0ZXJuYWxseUNsb3NlKCk6dm9pZCB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5hdXRvQ2xvc2VNb2RlID09PSBEcm9wZG93bkF1dG9DbG9zZVR5cGUuSXRlbUNsaWNrIHx8XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuYXV0b0Nsb3NlTW9kZSA9PT0gRHJvcGRvd25BdXRvQ2xvc2VUeXBlLk91dHNpZGVDbGlja1xuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gcmVmbGVjdCBpbiBwYXJlbnQgc2luY2UgdGhleSBhcmUgYWxzbyBib3VuZCB0byBkb2N1bWVudC5cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19