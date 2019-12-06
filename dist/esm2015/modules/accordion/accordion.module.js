import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuiCollapseModule } from "../collapse/index";
import { SuiTransitionModule } from "../transition/index";
import { SuiAccordion } from "./components/accordion";
import { SuiAccordionPanel } from "./components/accordion-panel";
let SuiAccordionModule = class SuiAccordionModule {
};
SuiAccordionModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiCollapseModule,
            SuiTransitionModule
        ],
        declarations: [
            SuiAccordion,
            SuiAccordionPanel
        ],
        exports: [
            SuiAccordion,
            SuiAccordionPanel
        ],
        providers: []
    })
], SuiAccordionModule);
export { SuiAccordionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYWNjb3JkaW9uL2FjY29yZGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWtCakUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FBRyxDQUFBO0FBQXJCLGtCQUFrQjtJQWhCOUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixtQkFBbUI7U0FDdEI7UUFDRCxZQUFZLEVBQUU7WUFDVixZQUFZO1lBQ1osaUJBQWlCO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGlCQUFpQjtTQUNwQjtRQUNELFNBQVMsRUFBRSxFQUFFO0tBQ2hCLENBQUM7R0FDVyxrQkFBa0IsQ0FBRztTQUFyQixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBTdWlDb2xsYXBzZU1vZHVsZSB9IGZyb20gXCIuLi9jb2xsYXBzZS9pbmRleFwiO1xuaW1wb3J0IHsgU3VpVHJhbnNpdGlvbk1vZHVsZSB9IGZyb20gXCIuLi90cmFuc2l0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlBY2NvcmRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL2FjY29yZGlvblwiO1xuaW1wb3J0IHsgU3VpQWNjb3JkaW9uUGFuZWwgfSBmcm9tIFwiLi9jb21wb25lbnRzL2FjY29yZGlvbi1wYW5lbFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBTdWlDb2xsYXBzZU1vZHVsZSxcbiAgICAgICAgU3VpVHJhbnNpdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFN1aUFjY29yZGlvbixcbiAgICAgICAgU3VpQWNjb3JkaW9uUGFuZWxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgU3VpQWNjb3JkaW9uLFxuICAgICAgICBTdWlBY2NvcmRpb25QYW5lbFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlBY2NvcmRpb25Nb2R1bGUge31cbiJdfQ==