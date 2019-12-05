import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmer } from "./components/dimmer";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
var SuiDimmerModule = /** @class */ (function () {
    function SuiDimmerModule() {
    }
    SuiDimmerModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule],
            declarations: [SuiDimmer],
            exports: [SuiDimmer]
        })
    ], SuiDimmerModule);
    return SuiDimmerModule;
}());
export { SuiDimmerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGltbWVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGltbWVyL2RpbW1lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQU9qRjtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQUwzQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7WUFDNUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN2QixDQUFDO09BQ1csZUFBZSxDQUFHO0lBQUQsc0JBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU3VpRGltbWVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9kaW1tZXJcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL3RyYW5zaXRpb24ubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU3VpVHJhbnNpdGlvbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3VpRGltbWVyXSxcbiAgICBleHBvcnRzOiBbU3VpRGltbWVyXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlEaW1tZXJNb2R1bGUge31cbiJdfQ==