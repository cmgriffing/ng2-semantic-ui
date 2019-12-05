import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiCalendarViewTitle } from "./components/calendar-view-title";
import { SuiCalendarYearView } from "./views/year-view";
import { SuiCalendarMonthView } from "./views/month-view";
import { SuiCalendarItem } from "./directives/calendar-item";
import { SuiCalendarDateView } from "./views/date-view";
import { SuiDatepicker } from "./components/datepicker";
import { SuiCalendarHourView } from "./views/hour-view";
import { SuiCalendarMinuteView } from "./views/minute-view";
import { SuiDatepickerInputDirective } from "./directives/input.directive";
import { SuiDatepickerDirective, SuiDatepickerDirectiveValueAccessor, SuiDatepickerDirectiveValidator } from "./directives/datepicker.directive";
import { SuiPopupModule } from "../../modules/popup/popup.module";
import { SuiLocalizationModule } from "../../behaviors/localization/localization.module";
import { SuiUtilityModule } from "../../misc/util/util.module";
let SuiDatepickerModule = class SuiDatepickerModule {
};
SuiDatepickerModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            SuiPopupModule,
            SuiLocalizationModule,
            SuiUtilityModule
        ],
        declarations: [
            SuiCalendarItem,
            SuiCalendarViewTitle,
            SuiCalendarYearView,
            SuiCalendarMonthView,
            SuiCalendarDateView,
            SuiCalendarHourView,
            SuiCalendarMinuteView,
            SuiDatepicker,
            SuiDatepickerDirective,
            SuiDatepickerDirectiveValueAccessor,
            SuiDatepickerDirectiveValidator,
            SuiDatepickerInputDirective
        ],
        exports: [
            SuiDatepickerDirective,
            SuiDatepickerDirectiveValueAccessor,
            SuiDatepickerDirectiveValidator,
            SuiDatepickerInputDirective
        ],
        entryComponents: [SuiDatepicker]
    })
], SuiDatepickerModule);
export { SuiDatepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNFLE9BQU8sRUFDSCxzQkFBc0IsRUFDdEIsbUNBQW1DLEVBQ25DLCtCQUErQixFQUNsQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQWtDL0QsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7Q0FBRyxDQUFBO0FBQXRCLG1CQUFtQjtJQWhDL0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1lBQ2QscUJBQXFCO1lBQ3JCLGdCQUFnQjtTQUNuQjtRQUNELFlBQVksRUFBRTtZQUNWLGVBQWU7WUFFZixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUVyQixhQUFhO1lBQ2Isc0JBQXNCO1lBQ3RCLG1DQUFtQztZQUNuQywrQkFBK0I7WUFDL0IsMkJBQTJCO1NBQzlCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsc0JBQXNCO1lBQ3RCLG1DQUFtQztZQUNuQywrQkFBK0I7WUFDL0IsMkJBQTJCO1NBQzlCO1FBQ0QsZUFBZSxFQUFFLENBQUMsYUFBYSxDQUFDO0tBQ25DLENBQUM7R0FDVyxtQkFBbUIsQ0FBRztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgU3VpQ2FsZW5kYXJWaWV3VGl0bGUgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NhbGVuZGFyLXZpZXctdGl0bGVcIjtcbmltcG9ydCB7IFN1aUNhbGVuZGFyWWVhclZpZXcgfSBmcm9tIFwiLi92aWV3cy95ZWFyLXZpZXdcIjtcbmltcG9ydCB7IFN1aUNhbGVuZGFyTW9udGhWaWV3IH0gZnJvbSBcIi4vdmlld3MvbW9udGgtdmlld1wiO1xuaW1wb3J0IHsgU3VpQ2FsZW5kYXJJdGVtIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jYWxlbmRhci1pdGVtXCI7XG5pbXBvcnQgeyBTdWlDYWxlbmRhckRhdGVWaWV3IH0gZnJvbSBcIi4vdmlld3MvZGF0ZS12aWV3XCI7XG5pbXBvcnQgeyBTdWlEYXRlcGlja2VyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9kYXRlcGlja2VyXCI7XG5pbXBvcnQgeyBTdWlDYWxlbmRhckhvdXJWaWV3IH0gZnJvbSBcIi4vdmlld3MvaG91ci12aWV3XCI7XG5pbXBvcnQgeyBTdWlDYWxlbmRhck1pbnV0ZVZpZXcgfSBmcm9tIFwiLi92aWV3cy9taW51dGUtdmlld1wiO1xuaW1wb3J0IHsgU3VpRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7XG4gICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvcixcbiAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsaWRhdG9yXG59IGZyb20gXCIuL2RpcmVjdGl2ZXMvZGF0ZXBpY2tlci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFN1aVBvcHVwTW9kdWxlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvcG9wdXAvcG9wdXAubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9sb2NhbGl6YXRpb24ubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlVdGlsaXR5TW9kdWxlIH0gZnJvbSBcIi4uLy4uL21pc2MvdXRpbC91dGlsLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgU3VpUG9wdXBNb2R1bGUsXG4gICAgICAgIFN1aUxvY2FsaXphdGlvbk1vZHVsZSxcbiAgICAgICAgU3VpVXRpbGl0eU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aUNhbGVuZGFySXRlbSxcblxuICAgICAgICBTdWlDYWxlbmRhclZpZXdUaXRsZSxcbiAgICAgICAgU3VpQ2FsZW5kYXJZZWFyVmlldyxcbiAgICAgICAgU3VpQ2FsZW5kYXJNb250aFZpZXcsXG4gICAgICAgIFN1aUNhbGVuZGFyRGF0ZVZpZXcsXG4gICAgICAgIFN1aUNhbGVuZGFySG91clZpZXcsXG4gICAgICAgIFN1aUNhbGVuZGFyTWludXRlVmlldyxcblxuICAgICAgICBTdWlEYXRlcGlja2VyLFxuICAgICAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbGlkYXRvcixcbiAgICAgICAgU3VpRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN1aURhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWx1ZUFjY2Vzc29yLFxuICAgICAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsaWRhdG9yLFxuICAgICAgICBTdWlEYXRlcGlja2VySW5wdXREaXJlY3RpdmVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1N1aURhdGVwaWNrZXJdXG59KVxuZXhwb3J0IGNsYXNzIFN1aURhdGVwaWNrZXJNb2R1bGUge31cbiJdfQ==