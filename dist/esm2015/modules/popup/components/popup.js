import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, ElementRef, EventEmitter, HostListener, HostBinding } from "@angular/core";
import { PositioningService } from "../../../misc/util/services/positioning.service";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { TransitionDirection, Transition } from "../../../modules/transition/classes/transition";
let SuiPopup = class SuiPopup {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.tabindex = 0;
    }
    get isOpen() {
        return this._isOpen;
    }
    set anchor(anchor) {
        // Whenever the anchor is set (which is when the popup is created), recreate the positioning service with the appropriate options.
        this.positioningService = new PositioningService(anchor, this.container.element, this.config.placement, ".dynamic.arrow");
    }
    // Returns the direction (`top`, `left`, `right`, `bottom`) of the current placement.
    get direction() {
        if (this.positioningService) {
            return this.positioningService.actualPlacement.split(" ").shift();
        }
    }
    // Returns the alignment (`top`, `left`, `right`, `bottom`) of the current placement.
    get alignment() {
        if (this.positioningService) {
            return this.positioningService.actualPlacement.split(" ").pop();
        }
    }
    get dynamicClasses() {
        const classes = {};
        if (this.direction) {
            classes[this.direction] = true;
        }
        if (this.alignment) {
            classes[this.alignment] = true;
        }
        if (this.config.isInverted) {
            classes.inverted = true;
        }
        if (this.config.isBasic) {
            classes.basic = true;
        }
        return classes;
    }
    open() {
        // Only attempt to open if currently closed.
        if (!this.isOpen) {
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);
            // Cancel all other transitions, and initiate the opening transition.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.In, () => {
                // Focus any element with [autofocus] attribute.
                const autoFocus = this.elementRef.nativeElement.querySelector("[autofocus]");
                if (autoFocus) {
                    // Autofocus after the browser has had time to process other event handlers.
                    setTimeout(() => autoFocus.focus(), 10);
                    // Try to focus again when the modal has opened so that autofocus works in IE11.
                    setTimeout(() => autoFocus.focus(), this.config.transitionDuration);
                }
            }));
            // Refresh the popup position after a brief delay to allow for browser processing time.
            this.positioningService.placement = this.config.placement;
            setTimeout(() => this.positioningService.update());
            // Finally, set the popup to be open.
            this._isOpen = true;
            this.onOpen.emit();
        }
    }
    toggle() {
        if (!this.isOpen) {
            return this.open();
        }
        return this.close();
    }
    close() {
        // Only attempt to close if currently open.
        if (this.isOpen) {
            // Cancel all other transitions, and initiate the closing transition.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.Out));
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);
            // Start the closing timer, that fires the `onClose` event after the transition duration number of milliseconds.
            this.closingTimeout = window.setTimeout(() => this.onClose.emit(), this.config.transitionDuration);
            // Finally, set the popup to be closed.
            this._isOpen = false;
        }
    }
    onClick(event) {
        // Makes sense here, as the popup shouldn't be attached to any DOM element.
        event.stopPropagation();
    }
};
SuiPopup.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    ViewChild("container", { read: ViewContainerRef, static: true })
], SuiPopup.prototype, "container", void 0);
tslib_1.__decorate([
    ViewChild("templateSibling", { read: ViewContainerRef, static: true })
], SuiPopup.prototype, "templateSibling", void 0);
tslib_1.__decorate([
    HostBinding("attr.tabindex")
], SuiPopup.prototype, "tabindex", void 0);
tslib_1.__decorate([
    HostListener("click", ["$event"])
], SuiPopup.prototype, "onClick", null);
SuiPopup = tslib_1.__decorate([
    Component({
        selector: "sui-popup",
        template: `
        <div
            class="ui popup"
            [ngClass]="dynamicClasses"
            [suiTransition]="transitionController"
            [attr.direction]="direction"
            #container
        >
            <ng-container
                *ngIf="!config.template && (!!config.header || !!config.text)"
            >
                <div class="header" *ngIf="config.header">
                    {{ config.header }}
                </div>
                <div class="content">{{ config.text }}</div>
            </ng-container>
            <div #templateSibling></div>

            <sui-popup-arrow
                *ngIf="!config.isBasic"
                [placement]="positioningService.actualPlacement"
                [inverted]="config.isInverted"
            ></sui-popup-arrow>
        </div>
    `,
        styles: [`
            .ui.popup {
                /* Autofit popup to the contents. */
                right: auto;
            }

            .ui.animating.popup {
                /* When the popup is animating, it may not initially be in the correct position.
       This fires a mouse event, causing the anchor's mouseleave to fire - making the popup flicker.
       Setting pointer-events to none while animating fixes this bug. */
                pointer-events: none;
            }

            .ui.popup::before {
                /* Hide the Semantic UI CSS arrow. */
                display: none;
            }

            /* Offset popup by 0.75em above and below when placed 'vertically'. */
            .ui.popup[direction="top"],
            .ui.popup[direction="bottom"] {
                margin-top: 0.75em;
                margin-bottom: 0.75em;
            }

            /* Offset popup by 0.75em either side when placed 'horizontally'. */
            .ui.popup[direction="left"],
            .ui.popup[direction="right"] {
                margin-left: 0.75em;
                margin-right: 0.75em;
            }
        `]
    })
], SuiPopup);
export { SuiPopup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3BvcHVwL2NvbXBvbmVudHMvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDckYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDakcsT0FBTyxFQUNILG1CQUFtQixFQUNuQixVQUFVLEVBQ2IsTUFBTSxnREFBZ0QsQ0FBQztBQWlFeEQsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQXlFakIsWUFBbUIsVUFBcUI7UUFBckIsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXhDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFqRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFNRCxJQUFXLE1BQU0sQ0FBQyxNQUFpQjtRQUMvQixrSUFBa0k7UUFDbEksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQzVDLE1BQU0sRUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFDdEIsSUFBSSxDQUFDLE1BQU0s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QU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3VDQUlqQztBQW5LUSxRQUFRO0lBOURwQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdCVDtpQkFFRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQStCQztLQUVSLENBQUM7R0FDVyxRQUFRLENBb0twQjtTQXBLWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEhvc3RCaW5kaW5nXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJUG9wdXAgfSBmcm9tIFwiLi4vY2xhc3Nlcy9wb3B1cC1jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcHVwQ29uZmlnIH0gZnJvbSBcIi4uL2NsYXNzZXMvcG9wdXAtdGVtcGxhdGUtY29udHJvbGxlclwiO1xuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9zZXJ2aWNlcy9wb3NpdGlvbmluZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7XG4gICAgVHJhbnNpdGlvbkRpcmVjdGlvbixcbiAgICBUcmFuc2l0aW9uXG59IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uXCI7XG5pbXBvcnQgeyBJRHluYW1pY0NsYXNzZXMgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2hlbHBlcnMvdXRpbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktcG9wdXBcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInVpIHBvcHVwXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImR5bmFtaWNDbGFzc2VzXCJcbiAgICAgICAgICAgIFtzdWlUcmFuc2l0aW9uXT1cInRyYW5zaXRpb25Db250cm9sbGVyXCJcbiAgICAgICAgICAgIFthdHRyLmRpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgI2NvbnRhaW5lclxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhY29uZmlnLnRlbXBsYXRlICYmICghIWNvbmZpZy5oZWFkZXIgfHwgISFjb25maWcudGV4dClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIiAqbmdJZj1cImNvbmZpZy5oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgY29uZmlnLmhlYWRlciB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+e3sgY29uZmlnLnRleHQgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPGRpdiAjdGVtcGxhdGVTaWJsaW5nPjwvZGl2PlxuXG4gICAgICAgICAgICA8c3VpLXBvcHVwLWFycm93XG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhY29uZmlnLmlzQmFzaWNcIlxuICAgICAgICAgICAgICAgIFtwbGFjZW1lbnRdPVwicG9zaXRpb25pbmdTZXJ2aWNlLmFjdHVhbFBsYWNlbWVudFwiXG4gICAgICAgICAgICAgICAgW2ludmVydGVkXT1cImNvbmZpZy5pc0ludmVydGVkXCJcbiAgICAgICAgICAgID48L3N1aS1wb3B1cC1hcnJvdz5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgLnVpLnBvcHVwIHtcbiAgICAgICAgICAgICAgICAvKiBBdXRvZml0IHBvcHVwIHRvIHRoZSBjb250ZW50cy4gKi9cbiAgICAgICAgICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnVpLmFuaW1hdGluZy5wb3B1cCB7XG4gICAgICAgICAgICAgICAgLyogV2hlbiB0aGUgcG9wdXAgaXMgYW5pbWF0aW5nLCBpdCBtYXkgbm90IGluaXRpYWxseSBiZSBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbi5cbiAgICAgICBUaGlzIGZpcmVzIGEgbW91c2UgZXZlbnQsIGNhdXNpbmcgdGhlIGFuY2hvcidzIG1vdXNlbGVhdmUgdG8gZmlyZSAtIG1ha2luZyB0aGUgcG9wdXAgZmxpY2tlci5cbiAgICAgICBTZXR0aW5nIHBvaW50ZXItZXZlbnRzIHRvIG5vbmUgd2hpbGUgYW5pbWF0aW5nIGZpeGVzIHRoaXMgYnVnLiAqL1xuICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAudWkucG9wdXA6OmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgLyogSGlkZSB0aGUgU2VtYW50aWMgVUkgQ1NTIGFycm93LiAqL1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIE9mZnNldCBwb3B1cCBieSAwLjc1ZW0gYWJvdmUgYW5kIGJlbG93IHdoZW4gcGxhY2VkICd2ZXJ0aWNhbGx5Jy4gKi9cbiAgICAgICAgICAgIC51aS5wb3B1cFtkaXJlY3Rpb249XCJ0b3BcIl0sXG4gICAgICAgICAgICAudWkucG9wdXBbZGlyZWN0aW9uPVwiYm90dG9tXCJdIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAwLjc1ZW07XG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC43NWVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBPZmZzZXQgcG9wdXAgYnkgMC43NWVtIGVpdGhlciBzaWRlIHdoZW4gcGxhY2VkICdob3Jpem9udGFsbHknLiAqL1xuICAgICAgICAgICAgLnVpLnBvcHVwW2RpcmVjdGlvbj1cImxlZnRcIl0sXG4gICAgICAgICAgICAudWkucG9wdXBbZGlyZWN0aW9uPVwicmlnaHRcIl0ge1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjc1ZW07XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwLjc1ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVBvcHVwIGltcGxlbWVudHMgSVBvcHVwIHtcbiAgICAvLyBDb25maWcgc2V0dGluZ3MgZm9yIHRoaXMgcG9wdXAuXG4gICAgcHVibGljIGNvbmZpZzpUZW1wbGF0ZVBvcHVwQ29uZmlnPGFueT47XG5cbiAgICBwdWJsaWMgdHJhbnNpdGlvbkNvbnRyb2xsZXI6VHJhbnNpdGlvbkNvbnRyb2xsZXI7XG4gICAgcHVibGljIHBvc2l0aW9uaW5nU2VydmljZTpQb3NpdGlvbmluZ1NlcnZpY2U7XG5cbiAgICAvLyBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIHRoZSBwb3B1cCBpcyBvcGVuIGludGVybmFsbHkuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOmJvb2xlYW47XG4gICAgLy8gYHNldFRpbWVvdXRgIHRpbWVyIHBvaW50ZXIgZm9yIGNhbmNlbGxpbmcgcG9wdXAgY2xvc2UuXG4gICAgcHVibGljIGNsb3NpbmdUaW1lb3V0Om51bWJlcjtcblxuICAgIC8vIEZpcmVzIHdoZW4gdGhlIHBvcHVwIG9wZW5zIChhbmQgdGhlIGFuaW1hdGlvbiBpcyBjb21wbGV0ZWQpLlxuICAgIHB1YmxpYyBvbk9wZW46RXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIC8vIEZpcmVzIHdoZW4gdGhlIHBvcHVwIGNsb3NlcyAoYW5kIHRoZSBhbmltYXRpb24gaXMgY29tcGxldGVkKS5cbiAgICBwdWJsaWMgb25DbG9zZTpFdmVudEVtaXR0ZXI8dm9pZD47XG5cbiAgICBwdWJsaWMgZ2V0IGlzT3BlbigpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICAgIH1cblxuICAgIC8vIGBFbGVtZW50UmVmYCBmb3IgdGhlIHBvc2l0aW9uaW5nIHN1YmplY3QuXG4gICAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHB1YmxpYyBjb250YWluZXI6Vmlld0NvbnRhaW5lclJlZjtcblxuICAgIHB1YmxpYyBzZXQgYW5jaG9yKGFuY2hvcjpFbGVtZW50UmVmKSB7XG4gICAgICAgIC8vIFdoZW5ldmVyIHRoZSBhbmNob3IgaXMgc2V0ICh3aGljaCBpcyB3aGVuIHRoZSBwb3B1cCBpcyBjcmVhdGVkKSwgcmVjcmVhdGUgdGhlIHBvc2l0aW9uaW5nIHNlcnZpY2Ugd2l0aCB0aGUgYXBwcm9wcmlhdGUgb3B0aW9ucy5cbiAgICAgICAgdGhpcy5wb3NpdGlvbmluZ1NlcnZpY2UgPSBuZXcgUG9zaXRpb25pbmdTZXJ2aWNlKFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnBsYWNlbWVudCxcbiAgICAgICAgICAgIFwiLmR5bmFtaWMuYXJyb3dcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGRpcmVjdGlvbiAoYHRvcGAsIGBsZWZ0YCwgYHJpZ2h0YCwgYGJvdHRvbWApIG9mIHRoZSBjdXJyZW50IHBsYWNlbWVudC5cbiAgICBwdWJsaWMgZ2V0IGRpcmVjdGlvbigpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uaW5nU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25pbmdTZXJ2aWNlLmFjdHVhbFBsYWNlbWVudC5zcGxpdChcIiBcIikuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGFsaWdubWVudCAoYHRvcGAsIGBsZWZ0YCwgYHJpZ2h0YCwgYGJvdHRvbWApIG9mIHRoZSBjdXJyZW50IHBsYWNlbWVudC5cbiAgICBwdWJsaWMgZ2V0IGFsaWdubWVudCgpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uaW5nU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25pbmdTZXJ2aWNlLmFjdHVhbFBsYWNlbWVudC5zcGxpdChcIiBcIikucG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGR5bmFtaWNDbGFzc2VzKCk6SUR5bmFtaWNDbGFzc2VzIHtcbiAgICAgICAgY29uc3QgY2xhc3NlczpJRHluYW1pY0NsYXNzZXMgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjbGFzc2VzW3RoaXMuZGlyZWN0aW9uXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWxpZ25tZW50KSB7XG4gICAgICAgICAgICBjbGFzc2VzW3RoaXMuYWxpZ25tZW50XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzSW52ZXJ0ZWQpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuaW52ZXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pc0Jhc2ljKSB7XG4gICAgICAgICAgICBjbGFzc2VzLmJhc2ljID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG5cbiAgICAvLyBgVmlld0NvbnRhaW5lclJlZmAgZm9yIHRoZSBlbGVtZW50IHRoZSB0ZW1wbGF0ZSBnZXRzIGluamVjdGVkIGFzIGEgc2libGluZyBvZi5cbiAgICBAVmlld0NoaWxkKFwidGVtcGxhdGVTaWJsaW5nXCIsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIHRlbXBsYXRlU2libGluZzpWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci50YWJpbmRleFwiKVxuICAgIHB1YmxpYyB0YWJpbmRleDpudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjpFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIgPSBuZXcgVHJhbnNpdGlvbkNvbnRyb2xsZXIoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAgICAgdGhpcy50YWJpbmRleCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW4oKTp2b2lkIHtcbiAgICAgICAgLy8gT25seSBhdHRlbXB0IHRvIG9wZW4gaWYgY3VycmVudGx5IGNsb3NlZC5cbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgLy8gQ2FuY2VsIHRoZSBjbG9zaW5nIHRpbWVyLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2luZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBDYW5jZWwgYWxsIG90aGVyIHRyYW5zaXRpb25zLCBhbmQgaW5pdGlhdGUgdGhlIG9wZW5pbmcgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb25EaXJlY3Rpb24uSW4sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvY3VzIGFueSBlbGVtZW50IHdpdGggW2F1dG9mb2N1c10gYXR0cmlidXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXV0b0ZvY3VzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlthdXRvZm9jdXNdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1dG9Gb2N1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF1dG9mb2N1cyBhZnRlciB0aGUgYnJvd3NlciBoYXMgaGFkIHRpbWUgdG8gcHJvY2VzcyBvdGhlciBldmVudCBoYW5kbGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF1dG9Gb2N1cy5mb2N1cygpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZvY3VzIGFnYWluIHdoZW4gdGhlIG1vZGFsIGhhcyBvcGVuZWQgc28gdGhhdCBhdXRvZm9jdXMgd29ya3MgaW4gSUUxMS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBhdXRvRm9jdXMuZm9jdXMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIHBvcHVwIHBvc2l0aW9uIGFmdGVyIGEgYnJpZWYgZGVsYXkgdG8gYWxsb3cgZm9yIGJyb3dzZXIgcHJvY2Vzc2luZyB0aW1lLlxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbmluZ1NlcnZpY2UucGxhY2VtZW50ID0gdGhpcy5jb25maWcucGxhY2VtZW50O1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBvc2l0aW9uaW5nU2VydmljZS51cGRhdGUoKSk7XG5cbiAgICAgICAgICAgIC8vIEZpbmFsbHksIHNldCB0aGUgcG9wdXAgdG8gYmUgb3Blbi5cbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6dm9pZCB7XG4gICAgICAgIC8vIE9ubHkgYXR0ZW1wdCB0byBjbG9zZSBpZiBjdXJyZW50bHkgb3Blbi5cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICAvLyBDYW5jZWwgYWxsIG90aGVyIHRyYW5zaXRpb25zLCBhbmQgaW5pdGlhdGUgdGhlIGNsb3NpbmcgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gQ2FuY2VsIHRoZSBjbG9zaW5nIHRpbWVyLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2luZ1RpbWVvdXQpO1xuICAgICAgICAgICAgLy8gU3RhcnQgdGhlIGNsb3NpbmcgdGltZXIsIHRoYXQgZmlyZXMgdGhlIGBvbkNsb3NlYCBldmVudCBhZnRlciB0aGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25DbG9zZS5lbWl0KCksXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBGaW5hbGx5LCBzZXQgdGhlIHBvcHVwIHRvIGJlIGNsb3NlZC5cbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25DbGljayhldmVudDpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgLy8gTWFrZXMgc2Vuc2UgaGVyZSwgYXMgdGhlIHBvcHVwIHNob3VsZG4ndCBiZSBhdHRhY2hlZCB0byBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==