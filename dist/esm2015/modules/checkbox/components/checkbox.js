var SuiCheckboxValueAccessor_1;
import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
let SuiCheckbox = class SuiCheckbox {
    constructor() {
        this.isChecked = false;
        this.onCheckChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.checkboxClasses = true;
    }
    get checkedAttribute() {
        return this.isChecked ? "" : undefined;
    }
    get isDisabledAttribute() {
        return this.isDisabled ? "disabled" : undefined;
    }
    onMouseDown(e) {
        e.preventDefault();
    }
    onClick() {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    }
    onFocusOut() {
        this.onTouched.emit();
    }
    toggle() {
        this.isChecked = !this.isChecked;
        this.onCheckChange.emit(this.isChecked);
    }
    writeValue(value) {
        this.isChecked = value;
    }
    focusCheckbox() {
        this.checkboxElement.nativeElement.focus();
    }
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
        template: `
        <input
            class="hidden"
            type="checkbox"
            [attr.name]="name"
            [attr.checked]="checkedAttribute"
            [attr.disabled]="isDisabledAttribute"
            [(ngModel)]="isChecked"
            #checkbox
        />
        <label>
            <ng-content></ng-content>
        </label>
    `
    })
], SuiCheckbox);
export { SuiCheckbox };
let SuiCheckboxValueAccessor = SuiCheckboxValueAccessor_1 = class SuiCheckboxValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiCheckboxValueAccessor.ctorParameters = () => [
    { type: SuiCheckbox }
];
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
export { SuiCheckboxValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLFNBQVMsRUFFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLGtEQUFrRCxDQUFDO0FBb0IxRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBbUNwQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQXBCRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFXLG1CQUFtQjtRQUMxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BELENBQUM7SUFpQk0sV0FBVyxDQUFDLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFHTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTTtRQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0MsQ0FBQztDQUNKLENBQUE7QUF6RUc7SUFGQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztvREFDQztBQUcvQjtJQURDLEtBQUssRUFBRTt5Q0FDVztBQUduQjtJQURDLFdBQVcsQ0FBQyxlQUFlLENBQUM7OENBQ0o7QUFHekI7SUFEQyxNQUFNLENBQUMsYUFBYSxDQUFDO2tEQUNxQjtBQUczQztJQURDLE1BQU0sQ0FBQyxTQUFTLENBQUM7OENBQ2tCO0FBR3BDO0lBREMsS0FBSyxFQUFFOytDQUNrQjtBQUkxQjtJQUZDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztJQUM5QixLQUFLLEVBQUU7K0NBQ2tCO0FBVzFCO0lBREMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztvREFDTjtBQWNsQztJQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs4Q0FHckM7QUFHRDtJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7MENBTXJCO0FBR0Q7SUFEQyxZQUFZLENBQUMsVUFBVSxDQUFDOzZDQUd4QjtBQTlEUSxXQUFXO0lBbEJ2QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7S0FhVDtLQUNKLENBQUM7R0FDVyxXQUFXLENBNEV2QjtTQTVFWSxXQUFXO0FBc0Z4QixJQUFhLHdCQUF3QixnQ0FBckMsTUFBYSx3QkFBeUIsU0FBUSxtQkFHN0M7SUFDRyxZQUFZLElBQWdCO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTs7WUFIb0IsV0FBVzs7QUFKbkIsd0JBQXdCO0lBUnBDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLElBQUksRUFBRTtZQUNGLGVBQWUsRUFBRSxrQkFBa0I7WUFDbkMsV0FBVyxFQUFFLGFBQWE7U0FDN0I7UUFDRCxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQywwQkFBd0IsQ0FBQyxDQUFDO0tBQ3BFLENBQUM7R0FDVyx3QkFBd0IsQ0FPcEM7U0FQWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0NoaWxkLFxuICAgIEVsZW1lbnRSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0LFxuICAgIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LFxuICAgIEN1c3RvbVZhbHVlQWNjZXNzb3Jcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2N1c3RvbS12YWx1ZS1hY2Nlc3NvclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2hlY2tib3hcIixcbiAgICBleHBvcnRBczogXCJzdWlDaGVja2JveFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJoaWRkZW5cIlxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICBbYXR0ci5jaGVja2VkXT1cImNoZWNrZWRBdHRyaWJ1dGVcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAjY2hlY2tib3hcbiAgICAgICAgLz5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2hlY2tib3ggaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8Ym9vbGVhbj4ge1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tib3hcIilcbiAgICBwdWJsaWMgY2hlY2tib3hDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBuYW1lOnN0cmluZztcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmNoZWNrZWRcIilcbiAgICBwdWJsaWMgaXNDaGVja2VkOmJvb2xlYW47XG5cbiAgICBAT3V0cHV0KFwiY2hlY2tDaGFuZ2VcIilcbiAgICBwdWJsaWMgb25DaGVja0NoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBAT3V0cHV0KFwidG91Y2hlZFwiKVxuICAgIHB1YmxpYyBvblRvdWNoZWQ6RXZlbnRFbWl0dGVyPHZvaWQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNEaXNhYmxlZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucmVhZC1vbmx5XCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNSZWFkb25seTpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBjaGVja2VkQXR0cmlidXRlKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDaGVja2VkID8gXCJcIiA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWRBdHRyaWJ1dGUoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoXCJjaGVja2JveFwiLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyBjaGVja2JveEVsZW1lbnQ6RWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ2hlY2tDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUmVhZG9ubHkgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNoZWNrYm94Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uTW91c2VEb3duKGU6TW91c2VFdmVudCk6dm9pZCB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIilcbiAgICBwdWJsaWMgb25DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCAmJiAhdGhpcy5pc1JlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0NoZWNrYm94KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIilcbiAgICBwdWJsaWMgb25Gb2N1c091dCgpOnZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9ICF0aGlzLmlzQ2hlY2tlZDtcbiAgICAgICAgdGhpcy5vbkNoZWNrQ2hhbmdlLmVtaXQodGhpcy5pc0NoZWNrZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOmJvb2xlYW4pOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNDaGVja2JveCgpOnZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrYm94RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2hlY2tib3hcIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiKGNoZWNrQ2hhbmdlKVwiOiBcIm9uQ2hhbmdlKCRldmVudClcIixcbiAgICAgICAgXCIodG91Y2hlZClcIjogXCJvblRvdWNoZWQoKVwiXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeShTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IgZXh0ZW5kcyBDdXN0b21WYWx1ZUFjY2Vzc29yPFxuICAgIGJvb2xlYW4sXG4gICAgU3VpQ2hlY2tib3hcbj4ge1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6U3VpQ2hlY2tib3gpIHtcbiAgICAgICAgc3VwZXIoaG9zdCk7XG4gICAgfVxufVxuIl19