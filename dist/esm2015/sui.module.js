import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
// Collections
import { SuiMessageModule, SuiPaginationModule } from "./collections";
// Modules
import { SuiAccordionModule, SuiCheckboxModule, SuiCollapseModule, SuiDatepickerModule, SuiDimmerModule, SuiDropdownModule, SuiModalModule, SuiPopupModule, SuiProgressModule, SuiRatingModule, SuiSearchModule, SuiSidebarModule, SuiTabsModule, SuiSelectModule, SuiTransitionModule } from "./modules";
// Behaviors
import { SuiLocalizationModule } from "./behaviors";
// Misc
import { SuiUtilityModule } from "./misc";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbInN1aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsY0FBYztBQUNkLE9BQU8sRUFDSCxnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ3RCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLFVBQVU7QUFDVixPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixtQkFBbUIsRUFDdEIsTUFBTSxXQUFXLENBQUM7QUFFbkIsWUFBWTtBQUNaLE9BQU8sRUFDSCxxQkFBcUIsRUFDeEIsTUFBTSxhQUFhLENBQUM7QUFFckIsT0FBTztBQUNQLE9BQU8sRUFDSCxnQkFBZ0IsRUFDbkIsTUFBTSxRQUFRLENBQUM7QUFnQ2hCLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7Q0FBRyxDQUFBO0FBQVosU0FBUztJQTlCckIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsY0FBYztZQUNkLGdCQUFnQjtZQUNoQixtQkFBbUI7WUFFbkIsVUFBVTtZQUNWLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLG1CQUFtQjtZQUNuQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZixlQUFlO1lBQ2YsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsbUJBQW1CO1lBRW5CLFlBQVk7WUFDWixxQkFBcUI7WUFFckIsT0FBTztZQUNQLGdCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUc7U0FBWixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vLyBDb2xsZWN0aW9uc1xuaW1wb3J0IHtcbiAgICBTdWlNZXNzYWdlTW9kdWxlLFxuICAgIFN1aVBhZ2luYXRpb25Nb2R1bGVcbn0gZnJvbSBcIi4vY29sbGVjdGlvbnNcIjtcblxuLy8gTW9kdWxlc1xuaW1wb3J0IHtcbiAgICBTdWlBY2NvcmRpb25Nb2R1bGUsXG4gICAgU3VpQ2hlY2tib3hNb2R1bGUsXG4gICAgU3VpQ29sbGFwc2VNb2R1bGUsXG4gICAgU3VpRGF0ZXBpY2tlck1vZHVsZSxcbiAgICBTdWlEaW1tZXJNb2R1bGUsXG4gICAgU3VpRHJvcGRvd25Nb2R1bGUsXG4gICAgU3VpTW9kYWxNb2R1bGUsXG4gICAgU3VpUG9wdXBNb2R1bGUsXG4gICAgU3VpUHJvZ3Jlc3NNb2R1bGUsXG4gICAgU3VpUmF0aW5nTW9kdWxlLFxuICAgIFN1aVNlYXJjaE1vZHVsZSxcbiAgICBTdWlTaWRlYmFyTW9kdWxlLFxuICAgIFN1aVRhYnNNb2R1bGUsXG4gICAgU3VpU2VsZWN0TW9kdWxlLFxuICAgIFN1aVRyYW5zaXRpb25Nb2R1bGVcbn0gZnJvbSBcIi4vbW9kdWxlc1wiO1xuXG4vLyBCZWhhdmlvcnNcbmltcG9ydCB7XG4gICAgU3VpTG9jYWxpemF0aW9uTW9kdWxlXG59IGZyb20gXCIuL2JlaGF2aW9yc1wiO1xuXG4vLyBNaXNjXG5pbXBvcnQge1xuICAgIFN1aVV0aWxpdHlNb2R1bGVcbn0gZnJvbSBcIi4vbWlzY1wiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgLy8gQ29sbGVjdGlvbnNcbiAgICAgICAgU3VpTWVzc2FnZU1vZHVsZSxcbiAgICAgICAgU3VpUGFnaW5hdGlvbk1vZHVsZSxcblxuICAgICAgICAvLyBNb2R1bGVzXG4gICAgICAgIFN1aUFjY29yZGlvbk1vZHVsZSxcbiAgICAgICAgU3VpQ2hlY2tib3hNb2R1bGUsXG4gICAgICAgIFN1aUNvbGxhcHNlTW9kdWxlLFxuICAgICAgICBTdWlEYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBTdWlEaW1tZXJNb2R1bGUsXG4gICAgICAgIFN1aURyb3Bkb3duTW9kdWxlLFxuICAgICAgICBTdWlNb2RhbE1vZHVsZSxcbiAgICAgICAgU3VpUG9wdXBNb2R1bGUsXG4gICAgICAgIFN1aVByb2dyZXNzTW9kdWxlLFxuICAgICAgICBTdWlSYXRpbmdNb2R1bGUsXG4gICAgICAgIFN1aVNlYXJjaE1vZHVsZSxcbiAgICAgICAgU3VpU2VsZWN0TW9kdWxlLFxuICAgICAgICBTdWlTaWRlYmFyTW9kdWxlLFxuICAgICAgICBTdWlUYWJzTW9kdWxlLFxuICAgICAgICBTdWlUcmFuc2l0aW9uTW9kdWxlLFxuXG4gICAgICAgIC8vIEJlaGF2aW9yc1xuICAgICAgICBTdWlMb2NhbGl6YXRpb25Nb2R1bGUsXG5cbiAgICAgICAgLy8gTWlzY1xuICAgICAgICBTdWlVdGlsaXR5TW9kdWxlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlNb2R1bGUge31cbiJdfQ==