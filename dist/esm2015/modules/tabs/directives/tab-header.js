import * as tslib_1 from "tslib";
import { HostBinding, Input, Directive, EventEmitter, HostListener, Output } from "@angular/core";
let SuiTabHeader = class SuiTabHeader {
    constructor() {
        this._isActive = false;
        this.isActiveChange = new EventEmitter();
        this.isActiveExternalChange = new EventEmitter();
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
        this.isDisabled = false;
        this._headerClasses = true;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(active) {
        let isActive = active;
        // Only used by @Input(), runs whenever user input changes `isActive`.
        // Run in timeout because `isDisabled` can prohibit user from changing `isActive`.
        // so update is delayed to avoid 'changed after checked' error.
        setTimeout(() => {
            // Only allow change if tab header is not disabled.
            isActive = !this.isDisabled ? active : false;
            this.setActiveState(isActive);
            // Fire 'external change' event as user input has occured.
            this.isActiveExternalChange.emit(isActive);
        });
    }
    get isDisabled() {
        return this._isDisabled;
    }
    set isDisabled(disabled) {
        // Only update if value provided is different to current one.
        if (this._isDisabled !== disabled) {
            this._isDisabled = disabled;
            // If now disabled, then tab header must be deactivated.
            if (this.isDisabled) {
                this.isActive = false;
            }
        }
    }
    // Internally update active state.
    setActiveState(active) {
        // If (cast) active value has changed:
        if (!!this._isActive !== active) {
            // Update to the new value.
            this._isActive = active;
            // Fire the appropriate activation event.
            if (active) {
                this.onActivate.emit();
            }
            else {
                this.onDeactivate.emit();
            }
        }
        // Regardless, emit a change to `isActive`, so [(isActive)] works correctly.
        this.isActiveChange.emit(active);
    }
    onClick() {
        if (!this.isDisabled) {
            // Activate the tab when clicked, so long as it isn't disabled.
            this.isActive = true;
        }
    }
};
tslib_1.__decorate([
    HostBinding("class.item")
], SuiTabHeader.prototype, "_headerClasses", void 0);
tslib_1.__decorate([
    Input("suiTabHeader")
], SuiTabHeader.prototype, "id", void 0);
tslib_1.__decorate([
    Output()
], SuiTabHeader.prototype, "isActiveChange", void 0);
tslib_1.__decorate([
    Output("activate")
], SuiTabHeader.prototype, "onActivate", void 0);
tslib_1.__decorate([
    Output("deactivate")
], SuiTabHeader.prototype, "onDeactivate", void 0);
tslib_1.__decorate([
    HostBinding("class.active"),
    Input()
], SuiTabHeader.prototype, "isActive", null);
tslib_1.__decorate([
    HostBinding("class.disabled"),
    Input()
], SuiTabHeader.prototype, "isDisabled", null);
tslib_1.__decorate([
    HostListener("click")
], SuiTabHeader.prototype, "onClick", null);
SuiTabHeader = tslib_1.__decorate([
    Directive({
        selector: "[suiTabHeader]"
    })
], SuiTabHeader);
export { SuiTabHeader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGFicy9kaXJlY3RpdmVzL3RhYi1oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtsRyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBa0VyQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNsRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUUxRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTdDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFsREQsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxNQUFjO1FBQzlCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN0QixzRUFBc0U7UUFDdEUsa0ZBQWtGO1FBQ2xGLCtEQUErRDtRQUMvRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osbURBQW1EO1lBQ25ELFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFOUIsMERBQTBEO1lBQzFELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBTUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBVyxVQUFVLENBQUMsUUFBZ0I7UUFDbEMsNkRBQTZEO1FBQzdELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFFNUIsd0RBQXdEO1lBQ3hELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7SUFlRCxrQ0FBa0M7SUFDM0IsY0FBYyxDQUFDLE1BQWM7UUFDaEMsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQzdCLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUV4Qix5Q0FBeUM7WUFDekMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVCO1NBQ0o7UUFFRCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUdPLE9BQU87UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQiwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXZHRztJQURDLFdBQVcsQ0FBQyxZQUFZLENBQUM7b0RBQ0s7QUFHL0I7SUFEQyxLQUFLLENBQUMsY0FBYyxDQUFDO3dDQUNMO0FBT2pCO0lBREMsTUFBTSxFQUFFO29EQUNtQztBQU81QztJQURDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0RBQ2tCO0FBSXJDO0lBREMsTUFBTSxDQUFDLFlBQVksQ0FBQztrREFDa0I7QUFJdkM7SUFGQyxXQUFXLENBQUMsY0FBYyxDQUFDO0lBQzNCLEtBQUssRUFBRTs0Q0FHUDtBQXFCRDtJQUZDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM3QixLQUFLLEVBQUU7OENBR1A7QUErQ0Q7SUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzJDQU1yQjtBQXhHUSxZQUFZO0lBSHhCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7S0FDN0IsQ0FBQztHQUNXLFlBQVksQ0F5R3hCO1NBekdZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIb3N0QmluZGluZywgSW5wdXQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlUYWJIZWFkZXJdXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpVGFiSGVhZGVyIHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pdGVtXCIpXG4gICAgcHJpdmF0ZSBfaGVhZGVyQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgQElucHV0KFwic3VpVGFiSGVhZGVyXCIpXG4gICAgcHVibGljIGlkOnN0cmluZztcblxuICAgIC8vIEludGVybmFsbHkga2VlcHMgdHJhY2sgb2Ygd2hldGhlciB0aGUgaGVhZGVyIGlzIGFjdGl2ZS5cbiAgICBwcml2YXRlIF9pc0FjdGl2ZTpib29sZWFuO1xuXG4gICAgLy8gRW5hYmxlcyB1c2Ugb2YgWyhpc0FjdGl2ZSldIHNvIHN0YXRlIGNhbiBiZSBzZXQgdXNpbmcgYm9vbGVhbnMuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGlzQWN0aXZlQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIC8vIEZpcmVzIG9ubHkgd2hlbiBgaXNBY3RpdmVgIGNoYW5nZXMgZHVlIHRvIHVzZXIgaW5wdXQuXG4gICAgcHVibGljIGlzQWN0aXZlRXh0ZXJuYWxDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuXG4gICAgLy8gRmlyZXMgd2hlbmV2ZXIgYSB0YWIgaXMgYWN0aXZhdGVkIGhhdmluZyBwcmV2aW91c2x5IGJlZW4gZGVhY3RpdmF0ZWQuXG4gICAgQE91dHB1dChcImFjdGl2YXRlXCIpXG4gICAgcHVibGljIG9uQWN0aXZhdGU6RXZlbnRFbWl0dGVyPHZvaWQ+O1xuXG4gICAgLy8gRmlyZXMgd2hlbmV2ZXIgYSB0YWIgaXMgZGVhY3RpdmF0ZWQgaGF2aW5nIHByZXZpb3VzbHkgYmVlbiBhY3RpdmF0ZWQuXG4gICAgQE91dHB1dChcImRlYWN0aXZhdGVcIilcbiAgICBwdWJsaWMgb25EZWFjdGl2YXRlOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNBY3RpdmU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc0FjdGl2ZShhY3RpdmU6Ym9vbGVhbikge1xuICAgICAgICBsZXQgaXNBY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIC8vIE9ubHkgdXNlZCBieSBASW5wdXQoKSwgcnVucyB3aGVuZXZlciB1c2VyIGlucHV0IGNoYW5nZXMgYGlzQWN0aXZlYC5cbiAgICAgICAgLy8gUnVuIGluIHRpbWVvdXQgYmVjYXVzZSBgaXNEaXNhYmxlZGAgY2FuIHByb2hpYml0IHVzZXIgZnJvbSBjaGFuZ2luZyBgaXNBY3RpdmVgLlxuICAgICAgICAvLyBzbyB1cGRhdGUgaXMgZGVsYXllZCB0byBhdm9pZCAnY2hhbmdlZCBhZnRlciBjaGVja2VkJyBlcnJvci5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBPbmx5IGFsbG93IGNoYW5nZSBpZiB0YWIgaGVhZGVyIGlzIG5vdCBkaXNhYmxlZC5cbiAgICAgICAgICAgIGlzQWN0aXZlID0gIXRoaXMuaXNEaXNhYmxlZCA/IGFjdGl2ZSA6IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVTdGF0ZShpc0FjdGl2ZSk7XG5cbiAgICAgICAgICAgIC8vIEZpcmUgJ2V4dGVybmFsIGNoYW5nZScgZXZlbnQgYXMgdXNlciBpbnB1dCBoYXMgb2NjdXJlZC5cbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmVFeHRlcm5hbENoYW5nZS5lbWl0KGlzQWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNEaXNhYmxlZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZGlzYWJsZWRcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaXNEaXNhYmxlZCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzRGlzYWJsZWQoZGlzYWJsZWQ6Ym9vbGVhbikge1xuICAgICAgICAvLyBPbmx5IHVwZGF0ZSBpZiB2YWx1ZSBwcm92aWRlZCBpcyBkaWZmZXJlbnQgdG8gY3VycmVudCBvbmUuXG4gICAgICAgIGlmICh0aGlzLl9pc0Rpc2FibGVkICE9PSBkaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5faXNEaXNhYmxlZCA9IGRpc2FibGVkO1xuXG4gICAgICAgICAgICAvLyBJZiBub3cgZGlzYWJsZWQsIHRoZW4gdGFiIGhlYWRlciBtdXN0IGJlIGRlYWN0aXZhdGVkLlxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQWN0aXZlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgICAgICB0aGlzLmlzQWN0aXZlRXh0ZXJuYWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAgICAgdGhpcy5vbkFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgICAgICB0aGlzLm9uRGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9oZWFkZXJDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBJbnRlcm5hbGx5IHVwZGF0ZSBhY3RpdmUgc3RhdGUuXG4gICAgcHVibGljIHNldEFjdGl2ZVN0YXRlKGFjdGl2ZTpib29sZWFuKTp2b2lkIHtcbiAgICAgICAgLy8gSWYgKGNhc3QpIGFjdGl2ZSB2YWx1ZSBoYXMgY2hhbmdlZDpcbiAgICAgICAgaWYgKCEhdGhpcy5faXNBY3RpdmUgIT09IGFjdGl2ZSkge1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRvIHRoZSBuZXcgdmFsdWUuXG4gICAgICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IGFjdGl2ZTtcblxuICAgICAgICAgICAgLy8gRmlyZSB0aGUgYXBwcm9wcmlhdGUgYWN0aXZhdGlvbiBldmVudC5cbiAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWN0aXZhdGUuZW1pdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVhY3RpdmF0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWdhcmRsZXNzLCBlbWl0IGEgY2hhbmdlIHRvIGBpc0FjdGl2ZWAsIHNvIFsoaXNBY3RpdmUpXSB3b3JrcyBjb3JyZWN0bHkuXG4gICAgICAgIHRoaXMuaXNBY3RpdmVDaGFuZ2UuZW1pdChhY3RpdmUpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKVxuICAgIHByaXZhdGUgb25DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIHRhYiB3aGVuIGNsaWNrZWQsIHNvIGxvbmcgYXMgaXQgaXNuJ3QgZGlzYWJsZWQuXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==