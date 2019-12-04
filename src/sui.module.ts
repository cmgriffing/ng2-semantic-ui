import { NgModule } from "@angular/core";

// Collections
import { SuiMessageModule } from "./collections/message/message.module";
import { SuiPaginationModule } from "./collections/pagination/pagination.module";

// Modules
import { SuiAccordionModule } from "./modules/accordion/accordion.module";
import { SuiCheckboxModule } from "./modules/checkbox/checkbox.module";
import { SuiTransitionModule } from "./modules/transition/transition.module";
import { SuiSelectModule } from "./modules/select/select.module";
import { SuiTabsModule } from "./modules/tabs/tab.module";
import { SuiSidebarModule } from "./modules/sidebar/sidebar.module";
import { SuiSearchModule } from "./modules/search/search.module";
import { SuiRatingModule } from "./modules/rating/rating.module";
import { SuiProgressModule } from "./modules/progress/progress.module";
import { SuiPopupModule } from "./modules/popup/popup.module";
import { SuiModalModule } from "./modules/modal/modal.module";

import { SuiDropdownModule } from "./modules/dropdown/dropdown.module";
import { SuiDimmerModule } from "./modules/dimmer/dimmer.module";
import { SuiDatepickerModule } from "./modules/datepicker/datepicker.module";
import { SuiCollapseModule } from "./modules/collapse/collapse.module";

// Behaviors
import { SuiLocalizationModule } from "./behaviors/localization/localization.module";

// Misc
import { SuiUtilityModule } from "./misc/util/util.module";

@NgModule({
    exports: [
        // Collections
        SuiMessageModule,
        SuiPaginationModule,

        // Modules
        SuiAccordionModule,
        SuiCheckboxModule,
        SuiCollapseModule,
        SuiDatepickerModule,
        SuiDimmerModule,
        SuiDropdownModule,
        SuiModalModule,
        SuiPopupModule,
        SuiProgressModule,
        SuiRatingModule,
        SuiSearchModule,
        SuiSelectModule,
        SuiSidebarModule,
        SuiTabsModule,
        SuiTransitionModule,

        // Behaviors
        SuiLocalizationModule,

        // Misc
        SuiUtilityModule
    ]
})
export class SuiModule {}
