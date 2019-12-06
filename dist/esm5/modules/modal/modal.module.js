import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmerModule } from "../dimmer/index";
import { SuiTransitionModule } from "../transition/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";
var SuiModalModule = /** @class */ (function () {
    function SuiModalModule() {
    }
    SuiModalModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                SuiDimmerModule,
                SuiTransitionModule,
                SuiUtilityModule
            ],
            declarations: [
                SuiModal
            ],
            exports: [
                SuiModal
            ],
            providers: [
                SuiModalService
            ],
            entryComponents: [
                SuiModal
            ]
        })
    ], SuiModalModule);
    return SuiModalModule;
}());
export { SuiModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBc0I5QztJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQXBCMUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osZUFBZTtnQkFDZixtQkFBbUI7Z0JBQ25CLGdCQUFnQjthQUNuQjtZQUNELFlBQVksRUFBRTtnQkFDVixRQUFRO2FBQ1g7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsUUFBUTthQUNYO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGVBQWU7YUFDbEI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsUUFBUTthQUNYO1NBQ0osQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFN1aURpbW1lck1vZHVsZSB9IGZyb20gXCIuLi9kaW1tZXIvaW5kZXhcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9pbmRleFwiO1xuaW1wb3J0IHsgU3VpVXRpbGl0eU1vZHVsZSB9IGZyb20gXCIuLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IFN1aU1vZGFsU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL21vZGFsLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1aU1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9tb2RhbFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBTdWlEaW1tZXJNb2R1bGUsXG4gICAgICAgIFN1aVRyYW5zaXRpb25Nb2R1bGUsXG4gICAgICAgIFN1aVV0aWxpdHlNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTdWlNb2RhbFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTdWlNb2RhbFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFN1aU1vZGFsU2VydmljZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFN1aU1vZGFsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlNb2RhbE1vZHVsZSB7fVxuIl19