import * as tslib_1 from "tslib";
import { Component, Input, Output, HostBinding, HostListener, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { TransitionController, SuiTransition, TransitionDirection, Transition } from "../../transition/index";
var SuiDimmer = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDimmer, _super);
    function SuiDimmer(renderer, element, changeDetector) {
        var _this = _super.call(this, renderer, element, changeDetector) || this;
        _this._isDimmed = false;
        _this.isDimmedChange = new EventEmitter();
        _this.isClickable = true;
        _this.wrapContent = true;
        _this.dimmerClasses = true;
        return _this;
    }
    Object.defineProperty(SuiDimmer.prototype, "isDimmed", {
        get: function () {
            return this._isDimmed;
        },
        set: function (value) {
            var isDimmed = !!value;
            if (!this._transitionController) {
                // Initialise transition functionality when first setting dimmed, to ensure initial state doesn't transition.
                this._transitionController = new TransitionController(isDimmed, "block");
                this.setTransitionController(this._transitionController);
                this._isDimmed = isDimmed;
            }
            else if (this._isDimmed !== isDimmed) {
                this._isDimmed = isDimmed;
                this._transitionController.stopAll();
                this._transitionController.animate(new Transition("fade", this.transitionDuration, isDimmed ? TransitionDirection.In : TransitionDirection.Out));
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiDimmer.prototype.onClick = function () {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    };
    SuiDimmer.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.dimmer")
    ], SuiDimmer.prototype, "dimmerClasses", void 0);
    tslib_1.__decorate([
        HostBinding("class.active"),
        Input()
    ], SuiDimmer.prototype, "isDimmed", null);
    tslib_1.__decorate([
        Output()
    ], SuiDimmer.prototype, "isDimmedChange", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDimmer.prototype, "isClickable", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDimmer.prototype, "transition", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDimmer.prototype, "transitionDuration", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiDimmer.prototype, "wrapContent", void 0);
    tslib_1.__decorate([
        HostListener("click")
    ], SuiDimmer.prototype, "onClick", null);
    SuiDimmer = tslib_1.__decorate([
        Component({
            selector: "sui-dimmer",
            template: "\n        <div [class.content]=\"wrapContent\">\n            <div [class.center]=\"wrapContent\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
            styles: ["\n            :host.dimmer {\n                transition: none;\n            }\n        "]
        })
    ], SuiDimmer);
    return SuiDimmer;
}(SuiTransition));
export { SuiDimmer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGltbWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kaW1tZXIvY29tcG9uZW50cy9kaW1tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsVUFBVSxFQUNiLE1BQU0sd0JBQXdCLENBQUM7QUFtQmhDO0lBQStCLHFDQUFhO0lBMER4QyxtQkFDSSxRQUFrQixFQUNsQixPQUFrQixFQUNsQixjQUFnQztRQUhwQyxZQUtJLGtCQUFNLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLFNBUzNDO1FBUEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2xELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOztJQUM5QixDQUFDO0lBN0RELHNCQUFXLCtCQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFvQixLQUFhO1lBQzdCLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDN0IsNkdBQTZHO2dCQUM3RyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxvQkFBb0IsQ0FDakQsUUFBUSxFQUNSLE9BQU8sQ0FDVixDQUFDO2dCQUVGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFFekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBRTFCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FDOUIsSUFBSSxVQUFVLENBQ1YsTUFBTSxFQUNOLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FDOUQsQ0FDSixDQUFDO2FBQ0w7UUFDTCxDQUFDOzs7T0EzQkE7SUE4RE0sMkJBQU8sR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDOztnQkFyQlksU0FBUztnQkFDVixVQUFVO2dCQUNILGlCQUFpQjs7SUExRHBDO1FBRkMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QixXQUFXLENBQUMsY0FBYyxDQUFDO29EQUNDO0lBUTdCO1FBRkMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUMzQixLQUFLLEVBQUU7NkNBR1A7SUE4QkQ7UUFEQyxNQUFNLEVBQUU7cURBQ21DO0lBRzVDO1FBREMsS0FBSyxFQUFFO2tEQUNtQjtJQUczQjtRQURDLEtBQUssRUFBRTtpREFDaUI7SUFHekI7UUFEQyxLQUFLLEVBQUU7eURBQ3lCO0lBSWpDO1FBREMsS0FBSyxFQUFFO2tEQUNtQjtJQW1CM0I7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzRDQU1yQjtJQWhGUSxTQUFTO1FBakJyQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsd0xBTVQ7cUJBRUcsMEZBSUM7U0FFUixDQUFDO09BQ1csU0FBUyxDQWlGckI7SUFBRCxnQkFBQztDQUFBLEFBakZELENBQStCLGFBQWEsR0FpRjNDO1NBakZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBSZW5kZXJlcjIsXG4gICAgRWxlbWVudFJlZixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBUcmFuc2l0aW9uQ29udHJvbGxlcixcbiAgICBTdWlUcmFuc2l0aW9uLFxuICAgIFRyYW5zaXRpb25EaXJlY3Rpb24sXG4gICAgVHJhbnNpdGlvblxufSBmcm9tIFwiLi4vLi4vdHJhbnNpdGlvbi9pbmRleFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktZGltbWVyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3MuY29udGVudF09XCJ3cmFwQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBbY2xhc3MuY2VudGVyXT1cIndyYXBDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0LmRpbW1lciB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGltbWVyIGV4dGVuZHMgU3VpVHJhbnNpdGlvbiB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kaW1tZXJcIilcbiAgICBwdWJsaWMgZGltbWVyQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRyb2xsZXI6VHJhbnNpdGlvbkNvbnRyb2xsZXI7XG5cbiAgICBwcml2YXRlIF9pc0RpbW1lZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRGltbWVkKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RpbW1lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzRGltbWVkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNEaW1tZWQgPSAhIXZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpc2UgdHJhbnNpdGlvbiBmdW5jdGlvbmFsaXR5IHdoZW4gZmlyc3Qgc2V0dGluZyBkaW1tZWQsIHRvIGVuc3VyZSBpbml0aWFsIHN0YXRlIGRvZXNuJ3QgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKFxuICAgICAgICAgICAgICAgIGlzRGltbWVkLFxuICAgICAgICAgICAgICAgIFwiYmxvY2tcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uQ29udHJvbGxlcih0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRGltbWVkID0gaXNEaW1tZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXNEaW1tZWQgIT09IGlzRGltbWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0RpbW1lZCA9IGlzRGltbWVkO1xuXG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5zdG9wQWxsKCk7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzRGltbWVkID8gVHJhbnNpdGlvbkRpcmVjdGlvbi5JbiA6IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBpc0RpbW1lZENoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0NsaWNrYWJsZTpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgLyogSW50ZXJuYWwgZm9yIG5vdyAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHdyYXBDb250ZW50OmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIGNoYW5nZURldGVjdG9yOkNoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJlbmRlcmVyLCBlbGVtZW50LCBjaGFuZ2VEZXRlY3Rvcik7XG5cbiAgICAgICAgdGhpcy5faXNEaW1tZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RpbW1lZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICAgICAgdGhpcy5pc0NsaWNrYWJsZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy53cmFwQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5kaW1tZXJDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIilcbiAgICBwdWJsaWMgb25DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0NsaWNrYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5pc0RpbW1lZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0RpbW1lZENoYW5nZS5lbWl0KHRoaXMuaXNEaW1tZWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19