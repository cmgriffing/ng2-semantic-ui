import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
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
        this.radioElement.nativeElement.focus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUtaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ3RCLE1BQU0sa0RBQWtELENBQUM7QUFtQjFEO0lBeUNJO1FBckNPLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBc0MvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQWpCRCxzQkFBVyxzQ0FBZ0I7YUFBM0I7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQW1CO2FBQTlCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQWNNLDhCQUFXLEdBQWxCLFVBQW1CLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSwwQkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBR00sNkJBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSx5QkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUVNLDZCQUFVLEdBQWpCLFVBQWtCLEtBQU87UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTyw2QkFBVSxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVDLENBQUM7SUEvRUQ7UUFIQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDMUIsV0FBVyxDQUFDLGdCQUFnQixDQUFDO2tEQUNLO0lBR25DO1FBREMsS0FBSyxFQUFFOzBDQUNXO0lBR25CO1FBREMsS0FBSyxFQUFFOzJDQUNPO0lBR2Y7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOytDQUNKO0lBS3pCO1FBREMsTUFBTSxDQUFDLG9CQUFvQixDQUFDOzBEQUNlO0lBRzVDO1FBREMsTUFBTSxDQUFDLFNBQVMsQ0FBQzsrQ0FDa0I7SUFHcEM7UUFEQyxLQUFLLEVBQUU7Z0RBQ2tCO0lBSTFCO1FBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQzlCLEtBQUssRUFBRTtnREFDa0I7SUFHMUI7UUFEQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2tEQUNOO0lBc0IvQjtRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzsrQ0FHckM7SUFHRDtRQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7MkNBUXJCO0lBR0Q7UUFEQyxZQUFZLENBQUMsVUFBVSxDQUFDOzhDQUd4QjtJQXRFUSxRQUFRO1FBbEJwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSw0WkFjVDtTQUNKLENBQUM7T0FDVyxRQUFRLENBb0ZwQjtJQUFELGVBQUM7Q0FBQSxBQXBGRCxJQW9GQztTQXBGWSxRQUFRO0FBOEZyQjtJQUE4QyxpREFHN0M7SUFDRywrQkFBWSxJQUFnQjtlQUN4QixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDOzhCQU5RLHFCQUFxQjs7O2dCQUliLFFBQVE7O0lBSmhCLHFCQUFxQjtRQVJqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLElBQUksRUFBRTtnQkFDRixzQkFBc0IsRUFBRSxrQkFBa0I7Z0JBQzFDLFdBQVcsRUFBRSxhQUFhO2FBQzdCO1lBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMsdUJBQXFCLENBQUMsQ0FBQztTQUNqRSxDQUFDO09BQ1cscUJBQXFCLENBT2pDO0lBQUQsNEJBQUM7Q0FBQSxBQVBELENBQThDLG1CQUFtQixHQU9oRTtTQVBZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBRdWVyeUxpc3Rcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0LFxuICAgIGN1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5LFxuICAgIEN1c3RvbVZhbHVlQWNjZXNzb3Jcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2N1c3RvbS12YWx1ZS1hY2Nlc3NvclwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXJhZGlvLWJ1dHRvblwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJoaWRkZW5cIlxuICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICBbYXR0ci5jaGVja2VkXT1cImNoZWNrZWRBdHRyaWJ1dGVcIlxuICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiaXNEaXNhYmxlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbbmdNb2RlbF09XCJpc0NoZWNrZWRcIlxuICAgICAgICAgICAgKG5nTW9kZWwpPVwiY3VycmVudFZhbHVlID0gdmFsdWVcIlxuICAgICAgICAgICAgI3JhZGlvXG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVJhZGlvPFQ+IGltcGxlbWVudHMgSUN1c3RvbVZhbHVlQWNjZXNzb3JIb3N0PFQ+IHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJhZGlvXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tib3hcIilcbiAgICBwdWJsaWMgcmFkaW9DbGFzc2VzOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTpUO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tlZFwiKVxuICAgIHB1YmxpYyBpc0NoZWNrZWQ6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBjdXJyZW50VmFsdWU6VDtcblxuICAgIEBPdXRwdXQoXCJjdXJyZW50VmFsdWVDaGFuZ2VcIilcbiAgICBwdWJsaWMgb25DdXJyZW50VmFsdWVDaGFuZ2U6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgQE91dHB1dChcInRvdWNoZWRcIilcbiAgICBwdWJsaWMgb25Ub3VjaGVkOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzRGlzYWJsZWQ6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJlYWQtb25seVwiKVxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzUmVhZG9ubHk6Ym9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoXCJyYWRpb1wiLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyByYWRpb0VsZW1lbnQ6RWxlbWVudFJlZjtcblxuICAgIHB1YmxpYyBnZXQgY2hlY2tlZEF0dHJpYnV0ZSgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQ2hlY2tlZCA/IFwiXCIgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0Rpc2FibGVkQXR0cmlidXRlKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNEaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkN1cnJlbnRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAgICAgdGhpcy5pc0Rpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNSZWFkb25seSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucmFkaW9DbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2Vkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25Nb3VzZURvd24oZTpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKVxuICAgIHB1YmxpYyBvbkNsaWNrKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkICYmICF0aGlzLmlzUmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25DdXJyZW50VmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1JhZGlvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNvdXRcIilcbiAgICBwdWJsaWMgb25Gb2N1c091dCgpOnZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IHRoaXMuY3VycmVudFZhbHVlID09PSB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOlQpOnZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNSYWRpbygpOnZvaWQge1xuICAgICAgICB0aGlzLnJhZGlvRWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktcmFkaW8tYnV0dG9uXCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIihjdXJyZW50VmFsdWVDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aVJhZGlvVmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aVJhZGlvVmFsdWVBY2Nlc3NvcjxUPiBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgVCxcbiAgICBTdWlSYWRpbzxUPlxuPiB7XG4gICAgY29uc3RydWN0b3IoaG9zdDpTdWlSYWRpbzxUPikge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=