import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Transition } from "../../transition/classes/transition";
import { TransitionController } from "../../transition/classes/transition-controller";
var SuiAccordionPanel = /** @class */ (function () {
    function SuiAccordionPanel(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.isOpenChange = new EventEmitter(false);
    }
    Object.defineProperty(SuiAccordionPanel.prototype, "service", {
        set: function (service) {
            this._service = service;
            this._changeDetector.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            // Convert to boolean (fixes false != undefined)
            var isOpen = !!value;
            if (isOpen !== this.isOpen) {
                // Only update if the value has changed.
                this._isOpen = isOpen;
                if (isOpen && this._service) {
                    // If we are opening this panel, we must close the other ones.
                    this._service.closeOtherPanels(this);
                }
                this.isOpenChange.emit(this.isOpen);
                // Cancel all current animations, and fade the contents. The direction is automatic.
                this.transitionController.stopAll();
                this.transitionController.animate(new Transition(this.transition, this.transitionDuration));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "transition", {
        get: function () {
            if (this._service) {
                return this._service.transition;
            }
            return "fade";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "transitionDuration", {
        get: function () {
            if (this._service) {
                // Return the service defined transition duration.
                return this._service.transitionDuration;
            }
            // Revert to instantaneous if the service is not yet loaded.
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordionPanel.prototype.toggle = function () {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    };
    SuiAccordionPanel.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SuiAccordionPanel.prototype, "isDisabled", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiAccordionPanel.prototype, "isOpen", null);
    tslib_1.__decorate([
        Output()
    ], SuiAccordionPanel.prototype, "isOpenChange", void 0);
    SuiAccordionPanel = tslib_1.__decorate([
        Component({
            selector: "sui-accordion-panel",
            exportAs: "suiAccordionPanel",
            template: "\n        <!-- Title -->\n        <div class=\"title\" [class.active]=\"isOpen\" (click)=\"toggle()\">\n            <ng-content select=\"[title]\"></ng-content>\n        </div>\n        <!-- Content -->\n        <div [suiCollapse]=\"!isOpen\" [collapseDuration]=\"transitionDuration\">\n            <div\n                class=\"content\"\n                [class.active]=\"isOpen\"\n                [suiTransition]=\"transitionController\"\n            >\n                <ng-content select=\"[content]\"></ng-content>\n            </div>\n        </div>\n    ",
            styles: ["\n            /* Manual style as Semantic UI relies on > selector */\n            .content {\n                padding: 0.5em 0 1em;\n            }\n\n            /* Another > selector fix */\n            :host:first-child .title {\n                border-top: none;\n            }\n        "]
        })
    ], SuiAccordionPanel);
    return SuiAccordionPanel;
}());
export { SuiAccordionPanel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLXBhbmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9hY2NvcmRpb24vY29tcG9uZW50cy9hY2NvcmRpb24tcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQW1DdEY7SUE4REksMkJBQXNCLGVBQWlDO1FBQWpDLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNuRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUE5REQsc0JBQVcsc0NBQU87YUFBbEIsVUFBbUIsT0FBMkI7WUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQVFELHNCQUFXLHFDQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFhO1lBQzNCLGdEQUFnRDtZQUNoRCxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXZCLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLHdDQUF3QztnQkFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBRXRCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3pCLDhEQUE4RDtvQkFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVwQyxvRkFBb0Y7Z0JBQ3BGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FDN0IsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FDM0QsQ0FBQzthQUNMO1FBQ0wsQ0FBQzs7O09BdEJBO0lBd0JELHNCQUFXLHlDQUFVO2FBQXJCO1lBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7YUFDbkM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlEQUFrQjthQUE3QjtZQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixrREFBa0Q7Z0JBQ2xELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQzthQUMzQztZQUNELDREQUE0RDtZQUM1RCxPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7OztPQUFBO0lBWU0sa0NBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQzs7Z0JBWHFDLGlCQUFpQjs7SUFuRHZEO1FBREMsS0FBSyxFQUFFO3lEQUNrQjtJQUsxQjtRQURDLEtBQUssRUFBRTttREFHUDtJQTBDRDtRQURDLE1BQU0sRUFBRTsyREFDaUM7SUE1RGpDLGlCQUFpQjtRQWpDN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxrakJBZVQ7cUJBRUcsb1NBVUM7U0FFUixDQUFDO09BQ1csaUJBQWlCLENBMEU3QjtJQUFELHdCQUFDO0NBQUEsQUExRUQsSUEwRUM7U0ExRVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpQWNjb3JkaW9uU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hY2NvcmRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gXCIuLi8uLi90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvblwiO1xuaW1wb3J0IHsgVHJhbnNpdGlvbkNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vdHJhbnNpdGlvbi9jbGFzc2VzL3RyYW5zaXRpb24tY29udHJvbGxlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktYWNjb3JkaW9uLXBhbmVsXCIsXG4gICAgZXhwb3J0QXM6IFwic3VpQWNjb3JkaW9uUGFuZWxcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8IS0tIFRpdGxlIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIiBbY2xhc3MuYWN0aXZlXT1cImlzT3BlblwiIChjbGljayk9XCJ0b2dnbGUoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gQ29udGVudCAtLT5cbiAgICAgICAgPGRpdiBbc3VpQ29sbGFwc2VdPVwiIWlzT3BlblwiIFtjb2xsYXBzZUR1cmF0aW9uXT1cInRyYW5zaXRpb25EdXJhdGlvblwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc09wZW5cIlxuICAgICAgICAgICAgICAgIFtzdWlUcmFuc2l0aW9uXT1cInRyYW5zaXRpb25Db250cm9sbGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbY29udGVudF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgLyogTWFudWFsIHN0eWxlIGFzIFNlbWFudGljIFVJIHJlbGllcyBvbiA+IHNlbGVjdG9yICovXG4gICAgICAgICAgICAuY29udGVudCB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMC41ZW0gMCAxZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIEFub3RoZXIgPiBzZWxlY3RvciBmaXggKi9cbiAgICAgICAgICAgIDpob3N0OmZpcnN0LWNoaWxkIC50aXRsZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpQWNjb3JkaW9uUGFuZWwge1xuICAgIHByaXZhdGUgX3NlcnZpY2U6U3VpQWNjb3JkaW9uU2VydmljZTtcblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uQ29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcjtcblxuICAgIHB1YmxpYyBzZXQgc2VydmljZShzZXJ2aWNlOlN1aUFjY29yZGlvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZSA9IHNlcnZpY2U7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0Rpc2FibGVkOmJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9pc09wZW46Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBpc09wZW4oKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzT3Blbih2YWx1ZTpib29sZWFuKSB7XG4gICAgICAgIC8vIENvbnZlcnQgdG8gYm9vbGVhbiAoZml4ZXMgZmFsc2UgIT0gdW5kZWZpbmVkKVxuICAgICAgICBjb25zdCBpc09wZW4gPSAhIXZhbHVlO1xuXG4gICAgICAgIGlmIChpc09wZW4gIT09IHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSBpZiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuXG4gICAgICAgICAgICB0aGlzLl9pc09wZW4gPSBpc09wZW47XG5cbiAgICAgICAgICAgIGlmIChpc09wZW4gJiYgdGhpcy5fc2VydmljZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBvcGVuaW5nIHRoaXMgcGFuZWwsIHdlIG11c3QgY2xvc2UgdGhlIG90aGVyIG9uZXMuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5jbG9zZU90aGVyUGFuZWxzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG5cbiAgICAgICAgICAgIC8vIENhbmNlbCBhbGwgY3VycmVudCBhbmltYXRpb25zLCBhbmQgZmFkZSB0aGUgY29udGVudHMuIFRoZSBkaXJlY3Rpb24gaXMgYXV0b21hdGljLlxuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5zdG9wQWxsKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25Db250cm9sbGVyLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAgbmV3IFRyYW5zaXRpb24odGhpcy50cmFuc2l0aW9uLCB0aGlzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRyYW5zaXRpb24oKTpzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fc2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UudHJhbnNpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBcImZhZGVcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRyYW5zaXRpb25EdXJhdGlvbigpOm51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNlcnZpY2UgZGVmaW5lZCB0cmFuc2l0aW9uIGR1cmF0aW9uLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UudHJhbnNpdGlvbkR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJldmVydCB0byBpbnN0YW50YW5lb3VzIGlmIHRoZSBzZXJ2aWNlIGlzIG5vdCB5ZXQgbG9hZGVkLlxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgaXNPcGVuQ2hhbmdlOkV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlciA9IG5ldyBUcmFuc2l0aW9uQ29udHJvbGxlcihmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZSgpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW47XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=