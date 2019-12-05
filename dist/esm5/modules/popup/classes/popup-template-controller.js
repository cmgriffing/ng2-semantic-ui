import * as tslib_1 from "tslib";
import { TemplateRef } from "@angular/core";
import { SuiPopupController } from "./popup-controller";
import { PopupConfig } from "./popup-config";
var templateRef = TemplateRef;
var TemplatePopupConfig = /** @class */ (function (_super) {
    tslib_1.__extends(TemplatePopupConfig, _super);
    function TemplatePopupConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TemplatePopupConfig;
}(PopupConfig));
export { TemplatePopupConfig };
var SuiPopupTemplateController = /** @class */ (function (_super) {
    tslib_1.__extends(SuiPopupTemplateController, _super);
    function SuiPopupTemplateController(_renderer, element, _componentFactory, _config) {
        var _this = _super.call(this, _renderer, element, _componentFactory, _config) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._config = _config;
        return _this;
    }
    SuiPopupTemplateController.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    };
    SuiPopupTemplateController.prototype.open = function () {
        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();
            this._componentFactory.createView(this.popup.templateSibling, this.template, {
                $implicit: this.popup,
                context: this.context
            });
        }
        _super.prototype.open.call(this);
    };
    return SuiPopupTemplateController;
}(SuiPopupController));
export { SuiPopupTemplateController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtdGVtcGxhdGUtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvcG9wdXAvY2xhc3Nlcy9wb3B1cC10ZW1wbGF0ZS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFnQixNQUFNLGdCQUFnQixDQUFDO0FBTTNELElBQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQztBQVdoQztJQUE0QywrQ0FBVztJQUF2RDs7SUFHQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBNEMsV0FBVyxHQUd0RDs7QUFFRDtJQUFtRCxzREFBa0I7SUFJakUsb0NBQ2MsU0FBbUIsRUFDdEIsT0FBa0IsRUFDZixpQkFBcUMsRUFDckMsT0FBbUI7UUFKakMsWUFNSSxrQkFBTSxTQUFTLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxTQUN4RDtRQU5hLGVBQVMsR0FBVCxTQUFTLENBQVU7UUFDdEIsYUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNmLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7UUFDckMsYUFBTyxHQUFQLE9BQU8sQ0FBWTs7SUFHakMsQ0FBQztJQUVNLDhDQUFTLEdBQWhCLFVBQWlCLE1BQStCO1FBQzVDLGlCQUFNLFNBQVMsWUFBQyxNQUFNLENBQUMsQ0FBQztRQUV4QixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRU0seUNBQUksR0FBWDtRQUNJLG1EQUFtRDtRQUNuRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFDMUIsSUFBSSxDQUFDLFFBQVEsRUFDYjtnQkFDSSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN4QixDQUNKLENBQUM7U0FDTDtRQUVELGlCQUFNLElBQUksV0FBRSxDQUFDO0lBQ2pCLENBQUM7SUFDTCxpQ0FBQztBQUFELENBQUMsQUF2Q0QsQ0FBbUQsa0JBQWtCLEdBdUNwRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpUG9wdXBDb250cm9sbGVyLCBJUG9wdXAgfSBmcm9tIFwiLi9wb3B1cC1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBQb3B1cENvbmZpZywgSVBvcHVwQ29uZmlnIH0gZnJvbSBcIi4vcG9wdXAtY29uZmlnXCI7XG5pbXBvcnQge1xuICAgIFN1aUNvbXBvbmVudEZhY3RvcnksXG4gICAgSUltcGxpY2l0Q29udGV4dFxufSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL3NlcnZpY2VzL2NvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2VcIjtcblxuY29uc3QgdGVtcGxhdGVSZWYgPSBUZW1wbGF0ZVJlZjtcblxuZXhwb3J0IGludGVyZmFjZSBJVGVtcGxhdGVQb3B1cENvbnRleHQ8VD4gZXh0ZW5kcyBJSW1wbGljaXRDb250ZXh0PElQb3B1cD4ge1xuICAgIGNvbnRleHQ/OlQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRlbXBsYXRlUG9wdXBDb25maWc8VD4gZXh0ZW5kcyBJUG9wdXBDb25maWcge1xuICAgIHRlbXBsYXRlPzpUZW1wbGF0ZVJlZjxJVGVtcGxhdGVQb3B1cENvbnRleHQ8VD4+O1xuICAgIGNvbnRleHQ/OlQ7XG59XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVBvcHVwQ29uZmlnPFQ+IGV4dGVuZHMgUG9wdXBDb25maWcge1xuICAgIHB1YmxpYyB0ZW1wbGF0ZT86VGVtcGxhdGVSZWY8SVRlbXBsYXRlUG9wdXBDb250ZXh0PFQ+PjtcbiAgICBwdWJsaWMgY29udGV4dD86VDtcbn1cblxuZXhwb3J0IGNsYXNzIFN1aVBvcHVwVGVtcGxhdGVDb250cm9sbGVyPFQ+IGV4dGVuZHMgU3VpUG9wdXBDb250cm9sbGVyIHtcbiAgICBwdWJsaWMgdGVtcGxhdGU/OlRlbXBsYXRlUmVmPElUZW1wbGF0ZVBvcHVwQ29udGV4dDxUPj47XG4gICAgcHVibGljIGNvbnRleHQ/OlQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfY29tcG9uZW50RmFjdG9yeTpTdWlDb21wb25lbnRGYWN0b3J5LFxuICAgICAgICBwcm90ZWN0ZWQgX2NvbmZpZzpQb3B1cENvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihfcmVuZGVyZXIsIGVsZW1lbnQsIF9jb21wb25lbnRGYWN0b3J5LCBfY29uZmlnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uZmlndXJlKGNvbmZpZz86SVRlbXBsYXRlUG9wdXBDb25maWc8VD4pOnZvaWQge1xuICAgICAgICBzdXBlci5jb25maWd1cmUoY29uZmlnKTtcblxuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlID0gY29uZmlnLnRlbXBsYXRlO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gY29uZmlnLmNvbnRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbigpOnZvaWQge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHRlbXBsYXRlLCBpbmplY3QgaXQgaW50byB0aGUgdmlldy5cbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAudGVtcGxhdGVTaWJsaW5nLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuY3JlYXRlVmlldyhcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwLnRlbXBsYXRlU2libGluZyxcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJGltcGxpY2l0OiB0aGlzLnBvcHVwLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIub3BlbigpO1xuICAgIH1cbn1cbiJdfQ==