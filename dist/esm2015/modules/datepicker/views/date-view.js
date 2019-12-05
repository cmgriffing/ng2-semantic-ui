import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { DateUtil, DatePrecision } from "../../../misc/util/helpers/date";
export class CalendarRangeDateService extends CalendarRangeService {
    calcStart(start) {
        const monthStart = DateUtil.startOf(DatePrecision.Month, DateUtil.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.service.firstDayOfWeek - 7) % 7);
        return monthStart;
    }
    configureItem(item, baseDate) {
        item.humanReadable = item.date.getDate().toString();
        item.isOutsideRange = item.date.getMonth() !== baseDate.getMonth();
        item.isSelectable = item.isDisabled;
    }
}
let SuiCalendarDateView = class SuiCalendarDateView extends CalendarView {
    constructor(_renderer) {
        super(_renderer, CalendarViewType.Date, new CalendarRangeDateService(DatePrecision.Month, 6, 7));
        this._renderer = _renderer;
    }
    get days() {
        const days = this.service.localeValues.weekdaysNarrow;
        return days.map((d, i) => days[(i + this.service.firstDayOfWeek) % days.length]);
    }
    get date() {
        return new DateParser(this.service.localeValues.formats.month, this.service.localeValues).format(this.currentDate);
    }
};
SuiCalendarDateView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarDateView = tslib_1.__decorate([
    Component({
        selector: "sui-calendar-date-view",
        template: `
        <table
            class="ui celled center aligned unstackable table seven column day"
        >
            <thead>
                <tr>
                    <th colspan="7">
                        <sui-calendar-view-title
                            [ranges]="ranges"
                            (zoomOut)="zoomOut()"
                        >
                            {{ date }}
                        </sui-calendar-view-title>
                    </th>
                </tr>
                <tr>
                    <th *ngFor="let day of days">{{ day }}</th>
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
], SuiCalendarDateView);
export { SuiCalendarDateView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL3ZpZXdzL2RhdGUtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckQsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxvQkFBb0I7SUFDdkQsU0FBUyxDQUFDLEtBQVU7UUFDdkIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FDL0IsYUFBYSxDQUFDLEtBQUssRUFDbkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDeEIsQ0FBQztRQUNGLFVBQVUsQ0FBQyxPQUFPLENBQ2QsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDbEUsQ0FBQztRQUNGLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBaUIsRUFBRSxRQUFhO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7QUFzQ0QsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxZQUFZO0lBZ0JqRCxZQUFzQixTQUFtQjtRQUNyQyxLQUFLLENBQ0QsU0FBUyxFQUNULGdCQUFnQixDQUFDLElBQUksRUFDckIsSUFBSSx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztRQUxnQixjQUFTLEdBQVQsU0FBUyxDQUFVO0lBTXpDLENBQUM7SUFyQkQsSUFBVyxJQUFJO1FBQ1gsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDWCxDQUFDLENBQUMsRUFBRSxDQUFRLEVBQUUsRUFBRSxDQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDNUQsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksVUFBVSxDQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDNUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FTSixDQUFBOztZQVBtQyxTQUFTOztBQWhCaEMsbUJBQW1CO0lBcEMvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQ1Q7S0FDSixDQUFDO0dBQ1csbUJBQW1CLENBdUIvQjtTQXZCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IENhbGVuZGFySXRlbSB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW1cIjtcbmltcG9ydCB7IENhbGVuZGFyVmlldywgQ2FsZW5kYXJWaWV3VHlwZSB9IGZyb20gXCIuL2NhbGVuZGFyLXZpZXdcIjtcbmltcG9ydCB7IENhbGVuZGFyUmFuZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NhbGVuZGFyLXJhbmdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGVQYXJzZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy9kYXRlLXBhcnNlclwiO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIERhdGVQcmVjaXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvZGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSYW5nZURhdGVTZXJ2aWNlIGV4dGVuZHMgQ2FsZW5kYXJSYW5nZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBjYWxjU3RhcnQoc3RhcnQ6RGF0ZSk6RGF0ZSB7XG4gICAgICAgIGNvbnN0IG1vbnRoU3RhcnQgPSBEYXRlVXRpbC5zdGFydE9mKFxuICAgICAgICAgICAgRGF0ZVByZWNpc2lvbi5Nb250aCxcbiAgICAgICAgICAgIERhdGVVdGlsLmNsb25lKHN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICBtb250aFN0YXJ0LnNldERhdGUoXG4gICAgICAgICAgICAoMSAtIG1vbnRoU3RhcnQuZ2V0RGF5KCkgKyB0aGlzLnNlcnZpY2UuZmlyc3REYXlPZldlZWsgLSA3KSAlIDdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG1vbnRoU3RhcnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbmZpZ3VyZUl0ZW0oaXRlbTpDYWxlbmRhckl0ZW0sIGJhc2VEYXRlOkRhdGUpOnZvaWQge1xuICAgICAgICBpdGVtLmh1bWFuUmVhZGFibGUgPSBpdGVtLmRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGl0ZW0uaXNPdXRzaWRlUmFuZ2UgPSBpdGVtLmRhdGUuZ2V0TW9udGgoKSAhPT0gYmFzZURhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgaXRlbS5pc1NlbGVjdGFibGUgPSBpdGVtLmlzRGlzYWJsZWQ7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktY2FsZW5kYXItZGF0ZS12aWV3XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICBjbGFzcz1cInVpIGNlbGxlZCBjZW50ZXIgYWxpZ25lZCB1bnN0YWNrYWJsZSB0YWJsZSBzZXZlbiBjb2x1bW4gZGF5XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCI3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VpLWNhbGVuZGFyLXZpZXctdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmFuZ2VzXT1cInJhbmdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHpvb21PdXQpPVwiem9vbU91dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBkYXRlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N1aS1jYWxlbmRhci12aWV3LXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzXCI+e3sgZGF5IH19PC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGdyb3VwIG9mIHJhbmdlcy5jdXJyZW50Lmdyb3VwZWRJdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FsZW5kYXJJdGVtXT1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldERhdGUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBpdGVtLmh1bWFuUmVhZGFibGUgfX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNhbGVuZGFyRGF0ZVZpZXcgZXh0ZW5kcyBDYWxlbmRhclZpZXcge1xuICAgIHB1YmxpYyBnZXQgZGF5cygpOnN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXMud2Vla2RheXNOYXJyb3c7XG4gICAgICAgIHJldHVybiBkYXlzLm1hcChcbiAgICAgICAgICAgIChkLCBpOm51bWJlcikgPT5cbiAgICAgICAgICAgICAgICBkYXlzWyhpICsgdGhpcy5zZXJ2aWNlLmZpcnN0RGF5T2ZXZWVrKSAlIGRheXMubGVuZ3RoXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGF0ZSgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVBhcnNlcihcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXMuZm9ybWF0cy5tb250aCxcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXNcbiAgICAgICAgKS5mb3JtYXQodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBfcmVuZGVyZXIsXG4gICAgICAgICAgICBDYWxlbmRhclZpZXdUeXBlLkRhdGUsXG4gICAgICAgICAgICBuZXcgQ2FsZW5kYXJSYW5nZURhdGVTZXJ2aWNlKERhdGVQcmVjaXNpb24uTW9udGgsIDYsIDcpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19