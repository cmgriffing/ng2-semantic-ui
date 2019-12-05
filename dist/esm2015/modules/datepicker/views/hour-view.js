import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { DatePrecision } from "../../../misc/util/helpers/date";
export class CalendarRangeHourService extends CalendarRangeService {
    configureItem(item, baseDate) {
        // Set minutes and seconds to 0
        const customFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
        item.humanReadable = new DateParser(customFormat, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}
let SuiCalendarHourView = class SuiCalendarHourView extends CalendarView {
    constructor(_renderer) {
        super(_renderer, CalendarViewType.Hour, new CalendarRangeHourService(DatePrecision.Date, 6, 4));
        this._renderer = _renderer;
    }
    get date() {
        return new DateParser(this.service.localeValues.formats.date, this.service.localeValues).format(this.currentDate);
    }
};
SuiCalendarHourView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarHourView = tslib_1.__decorate([
    Component({
        selector: "sui-calendar-hour-view",
        template: `
        <table
            class="ui celled center aligned unstackable table four column hour"
        >
            <thead *ngIf="service.config.mode != 1">
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
], SuiCalendarHourView);
export { SuiCalendarHourView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kYXRlcGlja2VyL3ZpZXdzL2hvdXItdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLG9CQUFvQjtJQUN2RCxhQUFhLENBQUMsSUFBaUIsRUFBRSxRQUFhO1FBQ2pELCtCQUErQjtRQUMvQixNQUFNLFlBQVksR0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDdEUsT0FBTyxFQUNQLEdBQUcsQ0FDTixDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FDL0IsWUFBWSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUM1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBbUNELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsWUFBWTtJQVFqRCxZQUFzQixTQUFtQjtRQUNyQyxLQUFLLENBQ0QsU0FBUyxFQUNULGdCQUFnQixDQUFDLElBQUksRUFDckIsSUFBSSx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDekQsQ0FBQztRQUxnQixjQUFTLEdBQVQsU0FBUyxDQUFVO0lBTXpDLENBQUM7SUFiRCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksVUFBVSxDQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDNUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FTSixDQUFBOztZQVBtQyxTQUFTOztBQVJoQyxtQkFBbUI7SUFqQy9CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZCVDtLQUNKLENBQUM7R0FDVyxtQkFBbUIsQ0FlL0I7U0FmWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXcsIENhbGVuZGFyVmlld1R5cGUgfSBmcm9tIFwiLi9jYWxlbmRhci12aWV3XCI7XG5pbXBvcnQgeyBDYWxlbmRhckl0ZW0gfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9jYWxlbmRhci1pdGVtXCI7XG5pbXBvcnQgeyBDYWxlbmRhclJhbmdlU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9jYWxlbmRhci1yYW5nZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRlUGFyc2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvZGF0ZS1wYXJzZXJcIjtcbmltcG9ydCB7IERhdGVQcmVjaXNpb24gfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvZGF0ZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSYW5nZUhvdXJTZXJ2aWNlIGV4dGVuZHMgQ2FsZW5kYXJSYW5nZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb25maWd1cmVJdGVtKGl0ZW06Q2FsZW5kYXJJdGVtLCBiYXNlRGF0ZTpEYXRlKTp2b2lkIHtcbiAgICAgICAgLy8gU2V0IG1pbnV0ZXMgYW5kIHNlY29uZHMgdG8gMFxuICAgICAgICBjb25zdCBjdXN0b21Gb3JtYXQ6c3RyaW5nID0gdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlcy5mb3JtYXRzLnRpbWUucmVwbGFjZShcbiAgICAgICAgICAgIC9bbXNdL2csXG4gICAgICAgICAgICBcIjBcIlxuICAgICAgICApO1xuICAgICAgICBpdGVtLmh1bWFuUmVhZGFibGUgPSBuZXcgRGF0ZVBhcnNlcihcbiAgICAgICAgICAgIGN1c3RvbUZvcm1hdCxcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5sb2NhbGVWYWx1ZXNcbiAgICAgICAgKS5mb3JtYXQoaXRlbS5kYXRlKTtcbiAgICAgICAgaXRlbS5pc091dHNpZGVSYW5nZSA9IGZhbHNlO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLWNhbGVuZGFyLWhvdXItdmlld1wiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx0YWJsZVxuICAgICAgICAgICAgY2xhc3M9XCJ1aSBjZWxsZWQgY2VudGVyIGFsaWduZWQgdW5zdGFja2FibGUgdGFibGUgZm91ciBjb2x1bW4gaG91clwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDx0aGVhZCAqbmdJZj1cInNlcnZpY2UuY29uZmlnLm1vZGUgIT0gMVwiPlxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCI0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3VpLWNhbGVuZGFyLXZpZXctdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmFuZ2VzXT1cInJhbmdlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHpvb21PdXQpPVwiem9vbU91dCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBkYXRlIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N1aS1jYWxlbmRhci12aWV3LXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgcmFuZ2VzLmN1cnJlbnQuZ3JvdXBlZEl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjYWxlbmRhckl0ZW1dPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2V0RGF0ZShpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0uaHVtYW5SZWFkYWJsZSB9fVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2FsZW5kYXJIb3VyVmlldyBleHRlbmRzIENhbGVuZGFyVmlldyB7XG4gICAgcHVibGljIGdldCBkYXRlKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGFyc2VyKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlcy5mb3JtYXRzLmRhdGUsXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzXG4gICAgICAgICkuZm9ybWF0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgX3JlbmRlcmVyLFxuICAgICAgICAgICAgQ2FsZW5kYXJWaWV3VHlwZS5Ib3VyLFxuICAgICAgICAgICAgbmV3IENhbGVuZGFyUmFuZ2VIb3VyU2VydmljZShEYXRlUHJlY2lzaW9uLkRhdGUsIDYsIDQpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19