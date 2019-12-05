import * as tslib_1 from "tslib";
import { Renderer2, ElementRef, Directive, Input, HostBinding, ChangeDetectorRef } from "@angular/core";
var SuiTransition = /** @class */ (function () {
    function SuiTransition(_renderer, element, _changeDetector) {
        this._renderer = _renderer;
        this.element = element;
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
    // Initialises the controller with the injected _renderer and elementRef.
    SuiTransition.prototype.setTransitionController = function (transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this.element.nativeElement);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdHJhbnNpdGlvbi9kaXJlY3RpdmVzL3RyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQU92QjtJQTZCSSx1QkFDYyxTQUFtQixFQUN0QixPQUFrQixFQUNmLGVBQWlDO1FBRmpDLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNmLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQXJCeEMsb0JBQWUsR0FBVyxJQUFJLENBQUM7SUFzQm5DLENBQUM7SUE1Qkosc0JBQVcsd0NBQWE7YUFBeEIsVUFBeUIsRUFBdUI7WUFDNUMsNkZBQTZGO1lBQzdGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFXLG9DQUFTO2FBQXBCO1lBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxtQ0FBUTthQUFuQjtZQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUNwQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBUUQseUVBQXlFO0lBQ2xFLCtDQUF1QixHQUE5QixVQUNJLG9CQUF5QztRQUV6QyxJQUFJLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Z0JBYnVCLFNBQVM7Z0JBQ2QsVUFBVTtnQkFDQyxpQkFBaUI7O0lBM0IvQztRQURDLEtBQUssRUFBRTtzREFJUDtJQUdEO1FBREMsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzBEQUNNO0lBR3RDO1FBREMsV0FBVyxDQUFDLGVBQWUsQ0FBQztrREFNNUI7SUFHRDtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7aURBTTNCO0lBM0JRLGFBQWE7UUFKekIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsWUFBWTtTQUN6QixDQUFDO09BQ1csYUFBYSxDQTRDekI7SUFBRCxvQkFBQztDQUFBLEFBNUNELElBNENDO1NBNUNZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY2xhc3Nlcy90cmFuc2l0aW9uLWNvbnRyb2xsZXJcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aVRyYW5zaXRpb25dXCIsXG4gICAgZXhwb3J0QXM6IFwidHJhbnNpdGlvblwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aVRyYW5zaXRpb24ge1xuICAgIC8vIEVhY2ggdHJhbnNpdGlvbiBtdXN0IGhhdmUgYSBjb250cm9sbGVyIGFzc29jaWF0ZWQgdGhhdCBkaXNwYXRjaGVzIHRoZSB0cmFuc2l0aW9ucy5cbiAgICBwcml2YXRlIF9jb250cm9sbGVyOlRyYW5zaXRpb25Db250cm9sbGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHN1aVRyYW5zaXRpb24odEM6VHJhbnNpdGlvbkNvbnRyb2xsZXIpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2l0aW9uIGNvbnRyb2xsZXIgKGUuZy4gJzxkaXYgW3N1aVRyYW5zaXRpb25dPVwidHJhbnNpdGlvbkNvbnRyb2xsZXJcIj48L2Rpdj4nKS5cbiAgICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uQ29udHJvbGxlcih0Qyk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudHJhbnNpdGlvblwiKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uQ2xhc3M6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy52aXNpYmxlXCIpXG4gICAgcHVibGljIGdldCBpc1Zpc2libGUoKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sbGVyLmlzVmlzaWJsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaGlkZGVuXCIpXG4gICAgcHVibGljIGdldCBpc0hpZGRlbigpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fY29udHJvbGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2xsZXIuaXNIaWRkZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZixcbiAgICAgICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvcjpDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIC8vIEluaXRpYWxpc2VzIHRoZSBjb250cm9sbGVyIHdpdGggdGhlIGluamVjdGVkIF9yZW5kZXJlciBhbmQgZWxlbWVudFJlZi5cbiAgICBwdWJsaWMgc2V0VHJhbnNpdGlvbkNvbnRyb2xsZXIoXG4gICAgICAgIHRyYW5zaXRpb25Db250cm9sbGVyOlRyYW5zaXRpb25Db250cm9sbGVyXG4gICAgKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlciA9IHRyYW5zaXRpb25Db250cm9sbGVyO1xuICAgICAgICB0aGlzLl9jb250cm9sbGVyLnJlZ2lzdGVyUmVuZGVyZXIodGhpcy5fcmVuZGVyZXIpO1xuICAgICAgICB0aGlzLl9jb250cm9sbGVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xsZXIucmVnaXN0ZXJDaGFuZ2VEZXRlY3Rvcih0aGlzLl9jaGFuZ2VEZXRlY3Rvcik7XG4gICAgfVxufVxuIl19