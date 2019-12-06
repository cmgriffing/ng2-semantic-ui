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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvY2xhc3Nlcy9kYXRlLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3BEO0lBSUksb0JBQVksTUFBYSxFQUFFLE1BQThCO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxJQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sMEJBQUssR0FBWixVQUFhLFVBQWlCLEVBQUUsUUFBMEI7UUFBMUIseUJBQUEsRUFBQSxlQUFvQixJQUFJLEVBQUU7UUFDdEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDOztBQUVEO0lBQXdDLDhDQUFVO0lBQzlDLDRCQUFZLElBQW1CLEVBQUUsTUFBOEI7UUFBL0QsaUJBVUM7UUFURyxJQUFNLGVBQWUsR0FBa0M7WUFDbkQsSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLElBQUksRUFBRSxZQUFZO1lBQ2xCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLElBQUksRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUVGLFFBQUEsa0JBQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFDOztJQUN6QyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBd0MsVUFBVSxHQVlqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVwaWNrZXJNb2RlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IHsgRGF0ZUZuc1BhcnNlciB9IGZyb20gXCIuLi9oZWxwZXJzL2RhdGUtZm5zXCI7XG5pbXBvcnQgeyBJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcywgSURhdGVwaWNrZXJGb3JtYXRzTG9jYWxlVmFsdWVzIH0gZnJvbSBcIi4uLy4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIERhdGVQYXJzZXIge1xuICAgIHByaXZhdGUgX2Zvcm1hdDpzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcGFyc2VyOkRhdGVGbnNQYXJzZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihmb3JtYXQ6c3RyaW5nLCBsb2NhbGU6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB0aGlzLl9wYXJzZXIgPSBuZXcgRGF0ZUZuc1BhcnNlcihsb2NhbGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb3JtYXQoZGF0ZTpEYXRlKTpzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VyLmZvcm1hdChkYXRlLCB0aGlzLl9mb3JtYXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXJzZShkYXRlU3RyaW5nOnN0cmluZywgYmFzZURhdGU6RGF0ZSA9IG5ldyBEYXRlKCkpOkRhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VyLnBhcnNlKGRhdGVTdHJpbmcsIHRoaXMuX2Zvcm1hdCwgYmFzZURhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsRGF0ZVBhcnNlciBleHRlbmRzIERhdGVQYXJzZXIge1xuICAgIGNvbnN0cnVjdG9yKG1vZGU6RGF0ZXBpY2tlck1vZGUsIGxvY2FsZTpJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcykge1xuICAgICAgICBjb25zdCBpbnRlcm5hbEZvcm1hdHM6SURhdGVwaWNrZXJGb3JtYXRzTG9jYWxlVmFsdWVzID0ge1xuICAgICAgICAgICAgdGltZTogXCJISDptbVwiLFxuICAgICAgICAgICAgZGF0ZXRpbWU6IFwiWVlZWS1NTS1ERFRISDptbVwiLFxuICAgICAgICAgICAgZGF0ZTogXCJZWVlZLU1NLUREXCIsXG4gICAgICAgICAgICBtb250aDogXCJZWVlZLU1NXCIsXG4gICAgICAgICAgICB5ZWFyOiBcIllZWVlcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyKGludGVybmFsRm9ybWF0c1ttb2RlXSwgbG9jYWxlKTtcbiAgICB9XG59XG4iXX0=