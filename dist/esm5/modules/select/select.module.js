import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiLocalizationModule } from "../../behaviors/localization/index";
import { SuiSelect, SuiSelectValueAccessor } from "./components/select";
import { SuiSelectOption } from "./components/select-option";
import { SuiSelectSearch } from "./directives/select-search";
import { SuiMultiSelect, SuiMultiSelectValueAccessor } from "./components/multi-select";
import { SuiMultiSelectLabel } from "./components/multi-select-label";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUE0QnRFO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixlQUFlO1FBMUIzQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixXQUFXO2dCQUNYLGlCQUFpQjtnQkFDakIsZ0JBQWdCO2dCQUNoQixxQkFBcUI7YUFDeEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsU0FBUztnQkFDVCxlQUFlO2dCQUNmLGVBQWU7Z0JBQ2Ysc0JBQXNCO2dCQUN0QixjQUFjO2dCQUNkLG1CQUFtQjtnQkFDbkIsMkJBQTJCO2FBQzlCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFNBQVM7Z0JBQ1QsZUFBZTtnQkFDZixlQUFlO2dCQUNmLHNCQUFzQjtnQkFDdEIsY0FBYztnQkFDZCwyQkFBMkI7YUFDOUI7U0FDSixDQUFDO09BQ1csZUFBZSxDQUFHO0lBQUQsc0JBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFN1aURyb3Bkb3duTW9kdWxlIH0gZnJvbSBcIi4uL2Ryb3Bkb3duL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlVdGlsaXR5TW9kdWxlIH0gZnJvbSBcIi4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHsgU3VpTG9jYWxpemF0aW9uTW9kdWxlIH0gZnJvbSBcIi4uLy4uL2JlaGF2aW9ycy9sb2NhbGl6YXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IFN1aVNlbGVjdCwgU3VpU2VsZWN0VmFsdWVBY2Nlc3NvciB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VsZWN0XCI7XG5pbXBvcnQgeyBTdWlTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL3NlbGVjdC1vcHRpb25cIjtcbmltcG9ydCB7IFN1aVNlbGVjdFNlYXJjaCB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2VsZWN0LXNlYXJjaFwiO1xuaW1wb3J0IHsgU3VpTXVsdGlTZWxlY3QsIFN1aU11bHRpU2VsZWN0VmFsdWVBY2Nlc3NvciB9IGZyb20gXCIuL2NvbXBvbmVudHMvbXVsdGktc2VsZWN0XCI7XG5pbXBvcnQgeyBTdWlNdWx0aVNlbGVjdExhYmVsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9tdWx0aS1zZWxlY3QtbGFiZWxcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFN1aURyb3Bkb3duTW9kdWxlLFxuICAgICAgICBTdWlVdGlsaXR5TW9kdWxlLFxuICAgICAgICBTdWlMb2NhbGl6YXRpb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTdWlTZWxlY3QsXG4gICAgICAgIFN1aVNlbGVjdE9wdGlvbixcbiAgICAgICAgU3VpU2VsZWN0U2VhcmNoLFxuICAgICAgICBTdWlTZWxlY3RWYWx1ZUFjY2Vzc29yLFxuICAgICAgICBTdWlNdWx0aVNlbGVjdCxcbiAgICAgICAgU3VpTXVsdGlTZWxlY3RMYWJlbCxcbiAgICAgICAgU3VpTXVsdGlTZWxlY3RWYWx1ZUFjY2Vzc29yXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN1aVNlbGVjdCxcbiAgICAgICAgU3VpU2VsZWN0T3B0aW9uLFxuICAgICAgICBTdWlTZWxlY3RTZWFyY2gsXG4gICAgICAgIFN1aVNlbGVjdFZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aU11bHRpU2VsZWN0LFxuICAgICAgICBTdWlNdWx0aVNlbGVjdFZhbHVlQWNjZXNzb3JcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlbGVjdE1vZHVsZSB7fVxuIl19