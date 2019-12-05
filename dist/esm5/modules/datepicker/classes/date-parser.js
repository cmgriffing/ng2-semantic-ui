import * as tslib_1 from "tslib";
import { DateFnsParser } from "../helpers/date-fns";
var DateParser = /** @class */ (function () {
    function DateParser(format, locale) {
        this._format = format;
        this._parser = new DateFnsParser(locale);
    }
    DateParser.prototype.format = function (date) {
        return this._parser.format(date, this._format);
    };
    DateParser.prototype.parse = function (dateString, baseDate) {
        if (baseDate === void 0) { baseDate = new Date(); }
        return this._parser.parse(dateString, this._format, baseDate);
    };
    return DateParser;
}());
export { DateParser };
var InternalDateParser = /** @class */ (function (_super) {
    tslib_1.__extends(InternalDateParser, _super);
    function InternalDateParser(mode, locale) {
        var _this = this;
        var internalFormats = {
            time: "HH:mm",
            datetime: "YYYY-MM-DDTHH:mm",
            date: "YYYY-MM-DD",
            month: "YYYY-MM",
            year: "YYYY"
        };
        _this = _super.call(this, internalFormats[mode], locale) || this;
        return _this;
    }
    return InternalDateParser;
}(DateParser));
export { InternalDateParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvY2xhc3Nlcy9kYXRlLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTXBEO0lBSUksb0JBQVksTUFBYSxFQUFFLE1BQThCO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxJQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sMEJBQUssR0FBWixVQUFhLFVBQWlCLEVBQUUsUUFBMEI7UUFBMUIseUJBQUEsRUFBQSxlQUFvQixJQUFJLEVBQUU7UUFDdEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDOztBQUVEO0lBQXdDLDhDQUFVO0lBQzlDLDRCQUFZLElBQW1CLEVBQUUsTUFBOEI7UUFBL0QsaUJBVUM7UUFURyxJQUFNLGVBQWUsR0FBa0M7WUFDbkQsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLElBQUksRUFBRSxZQUFZO1lBQ2xCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLElBQUksRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUVGLFFBQUEsa0JBQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFDOztJQUN6QyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBd0MsVUFBVSxHQVlqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVwaWNrZXJNb2RlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IHsgRGF0ZUZuc1BhcnNlciB9IGZyb20gXCIuLi9oZWxwZXJzL2RhdGUtZm5zXCI7XG5pbXBvcnQge1xuICAgIElEYXRlcGlja2VyTG9jYWxlVmFsdWVzLFxuICAgIElEYXRlcGlja2VyRm9ybWF0c0xvY2FsZVZhbHVlc1xufSBmcm9tIFwiLi4vLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9pbnRlcmZhY2VzL2RhdGVwaWNrZXItdmFsdWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRlUGFyc2VyIHtcbiAgICBwcml2YXRlIF9mb3JtYXQ6c3RyaW5nO1xuICAgIHByaXZhdGUgX3BhcnNlcjpEYXRlRm5zUGFyc2VyO1xuXG4gICAgY29uc3RydWN0b3IoZm9ybWF0OnN0cmluZywgbG9jYWxlOklEYXRlcGlja2VyTG9jYWxlVmFsdWVzKSB7XG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgdGhpcy5fcGFyc2VyID0gbmV3IERhdGVGbnNQYXJzZXIobG9jYWxlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZm9ybWF0KGRhdGU6RGF0ZSk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlci5mb3JtYXQoZGF0ZSwgdGhpcy5fZm9ybWF0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGFyc2UoZGF0ZVN0cmluZzpzdHJpbmcsIGJhc2VEYXRlOkRhdGUgPSBuZXcgRGF0ZSgpKTpEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlci5wYXJzZShkYXRlU3RyaW5nLCB0aGlzLl9mb3JtYXQsIGJhc2VEYXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbERhdGVQYXJzZXIgZXh0ZW5kcyBEYXRlUGFyc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihtb2RlOkRhdGVwaWNrZXJNb2RlLCBsb2NhbGU6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXMpIHtcbiAgICAgICAgY29uc3QgaW50ZXJuYWxGb3JtYXRzOklEYXRlcGlja2VyRm9ybWF0c0xvY2FsZVZhbHVlcyA9IHtcbiAgICAgICAgICAgIHRpbWU6IFwiSEg6bW1cIixcbiAgICAgICAgICAgIGRhdGV0aW1lOiBcIllZWVktTU0tRERUSEg6bW1cIixcbiAgICAgICAgICAgIGRhdGU6IFwiWVlZWS1NTS1ERFwiLFxuICAgICAgICAgICAgbW9udGg6IFwiWVlZWS1NTVwiLFxuICAgICAgICAgICAgeWVhcjogXCJZWVlZXCJcbiAgICAgICAgfTtcblxuICAgICAgICBzdXBlcihpbnRlcm5hbEZvcm1hdHNbbW9kZV0sIGxvY2FsZSk7XG4gICAgfVxufVxuIl19