import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, HostBinding, Input, TemplateRef } from "@angular/core";
import { ITemplateRefContext, SuiComponentFactory } from "../../../misc/util/index";
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
        ViewChild("templateSibling", { static: true, read: ViewContainerRef })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VhcmNoL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBR2hCLFdBQVcsRUFDWCxLQUFLLEVBQ0wsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ3RCLE1BQU0sMEJBQTBCLENBQUM7QUFHbEMsNERBQTREO0FBQzVELElBQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQztBQVNoQztJQXdDSSx5QkFBbUIsZ0JBQW9DO1FBQXBDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFMUIsNEhBQTRIO1FBQzVILElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBQSxLQUFLLElBQUksT0FBQSxFQUFFLEVBQUYsQ0FBRSxDQUFDO0lBQ2pDLENBQUM7SUEzQkQsc0JBQVcscUNBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQUVELFVBQW9CLFFBQW1EO1lBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUM1QixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsUUFBUSxFQUNiO29CQUNJLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNwQixDQUNKLENBQUM7YUFDTDtRQUNMLENBQUM7OztPQWRBOztnQkFvQm1DLG1CQUFtQjs7SUFyQ3ZEO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzswREFDQztJQUc3QjtRQURDLEtBQUssRUFBRTtrREFDTztJQUdmO1FBREMsS0FBSyxFQUFFO2tEQUNZO0lBSXBCO1FBREMsS0FBSyxFQUFFO3NEQUN5QztJQUtqRDtRQURDLEtBQUssRUFBRTttREFHUDtJQWtCRDtRQURDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUM7NERBQy9CO0lBdEMvQixlQUFlO1FBUDNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLG1JQUdUO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0E4QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlDRCxJQThDQztTQTlDWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgUmVuZGVyZXIyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgSVRlbXBsYXRlUmVmQ29udGV4dCxcbiAgICBTdWlDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IElSZXN1bHRDb250ZXh0IH0gZnJvbSBcIi4vc2VhcmNoXCI7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzNDQ5LlxuY29uc3QgdGVtcGxhdGVSZWYgPSBUZW1wbGF0ZVJlZjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXNlYXJjaC1yZXN1bHRcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiAjdGVtcGxhdGVTaWJsaW5nPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhdGVtcGxhdGVcIiBbaW5uZXJIVE1MXT1cImZvcm1hdHRlcih2YWx1ZSwgcXVlcnkpXCI+PC9zcGFuPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpU2VhcmNoUmVzdWx0PFQ+IHtcbiAgICAvLyBTZXRzIHRoZSBTZW1hbnRpYyBVSSBjbGFzc2VzIG9uIHRoZSBob3N0IGVsZW1lbnQuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucmVzdWx0XCIpXG4gICAgcHVibGljIG9wdGlvbkNsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOlQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBxdWVyeTpzdHJpbmc7XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBsYWJlbCBmcm9tIGEgZ2l2ZW4gdmFsdWUuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZm9ybWF0dGVyOihvYmo6VCwgcXVlcnk6c3RyaW5nKSA9PiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF90ZW1wbGF0ZT86VGVtcGxhdGVSZWY8SVJlc3VsdENvbnRleHQ8VD4+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHRlbXBsYXRlKCk6VGVtcGxhdGVSZWY8SVJlc3VsdENvbnRleHQ8VD4+IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdGVtcGxhdGUodGVtcGxhdGU6VGVtcGxhdGVSZWY8SVJlc3VsdENvbnRleHQ8VD4+IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlVmlldyhcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlU2libGluZyxcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJGltcGxpY2l0OiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogdGhpcy5xdWVyeVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQbGFjZWhvbGRlciB0byBkcmF3IHRlbXBsYXRlIGJlc2lkZS5cbiAgICBAVmlld0NoaWxkKFwidGVtcGxhdGVTaWJsaW5nXCIsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgcHVibGljIHRlbXBsYXRlU2libGluZzpWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudEZhY3Rvcnk6U3VpQ29tcG9uZW50RmFjdG9yeSkge1xuICAgICAgICB0aGlzLm9wdGlvbkNsYXNzZXMgPSB0cnVlO1xuXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQgd2UgbWFrZSB0aGlzIGZ1bmN0aW9uIHJldHVybiBhbiBlbXB0eSBzdHJpbmcsIGZvciB0aGUgYnJpZWYgbW9tZW50IHdoZW4gaXQgaXNuJ3QgZGlzcGxheWluZyB0aGUgY29ycmVjdCBsYWJlbC5cbiAgICAgICAgdGhpcy5mb3JtYXR0ZXIgPSB2YWx1ZSA9PiBcIlwiO1xuICAgIH1cbn1cbiJdfQ==