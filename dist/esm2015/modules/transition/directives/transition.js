import * as tslib_1 from "tslib";
import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
let SuiTransition = class SuiTransition {
    constructor(_renderer, _element, _changeDetector) {
        this._renderer = _renderer;
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.transitionClass = true;
    }
    set suiTransition(tC) {
        // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
        this.setTransitionController(tC);
    }
    get isVisible() {
        if (this._controller) {
            return this._controller.isVisible;
        }
        return false;
    }
    get isHidden() {
        if (this._controller) {
            return this._controller.isHidden;
        }
        return false;
    }
    // Initialises the controller with the injected renderer and elementRef.
    setTransitionController(transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    }
};
SuiTransition.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
tslib_1.__decorate([
    Input()
], SuiTransition.prototype, "suiTransition", null);
tslib_1.__decorate([
    HostBinding("class.transition")
], SuiTransition.prototype, "transitionClass", void 0);
tslib_1.__decorate([
    HostBinding("class.visible")
], SuiTransition.prototype, "isVisible", null);
tslib_1.__decorate([
    HostBinding("class.hidden")
], SuiTransition.prototype, "isHidden", null);
SuiTransition = tslib_1.__decorate([
    Directive({
        selector: "[suiTransition]",
        exportAs: "transition"
    })
], SuiTransition);
export { SuiTransition };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdHJhbnNpdGlvbi9kaXJlY3RpdmVzL3RyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3hHLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUE2QnRCLFlBQW9CLFNBQW1CLEVBQVUsUUFBbUIsRUFBVSxlQUFpQztRQUEzRixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQWxCeEcsb0JBQWUsR0FBVyxJQUFJLENBQUM7SUFrQjRFLENBQUM7SUF4Qm5ILElBQVcsYUFBYSxDQUFDLEVBQXVCO1FBQzVDLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQU1ELElBQVcsU0FBUztRQUNoQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztTQUNyQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFHRCxJQUFXLFFBQVE7UUFDZixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztTQUNwQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFJRCx3RUFBd0U7SUFDakUsdUJBQXVCLENBQUMsb0JBQXlDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0osQ0FBQTs7WUFUaUMsU0FBUztZQUFtQixVQUFVO1lBQTBCLGlCQUFpQjs7QUF4Qi9HO0lBREMsS0FBSyxFQUFFO2tEQUlQO0FBR0Q7SUFEQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7c0RBQ007QUFHdEM7SUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzhDQU01QjtBQUdEO0lBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzs2Q0FNM0I7QUEzQlEsYUFBYTtJQUp6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSxZQUFZO0tBQ3pCLENBQUM7R0FDVyxhQUFhLENBc0N6QjtTQXRDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBIb3N0QmluZGluZywgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy90cmFuc2l0aW9uLWNvbnRyb2xsZXJcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aVRyYW5zaXRpb25dXCIsXG4gICAgZXhwb3J0QXM6IFwidHJhbnNpdGlvblwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aVRyYW5zaXRpb24ge1xuICAgIC8vIEVhY2ggdHJhbnNpdGlvbiBtdXN0IGhhdmUgYSBjb250cm9sbGVyIGFzc29jaWF0ZWQgdGhhdCBkaXNwYXRjaGVzIHRoZSB0cmFuc2l0aW9ucy5cbiAgICBwcml2YXRlIF9jb250cm9sbGVyOlRyYW5zaXRpb25Db250cm9sbGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHN1aVRyYW5zaXRpb24odEM6VHJhbnNpdGlvbkNvbnRyb2xsZXIpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2l0aW9uIGNvbnRyb2xsZXIgKGUuZy4gJzxkaXYgW3N1aVRyYW5zaXRpb25dPVwidHJhbnNpdGlvbkNvbnRyb2xsZXJcIj48L2Rpdj4nKS5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uQ29udHJvbGxlcih0Qyk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudHJhbnNpdGlvblwiKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uQ2xhc3M6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy52aXNpYmxlXCIpXG4gICAgcHVibGljIGdldCBpc1Zpc2libGUoKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sbGVyLmlzVmlzaWJsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaGlkZGVuXCIpXG4gICAgcHVibGljIGdldCBpc0hpZGRlbigpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fY29udHJvbGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xsZXIuaXNIaWRkZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOlJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjpDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIC8vIEluaXRpYWxpc2VzIHRoZSBjb250cm9sbGVyIHdpdGggdGhlIGluamVjdGVkIHJlbmRlcmVyIGFuZCBlbGVtZW50UmVmLlxuICAgIHB1YmxpYyBzZXRUcmFuc2l0aW9uQ29udHJvbGxlcih0cmFuc2l0aW9uQ29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcik6dm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXIgPSB0cmFuc2l0aW9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlci5yZWdpc3RlclJlbmRlcmVyKHRoaXMuX3JlbmRlcmVyKTtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlci5yZWdpc3RlckVsZW1lbnQodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlci5yZWdpc3RlckNoYW5nZURldGVjdG9yKHRoaXMuX2NoYW5nZURldGVjdG9yKTtcbiAgICB9XG59XG4iXX0=