import * as tslib_1 from "tslib";
import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter, Output, HostListener, ViewContainerRef, AfterViewInit } from "@angular/core";
import { Util, IDynamicClasses, KeyCode, SuiComponentFactory } from "../../../misc/util/index";
import { TransitionController, Transition, TransitionDirection } from "../../transition/index";
import { ModalControls } from "../classes/modal-controls";
import { ModalConfig } from "../classes/modal-config";
var SuiModal = /** @class */ (function () {
    function SuiModal(_renderer, _element, _componentFactory) {
        var _this = this;
        this._renderer = _renderer;
        this._element = _element;
        this._componentFactory = _componentFactory;
        // Initialise with default configuration from `ModalConfig` (to avoid writing defaults twice).
        var config = new ModalConfig();
        this.loadConfig(config);
        // Event emitters for each of the possible modal outcomes.
        this.onApprove = new EventEmitter();
        this.onDeny = new EventEmitter();
        this.onDismiss = new EventEmitter();
        // Initialise controls with actions for the `approve` and `deny` cases.
        this.controls = new ModalControls(function (res) { return _this.dismiss(function () { return _this.onApprove.emit(res); }); }, function (res) { return _this.dismiss(function () { return _this.onDeny.emit(res); }); });
        // Internal variable initialisation.
        this.dimBackground = false;
        this._isClosing = false;
        this.transitionController = new TransitionController(false);
    }
    Object.defineProperty(SuiModal.prototype, "approve", {
        get: function () {
            return this.controls.approve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "deny", {
        get: function () {
            return this.controls.deny;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "isFullScreen", {
        // Value to deny with when closing via `isClosable`.
        get: function () {
            return this._isFullScreen;
        },
        set: function (fullScreen) {
            this._isFullScreen = Util.DOM.parseBooleanAttribute(fullScreen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "mustScroll", {
        get: function () {
            return this._mustScroll;
        },
        set: function (mustScroll) {
            this._mustScroll = mustScroll;
            // 'Cache' value in _mustAlwaysScroll so that if `true`, _mustScroll isn't ever auto-updated.
            this._mustAlwaysScroll = mustScroll;
            this.updateScroll();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "isInverted", {
        get: function () {
            return this._isInverted;
        },
        set: function (inverted) {
            this._isInverted = Util.DOM.parseBooleanAttribute(inverted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "dynamicClasses", {
        get: function () {
            var classes = {};
            if (this.size) {
                classes[this.size] = true;
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    SuiModal.prototype.ngOnInit = function () {
        var _this = this;
        // Transition the modal to be visible.
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        setTimeout(function () { return (_this.dimBackground = true); });
    };
    SuiModal.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Move the modal to the document body to ensure correct scrolling.
        this._originalContainer = this._element.nativeElement.parentNode;
        document
            .querySelector("body")
            .appendChild(this._element.nativeElement);
        // Remove the #templateSibling element from the DOM to fix bottom border styles.
        var templateElement = this.templateSibling.element
            .nativeElement;
        if (templateElement.parentNode) {
            templateElement.parentNode.removeChild(templateElement);
        }
        // Update margin offset to center modal correctly on-screen.
        var element = this._modalElement.nativeElement;
        setTimeout(function () {
            _this._renderer.setStyle(element, "margin-top", "-" + element.clientHeight / 2 + "px");
            _this.updateScroll();
        });
        // Focus any element with [autofocus] attribute.
        var autoFocus = element.querySelector("[autofocus]");
        if (autoFocus) {
            // Autofocus after the browser has had time to process other event handlers.
            setTimeout(function () { return autoFocus.focus(); }, 10);
            // Try to focus again when the modal has opened so that autofocus works in IE11.
            setTimeout(function () { return autoFocus.focus(); }, this.transitionDuration);
        }
    };
    // Updates the modal with the specified configuration.
    SuiModal.prototype.loadConfig = function (config) {
        this.isClosable = config.isClosable;
        this.closeResult = config.closeResult;
        this.size = config.size;
        this.isFullScreen = config.isFullScreen;
        this.isBasic = config.isBasic;
        this.isInverted = config.isInverted;
        this.mustScroll = config.mustScroll;
        this.transition = config.transition;
        this.transitionDuration = config.transitionDuration;
    };
    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    SuiModal.prototype.dismiss = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        // If we aren't currently closing,
        if (!this._isClosing) {
            this._isClosing = true;
            // Transition the modal to be invisible.
            this.dimBackground = false;
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, function () {
                // When done, move the modal back to its original location, emit a dismiss event, and fire the callback.
                if (_this._originalContainer) {
                    _this._originalContainer.appendChild(_this._element.nativeElement);
                }
                _this.onDismiss.emit();
                callback();
            }));
        }
    };
    // Closes the modal with a 'deny' outcome, using the specified default reason.
    SuiModal.prototype.close = function () {
        if (this.isClosable) {
            // If we are allowed to close, fire the deny result with the default value.
            this.deny(this.closeResult);
        }
    };
    // Decides whether the modal needs to reposition to allow scrolling.
    SuiModal.prototype.updateScroll = function () {
        // Semantic UI modal margin is 3.5rem, which is relative to the global font size, so for compatibility:
        var fontSize = parseFloat(window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("font-size"));
        var margin = fontSize * 3.5;
        // _mustAlwaysScroll works by stopping _mustScroll from being automatically updated, so it stays `true`.
        if (!this._mustAlwaysScroll && this._modalElement) {
            var element = this._modalElement.nativeElement;
            // The modal must scroll if the window height is smaller than the modal height + both margins.
            this._mustScroll =
                window.innerHeight < element.clientHeight + margin * 2;
        }
    };
    SuiModal.prototype.onClick = function (e) {
        // Makes sense here, as the modal shouldn't be attached to any DOM element.
        e.stopPropagation();
    };
    // Document listener is fine here because nobody will enough modals open.
    SuiModal.prototype.onDocumentKeyUp = function (e) {
        if (e.keyCode === KeyCode.Escape) {
            // Close automatically covers case of `!isClosable`, so check not needed.
            this.close();
        }
    };
    SuiModal.prototype.onDocumentResize = function () {
        this.updateScroll();
    };
    SuiModal.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: SuiComponentFactory }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "isClosable", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "closeResult", void 0);
    tslib_1.__decorate([
        Output("approved")
    ], SuiModal.prototype, "onApprove", void 0);
    tslib_1.__decorate([
        Output("denied")
    ], SuiModal.prototype, "onDeny", void 0);
    tslib_1.__decorate([
        Output("dismissed")
    ], SuiModal.prototype, "onDismiss", void 0);
    tslib_1.__decorate([
        ViewChild("modal", { static: true })
    ], SuiModal.prototype, "_modalElement", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "size", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "isFullScreen", null);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "isBasic", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "mustScroll", null);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "isInverted", null);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "transition", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiModal.prototype, "transitionDuration", void 0);
    tslib_1.__decorate([
        ViewChild("templateSibling", { static: false, read: ViewContainerRef })
    ], SuiModal.prototype, "templateSibling", void 0);
    tslib_1.__decorate([
        HostListener("document:keyup", ["$event"])
    ], SuiModal.prototype, "onDocumentKeyUp", null);
    tslib_1.__decorate([
        HostListener("window:resize")
    ], SuiModal.prototype, "onDocumentResize", null);
    SuiModal = tslib_1.__decorate([
        Component({
            selector: "sui-modal",
            template: "\n        <!-- Page dimmer for modal background. -->\n        <sui-dimmer\n            class=\"page\"\n            [class.inverted]=\"isInverted\"\n            [(isDimmed)]=\"dimBackground\"\n            [isClickable]=\"false\"\n            [transitionDuration]=\"transitionDuration\"\n            [wrapContent]=\"false\"\n            (click)=\"close()\"\n        >\n            <!-- Modal component, with transition component attached -->\n            <div\n                class=\"ui modal\"\n                [suiTransition]=\"transitionController\"\n                [class.active]=\"transitionController?.isVisible\"\n                [class.fullscreen]=\"isFullScreen\"\n                [class.basic]=\"isBasic\"\n                [class.scroll]=\"mustScroll\"\n                [class.inverted]=\"isInverted\"\n                [ngClass]=\"dynamicClasses\"\n                (click)=\"onClick($event)\"\n                #modal\n            >\n                <!-- Configurable close icon -->\n                <i class=\"close icon\" *ngIf=\"isClosable\" (click)=\"close()\"></i>\n                <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->\n                <ng-content></ng-content>\n                <!-- @ViewChild reference so we can insert elements beside this div. -->\n                <div #templateSibling></div>\n            </div>\n        </sui-dimmer>\n    ",
            styles: ["\n            .ui.dimmer {\n                overflow-y: auto;\n            }\n\n            /* avoid .scrolling as Semantic UI adds unwanted styles. */\n            .scroll {\n                position: absolute !important;\n                margin-top: 3.5rem !important;\n                margin-bottom: 3.5rem !important;\n                top: 0;\n            }\n        "]
        })
    ], SuiModal);
    return SuiModal;
}());
export { SuiModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL21vZGFsL2NvbXBvbmVudHMvbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsSUFBSSxFQUNKLGVBQWUsRUFDZixPQUFPLEVBQ1AsbUJBQW1CLEVBQ3RCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUNILG9CQUFvQixFQUNwQixVQUFVLEVBQ1YsbUJBQW1CLEVBQ3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGFBQWEsRUFBZSxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxXQUFXLEVBQWEsTUFBTSx5QkFBeUIsQ0FBQztBQXFEakU7SUFtSEksa0JBQ1ksU0FBbUIsRUFDbkIsUUFBbUIsRUFDbkIsaUJBQXFDO1FBSGpELGlCQXdCQztRQXZCVyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUU3Qyw4RkFBOEY7UUFDOUYsSUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQW1CLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QiwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxF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QW5LcUIsU0FBUztnQkFDVixVQUFVO2dCQUNELG1CQUFtQjs7SUFuSGpEO1FBRkMsS0FBSyxFQUFFO2dEQUVrQjtJQUkxQjtRQUZDLEtBQUssRUFBRTtpREFFYTtJQWVyQjtRQURDLE1BQU0sQ0FBQyxVQUFVLENBQUM7K0NBQ2M7SUFJakM7UUFEQyxNQUFNLENBQUMsUUFBUSxDQUFDOzRDQUNhO0lBSTlCO1FBREMsTUFBTSxDQUFDLFdBQVcsQ0FBQzsrQ0FDZ0I7SUFHcEM7UUFEQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO21EQUNKO0lBSWpDO1FBREMsS0FBSyxFQUFFOzBDQUNjO0lBT3RCO1FBREMsS0FBSyxFQUFFO2dEQUdQO0lBUUQ7UUFEQyxLQUFLLEVBQUU7NkNBQ2U7SUFRdkI7UUFEQyxLQUFLLEVBQUU7OENBR1A7SUFhRDtRQURDLEtBQUssRUFBRTs4Q0FHUDtJQVVEO1FBREMsS0FBSyxFQUFFO2dEQUNpQjtJQUl6QjtRQURDLEtBQUssRUFBRTt3REFDeUI7SUFTakM7UUFEQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3FEQUNoQztJQXVLeEM7UUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzttREFNMUM7SUFHRDtRQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7b0RBRzdCO0lBdlJRLFFBQVE7UUFuRHBCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSwwM0NBZ0NUO3FCQUVHLHFYQVlDO1NBRVIsQ0FBQztPQUNXLFFBQVEsQ0F3UnBCO0lBQUQsZUFBQztDQUFBLEFBeFJELElBd1JDO1NBeFJZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgVmlld0NoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgUmVuZGVyZXIyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgICBVdGlsLFxuICAgIElEeW5hbWljQ2xhc3NlcyxcbiAgICBLZXlDb2RlLFxuICAgIFN1aUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuaW1wb3J0IHtcbiAgICBUcmFuc2l0aW9uQ29udHJvbGxlcixcbiAgICBUcmFuc2l0aW9uLFxuICAgIFRyYW5zaXRpb25EaXJlY3Rpb25cbn0gZnJvbSBcIi4uLy4uL3RyYW5zaXRpb24vaW5kZXhcIjtcbmltcG9ydCB7IE1vZGFsQ29udHJvbHMsIE1vZGFsUmVzdWx0IH0gZnJvbSBcIi4uL2NsYXNzZXMvbW9kYWwtY29udHJvbHNcIjtcbmltcG9ydCB7IE1vZGFsQ29uZmlnLCBNb2RhbFNpemUgfSBmcm9tIFwiLi4vY2xhc3Nlcy9tb2RhbC1jb25maWdcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLW1vZGFsXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPCEtLSBQYWdlIGRpbW1lciBmb3IgbW9kYWwgYmFja2dyb3VuZC4gLS0+XG4gICAgICAgIDxzdWktZGltbWVyXG4gICAgICAgICAgICBjbGFzcz1cInBhZ2VcIlxuICAgICAgICAgICAgW2NsYXNzLmludmVydGVkXT1cImlzSW52ZXJ0ZWRcIlxuICAgICAgICAgICAgWyhpc0RpbW1lZCldPVwiZGltQmFja2dyb3VuZFwiXG4gICAgICAgICAgICBbaXNDbGlja2FibGVdPVwiZmFsc2VcIlxuICAgICAgICAgICAgW3RyYW5zaXRpb25EdXJhdGlvbl09XCJ0cmFuc2l0aW9uRHVyYXRpb25cIlxuICAgICAgICAgICAgW3dyYXBDb250ZW50XT1cImZhbHNlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbG9zZSgpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPCEtLSBNb2RhbCBjb21wb25lbnQsIHdpdGggdHJhbnNpdGlvbiBjb21wb25lbnQgYXR0YWNoZWQgLS0+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ1aSBtb2RhbFwiXG4gICAgICAgICAgICAgICAgW3N1aVRyYW5zaXRpb25dPVwidHJhbnNpdGlvbkNvbnRyb2xsZXJcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidHJhbnNpdGlvbkNvbnRyb2xsZXI/LmlzVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmZ1bGxzY3JlZW5dPVwiaXNGdWxsU2NyZWVuXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYmFzaWNdPVwiaXNCYXNpY1wiXG4gICAgICAgICAgICAgICAgW2NsYXNzLnNjcm9sbF09XCJtdXN0U2Nyb2xsXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuaW52ZXJ0ZWRdPVwiaXNJbnZlcnRlZFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZHluYW1pY0NsYXNzZXNcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICNtb2RhbFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwhLS0gQ29uZmlndXJhYmxlIGNsb3NlIGljb24gLS0+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJjbG9zZSBpY29uXCIgKm5nSWY9XCJpc0Nsb3NhYmxlXCIgKGNsaWNrKT1cImNsb3NlKClcIj48L2k+XG4gICAgICAgICAgICAgICAgPCEtLSA8bmctY29udGVudD4gc28gdGhhdCA8c3VpLW1vZGFsPiBjYW4gYmUgdXNlZCBhcyBhIG5vcm1hbCBjb21wb25lbnQuIC0tPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8IS0tIEBWaWV3Q2hpbGQgcmVmZXJlbmNlIHNvIHdlIGNhbiBpbnNlcnQgZWxlbWVudHMgYmVzaWRlIHRoaXMgZGl2LiAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2ICN0ZW1wbGF0ZVNpYmxpbmc+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zdWktZGltbWVyPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC51aS5kaW1tZXIge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qIGF2b2lkIC5zY3JvbGxpbmcgYXMgU2VtYW50aWMgVUkgYWRkcyB1bndhbnRlZCBzdHlsZXMuICovXG4gICAgICAgICAgICAuc2Nyb2xsIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAzLjVyZW0gIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAzLjVyZW0gIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aU1vZGFsPFQsIFU+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKVxuICAgIC8vIERldGVybWluZXMgd2hldGhlciB0aGUgbW9kYWwgY2FuIGJlIGNsb3NlZCB3aXRoIGEgY2xvc2UgYnV0dG9uLCBjbGlja2luZyBvdXRzaWRlLCBvciB0aGUgZXNjYXBlIGtleS5cbiAgICBwdWJsaWMgaXNDbG9zYWJsZTpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICAvLyBWYWx1ZSB0byBkZW55IHdpdGggd2hlbiBjbG9zaW5nIHZpYSBgaXNDbG9zYWJsZWAuXG4gICAgcHVibGljIGNsb3NlUmVzdWx0OlU7XG5cbiAgICAvLyBTZXBhcmF0ZSBjbGFzcyBmb3IgdGhlIGBhcHByb3ZlYCBhbmQgYGRlbnlgIG1ldGhvZHMgdG8gc3VwcG9ydCBwYXNzaW5nIGludG8gY29tcG9uZW50cy5cbiAgICBwdWJsaWMgY29udHJvbHM6TW9kYWxDb250cm9sczxULCBVPjtcblxuICAgIHB1YmxpYyBnZXQgYXBwcm92ZSgpOk1vZGFsUmVzdWx0PFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbHMuYXBwcm92ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGRlbnkoKTpNb2RhbFJlc3VsdDxVPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xzLmRlbnk7XG4gICAgfVxuXG4gICAgLy8gRmlyZXMgd2hlbiB0aGUgbW9kYWwgY2xvc2VzLCBhZnRlciBgYXBwcm92ZWAgaGFzIGJlZW4gY2FsbGVkLlxuICAgIEBPdXRwdXQoXCJhcHByb3ZlZFwiKVxuICAgIHB1YmxpYyBvbkFwcHJvdmU6RXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgLy8gRmlyZXMgd2hlbiB0aGUgbW9kYWwgY2xvc2VzLCBhZnRlciBgZGVueWAgaGFzIGJlZW4gY2FsbGVkLlxuICAgIEBPdXRwdXQoXCJkZW5pZWRcIilcbiAgICBwdWJsaWMgb25EZW55OkV2ZW50RW1pdHRlcjxVPjtcblxuICAgIC8vIEZpcmVzIHdoZW4gdGhlIG1vZGFsIGNsb3Nlcy5cbiAgICBAT3V0cHV0KFwiZGlzbWlzc2VkXCIpXG4gICAgcHVibGljIG9uRGlzbWlzczpFdmVudEVtaXR0ZXI8dm9pZD47XG5cbiAgICBAVmlld0NoaWxkKFwibW9kYWxcIiwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcml2YXRlIF9tb2RhbEVsZW1lbnQ6RWxlbWVudFJlZjtcblxuICAgIC8vIFNpemUgdXNlZCB0byBkaXNwbGF5IHRoZSBtb2RhbC5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzaXplOk1vZGFsU2l6ZTtcblxuICAgIC8vIFdoZXRoZXIgdGhlIG1vZGFsIHRha2VzIHVwIHRoZSBmdWxsIHdpZHRoIG9mIHRoZSBzY3JlZW4uXG4gICAgcHJpdmF0ZSBfaXNGdWxsU2NyZWVuOmJvb2xlYW47XG5cbiAgICAvLyBWYWx1ZSB0byBkZW55IHdpdGggd2hlbiBjbG9zaW5nIHZpYSBgaXNDbG9zYWJsZWAuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzRnVsbFNjcmVlbigpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNGdWxsU2NyZWVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNGdWxsU2NyZWVuKGZ1bGxTY3JlZW46Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc0Z1bGxTY3JlZW4gPSBVdGlsLkRPTS5wYXJzZUJvb2xlYW5BdHRyaWJ1dGUoZnVsbFNjcmVlbik7XG4gICAgfVxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdGhlIG1vZGFsIGhhcyBiYXNpYyBzdHlsZXMgYXBwbGllZC5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpc0Jhc2ljOmJvb2xlYW47XG5cbiAgICAvLyBXaGV0aGVyIHRoZSBtb2RhbCBjdXJyZW50bHkgaXMgZGlzcGxheWluZyBhIHNjcm9sbGJhci5cbiAgICBwcml2YXRlIF9tdXN0U2Nyb2xsOmJvb2xlYW47XG4gICAgLy8gV2hldGhlciBvciBub3QgdGhlIG1vZGFsIHNob3VsZCBhbHdheXMgZGlzcGxheSBhIHNjcm9sbGJhci5cbiAgICBwcml2YXRlIF9tdXN0QWx3YXlzU2Nyb2xsOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgbXVzdFNjcm9sbCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVzdFNjcm9sbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG11c3RTY3JvbGwobXVzdFNjcm9sbDpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX211c3RTY3JvbGwgPSBtdXN0U2Nyb2xsO1xuICAgICAgICAvLyAnQ2FjaGUnIHZhbHVlIGluIF9tdXN0QWx3YXlzU2Nyb2xsIHNvIHRoYXQgaWYgYHRydWVgLCBfbXVzdFNjcm9sbCBpc24ndCBldmVyIGF1dG8tdXBkYXRlZC5cbiAgICAgICAgdGhpcy5fbXVzdEFsd2F5c1Njcm9sbCA9IG11c3RTY3JvbGw7XG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKCk7XG4gICAgfVxuXG4gICAgLy8gV2hldGhlciB0aGUgbW9kYWwgc2hvd3MgYWdhaW5zdCBhIGxpZ2h0IGJhY2tncm91bmQuXG4gICAgcHJpdmF0ZSBfaXNJbnZlcnRlZDpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGlzSW52ZXJ0ZWQoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSW52ZXJ0ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpc0ludmVydGVkKGludmVydGVkOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNJbnZlcnRlZCA9IFV0aWwuRE9NLnBhcnNlQm9vbGVhbkF0dHJpYnV0ZShpbnZlcnRlZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zaXRpb25Db250cm9sbGVyOlRyYW5zaXRpb25Db250cm9sbGVyO1xuXG4gICAgLy8gVHJhbnNpdGlvbiB0byBkaXNwbGF5IG1vZGFsIHdpdGguXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICAvLyBEdXJhdGlvbiBvZiB0aGUgbW9kYWwgJiBkaW1tZXIgdHJhbnNpdGlvbnMuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbkR1cmF0aW9uOm51bWJlcjtcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHRoZSBiYWNrcm91bmQgZGltbWVyIGlzIGFjdGl2ZS5cbiAgICBwdWJsaWMgZGltQmFja2dyb3VuZDpib29sZWFuO1xuICAgIC8vIFRydWUgYWZ0ZXIgYGFwcHJvdmVgIG9yIGBkZW55YCBoYXMgYmVlbiBjYWxsZWQuXG4gICAgcHJpdmF0ZSBfaXNDbG9zaW5nOmJvb2xlYW47XG5cbiAgICAvLyBgVmlld0NvbnRhaW5lclJlZmAgZm9yIHRoZSBlbGVtZW50IHRoZSB0ZW1wbGF0ZSBnZXRzIGluamVjdGVkIGFzIGEgc2libGluZyBvZi5cbiAgICBAVmlld0NoaWxkKFwidGVtcGxhdGVTaWJsaW5nXCIsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KVxuICAgIHB1YmxpYyB0ZW1wbGF0ZVNpYmxpbmc6Vmlld0NvbnRhaW5lclJlZjtcblxuICAgIC8vIFBhcmVudCBlbGVtZW50IG9mIG1vZGFsIGJlZm9yZSByZWxvY2F0aW9uIHRvIGRvY3VtZW50IGJvZHkuXG4gICAgcHJpdmF0ZSBfb3JpZ2luYWxDb250YWluZXI/OkVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgZ2V0IGR5bmFtaWNDbGFzc2VzKCk6SUR5bmFtaWNDbGFzc2VzIHtcbiAgICAgICAgY29uc3QgY2xhc3NlczpJRHluYW1pY0NsYXNzZXMgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLnNpemVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3Rvcnk6U3VpQ29tcG9uZW50RmFjdG9yeVxuICAgICkge1xuICAgICAgICAvLyBJbml0aWFsaXNlIHdpdGggZGVmYXVsdCBjb25maWd1cmF0aW9uIGZyb20gYE1vZGFsQ29uZmlnYCAodG8gYXZvaWQgd3JpdGluZyBkZWZhdWx0cyB0d2ljZSkuXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBNb2RhbENvbmZpZzx1bmRlZmluZWQsIFQsIFU+KCk7XG4gICAgICAgIHRoaXMubG9hZENvbmZpZyhjb25maWcpO1xuXG4gICAgICAgIC8vIEV2ZW50IGVtaXR0ZXJzIGZvciBlYWNoIG9mIHRoZSBwb3NzaWJsZSBtb2RhbCBvdXRjb21lcy5cbiAgICAgICAgdGhpcy5vbkFwcHJvdmUgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG4gICAgICAgIHRoaXMub25EZW55ID0gbmV3IEV2ZW50RW1pdHRlcjxVPigpO1xuICAgICAgICB0aGlzLm9uRGlzbWlzcyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgICAgICAvLyBJbml0aWFsaXNlIGNvbnRyb2xzIHdpdGggYWN0aW9ucyBmb3IgdGhlIGBhcHByb3ZlYCBhbmQgYGRlbnlgIGNhc2VzLlxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IE1vZGFsQ29udHJvbHM8VCwgVT4oXG4gICAgICAgICAgICByZXMgPT4gdGhpcy5kaXNtaXNzKCgpID0+IHRoaXMub25BcHByb3ZlLmVtaXQocmVzKSksXG4gICAgICAgICAgICByZXMgPT4gdGhpcy5kaXNtaXNzKCgpID0+IHRoaXMub25EZW55LmVtaXQocmVzKSlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBJbnRlcm5hbCB2YXJpYWJsZSBpbml0aWFsaXNhdGlvbi5cbiAgICAgICAgdGhpcy5kaW1CYWNrZ3JvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzQ2xvc2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTp2b2lkIHtcbiAgICAgICAgLy8gVHJhbnNpdGlvbiB0aGUgbW9kYWwgdG8gYmUgdmlzaWJsZS5cbiAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgbmV3IFRyYW5zaXRpb24oXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIFRyYW5zaXRpb25EaXJlY3Rpb24uSW5cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5kaW1CYWNrZ3JvdW5kID0gdHJ1ZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcbiAgICAgICAgLy8gTW92ZSB0aGUgbW9kYWwgdG8gdGhlIGRvY3VtZW50IGJvZHkgdG8gZW5zdXJlIGNvcnJlY3Qgc2Nyb2xsaW5nLlxuICAgICAgICB0aGlzLl9vcmlnaW5hbENvbnRhaW5lciA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpIVxuICAgICAgICAgICAgLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgI3RlbXBsYXRlU2libGluZyBlbGVtZW50IGZyb20gdGhlIERPTSB0byBmaXggYm90dG9tIGJvcmRlciBzdHlsZXMuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlRWxlbWVudCA9IHRoaXMudGVtcGxhdGVTaWJsaW5nLmVsZW1lbnRcbiAgICAgICAgICAgIC5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQ7XG4gICAgICAgIGlmICh0ZW1wbGF0ZUVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGVtcGxhdGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBtYXJnaW4gb2Zmc2V0IHRvIGNlbnRlciBtb2RhbCBjb3JyZWN0bHkgb24tc2NyZWVuLlxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fbW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgRWxlbWVudDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiLFxuICAgICAgICAgICAgICAgIGAtJHtlbGVtZW50LmNsaWVudEhlaWdodCAvIDJ9cHhgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRm9jdXMgYW55IGVsZW1lbnQgd2l0aCBbYXV0b2ZvY3VzXSBhdHRyaWJ1dGUuXG4gICAgICAgIGNvbnN0IGF1dG9Gb2N1cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiW2F1dG9mb2N1c11cIlxuICAgICAgICApIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgaWYgKGF1dG9Gb2N1cykge1xuICAgICAgICAgICAgLy8gQXV0b2ZvY3VzIGFmdGVyIHRoZSBicm93c2VyIGhhcyBoYWQgdGltZSB0byBwcm9jZXNzIG90aGVyIGV2ZW50IGhhbmRsZXJzLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdXRvRm9jdXMuZm9jdXMoKSwgMTApO1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGZvY3VzIGFnYWluIHdoZW4gdGhlIG1vZGFsIGhhcyBvcGVuZWQgc28gdGhhdCBhdXRvZm9jdXMgd29ya3MgaW4gSUUxMS5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXV0b0ZvY3VzLmZvY3VzKCksIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgdGhlIG1vZGFsIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWd1cmF0aW9uLlxuICAgIHB1YmxpYyBsb2FkQ29uZmlnPFY+KGNvbmZpZzpNb2RhbENvbmZpZzxWLCBULCBVPik6dm9pZCB7XG4gICAgICAgIHRoaXMuaXNDbG9zYWJsZSA9IGNvbmZpZy5pc0Nsb3NhYmxlO1xuICAgICAgICB0aGlzLmNsb3NlUmVzdWx0ID0gY29uZmlnLmNsb3NlUmVzdWx0O1xuXG4gICAgICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xuICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9IGNvbmZpZy5pc0Z1bGxTY3JlZW47XG4gICAgICAgIHRoaXMuaXNCYXNpYyA9IGNvbmZpZy5pc0Jhc2ljO1xuICAgICAgICB0aGlzLmlzSW52ZXJ0ZWQgPSBjb25maWcuaXNJbnZlcnRlZDtcblxuICAgICAgICB0aGlzLm11c3RTY3JvbGwgPSBjb25maWcubXVzdFNjcm9sbDtcblxuICAgICAgICB0aGlzLnRyYW5zaXRpb24gPSBjb25maWcudHJhbnNpdGlvbjtcbiAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gPSBjb25maWcudHJhbnNpdGlvbkR1cmF0aW9uO1xuICAgIH1cblxuICAgIC8vIERpc21pc3NlcyB0aGUgbW9kYWwgd2l0aCBhIHRyYW5zaXRpb24sIGZpcmluZyB0aGUgY2FsbGJhY2sgYWZ0ZXIgdGhlIG1vZGFsIGhhcyBmaW5pc2hlZCB0cmFuc2l0aW9uaW5nLlxuICAgIHByaXZhdGUgZGlzbWlzcyhjYWxsYmFjazooKSA9PiB2b2lkID0gKCkgPT4ge30pOnZvaWQge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgY3VycmVudGx5IGNsb3NpbmcsXG4gICAgICAgIGlmICghdGhpcy5faXNDbG9zaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0Nsb3NpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBUcmFuc2l0aW9uIHRoZSBtb2RhbCB0byBiZSBpbnZpc2libGUuXG4gICAgICAgICAgICB0aGlzLmRpbUJhY2tncm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNvbnRyb2xsZXIuc3RvcEFsbCgpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQ29udHJvbGxlci5hbmltYXRlKFxuICAgICAgICAgICAgICAgIG5ldyBUcmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uRGlyZWN0aW9uLk91dCxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBkb25lLCBtb3ZlIHRoZSBtb2RhbCBiYWNrIHRvIGl0cyBvcmlnaW5hbCBsb2NhdGlvbiwgZW1pdCBhIGRpc21pc3MgZXZlbnQsIGFuZCBmaXJlIHRoZSBjYWxsYmFjay5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcmlnaW5hbENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRpc21pc3MuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDbG9zZXMgdGhlIG1vZGFsIHdpdGggYSAnZGVueScgb3V0Y29tZSwgdXNpbmcgdGhlIHNwZWNpZmllZCBkZWZhdWx0IHJlYXNvbi5cbiAgICBwdWJsaWMgY2xvc2UoKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDbG9zYWJsZSkge1xuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGFsbG93ZWQgdG8gY2xvc2UsIGZpcmUgdGhlIGRlbnkgcmVzdWx0IHdpdGggdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAgICAgICAgICB0aGlzLmRlbnkodGhpcy5jbG9zZVJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWNpZGVzIHdoZXRoZXIgdGhlIG1vZGFsIG5lZWRzIHRvIHJlcG9zaXRpb24gdG8gYWxsb3cgc2Nyb2xsaW5nLlxuICAgIHByaXZhdGUgdXBkYXRlU2Nyb2xsKCk6dm9pZCB7XG4gICAgICAgIC8vIFNlbWFudGljIFVJIG1vZGFsIG1hcmdpbiBpcyAzLjVyZW0sIHdoaWNoIGlzIHJlbGF0aXZlIHRvIHRoZSBnbG9iYWwgZm9udCBzaXplLCBzbyBmb3IgY29tcGF0aWJpbGl0eTpcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSBwYXJzZUZsb2F0KFxuICAgICAgICAgICAgd2luZG93XG4gICAgICAgICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiZm9udC1zaXplXCIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IGZvbnRTaXplICogMy41O1xuXG4gICAgICAgIC8vIF9tdXN0QWx3YXlzU2Nyb2xsIHdvcmtzIGJ5IHN0b3BwaW5nIF9tdXN0U2Nyb2xsIGZyb20gYmVpbmcgYXV0b21hdGljYWxseSB1cGRhdGVkLCBzbyBpdCBzdGF5cyBgdHJ1ZWAuXG4gICAgICAgIGlmICghdGhpcy5fbXVzdEFsd2F5c1Njcm9sbCAmJiB0aGlzLl9tb2RhbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBFbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBUaGUgbW9kYWwgbXVzdCBzY3JvbGwgaWYgdGhlIHdpbmRvdyBoZWlnaHQgaXMgc21hbGxlciB0aGFuIHRoZSBtb2RhbCBoZWlnaHQgKyBib3RoIG1hcmdpbnMuXG4gICAgICAgICAgICB0aGlzLl9tdXN0U2Nyb2xsID1cbiAgICAgICAgICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgPCBlbGVtZW50LmNsaWVudEhlaWdodCArIG1hcmdpbiAqIDI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICAvLyBNYWtlcyBzZW5zZSBoZXJlLCBhcyB0aGUgbW9kYWwgc2hvdWxkbid0IGJlIGF0dGFjaGVkIHRvIGFueSBET00gZWxlbWVudC5cbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBEb2N1bWVudCBsaXN0ZW5lciBpcyBmaW5lIGhlcmUgYmVjYXVzZSBub2JvZHkgd2lsbCBlbm91Z2ggbW9kYWxzIG9wZW4uXG4gICAgQEhvc3RMaXN0ZW5lcihcImRvY3VtZW50OmtleXVwXCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25Eb2N1bWVudEtleVVwKGU6S2V5Ym9hcmRFdmVudCk6dm9pZCB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtleUNvZGUuRXNjYXBlKSB7XG4gICAgICAgICAgICAvLyBDbG9zZSBhdXRvbWF0aWNhbGx5IGNvdmVycyBjYXNlIG9mIGAhaXNDbG9zYWJsZWAsIHNvIGNoZWNrIG5vdCBuZWVkZWQuXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICAgIHB1YmxpYyBvbkRvY3VtZW50UmVzaXplKCk6dm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKCk7XG4gICAgfVxufVxuIl19