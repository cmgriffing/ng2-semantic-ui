import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiPopupDirective } from "./directives/popup.directive";
import { SuiPopupArrow } from "./components/popup-arrow";
import { SuiPopup } from "./components/popup";
import { SuiPopupConfig } from "./services/popup.service";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
import { SuiUtilityModule } from "../../misc/util/util.module";

@NgModule({
    imports: [CommonModule, SuiTransitionModule, SuiUtilityModule],
    declarations: [SuiPopupDirective, SuiPopupArrow, SuiPopup],
    exports: [SuiPopupDirective, SuiPopup],
    providers: [SuiPopupConfig],
    entryComponents: [SuiPopup]
})
export class SuiPopupModule {}
