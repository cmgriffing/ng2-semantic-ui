import * as tslib_1 from "tslib";
import { Component, Input, Output, HostBinding, HostListener, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { TransitionDirection, Transition } from "../../../modules/transition/classes/transition";
var SuiDimmer = /** @class */ (function (_super) {
    tslib_1.__extends(SuiDimmer, _super);
    function SuiDimmer(_renderer, element, _changeDetector) {
        var _this = _super.call(this, _renderer, element, _changeDetector) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGltbWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kaW1tZXIvY29tcG9uZW50cy9kaW1tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbEYsT0FBTyxFQUNILG1CQUFtQixFQUNuQixVQUFVLEVBQ2IsTUFBTSxnREFBZ0QsQ0FBQztBQWtCeEQ7SUFBK0IscUNBQWE7SUEwRHhDLG1CQUNjLFNBQW1CLEVBQ3RCLE9BQWtCLEVBQ2YsZUFBaUM7UUFIL0MsWUFLSSxrQkFBTSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxTQVM3QztRQWJhLGVBQVMsR0FBVCxTQUFTLENBQVU7UUFDdEIsYUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNmLHFCQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUkzQyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDbEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0lBQzlCLENBQUM7SUE3REQsc0JBQVcsK0JBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUM3Qiw2R0FBNkc7Z0JBQzdHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG9CQUFvQixDQUNqRCxRQUFRLEVBQ1IsT0FBTyxDQUNWLENBQUM7Z0JBRUYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzthQUM3QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFFMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUM5QixJQUFJLFVBQVUsQ0FDVixNQUFNLEVBQ04sSUFBSSxDQUFDLGtCQUFrQixFQUN2QixRQUFRLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUM5RCxDQUNKLENBQUM7YUFDTDtRQUNMLENBQUM7OztPQTNCQTtJQThETSwyQkFBTyxHQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7O2dCQXJCdUIsU0FBUztnQkFDZCxVQUFVO2dCQUNDLGlCQUFpQjs7SUExRC9DO1FBRkMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN2QixXQUFXLENBQUMsY0FBYyxDQUFDO29EQUNDO0lBUTdCO1FBRkMsV0FBVyxDQUFDLGNBQWMsQ0FBQztRQUMzQixLQUFLLEVBQUU7NkNBR1A7SUE4QkQ7UUFEQyxNQUFNLEVBQUU7cURBQ21DO0lBRzVDO1FBREMsS0FBSyxFQUFFO2tEQUNtQjtJQUczQjtRQURDLEtBQUssRUFBRTtpREFDaUI7SUFHekI7UUFEQyxLQUFLLEVBQUU7eURBQ3lCO0lBSWpDO1FBREMsS0FBSyxFQUFFO2tEQUNtQjtJQW1CM0I7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzRDQU1yQjtJQWhGUSxTQUFTO1FBakJyQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsd0xBTVQ7cUJBRUcsMEZBSUM7U0FFUixDQUFDO09BQ1csU0FBUyxDQWlGckI7SUFBRCxnQkFBQztDQUFBLEFBakZELENBQStCLGFBQWEsR0FpRjNDO1NBakZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBSZW5kZXJlcjIsXG4gICAgRWxlbWVudFJlZixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBTdWlUcmFuc2l0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvdHJhbnNpdGlvbi9kaXJlY3RpdmVzL3RyYW5zaXRpb25cIjtcbmltcG9ydCB7XG4gICAgVHJhbnNpdGlvbkRpcmVjdGlvbixcbiAgICBUcmFuc2l0aW9uXG59IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktZGltbWVyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3MuY29udGVudF09XCJ3cmFwQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBbY2xhc3MuY2VudGVyXT1cIndyYXBDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0LmRpbW1lciB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGltbWVyIGV4dGVuZHMgU3VpVHJhbnNpdGlvbiB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kaW1tZXJcIilcbiAgICBwdWJsaWMgZGltbWVyQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRyb2xsZXI6VHJhbnNpdGlvbkNvbnRyb2xsZXI7XG5cbiAgICBwcml2YXRlIF9pc0RpbW1lZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRGltbWVkKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RpbW1lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzRGltbWVkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNEaW1tZWQgPSAhIXZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpc2UgdHJhbnNpdGlvbiBmdW5jdGlvbmFsaXR5IHdoZW4gZmlyc3Qgc2V0dGluZyBkaW1tZWQsIHRvIGVuc3VyZSBpbml0aWFsIHN0YXRlIGRvZXNuJ3QgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKFxuICAgICAgICAgICAgICAgIGlzRGltbWVkLFxuICAgICAgICAgICAgICAgIFwiYmxvY2tcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uQ29udHJvbGxlcih0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRGltbWVkID0gaXNEaW1tZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXNEaW1tZWQgIT09IGlzRGltbWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0RpbW1lZCA9IGlzRGltbWVkO1xuXG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5zdG9wQWxsKCk7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzRGltbWVkID8gVHJhbnNpdGlvbkRpcmVjdGlvbi5JbiA6IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBpc0RpbW1lZENoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0NsaWNrYWJsZTpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgLyogSW50ZXJuYWwgZm9yIG5vdyAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHdyYXBDb250ZW50OmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX3JlbmRlcmVyLCBlbGVtZW50LCBfY2hhbmdlRGV0ZWN0b3IpO1xuXG4gICAgICAgIHRoaXMuX2lzRGltbWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEaW1tZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMuaXNDbGlja2FibGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMud3JhcENvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZGltbWVyQ2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgcHVibGljIG9uQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDbGlja2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEaW1tZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNEaW1tZWRDaGFuZ2UuZW1pdCh0aGlzLmlzRGltbWVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==