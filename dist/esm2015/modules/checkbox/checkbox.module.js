import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiCheckbox, SuiCheckboxValueAccessor } from "./components/checkbox";
import { SuiRadio, SuiRadioValueAccessor } from "./components/radio";
import { SuiRadioManager } from "./directives/radio-manager";
let SuiCheckboxModule = class SuiCheckboxModule {
};
SuiCheckboxModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule
        ],
        declarations: [
            SuiCheckbox,
            SuiCheckboxValueAccessor,
            SuiRadio,
            SuiRadioValueAccessor,
            SuiRadioManager
        ],
        exports: [
            SuiCheckbox,
            SuiCheckboxValueAccessor,
            SuiRadio,
            SuiRadioValueAccessor,
            SuiRadioManager
        ]
    })
], SuiCheckboxModule);
export { SuiCheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jaGVja2JveC9jaGVja2JveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXNCN0QsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBRyxDQUFBO0FBQXBCLGlCQUFpQjtJQXBCN0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFdBQVc7U0FDZDtRQUNELFlBQVksRUFBRTtZQUNWLFdBQVc7WUFDWCx3QkFBd0I7WUFDeEIsUUFBUTtZQUNSLHFCQUFxQjtZQUNyQixlQUFlO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsV0FBVztZQUNYLHdCQUF3QjtZQUN4QixRQUFRO1lBQ1IscUJBQXFCO1lBQ3JCLGVBQWU7U0FDbEI7S0FDSixDQUFDO0dBQ1csaUJBQWlCLENBQUc7U0FBcEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFN1aUNoZWNrYm94LCBTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NoZWNrYm94XCI7XG5pbXBvcnQgeyBTdWlSYWRpbywgU3VpUmFkaW9WYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vY29tcG9uZW50cy9yYWRpb1wiO1xuaW1wb3J0IHsgU3VpUmFkaW9NYW5hZ2VyIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9yYWRpby1tYW5hZ2VyXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3VpQ2hlY2tib3gsXG4gICAgICAgIFN1aUNoZWNrYm94VmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpUmFkaW8sXG4gICAgICAgIFN1aVJhZGlvVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpUmFkaW9NYW5hZ2VyXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN1aUNoZWNrYm94LFxuICAgICAgICBTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aVJhZGlvLFxuICAgICAgICBTdWlSYWRpb1ZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aVJhZGlvTWFuYWdlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2hlY2tib3hNb2R1bGUge31cbiJdfQ==