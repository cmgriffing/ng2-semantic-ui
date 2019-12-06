import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, TemplateRef, Renderer2 } from "@angular/core";
import { ITemplateRefContext, Util, PositioningPlacement, SuiComponentFactory } from "../../../misc/util/index";
import { PopupConfig } from "../classes/popup-config";
import { SuiPopupConfig } from "../services/popup.service";
import { SuiPopupTemplateController } from "../classes/popup-template-controller";
var templateRef = TemplateRef;
var SuiPopupDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SuiPopupDirective, _super);
    function SuiPopupDirective(renderer, element, componentFactory, popupDefaults) {
        return _super.call(this, renderer, element, componentFactory, new PopupConfig(popupDefaults)) || this;
    }
    Object.defineProperty(SuiPopupDirective.prototype, "popupHeader", {
        set: function (header) {
            this.popup.config.header = header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupText", {
        set: function (text) {
            this.popup.config.text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupInverted", {
        set: function (inverted) {
            this.popup.config.isInverted = Util.DOM.parseBooleanAttribute(inverted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupBasic", {
        set: function (basic) {
            this.popup.config.isBasic = Util.DOM.parseBooleanAttribute(basic);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTransition", {
        set: function (transition) {
            this.popup.config.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTransitionDuration", {
        set: function (duration) {
            this.popup.config.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupPlacement", {
        set: function (placement) {
            this.popup.config.placement = placement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupDelay", {
        set: function (delay) {
            this.popup.config.delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTrigger", {
        get: function () {
            return this.popup.config.trigger;
        },
        set: function (trigger) {
            this.popup.config.trigger = trigger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTemplate", {
        set: function (template) {
            this.template = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTemplateContext", {
        set: function (context) {
            this.context = context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupConfig", {
        set: function (config) {
            this.configure(config);
        },
        enumerable: true,
        configurable: true
    });
    SuiPopupDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: SuiComponentFactory },
        { type: SuiPopupConfig }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupHeader", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupText", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupInverted", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupBasic", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTransition", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTransitionDuration", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupPlacement", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupDelay", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTrigger", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTemplate", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTemplateContext", null);
    tslib_1.__decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupConfig", null);
    SuiPopupDirective = tslib_1.__decorate([
        Directive({
            selector: "[suiPopup]",
            exportAs: "suiPopup"
        })
    ], SuiPopupDirective);
    return SuiPopupDirective;
}(SuiPopupTemplateController));
export { SuiPopupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9wb3B1cC9kaXJlY3RpdmVzL3BvcHVwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhILE9BQU8sRUFBRSxXQUFXLEVBQWdCLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTNELE9BQU8sRUFBRSwwQkFBMEIsRUFBK0MsTUFBTSxzQ0FBc0MsQ0FBQztBQUUvSCxJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFNaEM7SUFBMEMsNkNBQTZCO0lBaUVuRSwyQkFBWSxRQUFrQixFQUNsQixPQUFrQixFQUNsQixnQkFBb0MsRUFDcEMsYUFBNEI7ZUFFcEMsa0JBQU0sUUFBUSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBckVELHNCQUFXLDBDQUFXO2FBQXRCLFVBQXVCLE1BQWE7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLHdDQUFTO2FBQXBCLFVBQXFCLElBQVc7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLDRDQUFhO2FBQXhCLFVBQXlCLFFBQWdCO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcseUNBQVU7YUFBckIsVUFBc0IsS0FBYTtZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLDhDQUFlO2FBQTFCLFVBQTJCLFVBQWlCO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxzREFBdUI7YUFBbEMsVUFBbUMsUUFBZTtZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyw2Q0FBYzthQUF6QixVQUEwQixTQUE4QjtZQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcseUNBQVU7YUFBckIsVUFBc0IsS0FBWTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsMkNBQVk7YUFBdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxDQUFDO2FBRUQsVUFBd0IsT0FBb0I7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN4QyxDQUFDOzs7T0FKQTtJQU9ELHNCQUFXLDRDQUFhO2FBQXhCLFVBQXlCLFFBQTBEO1lBQy9FLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsbURBQW9CO2FBQS9CLFVBQWdDLE9BQXFCO1lBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsMENBQVc7YUFBdEIsVUFBdUIsTUFBMEM7WUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTs7Z0JBRW9CLFNBQVM7Z0JBQ1YsVUFBVTtnQkFDRCxtQkFBbUI7Z0JBQ3RCLGNBQWM7O0lBbEV4QztRQURDLEtBQUssRUFBRTt3REFHUDtJQUdEO1FBREMsS0FBSyxFQUFFO3NEQUdQO0lBR0Q7UUFEQyxLQUFLLEVBQUU7MERBR1A7SUFHRDtRQURDLEtBQUssRUFBRTt1REFHUDtJQUdEO1FBREMsS0FBSyxFQUFFOzREQUdQO0lBR0Q7UUFEQyxLQUFLLEVBQUU7b0VBR1A7SUFHRDtRQURDLEtBQUssRUFBRTsyREFHUDtJQUdEO1FBREMsS0FBSyxFQUFFO3VEQUdQO0lBR0Q7UUFEQyxLQUFLLEVBQUU7eURBR1A7SUFPRDtRQURDLEtBQUssRUFBRTswREFHUDtJQUdEO1FBREMsS0FBSyxFQUFFO2lFQUdQO0lBR0Q7UUFEQyxLQUFLLEVBQUU7d0RBR1A7SUEvRFEsaUJBQWlCO1FBSjdCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxVQUFVO1NBQ3ZCLENBQUM7T0FDVyxpQkFBaUIsQ0F3RTdCO0lBQUQsd0JBQUM7Q0FBQSxBQXhFRCxDQUEwQywwQkFBMEIsR0F3RW5FO1NBeEVZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIFRlbXBsYXRlUmVmLCBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSVRlbXBsYXRlUmVmQ29udGV4dCwgVXRpbCwgUG9zaXRpb25pbmdQbGFjZW1lbnQsIFN1aUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5pbXBvcnQgeyBTdWlQb3B1cCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BvcHVwXCI7XG5pbXBvcnQgeyBQb3B1cENvbmZpZywgUG9wdXBUcmlnZ2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvcG9wdXAtY29uZmlnXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbmZpZyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9wb3B1cC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy9wb3B1cC1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBTdWlQb3B1cFRlbXBsYXRlQ29udHJvbGxlciwgSVRlbXBsYXRlUG9wdXBDb250ZXh0LCBJVGVtcGxhdGVQb3B1cENvbmZpZyB9IGZyb20gXCIuLi9jbGFzc2VzL3BvcHVwLXRlbXBsYXRlLWNvbnRyb2xsZXJcIjtcblxuY29uc3QgdGVtcGxhdGVSZWYgPSBUZW1wbGF0ZVJlZjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aVBvcHVwXVwiLFxuICAgIGV4cG9ydEFzOiBcInN1aVBvcHVwXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpUG9wdXBEaXJlY3RpdmU8VD4gZXh0ZW5kcyBTdWlQb3B1cFRlbXBsYXRlQ29udHJvbGxlcjxUPiB7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwSGVhZGVyKGhlYWRlcjpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcuaGVhZGVyID0gaGVhZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cFRleHQodGV4dDpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwSW52ZXJ0ZWQoaW52ZXJ0ZWQ6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy5pc0ludmVydGVkID0gVXRpbC5ET00ucGFyc2VCb29sZWFuQXR0cmlidXRlKGludmVydGVkKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcG9wdXBCYXNpYyhiYXNpYzpib29sZWFuKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLmlzQmFzaWMgPSBVdGlsLkRPTS5wYXJzZUJvb2xlYW5BdHRyaWJ1dGUoYmFzaWMpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cFRyYW5zaXRpb24odHJhbnNpdGlvbjpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwVHJhbnNpdGlvbkR1cmF0aW9uKGR1cmF0aW9uOm51bWJlcikge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcG9wdXBQbGFjZW1lbnQocGxhY2VtZW50OlBvc2l0aW9uaW5nUGxhY2VtZW50KSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnBsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcG9wdXBEZWxheShkZWxheTpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcuZGVsYXkgPSBkZWxheTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgcG9wdXBUcmlnZ2VyKCk6UG9wdXBUcmlnZ2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBwb3B1cFRyaWdnZXIodHJpZ2dlcjpQb3B1cFRyaWdnZXIpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwVGVtcGxhdGUodGVtcGxhdGU6VGVtcGxhdGVSZWY8SVRlbXBsYXRlUG9wdXBDb250ZXh0PFQ+PiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwVGVtcGxhdGVDb250ZXh0KGNvbnRleHQ6VCB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cENvbmZpZyhjb25maWc6SVRlbXBsYXRlUG9wdXBDb25maWc8VD4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmUoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihyZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudEZhY3Rvcnk6U3VpQ29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBwb3B1cERlZmF1bHRzOlN1aVBvcHVwQ29uZmlnKSB7XG5cbiAgICAgICAgc3VwZXIocmVuZGVyZXIsIGVsZW1lbnQsIGNvbXBvbmVudEZhY3RvcnksIG5ldyBQb3B1cENvbmZpZyhwb3B1cERlZmF1bHRzKSk7XG4gICAgfVxufVxuIl19