import * as tslib_1 from "tslib";
import { Component, Renderer2 } from "@angular/core";
import { CalendarView, CalendarViewType } from "./calendar-view";
import { CalendarRangeService } from "../services/calendar-range.service";
import { DateParser } from "../classes/date-parser";
import { DatePrecision } from "../../../misc/util/helpers/date";
export class CalendarRangeMonthService extends CalendarRangeService {
    configureItem(item, baseDate) {
        item.humanReadable = this.service.localeValues.monthsShort[item.date.getMonth()];
        item.isOutsideRange = false;
    }
}
let SuiCalendarMonthView = class SuiCalendarMonthView extends CalendarView {
    constructor(_renderer) {
        super(_renderer, CalendarViewType.Month, new CalendarRangeMonthService(DatePrecision.Year, 4, 3));
        this._renderer = _renderer;
    }
    get year() {
        return new DateParser(this.service.localeValues.formats.year, this.service.localeValues).format(this.currentDate);
    }
};
SuiCalendarMonthView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarMonthView = tslib_1.__decorate([
    Component({
        selector: "sui-calendar-month-view",
        template: `
        <table
            class="ui celled center aligned unstackable table three column month"
        >
            <thead>
                <tr>
                    <th colspan="3">
                        <sui-calendar-view-title
                            [ranges]="ranges"
                            (zoomOut)="zoomOut()"
                        >
                            {{ year }}
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
], SuiCalendarMonthView);
export { SuiCalendarMonthView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci92aWV3cy9tb250aC12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVoRSxNQUFNLE9BQU8seUJBQTBCLFNBQVEsb0JBQW9CO0lBQ3hELGFBQWEsQ0FBQyxJQUFpQixFQUFFLFFBQWE7UUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQ3ZCLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFtQ0QsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxZQUFZO0lBUWxELFlBQXNCLFNBQW1CO1FBQ3JDLEtBQUssQ0FDRCxTQUFTLEVBQ1QsZ0JBQWdCLENBQUMsS0FBSyxFQUN0QixJQUFJLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUMxRCxDQUFDO1FBTGdCLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFNekMsQ0FBQztJQWJELElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxVQUFVLENBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUM1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQVNKLENBQUE7O1lBUG1DLFNBQVM7O0FBUmhDLG9CQUFvQjtJQWpDaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkJUO0tBQ0osQ0FBQztHQUNXLG9CQUFvQixDQWVoQztTQWZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgUmVuZGVyZXIyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENhbGVuZGFyVmlldywgQ2FsZW5kYXJWaWV3VHlwZSB9IGZyb20gXCIuL2NhbGVuZGFyLXZpZXdcIjtcbmltcG9ydCB7IENhbGVuZGFySXRlbSB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW1cIjtcbmltcG9ydCB7IENhbGVuZGFyUmFuZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NhbGVuZGFyLXJhbmdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGVQYXJzZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy9kYXRlLXBhcnNlclwiO1xuaW1wb3J0IHsgRGF0ZVByZWNpc2lvbiB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9kYXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclJhbmdlTW9udGhTZXJ2aWNlIGV4dGVuZHMgQ2FsZW5kYXJSYW5nZVNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb25maWd1cmVJdGVtKGl0ZW06Q2FsZW5kYXJJdGVtLCBiYXNlRGF0ZTpEYXRlKTp2b2lkIHtcbiAgICAgICAgaXRlbS5odW1hblJlYWRhYmxlID0gdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlcy5tb250aHNTaG9ydFtcbiAgICAgICAgICAgIGl0ZW0uZGF0ZS5nZXRNb250aCgpXG4gICAgICAgIF07XG4gICAgICAgIGl0ZW0uaXNPdXRzaWRlUmFuZ2UgPSBmYWxzZTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1jYWxlbmRhci1tb250aC12aWV3XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgICBjbGFzcz1cInVpIGNlbGxlZCBjZW50ZXIgYWxpZ25lZCB1bnN0YWNrYWJsZSB0YWJsZSB0aHJlZSBjb2x1bW4gbW9udGhcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGggY29sc3Bhbj1cIjNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdWktY2FsZW5kYXItdmlldy10aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyYW5nZXNdPVwicmFuZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoem9vbU91dCk9XCJ6b29tT3V0KClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHllYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3VpLWNhbGVuZGFyLXZpZXctdGl0bGU+XG4gICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBncm91cCBvZiByYW5nZXMuY3VycmVudC5ncm91cGVkSXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbGVuZGFySXRlbV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZXREYXRlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS5odW1hblJlYWRhYmxlIH19XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlDYWxlbmRhck1vbnRoVmlldyBleHRlbmRzIENhbGVuZGFyVmlldyB7XG4gICAgcHVibGljIGdldCB5ZWFyKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlUGFyc2VyKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxvY2FsZVZhbHVlcy5mb3JtYXRzLnllYXIsXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9jYWxlVmFsdWVzXG4gICAgICAgICkuZm9ybWF0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgX3JlbmRlcmVyLFxuICAgICAgICAgICAgQ2FsZW5kYXJWaWV3VHlwZS5Nb250aCxcbiAgICAgICAgICAgIG5ldyBDYWxlbmRhclJhbmdlTW9udGhTZXJ2aWNlKERhdGVQcmVjaXNpb24uWWVhciwgNCwgMylcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=