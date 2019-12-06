import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer2, ElementRef, Output, ChangeDetectorRef, TemplateRef } from "@angular/core";
import { SuiTransition, TransitionController, Transition, TransitionDirection } from "../../transition/index";
import { HandledEvent, SuiComponentFactory } from "../../../misc/util/index";
// See https://github.com/Microsoft/TypeScript/issues/13449.
var templateRef = TemplateRef;
var SuiMultiSelectLabel = /** @class */ (function (_super) {
    tslib_1.__extends(SuiMultiSelectLabel, _super);
    function SuiMultiSelectLabel(renderer, element, changeDetector, componentFactory) {
        var _this = _super.call(this, renderer, element, changeDetector) || this;
        _this.componentFactory = componentFactory;
        // Initialise transition functionality.
        _this._transitionController = new TransitionController(false, "inline-block");
        _this.setTransitionController(_this._transitionController);
        _this.onDeselected = new EventEmitter();
        _this.labelClasses = true;
        _this._transitionController.animate(new Transition("scale", 100, TransitionDirection.In));
        return _this;
    }
    Object.defineProperty(SuiMultiSelectLabel.prototype, "template", {
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
    SuiMultiSelectLabel.prototype.deselectOption = function (e) {
        var _this = this;
        e.eventHandled = true;
        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.Out, function () {
            return _this.onDeselected.emit(_this.value);
        }));
    };
    SuiMultiSelectLabel.prototype.onClick = function (e) {
        e.eventHandled = true;
    };
    SuiMultiSelectLabel.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: SuiComponentFactory }
    ]; };
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.label")
    ], SuiMultiSelectLabel.prototype, "labelClasses", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "value", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "query", void 0);
    tslib_1.__decorate([
        Output("deselected")
    ], SuiMultiSelectLabel.prototype, "onDeselected", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "formatter", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "template", null);
    tslib_1.__decorate([
        ViewChild("templateSibling", { static: true, read: ViewContainerRef })
    ], SuiMultiSelectLabel.prototype, "templateSibling", void 0);
    tslib_1.__decorate([
        HostListener("click", ["$event"])
    ], SuiMultiSelectLabel.prototype, "onClick", null);
    SuiMultiSelectLabel = tslib_1.__decorate([
        Component({
            selector: "sui-multi-select-label",
            template: "\n        <span #templateSibling></span>\n        <span *ngIf=\"!template\" [innerHTML]=\"formatter(value)\"></span>\n        <i class=\"delete icon\" (click)=\"deselectOption($event)\"></i>\n    "
        })
    ], SuiMultiSelectLabel);
    return SuiMultiSelectLabel;
}(SuiTransition));
export { SuiMultiSelectLabel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9tdWx0aS1zZWxlY3QtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixVQUFVLEVBQ1YsbUJBQW1CLEVBQ3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzdFLDREQUE0RDtBQUM1RCxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFVaEM7SUFBNEMsK0NBQWE7SUE4Q3JELDZCQUNJLFFBQWtCLEVBQ2xCLE9BQWtCLEVBQ2xCLGNBQWdDLEVBQ3pCLGdCQUFvQztRQUovQyxZQU1JLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLFNBZ0IzQztRQWxCVSxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBSTNDLHVDQUF1QztRQUN2QyxLQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxvQkFBb0IsQ0FDakQsS0FBSyxFQUNMLGNBQWMsQ0FDakIsQ0FBQztRQUNGLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV6RCxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7UUFFMUMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FDOUIsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FDdkQsQ0FBQzs7SUFDTixDQUFDO0lBNUNELHNCQUFXLHlDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFvQixRQUFtRDtZQUNuRSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FDNUIsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFDYjtvQkFDSSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDcEIsQ0FDSixDQUFDO2FBQ0w7UUFDTCxDQUFDOzs7T0FkQTtJQTRDTSw0Q0FBYyxHQUFyQixVQUFzQixDQUFjO1FBQXBDLGlCQVFDO1FBUEcsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FDOUIsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7WUFDbEQsT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO1FBQWxDLENBQWtDLENBQ3JDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFHTSxxQ0FBTyxHQUFkLFVBQWUsQ0FBYztRQUN6QixDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDOztnQkFwQ1ksU0FBUztnQkFDVixVQUFVO2dCQUNILGlCQUFpQjtnQkFDUixtQkFBbUI7O0lBN0MvQztRQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkIsV0FBVyxDQUFDLGFBQWEsQ0FBQzs2REFDQztJQUs1QjtRQURDLEtBQUssRUFBRTtzREFDTztJQUdmO1FBREMsS0FBSyxFQUFFO3NEQUNhO0lBR3JCO1FBREMsTUFBTSxDQUFDLFlBQVksQ0FBQzs2REFDZTtJQUdwQztRQURDLEtBQUssRUFBRTswREFDMkI7SUFLbkM7UUFEQyxLQUFLLEVBQUU7dURBR1A7SUFrQkQ7UUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2dFQUMvQjtJQXFDeEM7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7c0RBR2pDO0lBbkZRLG1CQUFtQjtRQVIvQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxzTUFJVDtTQUNKLENBQUM7T0FDVyxtQkFBbUIsQ0FvRi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXBGRCxDQUE0QyxhQUFhLEdBb0Z4RDtTQXBGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIE91dHB1dCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBTdWlUcmFuc2l0aW9uLFxuICAgIFRyYW5zaXRpb25Db250cm9sbGVyLFxuICAgIFRyYW5zaXRpb24sXG4gICAgVHJhbnNpdGlvbkRpcmVjdGlvblxufSBmcm9tIFwiLi4vLi4vdHJhbnNpdGlvbi9pbmRleFwiO1xuaW1wb3J0IHsgSGFuZGxlZEV2ZW50LCBTdWlDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHsgSU9wdGlvbkNvbnRleHQgfSBmcm9tIFwiLi4vY2xhc3Nlcy9zZWxlY3QtYmFzZVwiO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMzQ0OS5cbmNvbnN0IHRlbXBsYXRlUmVmID0gVGVtcGxhdGVSZWY7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1tdWx0aS1zZWxlY3QtbGFiZWxcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiAjdGVtcGxhdGVTaWJsaW5nPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhdGVtcGxhdGVcIiBbaW5uZXJIVE1MXT1cImZvcm1hdHRlcih2YWx1ZSlcIj48L3NwYW4+XG4gICAgICAgIDxpIGNsYXNzPVwiZGVsZXRlIGljb25cIiAoY2xpY2spPVwiZGVzZWxlY3RPcHRpb24oJGV2ZW50KVwiPjwvaT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFN1aU11bHRpU2VsZWN0TGFiZWw8VD4gZXh0ZW5kcyBTdWlUcmFuc2l0aW9uIHtcbiAgICAvLyBTZXRzIHRoZSBTZW1hbnRpYyBVSSBjbGFzc2VzIG9uIHRoZSBob3N0IGVsZW1lbnQuXG4gICAgLy8gRG9pbmcgaXQgb24gdGhlIGhvc3QgZW5hYmxlcyB1c2UgaW4gbWVudXMgZXRjLlxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MubGFiZWxcIilcbiAgICBwdWJsaWMgbGFiZWxDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBwcml2YXRlIF90cmFuc2l0aW9uQ29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOlQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBxdWVyeT86c3RyaW5nO1xuXG4gICAgQE91dHB1dChcImRlc2VsZWN0ZWRcIilcbiAgICBwdWJsaWMgb25EZXNlbGVjdGVkOkV2ZW50RW1pdHRlcjxUPjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZvcm1hdHRlcjoob2JqOlQpID0+IHN0cmluZztcblxuICAgIHByaXZhdGUgX3RlbXBsYXRlPzpUZW1wbGF0ZVJlZjxJT3B0aW9uQ29udGV4dDxUPj47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgdGVtcGxhdGUoKTpUZW1wbGF0ZVJlZjxJT3B0aW9uQ29udGV4dDxUPj4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB0ZW1wbGF0ZSh0ZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJT3B0aW9uQ29udGV4dDxUPj4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGVWaWV3KFxuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVTaWJsaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnF1ZXJ5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBsYWNlaG9sZGVyIHRvIGRyYXcgdGVtcGxhdGUgYmVzaWRlLlxuICAgIEBWaWV3Q2hpbGQoXCJ0ZW1wbGF0ZVNpYmxpbmdcIiwgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgICBwdWJsaWMgdGVtcGxhdGVTaWJsaW5nOlZpZXdDb250YWluZXJSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIGNoYW5nZURldGVjdG9yOkNoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yeTpTdWlDb21wb25lbnRGYWN0b3J5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJlbmRlcmVyLCBlbGVtZW50LCBjaGFuZ2VEZXRlY3Rvcik7XG5cbiAgICAgICAgLy8gSW5pdGlhbGlzZSB0cmFuc2l0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBcImlubGluZS1ibG9ja1wiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbkNvbnRyb2xsZXIodGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMub25EZXNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgICAgIHRoaXMubGFiZWxDbGFzc2VzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgbmV3IFRyYW5zaXRpb24oXCJzY2FsZVwiLCAxMDAsIFRyYW5zaXRpb25EaXJlY3Rpb24uSW4pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc2VsZWN0T3B0aW9uKGU6SGFuZGxlZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgZS5ldmVudEhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyLmFuaW1hdGUoXG4gICAgICAgICAgICBuZXcgVHJhbnNpdGlvbihcInNjYWxlXCIsIDEwMCwgVHJhbnNpdGlvbkRpcmVjdGlvbi5PdXQsICgpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlc2VsZWN0ZWQuZW1pdCh0aGlzLnZhbHVlKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgcHVibGljIG9uQ2xpY2soZTpIYW5kbGVkRXZlbnQpOnZvaWQge1xuICAgICAgICBlLmV2ZW50SGFuZGxlZCA9IHRydWU7XG4gICAgfVxufVxuIl19