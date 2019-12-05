import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";
import { SidebarTransition } from "../services/sidebar.service";
var SuiSidebarSibling = /** @class */ (function () {
    function SuiSidebarSibling(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.isDimmedWhenVisible = false;
        this.siblingClasses = true;
    }
    Object.defineProperty(SuiSidebarSibling.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (service) {
            var _this = this;
            this._service = service;
            setTimeout(function () { return _this.updateTransform(); });
            this._service.isVisibleChange.subscribe(function () { return _this.updateTransform(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebarSibling.prototype, "isVisible", {
        get: function () {
            if (!this.service) {
                return false;
            }
            return this.service.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebarSibling.prototype, "isDimmed", {
        get: function () {
            if (!this.service) {
                return false;
            }
            return this.service.isVisible && this.isDimmedWhenVisible;
        },
        enumerable: true,
        configurable: true
    });
    SuiSidebarSibling.prototype.updateTransform = function () {
        this._renderer.removeStyle(this._element.nativeElement, "transform");
        this._renderer.removeStyle(this._element.nativeElement, "-webkit-transform");
        if (this.service.isVisible &&
            this.service.transition !== SidebarTransition.Overlay &&
            this.service.transition !== SidebarTransition.ScaleDown) {
            var translate = "translate3d(" + this.service.width + "px, " + this.service.height + "px, 0)";
            this._renderer.setStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    };
    SuiSidebarSibling.prototype.onClick = function (event) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    };
    SuiSidebarSibling.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SuiSidebarSibling.prototype, "isDimmedWhenVisible", void 0);
    tslib_1.__decorate([
        HostBinding("class.visible")
    ], SuiSidebarSibling.prototype, "isVisible", null);
    tslib_1.__decorate([
        HostBinding("class.dimmed")
    ], SuiSidebarSibling.prototype, "isDimmed", null);
    tslib_1.__decorate([
        HostBinding("class.pusher")
    ], SuiSidebarSibling.prototype, "siblingClasses", void 0);
    tslib_1.__decorate([
        HostListener("click", ["$event"])
    ], SuiSidebarSibling.prototype, "onClick", null);
    SuiSidebarSibling = tslib_1.__decorate([
        Component({
            selector: "sui-sidebar-sibling",
            template: "\n        <ng-content></ng-content>\n    ",
            styles: ["\n            :host {\n                display: block;\n            }\n        "]
        })
    ], SuiSidebarSibling);
    return SuiSidebarSibling;
}());
export { SuiSidebarSibling };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1zaWJsaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zaWRlYmFyL2NvbXBvbmVudHMvc2lkZWJhci1zaWJsaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBZWhGO0lBb0NJLDJCQUFzQixTQUFtQixFQUFVLFFBQW1CO1FBQWhELGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQXJDRCxzQkFBVyxzQ0FBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBbUIsT0FBc0I7WUFBekMsaUJBS0M7WUFKRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUV4QixVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsRUFBRSxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDMUUsQ0FBQzs7O09BUEE7SUFhRCxzQkFBVyx3Q0FBUzthQUFwQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLHVDQUFRO2FBQW5CO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUM5RCxDQUFDOzs7T0FBQTtJQVdPLDJDQUFlLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixtQkFBbUIsQ0FDdEIsQ0FBQztRQUVGLElBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLGlCQUFpQixDQUFDLE9BQU87WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssaUJBQWlCLENBQUMsU0FBUyxFQUN6RDtZQUNFLElBQU0sU0FBUyxHQUFHLGlCQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxXQUFRLENBQUM7WUFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixXQUFXLEVBQ1gsU0FBUyxDQUNaLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLG1CQUFtQixFQUNuQixTQUFTLENBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUdNLG1DQUFPLEdBQWQsVUFBZSxLQUFnQjtRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDOztnQkFyQytCLFNBQVM7Z0JBQW1CLFVBQVU7O0lBckJ0RTtRQURDLEtBQUssRUFBRTtrRUFDMkI7SUFHbkM7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO3NEQU01QjtJQUdEO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQztxREFNM0I7SUFHRDtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7NkRBQ0U7SUFtQzlCO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29EQUtqQztJQXpFUSxpQkFBaUI7UUFiN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsMkNBRVQ7cUJBRUcsaUZBSUM7U0FFUixDQUFDO09BQ1csaUJBQWlCLENBMEU3QjtJQUFELHdCQUFDO0NBQUEsQUExRUQsSUEwRUM7U0ExRVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTaWRlYmFyU2VydmljZSwgU2lkZWJhclRyYW5zaXRpb24gfSBmcm9tIFwiLi4vc2VydmljZXMvc2lkZWJhci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zaWRlYmFyLXNpYmxpbmdcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTaWRlYmFyU2libGluZyB7XG4gICAgcHJpdmF0ZSBfc2VydmljZTpTaWRlYmFyU2VydmljZTtcblxuICAgIHB1YmxpYyBnZXQgc2VydmljZSgpOlNpZGViYXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZXJ2aWNlKHNlcnZpY2U6U2lkZWJhclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZSA9IHNlcnZpY2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybSgpKTtcbiAgICAgICAgdGhpcy5fc2VydmljZS5pc1Zpc2libGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVHJhbnNmb3JtKCkpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzRGltbWVkV2hlblZpc2libGU6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnZpc2libGVcIilcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRpbW1lZFwiKVxuICAgIHB1YmxpYyBnZXQgaXNEaW1tZWQoKTpib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzVmlzaWJsZSAmJiB0aGlzLmlzRGltbWVkV2hlblZpc2libGU7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucHVzaGVyXCIpXG4gICAgcHVibGljIHNpYmxpbmdDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuaXNEaW1tZWRXaGVuVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2libGluZ0NsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVHJhbnNmb3JtKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ0cmFuc2Zvcm1cIik7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgXCItd2Via2l0LXRyYW5zZm9ybVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmlzVmlzaWJsZSAmJlxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnRyYW5zaXRpb24gIT09IFNpZGViYXJUcmFuc2l0aW9uLk92ZXJsYXkgJiZcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS50cmFuc2l0aW9uICE9PSBTaWRlYmFyVHJhbnNpdGlvbi5TY2FsZURvd25cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnNlcnZpY2Uud2lkdGh9cHgsICR7dGhpcy5zZXJ2aWNlLmhlaWdodH1weCwgMClgO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIixcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbkNsaWNrKGV2ZW50Ok1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLmlzVmlzaWJsZSAmJiAhdGhpcy5zZXJ2aWNlLndhc0p1c3RPcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZXRWaXNpYmxlU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19