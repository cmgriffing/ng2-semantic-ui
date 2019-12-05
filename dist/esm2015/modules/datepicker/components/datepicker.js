import * as tslib_1 from "tslib";
import { Component, HostBinding, HostListener } from "@angular/core";
import { CalendarService } from "./../services/calendar.service";
import { DatetimeConfig } from "../classes/calendar-config";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
export const DatepickerMode = {
    Year: "year",
    Month: "month",
    Date: "date",
    Datetime: "datetime",
    Time: "time"
};
let SuiDatepicker = class SuiDatepicker {
    constructor(_localizationService) {
        this._localizationService = _localizationService;
        this.service = new CalendarService(new DatetimeConfig(), _localizationService.get().datepicker);
        this.calendarClasses = true;
    }
    onMouseDown(e) {
        e.preventDefault();
    }
};
SuiDatepicker.ctorParameters = () => [
    { type: SuiLocalizationService }
];
tslib_1.__decorate([
    HostBinding("class.ui"),
    HostBinding("class.active"),
    HostBinding("class.calendar")
], SuiDatepicker.prototype, "calendarClasses", void 0);
tslib_1.__decorate([
    HostListener("mousedown", ["$event"])
], SuiDatepicker.prototype, "onMouseDown", null);
SuiDatepicker = tslib_1.__decorate([
    Component({
        selector: "sui-datepicker",
        template: `
        <ng-container [ngSwitch]="service.currentView">
            <sui-calendar-year-view
                [service]="service"
                *ngSwitchCase="0"
            ></sui-calendar-year-view>
            <sui-calendar-month-view
                [service]="service"
                *ngSwitchCase="1"
            ></sui-calendar-month-view>
            <sui-calendar-date-view
                [service]="service"
                *ngSwitchCase="2"
            ></sui-calendar-date-view>
            <sui-calendar-hour-view
                [service]="service"
                *ngSwitchCase="3"
            ></sui-calendar-hour-view>
            <sui-calendar-minute-view
                [service]="service"
                *ngSwitchCase="4"
            ></sui-calendar-minute-view>
        </ng-container>
    `,
        styles: [`
            :host {
                user-select: none;
            }
        `]
    })
], SuiDatepicker);
export { SuiDatepicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9jb21wb25lbnRzL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBSXZHLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUMxQixJQUFJLEVBQUUsTUFBd0I7SUFDOUIsS0FBSyxFQUFFLE9BQXlCO0lBQ2hDLElBQUksRUFBRSxNQUF3QjtJQUM5QixRQUFRLEVBQUUsVUFBNEI7SUFDdEMsSUFBSSxFQUFFLE1BQXdCO0NBQ2pDLENBQUM7QUFvQ0YsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVF0QixZQUFvQixvQkFBMkM7UUFBM0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtRQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBZSxDQUM5QixJQUFJLGNBQWMsRUFBRSxFQUNwQixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQ3hDLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBR00sV0FBVyxDQUFDLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSixDQUFBOztZQWI0QyxzQkFBc0I7O0FBSi9EO0lBSEMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN2QixXQUFXLENBQUMsY0FBYyxDQUFDO0lBQzNCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztzREFDQztBQWMvQjtJQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnREFHckM7QUFwQlEsYUFBYTtJQWxDekIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUJUO2lCQUVHOzs7O1NBSUM7S0FFUixDQUFDO0dBQ1csYUFBYSxDQXFCekI7U0FyQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tIFwiLi8uLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRldGltZUNvbmZpZyB9IGZyb20gXCIuLi9jbGFzc2VzL2NhbGVuZGFyLWNvbmZpZ1wiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL3NlcnZpY2VzL2xvY2FsaXphdGlvbi5zZXJ2aWNlXCI7XG5cbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJNb2RlID0gXCJ5ZWFyXCIgfCBcIm1vbnRoXCIgfCBcImRhdGVcIiB8IFwiZGF0ZXRpbWVcIiB8IFwidGltZVwiO1xuXG5leHBvcnQgY29uc3QgRGF0ZXBpY2tlck1vZGUgPSB7XG4gICAgWWVhcjogXCJ5ZWFyXCIgYXMgRGF0ZXBpY2tlck1vZGUsXG4gICAgTW9udGg6IFwibW9udGhcIiBhcyBEYXRlcGlja2VyTW9kZSxcbiAgICBEYXRlOiBcImRhdGVcIiBhcyBEYXRlcGlja2VyTW9kZSxcbiAgICBEYXRldGltZTogXCJkYXRldGltZVwiIGFzIERhdGVwaWNrZXJNb2RlLFxuICAgIFRpbWU6IFwidGltZVwiIGFzIERhdGVwaWNrZXJNb2RlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktZGF0ZXBpY2tlclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInNlcnZpY2UuY3VycmVudFZpZXdcIj5cbiAgICAgICAgICAgIDxzdWktY2FsZW5kYXIteWVhci12aWV3XG4gICAgICAgICAgICAgICAgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIjBcIlxuICAgICAgICAgICAgPjwvc3VpLWNhbGVuZGFyLXllYXItdmlldz5cbiAgICAgICAgICAgIDxzdWktY2FsZW5kYXItbW9udGgtdmlld1xuICAgICAgICAgICAgICAgIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCIxXCJcbiAgICAgICAgICAgID48L3N1aS1jYWxlbmRhci1tb250aC12aWV3PlxuICAgICAgICAgICAgPHN1aS1jYWxlbmRhci1kYXRlLXZpZXdcbiAgICAgICAgICAgICAgICBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiMlwiXG4gICAgICAgICAgICA+PC9zdWktY2FsZW5kYXItZGF0ZS12aWV3PlxuICAgICAgICAgICAgPHN1aS1jYWxlbmRhci1ob3VyLXZpZXdcbiAgICAgICAgICAgICAgICBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiM1wiXG4gICAgICAgICAgICA+PC9zdWktY2FsZW5kYXItaG91ci12aWV3PlxuICAgICAgICAgICAgPHN1aS1jYWxlbmRhci1taW51dGUtdmlld1xuICAgICAgICAgICAgICAgIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCI0XCJcbiAgICAgICAgICAgID48L3N1aS1jYWxlbmRhci1taW51dGUtdmlldz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyIHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmNhbGVuZGFyXCIpXG4gICAgcHVibGljIGNhbGVuZGFyQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHVibGljIHNlcnZpY2U6Q2FsZW5kYXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBDYWxlbmRhclNlcnZpY2UoXG4gICAgICAgICAgICBuZXcgRGF0ZXRpbWVDb25maWcoKSxcbiAgICAgICAgICAgIF9sb2NhbGl6YXRpb25TZXJ2aWNlLmdldCgpLmRhdGVwaWNrZXJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNhbGVuZGFyQ2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uTW91c2VEb3duKGU6TW91c2VFdmVudCk6dm9pZCB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iXX0=