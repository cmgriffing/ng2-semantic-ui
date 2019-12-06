import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from "@angular/core";
var SuiCalendarViewTitle = /** @class */ (function () {
    function SuiCalendarViewTitle() {
        this.onZoomOut = new EventEmitter();
    }
    tslib_1.__decorate([
        Input()
    ], SuiCalendarViewTitle.prototype, "ranges", void 0);
    tslib_1.__decorate([
        Output("zoomOut")
    ], SuiCalendarViewTitle.prototype, "onZoomOut", void 0);
    SuiCalendarViewTitle = tslib_1.__decorate([
        Component({
            selector: "sui-calendar-view-title",
            template: "\n<span class=\"title link\" (click)=\"onZoomOut.emit()\">\n    <ng-content></ng-content>\n</span>\n<span class=\"prev link\" [class.disabled]=\"!ranges?.canMovePrevious\" (click)=\"ranges?.movePrevious()\">\n    <i class=\"chevron left icon\"></i>\n</span>\n<span class=\"next link\" [class.disabled]=\"!ranges?.canMoveNext\" (click)=\"ranges?.moveNext()\">\n    <i class=\"chevron right icon\"></i>\n</span>\n",
            styles: ["\n.title.link {\n    display: inline-block;\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n"]
        })
    ], SuiCalendarViewTitle);
    return SuiCalendarViewTitle;
}());
export { SuiCalendarViewTitle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlldy10aXRsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9jb21wb25lbnRzL2NhbGVuZGFyLXZpZXctdGl0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF3QnZFO0lBUUk7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFDOUMsQ0FBQztJQVBEO1FBREMsS0FBSyxFQUFFO3dEQUMyQjtJQUduQztRQURDLE1BQU0sQ0FBQyxTQUFTLENBQUM7MkRBQ2tCO0lBTjNCLG9CQUFvQjtRQXJCaEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsNlpBVWI7cUJBQ1ksbUdBTVo7U0FDQSxDQUFDO09BQ1csb0JBQW9CLENBV2hDO0lBQUQsMkJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclJhbmdlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci1yYW5nZS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jYWxlbmRhci12aWV3LXRpdGxlXCIsXG4gICAgdGVtcGxhdGU6IGBcbjxzcGFuIGNsYXNzPVwidGl0bGUgbGlua1wiIChjbGljayk9XCJvblpvb21PdXQuZW1pdCgpXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9zcGFuPlxuPHNwYW4gY2xhc3M9XCJwcmV2IGxpbmtcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIXJhbmdlcz8uY2FuTW92ZVByZXZpb3VzXCIgKGNsaWNrKT1cInJhbmdlcz8ubW92ZVByZXZpb3VzKClcIj5cbiAgICA8aSBjbGFzcz1cImNoZXZyb24gbGVmdCBpY29uXCI+PC9pPlxuPC9zcGFuPlxuPHNwYW4gY2xhc3M9XCJuZXh0IGxpbmtcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIXJhbmdlcz8uY2FuTW92ZU5leHRcIiAoY2xpY2spPVwicmFuZ2VzPy5tb3ZlTmV4dCgpXCI+XG4gICAgPGkgY2xhc3M9XCJjaGV2cm9uIHJpZ2h0IGljb25cIj48L2k+XG48L3NwYW4+XG5gLFxuICAgIHN0eWxlczogW2Bcbi50aXRsZS5saW5rIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luLWxlZnQ6IDJyZW07XG4gICAgbWFyZ2luLXJpZ2h0OiAycmVtO1xufVxuYF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2FsZW5kYXJWaWV3VGl0bGUge1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcmFuZ2VzOkNhbGVuZGFyUmFuZ2VTZXJ2aWNlO1xuXG4gICAgQE91dHB1dChcInpvb21PdXRcIilcbiAgICBwdWJsaWMgb25ab29tT3V0OkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uWm9vbU91dCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICB9XG59XG4iXX0=