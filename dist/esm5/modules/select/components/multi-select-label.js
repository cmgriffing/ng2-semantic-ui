import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, HostListener, EventEmitter, ViewContainerRef, ViewChild, Renderer2, ElementRef, Output, ChangeDetectorRef, TemplateRef } from "@angular/core";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { Transition, TransitionDirection } from "../../../modules/transition/classes/transition";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
// See https://github.com/Microsoft/TypeScript/issues/13449.
var templateRef = TemplateRef;
var SuiMultiSelectLabel = /** @class */ (function (_super) {
    tslib_1.__extends(SuiMultiSelectLabel, _super);
    function SuiMultiSelectLabel(_renderer, element, _changeDetector, _componentFactory) {
        var _this = _super.call(this, _renderer, element, _changeDetector) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
        _this._componentFactory = _componentFactory;
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
                this._componentFactory.createView(this.templateSibling, this.template, {
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
        ViewChild("templateSibling", { read: ViewContainerRef, static: true })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zZWxlY3QvY29tcG9uZW50cy9tdWx0aS1zZWxlY3QtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDakcsT0FBTyxFQUNILFVBQVUsRUFDVixtQkFBbUIsRUFDdEIsTUFBTSxnREFBZ0QsQ0FBQztBQUN4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUc1Riw0REFBNEQ7QUFDNUQsSUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBVWhDO0lBQTRDLCtDQUFhO0lBOENyRCw2QkFDYyxTQUFtQixFQUN0QixPQUFrQixFQUNmLGVBQWlDLEVBQ2pDLGlCQUFxQztRQUpuRCxZQU1JLGtCQUFNLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLFNBZ0I3QztRQXJCYSxlQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ3RCLGFBQU8sR0FBUCxPQUFPLENBQVc7UUFDZixxQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakMsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUkvQyx1Q0FBdUM7UUFDdkMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksb0JBQW9CLENBQ2pELEtBQUssRUFDTCxjQUFjLENBQ2pCLENBQUM7UUFDRixLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFekQsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO1FBRTFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQzlCLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQ3ZELENBQUM7O0lBQ04sQ0FBQztJQTVDRCxzQkFBVyx5Q0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBRUQsVUFBb0IsUUFBbUQ7WUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQzdCLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQ2I7b0JBQ0ksU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ3BCLENBQ0osQ0FBQzthQUNMO1FBQ0wsQ0FBQzs7O09BZEE7SUE0Q00sNENBQWMsR0FBckIsVUFBc0IsQ0FBYztRQUFwQyxpQkFRQztRQVBHLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQzlCLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxFQUFFO1lBQ2xELE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztRQUFsQyxDQUFrQyxDQUNyQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBR00scUNBQU8sR0FBZCxVQUFlLENBQWM7UUFDekIsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7Z0JBcEN1QixTQUFTO2dCQUNkLFVBQVU7Z0JBQ0MsaUJBQWlCO2dCQUNmLG1CQUFtQjs7SUE3Q25EO1FBRkMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QixXQUFXLENBQUMsYUFBYSxDQUFDOzZEQUNDO0lBSzVCO1FBREMsS0FBSyxFQUFFO3NEQUNPO0lBR2Y7UUFEQyxLQUFLLEVBQUU7c0RBQ2E7SUFHckI7UUFEQyxNQUFNLENBQUMsWUFBWSxDQUFDOzZEQUNlO0lBR3BDO1FBREMsS0FBSyxFQUFFOzBEQUMyQjtJQUtuQztRQURDLEtBQUssRUFBRTt1REFHUDtJQWtCRDtRQURDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0VBQy9CO0lBcUN4QztRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztzREFHakM7SUFuRlEsbUJBQW1CO1FBUi9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsUUFBUSxFQUFFLHNNQUlUO1NBQ0osQ0FBQztPQUNXLG1CQUFtQixDQW9GL0I7SUFBRCwwQkFBQztDQUFBLEFBcEZELENBQTRDLGFBQWEsR0FvRnhEO1NBcEZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgUmVuZGVyZXIyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT3V0cHV0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IElPcHRpb25Db250ZXh0IH0gZnJvbSBcIi4uL2NsYXNzZXMvc2VsZWN0LWJhc2VcIjtcbmltcG9ydCB7IFN1aVRyYW5zaXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL2RpcmVjdGl2ZXMvdHJhbnNpdGlvblwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyXCI7XG5pbXBvcnQge1xuICAgIFRyYW5zaXRpb24sXG4gICAgVHJhbnNpdGlvbkRpcmVjdGlvblxufSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvblwiO1xuaW1wb3J0IHsgU3VpQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvc2VydmljZXMvY29tcG9uZW50LWZhY3Rvcnkuc2VydmljZVwiO1xuaW1wb3J0IHsgSGFuZGxlZEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM0NDkuXG5jb25zdCB0ZW1wbGF0ZVJlZiA9IFRlbXBsYXRlUmVmO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktbXVsdGktc2VsZWN0LWxhYmVsXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gI3RlbXBsYXRlU2libGluZz48L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCIgW2lubmVySFRNTF09XCJmb3JtYXR0ZXIodmFsdWUpXCI+PC9zcGFuPlxuICAgICAgICA8aSBjbGFzcz1cImRlbGV0ZSBpY29uXCIgKGNsaWNrKT1cImRlc2VsZWN0T3B0aW9uKCRldmVudClcIj48L2k+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlNdWx0aVNlbGVjdExhYmVsPFQ+IGV4dGVuZHMgU3VpVHJhbnNpdGlvbiB7XG4gICAgLy8gU2V0cyB0aGUgU2VtYW50aWMgVUkgY2xhc3NlcyBvbiB0aGUgaG9zdCBlbGVtZW50LlxuICAgIC8vIERvaW5nIGl0IG9uIHRoZSBob3N0IGVuYWJsZXMgdXNlIGluIG1lbnVzIGV0Yy5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmxhYmVsXCIpXG4gICAgcHVibGljIGxhYmVsQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRyb2xsZXI6VHJhbnNpdGlvbkNvbnRyb2xsZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB2YWx1ZTpUO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcXVlcnk/OnN0cmluZztcblxuICAgIEBPdXRwdXQoXCJkZXNlbGVjdGVkXCIpXG4gICAgcHVibGljIG9uRGVzZWxlY3RlZDpFdmVudEVtaXR0ZXI8VD47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmb3JtYXR0ZXI6KG9iajpUKSA9PiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF90ZW1wbGF0ZT86VGVtcGxhdGVSZWY8SU9wdGlvbkNvbnRleHQ8VD4+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHRlbXBsYXRlKCk6VGVtcGxhdGVSZWY8SU9wdGlvbkNvbnRleHQ8VD4+IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdGVtcGxhdGUodGVtcGxhdGU6VGVtcGxhdGVSZWY8SU9wdGlvbkNvbnRleHQ8VD4+IHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmNyZWF0ZVZpZXcoXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVNpYmxpbmcsXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICRpbXBsaWNpdDogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUGxhY2Vob2xkZXIgdG8gZHJhdyB0ZW1wbGF0ZSBiZXNpZGUuXG4gICAgQFZpZXdDaGlsZChcInRlbXBsYXRlU2libGluZ1wiLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyB0ZW1wbGF0ZVNpYmxpbmc6Vmlld0NvbnRhaW5lclJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvcjpDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9jb21wb25lbnRGYWN0b3J5OlN1aUNvbXBvbmVudEZhY3RvcnlcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX3JlbmRlcmVyLCBlbGVtZW50LCBfY2hhbmdlRGV0ZWN0b3IpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpc2UgdHJhbnNpdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlciA9IG5ldyBUcmFuc2l0aW9uQ29udHJvbGxlcihcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgXCJpbmxpbmUtYmxvY2tcIlxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldFRyYW5zaXRpb25Db250cm9sbGVyKHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLm9uRGVzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgICAgICB0aGlzLmxhYmVsQ2xhc3NlcyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIuYW5pbWF0ZShcbiAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFwic2NhbGVcIiwgMTAwLCBUcmFuc2l0aW9uRGlyZWN0aW9uLkluKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXNlbGVjdE9wdGlvbihlOkhhbmRsZWRFdmVudCk6dm9pZCB7XG4gICAgICAgIGUuZXZlbnRIYW5kbGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgbmV3IFRyYW5zaXRpb24oXCJzY2FsZVwiLCAxMDAsIFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0LCAoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25EZXNlbGVjdGVkLmVtaXQodGhpcy52YWx1ZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkNsaWNrKGU6SGFuZGxlZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgZS5ldmVudEhhbmRsZWQgPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==