import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarMode } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { Util } from "../../../misc/util/helpers/util";
import { DateUtil, DatePrecision } from "../../../misc/util/helpers/date";
var CalendarRangeMinuteService = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarRangeMinuteService, _super);
    function CalendarRangeMinuteService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeMinuteService.prototype.calcStart = function (start) {
        return DateUtil.startOf(DatePrecision.Hour, DateUtil.clone(start), true);
    };
    CalendarRangeMinuteService.prototype.calcDates = function (start) {
        return Util.Array.range(this.length).map(function (i) {
            return DateUtil.add(DatePrecision.Minute, DateUtil.clone(start), i * 5);
        });
    };
    CalendarRangeMinuteService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = new DateParser(this.service.localeValues.formats.time, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    };
    return CalendarRangeMinuteService;
}(CalendarRangeService));
export { CalendarRangeMinuteService };
var SuiCalendarMinuteView = /** @class */ (function (_super) {
    tslib_1.__extends(SuiCalendarMinuteView, _super);
    function SuiCalendarMinuteView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarMinuteView.prototype, "date", {
        get: function () {
            if (this.service.config.mode !== CalendarMode.TimeOnly) {
                // Set minutes and seconds to 0
                var dateTimeFormat = this.service.localeValues.formats.datetime.replace(/[ms]/g, "0");
                return new DateParser(dateTimeFormat, this.service.localeValues).format(this.currentDate);
            }
            else {
                // Set minutes and seconds to 0
                var timeFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
                return new DateParser(timeFormat, this.service.localeValues).format(this.currentDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarMinuteView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarMinuteView = tslib_1.__decorate([
        Component({
            selector: "sui-calendar-minute-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table three column minute\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"4\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ date }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarMinuteView);
    return SuiCalendarMinuteView;
}(CalendarView));
export { SuiCalendarMinuteView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludXRlLXZpZXcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvdmlld3MvbWludXRlLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFO0lBQWdELHNEQUFvQjtJQUFwRTs7SUFzQkEsQ0FBQztJQXJCVSw4Q0FBUyxHQUFoQixVQUFpQixLQUFVO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FDbkIsYUFBYSxDQUFDLElBQUksRUFDbEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDckIsSUFBSSxDQUNQLENBQUM7SUFDTixDQUFDO0lBRU0sOENBQVMsR0FBaEIsVUFBaUIsS0FBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO1lBQ3RDLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFoRSxDQUFnRSxDQUNuRSxDQUFDO0lBQ04sQ0FBQztJQUVNLGtEQUFhLEdBQXBCLFVBQXFCLElBQWlCLEVBQUUsUUFBYTtRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDNUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxpQ0FBQztBQUFELENBQUMsQUF0QkQsQ0FBZ0Qsb0JBQW9CLEdBc0JuRTs7QUFtQ0Q7SUFBMkMsaURBQVk7SUF3Qm5ELCtCQUFzQixTQUFtQjtRQUF6QyxZQUNJLGtCQUNJLFNBQVMsRUFDVCxnQkFBZ0IsQ0FBQyxNQUFNLEVBQ3ZCLElBQUksMEJBQTBCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzNELFNBQ0o7UUFOcUIsZUFBUyxHQUFULFNBQVMsQ0FBVTs7SUFNekMsQ0FBQztJQTdCRCxzQkFBVyx1Q0FBSTthQUFmO1lBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLFFBQVEsRUFBRTtnQkFDcEQsK0JBQStCO2dCQUMvQixJQUFNLGNBQWMsR0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDNUUsT0FBTyxFQUNQLEdBQUcsQ0FDTixDQUFDO2dCQUNGLE9BQU8sSUFBSSxVQUFVLENBQ2pCLGNBQWMsRUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDNUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNILCtCQUErQjtnQkFDL0IsSUFBTSxVQUFVLEdBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3BFLE9BQU8sRUFDUCxHQUFHLENBQ04sQ0FBQztnQkFDRixPQUFPLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FDL0QsSUFBSSxDQUFDLFdBQVcsQ0FDbkIsQ0FBQzthQUNMO1FBQ0wsQ0FBQzs7O09BQUE7O2dCQUUrQixTQUFTOztJQXhCaEMscUJBQXFCO1FBakNqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSxnZ0NBNkJUO1NBQ0osQ0FBQztPQUNXLHFCQUFxQixDQStCakM7SUFBRCw0QkFBQztDQUFBLEFBL0JELENBQTJDLFlBQVksR0ErQnREO1NBL0JZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENhbGVuZGFyVmlldywgQ2FsZW5kYXJWaWV3VHlwZSB9IGZyb20gXCIuL2NhbGVuZGFyLXZpZXdcIjtcbmltcG9ydCB7IENhbGVuZGFySXRlbSB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW1cIjtcbmltcG9ydCB7IENhbGVuZGFyTW9kZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclJhbmdlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci1yYW5nZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRlUGFyc2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvZGF0ZS1wYXJzZXJcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvdXRpbFwiO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIERhdGVQcmVjaXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvZGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSYW5nZU1pbnV0ZVNlcnZpY2UgZXh0ZW5kcyBDYWxlbmRhclJhbmdlU2VydmljZSB7XG4gICAgcHVibGljIGNhbGNTdGFydChzdGFydDpEYXRlKTpEYXRlIHtcbiAgICAgICAgcmV0dXJuIERhdGVVdGlsLnN0YXJ0T2YoXG4gICAgICAgICAgICBEYXRlUHJlY2lzaW9uLkhvdXIsXG4gICAgICAgICAgICBEYXRlVXRpbC5jbG9uZShzdGFydCksXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbGNEYXRlcyhzdGFydDpEYXRlKTpEYXRlW10ge1xuICAgICAgICByZXR1cm4gVXRpbC5BcnJheS5yYW5nZSh0aGlzLmxlbmd0aCkubWFwKGkgPT5cbiAgICAgICAgICAgIERhdGVVdGlsLmFkZChEYXRlUHJlY2lzaW9uLk1pbnV0ZSwgRGF0ZVV0aWwuY2xvbmUoc3RhcnQpLCBpICogNSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uZmlndXJlSXRlbShpdGVtOkNhbGVuZGFySXRlbSwgYmFzZURhdGU6RGF0ZSk6dm9pZCB7XG4gICAgICAgIGl0ZW0uaHVtYW5SZWFkYWJsZSA9IG5ldyBEYXRlUGFyc2VyKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlcy5mb3JtYXRzLnRpbWUsXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzXG4gICAgICAgICkuZm9ybWF0KGl0ZW0uZGF0ZSk7XG4gICAgICAgIGl0ZW0uaXNPdXRzaWRlUmFuZ2UgPSBmYWxzZTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jYWxlbmRhci1taW51dGUtdmlld1wiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx0YWJsZVxuICAgICAgICAgICAgY2xhc3M9XCJ1aSBjZWxsZWQgY2VudGVyIGFsaWduZWQgdW5zdGFja2FibGUgdGFibGUgdGhyZWUgY29sdW1uIG1pbnV0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN1aS1jYWxlbmRhci12aWV3LXRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jhbmdlc109XCJyYW5nZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh6b29tT3V0KT1cInpvb21PdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZGF0ZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdWktY2FsZW5kYXItdmlldy10aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGdyb3VwIG9mIHJhbmdlcy5jdXJyZW50Lmdyb3VwZWRJdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FsZW5kYXJJdGVtXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldERhdGUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLmh1bWFuUmVhZGFibGUgfX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNhbGVuZGFyTWludXRlVmlldyBleHRlbmRzIENhbGVuZGFyVmlldyB7XG4gICAgcHVibGljIGdldCBkYXRlKCk6c3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5jb25maWcubW9kZSAhPT0gQ2FsZW5kYXJNb2RlLlRpbWVPbmx5KSB7XG4gICAgICAgICAgICAvLyBTZXQgbWludXRlcyBhbmQgc2Vjb25kcyB0byAwXG4gICAgICAgICAgICBjb25zdCBkYXRlVGltZUZvcm1hdDpzdHJpbmcgPSB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMuZGF0ZXRpbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAvW21zXS9nLFxuICAgICAgICAgICAgICAgIFwiMFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGFyc2VyKFxuICAgICAgICAgICAgICAgIGRhdGVUaW1lRm9ybWF0LFxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXNcbiAgICAgICAgICAgICkuZm9ybWF0KHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2V0IG1pbnV0ZXMgYW5kIHNlY29uZHMgdG8gMFxuICAgICAgICAgICAgY29uc3QgdGltZUZvcm1hdDpzdHJpbmcgPSB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMudGltZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC9bbXNdL2csXG4gICAgICAgICAgICAgICAgXCIwXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVQYXJzZXIodGltZUZvcm1hdCwgdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlcykuZm9ybWF0KFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMikge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIF9yZW5kZXJlcixcbiAgICAgICAgICAgIENhbGVuZGFyVmlld1R5cGUuTWludXRlLFxuICAgICAgICAgICAgbmV3IENhbGVuZGFyUmFuZ2VNaW51dGVTZXJ2aWNlKERhdGVQcmVjaXNpb24uSG91ciwgNCwgMylcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=