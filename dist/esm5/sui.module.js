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
var SuiModule = /** @class */ (function () {
    function SuiModule() {
    }
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
    return SuiModule;
}());
export { SuiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbInN1aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsY0FBYztBQUNkLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRWpGLFVBQVU7QUFDVixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsWUFBWTtBQUNaLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRXJGLE9BQU87QUFDUCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWdDM0Q7SUFBQTtJQUF3QixDQUFDO0lBQVosU0FBUztRQTlCckIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGNBQWM7Z0JBQ2QsZ0JBQWdCO2dCQUNoQixtQkFBbUI7Z0JBRW5CLFVBQVU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsbUJBQW1CO2dCQUNuQixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxjQUFjO2dCQUNkLGlCQUFpQjtnQkFDakIsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLG1CQUFtQjtnQkFFbkIsWUFBWTtnQkFDWixxQkFBcUI7Z0JBRXJCLE9BQU87Z0JBQ1AsZ0JBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBRztJQUFELGdCQUFDO0NBQUEsQUFBekIsSUFBeUI7U0FBWixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vLyBDb2xsZWN0aW9uc1xuaW1wb3J0IHsgU3VpTWVzc2FnZU1vZHVsZSB9IGZyb20gXCIuL2NvbGxlY3Rpb25zL21lc3NhZ2UvbWVzc2FnZS5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aVBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tIFwiLi9jb2xsZWN0aW9ucy9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlXCI7XG5cbi8vIE1vZHVsZXNcbmltcG9ydCB7IFN1aUFjY29yZGlvbk1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aUNoZWNrYm94TW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9jaGVja2JveC9jaGVja2JveC5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb25Nb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aVNlbGVjdE1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvc2VsZWN0L3NlbGVjdC5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aVRhYnNNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL3RhYnMvdGFiLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpU2lkZWJhck1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvc2lkZWJhci9zaWRlYmFyLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpU2VhcmNoTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9zZWFyY2gvc2VhcmNoLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpUmF0aW5nTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9yYXRpbmcvcmF0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpUHJvZ3Jlc3NNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL3Byb2dyZXNzL3Byb2dyZXNzLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpUG9wdXBNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL3BvcHVwL3BvcHVwLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpTW9kYWxNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL21vZGFsL21vZGFsLm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBTdWlEcm9wZG93bk1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlEaW1tZXJNb2R1bGUgfSBmcm9tIFwiLi9tb2R1bGVzL2RpbW1lci9kaW1tZXIubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlEYXRlcGlja2VyTW9kdWxlIH0gZnJvbSBcIi4vbW9kdWxlcy9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlDb2xsYXBzZU1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXMvY29sbGFwc2UvY29sbGFwc2UubW9kdWxlXCI7XG5cbi8vIEJlaGF2aW9yc1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uTW9kdWxlIH0gZnJvbSBcIi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9sb2NhbGl6YXRpb24ubW9kdWxlXCI7XG5cbi8vIE1pc2NcbmltcG9ydCB7IFN1aVV0aWxpdHlNb2R1bGUgfSBmcm9tIFwiLi9taXNjL3V0aWwvdXRpbC5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIC8vIENvbGxlY3Rpb25zXG4gICAgICAgIFN1aU1lc3NhZ2VNb2R1bGUsXG4gICAgICAgIFN1aVBhZ2luYXRpb25Nb2R1bGUsXG5cbiAgICAgICAgLy8gTW9kdWxlc1xuICAgICAgICBTdWlBY2NvcmRpb25Nb2R1bGUsXG4gICAgICAgIFN1aUNoZWNrYm94TW9kdWxlLFxuICAgICAgICBTdWlDb2xsYXBzZU1vZHVsZSxcbiAgICAgICAgU3VpRGF0ZXBpY2tlck1vZHVsZSxcbiAgICAgICAgU3VpRGltbWVyTW9kdWxlLFxuICAgICAgICBTdWlEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgU3VpTW9kYWxNb2R1bGUsXG4gICAgICAgIFN1aVBvcHVwTW9kdWxlLFxuICAgICAgICBTdWlQcm9ncmVzc01vZHVsZSxcbiAgICAgICAgU3VpUmF0aW5nTW9kdWxlLFxuICAgICAgICBTdWlTZWFyY2hNb2R1bGUsXG4gICAgICAgIFN1aVNlbGVjdE1vZHVsZSxcbiAgICAgICAgU3VpU2lkZWJhck1vZHVsZSxcbiAgICAgICAgU3VpVGFic01vZHVsZSxcbiAgICAgICAgU3VpVHJhbnNpdGlvbk1vZHVsZSxcblxuICAgICAgICAvLyBCZWhhdmlvcnNcbiAgICAgICAgU3VpTG9jYWxpemF0aW9uTW9kdWxlLFxuXG4gICAgICAgIC8vIE1pc2NcbiAgICAgICAgU3VpVXRpbGl0eU1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpTW9kdWxlIHt9XG4iXX0=