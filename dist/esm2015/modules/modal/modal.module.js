import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";
import { SuiDimmerModule } from "../../modules/dimmer/dimmer.module";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
import { SuiUtilityModule } from "../../misc/util/util.module";
let SuiModalModule = class SuiModalModule {
};
SuiModalModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiDimmerModule,
            SuiTransitionModule,
            SuiUtilityModule
        ],
        declarations: [SuiModal],
        exports: [SuiModal],
        providers: [SuiModalService],
        entryComponents: [SuiModal]
    })
], SuiModalModule);
export { SuiModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBYy9ELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBRyxDQUFBO0FBQWpCLGNBQWM7SUFaMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsZ0JBQWdCO1NBQ25CO1FBQ0QsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDNUIsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQzlCLENBQUM7R0FDVyxjQUFjLENBQUc7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFN1aU1vZGFsU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL21vZGFsLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1aU1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9tb2RhbFwiO1xuaW1wb3J0IHsgU3VpRGltbWVyTW9kdWxlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZGltbWVyL2RpbW1lci5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL3RyYW5zaXRpb24ubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlVdGlsaXR5TW9kdWxlIH0gZnJvbSBcIi4uLy4uL21pc2MvdXRpbC91dGlsLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBTdWlEaW1tZXJNb2R1bGUsXG4gICAgICAgIFN1aVRyYW5zaXRpb25Nb2R1bGUsXG4gICAgICAgIFN1aVV0aWxpdHlNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1N1aU1vZGFsXSxcbiAgICBleHBvcnRzOiBbU3VpTW9kYWxdLFxuICAgIHByb3ZpZGVyczogW1N1aU1vZGFsU2VydmljZV0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbU3VpTW9kYWxdXG59KVxuZXhwb3J0IGNsYXNzIFN1aU1vZGFsTW9kdWxlIHt9XG4iXX0=