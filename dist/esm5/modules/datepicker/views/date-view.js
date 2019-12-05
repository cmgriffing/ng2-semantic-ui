import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { DateUtil, DatePrecision } from "../../../misc/util/helpers/date";
var CalendarRangeDateService = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarRangeDateService, _super);
    function CalendarRangeDateService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeDateService.prototype.calcStart = function (start) {
        var monthStart = DateUtil.startOf(DatePrecision.Month, DateUtil.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.service.firstDayOfWeek - 7) % 7);
        return monthStart;
    };
    CalendarRangeDateService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = item.date.getDate().toString();
        item.isOutsideRange = item.date.getMonth() !== baseDate.getMonth();
        item.isSelectable = item.isDisabled;
    };
    return CalendarRangeDateService;
}(CalendarRangeService));
export { CalendarRangeDateService };
var SuiCalendarDateView = /** @class */ (function (_super) {
    tslib_1.__extends(SuiCalendarDateView, _super);
    function SuiCalendarDateView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Date, new CalendarRangeDateService(DatePrecision.Month, 6, 7)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarDateView.prototype, "days", {
        get: function () {
            var _this = this;
            var days = this.service.localeValues.weekdaysNarrow;
            return days.map(function (d, i) {
                return days[(i + _this.service.firstDayOfWeek) % days.length];
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarDateView.prototype, "date", {
        get: function () {
            return new DateParser(this.service.localeValues.formats.month, this.service.localeValues).format(this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarDateView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarDateView = tslib_1.__decorate([
        Component({
            selector: "sui-calendar-date-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table seven column day\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"7\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ date }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n                <tr>\n                    <th *ngFor=\"let day of days\">{{ day }}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarDateView);
    return SuiCalendarDateView;
}(CalendarView));
export { SuiCalendarDateView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL3ZpZXdzL2RhdGUtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckQsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFO0lBQThDLG9EQUFvQjtJQUFsRTs7SUFpQkEsQ0FBQztJQWhCVSw0Q0FBUyxHQUFoQixVQUFpQixLQUFVO1FBQ3ZCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQy9CLGFBQWEsQ0FBQyxLQUFLLEVBQ25CLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQ3hCLENBQUM7UUFDRixVQUFVLENBQUMsT0FBTyxDQUNkLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ2xFLENBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRU0sZ0RBQWEsR0FBcEIsVUFBcUIsSUFBaUIsRUFBRSxRQUFhO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0wsK0JBQUM7QUFBRCxDQUFDLEFBakJELENBQThDLG9CQUFvQixHQWlCakU7O0FBc0NEO0lBQXlDLCtDQUFZO0lBZ0JqRCw2QkFBc0IsU0FBbUI7UUFBekMsWUFDSSxrQkFDSSxTQUFTLEVBQ1QsZ0JBQWdCLENBQUMsSUFBSSxFQUNyQixJQUFJLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUMxRCxTQUNKO1FBTnFCLGVBQVMsR0FBVCxTQUFTLENBQVU7O0lBTXpDLENBQUM7SUFyQkQsc0JBQVcscUNBQUk7YUFBZjtZQUFBLGlCQU1DO1lBTEcsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDWCxVQUFDLENBQUMsRUFBRSxDQUFRO2dCQUNSLE9BQUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFyRCxDQUFxRCxDQUM1RCxDQUFDO1FBQ04sQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLFVBQVUsQ0FDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQzVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTs7Z0JBRStCLFNBQVM7O0lBaEJoQyxtQkFBbUI7UUFwQy9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsUUFBUSxFQUFFLDZtQ0FnQ1Q7U0FDSixDQUFDO09BQ1csbUJBQW1CLENBdUIvQjtJQUFELDBCQUFDO0NBQUEsQUF2QkQsQ0FBeUMsWUFBWSxHQXVCcEQ7U0F2QlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBDYWxlbmRhckl0ZW0gfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9jYWxlbmRhci1pdGVtXCI7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXcsIENhbGVuZGFyVmlld1R5cGUgfSBmcm9tIFwiLi9jYWxlbmRhci12aWV3XCI7XG5pbXBvcnQgeyBDYWxlbmRhclJhbmdlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci1yYW5nZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRlUGFyc2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvZGF0ZS1wYXJzZXJcIjtcbmltcG9ydCB7IERhdGVVdGlsLCBEYXRlUHJlY2lzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUmFuZ2VEYXRlU2VydmljZSBleHRlbmRzIENhbGVuZGFyUmFuZ2VTZXJ2aWNlIHtcbiAgICBwdWJsaWMgY2FsY1N0YXJ0KHN0YXJ0OkRhdGUpOkRhdGUge1xuICAgICAgICBjb25zdCBtb250aFN0YXJ0ID0gRGF0ZVV0aWwuc3RhcnRPZihcbiAgICAgICAgICAgIERhdGVQcmVjaXNpb24uTW9udGgsXG4gICAgICAgICAgICBEYXRlVXRpbC5jbG9uZShzdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgbW9udGhTdGFydC5zZXREYXRlKFxuICAgICAgICAgICAgKDEgLSBtb250aFN0YXJ0LmdldERheSgpICsgdGhpcy5zZXJ2aWNlLmZpcnN0RGF5T2ZXZWVrIC0gNykgJSA3XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBtb250aFN0YXJ0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25maWd1cmVJdGVtKGl0ZW06Q2FsZW5kYXJJdGVtLCBiYXNlRGF0ZTpEYXRlKTp2b2lkIHtcbiAgICAgICAgaXRlbS5odW1hblJlYWRhYmxlID0gaXRlbS5kYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICBpdGVtLmlzT3V0c2lkZVJhbmdlID0gaXRlbS5kYXRlLmdldE1vbnRoKCkgIT09IGJhc2VEYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIGl0ZW0uaXNTZWxlY3RhYmxlID0gaXRlbS5pc0Rpc2FibGVkO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLWNhbGVuZGFyLWRhdGUtdmlld1wiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx0YWJsZVxuICAgICAgICAgICAgY2xhc3M9XCJ1aSBjZWxsZWQgY2VudGVyIGFsaWduZWQgdW5zdGFja2FibGUgdGFibGUgc2V2ZW4gY29sdW1uIGRheVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiN1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN1aS1jYWxlbmRhci12aWV3LXRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jhbmdlc109XCJyYW5nZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh6b29tT3V0KT1cInpvb21PdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZGF0ZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdWktY2FsZW5kYXItdmlldy10aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c1wiPnt7IGRheSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBncm91cCBvZiByYW5nZXMuY3VycmVudC5ncm91cGVkSXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbGVuZGFySXRlbV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZXREYXRlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS5odW1hblJlYWRhYmxlIH19XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlDYWxlbmRhckRhdGVWaWV3IGV4dGVuZHMgQ2FsZW5kYXJWaWV3IHtcbiAgICBwdWJsaWMgZ2V0IGRheXMoKTpzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IGRheXMgPSB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLndlZWtkYXlzTmFycm93O1xuICAgICAgICByZXR1cm4gZGF5cy5tYXAoXG4gICAgICAgICAgICAoZCwgaTpudW1iZXIpID0+XG4gICAgICAgICAgICAgICAgZGF5c1soaSArIHRoaXMuc2VydmljZS5maXJzdERheU9mV2VlaykgJSBkYXlzLmxlbmd0aF1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGRhdGUoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gbmV3IERhdGVQYXJzZXIoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMubW9udGgsXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzXG4gICAgICAgICkuZm9ybWF0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgX3JlbmRlcmVyLFxuICAgICAgICAgICAgQ2FsZW5kYXJWaWV3VHlwZS5EYXRlLFxuICAgICAgICAgICAgbmV3IENhbGVuZGFyUmFuZ2VEYXRlU2VydmljZShEYXRlUHJlY2lzaW9uLk1vbnRoLCA2LCA3KVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==