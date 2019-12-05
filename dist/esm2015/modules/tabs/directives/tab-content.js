import * as tslib_1 from "tslib";
import { HostBinding, Directive, Input } from "@angular/core";
let SuiTabContent = class SuiTabContent {
    constructor() {
        this.isActive = false;
        this._contentClasses = true;
    }
};
tslib_1.__decorate([
    HostBinding("class.tab")
], SuiTabContent.prototype, "_contentClasses", void 0);
tslib_1.__decorate([
    Input("suiTabContent")
], SuiTabContent.prototype, "id", void 0);
tslib_1.__decorate([
    HostBinding("class.active")
], SuiTabContent.prototype, "isActive", void 0);
SuiTabContent = tslib_1.__decorate([
    Directive({
        selector: "[suiTabContent]"
    })
], SuiTabContent);
export { SuiTabContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3RhYnMvZGlyZWN0aXZlcy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzlELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFVdEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQTtBQWJHO0lBREMsV0FBVyxDQUFDLFdBQVcsQ0FBQztzREFDTztBQUdoQztJQURDLEtBQUssQ0FBQyxlQUFlLENBQUM7eUNBQ047QUFHakI7SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDOytDQUNKO0FBUmYsYUFBYTtJQUh6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO0tBQzlCLENBQUM7R0FDVyxhQUFhLENBZXpCO1NBZlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhvc3RCaW5kaW5nLCBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aVRhYkNvbnRlbnRdXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpVGFiQ29udGVudCB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudGFiXCIpXG4gICAgcHJpdmF0ZSBfY29udGVudENsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dChcInN1aVRhYkNvbnRlbnRcIilcbiAgICBwdWJsaWMgaWQ6c3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGlzQWN0aXZlOmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2NvbnRlbnRDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG59XG4iXX0=