import * as tslib_1 from "tslib";
import { HostListener } from "@angular/core";
import { PopupTrigger } from "./popup-config";
import { SuiPopup } from "../components/popup";
export class SuiPopupController {
    constructor(_renderer, _element, _componentFactory, _config) {
        this._renderer = _renderer;
        this._element = _element;
        this._componentFactory = _componentFactory;
        this._config = _config;
        // Generate a new SuiPopup component and attach it to the application view.
        this._componentRef = this._componentFactory.createComponent(SuiPopup);
        // Configure popup with provided config.
        this.popup.config = _config;
        // When the popup is closed (onClose fires on animation complete),
        this.popup.onClose.subscribe(() => this.cleanup());
        this._documentListener = _renderer.listen("document", "click", (e) => this.onDocumentClick(e));
    }
    // Returns generated popup instance.
    get popup() {
        // Use non-null assertion as we only access this when a popup exists.
        return this._componentRef.instance;
    }
    configure(config) {
        if (config) {
            Object.assign(this.popup.config, config);
        }
    }
    openDelayed() {
        // Cancel the opening timer.
        clearTimeout(this._openingTimeout);
        // Start the popup opening after the specified delay interval.
        this._openingTimeout = window.setTimeout(() => this.open(), this.popup.config.delay);
    }
    open() {
        // Attach the generated component to the current application.
        this._componentFactory.attachToApplication(this._componentRef);
        // Move the generated element to the body to avoid any positioning issues.
        this._componentFactory.moveToDocumentBody(this._componentRef);
        // Attach a reference to the anchor element. We do it here because IE11 loves to complain.
        this.popup.anchor = this._element;
        // Start popup open transition.
        this.popup.open();
        // Call lifecyle hook
        const lifecycle = this.popupOnOpen;
        if (lifecycle) {
            lifecycle.call(this);
        }
    }
    close() {
        // Cancel the opening timer to stop the popup opening after close has been called.
        clearTimeout(this._openingTimeout);
        if (this._componentRef) {
            // Start popup close transition.
            this.popup.close();
        }
        // Call lifecyle hook
        const lifecycle = this.popupOnClose;
        if (lifecycle) {
            lifecycle.call(this);
        }
    }
    toggleDelayed() {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.openDelayed();
        }
        // O'wise, close it.
        return this.close();
    }
    toggle() {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.open();
        }
        // O'wise, close it.
        return this.close();
    }
    onMouseEnter() {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.openDelayed();
        }
    }
    onMouseLeave() {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.close();
        }
    }
    onClick() {
        if (this.popup.config.trigger === PopupTrigger.Click ||
            this.popup.config.trigger === PopupTrigger.OutsideClick) {
            // Repeated clicks require a toggle, rather than just opening the popup each time.
            this.toggleDelayed();
        }
        else if (this.popup.config.trigger === PopupTrigger.Focus &&
            (!this._componentRef || (this._componentRef && !this.popup.isOpen))) {
            // Repeated clicks with a focus trigger requires an open (as focus isn't ever lost on repeated click).
            this.openDelayed();
        }
    }
    onDocumentClick(e) {
        // If the popup trigger is outside click,
        if (this._componentRef &&
            this.popup.config.trigger === PopupTrigger.OutsideClick) {
            const target = e.target;
            // Close the popup if the click is outside of the popup element.
            if (!this._element.nativeElement.contains(target)) {
                this.close();
            }
        }
    }
    onFocusIn() {
        if (this.popup.config.trigger === PopupTrigger.Focus) {
            this.openDelayed();
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget) &&
            !this.popup.elementRef.nativeElement.contains(e.relatedTarget) &&
            this.popup.config.trigger === PopupTrigger.Focus) {
            this.close();
        }
    }
    cleanup() {
        clearTimeout(this._openingTimeout);
        if (this._componentRef.instance &&
            this._componentRef.instance.positioningService) {
            this._componentRef.instance.positioningService.destroy();
        }
        this._componentFactory.detachFromApplication(this._componentRef);
    }
    ngOnDestroy() {
        this.cleanup();
        this._documentListener();
    }
}
tslib_1.__decorate([
    HostListener("mouseenter")
], SuiPopupController.prototype, "onMouseEnter", null);
tslib_1.__decorate([
    HostListener("mouseleave")
], SuiPopupController.prototype, "onMouseLeave", null);
tslib_1.__decorate([
    HostListener("click")
], SuiPopupController.prototype, "onClick", null);
tslib_1.__decorate([
    HostListener("focusin")
], SuiPopupController.prototype, "onFocusIn", null);
tslib_1.__decorate([
    HostListener("focusout", ["$event"])
], SuiPopupController.prototype, "onFocusOut", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvcG9wdXAvY2xhc3Nlcy9wb3B1cC1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBR0gsWUFBWSxFQUdmLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxZQUFZLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBVS9DLE1BQU0sT0FBZ0Isa0JBQWtCO0lBZ0JwQyxZQUNjLFNBQW1CLEVBQ25CLFFBQW1CLEVBQ25CLGlCQUFxQyxFQUNyQyxPQUFtQjtRQUhuQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUNyQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBRTdCLDJFQUEyRTtRQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEUsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUU1QixrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUNyQyxVQUFVLEVBQ1YsT0FBTyxFQUNQLENBQUMsQ0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUM1QyxDQUFDO0lBQ04sQ0FBQztJQWhDRCxvQ0FBb0M7SUFDcEMsSUFBVyxLQUFLO1FB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ZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgT25EZXN0cm95LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUG9wdXBDb25maWcsIFBvcHVwVHJpZ2dlciwgSVBvcHVwQ29uZmlnIH0gZnJvbSBcIi4vcG9wdXAtY29uZmlnXCI7XG5pbXBvcnQgeyBTdWlQb3B1cCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BvcHVwXCI7XG5pbXBvcnQgeyBJUG9wdXBMaWZlY3ljbGUgfSBmcm9tIFwiLi9wb3B1cC1saWZlY3ljbGVcIjtcbmltcG9ydCB7IFN1aUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL3NlcnZpY2VzL2NvbXBvbmVudC1mYWN0b3J5LnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUG9wdXAge1xuICAgIG9wZW4oKTp2b2lkO1xuICAgIGNsb3NlKCk6dm9pZDtcbiAgICB0b2dnbGUoKTp2b2lkO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3VpUG9wdXBDb250cm9sbGVyIGltcGxlbWVudHMgSVBvcHVwLCBPbkRlc3Ryb3kge1xuICAgIC8vIFN0b3JlcyByZWZlcmVuY2UgdG8gZ2VuZXJhdGVkIHBvcHVwIGNvbXBvbmVudC5cbiAgICBwcml2YXRlIF9jb21wb25lbnRSZWY6Q29tcG9uZW50UmVmPFN1aVBvcHVwPjtcblxuICAgIC8vIFJldHVybnMgZ2VuZXJhdGVkIHBvcHVwIGluc3RhbmNlLlxuICAgIHB1YmxpYyBnZXQgcG9wdXAoKTpTdWlQb3B1cCB7XG4gICAgICAgIC8vIFVzZSBub24tbnVsbCBhc3NlcnRpb24gYXMgd2Ugb25seSBhY2Nlc3MgdGhpcyB3aGVuIGEgcG9wdXAgZXhpc3RzLlxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8vIGBzZXRUaW1lb3V0YCB0aW1lciBwb2ludGVyIGZvciBkZWxheWVkIHBvcHVwIG9wZW4uXG4gICAgcHJpdmF0ZSBfb3BlbmluZ1RpbWVvdXQ6bnVtYmVyO1xuXG4gICAgLy8gRnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBkb2N1bWVudCBjbGljayBoYW5kbGVyLlxuICAgIHByaXZhdGUgX2RvY3VtZW50TGlzdGVuZXI6KCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgcHJvdGVjdGVkIF9lbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfY29tcG9uZW50RmFjdG9yeTpTdWlDb21wb25lbnRGYWN0b3J5LFxuICAgICAgICBwcm90ZWN0ZWQgX2NvbmZpZzpQb3B1cENvbmZpZ1xuICAgICkge1xuICAgICAgICAvLyBHZW5lcmF0ZSBhIG5ldyBTdWlQb3B1cCBjb21wb25lbnQgYW5kIGF0dGFjaCBpdCB0byB0aGUgYXBwbGljYXRpb24gdmlldy5cbiAgICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeS5jcmVhdGVDb21wb25lbnQoU3VpUG9wdXApO1xuXG4gICAgICAgIC8vIENvbmZpZ3VyZSBwb3B1cCB3aXRoIHByb3ZpZGVkIGNvbmZpZy5cbiAgICAgICAgdGhpcy5wb3B1cC5jb25maWcgPSBfY29uZmlnO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIHBvcHVwIGlzIGNsb3NlZCAob25DbG9zZSBmaXJlcyBvbiBhbmltYXRpb24gY29tcGxldGUpLFxuICAgICAgICB0aGlzLnBvcHVwLm9uQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYW51cCgpKTtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudExpc3RlbmVyID0gX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgIFwiZG9jdW1lbnRcIixcbiAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgIChlOk1vdXNlRXZlbnQpID0+IHRoaXMub25Eb2N1bWVudENsaWNrKGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbmZpZ3VyZShjb25maWc/OklQb3B1cENvbmZpZyk6dm9pZCB7XG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wb3B1cC5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkRlbGF5ZWQoKTp2b2lkIHtcbiAgICAgICAgLy8gQ2FuY2VsIHRoZSBvcGVuaW5nIHRpbWVyLlxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fb3BlbmluZ1RpbWVvdXQpO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBwb3B1cCBvcGVuaW5nIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkgaW50ZXJ2YWwuXG4gICAgICAgIHRoaXMuX29wZW5pbmdUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9wZW4oKSxcbiAgICAgICAgICAgIHRoaXMucG9wdXAuY29uZmlnLmRlbGF5XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW4oKTp2b2lkIHtcbiAgICAgICAgLy8gQXR0YWNoIHRoZSBnZW5lcmF0ZWQgY29tcG9uZW50IHRvIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uLlxuICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmF0dGFjaFRvQXBwbGljYXRpb24odGhpcy5fY29tcG9uZW50UmVmKTtcblxuICAgICAgICAvLyBNb3ZlIHRoZSBnZW5lcmF0ZWQgZWxlbWVudCB0byB0aGUgYm9keSB0byBhdm9pZCBhbnkgcG9zaXRpb25pbmcgaXNzdWVzLlxuICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5Lm1vdmVUb0RvY3VtZW50Qm9keSh0aGlzLl9jb21wb25lbnRSZWYpO1xuXG4gICAgICAgIC8vIEF0dGFjaCBhIHJlZmVyZW5jZSB0byB0aGUgYW5jaG9yIGVsZW1lbnQuIFdlIGRvIGl0IGhlcmUgYmVjYXVzZSBJRTExIGxvdmVzIHRvIGNvbXBsYWluLlxuICAgICAgICB0aGlzLnBvcHVwLmFuY2hvciA9IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICAgICAgLy8gU3RhcnQgcG9wdXAgb3BlbiB0cmFuc2l0aW9uLlxuICAgICAgICB0aGlzLnBvcHVwLm9wZW4oKTtcblxuICAgICAgICAvLyBDYWxsIGxpZmVjeWxlIGhvb2tcbiAgICAgICAgY29uc3QgbGlmZWN5Y2xlID0gKHRoaXMgYXMgSVBvcHVwTGlmZWN5Y2xlKS5wb3B1cE9uT3BlbjtcbiAgICAgICAgaWYgKGxpZmVjeWNsZSkge1xuICAgICAgICAgICAgbGlmZWN5Y2xlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKTp2b2lkIHtcbiAgICAgICAgLy8gQ2FuY2VsIHRoZSBvcGVuaW5nIHRpbWVyIHRvIHN0b3AgdGhlIHBvcHVwIG9wZW5pbmcgYWZ0ZXIgY2xvc2UgaGFzIGJlZW4gY2FsbGVkLlxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fb3BlbmluZ1RpbWVvdXQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIC8vIFN0YXJ0IHBvcHVwIGNsb3NlIHRyYW5zaXRpb24uXG4gICAgICAgICAgICB0aGlzLnBvcHVwLmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsIGxpZmVjeWxlIGhvb2tcbiAgICAgICAgY29uc3QgbGlmZWN5Y2xlID0gKHRoaXMgYXMgSVBvcHVwTGlmZWN5Y2xlKS5wb3B1cE9uQ2xvc2U7XG4gICAgICAgIGlmIChsaWZlY3ljbGUpIHtcbiAgICAgICAgICAgIGxpZmVjeWNsZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZURlbGF5ZWQoKTp2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIHBvcHVwIGhhc24ndCBiZWVuIGNyZWF0ZWQsIG9yIGl0IGhhcyBidXQgaXQgaXNuJ3QgY3VycmVudGx5IG9wZW4sIG9wZW4gdGhlIHBvcHVwLlxuICAgICAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZiB8fCAodGhpcy5fY29tcG9uZW50UmVmICYmICF0aGlzLnBvcHVwLmlzT3BlbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5EZWxheWVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPJ3dpc2UsIGNsb3NlIGl0LlxuICAgICAgICByZXR1cm4gdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGUoKTp2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIHBvcHVwIGhhc24ndCBiZWVuIGNyZWF0ZWQsIG9yIGl0IGhhcyBidXQgaXQgaXNuJ3QgY3VycmVudGx5IG9wZW4sIG9wZW4gdGhlIHBvcHVwLlxuICAgICAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZiB8fCAodGhpcy5fY29tcG9uZW50UmVmICYmICF0aGlzLnBvcHVwLmlzT3BlbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE8nd2lzZSwgY2xvc2UgaXQuXG4gICAgICAgIHJldHVybiB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIilcbiAgICBwcml2YXRlIG9uTW91c2VFbnRlcigpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3B1cC5jb25maWcudHJpZ2dlciA9PT0gUG9wdXBUcmlnZ2VyLkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EZWxheWVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwibW91c2VsZWF2ZVwiKVxuICAgIHByaXZhdGUgb25Nb3VzZUxlYXZlKCk6dm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwLmNvbmZpZy50cmlnZ2VyID09PSBQb3B1cFRyaWdnZXIuSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKVxuICAgIHByaXZhdGUgb25DbGljaygpOnZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnBvcHVwLmNvbmZpZy50cmlnZ2VyID09PSBQb3B1cFRyaWdnZXIuQ2xpY2sgfHxcbiAgICAgICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXIgPT09IFBvcHVwVHJpZ2dlci5PdXRzaWRlQ2xpY2tcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBSZXBlYXRlZCBjbGlja3MgcmVxdWlyZSBhIHRvZ2dsZSwgcmF0aGVyIHRoYW4ganVzdCBvcGVuaW5nIHRoZSBwb3B1cCBlYWNoIHRpbWUuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZURlbGF5ZWQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXIgPT09IFBvcHVwVHJpZ2dlci5Gb2N1cyAmJlxuICAgICAgICAgICAgKCF0aGlzLl9jb21wb25lbnRSZWYgfHwgKHRoaXMuX2NvbXBvbmVudFJlZiAmJiAhdGhpcy5wb3B1cC5pc09wZW4pKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIFJlcGVhdGVkIGNsaWNrcyB3aXRoIGEgZm9jdXMgdHJpZ2dlciByZXF1aXJlcyBhbiBvcGVuIChhcyBmb2N1cyBpc24ndCBldmVyIGxvc3Qgb24gcmVwZWF0ZWQgY2xpY2spLlxuICAgICAgICAgICAgdGhpcy5vcGVuRGVsYXllZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uRG9jdW1lbnRDbGljayhlOk1vdXNlRXZlbnQpOnZvaWQge1xuICAgICAgICAvLyBJZiB0aGUgcG9wdXAgdHJpZ2dlciBpcyBvdXRzaWRlIGNsaWNrLFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYgJiZcbiAgICAgICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXIgPT09IFBvcHVwVHJpZ2dlci5PdXRzaWRlQ2xpY2tcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBFbGVtZW50O1xuICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIHBvcHVwIGlmIHRoZSBjbGljayBpcyBvdXRzaWRlIG9mIHRoZSBwb3B1cCBlbGVtZW50LlxuICAgICAgICAgICAgaWYgKCEodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQpLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiZm9jdXNpblwiKVxuICAgIHB1YmxpYyBvbkZvY3VzSW4oKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXIgPT09IFBvcHVwVHJpZ2dlci5Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5vcGVuRGVsYXllZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIFtcIiRldmVudFwiXSlcbiAgICBwdWJsaWMgb25Gb2N1c091dChlOmFueSk6dm9pZCB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAmJlxuICAgICAgICAgICAgIXRoaXMucG9wdXAuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkgJiZcbiAgICAgICAgICAgIHRoaXMucG9wdXAuY29uZmlnLnRyaWdnZXIgPT09IFBvcHVwVHJpZ2dlci5Gb2N1c1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhbnVwKCk6dm9pZCB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9vcGVuaW5nVGltZW91dCk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlICYmXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UucG9zaXRpb25pbmdTZXJ2aWNlXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlLnBvc2l0aW9uaW5nU2VydmljZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmRldGFjaEZyb21BcHBsaWNhdGlvbih0aGlzLl9jb21wb25lbnRSZWYpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOnZvaWQge1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudExpc3RlbmVyKCk7XG4gICAgfVxufVxuIl19