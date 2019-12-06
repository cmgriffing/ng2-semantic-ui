import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, ElementRef, EventEmitter, HostListener, HostBinding } from "@angular/core";
import { PositioningService } from "../../../misc/util/index";
import { TransitionController, TransitionDirection, Transition } from "../../transition/index";
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
        this.positioningService = new PositioningService(anchor, this._container.element, this.config.placement, ".dynamic.arrow");
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
    ViewChild("container", { static: true, read: ViewContainerRef })
], SuiPopup.prototype, "_container", void 0);
tslib_1.__decorate([
    ViewChild("templateSibling", { static: false, read: ViewContainerRef })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3BvcHVwL2NvbXBvbmVudHMvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBQy9FLE9BQU8sRUFDSCxvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLFVBQVUsRUFDYixNQUFNLHdCQUF3QixDQUFDO0FBa0VoQyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBeUVqQixZQUFtQixVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3BDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQWpFRCxJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQU1ELElBQVcsTUFBTSxDQUFDLE1BQWlCO1FBQy9CLGtJQUFrSTtRQUNsSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDNUMsTUFBTSxFQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFDckIsZ0JBQWdCLENBQ25CLENB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SWpDO0FBbktRLFFBQVE7SUE5RHBCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBd0JUO2lCQUVHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBK0JDO0tBRVIsQ0FBQztHQUNXLFFBQVEsQ0FvS3BCO1NBcEtZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSG9zdEJpbmRpbmdcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSwgSUR5bmFtaWNDbGFzc2VzIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHtcbiAgICBUcmFuc2l0aW9uQ29udHJvbGxlcixcbiAgICBUcmFuc2l0aW9uRGlyZWN0aW9uLFxuICAgIFRyYW5zaXRpb25cbn0gZnJvbSBcIi4uLy4uL3RyYW5zaXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IElQb3B1cCB9IGZyb20gXCIuLi9jbGFzc2VzL3BvcHVwLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFRlbXBsYXRlUG9wdXBDb25maWcgfSBmcm9tIFwiLi4vY2xhc3Nlcy9wb3B1cC10ZW1wbGF0ZS1jb250cm9sbGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1wb3B1cFwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwidWkgcG9wdXBcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiZHluYW1pY0NsYXNzZXNcIlxuICAgICAgICAgICAgW3N1aVRyYW5zaXRpb25dPVwidHJhbnNpdGlvbkNvbnRyb2xsZXJcIlxuICAgICAgICAgICAgW2F0dHIuZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiXG4gICAgICAgICAgICAjY29udGFpbmVyXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFjb25maWcudGVtcGxhdGUgJiYgKCEhY29uZmlnLmhlYWRlciB8fCAhIWNvbmZpZy50ZXh0KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiICpuZ0lmPVwiY29uZmlnLmhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjb25maWcuaGVhZGVyIH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj57eyBjb25maWcudGV4dCB9fTwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8ZGl2ICN0ZW1wbGF0ZVNpYmxpbmc+PC9kaXY+XG5cbiAgICAgICAgICAgIDxzdWktcG9wdXAtYXJyb3dcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFjb25maWcuaXNCYXNpY1wiXG4gICAgICAgICAgICAgICAgW3BsYWNlbWVudF09XCJwb3NpdGlvbmluZ1NlcnZpY2UuYWN0dWFsUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgICBbaW52ZXJ0ZWRdPVwiY29uZmlnLmlzSW52ZXJ0ZWRcIlxuICAgICAgICAgICAgPjwvc3VpLXBvcHVwLWFycm93PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAudWkucG9wdXAge1xuICAgICAgICAgICAgICAgIC8qIEF1dG9maXQgcG9wdXAgdG8gdGhlIGNvbnRlbnRzLiAqL1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAudWkuYW5pbWF0aW5nLnBvcHVwIHtcbiAgICAgICAgICAgICAgICAvKiBXaGVuIHRoZSBwb3B1cCBpcyBhbmltYXRpbmcsIGl0IG1heSBub3QgaW5pdGlhbGx5IGJlIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uLlxuICAgICAgIFRoaXMgZmlyZXMgYSBtb3VzZSBldmVudCwgY2F1c2luZyB0aGUgYW5jaG9yJ3MgbW91c2VsZWF2ZSB0byBmaXJlIC0gbWFraW5nIHRoZSBwb3B1cCBmbGlja2VyLlxuICAgICAgIFNldHRpbmcgcG9pbnRlci1ldmVudHMgdG8gbm9uZSB3aGlsZSBhbmltYXRpbmcgZml4ZXMgdGhpcyBidWcuICovXG4gICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC51aS5wb3B1cDo6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAvKiBIaWRlIHRoZSBTZW1hbnRpYyBVSSBDU1MgYXJyb3cuICovXG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogT2Zmc2V0IHBvcHVwIGJ5IDAuNzVlbSBhYm92ZSBhbmQgYmVsb3cgd2hlbiBwbGFjZWQgJ3ZlcnRpY2FsbHknLiAqL1xuICAgICAgICAgICAgLnVpLnBvcHVwW2RpcmVjdGlvbj1cInRvcFwiXSxcbiAgICAgICAgICAgIC51aS5wb3B1cFtkaXJlY3Rpb249XCJib3R0b21cIl0ge1xuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDAuNzVlbTtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjc1ZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIE9mZnNldCBwb3B1cCBieSAwLjc1ZW0gZWl0aGVyIHNpZGUgd2hlbiBwbGFjZWQgJ2hvcml6b250YWxseScuICovXG4gICAgICAgICAgICAudWkucG9wdXBbZGlyZWN0aW9uPVwibGVmdFwiXSxcbiAgICAgICAgICAgIC51aS5wb3B1cFtkaXJlY3Rpb249XCJyaWdodFwiXSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuNzVlbTtcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuNzVlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpUG9wdXAgaW1wbGVtZW50cyBJUG9wdXAge1xuICAgIC8vIENvbmZpZyBzZXR0aW5ncyBmb3IgdGhpcyBwb3B1cC5cbiAgICBwdWJsaWMgY29uZmlnOlRlbXBsYXRlUG9wdXBDb25maWc8YW55PjtcblxuICAgIHB1YmxpYyB0cmFuc2l0aW9uQ29udHJvbGxlcjpUcmFuc2l0aW9uQ29udHJvbGxlcjtcbiAgICBwdWJsaWMgcG9zaXRpb25pbmdTZXJ2aWNlOlBvc2l0aW9uaW5nU2VydmljZTtcblxuICAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgdGhlIHBvcHVwIGlzIG9wZW4gaW50ZXJuYWxseS5cbiAgICBwcml2YXRlIF9pc09wZW46Ym9vbGVhbjtcbiAgICAvLyBgc2V0VGltZW91dGAgdGltZXIgcG9pbnRlciBmb3IgY2FuY2VsbGluZyBwb3B1cCBjbG9zZS5cbiAgICBwdWJsaWMgY2xvc2luZ1RpbWVvdXQ6bnVtYmVyO1xuXG4gICAgLy8gRmlyZXMgd2hlbiB0aGUgcG9wdXAgb3BlbnMgKGFuZCB0aGUgYW5pbWF0aW9uIGlzIGNvbXBsZXRlZCkuXG4gICAgcHVibGljIG9uT3BlbjpFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLy8gRmlyZXMgd2hlbiB0aGUgcG9wdXAgY2xvc2VzIChhbmQgdGhlIGFuaW1hdGlvbiBpcyBjb21wbGV0ZWQpLlxuICAgIHB1YmxpYyBvbkNsb3NlOkV2ZW50RW1pdHRlcjx2b2lkPjtcblxuICAgIHB1YmxpYyBnZXQgaXNPcGVuKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gICAgfVxuXG4gICAgLy8gYEVsZW1lbnRSZWZgIGZvciB0aGUgcG9zaXRpb25pbmcgc3ViamVjdC5cbiAgICBAVmlld0NoaWxkKFwiY29udGFpbmVyXCIsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOlZpZXdDb250YWluZXJSZWY7XG5cbiAgICBwdWJsaWMgc2V0IGFuY2hvcihhbmNob3I6RWxlbWVudFJlZikge1xuICAgICAgICAvLyBXaGVuZXZlciB0aGUgYW5jaG9yIGlzIHNldCAod2hpY2ggaXMgd2hlbiB0aGUgcG9wdXAgaXMgY3JlYXRlZCksIHJlY3JlYXRlIHRoZSBwb3NpdGlvbmluZyBzZXJ2aWNlIHdpdGggdGhlIGFwcHJvcHJpYXRlIG9wdGlvbnMuXG4gICAgICAgIHRoaXMucG9zaXRpb25pbmdTZXJ2aWNlID0gbmV3IFBvc2l0aW9uaW5nU2VydmljZShcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5lbGVtZW50LFxuICAgICAgICAgICAgdGhpcy5jb25maWcucGxhY2VtZW50LFxuICAgICAgICAgICAgXCIuZHluYW1pYy5hcnJvd1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0aGUgZGlyZWN0aW9uIChgdG9wYCwgYGxlZnRgLCBgcmlnaHRgLCBgYm90dG9tYCkgb2YgdGhlIGN1cnJlbnQgcGxhY2VtZW50LlxuICAgIHB1YmxpYyBnZXQgZGlyZWN0aW9uKCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25pbmdTZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbmluZ1NlcnZpY2UuYWN0dWFsUGxhY2VtZW50LnNwbGl0KFwiIFwiKS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyB0aGUgYWxpZ25tZW50IChgdG9wYCwgYGxlZnRgLCBgcmlnaHRgLCBgYm90dG9tYCkgb2YgdGhlIGN1cnJlbnQgcGxhY2VtZW50LlxuICAgIHB1YmxpYyBnZXQgYWxpZ25tZW50KCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25pbmdTZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbmluZ1NlcnZpY2UuYWN0dWFsUGxhY2VtZW50LnNwbGl0KFwiIFwiKS5wb3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZHluYW1pY0NsYXNzZXMoKTpJRHluYW1pY0NsYXNzZXMge1xuICAgICAgICBjb25zdCBjbGFzc2VzOklEeW5hbWljQ2xhc3NlcyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy5kaXJlY3Rpb25dID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hbGlnbm1lbnQpIHtcbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy5hbGlnbm1lbnRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXNJbnZlcnRlZCkge1xuICAgICAgICAgICAgY2xhc3Nlcy5pbnZlcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlzQmFzaWMpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuYmFzaWMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgIH1cblxuICAgIC8vIGBWaWV3Q29udGFpbmVyUmVmYCBmb3IgdGhlIGVsZW1lbnQgdGhlIHRlbXBsYXRlIGdldHMgaW5qZWN0ZWQgYXMgYSBzaWJsaW5nIG9mLlxuICAgIEBWaWV3Q2hpbGQoXCJ0ZW1wbGF0ZVNpYmxpbmdcIiwgeyBzdGF0aWM6IGZhbHNlLCByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgcHVibGljIHRlbXBsYXRlU2libGluZzpWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci50YWJpbmRleFwiKVxuICAgIHB1YmxpYyB0YWJpbmRleDpudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjpFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIgPSBuZXcgVHJhbnNpdGlvbkNvbnRyb2xsZXIoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAgICAgdGhpcy50YWJpbmRleCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW4oKTp2b2lkIHtcbiAgICAgICAgLy8gT25seSBhdHRlbXB0IHRvIG9wZW4gaWYgY3VycmVudGx5IGNsb3NlZC5cbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgLy8gQ2FuY2VsIHRoZSBjbG9zaW5nIHRpbWVyLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2luZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBDYW5jZWwgYWxsIG90aGVyIHRyYW5zaXRpb25zLCBhbmQgaW5pdGlhdGUgdGhlIG9wZW5pbmcgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb25EaXJlY3Rpb24uSW4sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvY3VzIGFueSBlbGVtZW50IHdpdGggW2F1dG9mb2N1c10gYXR0cmlidXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXV0b0ZvY3VzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlthdXRvZm9jdXNdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1dG9Gb2N1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF1dG9mb2N1cyBhZnRlciB0aGUgYnJvd3NlciBoYXMgaGFkIHRpbWUgdG8gcHJvY2VzcyBvdGhlciBldmVudCBoYW5kbGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF1dG9Gb2N1cy5mb2N1cygpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZvY3VzIGFnYWluIHdoZW4gdGhlIG1vZGFsIGhhcyBvcGVuZWQgc28gdGhhdCBhdXRvZm9jdXMgd29ya3MgaW4gSUUxMS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBhdXRvRm9jdXMuZm9jdXMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIHBvcHVwIHBvc2l0aW9uIGFmdGVyIGEgYnJpZWYgZGVsYXkgdG8gYWxsb3cgZm9yIGJyb3dzZXIgcHJvY2Vzc2luZyB0aW1lLlxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbmluZ1NlcnZpY2UucGxhY2VtZW50ID0gdGhpcy5jb25maWcucGxhY2VtZW50O1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBvc2l0aW9uaW5nU2VydmljZS51cGRhdGUoKSk7XG5cbiAgICAgICAgICAgIC8vIEZpbmFsbHksIHNldCB0aGUgcG9wdXAgdG8gYmUgb3Blbi5cbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlKCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKCk6dm9pZCB7XG4gICAgICAgIC8vIE9ubHkgYXR0ZW1wdCB0byBjbG9zZSBpZiBjdXJyZW50bHkgb3Blbi5cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICAvLyBDYW5jZWwgYWxsIG90aGVyIHRyYW5zaXRpb25zLCBhbmQgaW5pdGlhdGUgdGhlIGNsb3NpbmcgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gQ2FuY2VsIHRoZSBjbG9zaW5nIHRpbWVyLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2luZ1RpbWVvdXQpO1xuICAgICAgICAgICAgLy8gU3RhcnQgdGhlIGNsb3NpbmcgdGltZXIsIHRoYXQgZmlyZXMgdGhlIGBvbkNsb3NlYCBldmVudCBhZnRlciB0aGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLlxuICAgICAgICAgICAgdGhpcy5jbG9zaW5nVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25DbG9zZS5lbWl0KCksXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBGaW5hbGx5LCBzZXQgdGhlIHBvcHVwIHRvIGJlIGNsb3NlZC5cbiAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25DbGljayhldmVudDpNb3VzZUV2ZW50KTp2b2lkIHtcbiAgICAgICAgLy8gTWFrZXMgc2Vuc2UgaGVyZSwgYXMgdGhlIHBvcHVwIHNob3VsZG4ndCBiZSBhdHRhY2hlZCB0byBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==