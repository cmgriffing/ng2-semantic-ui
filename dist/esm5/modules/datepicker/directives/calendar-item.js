import * as tslib_1 from "tslib";
import { Directive, HostBinding, HostListener, Input, EventEmitter, ChangeDetectorRef } from "@angular/core";
var CalendarItem = /** @class */ (function () {
    function CalendarItem(date) {
        this.date = date;
    }
    return CalendarItem;
}());
export { CalendarItem };
var SuiCalendarItem = /** @class */ (function () {
    function SuiCalendarItem(changeDetector) {
        this.changeDetector = changeDetector;
        this.hasFocus = false;
        this.onFocussed = new EventEmitter();
    }
    Object.defineProperty(SuiCalendarItem.prototype, "isSelectable", {
        get: function () {
            return this.item.isSelectable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarItem.prototype, "isActive", {
        get: function () {
            return this.item.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarItem.prototype, "isToday", {
        get: function () {
            return this.item.isToday;
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarItem.prototype.onMouseMove = function () {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocussed.emit(this.hasFocus);
        }
    };
    SuiCalendarItem.prototype.onMouseLeave = function () {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    };
    SuiCalendarItem.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        Input("calendarItem")
    ], SuiCalendarItem.prototype, "item", void 0);
    tslib_1.__decorate([
        HostBinding("class.disabled")
    ], SuiCalendarItem.prototype, "isSelectable", null);
    tslib_1.__decorate([
        HostBinding("class.active")
    ], SuiCalendarItem.prototype, "isActive", null);
    tslib_1.__decorate([
        HostBinding("class.today")
    ], SuiCalendarItem.prototype, "isToday", null);
    tslib_1.__decorate([
        HostBinding("class.focus")
    ], SuiCalendarItem.prototype, "hasFocus", void 0);
    tslib_1.__decorate([
        HostListener("mousemove")
    ], SuiCalendarItem.prototype, "onMouseMove", null);
    tslib_1.__decorate([
        HostListener("mouseleave")
    ], SuiCalendarItem.prototype, "onMouseLeave", null);
    SuiCalendarItem = tslib_1.__decorate([
        Directive({
            selector: "[calendarItem]"
        })
    ], SuiCalendarItem);
    return SuiCalendarItem;
}());
export { SuiCalendarItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdHO0lBU0ksc0JBQVksSUFBUztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7QUFLRDtJQXdCSSx5QkFBbUIsY0FBZ0M7UUFBaEMsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUNsRCxDQUFDO0lBdkJELHNCQUFXLHlDQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLHFDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLG9DQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQWNNLHFDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUdNLHNDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dCQWxCaUMsaUJBQWlCOztJQXRCbkQ7UUFEQyxLQUFLLENBQUMsY0FBYyxDQUFDO2lEQUNHO0lBR3pCO1FBREMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO3VEQUc3QjtJQUdEO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzttREFHM0I7SUFHRDtRQURDLFdBQVcsQ0FBQyxhQUFhLENBQUM7a0RBRzFCO0lBR0Q7UUFEQyxXQUFXLENBQUMsYUFBYSxDQUFDO3FEQUNIO0lBV3hCO1FBREMsWUFBWSxDQUFDLFdBQVcsQ0FBQztzREFNekI7SUFHRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7dURBSTFCO0lBMUNRLGVBQWU7UUFIM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtTQUM3QixDQUFDO09BQ1csZUFBZSxDQTJDM0I7SUFBRCxzQkFBQztDQUFBLEFBM0NELElBMkNDO1NBM0NZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJJdGVtIHtcbiAgICBwdWJsaWMgZGF0ZTpEYXRlO1xuICAgIHB1YmxpYyBodW1hblJlYWRhYmxlOnN0cmluZztcbiAgICBwdWJsaWMgaXNEaXNhYmxlZDpib29sZWFuO1xuICAgIHB1YmxpYyBpc0FjdGl2ZTpib29sZWFuO1xuICAgIHB1YmxpYyBpc091dHNpZGVSYW5nZTpib29sZWFuO1xuICAgIHB1YmxpYyBpc1RvZGF5OmJvb2xlYW47XG4gICAgcHVibGljIGlzU2VsZWN0YWJsZTpib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoZGF0ZTpEYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbY2FsZW5kYXJJdGVtXVwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNhbGVuZGFySXRlbSB7XG4gICAgQElucHV0KFwiY2FsZW5kYXJJdGVtXCIpXG4gICAgcHVibGljIGl0ZW06Q2FsZW5kYXJJdGVtO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZGlzYWJsZWRcIilcbiAgICBwdWJsaWMgZ2V0IGlzU2VsZWN0YWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLmlzU2VsZWN0YWJsZTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5hY3RpdmVcIilcbiAgICBwdWJsaWMgZ2V0IGlzQWN0aXZlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0uaXNBY3RpdmU7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudG9kYXlcIilcbiAgICBwdWJsaWMgZ2V0IGlzVG9kYXkoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS5pc1RvZGF5O1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmZvY3VzXCIpXG4gICAgcHVibGljIGhhc0ZvY3VzOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgb25Gb2N1c3NlZDpFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub25Gb2N1c3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2Vtb3ZlXCIpXG4gICAgcHVibGljIG9uTW91c2VNb3ZlKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uRm9jdXNzZWQuZW1pdCh0aGlzLmhhc0ZvY3VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIpXG4gICAgcHVibGljIG9uTW91c2VMZWF2ZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25Gb2N1c3NlZC5lbWl0KHRoaXMuaGFzRm9jdXMpO1xuICAgIH1cbn1cbiJdfQ==