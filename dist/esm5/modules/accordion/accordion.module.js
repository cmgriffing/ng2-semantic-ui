import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapseModule } from "../collapse/collapse.module";
import { SuiTransitionModule } from "../transition/transition.module";
import { SuiAccordion } from "./components/accordion";
import { SuiAccordionPanel } from "./components/accordion-panel";
var SuiAccordionModule = /** @class */ (function () {
    function SuiAccordionModule() {
    }
    SuiAccordionModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, SuiCollapseModule, SuiTransitionModule],
            declarations: [SuiAccordion, SuiAccordionPanel],
            exports: [SuiAccordion, SuiAccordionPanel],
            providers: []
        })
    ], SuiAccordionModule);
    return SuiAccordionModule;
}());
export { SuiAccordionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQVFqRTtJQUFBO0lBQWlDLENBQUM7SUFBckIsa0JBQWtCO1FBTjlCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztZQUMvRCxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7WUFDL0MsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO1lBQzFDLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7T0FDVyxrQkFBa0IsQ0FBRztJQUFELHlCQUFDO0NBQUEsQUFBbEMsSUFBa0M7U0FBckIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU3VpQ29sbGFwc2VNb2R1bGUgfSBmcm9tIFwiLi4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlUcmFuc2l0aW9uTW9kdWxlIH0gZnJvbSBcIi4uL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aUFjY29yZGlvbiB9IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uXCI7XG5pbXBvcnQgeyBTdWlBY2NvcmRpb25QYW5lbCB9IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uLXBhbmVsXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU3VpQ29sbGFwc2VNb2R1bGUsIFN1aVRyYW5zaXRpb25Nb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1N1aUFjY29yZGlvbiwgU3VpQWNjb3JkaW9uUGFuZWxdLFxuICAgIGV4cG9ydHM6IFtTdWlBY2NvcmRpb24sIFN1aUFjY29yZGlvblBhbmVsXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFN1aUFjY29yZGlvbk1vZHVsZSB7fVxuIl19