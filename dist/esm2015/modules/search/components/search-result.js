import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, HostBinding, Input, TemplateRef } from "@angular/core";
import { ITemplateRefContext, SuiComponentFactory } from "../../../misc/util/index";
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
    ViewChild("templateSibling", { static: true, read: ViewContainerRef })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VhcmNoL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBR2hCLFdBQVcsRUFDWCxLQUFLLEVBQ0wsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ3RCLE1BQU0sMEJBQTBCLENBQUM7QUFHbEMsNERBQTREO0FBQzVELE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQztBQVNoQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBd0N4QixZQUFtQixnQkFBb0M7UUFBcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQUNuRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQiw0SEFBNEg7UUFDNUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBM0JELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxRQUFRLENBQUMsUUFBbUQ7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FDNUIsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFDYjtnQkFDSSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUNKLENBQUM7U0FDTDtJQUNMLENBQUM7Q0FZSixDQUFBOztZQU51QyxtQkFBbUI7O0FBckN2RDtJQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7c0RBQ0M7QUFHN0I7SUFEQyxLQUFLLEVBQUU7OENBQ087QUFHZjtJQURDLEtBQUssRUFBRTs4Q0FDWTtBQUlwQjtJQURDLEtBQUssRUFBRTtrREFDeUM7QUFLakQ7SUFEQyxLQUFLLEVBQUU7K0NBR1A7QUFrQkQ7SUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3dEQUMvQjtBQXRDL0IsZUFBZTtJQVAzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRTs7O0tBR1Q7S0FDSixDQUFDO0dBQ1csZUFBZSxDQThDM0I7U0E5Q1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICAgIElUZW1wbGF0ZVJlZkNvbnRleHQsXG4gICAgU3VpQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQgeyBJUmVzdWx0Q29udGV4dCB9IGZyb20gXCIuL3NlYXJjaFwiO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMzQ0OS5cbmNvbnN0IHRlbXBsYXRlUmVmID0gVGVtcGxhdGVSZWY7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zZWFyY2gtcmVzdWx0XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gI3RlbXBsYXRlU2libGluZz48L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCIgW2lubmVySFRNTF09XCJmb3JtYXR0ZXIodmFsdWUsIHF1ZXJ5KVwiPjwvc3Bhbj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlYXJjaFJlc3VsdDxUPiB7XG4gICAgLy8gU2V0cyB0aGUgU2VtYW50aWMgVUkgY2xhc3NlcyBvbiB0aGUgaG9zdCBlbGVtZW50LlxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJlc3VsdFwiKVxuICAgIHB1YmxpYyBvcHRpb25DbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTpUO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcXVlcnk6c3RyaW5nO1xuXG4gICAgLy8gUmV0dXJucyB0aGUgbGFiZWwgZnJvbSBhIGdpdmVuIHZhbHVlLlxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZvcm1hdHRlcjoob2JqOlQsIHF1ZXJ5OnN0cmluZykgPT4gc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU/OlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCB0ZW1wbGF0ZSgpOlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHRlbXBsYXRlKHRlbXBsYXRlOlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZVZpZXcoXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVNpYmxpbmcsXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICRpbXBsaWNpdDogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUGxhY2Vob2xkZXIgdG8gZHJhdyB0ZW1wbGF0ZSBiZXNpZGUuXG4gICAgQFZpZXdDaGlsZChcInRlbXBsYXRlU2libGluZ1wiLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICAgIHB1YmxpYyB0ZW1wbGF0ZVNpYmxpbmc6Vmlld0NvbnRhaW5lclJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnRGYWN0b3J5OlN1aUNvbXBvbmVudEZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25DbGFzc2VzID0gdHJ1ZTtcblxuICAgICAgICAvLyBCeSBkZWZhdWx0IHdlIG1ha2UgdGhpcyBmdW5jdGlvbiByZXR1cm4gYW4gZW1wdHkgc3RyaW5nLCBmb3IgdGhlIGJyaWVmIG1vbWVudCB3aGVuIGl0IGlzbid0IGRpc3BsYXlpbmcgdGhlIGNvcnJlY3QgbGFiZWwuXG4gICAgICAgIHRoaXMuZm9ybWF0dGVyID0gdmFsdWUgPT4gXCJcIjtcbiAgICB9XG59XG4iXX0=