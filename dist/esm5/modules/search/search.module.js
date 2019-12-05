import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiSearch } from "./components/search";
import { SuiSearchResult } from "./components/search-result";
import { SuiDropdownModule } from "../../modules/dropdown/dropdown.module";
import { SuiUtilityModule } from "../../misc/util/util.module";
import { SuiLocalizationModule } from "../../behaviors/localization/localization.module";
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
            declarations: [SuiSearch, SuiSearchResult],
            exports: [SuiSearch]
        })
    ], SuiSearchModule);
    return SuiSearchModule;
}());
export { SuiSearchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VhcmNoL3NlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBYXpGO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixlQUFlO1FBWDNCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsaUJBQWlCO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLGdCQUFnQjthQUNuQjtZQUNELFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUM7WUFDMUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3ZCLENBQUM7T0FDVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgU3VpU2VhcmNoIH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7IFN1aVNlYXJjaFJlc3VsdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdFwiO1xuaW1wb3J0IHsgU3VpRHJvcGRvd25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGVcIjtcbmltcG9ydCB7IFN1aVV0aWxpdHlNb2R1bGUgfSBmcm9tIFwiLi4vLi4vbWlzYy91dGlsL3V0aWwubW9kdWxlXCI7XG5pbXBvcnQgeyBTdWlMb2NhbGl6YXRpb25Nb2R1bGUgfSBmcm9tIFwiLi4vLi4vYmVoYXZpb3JzL2xvY2FsaXphdGlvbi9sb2NhbGl6YXRpb24ubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBTdWlEcm9wZG93bk1vZHVsZSxcbiAgICAgICAgU3VpTG9jYWxpemF0aW9uTW9kdWxlLFxuICAgICAgICBTdWlVdGlsaXR5TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTdWlTZWFyY2gsIFN1aVNlYXJjaFJlc3VsdF0sXG4gICAgZXhwb3J0czogW1N1aVNlYXJjaF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpU2VhcmNoTW9kdWxlIHt9XG4iXX0=