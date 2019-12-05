import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiSidebar } from "./components/sidebar";
import { SuiSidebarContainer } from "./components/sidebar-container";
import { SuiSidebarSibling } from "./components/sidebar-sibling";
var SuiSidebarModule = /** @class */ (function () {
    function SuiSidebarModule() {
    }
    SuiSidebarModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SuiSidebar,
                SuiSidebarContainer,
                SuiSidebarSibling
            ],
            exports: [
                SuiSidebar,
                SuiSidebarContainer,
                SuiSidebarSibling
            ]
        })
    ], SuiSidebarModule);
    return SuiSidebarModule;
}());
export { SuiSidebarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NpZGViYXIvc2lkZWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWlCakU7SUFBQTtJQUErQixDQUFDO0lBQW5CLGdCQUFnQjtRQWY1QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTthQUNmO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixpQkFBaUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsVUFBVTtnQkFDVixtQkFBbUI7Z0JBQ25CLGlCQUFpQjthQUNwQjtTQUNKLENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU3VpU2lkZWJhciB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2lkZWJhclwiO1xuaW1wb3J0IHsgU3VpU2lkZWJhckNvbnRhaW5lciB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2lkZWJhci1jb250YWluZXJcIjtcbmltcG9ydCB7IFN1aVNpZGViYXJTaWJsaW5nIH0gZnJvbSBcIi4vY29tcG9uZW50cy9zaWRlYmFyLXNpYmxpbmdcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aVNpZGViYXIsXG4gICAgICAgIFN1aVNpZGViYXJDb250YWluZXIsXG4gICAgICAgIFN1aVNpZGViYXJTaWJsaW5nXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN1aVNpZGViYXIsXG4gICAgICAgIFN1aVNpZGViYXJDb250YWluZXIsXG4gICAgICAgIFN1aVNpZGViYXJTaWJsaW5nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTaWRlYmFyTW9kdWxlIHt9XG4iXX0=