import * as tslib_1 from "tslib";
import { Component, Input, Output, HostBinding, HostListener, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { TransitionDirection, Transition } from "../../../modules/transition/classes/transition";
let SuiDimmer = class SuiDimmer extends SuiTransition {
    constructor(_renderer, element, _changeDetector) {
        super(_renderer, element, _changeDetector);
        this._renderer = _renderer;
        this.element = element;
        this._changeDetector = _changeDetector;
        this._isDimmed = false;
        this.isDimmedChange = new EventEmitter();
        this.isClickable = true;
        this.wrapContent = true;
        this.dimmerClasses = true;
    }
    get isDimmed() {
        return this._isDimmed;
    }
    set isDimmed(value) {
        const isDimmed = !!value;
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
    }
    onClick() {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
};
SuiDimmer.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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
        template: `
        <div [class.content]="wrapContent">
            <div [class.center]="wrapContent">
                <ng-content></ng-content>
            </div>
        </div>
    `,
        styles: [`
            :host.dimmer {
                transition: none;
            }
        `]
    })
], SuiDimmer);
export { SuiDimmer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGltbWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kaW1tZXIvY29tcG9uZW50cy9kaW1tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsWUFBWSxFQUNaLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDbEYsT0FBTyxFQUNILG1CQUFtQixFQUNuQixVQUFVLEVBQ2IsTUFBTSxnREFBZ0QsQ0FBQztBQWtCeEQsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLGFBQWE7SUEwRHhDLFlBQ2MsU0FBbUIsRUFDdEIsT0FBa0IsRUFDZixlQUFpQztRQUUzQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpqQyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFJM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUE3REQsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxLQUFhO1FBQzdCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM3Qiw2R0FBNkc7WUFDN0csSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksb0JBQW9CLENBQ2pELFFBQVEsRUFDUixPQUFPLENBQ1YsQ0FBQztZQUVGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztTQUM3QjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFFMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQzlCLElBQUksVUFBVSxDQUNWLE1BQU0sRUFDTixJQUFJLENBQUMsa0JBQWtCLEVBQ3ZCLFFBQVEsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQzlELENBQ0osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQW1DTSxPQUFPO1FBQ1YsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7Q0FDSixDQUFBOztZQXRCMkIsU0FBUztZQUNkLFVBQVU7WUFDQyxpQkFBaUI7O0FBMUQvQztJQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDdkIsV0FBVyxDQUFDLGNBQWMsQ0FBQztnREFDQztBQVE3QjtJQUZDLFdBQVcsQ0FBQyxjQUFjLENBQUM7SUFDM0IsS0FBSyxFQUFFO3lDQUdQO0FBOEJEO0lBREMsTUFBTSxFQUFFO2lEQUNtQztBQUc1QztJQURDLEtBQUssRUFBRTs4Q0FDbUI7QUFHM0I7SUFEQyxLQUFLLEVBQUU7NkNBQ2lCO0FBR3pCO0lBREMsS0FBSyxFQUFFO3FEQUN5QjtBQUlqQztJQURDLEtBQUssRUFBRTs4Q0FDbUI7QUFtQjNCO0lBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzt3Q0FNckI7QUFoRlEsU0FBUztJQWpCckIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7S0FNVDtpQkFFRzs7OztTQUlDO0tBRVIsQ0FBQztHQUNXLFNBQVMsQ0FpRnJCO1NBakZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBSZW5kZXJlcjIsXG4gICAgRWxlbWVudFJlZixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBTdWlUcmFuc2l0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL21vZHVsZXMvdHJhbnNpdGlvbi9kaXJlY3RpdmVzL3RyYW5zaXRpb25cIjtcbmltcG9ydCB7XG4gICAgVHJhbnNpdGlvbkRpcmVjdGlvbixcbiAgICBUcmFuc2l0aW9uXG59IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktZGltbWVyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3MuY29udGVudF09XCJ3cmFwQ29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBbY2xhc3MuY2VudGVyXT1cIndyYXBDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0LmRpbW1lciB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpRGltbWVyIGV4dGVuZHMgU3VpVHJhbnNpdGlvbiB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kaW1tZXJcIilcbiAgICBwdWJsaWMgZGltbWVyQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRyb2xsZXI6VHJhbnNpdGlvbkNvbnRyb2xsZXI7XG5cbiAgICBwcml2YXRlIF9pc0RpbW1lZDpib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuYWN0aXZlXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRGltbWVkKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RpbW1lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzRGltbWVkKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNEaW1tZWQgPSAhIXZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdHJhbnNpdGlvbkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpc2UgdHJhbnNpdGlvbiBmdW5jdGlvbmFsaXR5IHdoZW4gZmlyc3Qgc2V0dGluZyBkaW1tZWQsIHRvIGVuc3VyZSBpbml0aWFsIHN0YXRlIGRvZXNuJ3QgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKFxuICAgICAgICAgICAgICAgIGlzRGltbWVkLFxuICAgICAgICAgICAgICAgIFwiYmxvY2tcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uQ29udHJvbGxlcih0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRGltbWVkID0gaXNEaW1tZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faXNEaW1tZWQgIT09IGlzRGltbWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0RpbW1lZCA9IGlzRGltbWVkO1xuXG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5zdG9wQWxsKCk7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzRGltbWVkID8gVHJhbnNpdGlvbkRpcmVjdGlvbi5JbiA6IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBpc0RpbW1lZENoYW5nZTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0NsaWNrYWJsZTpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgLyogSW50ZXJuYWwgZm9yIG5vdyAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHdyYXBDb250ZW50OmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX3JlbmRlcmVyLCBlbGVtZW50LCBfY2hhbmdlRGV0ZWN0b3IpO1xuXG4gICAgICAgIHRoaXMuX2lzRGltbWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEaW1tZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgICAgIHRoaXMuaXNDbGlja2FibGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMud3JhcENvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZGltbWVyQ2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpXG4gICAgcHVibGljIG9uQ2xpY2soKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDbGlja2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEaW1tZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNEaW1tZWRDaGFuZ2UuZW1pdCh0aGlzLmlzRGltbWVkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==