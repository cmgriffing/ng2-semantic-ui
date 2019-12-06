import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown/index";
import { SuiLocalizationModule } from "../../behaviors/localization/index";
import { SuiUtilityModule } from "../../misc/util/index";
import { SuiSearch } from "./components/search";
import { SuiSearchResult } from "./components/search-result";
var SuiSearchModule = /** @class */ (function () {
    function SuiSearchModule() {
    }
    SuiSearchModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SuiDropdownModule,
                SuiLocalizationModule,
                SuiUtilityModule
            ],
            declarations: [
                SuiSearch,
                SuiSearchResult
            ],
            exports: [
                SuiSearch
            ]
        })
    ], SuiSearchModule);
    return SuiSearchModule;
}());
export { SuiSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VhcmNoL3NlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBa0I3RDtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQWhCM0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxpQkFBaUI7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsZ0JBQWdCO2FBQ25CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFNBQVM7Z0JBQ1QsZUFBZTthQUNsQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxTQUFTO2FBQ1o7U0FDSixDQUFDO09BQ1csZUFBZSxDQUFHO0lBQUQsc0JBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFN1aURyb3Bkb3duTW9kdWxlIH0gZnJvbSBcIi4uL2Ryb3Bkb3duL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9pbmRleFwiO1xuaW1wb3J0IHsgU3VpVXRpbGl0eU1vZHVsZSB9IGZyb20gXCIuLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IFN1aVNlYXJjaCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQgeyBTdWlTZWFyY2hSZXN1bHQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaC1yZXN1bHRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFN1aURyb3Bkb3duTW9kdWxlLFxuICAgICAgICBTdWlMb2NhbGl6YXRpb25Nb2R1bGUsXG4gICAgICAgIFN1aVV0aWxpdHlNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTdWlTZWFyY2gsXG4gICAgICAgIFN1aVNlYXJjaFJlc3VsdFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTdWlTZWFyY2hcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlYXJjaE1vZHVsZSB7fVxuIl19