import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiMessage } from "./components/message";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
let SuiMessageModule = class SuiMessageModule {
};
SuiMessageModule = tslib_1.__decorate([
    NgModule({
        imports: [CommonModule, SuiTransitionModule],
        declarations: [SuiMessage],
        exports: [SuiMessage]
    })
], SuiMessageModule);
export { SuiMessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJjb2xsZWN0aW9ucy9tZXNzYWdlL21lc3NhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFPakYsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7Q0FBRyxDQUFBO0FBQW5CLGdCQUFnQjtJQUw1QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7UUFDNUMsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUN4QixDQUFDO0dBQ1csZ0JBQWdCLENBQUc7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgU3VpTWVzc2FnZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZVwiO1xuaW1wb3J0IHsgU3VpVHJhbnNpdGlvbk1vZHVsZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTdWlUcmFuc2l0aW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTdWlNZXNzYWdlXSxcbiAgICBleHBvcnRzOiBbU3VpTWVzc2FnZV1cbn0pXG5leHBvcnQgY2xhc3MgU3VpTWVzc2FnZU1vZHVsZSB7fVxuIl19