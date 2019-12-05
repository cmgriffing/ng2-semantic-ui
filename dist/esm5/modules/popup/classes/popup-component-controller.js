import * as tslib_1 from "tslib";
import { SuiPopupController } from "./popup-controller";
var SuiPopupComponentController = /** @class */ (function (_super) {
    tslib_1.__extends(SuiPopupComponentController, _super);
    function SuiPopupComponentController(_renderer, element, _componentFactory, _component, _config) {
        var _this = _super.call(this, _renderer, element, _componentFactory, _config) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._component = _component;
        _this._config = _config;
        return _this;
    }
    Object.defineProperty(SuiPopupComponentController.prototype, "componentInstance", {
        get: function () {
            if (this._contentComponentRef) {
                return this._contentComponentRef.instance;
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiPopupComponentController.prototype.open = function () {
        if (!this._contentComponentRef) {
            this._contentComponentRef = this._componentFactory.createComponent(this._component);
            this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
        }
        _super.prototype.open.call(this);
    };
    SuiPopupComponentController.prototype.cleanup = function () {
        _super.prototype.cleanup.call(this);
        if (this._contentComponentRef) {
            this._contentComponentRef.destroy();
            this._contentComponentRef = undefined;
        }
    };
    return SuiPopupComponentController;
}(SuiPopupController));
export { SuiPopupComponentController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtY29tcG9uZW50LWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3BvcHVwL2NsYXNzZXMvcG9wdXAtY29tcG9uZW50LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSXhEO0lBQW9ELHVEQUFrQjtJQVVsRSxxQ0FDYyxTQUFtQixFQUN0QixPQUFrQixFQUNmLGlCQUFxQyxFQUNyQyxVQUFrQixFQUNsQixPQUFtQjtRQUxqQyxZQU9JLGtCQUFNLFNBQVMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLFNBQ3hEO1FBUGEsZUFBUyxHQUFULFNBQVMsQ0FBVTtRQUN0QixhQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2YsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUNyQyxnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixhQUFPLEdBQVAsT0FBTyxDQUFZOztJQUdqQyxDQUFDO0lBZEQsc0JBQVcsMERBQWlCO2FBQTVCO1lBQ0ksSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQzthQUM3QztRQUNMLENBQUM7OztPQUFBO0lBWU0sMENBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQzlELElBQUksQ0FBQyxVQUFxQixDQUM3QixDQUFDO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FDL0IsSUFBSSxDQUFDLG9CQUFvQixFQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FDN0IsQ0FBQztTQUNMO1FBRUQsaUJBQU0sSUFBSSxXQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLDZDQUFPLEdBQWpCO1FBQ0ksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFFaEIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBQ0wsa0NBQUM7QUFBRCxDQUFDLEFBMUNELENBQW9ELGtCQUFrQixHQTBDckUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIFR5cGUsXG4gICAgUmVuZGVyZXIyLFxuICAgIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpUG9wdXBDb250cm9sbGVyIH0gZnJvbSBcIi4vcG9wdXAtY29udHJvbGxlclwiO1xuaW1wb3J0IHsgUG9wdXBDb25maWcgfSBmcm9tIFwiLi9wb3B1cC1jb25maWdcIjtcbmltcG9ydCB7IFN1aUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL3NlcnZpY2VzL2NvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFN1aVBvcHVwQ29tcG9uZW50Q29udHJvbGxlcjxUPiBleHRlbmRzIFN1aVBvcHVwQ29udHJvbGxlciB7XG4gICAgLy8gU3RvcmVzIHJlZmVyZW5jZSB0byBnZW5lcmF0ZWQgY29udGVudCBjb21wb25lbnQuXG4gICAgcHJpdmF0ZSBfY29udGVudENvbXBvbmVudFJlZj86Q29tcG9uZW50UmVmPFQ+O1xuXG4gICAgcHVibGljIGdldCBjb21wb25lbnRJbnN0YW5jZSgpOlQgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5fY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfY29tcG9uZW50RmFjdG9yeTpTdWlDb21wb25lbnRGYWN0b3J5LFxuICAgICAgICBwcm90ZWN0ZWQgX2NvbXBvbmVudDpUeXBlPFQ+LFxuICAgICAgICBwcm90ZWN0ZWQgX2NvbmZpZzpQb3B1cENvbmZpZ1xuICAgICkge1xuICAgICAgICBzdXBlcihfcmVuZGVyZXIsIGVsZW1lbnQsIF9jb21wb25lbnRGYWN0b3J5LCBfY29uZmlnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbigpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRDb21wb25lbnRSZWYgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnQgYXMgVHlwZTxUPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuYXR0YWNoVG9WaWV3KFxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRDb21wb25lbnRSZWYsXG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1cC50ZW1wbGF0ZVNpYmxpbmdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5vcGVuKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsZWFudXAoKTp2b2lkIHtcbiAgICAgICAgc3VwZXIuY2xlYW51cCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jb250ZW50Q29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50Q29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRDb21wb25lbnRSZWYgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=