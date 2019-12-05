import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
// Collections
import { SuiMessageModule } from "./collections/message/message.module";
import { SuiPaginationModule } from "./collections/pagination/pagination.module";
// Modules
import { SuiAccordionModule } from "./modules/accordion/accordion.module";
import { SuiCheckboxModule } from "./modules/checkbox/checkbox.module";
import { SuiTransitionModule } from "./modules/transition/transition.module";
import { SuiSelectModule } from "./modules/select/select.module";
import { SuiTabsModule } from "./modules/tabs/tab.module";
import { SuiSidebarModule } from "./modules/sidebar/sidebar.module";
import { SuiSearchModule } from "./modules/search/search.module";
import { SuiRatingModule } from "./modules/rating/rating.module";
import { SuiProgressModule } from "./modules/progress/progress.module";
import { SuiPopupModule } from "./modules/popup/popup.module";
import { SuiModalModule } from "./modules/modal/modal.module";
import { SuiDropdownModule } from "./modules/dropdown/dropdown.module";
import { SuiDimmerModule } from "./modules/dimmer/dimmer.module";
import { SuiDatepickerModule } from "./modules/datepicker/datepicker.module";
import { SuiCollapseModule } from "./modules/collapse/collapse.module";
// Behaviors
import { SuiLocalizationModule } from "./behaviors/localization/localization.module";
// Misc
import { SuiUtilityModule } from "./misc/util/util.module";
let SuiModule = class SuiModule {
};
SuiModule = tslib_1.__decorate([
    NgModule({
        exports: [
            // Collections
            SuiMessageModule,
            SuiPaginationModule,
            // Modules
            SuiAccordionModule,
            SuiCheckboxModule,
            SuiCollapseModule,
            SuiDatepickerModule,
            SuiDimmerModule,
            SuiDropdownModule,
            SuiModalModule,
            SuiPopupModule,
            SuiProgressModule,
            SuiRatingModule,
            SuiSearchModule,
            SuiSelectModule,
            SuiSidebarModule,
            SuiTabsModule,
            SuiTransitionModule,
            // Behaviors
            SuiLocalizationModule,
            // Misc
            SuiUtilityModule
        ]
    })
], SuiModule);
export { SuiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbInN1aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsY0FBYztBQUNkLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRWpGLFVBQVU7QUFDVixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsWUFBWTtBQUNaLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRXJGLE9BQU87QUFDUCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWdDM0QsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztDQUFHLENBQUE7QUFBWixTQUFTO0lBOUJyQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtZQUVuQixVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsbUJBQW1CO1lBQ25CLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsY0FBYztZQUNkLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsZUFBZTtZQUNmLGVBQWU7WUFDZixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixtQkFBbUI7WUFFbkIsWUFBWTtZQUNaLHFCQUFxQjtZQUVyQixPQUFPO1lBQ1AsZ0JBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBRztTQUFaLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8vIENvbGxlY3Rpb25zXG5pbXBvcnQgeyBTdWlNZXNzYWdlTW9kdWxlIH0gZnJvbSBcIi4vY29sbGVjdGlvbnMvbWVzc2FnZS9tZXNzYWdlLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpUGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gXCIuL2NvbGxlY3Rpb25zL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGVcIjtcblxuLy8gTW9kdWxlc1xuaW1wb3J0IHsgU3VpQWNjb3JkaW9uTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpQ2hlY2tib3hNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL2NoZWNrYm94L2NoZWNrYm94Lm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpVHJhbnNpdGlvbk1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvdHJhbnNpdGlvbi90cmFuc2l0aW9uLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpU2VsZWN0TW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpVGFic01vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvdGFicy90YWIubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlTaWRlYmFyTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9zaWRlYmFyL3NpZGViYXIubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlTZWFyY2hNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL3NlYXJjaC9zZWFyY2gubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlSYXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL3JhdGluZy9yYXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlQcm9ncmVzc01vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvcHJvZ3Jlc3MvcHJvZ3Jlc3MubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cE1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvcG9wdXAvcG9wdXAubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlNb2RhbE1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvbW9kYWwvbW9kYWwubW9kdWxlXCI7XG5cbmltcG9ydCB7IFN1aURyb3Bkb3duTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aURpbW1lck1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvZGltbWVyL2RpbW1lci5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aURhdGVwaWNrZXJNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aUNvbGxhcHNlTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGVcIjtcblxuLy8gQmVoYXZpb3JzXG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25Nb2R1bGUgfSBmcm9tIFwiLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2xvY2FsaXphdGlvbi5tb2R1bGVcIjtcblxuLy8gTWlzY1xuaW1wb3J0IHsgU3VpVXRpbGl0eU1vZHVsZSB9IGZyb20gXCIuL21pc2MvdXRpbC91dGlsLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgLy8gQ29sbGVjdGlvbnNcbiAgICAgICAgU3VpTWVzc2FnZU1vZHVsZSxcbiAgICAgICAgU3VpUGFnaW5hdGlvbk1vZHVsZSxcblxuICAgICAgICAvLyBNb2R1bGVzXG4gICAgICAgIFN1aUFjY29yZGlvbk1vZHVsZSxcbiAgICAgICAgU3VpQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFN1aUNvbGxhcHNlTW9kdWxlLFxuICAgICAgICBTdWlEYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBTdWlEaW1tZXJNb2R1bGUsXG4gICAgICAgIFN1aURyb3Bkb3duTW9kdWxlLFxuICAgICAgICBTdWlNb2RhbE1vZHVsZSxcbiAgICAgICAgU3VpUG9wdXBNb2R1bGUsXG4gICAgICAgIFN1aVByb2dyZXNzTW9kdWxlLFxuICAgICAgICBTdWlSYXRpbmdNb2R1bGUsXG4gICAgICAgIFN1aVNlYXJjaE1vZHVsZSxcbiAgICAgICAgU3VpU2VsZWN0TW9kdWxlLFxuICAgICAgICBTdWlTaWRlYmFyTW9kdWxlLFxuICAgICAgICBTdWlUYWJzTW9kdWxlLFxuICAgICAgICBTdWlUcmFuc2l0aW9uTW9kdWxlLFxuXG4gICAgICAgIC8vIEJlaGF2aW9yc1xuICAgICAgICBTdWlMb2NhbGl6YXRpb25Nb2R1bGUsXG5cbiAgICAgICAgLy8gTWlzY1xuICAgICAgICBTdWlVdGlsaXR5TW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlNb2R1bGUge31cbiJdfQ==