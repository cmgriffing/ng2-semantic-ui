import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";
import { SidebarTransition } from "../services/sidebar.service";
let SuiSidebarSibling = class SuiSidebarSibling {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.isDimmedWhenVisible = false;
        this.siblingClasses = true;
    }
    get service() {
        return this._service;
    }
    set service(service) {
        this._service = service;
        setTimeout(() => this.updateTransform());
        this._service.isVisibleChange.subscribe(() => this.updateTransform());
    }
    get isVisible() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible;
    }
    get isDimmed() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible && this.isDimmedWhenVisible;
    }
    updateTransform() {
        this._renderer.removeStyle(this._element.nativeElement, "transform");
        this._renderer.removeStyle(this._element.nativeElement, "-webkit-transform");
        if (this.service.isVisible &&
            this.service.transition !== SidebarTransition.Overlay &&
            this.service.transition !== SidebarTransition.ScaleDown) {
            const translate = `translate3d(${this.service.width}px, ${this.service.height}px, 0)`;
            this._renderer.setStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    }
    onClick(event) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    }
};
SuiSidebarSibling.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
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
        template: `
        <ng-content></ng-content>
    `,
        styles: [`
            :host {
                display: block;
            }
        `]
    })
], SuiSidebarSibling);
export { SuiSidebarSibling };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1zaWJsaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9zaWRlYmFyL2NvbXBvbmVudHMvc2lkZWJhci1zaWJsaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBZWhGLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBb0MxQixZQUFvQixTQUFtQixFQUFVLFFBQW1CO1FBQWhELGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2hFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQXJDRCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsT0FBTyxDQUFDLE9BQXNCO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQU1ELElBQVcsU0FBUztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0lBR0QsSUFBVyxRQUFRO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQzlELENBQUM7SUFXTyxlQUFlO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsbUJBQW1CLENBQ3RCLENBQUM7UUFFRixJQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxpQkFBaUIsQ0FBQyxPQUFPO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLGlCQUFpQixDQUFDLFNBQVMsRUFDekQ7WUFDRSxNQUFNLFNBQVMsR0FBRyxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7WUFDdEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixXQUFXLEVBQ1gsU0FBUyxDQUNaLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLG1CQUFtQixFQUNuQixTQUFTLENBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUdNLE9BQU8sQ0FBQyxLQUFnQjtRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUF0Q2lDLFNBQVM7WUFBbUIsVUFBVTs7QUFyQnBFO0lBREMsS0FBSyxFQUFFOzhEQUMyQjtBQUduQztJQURDLFdBQVcsQ0FBQyxlQUFlLENBQUM7a0RBTTVCO0FBR0Q7SUFEQyxXQUFXLENBQUMsY0FBYyxDQUFDO2lEQU0zQjtBQUdEO0lBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzt5REFDRTtBQW1DOUI7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0RBS2pDO0FBekVRLGlCQUFpQjtJQWI3QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLFFBQVEsRUFBRTs7S0FFVDtpQkFFRzs7OztTQUlDO0tBRVIsQ0FBQztHQUNXLGlCQUFpQixDQTBFN0I7U0ExRVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTaWRlYmFyU2VydmljZSwgU2lkZWJhclRyYW5zaXRpb24gfSBmcm9tIFwiLi4vc2VydmljZXMvc2lkZWJhci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zaWRlYmFyLXNpYmxpbmdcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTaWRlYmFyU2libGluZyB7XG4gICAgcHJpdmF0ZSBfc2VydmljZTpTaWRlYmFyU2VydmljZTtcblxuICAgIHB1YmxpYyBnZXQgc2VydmljZSgpOlNpZGViYXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZXJ2aWNlKHNlcnZpY2U6U2lkZWJhclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZSA9IHNlcnZpY2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybSgpKTtcbiAgICAgICAgdGhpcy5fc2VydmljZS5pc1Zpc2libGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVHJhbnNmb3JtKCkpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzRGltbWVkV2hlblZpc2libGU6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnZpc2libGVcIilcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuc2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRpbW1lZFwiKVxuICAgIHB1YmxpYyBnZXQgaXNEaW1tZWQoKTpib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzVmlzaWJsZSAmJiB0aGlzLmlzRGltbWVkV2hlblZpc2libGU7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucHVzaGVyXCIpXG4gICAgcHVibGljIHNpYmxpbmdDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjpSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnQ6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmlzRGltbWVkV2hlblZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNpYmxpbmdDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRyYW5zZm9ybSgpOnZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwidHJhbnNmb3JtXCIpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIlxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5pc1Zpc2libGUgJiZcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS50cmFuc2l0aW9uICE9PSBTaWRlYmFyVHJhbnNpdGlvbi5PdmVybGF5ICYmXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UudHJhbnNpdGlvbiAhPT0gU2lkZWJhclRyYW5zaXRpb24uU2NhbGVEb3duXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy5zZXJ2aWNlLndpZHRofXB4LCAke3RoaXMuc2VydmljZS5oZWlnaHR9cHgsIDApYDtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25DbGljayhldmVudDpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5pc1Zpc2libGUgJiYgIXRoaXMuc2VydmljZS53YXNKdXN0T3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0VmlzaWJsZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==