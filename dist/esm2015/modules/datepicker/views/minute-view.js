import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarMode } from "../services/calendar.service";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { Util } from "../../../misc/util/helpers/util";
import { DateUtil, DatePrecision } from "../../../misc/util/helpers/date";
export class CalendarRangeMinuteService extends CalendarRangeService {
    calcStart(start) {
        return DateUtil.startOf(DatePrecision.Hour, DateUtil.clone(start), true);
    }
    calcDates(start) {
        return Util.Array.range(this.length).map(i => DateUtil.add(DatePrecision.Minute, DateUtil.clone(start), i * 5));
    }
    configureItem(item, baseDate) {
        item.humanReadable = new DateParser(this.service.localeValues.formats.time, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}
let SuiCalendarMinuteView = class SuiCalendarMinuteView extends CalendarView {
    constructor(_renderer) {
        super(_renderer, CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3));
        this._renderer = _renderer;
    }
    get date() {
        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            // Set minutes and seconds to 0
            const dateTimeFormat = this.service.localeValues.formats.datetime.replace(/[ms]/g, "0");
            return new DateParser(dateTimeFormat, this.service.localeValues).format(this.currentDate);
        }
        else {
            // Set minutes and seconds to 0
            const timeFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
            return new DateParser(timeFormat, this.service.localeValues).format(this.currentDate);
        }
    }
};
SuiCalendarMinuteView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarMinuteView = tslib_1.__decorate([
    Component({
        selector: "sui-calendar-minute-view",
        template: `
        <table
            class="ui celled center aligned unstackable table three column minute"
        >
            <thead>
                <tr>
                    <th colspan="4">
                        <sui-calendar-view-title
                            [ranges]="ranges"
                            (zoomOut)="zoomOut()"
                        >
                            {{ date }}
                        </sui-calendar-view-title>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let group of ranges.current.groupedItems">
                    <td
                        class="link"
                        *ngFor="let item of group"
                        [calendarItem]="item"
                        (click)="setDate(item)"
                    >
                        {{ item.humanReadable }}
                    </td>
                </tr>
            </tbody>
        </table>
    `
    })
], SuiCalendarMinuteView);
export { SuiCalendarMinuteView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludXRlLXZpZXcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvdmlld3MvbWludXRlLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFLE1BQU0sT0FBTywwQkFBMkIsU0FBUSxvQkFBb0I7SUFDekQsU0FBUyxDQUFDLEtBQVU7UUFDdkIsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUNuQixhQUFhLENBQUMsSUFBSSxFQUNsQixRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUNyQixJQUFJLENBQ1AsQ0FBQztJQUNOLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDekMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNuRSxDQUFDO0lBQ04sQ0FBQztJQUVNLGFBQWEsQ0FBQyxJQUFpQixFQUFFLFFBQWE7UUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQzVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFtQ0QsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxZQUFZO0lBd0JuRCxZQUFzQixTQUFtQjtRQUNyQyxLQUFLLENBQ0QsU0FBUyxFQUNULGdCQUFnQixDQUFDLE1BQU0sRUFDdkIsSUFBSSwwQkFBMEIsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDM0QsQ0FBQztRQUxnQixjQUFTLEdBQVQsU0FBUyxDQUFVO0lBTXpDLENBQUM7SUE3QkQsSUFBVyxJQUFJO1FBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLFFBQVEsRUFBRTtZQUNwRCwrQkFBK0I7WUFDL0IsTUFBTSxjQUFjLEdBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQzVFLE9BQU8sRUFDUCxHQUFHLENBQ04sQ0FBQztZQUNGLE9BQU8sSUFBSSxVQUFVLENBQ2pCLGNBQWMsRUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDNUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDSCwrQkFBK0I7WUFDL0IsTUFBTSxVQUFVLEdBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3BFLE9BQU8sRUFDUCxHQUFHLENBQ04sQ0FBQztZQUNGLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUMvRCxJQUFJLENBQUMsV0FBVyxDQUNuQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBU0osQ0FBQTs7WUFQbUMsU0FBUzs7QUF4QmhDLHFCQUFxQjtJQWpDakMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkJUO0tBQ0osQ0FBQztHQUNXLHFCQUFxQixDQStCakM7U0EvQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJWaWV3LCBDYWxlbmRhclZpZXdUeXBlIH0gZnJvbSBcIi4vY2FsZW5kYXItdmlld1wiO1xuaW1wb3J0IHsgQ2FsZW5kYXJJdGVtIH0gZnJvbSBcIi4uL2RpcmVjdGl2ZXMvY2FsZW5kYXItaXRlbVwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb2RlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NhbGVuZGFyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENhbGVuZGFyUmFuZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NhbGVuZGFyLXJhbmdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGVQYXJzZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy9kYXRlLXBhcnNlclwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy91dGlsXCI7XG5pbXBvcnQgeyBEYXRlVXRpbCwgRGF0ZVByZWNpc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9kYXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclJhbmdlTWludXRlU2VydmljZSBleHRlbmRzIENhbGVuZGFyUmFuZ2VTZXJ2aWNlIHtcbiAgICBwdWJsaWMgY2FsY1N0YXJ0KHN0YXJ0OkRhdGUpOkRhdGUge1xuICAgICAgICByZXR1cm4gRGF0ZVV0aWwuc3RhcnRPZihcbiAgICAgICAgICAgIERhdGVQcmVjaXNpb24uSG91cixcbiAgICAgICAgICAgIERhdGVVdGlsLmNsb25lKHN0YXJ0KSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsY0RhdGVzKHN0YXJ0OkRhdGUpOkRhdGVbXSB7XG4gICAgICAgIHJldHVybiBVdGlsLkFycmF5LnJhbmdlKHRoaXMubGVuZ3RoKS5tYXAoaSA9PlxuICAgICAgICAgICAgRGF0ZVV0aWwuYWRkKERhdGVQcmVjaXNpb24uTWludXRlLCBEYXRlVXRpbC5jbG9uZShzdGFydCksIGkgKiA1KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25maWd1cmVJdGVtKGl0ZW06Q2FsZW5kYXJJdGVtLCBiYXNlRGF0ZTpEYXRlKTp2b2lkIHtcbiAgICAgICAgaXRlbS5odW1hblJlYWRhYmxlID0gbmV3IERhdGVQYXJzZXIoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzLmZvcm1hdHMudGltZSxcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXNcbiAgICAgICAgKS5mb3JtYXQoaXRlbS5kYXRlKTtcbiAgICAgICAgaXRlbS5pc091dHNpZGVSYW5nZSA9IGZhbHNlO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLWNhbGVuZGFyLW1pbnV0ZS12aWV3XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICBjbGFzcz1cInVpIGNlbGxlZCBjZW50ZXIgYWxpZ25lZCB1bnN0YWNrYWJsZSB0YWJsZSB0aHJlZSBjb2x1bW4gbWludXRlXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VpLWNhbGVuZGFyLXZpZXctdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmFuZ2VzXT1cInJhbmdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHpvb21PdXQpPVwiem9vbU91dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBkYXRlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N1aS1jYWxlbmRhci12aWV3LXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgcmFuZ2VzLmN1cnJlbnQuZ3JvdXBlZEl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjYWxlbmRhckl0ZW1dPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2V0RGF0ZShpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0uaHVtYW5SZWFkYWJsZSB9fVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2FsZW5kYXJNaW51dGVWaWV3IGV4dGVuZHMgQ2FsZW5kYXJWaWV3IHtcbiAgICBwdWJsaWMgZ2V0IGRhdGUoKTpzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLmNvbmZpZy5tb2RlICE9PSBDYWxlbmRhck1vZGUuVGltZU9ubHkpIHtcbiAgICAgICAgICAgIC8vIFNldCBtaW51dGVzIGFuZCBzZWNvbmRzIHRvIDBcbiAgICAgICAgICAgIGNvbnN0IGRhdGVUaW1lRm9ybWF0OnN0cmluZyA9IHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXMuZm9ybWF0cy5kYXRldGltZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIC9bbXNdL2csXG4gICAgICAgICAgICAgICAgXCIwXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVQYXJzZXIoXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWVGb3JtYXQsXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlc1xuICAgICAgICAgICAgKS5mb3JtYXQodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBTZXQgbWludXRlcyBhbmQgc2Vjb25kcyB0byAwXG4gICAgICAgICAgICBjb25zdCB0aW1lRm9ybWF0OnN0cmluZyA9IHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXMuZm9ybWF0cy50aW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgL1ttc10vZyxcbiAgICAgICAgICAgICAgICBcIjBcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVBhcnNlcih0aW1lRm9ybWF0LCB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzKS5mb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgX3JlbmRlcmVyLFxuICAgICAgICAgICAgQ2FsZW5kYXJWaWV3VHlwZS5NaW51dGUsXG4gICAgICAgICAgICBuZXcgQ2FsZW5kYXJSYW5nZU1pbnV0ZVNlcnZpY2UoRGF0ZVByZWNpc2lvbi5Ib3VyLCA0LCAzKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==