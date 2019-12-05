import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { Util } from "../../../misc/util/helpers/util";
import { DateUtil, DatePrecision } from "../../../misc/util/helpers/date";
var CalendarRangeYearService = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarRangeYearService, _super);
    function CalendarRangeYearService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeYearService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = Util.String.padLeft(item.date.getFullYear().toString(), 4, "0");
        item.isOutsideRange =
            item.date.getFullYear() >=
                this.calcStart(baseDate).getFullYear() + 10;
    };
    return CalendarRangeYearService;
}(CalendarRangeService));
export { CalendarRangeYearService };
var SuiCalendarYearView = /** @class */ (function (_super) {
    tslib_1.__extends(SuiCalendarYearView, _super);
    function SuiCalendarYearView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Year, new CalendarRangeYearService(DatePrecision.Decade, 4, 3)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarYearView.prototype, "decadeStart", {
        get: function () {
            return DateUtil.startOf(DatePrecision.Decade, DateUtil.clone(this.service.currentDate)).getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarYearView.prototype.pad = function (year) {
        return Util.String.padLeft(year.toString(), 4, "0");
    };
    SuiCalendarYearView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarYearView = tslib_1.__decorate([
        Component({
            selector: "sui-calendar-year-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table three column year\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"3\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarYearView);
    return SuiCalendarYearView;
}(CalendarView));
export { SuiCalendarYearView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL3ZpZXdzL3llYXItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFO0lBQThDLG9EQUFvQjtJQUFsRTs7SUFXQSxDQUFDO0lBVlUsZ0RBQWEsR0FBcEIsVUFBcUIsSUFBaUIsRUFBRSxRQUFhO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQ2xDLENBQUMsRUFDRCxHQUFHLENBQ04sQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFDTCwrQkFBQztBQUFELENBQUMsQUFYRCxDQUE4QyxvQkFBb0IsR0FXakU7O0FBbUNEO0lBQXlDLCtDQUFZO0lBUWpELDZCQUFzQixTQUFtQjtRQUF6QyxZQUNJLGtCQUNJLFNBQVMsRUFDVCxnQkFBZ0IsQ0FBQyxJQUFJLEVBQ3JCLElBQUksd0JBQXdCLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzNELFNBQ0o7UUFOcUIsZUFBUyxHQUFULFNBQVMsQ0FBVTs7SUFNekMsQ0FBQztJQWJELHNCQUFXLDRDQUFXO2FBQXRCO1lBQ0ksT0FBTyxRQUFRLENBQUMsT0FBTyxDQUNuQixhQUFhLENBQUMsTUFBTSxFQUNwQixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQzNDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFVTSxpQ0FBRyxHQUFWLFVBQVcsSUFBVztRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Z0JBVitCLFNBQVM7O0lBUmhDLG1CQUFtQjtRQWpDL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsd2lDQTZCVDtTQUNKLENBQUM7T0FDVyxtQkFBbUIsQ0FtQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQW5CRCxDQUF5QyxZQUFZLEdBbUJwRDtTQW5CWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXcsIENhbGVuZGFyVmlld1R5cGUgfSBmcm9tIFwiLi9jYWxlbmRhci12aWV3XCI7XG5pbXBvcnQgeyBDYWxlbmRhckl0ZW0gfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9jYWxlbmRhci1pdGVtXCI7XG5pbXBvcnQgeyBDYWxlbmRhclJhbmdlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci1yYW5nZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcbmltcG9ydCB7IERhdGVVdGlsLCBEYXRlUHJlY2lzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUmFuZ2VZZWFyU2VydmljZSBleHRlbmRzIENhbGVuZGFyUmFuZ2VTZXJ2aWNlIHtcbiAgICBwdWJsaWMgY29uZmlndXJlSXRlbShpdGVtOkNhbGVuZGFySXRlbSwgYmFzZURhdGU6RGF0ZSk6dm9pZCB7XG4gICAgICAgIGl0ZW0uaHVtYW5SZWFkYWJsZSA9IFV0aWwuU3RyaW5nLnBhZExlZnQoXG4gICAgICAgICAgICBpdGVtLmRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgNCxcbiAgICAgICAgICAgIFwiMFwiXG4gICAgICAgICk7XG4gICAgICAgIGl0ZW0uaXNPdXRzaWRlUmFuZ2UgPVxuICAgICAgICAgICAgaXRlbS5kYXRlLmdldEZ1bGxZZWFyKCkgPj1cbiAgICAgICAgICAgIHRoaXMuY2FsY1N0YXJ0KGJhc2VEYXRlKS5nZXRGdWxsWWVhcigpICsgMTA7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2FsZW5kYXIteWVhci12aWV3XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICBjbGFzcz1cInVpIGNlbGxlZCBjZW50ZXIgYWxpZ25lZCB1bnN0YWNrYWJsZSB0YWJsZSB0aHJlZSBjb2x1bW4geWVhclwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN1aS1jYWxlbmRhci12aWV3LXRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jhbmdlc109XCJyYW5nZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh6b29tT3V0KT1cInpvb21PdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcGFkKGRlY2FkZVN0YXJ0KSB9fSAtIHt7IHBhZChkZWNhZGVTdGFydCArIDEwKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdWktY2FsZW5kYXItdmlldy10aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGdyb3VwIG9mIHJhbmdlcy5jdXJyZW50Lmdyb3VwZWRJdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FsZW5kYXJJdGVtXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldERhdGUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLmh1bWFuUmVhZGFibGUgfX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNhbGVuZGFyWWVhclZpZXcgZXh0ZW5kcyBDYWxlbmRhclZpZXcge1xuICAgIHB1YmxpYyBnZXQgZGVjYWRlU3RhcnQoKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gRGF0ZVV0aWwuc3RhcnRPZihcbiAgICAgICAgICAgIERhdGVQcmVjaXNpb24uRGVjYWRlLFxuICAgICAgICAgICAgRGF0ZVV0aWwuY2xvbmUodGhpcy5zZXJ2aWNlLmN1cnJlbnREYXRlKVxuICAgICAgICApLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBfcmVuZGVyZXIsXG4gICAgICAgICAgICBDYWxlbmRhclZpZXdUeXBlLlllYXIsXG4gICAgICAgICAgICBuZXcgQ2FsZW5kYXJSYW5nZVllYXJTZXJ2aWNlKERhdGVQcmVjaXNpb24uRGVjYWRlLCA0LCAzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYWQoeWVhcjpudW1iZXIpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBVdGlsLlN0cmluZy5wYWRMZWZ0KHllYXIudG9TdHJpbmcoKSwgNCwgXCIwXCIpO1xuICAgIH1cbn1cbiJdfQ==