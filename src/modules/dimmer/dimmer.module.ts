import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiDimmer } from "./components/dimmer";
import { SuiTransitionModule } from "../../modules/transition/transition.module";

@NgModule({
    imports: [CommonModule, SuiTransitionModule],
    declarations: [SuiDimmer],
    exports: [SuiDimmer]
})
export class SuiDimmerModule {}
