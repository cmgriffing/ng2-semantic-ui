import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, TemplateRef, Renderer2 } from "@angular/core";
import { PopupConfig } from "../classes/popup-config";
import { SuiPopupConfig } from "../services/popup.service";
import { SuiPopupTemplateController } from "../classes/popup-template-controller";
import { Util } from "../../../misc/util/helpers/util";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
var templateRef = TemplateRef;
var SuiPopupDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SuiPopupDirective, _super);
    function SuiPopupDirective(_renderer, element, _componentFactory, _popupDefaults) {
        var _this = _super.call(this, _renderer, element, _componentFactory, new PopupConfig(_popupDefaults)) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._popupDefaults = _popupDefaults;
        return _this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9wb3B1cC9kaXJlY3RpdmVzL3BvcHVwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFDWCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBZ0IsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsT0FBTyxFQUNILDBCQUEwQixFQUc3QixNQUFNLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUU1RixJQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFNaEM7SUFBMEMsNkNBQTZCO0lBbUVuRSwyQkFDYyxTQUFtQixFQUN0QixPQUFrQixFQUNmLGlCQUFxQyxFQUNyQyxjQUE2QjtRQUozQyxZQU1JLGtCQUNJLFNBQVMsRUFDVCxPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUNsQyxTQUNKO1FBWGEsZUFBUyxHQUFULFNBQVMsQ0FBVTtRQUN0QixhQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2YsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUNyQyxvQkFBYyxHQUFkLGNBQWMsQ0FBZTs7SUFRM0MsQ0FBQztJQTdFRCxzQkFBVywwQ0FBVzthQUF0QixVQUF1QixNQUFhO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyx3Q0FBUzth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IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BvcHVwXCI7XG5pbXBvcnQgeyBQb3B1cENvbmZpZywgUG9wdXBUcmlnZ2VyIH0gZnJvbSBcIi4uL2NsYXNzZXMvcG9wdXAtY29uZmlnXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbmZpZyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9wb3B1cC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdWlQb3B1cENvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy9wb3B1cC1jb250cm9sbGVyXCI7XG5pbXBvcnQge1xuICAgIFN1aVBvcHVwVGVtcGxhdGVDb250cm9sbGVyLFxuICAgIElUZW1wbGF0ZVBvcHVwQ29udGV4dCxcbiAgICBJVGVtcGxhdGVQb3B1cENvbmZpZ1xufSBmcm9tIFwiLi4vY2xhc3Nlcy9wb3B1cC10ZW1wbGF0ZS1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcbmltcG9ydCB7IFBvc2l0aW9uaW5nUGxhY2VtZW50IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9zZXJ2aWNlcy9wb3NpdGlvbmluZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdWlDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9zZXJ2aWNlcy9jb21wb25lbnQtZmFjdG9yeS5zZXJ2aWNlXCI7XG5cbmNvbnN0IHRlbXBsYXRlUmVmID0gVGVtcGxhdGVSZWY7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlQb3B1cF1cIixcbiAgICBleHBvcnRBczogXCJzdWlQb3B1cFwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aVBvcHVwRGlyZWN0aXZlPFQ+IGV4dGVuZHMgU3VpUG9wdXBUZW1wbGF0ZUNvbnRyb2xsZXI8VD4ge1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cEhlYWRlcihoZWFkZXI6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLmhlYWRlciA9IGhlYWRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcG9wdXBUZXh0KHRleHQ6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRleHQgPSB0ZXh0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cEludmVydGVkKGludmVydGVkOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcuaXNJbnZlcnRlZCA9IFV0aWwuRE9NLnBhcnNlQm9vbGVhbkF0dHJpYnV0ZShpbnZlcnRlZCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwQmFzaWMoYmFzaWM6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy5pc0Jhc2ljID0gVXRpbC5ET00ucGFyc2VCb29sZWFuQXR0cmlidXRlKGJhc2ljKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcG9wdXBUcmFuc2l0aW9uKHRyYW5zaXRpb246c3RyaW5nKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cFRyYW5zaXRpb25EdXJhdGlvbihkdXJhdGlvbjpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwUGxhY2VtZW50KHBsYWNlbWVudDpQb3NpdGlvbmluZ1BsYWNlbWVudCkge1xuICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwRGVsYXkoZGVsYXk6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLmRlbGF5ID0gZGVsYXk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHBvcHVwVHJpZ2dlcigpOlBvcHVwVHJpZ2dlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcHVwLmNvbmZpZy50cmlnZ2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcG9wdXBUcmlnZ2VyKHRyaWdnZXI6UG9wdXBUcmlnZ2VyKSB7XG4gICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXIgPSB0cmlnZ2VyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBwb3B1cFRlbXBsYXRlKFxuICAgICAgICB0ZW1wbGF0ZTpUZW1wbGF0ZVJlZjxJVGVtcGxhdGVQb3B1cENvbnRleHQ8VD4+IHwgdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcG9wdXBUZW1wbGF0ZUNvbnRleHQoY29udGV4dDpUIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHBvcHVwQ29uZmlnKGNvbmZpZzpJVGVtcGxhdGVQb3B1cENvbmZpZzxUPiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZShjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9jb21wb25lbnRGYWN0b3J5OlN1aUNvbXBvbmVudEZhY3RvcnksXG4gICAgICAgIHByb3RlY3RlZCBfcG9wdXBEZWZhdWx0czpTdWlQb3B1cENvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIF9yZW5kZXJlcixcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBfY29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgIG5ldyBQb3B1cENvbmZpZyhfcG9wdXBEZWZhdWx0cylcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=