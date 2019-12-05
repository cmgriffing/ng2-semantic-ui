import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiSelect, SuiSelectValueAccessor } from "./components/select";
import { SuiSelectOption } from "./components/select-option";
import { SuiSelectSearch } from "./directives/select-search";
import { SuiMultiSelect, SuiMultiSelectValueAccessor } from "./components/multi-select";
import { SuiMultiSelectLabel } from "./components/multi-select-label";
import { SuiDropdownModule } from "../../modules/dropdown/dropdown.module";
import { SuiUtilityModule } from "../../misc/util/util.module";
import { SuiLocalizationModule } from "../../behaviors/localization/localization.module";
var SuiSelectModule = /** @class */ (function () {
    function SuiSelectModule() {
    }
    SuiSelectModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SuiDropdownModule,
                SuiUtilityModule,
                SuiLocalizationModule
            ],
            declarations: [
                SuiSelect,
                SuiSelectOption,
                SuiSelectSearch,
                SuiSelectValueAccessor,
                SuiMultiSelect,
                SuiMultiSelectLabel,
                SuiMultiSelectValueAccessor
            ],
            exports: [
                SuiSelect,
                SuiSelectOption,
                SuiSelectSearch,
                SuiSelectValueAccessor,
                SuiMultiSelect,
                SuiMultiSelectValueAccessor
            ]
        })
    ], SuiSelectModule);
    return SuiSelectModule;
}());
export { SuiSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQ0gsY0FBYyxFQUNkLDJCQUEyQixFQUM5QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBNEJ6RjtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQTFCM0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIscUJBQXFCO2FBQ3hCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFNBQVM7Z0JBQ1QsZUFBZTtnQkFDZixlQUFlO2dCQUNmLHNCQUFzQjtnQkFDdEIsY0FBYztnQkFDZCxtQkFBbUI7Z0JBQ25CLDJCQUEyQjthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxTQUFTO2dCQUNULGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixzQkFBc0I7Z0JBQ3RCLGNBQWM7Z0JBQ2QsMkJBQTJCO2FBQzlCO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0FBRztJQUFELHNCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBTdWlTZWxlY3QsIFN1aVNlbGVjdFZhbHVlQWNjZXNzb3IgfSBmcm9tIFwiLi9jb21wb25lbnRzL3NlbGVjdFwiO1xuaW1wb3J0IHsgU3VpU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZWxlY3Qtb3B0aW9uXCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RTZWFyY2ggfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3NlbGVjdC1zZWFyY2hcIjtcbmltcG9ydCB7XG4gICAgU3VpTXVsdGlTZWxlY3QsXG4gICAgU3VpTXVsdGlTZWxlY3RWYWx1ZUFjY2Vzc29yXG59IGZyb20gXCIuL2NvbXBvbmVudHMvbXVsdGktc2VsZWN0XCI7XG5pbXBvcnQgeyBTdWlNdWx0aVNlbGVjdExhYmVsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9tdWx0aS1zZWxlY3QtbGFiZWxcIjtcbmltcG9ydCB7IFN1aURyb3Bkb3duTW9kdWxlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlVdGlsaXR5TW9kdWxlIH0gZnJvbSBcIi4uLy4uL21pc2MvdXRpbC91dGlsLm1vZHVsZVwiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vbG9jYWxpemF0aW9uLm1vZHVsZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgU3VpRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIFN1aVV0aWxpdHlNb2R1bGUsXG4gICAgICAgIFN1aUxvY2FsaXphdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aVNlbGVjdCxcbiAgICAgICAgU3VpU2VsZWN0T3B0aW9uLFxuICAgICAgICBTdWlTZWxlY3RTZWFyY2gsXG4gICAgICAgIFN1aVNlbGVjdFZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aU11bHRpU2VsZWN0LFxuICAgICAgICBTdWlNdWx0aVNlbGVjdExhYmVsLFxuICAgICAgICBTdWlNdWx0aVNlbGVjdFZhbHVlQWNjZXNzb3JcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3VpU2VsZWN0LFxuICAgICAgICBTdWlTZWxlY3RPcHRpb24sXG4gICAgICAgIFN1aVNlbGVjdFNlYXJjaCxcbiAgICAgICAgU3VpU2VsZWN0VmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpTXVsdGlTZWxlY3QsXG4gICAgICAgIFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpU2VsZWN0TW9kdWxlIHt9XG4iXX0=