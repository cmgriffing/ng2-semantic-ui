import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiTabset } from "./components/tabset";
import { SuiTabHeader } from "./directives/tab-header";
import { SuiTabContent } from "./directives/tab-content";
var SuiTabsModule = /** @class */ (function () {
    function SuiTabsModule() {
    }
    SuiTabsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SuiTabset,
                SuiTabHeader,
                SuiTabContent
            ],
            exports: [
                SuiTabset,
                SuiTabHeader,
                SuiTabContent
            ]
        })
    ], SuiTabsModule);
    return SuiTabsModule;
}());
export { SuiTabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGFicy90YWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWlCekQ7SUFBQTtJQUE0QixDQUFDO0lBQWhCLGFBQWE7UUFmekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixTQUFTO2dCQUNULFlBQVk7Z0JBQ1osYUFBYTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxTQUFTO2dCQUNULFlBQVk7Z0JBQ1osYUFBYTthQUNoQjtTQUNKLENBQUM7T0FDVyxhQUFhLENBQUc7SUFBRCxvQkFBQztDQUFBLEFBQTdCLElBQTZCO1NBQWhCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBTdWlUYWJzZXQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3RhYnNldFwiO1xuaW1wb3J0IHsgU3VpVGFiSGVhZGVyIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy90YWItaGVhZGVyXCI7XG5pbXBvcnQgeyBTdWlUYWJDb250ZW50IH0gZnJvbSBcIi4vZGlyZWN0aXZlcy90YWItY29udGVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3VpVGFic2V0LFxuICAgICAgICBTdWlUYWJIZWFkZXIsXG4gICAgICAgIFN1aVRhYkNvbnRlbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3VpVGFic2V0LFxuICAgICAgICBTdWlUYWJIZWFkZXIsXG4gICAgICAgIFN1aVRhYkNvbnRlbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVRhYnNNb2R1bGUge31cbiJdfQ==