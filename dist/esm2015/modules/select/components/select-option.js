import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer2, ElementRef, Output, ChangeDetectorRef } from "@angular/core";
import { SuiDropdownMenuItem } from "../../../modules/dropdown/directives/dropdown-menu";
let SuiSelectOption = class SuiSelectOption extends SuiDropdownMenuItem {
    constructor(_renderer, element, _changeDetector) {
        // We inherit SuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
        // This is not done via adding the .item class because it isn't supported by Angular.
        super(_renderer, element);
        this._renderer = _renderer;
        this.element = element;
        this._changeDetector = _changeDetector;
        this.optionClasses = true;
        this.isActive = false;
        this.onSelected = new EventEmitter();
        // By default we make the default text an empty label, for the brief moment when it isn't displaying the correct one.
        this.renderedText = "";
        this.usesTemplate = false;
    }
    set formatter(formatter) {
        if (!this.usesTemplate) {
            this.renderedText = formatter(this.value);
        }
        else {
            this.renderedText = "";
        }
    }
    markForCheck() {
        this._changeDetector.markForCheck();
    }
    onClick(e) {
        e.eventHandled = true;
        setTimeout(() => this.onSelected.emit(this.value));
    }
};
SuiSelectOption.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
tslib_1.__decorate([
    HostBinding("class.item")
], SuiSelectOption.prototype, "optionClasses", void 0);
tslib_1.__decorate([
    Input()
], SuiSelectOption.prototype, "value", void 0);
tslib_1.__decorate([
    Output()
], SuiSelectOption.prototype, "onSelected", void 0);
tslib_1.__decorate([
    HostBinding("class.active")
], SuiSelectOption.prototype, "isActive", void 0);
tslib_1.__decorate([
    ViewChild("templateSibling", { read: ViewContainerRef, static: true })
], SuiSelectOption.prototype, "templateSibling", void 0);
tslib_1.__decorate([
    HostListener("click", ["$event"])
], SuiSelectOption.prototype, "onClick", null);
SuiSelectOption = tslib_1.__decorate([
    Component({
        selector: "sui-select-option",
        template: `
        <span #templateSibling></span>
        <span [innerHTML]="renderedText"></span>
    `
    })
], SuiSelectOption);
export { SuiSelectOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VsZWN0L2NvbXBvbmVudHMvc2VsZWN0LW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFVekYsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBbUIsU0FBUSxtQkFBbUI7SUErQnZELFlBQ2MsU0FBbUIsRUFDdEIsT0FBa0IsRUFDZixlQUFpQztRQUUzQyw4RkFBOEY7UUFDOUYscUZBQXFGO1FBQ3JGLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFOaEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBTTNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUV4QyxxSEFBcUg7UUFDckgsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQS9CRCxJQUFXLFNBQVMsQ0FBQyxTQUEyQjtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQTJCTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBR00sT0FBTyxDQUFDLENBQWM7UUFDekIsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFdEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDSixDQUFBOztZQTVCMkIsU0FBUztZQUNkLFVBQVU7WUFDQyxpQkFBaUI7O0FBL0IvQztJQURDLFdBQVcsQ0FBQyxZQUFZLENBQUM7c0RBQ0c7QUFHN0I7SUFEQyxLQUFLLEVBQUU7OENBQ087QUFJZjtJQURDLE1BQU0sRUFBRTttREFDeUI7QUFHbEM7SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDO2lEQUNKO0FBZ0J4QjtJQURDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQy9CO0FBMEJ4QztJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs4Q0FLakM7QUEzRFEsZUFBZTtJQVAzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRTs7O0tBR1Q7S0FDSixDQUFDO0dBQ1csZUFBZSxDQTREM0I7U0E1RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgUmVuZGVyZXIyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT3V0cHV0LFxuICAgIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWlEcm9wZG93bk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvZHJvcGRvd24vZGlyZWN0aXZlcy9kcm9wZG93bi1tZW51XCI7XG5pbXBvcnQgeyBIYW5kbGVkRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvdXRpbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktc2VsZWN0LW9wdGlvblwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICN0ZW1wbGF0ZVNpYmxpbmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInJlbmRlcmVkVGV4dFwiPjwvc3Bhbj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlbGVjdE9wdGlvbjxUPiBleHRlbmRzIFN1aURyb3Bkb3duTWVudUl0ZW0ge1xuICAgIC8vIFNldHMgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pdGVtXCIpXG4gICAgcHVibGljIG9wdGlvbkNsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOlQ7XG5cbiAgICAvLyBGaXJlcyB3aGVuIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQsIHdoZXRoZXIgYnkgY2xpY2tpbmcgb3IgYnkga2V5Ym9hcmQuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0ZWQ6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGlzQWN0aXZlOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgcmVuZGVyZWRUZXh0PzpzdHJpbmc7XG5cbiAgICBwdWJsaWMgc2V0IGZvcm1hdHRlcihmb3JtYXR0ZXI6KG9iajpUKSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXNUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFRleHQgPSBmb3JtYXR0ZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkVGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXNlc1RlbXBsYXRlOmJvb2xlYW47XG5cbiAgICAvLyBQbGFjZWhvbGRlciB0byBkcmF3IHRlbXBsYXRlIGJlc2lkZS5cbiAgICBAVmlld0NoaWxkKFwidGVtcGxhdGVTaWJsaW5nXCIsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIHRlbXBsYXRlU2libGluZzpWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yOkNoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIC8vIFdlIGluaGVyaXQgU3VpRHJvcGRvd25NZW51SXRlbSB0byBhdXRvbWF0aWNhbGx5IGdhaW4gYWxsIGtleWJvYXJkIG5hdmlnYXRpb24gZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgLy8gVGhpcyBpcyBub3QgZG9uZSB2aWEgYWRkaW5nIHRoZSAuaXRlbSBjbGFzcyBiZWNhdXNlIGl0IGlzbid0IHN1cHBvcnRlZCBieSBBbmd1bGFyLlxuICAgICAgICBzdXBlcihfcmVuZGVyZXIsIGVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMub3B0aW9uQ2xhc3NlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQgd2UgbWFrZSB0aGUgZGVmYXVsdCB0ZXh0IGFuIGVtcHR5IGxhYmVsLCBmb3IgdGhlIGJyaWVmIG1vbWVudCB3aGVuIGl0IGlzbid0IGRpc3BsYXlpbmcgdGhlIGNvcnJlY3Qgb25lLlxuICAgICAgICB0aGlzLnJlbmRlcmVkVGV4dCA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy51c2VzVGVtcGxhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0ZvckNoZWNrKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uQ2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0aGlzLnZhbHVlKSk7XG4gICAgfVxufVxuIl19