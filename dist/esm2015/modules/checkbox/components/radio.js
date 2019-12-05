var SuiRadioValueAccessor_1;
import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
let SuiRadio = class SuiRadio {
    constructor() {
        this.radioClasses = true;
        this.isChecked = false;
        this.onCurrentValueChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.radioClasses = true;
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
            this.currentValue = this.value;
            this.onCurrentValueChange.emit(this.currentValue);
            this.update();
            this.focusRadio();
        }
    }
    onFocusOut() {
        this.onTouched.emit();
    }
    update() {
        this.isChecked = this.currentValue === this.value;
    }
    writeValue(value) {
        this.currentValue = value;
        this.update();
    }
    focusRadio() {
        this.radioElement.nativeElement.focus();
    }
};
tslib_1.__decorate([
    HostBinding("class.ui"),
    HostBinding("class.radio"),
    HostBinding("class.checkbox")
], SuiRadio.prototype, "radioClasses", void 0);
tslib_1.__decorate([
    Input()
], SuiRadio.prototype, "name", void 0);
tslib_1.__decorate([
    Input()
], SuiRadio.prototype, "value", void 0);
tslib_1.__decorate([
    HostBinding("class.checked")
], SuiRadio.prototype, "isChecked", void 0);
tslib_1.__decorate([
    Output("currentValueChange")
], SuiRadio.prototype, "onCurrentValueChange", void 0);
tslib_1.__decorate([
    Output("touched")
], SuiRadio.prototype, "onTouched", void 0);
tslib_1.__decorate([
    Input()
], SuiRadio.prototype, "isDisabled", void 0);
tslib_1.__decorate([
    HostBinding("class.read-only"),
    Input()
], SuiRadio.prototype, "isReadonly", void 0);
tslib_1.__decorate([
    ViewChild("radio", { static: true })
], SuiRadio.prototype, "radioElement", void 0);
tslib_1.__decorate([
    HostListener("mousedown", ["$event"])
], SuiRadio.prototype, "onMouseDown", null);
tslib_1.__decorate([
    HostListener("click")
], SuiRadio.prototype, "onClick", null);
tslib_1.__decorate([
    HostListener("focusout")
], SuiRadio.prototype, "onFocusOut", null);
SuiRadio = tslib_1.__decorate([
    Component({
        selector: "sui-radio-button",
        template: `
        <input
            class="hidden"
            type="checkbox"
            [attr.name]="name"
            [attr.checked]="checkedAttribute"
            [attr.disabled]="isDisabledAttribute"
            [ngModel]="isChecked"
            (ngModel)="currentValue = value"
            #radio
        />
        <label>
            <ng-content></ng-content>
        </label>
    `
    })
], SuiRadio);
export { SuiRadio };
let SuiRadioValueAccessor = SuiRadioValueAccessor_1 = class SuiRadioValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiRadioValueAccessor.ctorParameters = () => [
    { type: SuiRadio }
];
SuiRadioValueAccessor = SuiRadioValueAccessor_1 = tslib_1.__decorate([
    Directive({
        selector: "sui-radio-button",
        host: {
            "(currentValueChange)": "onChange($event)",
            "(touched)": "onTouched()"
        },
        providers: [customValueAccessorFactory(SuiRadioValueAccessor_1)]
    })
], SuiRadioValueAccessor);
export { SuiRadioValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLFNBQVMsRUFLWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLG1CQUFtQixFQUN0QixNQUFNLGtEQUFrRCxDQUFDO0FBbUIxRCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBeUNqQjtRQXJDTyxpQkFBWSxHQUFXLElBQUksQ0FBQztRQXNDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTFDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFqQkQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBVyxtQkFBbUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNwRCxDQUFDO0lBY00sV0FBVyxDQUFDLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBR00sVUFBVTtRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0RCxDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQU87UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUMsQ0FBQztDQUNKLENBQUE7QUFoRkc7SUFIQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDMUIsV0FBVyxDQUFDLGdCQUFnQixDQUFDOzhDQUNLO0FBR25DO0lBREMsS0FBSyxFQUFFO3NDQUNXO0FBR25CO0lBREMsS0FBSyxFQUFFO3VDQUNPO0FBR2Y7SUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzJDQUNKO0FBS3pCO0lBREMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO3NEQUNlO0FBRzVDO0lBREMsTUFBTSxDQUFDLFNBQVMsQ0FBQzsyQ0FDa0I7QUFHcEM7SUFEQyxLQUFLLEVBQUU7NENBQ2tCO0FBSTFCO0lBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO0lBQzlCLEtBQUssRUFBRTs0Q0FDa0I7QUFHMUI7SUFEQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzhDQUNOO0FBc0IvQjtJQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzsyQ0FHckM7QUFHRDtJQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7dUNBUXJCO0FBR0Q7SUFEQyxZQUFZLENBQUMsVUFBVSxDQUFDOzBDQUd4QjtBQXRFUSxRQUFRO0lBbEJwQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7S0FjVDtLQUNKLENBQUM7R0FDVyxRQUFRLENBb0ZwQjtTQXBGWSxRQUFRO0FBOEZyQixJQUFhLHFCQUFxQiw2QkFBbEMsTUFBYSxxQkFBeUIsU0FBUSxtQkFHN0M7SUFDRyxZQUFZLElBQWdCO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTs7WUFIb0IsUUFBUTs7QUFKaEIscUJBQXFCO0lBUmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsSUFBSSxFQUFFO1lBQ0Ysc0JBQXNCLEVBQUUsa0JBQWtCO1lBQzFDLFdBQVcsRUFBRSxhQUFhO1NBQzdCO1FBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMsdUJBQXFCLENBQUMsQ0FBQztLQUNqRSxDQUFDO0dBQ1cscUJBQXFCLENBT2pDO1NBUFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIFF1ZXJ5TGlzdFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsXG4gICAgY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsdWVBY2Nlc3NvclxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvY3VzdG9tLXZhbHVlLWFjY2Vzc29yXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktcmFkaW8tYnV0dG9uXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImhpZGRlblwiXG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgIFthdHRyLmNoZWNrZWRdPVwiY2hlY2tlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJpc0Rpc2FibGVkQXR0cmlidXRlXCJcbiAgICAgICAgICAgIFtuZ01vZGVsXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgICAgICAobmdNb2RlbCk9XCJjdXJyZW50VmFsdWUgPSB2YWx1ZVwiXG4gICAgICAgICAgICAjcmFkaW9cbiAgICAgICAgLz5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpUmFkaW88VD4gaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8VD4ge1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucmFkaW9cIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jaGVja2JveFwiKVxuICAgIHB1YmxpYyByYWRpb0NsYXNzZXM6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBuYW1lOnN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOlQ7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jaGVja2VkXCIpXG4gICAgcHVibGljIGlzQ2hlY2tlZDpib29sZWFuO1xuXG4gICAgcHVibGljIGN1cnJlbnRWYWx1ZTpUO1xuXG4gICAgQE91dHB1dChcImN1cnJlbnRWYWx1ZUNoYW5nZVwiKVxuICAgIHB1YmxpYyBvbkN1cnJlbnRWYWx1ZUNoYW5nZTpFdmVudEVtaXR0ZXI8VD47XG5cbiAgICBAT3V0cHV0KFwidG91Y2hlZFwiKVxuICAgIHB1YmxpYyBvblRvdWNoZWQ6RXZlbnRFbWl0dGVyPHZvaWQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNEaXNhYmxlZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucmVhZC1vbmx5XCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNSZWFkb25seTpib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZChcInJhZGlvXCIsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIHJhZGlvRWxlbWVudDpFbGVtZW50UmVmO1xuXG4gICAgcHVibGljIGdldCBjaGVja2VkQXR0cmlidXRlKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDaGVja2VkID8gXCJcIiA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWRBdHRyaWJ1dGUoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ3VycmVudFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5yYWRpb0NsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbk1vdXNlRG93bihlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgcHVibGljIG9uQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQgJiYgIXRoaXMuaXNSZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbkN1cnJlbnRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzUmFkaW8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkLmVtaXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5jdXJyZW50VmFsdWUgPT09IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6VCk6dm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c1JhZGlvKCk6dm9pZCB7XG4gICAgICAgIHRoaXMucmFkaW9FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1yYWRpby1idXR0b25cIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiKGN1cnJlbnRWYWx1ZUNoYW5nZSlcIjogXCJvbkNoYW5nZSgkZXZlbnQpXCIsXG4gICAgICAgIFwiKHRvdWNoZWQpXCI6IFwib25Ub3VjaGVkKClcIlxuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnkoU3VpUmFkaW9WYWx1ZUFjY2Vzc29yKV1cbn0pXG5leHBvcnQgY2xhc3MgU3VpUmFkaW9WYWx1ZUFjY2Vzc29yPFQ+IGV4dGVuZHMgQ3VzdG9tVmFsdWVBY2Nlc3NvcjxcbiAgICBULFxuICAgIFN1aVJhZGlvPFQ+XG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OlN1aVJhZGlvPFQ+KSB7XG4gICAgICAgIHN1cGVyKGhvc3QpO1xuICAgIH1cbn1cbiJdfQ==