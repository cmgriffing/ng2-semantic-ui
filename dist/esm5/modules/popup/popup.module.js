import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiPopupDirective } from "./directives/popup.directive";
import { SuiPopupArrow } from "./components/popup-arrow";
import { SuiPopup } from "./components/popup";
import { SuiPopupConfig } from "./services/popup.service";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
import { SuiUtilityModule } from "../../misc/util/util.module";
var SuiPopupModule = /** @class */ (function () {
    function SuiPopupModule() {
    }
    SuiPopupModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule, SuiUtilityModule],
            declarations: [SuiPopupDirective, SuiPopupArrow, SuiPopup],
            exports: [SuiPopupDirective, SuiPopup],
            providers: [SuiPopupConfig],
            entryComponents: [SuiPopup]
        })
    ], SuiPopupModule);
    return SuiPopupModule;
}());
export { SuiPopupModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9wb3B1cC9wb3B1cC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBUy9EO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixjQUFjO1FBUDFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQztZQUM5RCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDO1lBQzFELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQztZQUN0QyxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDM0IsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO1NBQzlCLENBQUM7T0FDVyxjQUFjLENBQUc7SUFBRCxxQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBTdWlQb3B1cERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvcG9wdXAuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cEFycm93IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wb3B1cC1hcnJvd1wiO1xuaW1wb3J0IHsgU3VpUG9wdXAgfSBmcm9tIFwiLi9jb21wb25lbnRzL3BvcHVwXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbmZpZyB9IGZyb20gXCIuL3NlcnZpY2VzL3BvcHVwLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL3RyYW5zaXRpb24ubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlVdGlsaXR5TW9kdWxlIH0gZnJvbSBcIi4uLy4uL21pc2MvdXRpbC91dGlsLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFN1aVRyYW5zaXRpb25Nb2R1bGUsIFN1aVV0aWxpdHlNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1N1aVBvcHVwRGlyZWN0aXZlLCBTdWlQb3B1cEFycm93LCBTdWlQb3B1cF0sXG4gICAgZXhwb3J0czogW1N1aVBvcHVwRGlyZWN0aXZlLCBTdWlQb3B1cF0sXG4gICAgcHJvdmlkZXJzOiBbU3VpUG9wdXBDb25maWddLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1N1aVBvcHVwXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlQb3B1cE1vZHVsZSB7fVxuIl19