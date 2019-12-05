import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDropdown } from "./directives/dropdown";
import { SuiDropdownMenu, SuiDropdownMenuItem } from "./directives/dropdown-menu";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
var SuiDropdownModule = /** @class */ (function () {
    function SuiDropdownModule() {
    }
    SuiDropdownModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule],
            declarations: [SuiDropdown, SuiDropdownMenu, SuiDropdownMenuItem],
            exports: [SuiDropdown, SuiDropdownMenu, SuiDropdownMenuItem]
        })
    ], SuiDropdownModule);
    return SuiDropdownModule;
}());
export { SuiDropdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0gsZUFBZSxFQUNmLG1CQUFtQixFQUN0QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBT2pGO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixpQkFBaUI7UUFMN0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO1lBQzVDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLENBQUM7WUFDakUsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQztTQUMvRCxDQUFDO09BQ1csaUJBQWlCLENBQUc7SUFBRCx3QkFBQztDQUFBLEFBQWpDLElBQWlDO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFN1aURyb3Bkb3duIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9kcm9wZG93blwiO1xuaW1wb3J0IHtcbiAgICBTdWlEcm9wZG93bk1lbnUsXG4gICAgU3VpRHJvcGRvd25NZW51SXRlbVxufSBmcm9tIFwiLi9kaXJlY3RpdmVzL2Ryb3Bkb3duLW1lbnVcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL3RyYW5zaXRpb24ubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU3VpVHJhbnNpdGlvbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3VpRHJvcGRvd24sIFN1aURyb3Bkb3duTWVudSwgU3VpRHJvcGRvd25NZW51SXRlbV0sXG4gICAgZXhwb3J0czogW1N1aURyb3Bkb3duLCBTdWlEcm9wZG93bk1lbnUsIFN1aURyb3Bkb3duTWVudUl0ZW1dXG59KVxuZXhwb3J0IGNsYXNzIFN1aURyb3Bkb3duTW9kdWxlIHt9XG4iXX0=