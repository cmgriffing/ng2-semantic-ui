import * as tslib_1 from "tslib";
import { Component, HostBinding, Input, Output, Renderer2, ElementRef, EventEmitter } from "@angular/core";
import { SidebarService, SidebarTransition, SidebarDirection } from "../services/sidebar.service";
var SuiSidebar = /** @class */ (function () {
    function SuiSidebar(_renderer, _element) {
        var _this = this;
        this._renderer = _renderer;
        this._element = _element;
        this.service = new SidebarService();
        // We set the default here as well to force the classes to update.
        this.transition = SidebarTransition.Uncover;
        this.direction = SidebarDirection.Left;
        setTimeout(function () { return _this.updateDimensions(); });
        this.service.isVisibleChange.subscribe(function () { return _this.updateDimensions(); });
        this.sidebarClasses = true;
    }
    Object.defineProperty(SuiSidebar.prototype, "transition", {
        get: function () {
            return this.service.transition;
        },
        set: function (transition) {
            var _this = this;
            this.service.transition
                .split(" ")
                .forEach(function (c) { return _this.setClass(c, false); });
            this.service.transition = transition;
            this.service.transition.split(" ").forEach(function (c) { return _this.setClass(c, true); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "direction", {
        get: function () {
            return this.service.direction;
        },
        set: function (direction) {
            this.setClass(this.service.direction, false);
            this.service.direction = direction;
            this.setClass(this.service.direction, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "isVisible", {
        get: function () {
            return this.service.isVisible;
        },
        set: function (isVisible) {
            this.service.setVisibleState(isVisible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "isVisibleChange", {
        get: function () {
            return this.service.isVisibleChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "isAnimating", {
        get: function () {
            return this.service.isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    SuiSidebar.prototype.updateDimensions = function () {
        this.service.width = this._element.nativeElement.offsetWidth;
        this.service.height = this._element.nativeElement.offsetHeight;
    };
    SuiSidebar.prototype.setClass = function (className, isAdd) {
        if (isAdd === void 0) { isAdd = true; }
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    };
    SuiSidebar.prototype.open = function () {
        this.service.setVisibleState(true);
    };
    SuiSidebar.prototype.close = function () {
        this.service.setVisibleState(false);
    };
    SuiSidebar.prototype.toggle = function () {
        this.service.toggleVisibleState();
    };
    SuiSidebar.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.sidebar"),
        HostBinding("class.menu")
    ], SuiSidebar.prototype, "sidebarClasses", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiSidebar.prototype, "transition", null);
    tslib_1.__decorate([
        Input()
    ], SuiSidebar.prototype, "direction", null);
    tslib_1.__decorate([
        HostBinding("class.visible"),
        Input()
    ], SuiSidebar.prototype, "isVisible", null);
    tslib_1.__decorate([
        Output()
    ], SuiSidebar.prototype, "isVisibleChange", null);
    tslib_1.__decorate([
        HostBinding("class.animating")
    ], SuiSidebar.prototype, "isAnimating", null);
    SuiSidebar = tslib_1.__decorate([
        Component({
            selector: "sui-sidebar",
            template: "\n        <ng-content></ng-content>\n    "
        })
    ], SuiSidebar);
    return SuiSidebar;
}());
export { SuiSidebar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2lkZWJhci9jb21wb25lbnRzL3NpZGViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ25CLE1BQU0sNkJBQTZCLENBQUM7QUFRckM7SUF3REksb0JBQXNCLFNBQW1CLEVBQVUsUUFBbUI7UUFBdEUsaUJBVUM7UUFWcUIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztRQUV2QyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUF6REQsc0JBQVcsa0NBQVU7YUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ25DLENBQUM7YUFFRCxVQUFzQixVQUE0QjtZQUFsRCxpQkFRQztZQVBHLElBQUks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QWFEO1FBREMsS0FBSyxFQUFFOytDQUdQO0lBWUQ7UUFGQyxXQUFXLENBQUMsZUFBZSxDQUFDO1FBQzVCLEtBQUssRUFBRTsrQ0FHUDtJQU9EO1FBREMsTUFBTSxFQUFFO3FEQUdSO0lBR0Q7UUFEQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7aURBRzlCO0lBdERRLFVBQVU7UUFOdEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLDJDQUVUO1NBQ0osQ0FBQztPQUNXLFVBQVUsQ0E0RnRCO0lBQUQsaUJBQUM7Q0FBQSxBQTVGRCxJQTRGQztTQTVGWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBTaWRlYmFyU2VydmljZSxcbiAgICBTaWRlYmFyVHJhbnNpdGlvbixcbiAgICBTaWRlYmFyRGlyZWN0aW9uXG59IGZyb20gXCIuLi9zZXJ2aWNlcy9zaWRlYmFyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXNpZGViYXJcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdWlTaWRlYmFyIHtcbiAgICBwdWJsaWMgc2VydmljZTpTaWRlYmFyU2VydmljZTtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnVpXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc2lkZWJhclwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLm1lbnVcIilcbiAgICBwdWJsaWMgc2lkZWJhckNsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCB0cmFuc2l0aW9uKCk6U2lkZWJhclRyYW5zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB0cmFuc2l0aW9uKHRyYW5zaXRpb246U2lkZWJhclRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnRyYW5zaXRpb25cbiAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgIC5mb3JFYWNoKGMgPT4gdGhpcy5zZXRDbGFzcyhjLCBmYWxzZSkpO1xuXG4gICAgICAgIHRoaXMuc2VydmljZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcblxuICAgICAgICB0aGlzLnNlcnZpY2UudHJhbnNpdGlvbi5zcGxpdChcIiBcIikuZm9yRWFjaChjID0+IHRoaXMuc2V0Q2xhc3MoYywgdHJ1ZSkpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBkaXJlY3Rpb24oKTpTaWRlYmFyRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOlNpZGViYXJEaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zZXRDbGFzcyh0aGlzLnNlcnZpY2UuZGlyZWN0aW9uLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5zZXJ2aWNlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblxuICAgICAgICB0aGlzLnNldENsYXNzKHRoaXMuc2VydmljZS5kaXJlY3Rpb24sIHRydWUpO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnZpc2libGVcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNWaXNpYmxlKGlzVmlzaWJsZTpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZXRWaXNpYmxlU3RhdGUoaXNWaXNpYmxlKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZUNoYW5nZSgpOkV2ZW50RW1pdHRlcjxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNWaXNpYmxlQ2hhbmdlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFuaW1hdGluZ1wiKVxuICAgIHB1YmxpYyBnZXQgaXNBbmltYXRpbmcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5pc0FuaW1hdGluZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBTaWRlYmFyU2VydmljZSgpO1xuICAgICAgICAvLyBXZSBzZXQgdGhlIGRlZmF1bHQgaGVyZSBhcyB3ZWxsIHRvIGZvcmNlIHRoZSBjbGFzc2VzIHRvIHVwZGF0ZS5cbiAgICAgICAgdGhpcy50cmFuc2l0aW9uID0gU2lkZWJhclRyYW5zaXRpb24uVW5jb3ZlcjtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBTaWRlYmFyRGlyZWN0aW9uLkxlZnQ7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKSk7XG4gICAgICAgIHRoaXMuc2VydmljZS5pc1Zpc2libGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlRGltZW5zaW9ucygpKTtcblxuICAgICAgICB0aGlzLnNpZGViYXJDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZURpbWVuc2lvbnMoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLndpZHRoID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLnNlcnZpY2UuaGVpZ2h0ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENsYXNzKGNsYXNzTmFtZTpzdHJpbmcsIGlzQWRkOmJvb2xlYW4gPSB0cnVlKTp2b2lkIHtcbiAgICAgICAgaWYgKGlzQWRkKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbigpOnZvaWQge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0VmlzaWJsZVN0YXRlKHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpOnZvaWQge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0VmlzaWJsZVN0YXRlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2VydmljZS50b2dnbGVWaXNpYmxlU3RhdGUoKTtcbiAgICB9XG59XG4iXX0=