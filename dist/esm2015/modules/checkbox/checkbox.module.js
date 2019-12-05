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
        imports: [CommonModule, FormsModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jaGVja2JveC9jaGVja2JveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQW1CN0QsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBRyxDQUFBO0FBQXBCLGlCQUFpQjtJQWpCN0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztRQUNwQyxZQUFZLEVBQUU7WUFDVixXQUFXO1lBQ1gsd0JBQXdCO1lBQ3hCLFFBQVE7WUFDUixxQkFBcUI7WUFDckIsZUFBZTtTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNMLFdBQVc7WUFDWCx3QkFBd0I7WUFDeEIsUUFBUTtZQUNSLHFCQUFxQjtZQUNyQixlQUFlO1NBQ2xCO0tBQ0osQ0FBQztHQUNXLGlCQUFpQixDQUFHO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBTdWlDaGVja2JveCwgU3VpQ2hlY2tib3hWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vY29tcG9uZW50cy9jaGVja2JveFwiO1xuaW1wb3J0IHsgU3VpUmFkaW8sIFN1aVJhZGlvVmFsdWVBY2Nlc3NvciB9IGZyb20gXCIuL2NvbXBvbmVudHMvcmFkaW9cIjtcbmltcG9ydCB7IFN1aVJhZGlvTWFuYWdlciB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvcmFkaW8tbWFuYWdlclwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3VpQ2hlY2tib3gsXG4gICAgICAgIFN1aUNoZWNrYm94VmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpUmFkaW8sXG4gICAgICAgIFN1aVJhZGlvVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgU3VpUmFkaW9NYW5hZ2VyXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFN1aUNoZWNrYm94LFxuICAgICAgICBTdWlDaGVja2JveFZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aVJhZGlvLFxuICAgICAgICBTdWlSYWRpb1ZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFN1aVJhZGlvTWFuYWdlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpQ2hlY2tib3hNb2R1bGUge31cbiJdfQ==