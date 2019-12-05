import * as tslib_1 from "tslib";
import { CalendarMode } from "../services/calendar.service";
import { DatetimeMappings, DateMappings, TimeMappings, MonthMappings, YearMappings } from "./calendar-mappings";
import { DatePrecision, DateUtil } from "../../../misc/util/helpers/date";
var CalendarConfig = /** @class */ (function () {
    function CalendarConfig(mode, precision, mappings, fallback) {
        this.mode = mode;
        this.precision = precision;
        this.mappings = mappings;
        this.fallback = fallback;
    }
    CalendarConfig.prototype.updateBounds = function (providedDate) {
        this.dateMinBound = DateUtil.startOf(DatePrecision.Year, new Date(), true);
        this.dateMinBound.setFullYear(0);
    };
    return CalendarConfig;
}());
export { CalendarConfig };
var DateConfigBase = /** @class */ (function (_super) {
    tslib_1.__extends(DateConfigBase, _super);
    function DateConfigBase(precision, mappings, fallback) {
        return _super.call(this, CalendarMode.DateOnly, precision, mappings, fallback) || this;
    }
    return DateConfigBase;
}(CalendarConfig));
export { DateConfigBase };
var YearConfig = /** @class */ (function (_super) {
    tslib_1.__extends(YearConfig, _super);
    function YearConfig() {
        return _super.call(this, DatePrecision.Year, new YearMappings(), "number") || this;
    }
    return YearConfig;
}(DateConfigBase));
export { YearConfig };
var MonthConfig = /** @class */ (function (_super) {
    tslib_1.__extends(MonthConfig, _super);
    function MonthConfig() {
        return _super.call(this, DatePrecision.Month, new MonthMappings(), "month") || this;
    }
    return MonthConfig;
}(DateConfigBase));
export { MonthConfig };
var DateConfig = /** @class */ (function (_super) {
    tslib_1.__extends(DateConfig, _super);
    function DateConfig() {
        return _super.call(this, DatePrecision.Date, new DateMappings(), "date") || this;
    }
    return DateConfig;
}(DateConfigBase));
export { DateConfig };
var DatetimeConfig = /** @class */ (function (_super) {
    tslib_1.__extends(DatetimeConfig, _super);
    function DatetimeConfig() {
        return _super.call(this, CalendarMode.Both, DatePrecision.Minute, new DatetimeMappings(), "datetime-local") || this;
    }
    return DatetimeConfig;
}(CalendarConfig));
export { DatetimeConfig };
var TimeConfig = /** @class */ (function (_super) {
    tslib_1.__extends(TimeConfig, _super);
    function TimeConfig() {
        return _super.call(this, CalendarMode.TimeOnly, DatePrecision.Minute, new TimeMappings(), "time") || this;
    }
    TimeConfig.prototype.updateBounds = function (providedDate) {
        this.dateMaxBound = DateUtil.endOf(DatePrecision.Date, DateUtil.clone(providedDate));
        this.dateMinBound = DateUtil.previous(DatePrecision.Date, DateUtil.clone(this.dateMaxBound));
    };
    return TimeConfig;
}(CalendarConfig));
export { TimeConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL2NsYXNzZXMvY2FsZW5kYXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUVILGdCQUFnQixFQUNoQixZQUFZLEVBQ1osWUFBWSxFQUNaLGFBQWEsRUFDYixZQUFZLEVBQ2YsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFO0lBVUksd0JBQ0ksSUFBaUIsRUFDakIsU0FBdUIsRUFDdkIsUUFBeUIsRUFDekIsUUFBZTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFTSxxQ0FBWSxHQUFuQixVQUFvQixZQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQ2hDLGFBQWEsQ0FBQyxJQUFJLEVBQ2xCLElBQUksSUFBSSxFQUFFLEVBQ1YsSUFBSSxDQUNQLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDOztBQUVEO0lBQW9DLDBDQUFjO0lBQzlDLHdCQUNJLFNBQXVCLEVBQ3ZCLFFBQXlCLEVBQ3pCLFFBQWU7ZUFFZixrQkFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0lBQy9ELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFSRCxDQUFvQyxjQUFjLEdBUWpEOztBQUVEO0lBQWdDLHNDQUFjO0lBQzFDO2VBQ0ksa0JBQU0sYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLFlBQVksRUFBRSxFQUFFLFFBQVEsQ0FBQztJQUMzRCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBZ0MsY0FBYyxHQUk3Qzs7QUFFRDtJQUFpQyx1Q0FBYztJQUMzQztlQUNJLGtCQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxhQUFhLEVBQUUsRUFBRSxPQUFPLENBQUM7SUFDNUQsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQUpELENBQWlDLGNBQWMsR0FJOUM7O0FBRUQ7SUFBZ0Msc0NBQWM7SUFDMUM7ZUFDSSxrQkFBTSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksWUFBWSxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQ3pELENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFKRCxDQUFnQyxjQUFjLEdBSTdDOztBQUVEO0lBQW9DLDBDQUFjO0lBQzlDO2VBQ0ksa0JBQ0ksWUFBWSxDQUFDLElBQUksRUFDakIsYUFBYSxDQUFDLE1BQU0sRUFDcEIsSUFBSSxnQkFBZ0IsRUFBRSxFQUN0QixnQkFBZ0IsQ0FDbkI7SUFDTCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBb0MsY0FBYyxHQVNqRDs7QUFFRDtJQUFnQyxzQ0FBYztJQUMxQztlQUNJLGtCQUNJLFlBQVksQ0FBQyxRQUFRLEVBQ3JCLGFBQWEsQ0FBQyxNQUFNLEVBQ3BCLElBQUksWUFBWSxFQUFFLEVBQ2xCLE1BQU0sQ0FDVDtJQUNMLENBQUM7SUFFTSxpQ0FBWSxHQUFuQixVQUFvQixZQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQzlCLGFBQWEsQ0FBQyxJQUFJLEVBQ2xCLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQ2pDLGFBQWEsQ0FBQyxJQUFJLEVBQ2xCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUNwQyxDQUFDO0lBQ04sQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFnQyxjQUFjLEdBb0I3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhbGVuZGFyTW9kZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlXCI7XG5pbXBvcnQge1xuICAgIENhbGVuZGFyTWFwcGluZ3MsXG4gICAgRGF0ZXRpbWVNYXBwaW5ncyxcbiAgICBEYXRlTWFwcGluZ3MsXG4gICAgVGltZU1hcHBpbmdzLFxuICAgIE1vbnRoTWFwcGluZ3MsXG4gICAgWWVhck1hcHBpbmdzXG59IGZyb20gXCIuL2NhbGVuZGFyLW1hcHBpbmdzXCI7XG5pbXBvcnQgeyBEYXRlUHJlY2lzaW9uLCBEYXRlVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9kYXRlXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWxlbmRhckNvbmZpZyB7XG4gICAgcHVibGljIG1vZGU6Q2FsZW5kYXJNb2RlO1xuICAgIHB1YmxpYyBwcmVjaXNpb246RGF0ZVByZWNpc2lvbjtcbiAgICBwdWJsaWMgbWFwcGluZ3M6Q2FsZW5kYXJNYXBwaW5ncztcblxuICAgIHB1YmxpYyBmYWxsYmFjazpzdHJpbmc7XG5cbiAgICBwdWJsaWMgZGF0ZU1pbkJvdW5kPzpEYXRlO1xuICAgIHB1YmxpYyBkYXRlTWF4Qm91bmQ/OkRhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbW9kZTpDYWxlbmRhck1vZGUsXG4gICAgICAgIHByZWNpc2lvbjpEYXRlUHJlY2lzaW9uLFxuICAgICAgICBtYXBwaW5nczpDYWxlbmRhck1hcHBpbmdzLFxuICAgICAgICBmYWxsYmFjazpzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBwcmVjaXNpb247XG4gICAgICAgIHRoaXMubWFwcGluZ3MgPSBtYXBwaW5ncztcbiAgICAgICAgdGhpcy5mYWxsYmFjayA9IGZhbGxiYWNrO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVCb3VuZHMocHJvdmlkZWREYXRlOkRhdGUpOnZvaWQge1xuICAgICAgICB0aGlzLmRhdGVNaW5Cb3VuZCA9IERhdGVVdGlsLnN0YXJ0T2YoXG4gICAgICAgICAgICBEYXRlUHJlY2lzaW9uLlllYXIsXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRhdGVNaW5Cb3VuZC5zZXRGdWxsWWVhcigwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRlQ29uZmlnQmFzZSBleHRlbmRzIENhbGVuZGFyQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJlY2lzaW9uOkRhdGVQcmVjaXNpb24sXG4gICAgICAgIG1hcHBpbmdzOkNhbGVuZGFyTWFwcGluZ3MsXG4gICAgICAgIGZhbGxiYWNrOnN0cmluZ1xuICAgICkge1xuICAgICAgICBzdXBlcihDYWxlbmRhck1vZGUuRGF0ZU9ubHksIHByZWNpc2lvbiwgbWFwcGluZ3MsIGZhbGxiYWNrKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBZZWFyQ29uZmlnIGV4dGVuZHMgRGF0ZUNvbmZpZ0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihEYXRlUHJlY2lzaW9uLlllYXIsIG5ldyBZZWFyTWFwcGluZ3MoKSwgXCJudW1iZXJcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW9udGhDb25maWcgZXh0ZW5kcyBEYXRlQ29uZmlnQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKERhdGVQcmVjaXNpb24uTW9udGgsIG5ldyBNb250aE1hcHBpbmdzKCksIFwibW9udGhcIik7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0ZUNvbmZpZyBleHRlbmRzIERhdGVDb25maWdCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRGF0ZVByZWNpc2lvbi5EYXRlLCBuZXcgRGF0ZU1hcHBpbmdzKCksIFwiZGF0ZVwiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRldGltZUNvbmZpZyBleHRlbmRzIENhbGVuZGFyQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBDYWxlbmRhck1vZGUuQm90aCxcbiAgICAgICAgICAgIERhdGVQcmVjaXNpb24uTWludXRlLFxuICAgICAgICAgICAgbmV3IERhdGV0aW1lTWFwcGluZ3MoKSxcbiAgICAgICAgICAgIFwiZGF0ZXRpbWUtbG9jYWxcIlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRpbWVDb25maWcgZXh0ZW5kcyBDYWxlbmRhckNvbmZpZyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgQ2FsZW5kYXJNb2RlLlRpbWVPbmx5LFxuICAgICAgICAgICAgRGF0ZVByZWNpc2lvbi5NaW51dGUsXG4gICAgICAgICAgICBuZXcgVGltZU1hcHBpbmdzKCksXG4gICAgICAgICAgICBcInRpbWVcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVCb3VuZHMocHJvdmlkZWREYXRlOkRhdGUpOnZvaWQge1xuICAgICAgICB0aGlzLmRhdGVNYXhCb3VuZCA9IERhdGVVdGlsLmVuZE9mKFxuICAgICAgICAgICAgRGF0ZVByZWNpc2lvbi5EYXRlLFxuICAgICAgICAgICAgRGF0ZVV0aWwuY2xvbmUocHJvdmlkZWREYXRlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRhdGVNaW5Cb3VuZCA9IERhdGVVdGlsLnByZXZpb3VzKFxuICAgICAgICAgICAgRGF0ZVByZWNpc2lvbi5EYXRlLFxuICAgICAgICAgICAgRGF0ZVV0aWwuY2xvbmUodGhpcy5kYXRlTWF4Qm91bmQpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19