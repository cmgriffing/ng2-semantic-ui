import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiModalService } from "./services/modal.service";
import { SuiModal } from "./components/modal";
import { SuiDimmerModule } from "../../modules/dimmer/dimmer.module";
import { SuiTransitionModule } from "../../modules/transition/transition.module";
import { SuiUtilityModule } from "../../misc/util/util.module";

@NgModule({
    imports: [
        CommonModule,
        SuiDimmerModule,
        SuiTransitionModule,
        SuiUtilityModule
    ],
    declarations: [SuiModal],
    exports: [SuiModal],
    providers: [SuiModalService],
    entryComponents: [SuiModal]
})
export class SuiModalModule {}
