import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../transition/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiPopupDirective } from "./directives/popup.directive";
import { SuiPopupArrow } from "./components/popup-arrow";
import { SuiPopup } from "./components/popup";
import { SuiPopupConfig } from "./services/popup.service";
let SuiPopupModule = class SuiPopupModule {
};
SuiPopupModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiTransitionModule,
            SuiUtilityModule
        ],
        declarations: [
            SuiPopupDirective,
            SuiPopupArrow,
            SuiPopup
        ],
        exports: [
            SuiPopupDirective,
            SuiPopup
        ],
        providers: [
            SuiPopupConfig
        ],
        entryComponents: [
            SuiPopup
        ]
    })
], SuiPopupModule);
export { SuiPopupModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9wb3B1cC9wb3B1cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBeUIxRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUcsQ0FBQTtBQUFqQixjQUFjO0lBdkIxQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGdCQUFnQjtTQUNuQjtRQUNELFlBQVksRUFBRTtZQUNWLGlCQUFpQjtZQUNqQixhQUFhO1lBQ2IsUUFBUTtTQUNYO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsaUJBQWlCO1lBQ2pCLFFBQVE7U0FDWDtRQUNELFNBQVMsRUFBRTtZQUNQLGNBQWM7U0FDakI7UUFDRCxlQUFlLEVBQUU7WUFDYixRQUFRO1NBQ1g7S0FDSixDQUFDO0dBRVcsY0FBYyxDQUFHO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBTdWlUcmFuc2l0aW9uTW9kdWxlIH0gZnJvbSBcIi4uL3RyYW5zaXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aVV0aWxpdHlNb2R1bGUgfSBmcm9tIFwiLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlQb3B1cERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvcG9wdXAuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cEFycm93IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wb3B1cC1hcnJvd1wiO1xuaW1wb3J0IHsgU3VpUG9wdXAgfSBmcm9tIFwiLi9jb21wb25lbnRzL3BvcHVwXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbmZpZyB9IGZyb20gXCIuL3NlcnZpY2VzL3BvcHVwLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgU3VpVHJhbnNpdGlvbk1vZHVsZSxcbiAgICAgICAgU3VpVXRpbGl0eU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aVBvcHVwRGlyZWN0aXZlLFxuICAgICAgICBTdWlQb3B1cEFycm93LFxuICAgICAgICBTdWlQb3B1cFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTdWlQb3B1cERpcmVjdGl2ZSxcbiAgICAgICAgU3VpUG9wdXBcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTdWlQb3B1cENvbmZpZ1xuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFN1aVBvcHVwXG4gICAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFN1aVBvcHVwTW9kdWxlIHt9XG4iXX0=