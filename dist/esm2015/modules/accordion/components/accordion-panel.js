import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Transition } from "../../transition/classes/transition";
import { TransitionController } from "../../transition/classes/transition-controller";
let SuiAccordionPanel = class SuiAccordionPanel {
    constructor(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.isOpenChange = new EventEmitter(false);
    }
    set service(service) {
        this._service = service;
        this._changeDetector.detectChanges();
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        // Convert to boolean (fixes false != undefined)
        const isOpen = !!value;
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
    }
    get transition() {
        if (this._service) {
            return this._service.transition;
        }
        return "fade";
    }
    get transitionDuration() {
        if (this._service) {
            // Return the service defined transition duration.
            return this._service.transitionDuration;
        }
        // Revert to instantaneous if the service is not yet loaded.
        return 0;
    }
    toggle() {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
};
SuiAccordionPanel.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
        template: `
        <!-- Title -->
        <div class="title" [class.active]="isOpen" (click)="toggle()">
            <ng-content select="[title]"></ng-content>
        </div>
        <!-- Content -->
        <div [suiCollapse]="!isOpen" [collapseDuration]="transitionDuration">
            <div
                class="content"
                [class.active]="isOpen"
                [suiTransition]="transitionController"
            >
                <ng-content select="[content]"></ng-content>
            </div>
        </div>
    `,
        styles: [`
            /* Manual style as Semantic UI relies on > selector */
            .content {
                padding: 0.5em 0 1em;
            }

            /* Another > selector fix */
            :host:first-child .title {
                border-top: none;
            }
        `]
    })
], SuiAccordionPanel);
export { SuiAccordionPanel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLXBhbmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9hY2NvcmRpb24vY29tcG9uZW50cy9hY2NvcmRpb24tcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQW1DdEYsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUE4RDFCLFlBQXNCLGVBQWlDO1FBQWpDLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNuRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUE5REQsSUFBVyxPQUFPLENBQUMsT0FBMkI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBUUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFXLE1BQU0sQ0FBQyxLQUFhO1FBQzNCLGdEQUFnRDtRQUNoRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRXZCLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDeEIsd0NBQXdDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBRXRCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLDhEQUE4RDtnQkFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QztZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwQyxvRkFBb0Y7WUFDcEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQzdCLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQzNELENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUNuQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFXLGtCQUFrQjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixrREFBa0Q7WUFDbEQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1NBQzNDO1FBQ0QsNERBQTREO1FBQzVELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQVlNLE1BQU07UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM5QjtJQUNMLENBQUM7Q0FDSixDQUFBOztZQVp5QyxpQkFBaUI7O0FBbkR2RDtJQURDLEtBQUssRUFBRTtxREFDa0I7QUFLMUI7SUFEQyxLQUFLLEVBQUU7K0NBR1A7QUEwQ0Q7SUFEQyxNQUFNLEVBQUU7dURBQ2lDO0FBNURqQyxpQkFBaUI7SUFqQzdCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztLQWVUO2lCQUVHOzs7Ozs7Ozs7O1NBVUM7S0FFUixDQUFDO0dBQ1csaUJBQWlCLENBMEU3QjtTQTFFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWlBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FjY29yZGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSBcIi4uLy4uL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1hY2NvcmRpb24tcGFuZWxcIixcbiAgICBleHBvcnRBczogXCJzdWlBY2NvcmRpb25QYW5lbFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDwhLS0gVGl0bGUgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiIFtjbGFzcy5hY3RpdmVdPVwiaXNPcGVuXCIgKGNsaWNrKT1cInRvZ2dsZSgpXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSBDb250ZW50IC0tPlxuICAgICAgICA8ZGl2IFtzdWlDb2xsYXBzZV09XCIhaXNPcGVuXCIgW2NvbGxhcHNlRHVyYXRpb25dPVwidHJhbnNpdGlvbkR1cmF0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzT3BlblwiXG4gICAgICAgICAgICAgICAgW3N1aVRyYW5zaXRpb25dPVwidHJhbnNpdGlvbkNvbnRyb2xsZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltjb250ZW50XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAvKiBNYW51YWwgc3R5bGUgYXMgU2VtYW50aWMgVUkgcmVsaWVzIG9uID4gc2VsZWN0b3IgKi9cbiAgICAgICAgICAgIC5jb250ZW50IHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjVlbSAwIDFlbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogQW5vdGhlciA+IHNlbGVjdG9yIGZpeCAqL1xuICAgICAgICAgICAgOmhvc3Q6Zmlyc3QtY2hpbGQgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlBY2NvcmRpb25QYW5lbCB7XG4gICAgcHJpdmF0ZSBfc2VydmljZTpTdWlBY2NvcmRpb25TZXJ2aWNlO1xuXG4gICAgcHVibGljIHRyYW5zaXRpb25Db250cm9sbGVyOlRyYW5zaXRpb25Db250cm9sbGVyO1xuXG4gICAgcHVibGljIHNldCBzZXJ2aWNlKHNlcnZpY2U6U3VpQWNjb3JkaW9uU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlID0gc2VydmljZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGlzRGlzYWJsZWQ6Ym9vbGVhbjtcblxuICAgIHByaXZhdGUgX2lzT3Blbjpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzT3BlbigpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNPcGVuKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgLy8gQ29udmVydCB0byBib29sZWFuIChmaXhlcyBmYWxzZSAhPSB1bmRlZmluZWQpXG4gICAgICAgIGNvbnN0IGlzT3BlbiA9ICEhdmFsdWU7XG5cbiAgICAgICAgaWYgKGlzT3BlbiAhPT0gdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIC8vIE9ubHkgdXBkYXRlIGlmIHRoZSB2YWx1ZSBoYXMgY2hhbmdlZC5cbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGlzT3BlbjtcblxuICAgICAgICAgICAgaWYgKGlzT3BlbiAmJiB0aGlzLl9zZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIG9wZW5pbmcgdGhpcyBwYW5lbCwgd2UgbXVzdCBjbG9zZSB0aGUgb3RoZXIgb25lcy5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmNsb3NlT3RoZXJQYW5lbHModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMuaXNPcGVuKTtcblxuICAgICAgICAgICAgLy8gQ2FuY2VsIGFsbCBjdXJyZW50IGFuaW1hdGlvbnMsIGFuZCBmYWRlIHRoZSBjb250ZW50cy4gVGhlIGRpcmVjdGlvbiBpcyBhdXRvbWF0aWMuXG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25Db250cm9sbGVyLnN0b3BBbGwoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICBuZXcgVHJhbnNpdGlvbih0aGlzLnRyYW5zaXRpb24sIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdHJhbnNpdGlvbigpOnN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS50cmFuc2l0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiZmFkZVwiO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdHJhbnNpdGlvbkR1cmF0aW9uKCk6bnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VydmljZSBkZWZpbmVkIHRyYW5zaXRpb24gZHVyYXRpb24uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZS50cmFuc2l0aW9uRHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGluc3RhbnRhbmVvdXMgaWYgdGhlIHNlcnZpY2UgaXMgbm90IHlldCBsb2FkZWQuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBpc09wZW5DaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvcjpDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKGZhbHNlKTtcblxuICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3BlbjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==