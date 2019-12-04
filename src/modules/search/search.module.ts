import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiSearch } from "./components/search";
import { SuiSearchResult } from "./components/search-result";
import { SuiDropdownModule } from "../../modules/dropdown/dropdown.module";
import { SuiUtilityModule } from "../../misc/util/util.module";
import { SuiLocalizationModule } from "../../behaviors/localization/localization.module";

@NgModule({
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
export class SuiSearchModule {}
