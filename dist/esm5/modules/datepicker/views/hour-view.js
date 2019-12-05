import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { DatePrecision } from "../../../misc/util/helpers/date";
var CalendarRangeHourService = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarRangeHourService, _super);
    function CalendarRangeHourService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeHourService.prototype.configureItem = function (item, baseDate) {
        // Set minutes and seconds to 0
        var customFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
        item.humanReadable = new DateParser(customFormat, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    };
    return CalendarRangeHourService;
}(CalendarRangeService));
export { CalendarRangeHourService };
var SuiCalendarHourView = /** @class */ (function (_super) {
    tslib_1.__extends(SuiCalendarHourView, _super);
    function SuiCalendarHourView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Hour, new CalendarRangeHourService(DatePrecision.Date, 6, 4)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarHourView.prototype, "date", {
        get: function () {
            return new DateParser(this.service.localeValues.formats.date, this.service.localeValues).format(this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarHourView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarHourView = tslib_1.__decorate([
        Component({
            selector: "sui-calendar-hour-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table four column hour\"\n        >\n            <thead *ngIf=\"service.config.mode != 1\">\n                <tr>\n                    <th colspan=\"4\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ date }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarHourView);
    return SuiCalendarHourView;
}(CalendarView));
export { SuiCalendarHourView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL3ZpZXdzL2hvdXItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFaEU7SUFBOEMsb0RBQW9CO0lBQWxFOztJQWFBLENBQUM7SUFaVSxnREFBYSxHQUFwQixVQUFxQixJQUFpQixFQUFFLFFBQWE7UUFDakQsK0JBQStCO1FBQy9CLElBQU0sWUFBWSxHQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUN0RSxPQUFPLEVBQ1AsR0FBRyxDQUNOLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUMvQixZQUFZLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQzVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBQ0wsK0JBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBOEMsb0JBQW9CLEdBYWpFOztBQW1DRDtJQUF5QywrQ0FBWTtJQVFqRCw2QkFBc0IsU0FBbUI7UUFBekMsWUFDSSxrQkFDSSxTQUFTLEVBQ1QsZ0JBQWdCLENBQUMsSUFBSSxFQUNyQixJQUFJLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUN6RCxTQUNKO1FBTnFCLGVBQVMsR0FBVCxTQUFTLENBQVU7O0lBTXpDLENBQUM7SUFiRCxzQkFBVyxxQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLFVBQVUsQ0FDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQzVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTs7Z0JBRStCLFNBQVM7O0lBUmhDLG1CQUFtQjtRQWpDL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsZ2lDQTZCVDtTQUNKLENBQUM7T0FDVyxtQkFBbUIsQ0FlL0I7SUFBRCwwQkFBQztDQUFBLEFBZkQsQ0FBeUMsWUFBWSxHQWVwRDtTQWZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENhbGVuZGFyVmlldywgQ2FsZW5kYXJWaWV3VHlwZSB9IGZyb20gXCIuL2NhbGVuZGFyLXZpZXdcIjtcbmltcG9ydCB7IENhbGVuZGFySXRlbSB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW1cIjtcbmltcG9ydCB7IENhbGVuZGFyUmFuZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NhbGVuZGFyLXJhbmdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGVQYXJzZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy9kYXRlLXBhcnNlclwiO1xuaW1wb3J0IHsgRGF0ZVByZWNpc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9kYXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclJhbmdlSG91clNlcnZpY2UgZXh0ZW5kcyBDYWxlbmRhclJhbmdlU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyZUl0ZW0oaXRlbTpDYWxlbmRhckl0ZW0sIGJhc2VEYXRlOkRhdGUpOnZvaWQge1xuICAgICAgICAvLyBTZXQgbWludXRlcyBhbmQgc2Vjb25kcyB0byAwXG4gICAgICAgIGNvbnN0IGN1c3RvbUZvcm1hdDpzdHJpbmcgPSB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMudGltZS5yZXBsYWNlKFxuICAgICAgICAgICAgL1ttc10vZyxcbiAgICAgICAgICAgIFwiMFwiXG4gICAgICAgICk7XG4gICAgICAgIGl0ZW0uaHVtYW5SZWFkYWJsZSA9IG5ldyBEYXRlUGFyc2VyKFxuICAgICAgICAgICAgY3VzdG9tRm9ybWF0LFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlc1xuICAgICAgICApLmZvcm1hdChpdGVtLmRhdGUpO1xuICAgICAgICBpdGVtLmlzT3V0c2lkZVJhbmdlID0gZmFsc2U7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2FsZW5kYXItaG91ci12aWV3XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICBjbGFzcz1cInVpIGNlbGxlZCBjZW50ZXIgYWxpZ25lZCB1bnN0YWNrYWJsZSB0YWJsZSBmb3VyIGNvbHVtbiBob3VyXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHRoZWFkICpuZ0lmPVwic2VydmljZS5jb25maWcubW9kZSAhPSAxXCI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggY29sc3Bhbj1cIjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdWktY2FsZW5kYXItdmlldy10aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyYW5nZXNdPVwicmFuZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoem9vbU91dCk9XCJ6b29tT3V0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGRhdGUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3VpLWNhbGVuZGFyLXZpZXctdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBncm91cCBvZiByYW5nZXMuY3VycmVudC5ncm91cGVkSXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbGVuZGFySXRlbV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZXREYXRlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS5odW1hblJlYWRhYmxlIH19XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlDYWxlbmRhckhvdXJWaWV3IGV4dGVuZHMgQ2FsZW5kYXJWaWV3IHtcbiAgICBwdWJsaWMgZ2V0IGRhdGUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gbmV3IERhdGVQYXJzZXIoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMuZGF0ZSxcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXNcbiAgICAgICAgKS5mb3JtYXQodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBfcmVuZGVyZXIsXG4gICAgICAgICAgICBDYWxlbmRhclZpZXdUeXBlLkhvdXIsXG4gICAgICAgICAgICBuZXcgQ2FsZW5kYXJSYW5nZUhvdXJTZXJ2aWNlKERhdGVQcmVjaXNpb24uRGF0ZSwgNiwgNClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=