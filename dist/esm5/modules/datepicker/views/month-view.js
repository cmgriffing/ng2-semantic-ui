import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { DatePrecision } from "../../../misc/util/helpers/date";
var CalendarRangeMonthService = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarRangeMonthService, _super);
    function CalendarRangeMonthService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeMonthService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = this.service.localeValues.monthsShort[item.date.getMonth()];
        item.isOutsideRange = false;
    };
    return CalendarRangeMonthService;
}(CalendarRangeService));
export { CalendarRangeMonthService };
var SuiCalendarMonthView = /** @class */ (function (_super) {
    tslib_1.__extends(SuiCalendarMonthView, _super);
    function SuiCalendarMonthView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Month, new CalendarRangeMonthService(DatePrecision.Year, 4, 3)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarMonthView.prototype, "year", {
        get: function () {
            return new DateParser(this.service.localeValues.formats.year, this.service.localeValues).format(this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarMonthView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarMonthView = tslib_1.__decorate([
        Component({
            selector: "sui-calendar-month-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table three column month\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"3\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ year }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarMonthView);
    return SuiCalendarMonthView;
}(CalendarView));
export { SuiCalendarMonthView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci92aWV3cy9tb250aC12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVoRTtJQUErQyxxREFBb0I7SUFBbkU7O0lBT0EsQ0FBQztJQU5VLGlEQUFhLEdBQXBCLFVBQXFCLElBQWlCLEVBQUUsUUFBYTtRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxnQ0FBQztBQUFELENBQUMsQUFQRCxDQUErQyxvQkFBb0IsR0FPbEU7O0FBbUNEO0lBQTBDLGdEQUFZO0lBUWxELDhCQUFzQixTQUFtQjtRQUF6QyxZQUNJLGtCQUNJLFNBQVMsRUFDVCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQ3RCLElBQUkseUJBQXlCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzFELFNBQ0o7UUFOcUIsZUFBUyxHQUFULFNBQVMsQ0FBVTs7SUFNekMsQ0FBQztJQWJELHNCQUFXLHNDQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksVUFBVSxDQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDNUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUM7OztPQUFBOztnQkFFK0IsU0FBUzs7SUFSaEMsb0JBQW9CO1FBakNoQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSwrL0JBNkJUO1NBQ0osQ0FBQztPQUNXLG9CQUFvQixDQWVoQztJQUFELDJCQUFDO0NBQUEsQUFmRCxDQUEwQyxZQUFZLEdBZXJEO1NBZlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJWaWV3LCBDYWxlbmRhclZpZXdUeXBlIH0gZnJvbSBcIi4vY2FsZW5kYXItdmlld1wiO1xuaW1wb3J0IHsgQ2FsZW5kYXJJdGVtIH0gZnJvbSBcIi4uL2RpcmVjdGl2ZXMvY2FsZW5kYXItaXRlbVwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJSYW5nZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvY2FsZW5kYXItcmFuZ2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgRGF0ZVBhcnNlciB9IGZyb20gXCIuLi9jbGFzc2VzL2RhdGUtcGFyc2VyXCI7XG5pbXBvcnQgeyBEYXRlUHJlY2lzaW9uIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUmFuZ2VNb250aFNlcnZpY2UgZXh0ZW5kcyBDYWxlbmRhclJhbmdlU2VydmljZSB7XG4gICAgcHVibGljIGNvbmZpZ3VyZUl0ZW0oaXRlbTpDYWxlbmRhckl0ZW0sIGJhc2VEYXRlOkRhdGUpOnZvaWQge1xuICAgICAgICBpdGVtLmh1bWFuUmVhZGFibGUgPSB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLm1vbnRoc1Nob3J0W1xuICAgICAgICAgICAgaXRlbS5kYXRlLmdldE1vbnRoKClcbiAgICAgICAgXTtcbiAgICAgICAgaXRlbS5pc091dHNpZGVSYW5nZSA9IGZhbHNlO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLWNhbGVuZGFyLW1vbnRoLXZpZXdcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dGFibGVcbiAgICAgICAgICAgIGNsYXNzPVwidWkgY2VsbGVkIGNlbnRlciBhbGlnbmVkIHVuc3RhY2thYmxlIHRhYmxlIHRocmVlIGNvbHVtbiBtb250aFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN1aS1jYWxlbmRhci12aWV3LXRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jhbmdlc109XCJyYW5nZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh6b29tT3V0KT1cInpvb21PdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgeWVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdWktY2FsZW5kYXItdmlldy10aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGdyb3VwIG9mIHJhbmdlcy5jdXJyZW50Lmdyb3VwZWRJdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FsZW5kYXJJdGVtXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldERhdGUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLmh1bWFuUmVhZGFibGUgfX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNhbGVuZGFyTW9udGhWaWV3IGV4dGVuZHMgQ2FsZW5kYXJWaWV3IHtcbiAgICBwdWJsaWMgZ2V0IHllYXIoKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gbmV3IERhdGVQYXJzZXIoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMueWVhcixcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXNcbiAgICAgICAgKS5mb3JtYXQodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBfcmVuZGVyZXIsXG4gICAgICAgICAgICBDYWxlbmRhclZpZXdUeXBlLk1vbnRoLFxuICAgICAgICAgICAgbmV3IENhbGVuZGFyUmFuZ2VNb250aFNlcnZpY2UoRGF0ZVByZWNpc2lvbi5ZZWFyLCA0LCAzKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==