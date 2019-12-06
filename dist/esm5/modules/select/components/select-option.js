import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer2, ElementRef, Output, ChangeDetectorRef } from "@angular/core";
import { SuiDropdownMenuItem } from "../../dropdown/index";
var SuiSelectOption = /** @class */ (function (_super) {
    tslib_1.__extends(SuiSelectOption, _super);
    function SuiSelectOption(renderer, element, changeDetector) {
        var _this = 
        // We inherit SuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
        // This is not done via adding the .item class because it isn't supported by Angular.
        _super.call(this, renderer, element) || this;
        _this.changeDetector = changeDetector;
        _this.optionClasses = true;
        _this.isActive = false;
        _this.onSelected = new EventEmitter();
        // By default we make the default text an empty label, for the brief moment when it isn't displaying the correct one.
        _this.renderedText = "";
        _this.usesTemplate = false;
        return _this;
    }
    Object.defineProperty(SuiSelectOption.prototype, "formatter", {
        set: function (formatter) {
            if (!this.usesTemplate) {
                this.renderedText = formatter(this.value);
            }
            else {
                this.renderedText = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiSelectOption.prototype.onClick = function (e) {
        var _this = this;
        e.eventHandled = true;
        setTimeout(function () { return _this.onSelected.emit(_this.value); });
    };
    SuiSelectOption.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
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
        ViewChild("templateSibling", { static: true, read: ViewContainerRef })
    ], SuiSelectOption.prototype, "templateSibling", void 0);
    tslib_1.__decorate([
        HostListener("click", ["$event"])
    ], SuiSelectOption.prototype, "onClick", null);
    SuiSelectOption = tslib_1.__decorate([
        Component({
            selector: "sui-select-option",
            template: "\n        <span #templateSibling></span>\n        <span [innerHTML]=\"renderedText\"></span>\n    "
        })
    ], SuiSelectOption);
    return SuiSelectOption;
}(SuiDropdownMenuItem));
export { SuiSelectOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VsZWN0L2NvbXBvbmVudHMvc2VsZWN0LW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFlBQVksRUFDWixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFVM0Q7SUFBd0MsMkNBQW1CO0lBK0J2RCx5QkFDSSxRQUFrQixFQUNsQixPQUFrQixFQUNYLGNBQWdDO1FBSDNDO1FBS0ksOEZBQThGO1FBQzlGLHFGQUFxRjtRQUNyRixrQkFBTSxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBVTNCO1FBZFUsb0JBQWMsR0FBZCxjQUFjLENBQWtCO1FBTXZDLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUV4QyxxSEFBcUg7UUFDckgsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFdkIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7O0lBQzlCLENBQUM7SUEvQkQsc0JBQVcsc0NBQVM7YUFBcEIsVUFBcUIsU0FBMkI7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQzthQUMxQjtRQUNMLENBQUM7OztPQUFBO0lBNEJNLGlDQUFPLEdBQWQsVUFBZSxDQUFjO1FBRDdCLGlCQUtDO1FBSEcsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFdEIsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztJQUN2RCxDQUFDOztnQkF2QlksU0FBUztnQkFDVixVQUFVO2dCQUNJLGlCQUFpQjs7SUEvQjNDO1FBREMsV0FBVyxDQUFDLFlBQVksQ0FBQzswREFDRztJQUc3QjtRQURDLEtBQUssRUFBRTtrREFDTztJQUlmO1FBREMsTUFBTSxFQUFFO3VEQUN5QjtJQUdsQztRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7cURBQ0o7SUFnQnhCO1FBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzs0REFDL0I7SUFzQnhDO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2tEQUtqQztJQXZEUSxlQUFlO1FBUDNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLG9HQUdUO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0F3RDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXhERCxDQUF3QyxtQkFBbUIsR0F3RDFEO1NBeERZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIE91dHB1dCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpRHJvcGRvd25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi9kcm9wZG93bi9pbmRleFwiO1xuaW1wb3J0IHsgSGFuZGxlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktc2VsZWN0LW9wdGlvblwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICN0ZW1wbGF0ZVNpYmxpbmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cInJlbmRlcmVkVGV4dFwiPjwvc3Bhbj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlbGVjdE9wdGlvbjxUPiBleHRlbmRzIFN1aURyb3Bkb3duTWVudUl0ZW0ge1xuICAgIC8vIFNldHMgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pdGVtXCIpXG4gICAgcHVibGljIG9wdGlvbkNsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOlQ7XG5cbiAgICAvLyBGaXJlcyB3aGVuIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQsIHdoZXRoZXIgYnkgY2xpY2tpbmcgb3IgYnkga2V5Ym9hcmQuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIG9uU2VsZWN0ZWQ6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgcHVibGljIGlzQWN0aXZlOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgcmVuZGVyZWRUZXh0PzpzdHJpbmc7XG5cbiAgICBwdWJsaWMgc2V0IGZvcm1hdHRlcihmb3JtYXR0ZXI6KG9iajpUKSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXNUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZFRleHQgPSBmb3JtYXR0ZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkVGV4dCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXNlc1RlbXBsYXRlOmJvb2xlYW47XG5cbiAgICAvLyBQbGFjZWhvbGRlciB0byBkcmF3IHRlbXBsYXRlIGJlc2lkZS5cbiAgICBAVmlld0NoaWxkKFwidGVtcGxhdGVTaWJsaW5nXCIsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgcHVibGljIHRlbXBsYXRlU2libGluZzpWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgLy8gV2UgaW5oZXJpdCBTdWlEcm9wZG93bk1lbnVJdGVtIHRvIGF1dG9tYXRpY2FsbHkgZ2FpbiBhbGwga2V5Ym9hcmQgbmF2aWdhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgICAgICAvLyBUaGlzIGlzIG5vdCBkb25lIHZpYSBhZGRpbmcgdGhlIC5pdGVtIGNsYXNzIGJlY2F1c2UgaXQgaXNuJ3Qgc3VwcG9ydGVkIGJ5IEFuZ3VsYXIuXG4gICAgICAgIHN1cGVyKHJlbmRlcmVyLCBlbGVtZW50KTtcblxuICAgICAgICB0aGlzLm9wdGlvbkNsYXNzZXMgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgICAgICAvLyBCeSBkZWZhdWx0IHdlIG1ha2UgdGhlIGRlZmF1bHQgdGV4dCBhbiBlbXB0eSBsYWJlbCwgZm9yIHRoZSBicmllZiBtb21lbnQgd2hlbiBpdCBpc24ndCBkaXNwbGF5aW5nIHRoZSBjb3JyZWN0IG9uZS5cbiAgICAgICAgdGhpcy5yZW5kZXJlZFRleHQgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudXNlc1RlbXBsYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25DbGljayhlOkhhbmRsZWRFdmVudCk6dm9pZCB7XG4gICAgICAgIGUuZXZlbnRIYW5kbGVkID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub25TZWxlY3RlZC5lbWl0KHRoaXMudmFsdWUpKTtcbiAgICB9XG59XG4iXX0=