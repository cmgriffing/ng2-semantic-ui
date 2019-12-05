import * as tslib_1 from "tslib";
import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
let SuiTransition = class SuiTransition {
    constructor(_renderer, element, _changeDetector) {
        this._renderer = _renderer;
        this.element = element;
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
    // Initialises the controller with the injected _renderer and elementRef.
    setTransitionController(transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this.element.nativeElement);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdHJhbnNpdGlvbi9kaXJlY3RpdmVzL3RyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQU92QixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBNkJ0QixZQUNjLFNBQW1CLEVBQ3RCLE9BQWtCLEVBQ2YsZUFBaUM7UUFGakMsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBckJ4QyxvQkFBZSxHQUFXLElBQUksQ0FBQztJQXNCbkMsQ0FBQztJQTVCSixJQUFXLGFBQWEsQ0FBQyxFQUF1QjtRQUM1Qyw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFNRCxJQUFXLFNBQVM7UUFDaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7U0FDckM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR0QsSUFBVyxRQUFRO1FBQ2YsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7U0FDcEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBUUQseUVBQXlFO0lBQ2xFLHVCQUF1QixDQUMxQixvQkFBeUM7UUFFekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDSixDQUFBOztZQWQyQixTQUFTO1lBQ2QsVUFBVTtZQUNDLGlCQUFpQjs7QUEzQi9DO0lBREMsS0FBSyxFQUFFO2tEQUlQO0FBR0Q7SUFEQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7c0RBQ007QUFHdEM7SUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzhDQU01QjtBQUdEO0lBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzs2Q0FNM0I7QUEzQlEsYUFBYTtJQUp6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRSxZQUFZO0tBQ3pCLENBQUM7R0FDVyxhQUFhLENBNEN6QjtTQTVDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBSZW5kZXJlcjIsXG4gICAgRWxlbWVudFJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFRyYW5zaXRpb25Db250cm9sbGVyIH0gZnJvbSBcIi4uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlUcmFuc2l0aW9uXVwiLFxuICAgIGV4cG9ydEFzOiBcInRyYW5zaXRpb25cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlUcmFuc2l0aW9uIHtcbiAgICAvLyBFYWNoIHRyYW5zaXRpb24gbXVzdCBoYXZlIGEgY29udHJvbGxlciBhc3NvY2lhdGVkIHRoYXQgZGlzcGF0Y2hlcyB0aGUgdHJhbnNpdGlvbnMuXG4gICAgcHJpdmF0ZSBfY29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBzdWlUcmFuc2l0aW9uKHRDOlRyYW5zaXRpb25Db250cm9sbGVyKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdHJhbnNpdGlvbiBjb250cm9sbGVyIChlLmcuICc8ZGl2IFtzdWlUcmFuc2l0aW9uXT1cInRyYW5zaXRpb25Db250cm9sbGVyXCI+PC9kaXY+JykuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbkNvbnRyb2xsZXIodEMpO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnRyYW5zaXRpb25cIilcbiAgICBwdWJsaWMgdHJhbnNpdGlvbkNsYXNzOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudmlzaWJsZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9jb250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbGxlci5pc1Zpc2libGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmhpZGRlblwiKVxuICAgIHB1YmxpYyBnZXQgaXNIaWRkZW4oKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sbGVyLmlzSGlkZGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHt9XG5cbiAgICAvLyBJbml0aWFsaXNlcyB0aGUgY29udHJvbGxlciB3aXRoIHRoZSBpbmplY3RlZCBfcmVuZGVyZXIgYW5kIGVsZW1lbnRSZWYuXG4gICAgcHVibGljIHNldFRyYW5zaXRpb25Db250cm9sbGVyKFxuICAgICAgICB0cmFuc2l0aW9uQ29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlclxuICAgICk6dm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXIgPSB0cmFuc2l0aW9uQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlci5yZWdpc3RlclJlbmRlcmVyKHRoaXMuX3JlbmRlcmVyKTtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlci5yZWdpc3RlckVsZW1lbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLl9jb250cm9sbGVyLnJlZ2lzdGVyQ2hhbmdlRGV0ZWN0b3IodGhpcy5fY2hhbmdlRGV0ZWN0b3IpO1xuICAgIH1cbn1cbiJdfQ==