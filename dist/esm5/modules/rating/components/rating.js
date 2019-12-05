import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
var SuiRating = /** @class */ (function () {
    function SuiRating() {
        this.hoveredIndex = -1;
        this.value = 0;
        this.valueChange = new EventEmitter();
        this.maximum = 5;
        this.isReadonly = false;
        this.ratingClasses = true;
    }
    Object.defineProperty(SuiRating.prototype, "maximum", {
        get: function () {
            return this._maximum;
        },
        set: function (value) {
            this._maximum = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiRating.prototype, "icons", {
        get: function () {
            // tslint:disable-next-line:prefer-literal
            return new Array(this.maximum);
        },
        enumerable: true,
        configurable: true
    });
    SuiRating.prototype.onClick = function (i) {
        if (!this.isReadonly) {
            this.value = i + 1;
            this.valueChange.emit(this.value);
        }
    };
    SuiRating.prototype.onMouseover = function (i) {
        this.hoveredIndex = i;
    };
    SuiRating.prototype.onMouseout = function () {
        this.hoveredIndex = -1;
    };
    SuiRating.prototype.writeValue = function (value) {
        this.value = value;
    };
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.rating")
    ], SuiRating.prototype, "ratingClasses", void 0);
    tslib_1.__decorate([
        Output()
    ], SuiRating.prototype, "valueChange", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiRating.prototype, "maximum", null);
    tslib_1.__decorate([
        HostBinding("class.read-only"),
        Input()
    ], SuiRating.prototype, "isReadonly", void 0);
    tslib_1.__decorate([
        HostListener("mouseout")
    ], SuiRating.prototype, "onMouseout", null);
    SuiRating = tslib_1.__decorate([
        Component({
            selector: "sui-rating",
            template: "\n        <i\n            class=\"icon\"\n            *ngFor=\"let icon of icons; let i = index\"\n            (mouseover)=\"onMouseover(i)\"\n            (click)=\"onClick(i)\"\n            [class.selected]=\"hoveredIndex >= i && !isReadonly\"\n            [class.active]=\"value > i\"\n        >\n        </i>\n    ",
            styles: ["\n            :host.read-only .icon {\n                cursor: auto;\n            }\n        "]
        })
    ], SuiRating);
    return SuiRating;
}());
export { SuiRating };
var SuiRatingValueAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(SuiRatingValueAccessor, _super);
    function SuiRatingValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiRatingValueAccessor_1 = SuiRatingValueAccessor;
    var SuiRatingValueAccessor_1;
    SuiRatingValueAccessor.ctorParameters = function () { return [
        { type: SuiRating }
    ]; };
    SuiRatingValueAccessor = SuiRatingValueAccessor_1 = tslib_1.__decorate([
        Directive({
            selector: "sui-rating",
            host: { "(valueChange)": "onChange($event)" },
            providers: [customValueAccessorFactory(SuiRatingValueAccessor_1)]
        })
    ], SuiRatingValueAccessor);
    return SuiRatingValueAccessor;
}(CustomValueAccessor));
export { SuiRatingValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9yYXRpbmcvY29tcG9uZW50cy9yYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILDBCQUEwQixFQUMxQixtQkFBbUIsRUFFdEIsTUFBTSxrREFBa0QsQ0FBQztBQXVCMUQ7SUFnQ0k7UUFGTyxpQkFBWSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTlDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUEzQkQsc0JBQVcsOEJBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQW1CLEtBQVk7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FKQTtJQVVELHNCQUFXLDRCQUFLO2FBQWhCO1lBQ0ksMENBQTBDO1lBQzFDLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBY00sMkJBQU8sR0FBZCxVQUFlLENBQVE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFTSwrQkFBVyxHQUFsQixVQUFtQixDQUFRO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFHTSw4QkFBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLDhCQUFVLEdBQWpCLFVBQWtCLEtBQVk7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQXpERDtRQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkIsV0FBVyxDQUFDLGNBQWMsQ0FBQztvREFDQztJQUs3QjtRQURDLE1BQU0sRUFBRTtrREFDK0I7SUFLeEM7UUFEQyxLQUFLLEVBQUU7NENBR1A7SUFRRDtRQUZDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QixLQUFLLEVBQUU7aURBQ2tCO0lBK0IxQjtRQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7K0NBR3hCO0lBeERRLFNBQVM7UUFyQnJCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSwrVEFVVDtxQkFFRywrRkFJQztTQUVSLENBQUM7T0FDVyxTQUFTLENBNkRyQjtJQUFELGdCQUFDO0NBQUEsQUE3REQsSUE2REM7U0E3RFksU0FBUztBQW9FdEI7SUFBNEMsa0RBRzNDO0lBQ0csZ0NBQVksSUFBYztlQUN0QixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDOytCQU5RLHNCQUFzQjs7O2dCQUlkLFNBQVM7O0lBSmpCLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixJQUFJLEVBQUUsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUU7WUFDN0MsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUMsd0JBQXNCLENBQUMsQ0FBQztTQUNsRSxDQUFDO09BQ1csc0JBQXNCLENBT2xDO0lBQUQsNkJBQUM7Q0FBQSxBQVBELENBQTRDLG1CQUFtQixHQU85RDtTQVBZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEhvc3RMaXN0ZW5lclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeSxcbiAgICBDdXN0b21WYWx1ZUFjY2Vzc29yLFxuICAgIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdFxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvY3VzdG9tLXZhbHVlLWFjY2Vzc29yXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1yYXRpbmdcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aVxuICAgICAgICAgICAgY2xhc3M9XCJpY29uXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpY29uIG9mIGljb25zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZW92ZXIoaSlcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soaSlcIlxuICAgICAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cImhvdmVyZWRJbmRleCA+PSBpICYmICFpc1JlYWRvbmx5XCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidmFsdWUgPiBpXCJcbiAgICAgICAgPlxuICAgICAgICA8L2k+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3QucmVhZC1vbmx5IC5pY29uIHtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVJhdGluZyBpbXBsZW1lbnRzIElDdXN0b21WYWx1ZUFjY2Vzc29ySG9zdDxudW1iZXI+IHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJhdGluZ1wiKVxuICAgIHB1YmxpYyByYXRpbmdDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgdmFsdWU6bnVtYmVyO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHZhbHVlQ2hhbmdlOkV2ZW50RW1pdHRlcjxudW1iZXI+O1xuXG4gICAgcHJpdmF0ZSBfbWF4aW11bTpudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgbWF4aW11bSgpOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhpbXVtO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbWF4aW11bSh2YWx1ZTpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWF4aW11bSA9ICt2YWx1ZTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5yZWFkLW9ubHlcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc1JlYWRvbmx5OmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IGljb25zKCk6dW5kZWZpbmVkW10ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWxpdGVyYWxcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheSh0aGlzLm1heGltdW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBob3ZlcmVkSW5kZXg6bnVtYmVyID0gLTE7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgICAgICB0aGlzLm1heGltdW0gPSA1O1xuICAgICAgICB0aGlzLmlzUmVhZG9ubHkgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnJhdGluZ0NsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKGk6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBpICsgMTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk1vdXNlb3ZlcihpOm51bWJlcik6dm9pZCB7XG4gICAgICAgIHRoaXMuaG92ZXJlZEluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2VvdXRcIilcbiAgICBwdWJsaWMgb25Nb3VzZW91dCgpOnZvaWQge1xuICAgICAgICB0aGlzLmhvdmVyZWRJbmRleCA9IC0xO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOm51bWJlcik6dm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1yYXRpbmdcIixcbiAgICBob3N0OiB7IFwiKHZhbHVlQ2hhbmdlKVwiOiBcIm9uQ2hhbmdlKCRldmVudClcIiB9LFxuICAgIHByb3ZpZGVyczogW2N1c3RvbVZhbHVlQWNjZXNzb3JGYWN0b3J5KFN1aVJhdGluZ1ZhbHVlQWNjZXNzb3IpXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlSYXRpbmdWYWx1ZUFjY2Vzc29yIGV4dGVuZHMgQ3VzdG9tVmFsdWVBY2Nlc3NvcjxcbiAgICBudW1iZXIsXG4gICAgU3VpUmF0aW5nXG4+IHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0OlN1aVJhdGluZykge1xuICAgICAgICBzdXBlcihob3N0KTtcbiAgICB9XG59XG4iXX0=