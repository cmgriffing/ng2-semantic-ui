import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, HostBinding, Input, TemplateRef } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
// See https://github.com/Microsoft/TypeScript/issues/13449.
var templateRef = TemplateRef;
var SuiSearchResult = /** @class */ (function () {
    function SuiSearchResult(componentFactory) {
        this.componentFactory = componentFactory;
        this.optionClasses = true;
        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = function (value) { return ""; };
    }
    Object.defineProperty(SuiSearchResult.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (template) {
            this._template = template;
            if (this.template) {
                this.componentFactory.createView(this.templateSibling, this.template, {
                    $implicit: this.value,
                    query: this.query
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiSearchResult.ctorParameters = function () { return [
        { type: SuiComponentFactory }
    ]; };
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
            template: "\n        <span #templateSibling></span>\n        <span *ngIf=\"!template\" [innerHTML]=\"formatter(value, query)\"></span>\n    "
        })
    ], SuiSearchResult);
    return SuiSearchResult;
}());
export { SuiSearchResult };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VhcmNoL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBR2hCLFdBQVcsRUFDWCxLQUFLLEVBQ0wsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBRTVGLDREQUE0RDtBQUM1RCxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFTaEM7SUF3Q0kseUJBQW1CLGdCQUFvQztRQUFwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLDRIQUE0SDtRQUM1SCxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQUEsS0FBSyxJQUFJLE9BQUEsRUFBRSxFQUFGLENBQUUsQ0FBQztJQUNqQyxDQUFDO0lBM0JELHNCQUFXLHFDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFvQixRQUFtRDtZQUNuRSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FDNUIsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFDYjtvQkFDSSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDcEIsQ0FDSixDQUFDO2FBQ0w7UUFDTCxDQUFDOzs7T0FkQTs7Z0JBb0JtQyxtQkFBbUI7O0lBckN2RDtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7MERBQ0M7SUFHN0I7UUFEQyxLQUFLLEVBQUU7a0RBQ087SUFHZjtRQURDLEtBQUssRUFBRTtrREFDWTtJQUlwQjtRQURDLEtBQUssRUFBRTtzREFDeUM7SUFLakQ7UUFEQyxLQUFLLEVBQUU7bURBR1A7SUFrQkQ7UUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzREQUMvQjtJQXRDL0IsZUFBZTtRQVAzQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxtSUFHVDtTQUNKLENBQUM7T0FDVyxlQUFlLENBOEMzQjtJQUFELHNCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0E5Q1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJUmVzdWx0Q29udGV4dCB9IGZyb20gXCIuL3NlYXJjaFwiO1xuaW1wb3J0IHsgU3VpQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvc2VydmljZXMvY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZVwiO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMzQ0OS5cbmNvbnN0IHRlbXBsYXRlUmVmID0gVGVtcGxhdGVSZWY7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zZWFyY2gtcmVzdWx0XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gI3RlbXBsYXRlU2libGluZz48L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCIgW2lubmVySFRNTF09XCJmb3JtYXR0ZXIodmFsdWUsIHF1ZXJ5KVwiPjwvc3Bhbj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNlYXJjaFJlc3VsdDxUPiB7XG4gICAgLy8gU2V0cyB0aGUgU2VtYW50aWMgVUkgY2xhc3NlcyBvbiB0aGUgaG9zdCBlbGVtZW50LlxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnJlc3VsdFwiKVxuICAgIHB1YmxpYyBvcHRpb25DbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTpUO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcXVlcnk6c3RyaW5nO1xuXG4gICAgLy8gUmV0dXJucyB0aGUgbGFiZWwgZnJvbSBhIGdpdmVuIHZhbHVlLlxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZvcm1hdHRlcjoob2JqOlQsIHF1ZXJ5OnN0cmluZykgPT4gc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU/OlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCB0ZW1wbGF0ZSgpOlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHRlbXBsYXRlKHRlbXBsYXRlOlRlbXBsYXRlUmVmPElSZXN1bHRDb250ZXh0PFQ+PiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZVZpZXcoXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVNpYmxpbmcsXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICRpbXBsaWNpdDogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUGxhY2Vob2xkZXIgdG8gZHJhdyB0ZW1wbGF0ZSBiZXNpZGUuXG4gICAgQFZpZXdDaGlsZChcInRlbXBsYXRlU2libGluZ1wiLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyB0ZW1wbGF0ZVNpYmxpbmc6Vmlld0NvbnRhaW5lclJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnRGYWN0b3J5OlN1aUNvbXBvbmVudEZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25DbGFzc2VzID0gdHJ1ZTtcblxuICAgICAgICAvLyBCeSBkZWZhdWx0IHdlIG1ha2UgdGhpcyBmdW5jdGlvbiByZXR1cm4gYW4gZW1wdHkgc3RyaW5nLCBmb3IgdGhlIGJyaWVmIG1vbWVudCB3aGVuIGl0IGlzbid0IGRpc3BsYXlpbmcgdGhlIGNvcnJlY3QgbGFiZWwuXG4gICAgICAgIHRoaXMuZm9ybWF0dGVyID0gdmFsdWUgPT4gXCJcIjtcbiAgICB9XG59XG4iXX0=