import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiRating, SuiRatingValueAccessor } from "./components/rating";
var SuiRatingModule = /** @class */ (function () {
    function SuiRatingModule() {
    }
    SuiRatingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                FormsModule,
                CommonModule
            ],
            declarations: [
                SuiRating,
                SuiRatingValueAccessor
            ],
            exports: [
                SuiRating,
                SuiRatingValueAccessor
            ]
        })
    ], SuiRatingModule);
    return SuiRatingModule;
}());
export { SuiRatingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmF0aW5nL3JhdGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFnQnhFO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixlQUFlO1FBZDNCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxXQUFXO2dCQUNYLFlBQVk7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixTQUFTO2dCQUNULHNCQUFzQjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxTQUFTO2dCQUNULHNCQUFzQjthQUN6QjtTQUNKLENBQUM7T0FDVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgU3VpUmF0aW5nLCBTdWlSYXRpbmdWYWx1ZUFjY2Vzc29yIH0gZnJvbSBcIi4vY29tcG9uZW50cy9yYXRpbmdcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTdWlSYXRpbmcsXG4gICAgICAgIFN1aVJhdGluZ1ZhbHVlQWNjZXNzb3JcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3VpUmF0aW5nLFxuICAgICAgICBTdWlSYXRpbmdWYWx1ZUFjY2Vzc29yXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlSYXRpbmdNb2R1bGUge31cbiJdfQ==