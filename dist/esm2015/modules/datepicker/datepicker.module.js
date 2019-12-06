import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiPopupModule } from "../popup/index";
import { SuiLocalizationModule } from "../../behaviors/localization/index";
import { SuiUtilityModule } from "../../misc/util/index";
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
        entryComponents: [
            SuiDatepicker
        ]
    })
], SuiDatepickerModule);
export { SuiDatepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQ0gsc0JBQXNCLEVBQUUsbUNBQW1DLEVBQzNELCtCQUErQixFQUNsQyxNQUFNLG1DQUFtQyxDQUFDO0FBb0MzQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtDQUFHLENBQUE7QUFBdEIsbUJBQW1CO0lBbEMvQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWM7WUFDZCxxQkFBcUI7WUFDckIsZ0JBQWdCO1NBQ25CO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsZUFBZTtZQUVmLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIscUJBQXFCO1lBRXJCLGFBQWE7WUFDYixzQkFBc0I7WUFDdEIsbUNBQW1DO1lBQ25DLCtCQUErQjtZQUMvQiwyQkFBMkI7U0FDOUI7UUFDRCxPQUFPLEVBQUU7WUFDTCxzQkFBc0I7WUFDdEIsbUNBQW1DO1lBQ25DLCtCQUErQjtZQUMvQiwyQkFBMkI7U0FDOUI7UUFDRCxlQUFlLEVBQUU7WUFDYixhQUFhO1NBQ2hCO0tBQ0osQ0FBQztHQUNXLG1CQUFtQixDQUFHO1NBQXRCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBTdWlQb3B1cE1vZHVsZSB9IGZyb20gXCIuLi9wb3B1cC9pbmRleFwiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aVV0aWxpdHlNb2R1bGUgfSBmcm9tIFwiLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlDYWxlbmRhclZpZXdUaXRsZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvY2FsZW5kYXItdmlldy10aXRsZVwiO1xuaW1wb3J0IHsgU3VpQ2FsZW5kYXJZZWFyVmlldyB9IGZyb20gXCIuL3ZpZXdzL3llYXItdmlld1wiO1xuaW1wb3J0IHsgU3VpQ2FsZW5kYXJNb250aFZpZXcgfSBmcm9tIFwiLi92aWV3cy9tb250aC12aWV3XCI7XG5pbXBvcnQgeyBTdWlDYWxlbmRhckl0ZW0gfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NhbGVuZGFyLWl0ZW1cIjtcbmltcG9ydCB7IFN1aUNhbGVuZGFyRGF0ZVZpZXcgfSBmcm9tIFwiLi92aWV3cy9kYXRlLXZpZXdcIjtcbmltcG9ydCB7IFN1aURhdGVwaWNrZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL2RhdGVwaWNrZXJcIjtcbmltcG9ydCB7IFN1aUNhbGVuZGFySG91clZpZXcgfSBmcm9tIFwiLi92aWV3cy9ob3VyLXZpZXdcIjtcbmltcG9ydCB7IFN1aUNhbGVuZGFyTWludXRlVmlldyB9IGZyb20gXCIuL3ZpZXdzL21pbnV0ZS12aWV3XCI7XG5pbXBvcnQgeyBTdWlEYXRlcGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2lucHV0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtcbiAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlLCBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvcixcbiAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsaWRhdG9yXG59IGZyb20gXCIuL2RpcmVjdGl2ZXMvZGF0ZXBpY2tlci5kaXJlY3RpdmVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFN1aVBvcHVwTW9kdWxlLFxuICAgICAgICBTdWlMb2NhbGl6YXRpb25Nb2R1bGUsXG4gICAgICAgIFN1aVV0aWxpdHlNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTdWlDYWxlbmRhckl0ZW0sXG5cbiAgICAgICAgU3VpQ2FsZW5kYXJWaWV3VGl0bGUsXG4gICAgICAgIFN1aUNhbGVuZGFyWWVhclZpZXcsXG4gICAgICAgIFN1aUNhbGVuZGFyTW9udGhWaWV3LFxuICAgICAgICBTdWlDYWxlbmRhckRhdGVWaWV3LFxuICAgICAgICBTdWlDYWxlbmRhckhvdXJWaWV3LFxuICAgICAgICBTdWlDYWxlbmRhck1pbnV0ZVZpZXcsXG5cbiAgICAgICAgU3VpRGF0ZXBpY2tlcixcbiAgICAgICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aURhdGVwaWNrZXJEaXJlY3RpdmVWYWxpZGF0b3IsXG4gICAgICAgIFN1aURhdGVwaWNrZXJJbnB1dERpcmVjdGl2ZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBTdWlEYXRlcGlja2VyRGlyZWN0aXZlVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpRGF0ZXBpY2tlckRpcmVjdGl2ZVZhbGlkYXRvcixcbiAgICAgICAgU3VpRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgU3VpRGF0ZXBpY2tlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGF0ZXBpY2tlck1vZHVsZSB7fVxuIl19