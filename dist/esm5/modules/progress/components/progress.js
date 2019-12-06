import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from "@angular/core";
var SuiProgress = /** @class */ (function () {
    function SuiProgress() {
        this.popupClasses = true;
        this.value = 0;
        this.maximum = 100;
        this.precision = 0;
        this._overrideSuccess = false;
        this.autoSuccess = true;
        this.showProgress = true;
        this.popupClasses = true;
    }
    Object.defineProperty(SuiProgress.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._value = converted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "maximum", {
        get: function () {
            return this._maximum;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._maximum = converted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "precision", {
        get: function () {
            return this._precision;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._precision = Math.min(Math.max(converted, 0), 20);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "reachedMaximum", {
        get: function () {
            return (this._overrideSuccess ||
                (this.value >= this.maximum && this.autoSuccess));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "percentage", {
        get: function () {
            var boundedValue = Math.min(Math.max(this.value, 0), this.maximum);
            var percentage = (boundedValue / this.maximum) * 100;
            return percentage.toFixed(this.precision);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "classValue", {
        set: function (classes) {
            if (classes.includes("attached") || classes.includes("tiny")) {
                this.showProgress = false;
            }
            if (classes.includes("success")) {
                this._overrideSuccess = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.progress")
    ], SuiProgress.prototype, "popupClasses", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiProgress.prototype, "autoSuccess", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiProgress.prototype, "showProgress", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiProgress.prototype, "value", null);
    tslib_1.__decorate([
        Input()
    ], SuiProgress.prototype, "maximum", null);
    tslib_1.__decorate([
        Input()
    ], SuiProgress.prototype, "precision", null);
    tslib_1.__decorate([
        HostBinding("class.success")
    ], SuiProgress.prototype, "reachedMaximum", null);
    tslib_1.__decorate([
        HostBinding("attr.data-percent")
    ], SuiProgress.prototype, "percentage", null);
    tslib_1.__decorate([
        Input("class")
    ], SuiProgress.prototype, "classValue", null);
    SuiProgress = tslib_1.__decorate([
        Component({
            selector: "sui-progress",
            template: "\n        <div class=\"bar\" [style.width.%]=\"percentage\">\n            <div class=\"progress\" *ngIf=\"showProgress\">{{ percentage }}%</div>\n        </div>\n        <div class=\"label\">\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: ["\n            .bar {\n                transition-duration: 300ms !important;\n                z-index: 1;\n            }\n        "]
        })
    ], SuiProgress);
    return SuiProgress;
}());
export { SuiProgress };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3Byb2dyZXNzL2NvbXBvbmVudHMvcHJvZ3Jlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXFCOUQ7SUE0Rkk7UUF6Rk8saUJBQVksR0FBVyxJQUFJLENBQUM7UUEwRi9CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBcEZELHNCQUFXLDhCQUFLO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFpQixLQUFZO1lBQ3pCLHVEQUF1RDtZQUN2RCxJQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUV6QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQzVCLENBQUM7OztPQVhBO0lBY0Qsc0JBQVcsZ0NBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQW1CLEtBQVk7WUFDM0IsdURBQXVEO1lBQ3ZELElBQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBRXpCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDekIsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BWEE7SUFjRCxzQkFBVyxrQ0FBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO2FBRUQsVUFBcUIsS0FBWTtZQUM3Qix1REFBdUQ7WUFDdkQsSUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN6QixPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7O09BWEE7SUFjRCxzQkFBVyx1Q0FBYzthQUF6QjtZQUNJLE9BQU8sQ0FDSCxJQUFJLENBQUMsZ0JBQWdCO2dCQUNyQixDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ25ELENBQUM7UUFDTixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLG1DQUFVO2FBQXJCO1lBQ0ksSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXJFLElBQU0sVUFBVSxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFdkQsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLG1DQUFVO2FBQXJCLFVBQXNCLE9BQWM7WUFDaEMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQzs7O09BQUE7SUF2RkQ7UUFGQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztxREFDSztJQVNuQztRQURDLEtBQUssRUFBRTtvREFDbUI7SUFHM0I7UUFEQyxLQUFLLEVBQUU7cURBQ29CO0lBRzVCO1FBREMsS0FBSyxFQUFFOzRDQUdQO0lBY0Q7UUFEQyxLQUFLLEVBQUU7OENBR1A7SUFjRDtRQURDLEtBQUssRUFBRTtnREFHUDtJQWNEO1FBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQztxREFNNUI7SUFHRDtRQURDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztpREFPaEM7SUFHRDtRQURDLEtBQUssQ0FBQyxPQUFPLENBQUM7aURBUWQ7SUExRlEsV0FBVztRQW5CdkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLDhQQU9UO3FCQUVHLG9JQUtDO1NBRVIsQ0FBQztPQUNXLFdBQVcsQ0F1R3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXZHWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktcHJvZ3Jlc3NcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwicGVyY2VudGFnZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCIgKm5nSWY9XCJzaG93UHJvZ3Jlc3NcIj57eyBwZXJjZW50YWdlIH19JTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC5iYXIge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDMwMG1zICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpUHJvZ3Jlc3Mge1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucHJvZ3Jlc3NcIilcbiAgICBwdWJsaWMgcG9wdXBDbGFzc2VzOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6bnVtYmVyO1xuICAgIHByaXZhdGUgX21heGltdW06bnVtYmVyO1xuICAgIHByaXZhdGUgX3ByZWNpc2lvbjpudW1iZXI7XG5cbiAgICBwcml2YXRlIF9vdmVycmlkZVN1Y2Nlc3M6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGF1dG9TdWNjZXNzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzaG93UHJvZ3Jlc3M6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOm51bWJlcikge1xuICAgICAgICAvLyBDb252ZXJ0IHZhbHVlIGZyb20gc3RyaW5nIHRvIG51bWJlciB3aGVyZSBuZWNlc3NhcnkuXG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9ICt2YWx1ZTtcblxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGNvbnZlcnRlZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gY29udmVydGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBtYXhpbXVtKCk6bnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heGltdW07XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBtYXhpbXVtKHZhbHVlOm51bWJlcikge1xuICAgICAgICAvLyBDb252ZXJ0IHZhbHVlIGZyb20gc3RyaW5nIHRvIG51bWJlciB3aGVyZSBuZWNlc3NhcnkuXG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9ICt2YWx1ZTtcblxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGNvbnZlcnRlZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21heGltdW0gPSBjb252ZXJ0ZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHByZWNpc2lvbigpOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVjaXNpb247XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBwcmVjaXNpb24odmFsdWU6bnVtYmVyKSB7XG4gICAgICAgIC8vIENvbnZlcnQgdmFsdWUgZnJvbSBzdHJpbmcgdG8gbnVtYmVyIHdoZXJlIG5lY2Vzc2FyeS5cbiAgICAgICAgY29uc3QgY29udmVydGVkID0gK3ZhbHVlO1xuXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oY29udmVydGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHJlY2lzaW9uID0gTWF0aC5taW4oTWF0aC5tYXgoY29udmVydGVkLCAwKSwgMjApO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnN1Y2Nlc3NcIilcbiAgICBwdWJsaWMgZ2V0IHJlYWNoZWRNYXhpbXVtKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9vdmVycmlkZVN1Y2Nlc3MgfHxcbiAgICAgICAgICAgICh0aGlzLnZhbHVlID49IHRoaXMubWF4aW11bSAmJiB0aGlzLmF1dG9TdWNjZXNzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIuZGF0YS1wZXJjZW50XCIpXG4gICAgcHVibGljIGdldCBwZXJjZW50YWdlKCk6c3RyaW5nIHtcbiAgICAgICAgY29uc3QgYm91bmRlZFZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgodGhpcy52YWx1ZSwgMCksIHRoaXMubWF4aW11bSk7XG5cbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChib3VuZGVkVmFsdWUgLyB0aGlzLm1heGltdW0pICogMTAwO1xuXG4gICAgICAgIHJldHVybiBwZXJjZW50YWdlLnRvRml4ZWQodGhpcy5wcmVjaXNpb24pO1xuICAgIH1cblxuICAgIEBJbnB1dChcImNsYXNzXCIpXG4gICAgcHVibGljIHNldCBjbGFzc1ZhbHVlKGNsYXNzZXM6c3RyaW5nKSB7XG4gICAgICAgIGlmIChjbGFzc2VzLmluY2x1ZGVzKFwiYXR0YWNoZWRcIikgfHwgY2xhc3Nlcy5pbmNsdWRlcyhcInRpbnlcIikpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsYXNzZXMuaW5jbHVkZXMoXCJzdWNjZXNzXCIpKSB7XG4gICAgICAgICAgICB0aGlzLl9vdmVycmlkZVN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xuICAgICAgICB0aGlzLm1heGltdW0gPSAxMDA7XG4gICAgICAgIHRoaXMucHJlY2lzaW9uID0gMDtcblxuICAgICAgICB0aGlzLl9vdmVycmlkZVN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRvU3VjY2VzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnBvcHVwQ2xhc3NlcyA9IHRydWU7XG4gICAgfVxufVxuIl19