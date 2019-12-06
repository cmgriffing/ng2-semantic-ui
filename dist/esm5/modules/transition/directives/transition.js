import * as tslib_1 from "tslib";
import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
var SuiTransition = /** @class */ (function () {
    function SuiTransition(_renderer, _element, _changeDetector) {
        this._renderer = _renderer;
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.transitionClass = true;
    }
    Object.defineProperty(SuiTransition.prototype, "suiTransition", {
        set: function (tC) {
            // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
            this.setTransitionController(tC);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTransition.prototype, "isVisible", {
        get: function () {
            if (this._controller) {
                return this._controller.isVisible;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTransition.prototype, "isHidden", {
        get: function () {
            if (this._controller) {
                return this._controller.isHidden;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    // Initialises the controller with the injected renderer and elementRef.
    SuiTransition.prototype.setTransitionController = function (transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    };
    SuiTransition.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
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
    return SuiTransition;
}());
export { SuiTransition };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdHJhbnNpdGlvbi9kaXJlY3RpdmVzL3RyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3hHO0lBNkJJLHVCQUFvQixTQUFtQixFQUFVLFFBQW1CLEVBQVUsZUFBaUM7UUFBM0YsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFsQnhHLG9CQUFlLEdBQVcsSUFBSSxDQUFDO0lBa0I0RSxDQUFDO0lBeEJuSCxzQkFBVyx3Q0FBYTthQUF4QixVQUF5QixFQUF1QjtZQUM1Qyw2RkFBNkY7WUFDN0YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsb0NBQVM7YUFBcEI7WUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7YUFDckM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLG1DQUFRO2FBQW5CO1lBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFJRCx3RUFBd0U7SUFDakUsK0NBQXVCLEdBQTlCLFVBQStCLG9CQUF5QztRQUNwRSxJQUFJLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Z0JBUjZCLFNBQVM7Z0JBQW1CLFVBQVU7Z0JBQTBCLGlCQUFpQjs7SUF4Qi9HO1FBREMsS0FBSyxFQUFFO3NEQUlQO0lBR0Q7UUFEQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7MERBQ007SUFHdEM7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDO2tEQU01QjtJQUdEO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQztpREFNM0I7SUEzQlEsYUFBYTtRQUp6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSxZQUFZO1NBQ3pCLENBQUM7T0FDVyxhQUFhLENBc0N6QjtJQUFELG9CQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0F0Q1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbmRlcmVyMiwgRWxlbWVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdEJpbmRpbmcsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFRyYW5zaXRpb25Db250cm9sbGVyIH0gZnJvbSBcIi4uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlUcmFuc2l0aW9uXVwiLFxuICAgIGV4cG9ydEFzOiBcInRyYW5zaXRpb25cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlUcmFuc2l0aW9uIHtcbiAgICAvLyBFYWNoIHRyYW5zaXRpb24gbXVzdCBoYXZlIGEgY29udHJvbGxlciBhc3NvY2lhdGVkIHRoYXQgZGlzcGF0Y2hlcyB0aGUgdHJhbnNpdGlvbnMuXG4gICAgcHJpdmF0ZSBfY29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCBzdWlUcmFuc2l0aW9uKHRDOlRyYW5zaXRpb25Db250cm9sbGVyKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdHJhbnNpdGlvbiBjb250cm9sbGVyIChlLmcuICc8ZGl2IFtzdWlUcmFuc2l0aW9uXT1cInRyYW5zaXRpb25Db250cm9sbGVyXCI+PC9kaXY+JykuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbkNvbnRyb2xsZXIodEMpO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnRyYW5zaXRpb25cIilcbiAgICBwdWJsaWMgdHJhbnNpdGlvbkNsYXNzOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudmlzaWJsZVwiKVxuICAgIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9jb250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbGxlci5pc1Zpc2libGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmhpZGRlblwiKVxuICAgIHB1YmxpYyBnZXQgaXNIaWRkZW4oKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sbGVyLmlzSGlkZGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjpSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnQ6RWxlbWVudFJlZiwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICAvLyBJbml0aWFsaXNlcyB0aGUgY29udHJvbGxlciB3aXRoIHRoZSBpbmplY3RlZCByZW5kZXJlciBhbmQgZWxlbWVudFJlZi5cbiAgICBwdWJsaWMgc2V0VHJhbnNpdGlvbkNvbnRyb2xsZXIodHJhbnNpdGlvbkNvbnRyb2xsZXI6VHJhbnNpdGlvbkNvbnRyb2xsZXIpOnZvaWQge1xuICAgICAgICB0aGlzLl9jb250cm9sbGVyID0gdHJhbnNpdGlvbkNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXIucmVnaXN0ZXJSZW5kZXJlcih0aGlzLl9yZW5kZXJlcik7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXIucmVnaXN0ZXJDaGFuZ2VEZXRlY3Rvcih0aGlzLl9jaGFuZ2VEZXRlY3Rvcik7XG4gICAgfVxufVxuIl19