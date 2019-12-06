import * as tslib_1 from "tslib";
import { Component, HostBinding, Input, Output, Renderer2, ElementRef, EventEmitter } from "@angular/core";
import { SidebarService, SidebarTransition, SidebarDirection } from "../services/sidebar.service";
let SuiSidebar = class SuiSidebar {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.service = new SidebarService();
        // We set the default here as well to force the classes to update.
        this.transition = SidebarTransition.Uncover;
        this.direction = SidebarDirection.Left;
        setTimeout(() => this.updateDimensions());
        this.service.isVisibleChange.subscribe(() => this.updateDimensions());
        this.sidebarClasses = true;
    }
    get transition() {
        return this.service.transition;
    }
    set transition(transition) {
        this.service.transition
            .split(" ")
            .forEach(c => this.setClass(c, false));
        this.service.transition = transition;
        this.service.transition.split(" ").forEach(c => this.setClass(c, true));
    }
    get direction() {
        return this.service.direction;
    }
    set direction(direction) {
        this.setClass(this.service.direction, false);
        this.service.direction = direction;
        this.setClass(this.service.direction, true);
    }
    get isVisible() {
        return this.service.isVisible;
    }
    set isVisible(isVisible) {
        this.service.setVisibleState(isVisible);
    }
    get isVisibleChange() {
        return this.service.isVisibleChange;
    }
    get isAnimating() {
        return this.service.isAnimating;
    }
    updateDimensions() {
        this.service.width = this._element.nativeElement.offsetWidth;
        this.service.height = this._element.nativeElement.offsetHeight;
    }
    setClass(className, isAdd = true) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }
    open() {
        this.service.setVisibleState(true);
    }
    close() {
        this.service.setVisibleState(false);
    }
    toggle() {
        this.service.toggleVisibleState();
    }
};
SuiSidebar.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
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
        template: `
        <ng-content></ng-content>
    `
    })
], SuiSidebar);
export { SuiSidebar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2lkZWJhci9jb21wb25lbnRzL3NpZGViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ25CLE1BQU0sNkJBQTZCLENBQUM7QUFRckMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQXdEbkIsWUFBb0IsU0FBbUIsRUFBVSxRQUFtQjtRQUFoRCxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDcEMsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBRXZDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUF6REQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQVcsVUFBVSxDQUFDLFVBQTRCO1FBQzlDLElBQUksQ0FBQyxPQUFP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QyxpQkFBaUIsQ0FBQzs2Q0FHOUI7QUF0RFEsVUFBVTtJQU50QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7O0tBRVQ7S0FDSixDQUFDO0dBQ1csVUFBVSxDQTRGdEI7U0E1RlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjIsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgU2lkZWJhclNlcnZpY2UsXG4gICAgU2lkZWJhclRyYW5zaXRpb24sXG4gICAgU2lkZWJhckRpcmVjdGlvblxufSBmcm9tIFwiLi4vc2VydmljZXMvc2lkZWJhci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zaWRlYmFyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgU3VpU2lkZWJhciB7XG4gICAgcHVibGljIHNlcnZpY2U6U2lkZWJhclNlcnZpY2U7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy51aVwiKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnNpZGViYXJcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5tZW51XCIpXG4gICAgcHVibGljIHNpZGViYXJDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgdHJhbnNpdGlvbigpOlNpZGViYXJUcmFuc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS50cmFuc2l0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbih0cmFuc2l0aW9uOlNpZGViYXJUcmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS50cmFuc2l0aW9uXG4gICAgICAgICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAgICAgICAuZm9yRWFjaChjID0+IHRoaXMuc2V0Q2xhc3MoYywgZmFsc2UpKTtcblxuICAgICAgICB0aGlzLnNlcnZpY2UudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG5cbiAgICAgICAgdGhpcy5zZXJ2aWNlLnRyYW5zaXRpb24uc3BsaXQoXCIgXCIpLmZvckVhY2goYyA9PiB0aGlzLnNldENsYXNzKGMsIHRydWUpKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGlyZWN0aW9uKCk6U2lkZWJhckRpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjpTaWRlYmFyRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3ModGhpcy5zZXJ2aWNlLmRpcmVjdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc2VydmljZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy5zZXRDbGFzcyh0aGlzLnNlcnZpY2UuZGlyZWN0aW9uLCB0cnVlKTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy52aXNpYmxlXCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzVmlzaWJsZShpc1Zpc2libGU6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0VmlzaWJsZVN0YXRlKGlzVmlzaWJsZSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGdldCBpc1Zpc2libGVDaGFuZ2UoKTpFdmVudEVtaXR0ZXI8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmlzVmlzaWJsZUNoYW5nZTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5hbmltYXRpbmdcIilcbiAgICBwdWJsaWMgZ2V0IGlzQW5pbWF0aW5nKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNBbmltYXRpbmc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyZXI6UmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IFNpZGViYXJTZXJ2aWNlKCk7XG4gICAgICAgIC8vIFdlIHNldCB0aGUgZGVmYXVsdCBoZXJlIGFzIHdlbGwgdG8gZm9yY2UgdGhlIGNsYXNzZXMgdG8gdXBkYXRlLlxuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBTaWRlYmFyVHJhbnNpdGlvbi5VbmNvdmVyO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFNpZGViYXJEaXJlY3Rpb24uTGVmdDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltZW5zaW9ucygpKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmlzVmlzaWJsZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVEaW1lbnNpb25zKCkpO1xuXG4gICAgICAgIHRoaXMuc2lkZWJhckNsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRGltZW5zaW9ucygpOnZvaWQge1xuICAgICAgICB0aGlzLnNlcnZpY2Uud2lkdGggPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuc2VydmljZS5oZWlnaHQgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2xhc3MoY2xhc3NOYW1lOnN0cmluZywgaXNBZGQ6Ym9vbGVhbiA9IHRydWUpOnZvaWQge1xuICAgICAgICBpZiAoaXNBZGQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZXRWaXNpYmxlU3RhdGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZXRWaXNpYmxlU3RhdGUoZmFsc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnRvZ2dsZVZpc2libGVTdGF0ZSgpO1xuICAgIH1cbn1cbiJdfQ==