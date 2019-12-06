import * as tslib_1 from "tslib";
import { Component, HostBinding, HostListener } from "@angular/core";
import { CalendarService } from "./../services/calendar.service";
import { DatetimeConfig } from "../classes/calendar-config";
import { SuiLocalizationService } from "../../../behaviors/localization/index";
export var DatepickerMode = {
    Year: "year",
    Month: "month",
    Date: "date",
    Datetime: "datetime",
    Time: "time"
};
var SuiDatepicker = /** @class */ (function () {
    function SuiDatepicker(localizationService) {
        this.service = new CalendarService(new DatetimeConfig(), localizationService.get().datepicker);
        this.calendarClasses = true;
    }
    SuiDatepicker.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiDatepicker.ctorParameters = function () { return [
        { type: SuiLocalizationService }
    ]; };
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
            template: "\n        <ng-container [ngSwitch]=\"service.currentView\">\n            <sui-calendar-year-view\n                [service]=\"service\"\n                *ngSwitchCase=\"0\"\n            ></sui-calendar-year-view>\n            <sui-calendar-month-view\n                [service]=\"service\"\n                *ngSwitchCase=\"1\"\n            ></sui-calendar-month-view>\n            <sui-calendar-date-view\n                [service]=\"service\"\n                *ngSwitchCase=\"2\"\n            ></sui-calendar-date-view>\n            <sui-calendar-hour-view\n                [service]=\"service\"\n                *ngSwitchCase=\"3\"\n            ></sui-calendar-hour-view>\n            <sui-calendar-minute-view\n                [service]=\"service\"\n                *ngSwitchCase=\"4\"\n            ></sui-calendar-minute-view>\n        </ng-container>\n    ",
            styles: ["\n            :host {\n                user-select: none;\n            }\n        "]
        })
    ], SuiDatepicker);
    return SuiDatepicker;
}());
export { SuiDatepicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9jb21wb25lbnRzL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBSS9FLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRztJQUMxQixJQUFJLEVBQUUsTUFBd0I7SUFDOUIsS0FBSyxFQUFFLE9BQXlCO0lBQ2hDLElBQUksRUFBRSxNQUF3QjtJQUM5QixRQUFRLEVBQUUsVUFBNEI7SUFDdEMsSUFBSSxFQUFFLE1BQXdCO0NBQ2pDLENBQUM7QUFvQ0Y7SUFRSSx1QkFBWSxtQkFBMEM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FDOUIsSUFBSSxjQUFjLEVBQUUsRUFDcEIsbUJBQW1CLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUN2QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUdNLG1DQUFXLEdBQWxCLFVBQW1CLENBQVk7UUFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7O2dCQVorQixzQkFBc0I7O0lBSnREO1FBSEMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QixXQUFXLENBQUMsY0FBYyxDQUFDO1FBQzNCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzswREFDQztJQWMvQjtRQURDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvREFHckM7SUFwQlEsYUFBYTtRQWxDekIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsKzFCQXVCVDtxQkFFRyxvRkFJQztTQUVSLENBQUM7T0FDVyxhQUFhLENBcUJ6QjtJQUFELG9CQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tIFwiLi8uLi9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRldGltZUNvbmZpZyB9IGZyb20gXCIuLi9jbGFzc2VzL2NhbGVuZGFyLWNvbmZpZ1wiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2luZGV4XCI7XG5cbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJNb2RlID0gXCJ5ZWFyXCIgfCBcIm1vbnRoXCIgfCBcImRhdGVcIiB8IFwiZGF0ZXRpbWVcIiB8IFwidGltZVwiO1xuXG5leHBvcnQgY29uc3QgRGF0ZXBpY2tlck1vZGUgPSB7XG4gICAgWWVhcjogXCJ5ZWFyXCIgYXMgRGF0ZXBpY2tlck1vZGUsXG4gICAgTW9udGg6IFwibW9udGhcIiBhcyBEYXRlcGlja2VyTW9kZSxcbiAgICBEYXRlOiBcImRhdGVcIiBhcyBEYXRlcGlja2VyTW9kZSxcbiAgICBEYXRldGltZTogXCJkYXRldGltZVwiIGFzIERhdGVwaWNrZXJNb2RlLFxuICAgIFRpbWU6IFwidGltZVwiIGFzIERhdGVwaWNrZXJNb2RlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktZGF0ZXBpY2tlclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInNlcnZpY2UuY3VycmVudFZpZXdcIj5cbiAgICAgICAgICAgIDxzdWktY2FsZW5kYXIteWVhci12aWV3XG4gICAgICAgICAgICAgICAgW3NlcnZpY2VdPVwic2VydmljZVwiXG4gICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIjBcIlxuICAgICAgICAgICAgPjwvc3VpLWNhbGVuZGFyLXllYXItdmlldz5cbiAgICAgICAgICAgIDxzdWktY2FsZW5kYXItbW9udGgtdmlld1xuICAgICAgICAgICAgICAgIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCIxXCJcbiAgICAgICAgICAgID48L3N1aS1jYWxlbmRhci1tb250aC12aWV3PlxuICAgICAgICAgICAgPHN1aS1jYWxlbmRhci1kYXRlLXZpZXdcbiAgICAgICAgICAgICAgICBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiMlwiXG4gICAgICAgICAgICA+PC9zdWktY2FsZW5kYXItZGF0ZS12aWV3PlxuICAgICAgICAgICAgPHN1aS1jYWxlbmRhci1ob3VyLXZpZXdcbiAgICAgICAgICAgICAgICBbc2VydmljZV09XCJzZXJ2aWNlXCJcbiAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiM1wiXG4gICAgICAgICAgICA+PC9zdWktY2FsZW5kYXItaG91ci12aWV3PlxuICAgICAgICAgICAgPHN1aS1jYWxlbmRhci1taW51dGUtdmlld1xuICAgICAgICAgICAgICAgIFtzZXJ2aWNlXT1cInNlcnZpY2VcIlxuICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCI0XCJcbiAgICAgICAgICAgID48L3N1aS1jYWxlbmRhci1taW51dGUtdmlldz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEYXRlcGlja2VyIHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmNhbGVuZGFyXCIpXG4gICAgcHVibGljIGNhbGVuZGFyQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHVibGljIHNlcnZpY2U6Q2FsZW5kYXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IobG9jYWxpemF0aW9uU2VydmljZTpTdWlMb2NhbGl6YXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBDYWxlbmRhclNlcnZpY2UoXG4gICAgICAgICAgICBuZXcgRGF0ZXRpbWVDb25maWcoKSxcbiAgICAgICAgICAgIGxvY2FsaXphdGlvblNlcnZpY2UuZ2V0KCkuZGF0ZXBpY2tlclxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY2FsZW5kYXJDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2Vkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25Nb3VzZURvd24oZTpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cbiJdfQ==