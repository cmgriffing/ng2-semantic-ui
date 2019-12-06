import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
var SuiRadio = /** @class */ (function () {
    function SuiRadio() {
        this.radioClasses = true;
        this.isChecked = false;
        this.onCurrentValueChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.radioClasses = true;
    }
    Object.defineProperty(SuiRadio.prototype, "checkedAttribute", {
        get: function () {
            return this.isChecked ? "" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiRadio.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    SuiRadio.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiRadio.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.onCurrentValueChange.emit(this.currentValue);
            this.update();
            this.focusRadio();
        }
    };
    SuiRadio.prototype.onFocusOut = function () {
        this.onTouched.emit();
    };
    SuiRadio.prototype.update = function () {
        this.isChecked = this.currentValue === this.value;
    };
    SuiRadio.prototype.writeValue = function (value) {
        this.currentValue = value;
        this.update();
    };
    SuiRadio.prototype.focusRadio = function () {
        this._radioElement.nativeElement.focus();
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
    ], SuiRadio.prototype, "_radioElement", void 0);
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
            template: "\n        <input\n            class=\"hidden\"\n            type=\"checkbox\"\n            [attr.name]=\"name\"\n            [attr.checked]=\"checkedAttribute\"\n            [attr.disabled]=\"isDisabledAttribute\"\n            [ngModel]=\"isChecked\"\n            (ngModel)=\"currentValue = value\"\n            #radio\n        />\n        <label>\n            <ng-content></ng-content>\n        </label>\n    "
        })
    ], SuiRadio);
    return SuiRadio;
}());
export { SuiRadio };
var SuiRadioValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SuiRadioValueAccessor, _super);
    function SuiRadioValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiRadioValueAccessor_1 = SuiRadioValueAccessor;
    var SuiRadioValueAccessor_1;
    SuiRadioValueAccessor.ctorParameters = function () { return [
        { type: SuiRadio }
    ]; };
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
    return SuiRadioValueAccessor;
}(CustomValueAccessor));
export { SuiRadioValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUtaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBRXRCLE1BQU0sMEJBQTBCLENBQUM7QUFxQmxDO0lBeUNJO1FBckNPLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBc0MvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQWpCRCxzQkFBVyxzQ0FBZ0I7YUFBM0I7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQW1CO2FBQTlCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQWNNLDhCQUFXLEdBQWxCLFVBQW1CLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSwwQkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBR00sNkJBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSx5QkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUVNLDZCQUFVLEdBQWpCLFVBQWtCLEtBQU87UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyw2QkFBVSxHQUFsQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdDLENBQUM7SUEvRUQ7UUFIQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDMUIsV0FBVyxDQUFDLGdCQUFnQixDQUFDO2tEQUNLO0lBR25DO1FBREMsS0FBSyxFQUFFOzBDQUNXO0lBR25CO1FBREMsS0FBSyxFQUFFOzJDQUNPO0lBR2Y7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOytDQUNKO0lBS3pCO1FBREMsTUFBTSxDQUFDLG9CQUFvQixDQUFDOzBEQUNlO0lBRzVDO1FBREMsTUFBTSxDQUFDLFNBQVMsQ0FBQzsrQ0FDa0I7SUFHcEM7UUFEQyxLQUFLLEVBQUU7Z0RBQ2tCO0lBSTFCO1FBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQzlCLEtBQUssRUFBRTtnREFDa0I7SUFHMUI7UUFEQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO21EQUNKO0lBc0JqQztRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzsrQ0FHckM7SUFHRDtRQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7MkNBUXJCO0lBR0Q7UUFEQyxZQUFZLENBQUMsVUFBVSxDQUFDOzhDQUd4QjtJQXRFUSxRQUFRO1FBbEJwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSw0WkFjVDtTQUNKLENBQUM7T0FDVyxRQUFRLENBb0ZwQjtJQUFELGVBQUM7Q0FBQSxBQXBGRCxJQW9GQztTQXBGWSxRQUFRO0FBOEZyQjtJQUE4QyxpREFHN0M7SUFDRywrQkFBWSxJQUFnQjtlQUN4QixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDOzhCQU5RLHFCQUFxQjs7O2dCQUliLFFBQVE7O0lBSmhCLHFCQUFxQjtRQVJqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLElBQUksRUFBRTtnQkFDRixzQkFBc0IsRUFBRSxrQkFBa0I7Z0JBQzFDLFdBQVcsRUFBRSxhQUFhO2FBQzdCO1lBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMsdUJBQXFCLENBQUMsQ0FBQztTQUNqRSxDQUFDO09BQ1cscUJBQXFCLENBT2pDO0lBQUQsNEJBQUM7Q0FBQSxBQVBELENBQThDLG1CQUFtQixHQU9oRTtTQVBZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBRdWVyeUxpc3Rcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0LFxuICAgIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LFxuICAgIEN1c3RvbVZhbHVlQWNjZXNzb3IsXG4gICAgVXRpbFxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqcy9TdWJzY3JpcHRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXJhZGlvLWJ1dHRvblwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJoaWRkZW5cIlxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICBbYXR0ci5jaGVja2VkXT1cImNoZWNrZWRBdHRyaWJ1dGVcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbbmdNb2RlbF09XCJpc0NoZWNrZWRcIlxuICAgICAgICAgICAgKG5nTW9kZWwpPVwiY3VycmVudFZhbHVlID0gdmFsdWVcIlxuICAgICAgICAgICAgI3JhZGlvXG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVJhZGlvPFQ+IGltcGxlbWVudHMgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0PFQ+IHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJhZGlvXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tib3hcIilcbiAgICBwdWJsaWMgcmFkaW9DbGFzc2VzOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTpUO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tlZFwiKVxuICAgIHB1YmxpYyBpc0NoZWNrZWQ6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBjdXJyZW50VmFsdWU6VDtcblxuICAgIEBPdXRwdXQoXCJjdXJyZW50VmFsdWVDaGFuZ2VcIilcbiAgICBwdWJsaWMgb25DdXJyZW50VmFsdWVDaGFuZ2U6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgQE91dHB1dChcInRvdWNoZWRcIilcbiAgICBwdWJsaWMgb25Ub3VjaGVkOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzRGlzYWJsZWQ6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJlYWQtb25seVwiKVxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzUmVhZG9ubHk6Ym9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoXCJyYWRpb1wiLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3JhZGlvRWxlbWVudDpFbGVtZW50UmVmO1xuXG4gICAgcHVibGljIGdldCBjaGVja2VkQXR0cmlidXRlKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDaGVja2VkID8gXCJcIiA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzRGlzYWJsZWRBdHRyaWJ1dGUoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ3VycmVudFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5yYWRpb0NsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbk1vdXNlRG93bihlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgcHVibGljIG9uQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQgJiYgIXRoaXMuaXNSZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbkN1cnJlbnRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzUmFkaW8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJmb2N1c291dFwiKVxuICAgIHB1YmxpYyBvbkZvY3VzT3V0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkLmVtaXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gdGhpcy5jdXJyZW50VmFsdWUgPT09IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6VCk6dm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c1JhZGlvKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3JhZGlvRWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktcmFkaW8tYnV0dG9uXCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIihjdXJyZW50VmFsdWVDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aVJhZGlvVmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aVJhZGlvVmFsdWVBY2Nlc3NvcjxUPiBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgVCxcbiAgICBTdWlSYWRpbzxUPlxuPiB7XG4gICAgY29uc3RydWN0b3IoaG9zdDpTdWlSYWRpbzxUPikge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=