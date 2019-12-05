import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
var SuiCheckbox = /** @class */ (function () {
    function SuiCheckbox() {
        this.isChecked = false;
        this.onCheckChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.checkboxClasses = true;
    }
    Object.defineProperty(SuiCheckbox.prototype, "checkedAttribute", {
        get: function () {
            return this.isChecked ? "" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCheckbox.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    SuiCheckbox.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiCheckbox.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    };
    SuiCheckbox.prototype.onFocusOut = function () {
        this.onTouched.emit();
    };
    SuiCheckbox.prototype.toggle = function () {
        this.isChecked = !this.isChecked;
        this.onCheckChange.emit(this.isChecked);
    };
    SuiCheckbox.prototype.writeValue = function (value) {
        this.isChecked = value;
    };
    SuiCheckbox.prototype.focusCheckbox = function () {
        this.checkboxElement.nativeElement.focus();
    };
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.checkbox")
    ], SuiCheckbox.prototype, "checkboxClasses", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiCheckbox.prototype, "name", void 0);
    tslib_1.__decorate([
        HostBinding("class.checked")
    ], SuiCheckbox.prototype, "isChecked", void 0);
    tslib_1.__decorate([
        Output("checkChange")
    ], SuiCheckbox.prototype, "onCheckChange", void 0);
    tslib_1.__decorate([
        Output("touched")
    ], SuiCheckbox.prototype, "onTouched", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiCheckbox.prototype, "isDisabled", void 0);
    tslib_1.__decorate([
        HostBinding("class.read-only"),
        Input()
    ], SuiCheckbox.prototype, "isReadonly", void 0);
    tslib_1.__decorate([
        ViewChild("checkbox", { static: true })
    ], SuiCheckbox.prototype, "checkboxElement", void 0);
    tslib_1.__decorate([
        HostListener("mousedown", ["$event"])
    ], SuiCheckbox.prototype, "onMouseDown", null);
    tslib_1.__decorate([
        HostListener("click")
    ], SuiCheckbox.prototype, "onClick", null);
    tslib_1.__decorate([
        HostListener("focusout")
    ], SuiCheckbox.prototype, "onFocusOut", null);
    SuiCheckbox = tslib_1.__decorate([
        Component({
            selector: "sui-checkbox",
            exportAs: "suiCheckbox",
            template: "\n        <input\n            class=\"hidden\"\n            type=\"checkbox\"\n            [attr.name]=\"name\"\n            [attr.checked]=\"checkedAttribute\"\n            [attr.disabled]=\"isDisabledAttribute\"\n            [(ngModel)]=\"isChecked\"\n            #checkbox\n        />\n        <label>\n            <ng-content></ng-content>\n        </label>\n    "
        })
    ], SuiCheckbox);
    return SuiCheckbox;
}());
export { SuiCheckbox };
var SuiCheckboxValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SuiCheckboxValueAccessor, _super);
    function SuiCheckboxValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiCheckboxValueAccessor_1 = SuiCheckboxValueAccessor;
    var SuiCheckboxValueAccessor_1;
    SuiCheckboxValueAccessor.ctorParameters = function () { return [
        { type: SuiCheckbox }
    ]; };
    SuiCheckboxValueAccessor = SuiCheckboxValueAccessor_1 = tslib_1.__decorate([
        Directive({
            selector: "sui-checkbox",
            host: {
                "(checkChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiCheckboxValueAccessor_1)]
        })
    ], SuiCheckboxValueAccessor);
    return SuiCheckboxValueAccessor;
}(CustomValueAccessor));
export { SuiCheckboxValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ3RCLE1BQU0sa0RBQWtELENBQUM7QUFvQjFEO0lBbUNJO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUxQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBcEJELHNCQUFXLHlDQUFnQjthQUEzQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBbUI7YUFBOUI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBaUJNLGlDQUFXLEdBQWxCLFVBQW1CLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSw2QkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFHTSxnQ0FBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLDRCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLGdDQUFVLEdBQWpCLFVBQWtCLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVPLG1DQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQXhFRDtRQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkIsV0FBVyxDQUFDLGdCQUFnQixDQUFDO3dEQUNDO0lBRy9CO1FBREMsS0FBSyxFQUFFOzZDQUNXO0lBR25CO1FBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQztrREFDSjtJQUd6QjtRQURDLE1BQU0sQ0FBQyxhQUFhLENBQUM7c0RBQ3FCO0lBRzNDO1FBREMsTUFBTSxDQUFDLFNBQVMsQ0FBQztrREFDa0I7SUFHcEM7UUFEQyxLQUFLLEVBQUU7bURBQ2tCO0lBSTFCO1FBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQzlCLEtBQUssRUFBRTttREFDa0I7SUFXMUI7UUFEQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3dEQUNOO0lBY2xDO1FBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2tEQUdyQztJQUdEO1FBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs4Q0FNckI7SUFHRDtRQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7aURBR3hCO0lBOURRLFdBQVc7UUFsQnZCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxpWEFhVDtTQUNKLENBQUM7T0FDVyxXQUFXLENBNEV2QjtJQUFELGtCQUFDO0NBQUEsQUE1RUQsSUE0RUM7U0E1RVksV0FBVztBQXNGeEI7SUFBOEMsb0RBRzdDO0lBQ0csa0NBQVksSUFBZ0I7ZUFDeEIsa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQztpQ0FOUSx3QkFBd0I7OztnQkFJaEIsV0FBVzs7SUFKbkIsd0JBQXdCO1FBUnBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRTtnQkFDRixlQUFlLEVBQUUsa0JBQWtCO2dCQUNuQyxXQUFXLEVBQUUsYUFBYTthQUM3QjtZQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLDBCQUF3QixDQUFDLENBQUM7U0FDcEUsQ0FBQztPQUNXLHdCQUF3QixDQU9wQztJQUFELCtCQUFDO0NBQUEsQUFQRCxDQUE4QyxtQkFBbUIsR0FPaEU7U0FQWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0NoaWxkLFxuICAgIEVsZW1lbnRSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0LFxuICAgIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LFxuICAgIEN1c3RvbVZhbHVlQWNjZXNzb3Jcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2N1c3RvbS12YWx1ZS1hY2Nlc3NvclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2hlY2tib3hcIixcbiAgICBleHBvcnRBczogXCJzdWlDaGVja2JveFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJoaWRkZW5cIlxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICBbYXR0ci5jaGVja2VkXT1cImNoZWNrZWRBdHRyaWJ1dGVcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAjY2hlY2tib3hcbiAgICAgICAgLz5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2hlY2tib3ggaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8Ym9vbGVhbj4ge1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tib3hcIilcbiAgICBwdWJsaWMgY2hlY2tib3hDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBuYW1lOnN0cmluZztcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmNoZWNrZWRcIilcbiAgICBwdWJsaWMgaXNDaGVja2VkOmJvb2xlYW47XG5cbiAgICBAT3V0cHV0KFwiY2hlY2tDaGFuZ2VcIilcbiAgICBwdWJsaWMgb25DaGVja0NoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBAT3V0cHV0KFwidG91Y2hlZFwiKVxuICAgIHB1YmxpYyBvblRvdWNoZWQ6RXZlbnRFbWl0dGVyPHZvaWQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNEaXNhYmxlZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucmVhZC1vbmx5XCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNSZWFkb25seTpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBjaGVja2VkQXR0cmlidXRlKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDaGVja2VkID8gXCJcIiA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWRBdHRyaWJ1dGUoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoXCJjaGVja2JveFwiLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyBjaGVja2JveEVsZW1lbnQ6RWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ2hlY2tDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUmVhZG9ubHkgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNoZWNrYm94Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uTW91c2VEb3duKGU6TW91c2VFdmVudCk6dm9pZCB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIilcbiAgICBwdWJsaWMgb25DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCAmJiAhdGhpcy5pc1JlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0NoZWNrYm94KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIilcbiAgICBwdWJsaWMgb25Gb2N1c091dCgpOnZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9ICF0aGlzLmlzQ2hlY2tlZDtcbiAgICAgICAgdGhpcy5vbkNoZWNrQ2hhbmdlLmVtaXQodGhpcy5pc0NoZWNrZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOmJvb2xlYW4pOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNDaGVja2JveCgpOnZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrYm94RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2hlY2tib3hcIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiKGNoZWNrQ2hhbmdlKVwiOiBcIm9uQ2hhbmdlKCRldmVudClcIixcbiAgICAgICAgXCIodG91Y2hlZClcIjogXCJvblRvdWNoZWQoKVwiXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeShTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBDdXN0b21WYWx1ZUFjY2Vzc29yPFxuICAgIGJvb2xlYW4sXG4gICAgU3VpQ2hlY2tib3hcbj4ge1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6U3VpQ2hlY2tib3gpIHtcbiAgICAgICAgc3VwZXIoaG9zdCk7XG4gICAgfVxufVxuIl19