import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { Util } from "../../../misc/util/helpers/util";
import { DateUtil, DatePrecision } from "../../../misc/util/helpers/date";
export class CalendarRangeYearService extends CalendarRangeService {
    configureItem(item, baseDate) {
        item.humanReadable = Util.String.padLeft(item.date.getFullYear().toString(), 4, "0");
        item.isOutsideRange =
            item.date.getFullYear() >=
                this.calcStart(baseDate).getFullYear() + 10;
    }
}
let SuiCalendarYearView = class SuiCalendarYearView extends CalendarView {
    constructor(_renderer) {
        super(_renderer, CalendarViewType.Year, new CalendarRangeYearService(DatePrecision.Decade, 4, 3));
        this._renderer = _renderer;
    }
    get decadeStart() {
        return DateUtil.startOf(DatePrecision.Decade, DateUtil.clone(this.service.currentDate)).getFullYear();
    }
    pad(year) {
        return Util.String.padLeft(year.toString(), 4, "0");
    }
};
SuiCalendarYearView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarYearView = tslib_1.__decorate([
    Component({
        selector: "sui-calendar-year-view",
        template: `
        <table
            class="ui celled center aligned unstackable table three column year"
        >
            <thead>
                <tr>
                    <th colspan="3">
                        <sui-calendar-view-title
                            [ranges]="ranges"
                            (zoomOut)="zoomOut()"
                        >
                            {{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}
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
], SuiCalendarYearView);
export { SuiCalendarYearView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL3ZpZXdzL3llYXItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTFFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxvQkFBb0I7SUFDdkQsYUFBYSxDQUFDLElBQWlCLEVBQUUsUUFBYTtRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUNsQyxDQUFDLEVBQ0QsR0FBRyxDQUNOLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0NBQ0o7QUFtQ0QsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxZQUFZO0lBUWpELFlBQXNCLFNBQW1CO1FBQ3JDLEtBQUssQ0FDRCxTQUFTLEVBQ1QsZ0JBQWdCLENBQUMsSUFBSSxFQUNyQixJQUFJLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUMzRCxDQUFDO1FBTGdCLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFNekMsQ0FBQztJQWJELElBQVcsV0FBVztRQUNsQixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQ25CLGFBQWEsQ0FBQyxNQUFNLEVBQ3BCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FDM0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBVU0sR0FBRyxDQUFDLElBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDSixDQUFBOztZQVhtQyxTQUFTOztBQVJoQyxtQkFBbUI7SUFqQy9CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZCVDtLQUNKLENBQUM7R0FDVyxtQkFBbUIsQ0FtQi9CO1NBbkJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENhbGVuZGFyVmlldywgQ2FsZW5kYXJWaWV3VHlwZSB9IGZyb20gXCIuL2NhbGVuZGFyLXZpZXdcIjtcbmltcG9ydCB7IENhbGVuZGFySXRlbSB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW1cIjtcbmltcG9ydCB7IENhbGVuZGFyUmFuZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NhbGVuZGFyLXJhbmdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvdXRpbFwiO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIERhdGVQcmVjaXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvZGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSYW5nZVllYXJTZXJ2aWNlIGV4dGVuZHMgQ2FsZW5kYXJSYW5nZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb25maWd1cmVJdGVtKGl0ZW06Q2FsZW5kYXJJdGVtLCBiYXNlRGF0ZTpEYXRlKTp2b2lkIHtcbiAgICAgICAgaXRlbS5odW1hblJlYWRhYmxlID0gVXRpbC5TdHJpbmcucGFkTGVmdChcbiAgICAgICAgICAgIGl0ZW0uZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICA0LFxuICAgICAgICAgICAgXCIwXCJcbiAgICAgICAgKTtcbiAgICAgICAgaXRlbS5pc091dHNpZGVSYW5nZSA9XG4gICAgICAgICAgICBpdGVtLmRhdGUuZ2V0RnVsbFllYXIoKSA+PVxuICAgICAgICAgICAgdGhpcy5jYWxjU3RhcnQoYmFzZURhdGUpLmdldEZ1bGxZZWFyKCkgKyAxMDtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jYWxlbmRhci15ZWFyLXZpZXdcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dGFibGVcbiAgICAgICAgICAgIGNsYXNzPVwidWkgY2VsbGVkIGNlbnRlciBhbGlnbmVkIHVuc3RhY2thYmxlIHRhYmxlIHRocmVlIGNvbHVtbiB5ZWFyXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VpLWNhbGVuZGFyLXZpZXctdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmFuZ2VzXT1cInJhbmdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHpvb21PdXQpPVwiem9vbU91dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBwYWQoZGVjYWRlU3RhcnQpIH19IC0ge3sgcGFkKGRlY2FkZVN0YXJ0ICsgMTApIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N1aS1jYWxlbmRhci12aWV3LXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgcmFuZ2VzLmN1cnJlbnQuZ3JvdXBlZEl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjYWxlbmRhckl0ZW1dPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2V0RGF0ZShpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0uaHVtYW5SZWFkYWJsZSB9fVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2FsZW5kYXJZZWFyVmlldyBleHRlbmRzIENhbGVuZGFyVmlldyB7XG4gICAgcHVibGljIGdldCBkZWNhZGVTdGFydCgpOm51bWJlciB7XG4gICAgICAgIHJldHVybiBEYXRlVXRpbC5zdGFydE9mKFxuICAgICAgICAgICAgRGF0ZVByZWNpc2lvbi5EZWNhZGUsXG4gICAgICAgICAgICBEYXRlVXRpbC5jbG9uZSh0aGlzLnNlcnZpY2UuY3VycmVudERhdGUpXG4gICAgICAgICkuZ2V0RnVsbFllYXIoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMikge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIF9yZW5kZXJlcixcbiAgICAgICAgICAgIENhbGVuZGFyVmlld1R5cGUuWWVhcixcbiAgICAgICAgICAgIG5ldyBDYWxlbmRhclJhbmdlWWVhclNlcnZpY2UoRGF0ZVByZWNpc2lvbi5EZWNhZGUsIDQsIDMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhZCh5ZWFyOm51bWJlcik6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFV0aWwuU3RyaW5nLnBhZExlZnQoeWVhci50b1N0cmluZygpLCA0LCBcIjBcIik7XG4gICAgfVxufVxuIl19