import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmerModule } from "../dimmer/index";
import { SuiTransitionModule } from "../transition/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";
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
export { SuiModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBc0I5QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUcsQ0FBQTtBQUFqQixjQUFjO0lBcEIxQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osZUFBZTtZQUNmLG1CQUFtQjtZQUNuQixnQkFBZ0I7U0FDbkI7UUFDRCxZQUFZLEVBQUU7WUFDVixRQUFRO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDTCxRQUFRO1NBQ1g7UUFDRCxTQUFTLEVBQUU7WUFDUCxlQUFlO1NBQ2xCO1FBQ0QsZUFBZSxFQUFFO1lBQ2IsUUFBUTtTQUNYO0tBQ0osQ0FBQztHQUNXLGNBQWMsQ0FBRztTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU3VpRGltbWVyTW9kdWxlIH0gZnJvbSBcIi4uL2RpbW1lci9pbmRleFwiO1xuaW1wb3J0IHsgU3VpVHJhbnNpdGlvbk1vZHVsZSB9IGZyb20gXCIuLi90cmFuc2l0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlVdGlsaXR5TW9kdWxlIH0gZnJvbSBcIi4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHsgU3VpTW9kYWxTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvbW9kYWwuc2VydmljZVwiO1xuaW1wb3J0IHsgU3VpTW9kYWwgfSBmcm9tIFwiLi9jb21wb25lbnRzL21vZGFsXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFN1aURpbW1lck1vZHVsZSxcbiAgICAgICAgU3VpVHJhbnNpdGlvbk1vZHVsZSxcbiAgICAgICAgU3VpVXRpbGl0eU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aU1vZGFsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN1aU1vZGFsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgU3VpTW9kYWxTZXJ2aWNlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgU3VpTW9kYWxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aU1vZGFsTW9kdWxlIHt9XG4iXX0=