var SuiCheckboxValueAccessor_1;
import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
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
        this._checkboxElement.nativeElement.focus();
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
], SuiCheckbox.prototype, "_checkboxElement", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLFNBQVMsRUFFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLDBCQUEwQixDQUFDO0FBb0JsQyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBbUNwQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQXBCRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFXLG1CQUFtQjtRQUMxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BELENBQUM7SUFpQk0sV0FBVyxDQUFDLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFHTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTTtRQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTtBQXpFRztJQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDdkIsV0FBVyxDQUFDLGdCQUFnQixDQUFDO29EQUNDO0FBRy9CO0lBREMsS0FBSyxFQUFFO3lDQUNXO0FBR25CO0lBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs4Q0FDSjtBQUd6QjtJQURDLE1BQU0sQ0FBQyxhQUFhLENBQUM7a0RBQ3FCO0FBRzNDO0lBREMsTUFBTSxDQUFDLFNBQVMsQ0FBQzs4Q0FDa0I7QUFHcEM7SUFEQyxLQUFLLEVBQUU7K0NBQ2tCO0FBSTFCO0lBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0lBQzlCLEtBQUssRUFBRTsrQ0FDa0I7QUFXMUI7SUFEQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3FEQUNKO0FBY3BDO0lBREMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzhDQUdyQztBQUdEO0lBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzswQ0FNckI7QUFHRDtJQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7NkNBR3hCO0FBOURRLFdBQVc7SUFsQnZCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztLQWFUO0tBQ0osQ0FBQztHQUNXLFdBQVcsQ0E0RXZCO1NBNUVZLFdBQVc7QUFzRnhCLElBQWEsd0JBQXdCLGdDQUFyQyxNQUFhLHdCQUF5QixTQUFRLG1CQUc3QztJQUNHLFlBQVksSUFBZ0I7UUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Q0FDSixDQUFBOztZQUhvQixXQUFXOztBQUpuQix3QkFBd0I7SUFScEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsSUFBSSxFQUFFO1lBQ0YsZUFBZSxFQUFFLGtCQUFrQjtZQUNuQyxXQUFXLEVBQUUsYUFBYTtTQUM3QjtRQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLDBCQUF3QixDQUFDLENBQUM7S0FDcEUsQ0FBQztHQUNXLHdCQUF3QixDQU9wQztTQVBZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3Q2hpbGQsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsXG4gICAgY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsdWVBY2Nlc3NvclxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jaGVja2JveFwiLFxuICAgIGV4cG9ydEFzOiBcInN1aUNoZWNrYm94XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImhpZGRlblwiXG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgIFthdHRyLmNoZWNrZWRdPVwiY2hlY2tlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJpc0Rpc2FibGVkQXR0cmlidXRlXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwiaXNDaGVja2VkXCJcbiAgICAgICAgICAgICNjaGVja2JveFxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlDaGVja2JveCBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxib29sZWFuPiB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jaGVja2JveFwiKVxuICAgIHB1YmxpYyBjaGVja2JveENsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG5hbWU6c3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tlZFwiKVxuICAgIHB1YmxpYyBpc0NoZWNrZWQ6Ym9vbGVhbjtcblxuICAgIEBPdXRwdXQoXCJjaGVja0NoYW5nZVwiKVxuICAgIHB1YmxpYyBvbkNoZWNrQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIEBPdXRwdXQoXCJ0b3VjaGVkXCIpXG4gICAgcHVibGljIG9uVG91Y2hlZDpFdmVudEVtaXR0ZXI8dm9pZD47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0Rpc2FibGVkOmJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5yZWFkLW9ubHlcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc1JlYWRvbmx5OmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IGNoZWNrZWRBdHRyaWJ1dGUoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0NoZWNrZWQgPyBcIlwiIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNEaXNhYmxlZEF0dHJpYnV0ZSgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChcImNoZWNrYm94XCIsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfY2hlY2tib3hFbGVtZW50OkVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNoZWNrQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jaGVja2JveENsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbk1vdXNlRG93bihlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgcHVibGljIG9uQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQgJiYgIXRoaXMuaXNSZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNDaGVja2JveCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIpXG4gICAgcHVibGljIG9uRm9jdXNPdXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQuZW1pdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSAhdGhpcy5pc0NoZWNrZWQ7XG4gICAgICAgIHRoaXMub25DaGVja0NoYW5nZS5lbWl0KHRoaXMuaXNDaGVja2VkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpib29sZWFuKTp2b2lkIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzQ2hlY2tib3goKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fY2hlY2tib3hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jaGVja2JveFwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCIoY2hlY2tDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aUNoZWNrYm94VmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNoZWNrYm94VmFsdWVBY2Nlc3NvciBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgYm9vbGVhbixcbiAgICBTdWlDaGVja2JveFxuPiB7XG4gICAgY29uc3RydWN0b3IoaG9zdDpTdWlDaGVja2JveCkge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=