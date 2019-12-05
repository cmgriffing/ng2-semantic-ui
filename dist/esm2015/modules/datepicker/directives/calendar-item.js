import * as tslib_1 from "tslib";
import { Directive, HostBinding, HostListener, Input, EventEmitter, ChangeDetectorRef } from "@angular/core";
export class CalendarItem {
    constructor(date) {
        this.date = date;
    }
}
let SuiCalendarItem = class SuiCalendarItem {
    constructor(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.hasFocus = false;
        this.onFocussed = new EventEmitter();
    }
    get isSelectable() {
        return this.item.isSelectable;
    }
    get isActive() {
        return this.item.isActive;
    }
    get isToday() {
        return this.item.isToday;
    }
    onMouseMove() {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocussed.emit(this.hasFocus);
        }
    }
    onMouseLeave() {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    }
    detectChanges() {
        this._changeDetector.detectChanges();
    }
};
SuiCalendarItem.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
export { SuiCalendarItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixNQUFNLE9BQU8sWUFBWTtJQVNyQixZQUFZLElBQVM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBS0QsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQXdCeEIsWUFBc0IsZUFBaUM7UUFBakMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUNsRCxDQUFDO0lBdkJELElBQVcsWUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2xDLENBQUM7SUFHRCxJQUFXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFHRCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFjTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUdNLFlBQVk7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGFBQWE7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0osQ0FBQTs7WUF2QnlDLGlCQUFpQjs7QUF0QnZEO0lBREMsS0FBSyxDQUFDLGNBQWMsQ0FBQzs2Q0FDRztBQUd6QjtJQURDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzttREFHN0I7QUFHRDtJQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7K0NBRzNCO0FBR0Q7SUFEQyxXQUFXLENBQUMsYUFBYSxDQUFDOzhDQUcxQjtBQUdEO0lBREMsV0FBVyxDQUFDLGFBQWEsQ0FBQztpREFDSDtBQVd4QjtJQURDLFlBQVksQ0FBQyxXQUFXLENBQUM7a0RBTXpCO0FBR0Q7SUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDO21EQUkxQjtBQTFDUSxlQUFlO0lBSDNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7S0FDN0IsQ0FBQztHQUNXLGVBQWUsQ0ErQzNCO1NBL0NZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckl0ZW0ge1xuICAgIHB1YmxpYyBkYXRlOkRhdGU7XG4gICAgcHVibGljIGh1bWFuUmVhZGFibGU6c3RyaW5nO1xuICAgIHB1YmxpYyBpc0Rpc2FibGVkOmJvb2xlYW47XG4gICAgcHVibGljIGlzQWN0aXZlOmJvb2xlYW47XG4gICAgcHVibGljIGlzT3V0c2lkZVJhbmdlOmJvb2xlYW47XG4gICAgcHVibGljIGlzVG9kYXk6Ym9vbGVhbjtcbiAgICBwdWJsaWMgaXNTZWxlY3RhYmxlOmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRlOkRhdGUpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltjYWxlbmRhckl0ZW1dXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2FsZW5kYXJJdGVtIHtcbiAgICBASW5wdXQoXCJjYWxlbmRhckl0ZW1cIilcbiAgICBwdWJsaWMgaXRlbTpDYWxlbmRhckl0ZW07XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kaXNhYmxlZFwiKVxuICAgIHB1YmxpYyBnZXQgaXNTZWxlY3RhYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0uaXNTZWxlY3RhYmxlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS5pc0FjdGl2ZTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy50b2RheVwiKVxuICAgIHB1YmxpYyBnZXQgaXNUb2RheSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtLmlzVG9kYXk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZm9jdXNcIilcbiAgICBwdWJsaWMgaGFzRm9jdXM6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBvbkZvY3Vzc2VkOkV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub25Gb2N1c3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2Vtb3ZlXCIpXG4gICAgcHVibGljIG9uTW91c2VNb3ZlKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uRm9jdXNzZWQuZW1pdCh0aGlzLmhhc0ZvY3VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIpXG4gICAgcHVibGljIG9uTW91c2VMZWF2ZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25Gb2N1c3NlZC5lbWl0KHRoaXMuaGFzRm9jdXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXRlY3RDaGFuZ2VzKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG59XG4iXX0=