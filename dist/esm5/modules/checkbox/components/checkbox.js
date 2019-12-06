import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, HostListener, HostBinding, EventEmitter, ViewChild } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/index";
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
        this._checkboxElement.nativeElement.focus();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NoZWNrYm94L2NvbXBvbmVudHMvY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ3RCLE1BQU0sMEJBQTBCLENBQUM7QUFvQmxDO0lBbUNJO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUxQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBcEJELHNCQUFXLHlDQUFnQjthQUEzQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0Q0FBbUI7YUFBOUI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBaUJNLGlDQUFXLEdBQWxCLFVBQW1CLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHTSw2QkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFHTSxnQ0FBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLDRCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLGdDQUFVLEdBQWpCLFVBQWtCLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVPLG1DQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBeEVEO1FBRkMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QixXQUFXLENBQUMsZ0JBQWdCLENBQUM7d0RBQ0M7SUFHL0I7UUFEQyxLQUFLLEVBQUU7NkNBQ1c7SUFHbkI7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO2tEQUNKO0lBR3pCO1FBREMsTUFBTSxDQUFDLGFBQWEsQ0FBQztzREFDcUI7SUFHM0M7UUFEQyxNQUFNLENBQUMsU0FBUyxDQUFDO2tEQUNrQjtJQUdwQztRQURDLEtBQUssRUFBRTttREFDa0I7SUFJMUI7UUFGQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7UUFDOUIsS0FBSyxFQUFFO21EQUNrQjtJQVcxQjtRQURDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7eURBQ0o7SUFjcEM7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7a0RBR3JDO0lBR0Q7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzhDQU1yQjtJQUdEO1FBREMsWUFBWSxDQUFDLFVBQVUsQ0FBQztpREFHeEI7SUE5RFEsV0FBVztRQWxCdkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLGlYQWFUO1NBQ0osQ0FBQztPQUNXLFdBQVcsQ0E0RXZCO0lBQUQsa0JBQUM7Q0FBQSxBQTVFRCxJQTRFQztTQTVFWSxXQUFXO0FBc0Z4QjtJQUE4QyxvREFHN0M7SUFDRyxrQ0FBWSxJQUFnQjtlQUN4QixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO2lDQU5RLHdCQUF3Qjs7O2dCQUloQixXQUFXOztJQUpuQix3QkFBd0I7UUFScEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsSUFBSSxFQUFFO2dCQUNGLGVBQWUsRUFBRSxrQkFBa0I7Z0JBQ25DLFdBQVcsRUFBRSxhQUFhO2FBQzdCO1lBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMsMEJBQXdCLENBQUMsQ0FBQztTQUNwRSxDQUFDO09BQ1csd0JBQXdCLENBT3BDO0lBQUQsK0JBQUM7Q0FBQSxBQVBELENBQThDLG1CQUFtQixHQU9oRTtTQVBZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3Q2hpbGQsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3QsXG4gICAgY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsdWVBY2Nlc3NvclxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jaGVja2JveFwiLFxuICAgIGV4cG9ydEFzOiBcInN1aUNoZWNrYm94XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImhpZGRlblwiXG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgIFthdHRyLmNoZWNrZWRdPVwiY2hlY2tlZEF0dHJpYnV0ZVwiXG4gICAgICAgICAgICBbYXR0ci5kaXNhYmxlZF09XCJpc0Rpc2FibGVkQXR0cmlidXRlXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwiaXNDaGVja2VkXCJcbiAgICAgICAgICAgICNjaGVja2JveFxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlDaGVja2JveCBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxib29sZWFuPiB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jaGVja2JveFwiKVxuICAgIHB1YmxpYyBjaGVja2JveENsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG5hbWU6c3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY2hlY2tlZFwiKVxuICAgIHB1YmxpYyBpc0NoZWNrZWQ6Ym9vbGVhbjtcblxuICAgIEBPdXRwdXQoXCJjaGVja0NoYW5nZVwiKVxuICAgIHB1YmxpYyBvbkNoZWNrQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIEBPdXRwdXQoXCJ0b3VjaGVkXCIpXG4gICAgcHVibGljIG9uVG91Y2hlZDpFdmVudEVtaXR0ZXI8dm9pZD47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0Rpc2FibGVkOmJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5yZWFkLW9ubHlcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc1JlYWRvbmx5OmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IGNoZWNrZWRBdHRyaWJ1dGUoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0NoZWNrZWQgPyBcIlwiIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNEaXNhYmxlZEF0dHJpYnV0ZSgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChcImNoZWNrYm94XCIsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBfY2hlY2tib3hFbGVtZW50OkVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNoZWNrQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jaGVja2JveENsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbk1vdXNlRG93bihlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgcHVibGljIG9uQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQgJiYgIXRoaXMuaXNSZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNDaGVja2JveCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIpXG4gICAgcHVibGljIG9uRm9jdXNPdXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQuZW1pdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSAhdGhpcy5pc0NoZWNrZWQ7XG4gICAgICAgIHRoaXMub25DaGVja0NoYW5nZS5lbWl0KHRoaXMuaXNDaGVja2VkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpib29sZWFuKTp2b2lkIHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzQ2hlY2tib3goKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fY2hlY2tib3hFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jaGVja2JveFwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCIoY2hlY2tDaGFuZ2UpXCI6IFwib25DaGFuZ2UoJGV2ZW50KVwiLFxuICAgICAgICBcIih0b3VjaGVkKVwiOiBcIm9uVG91Y2hlZCgpXCJcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aUNoZWNrYm94VmFsdWVBY2Nlc3NvcildXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNoZWNrYm94VmFsdWVBY2Nlc3NvciBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgYm9vbGVhbixcbiAgICBTdWlDaGVja2JveFxuPiB7XG4gICAgY29uc3RydWN0b3IoaG9zdDpTdWlDaGVja2JveCkge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=