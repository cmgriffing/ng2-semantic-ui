import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, HostBinding, Input, TemplateRef } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef = TemplateRef;
let SuiSearchResult = class SuiSearchResult {
    constructor(componentFactory) {
        this.componentFactory = componentFactory;
        this.optionClasses = true;
        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = value => "";
    }
    get template() {
        return this._template;
    }
    set template(template) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.value,
                query: this.query
            });
        }
    }
};
SuiSearchResult.ctorParameters = () => [
    { type: SuiComponentFactory }
];
tslib_1.__decorate([
    HostBinding("class.result")
], SuiSearchResult.prototype, "optionClasses", void 0);
tslib_1.__decorate([
    Input()
], SuiSearchResult.prototype, "value", void 0);
tslib_1.__decorate([
    Input()
], SuiSearchResult.prototype, "query", void 0);
tslib_1.__decorate([
    Input()
], SuiSearchResult.prototype, "formatter", void 0);
tslib_1.__decorate([
    Input()
], SuiSearchResult.prototype, "template", null);
tslib_1.__decorate([
    ViewChild("templateSibling", { read: ViewContainerRef, static: true })
], SuiSearchResult.prototype, "templateSibling", void 0);
SuiSearchResult = tslib_1.__decorate([
    Component({
        selector: "sui-search-result",
        template: `
        <span #templateSibling></span>
        <span *ngIf="!template" [innerHTML]="formatter(value, query)"></span>
    `
    })
], SuiSearchResult);
export { SuiSearchResult };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VhcmNoL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBR2hCLFdBQVcsRUFDWCxLQUFLLEVBQ0wsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBRTVGLDREQUE0RDtBQUM1RCxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFTaEMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQXdDeEIsWUFBbUIsZ0JBQW9DO1FBQXBDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFMUIsNEhBQTRIO1FBQzVILElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQTNCRCxJQUFXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLFFBQW1EO1FBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQzVCLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQ2I7Z0JBQ0ksU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FDSixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBWUosQ0FBQTs7WUFOdUMsbUJBQW1COztBQXJDdkQ7SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDO3NEQUNDO0FBRzdCO0lBREMsS0FBSyxFQUFFOzhDQUNPO0FBR2Y7SUFEQyxLQUFLLEVBQUU7OENBQ1k7QUFJcEI7SUFEQyxLQUFLLEVBQUU7a0RBQ3lDO0FBS2pEO0lBREMsS0FBSyxFQUFFOytDQUdQO0FBa0JEO0lBREMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzt3REFDL0I7QUF0Qy9CLGVBQWU7SUFQM0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7OztLQUdUO0tBQ0osQ0FBQztHQUNXLGVBQWUsQ0E4QzNCO1NBOUNZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBSZW5kZXJlcjIsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSVJlc3VsdENvbnRleHQgfSBmcm9tIFwiLi9zZWFyY2hcIjtcbmltcG9ydCB7IFN1aUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL3NlcnZpY2VzL2NvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2VcIjtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM0NDkuXG5jb25zdCB0ZW1wbGF0ZVJlZiA9IFRlbXBsYXRlUmVmO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktc2VhcmNoLXJlc3VsdFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICN0ZW1wbGF0ZVNpYmxpbmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiIFtpbm5lckhUTUxdPVwiZm9ybWF0dGVyKHZhbHVlLCBxdWVyeSlcIj48L3NwYW4+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlTZWFyY2hSZXN1bHQ8VD4ge1xuICAgIC8vIFNldHMgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5yZXN1bHRcIilcbiAgICBwdWJsaWMgb3B0aW9uQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdmFsdWU6VDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHF1ZXJ5OnN0cmluZztcblxuICAgIC8vIFJldHVybnMgdGhlIGxhYmVsIGZyb20gYSBnaXZlbiB2YWx1ZS5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmb3JtYXR0ZXI6KG9iajpULCBxdWVyeTpzdHJpbmcpID0+IHN0cmluZztcblxuICAgIHByaXZhdGUgX3RlbXBsYXRlPzpUZW1wbGF0ZVJlZjxJUmVzdWx0Q29udGV4dDxUPj47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgdGVtcGxhdGUoKTpUZW1wbGF0ZVJlZjxJUmVzdWx0Q29udGV4dDxUPj4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB0ZW1wbGF0ZSh0ZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJUmVzdWx0Q29udGV4dDxUPj4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGVWaWV3KFxuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVTaWJsaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBsYWNlaG9sZGVyIHRvIGRyYXcgdGVtcGxhdGUgYmVzaWRlLlxuICAgIEBWaWV3Q2hpbGQoXCJ0ZW1wbGF0ZVNpYmxpbmdcIiwgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgICBwdWJsaWMgdGVtcGxhdGVTaWJsaW5nOlZpZXdDb250YWluZXJSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50RmFjdG9yeTpTdWlDb21wb25lbnRGYWN0b3J5KSB7XG4gICAgICAgIHRoaXMub3B0aW9uQ2xhc3NlcyA9IHRydWU7XG5cbiAgICAgICAgLy8gQnkgZGVmYXVsdCB3ZSBtYWtlIHRoaXMgZnVuY3Rpb24gcmV0dXJuIGFuIGVtcHR5IHN0cmluZywgZm9yIHRoZSBicmllZiBtb21lbnQgd2hlbiBpdCBpc24ndCBkaXNwbGF5aW5nIHRoZSBjb3JyZWN0IGxhYmVsLlxuICAgICAgICB0aGlzLmZvcm1hdHRlciA9IHZhbHVlID0+IFwiXCI7XG4gICAgfVxufVxuIl19