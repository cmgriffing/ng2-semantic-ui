import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTransitionModule } from "../../modules/transition/index";
import { SuiMessage } from "./components/message";
var SuiMessageModule = /** @class */ (function () {
    function SuiMessageModule() {
    }
    SuiMessageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                SuiTransitionModule
            ],
            declarations: [
                SuiMessage
            ],
            exports: [
                SuiMessage
            ]
        })
    ], SuiMessageModule);
    return SuiMessageModule;
}());
export { SuiMessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJjb2xsZWN0aW9ucy9tZXNzYWdlL21lc3NhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFjbEQ7SUFBQTtJQUErQixDQUFDO0lBQW5CLGdCQUFnQjtRQVo1QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixtQkFBbUI7YUFDdEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsVUFBVTthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFVBQVU7YUFDYjtTQUNKLENBQUM7T0FDVyxnQkFBZ0IsQ0FBRztJQUFELHVCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU3VpVHJhbnNpdGlvbk1vZHVsZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aU1lc3NhZ2UgfSBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgU3VpVHJhbnNpdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aU1lc3NhZ2VcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3VpTWVzc2FnZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpTWVzc2FnZU1vZHVsZSB7fVxuIl19