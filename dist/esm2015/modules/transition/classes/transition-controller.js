import { TransitionDirection } from "./transition";
export class TransitionController {
    // Used to delay animations until we have an element to animate.
    get _isReady() {
        return (this._renderer != undefined &&
            this._element != undefined &&
            this._changeDetector != undefined);
    }
    get isAnimating() {
        return this._isAnimating;
    }
    get isVisible() {
        return this._isVisible;
    }
    get isHidden() {
        return this._isHidden;
    }
    // Gets the first transition in the queue.
    get _queueFirst() {
        return this._queue[0];
    }
    // Gets the last transition in the queue.
    get _queueLast() {
        return this._queue[this._queue.length - 1];
    }
    constructor(isInitiallyVisible = true, display = "block") {
        // isInitiallyVisible sets whether the element starts out visible.
        this._isVisible = isInitiallyVisible;
        this._isHidden = !this._isVisible;
        this._display = display;
        this._queue = [];
        this._isAnimating = false;
    }
    // Sets the _renderer to be used for animating.
    registerRenderer(renderer) {
        this._renderer = renderer;
        this.performTransition();
    }
    // Sets the element to perform the animations on.
    registerElement(element) {
        this._element = element;
        this.performTransition();
    }
    // Sets the change detector to detect changes when using ChangeDetectionStrategy.OnPush.
    registerChangeDetector(changeDetector) {
        this._changeDetector = changeDetector;
        this.performTransition();
    }
    animate(transition) {
        // Test if transition is one of the list that doesn't change the visible state.
        // Should these eventually become classes?
        const isDirectionless = ["jiggle", "flash", "shake", "pulse", "tada", "bounce"].indexOf(transition.type) !== -1;
        if (isDirectionless) {
            transition.direction = TransitionDirection.Static;
        }
        else if (transition.direction == undefined ||
            transition.direction === TransitionDirection.Either) {
            // Set the direction to the opposite of the current visible state automatically if not set, or set to either direction.
            transition.direction = this._isVisible
                ? TransitionDirection.Out
                : TransitionDirection.In;
            if (this._queueLast) {
                // If there is an transition in the queue already, set the direction to the opposite of the direction of that transition.
                if (this._queueLast.direction === TransitionDirection.In) {
                    transition.direction = TransitionDirection.Out;
                }
                else if (this._queueLast.direction === TransitionDirection.Out) {
                    transition.direction = TransitionDirection.In;
                }
            }
        }
        // Store the transition in the queue before attempting to perform it.
        this._queue.push(transition);
        this.performTransition();
    }
    performTransition() {
        if (!this._isReady || this._isAnimating || !this._queueFirst) {
            // Don't transition until we are ready, or if we are animating, or if there aren't any transitions in the queue.
            return;
        }
        this._isAnimating = true;
        const transition = this._queueFirst;
        // Set the Semantic UI classes for transitioning.
        transition.classes.forEach(c => this._renderer.addClass(this._element, c));
        this._renderer.addClass(this._element, `animating`);
        this._renderer.addClass(this._element, transition.directionClass);
        // Set the Semantic UI styles for transitioning.
        this._renderer.setStyle(this._element, `animationDuration`, `${transition.duration}ms`);
        this._renderer.setStyle(this._element, `display`, this._display);
        if (transition.direction === TransitionDirection.In) {
            // Unset hidden if we are transitioning in.
            this._isHidden = false;
        }
        // Wait the length of the animation before calling the complete callback.
        this._animationTimeout = window.setTimeout(() => this.finishTransition(transition), transition.duration);
    }
    // Called when a transition has completed.
    finishTransition(transition) {
        // Unset the Semantic UI classes & styles for transitioning.
        transition.classes.forEach(c => this._renderer.removeClass(this._element, c));
        this._renderer.removeClass(this._element, `animating`);
        this._renderer.removeClass(this._element, transition.directionClass);
        this._renderer.removeStyle(this._element, `animationDuration`);
        this._renderer.removeStyle(this._element, `display`);
        if (transition.direction === TransitionDirection.In) {
            // If we have just animated in, we are now visible.
            this._isVisible = true;
        }
        else if (transition.direction === TransitionDirection.Out) {
            // If we have transitioned out, we should be invisible and hidden.
            this._isVisible = false;
            this._isHidden = true;
        }
        if (transition.onComplete) {
            // Call the user-defined transition callback.
            transition.onComplete();
        }
        // Delete the transition from the queue.
        this._queue.shift();
        this._isAnimating = false;
        this._changeDetector.markForCheck();
        // Immediately attempt to perform another transition.
        this.performTransition();
    }
    // Stops the current transition, leaves the rest of the queue intact.
    stop(transition = this._queueFirst) {
        if (!transition || !this._isAnimating) {
            return;
        }
        clearTimeout(this._animationTimeout);
        this.finishTransition(transition);
    }
    // Stops the current transition, and empties the queue.
    stopAll() {
        this.clearQueue();
        this.stop();
    }
    // Empties the transition queue but carries on with the current transition.
    clearQueue() {
        if (this.isAnimating) {
            this._queue = [this._queueFirst];
            return;
        }
        this._queue = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBYyxtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvRCxNQUFNLE9BQU8sb0JBQW9CO0lBTzdCLGdFQUFnRTtJQUNoRSxJQUFZLFFBQVE7UUFDaEIsT0FBTyxDQUNILElBQUksQ0FBQyxTQUFTLElBQUksU0FBUztZQUMzQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsSUFBSSxTQUFTLENBQ3BDLENBQUM7SUFDTixDQUFDO0lBVUQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBS0QsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBS0QsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsSUFBWSxXQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQXlDO0lBQ3pDLElBQVksVUFBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUtELFlBQVkscUJBQTZCLElBQUksRUFBRSxVQUFpQixPQUFPO1FBQ25FLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFD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LDJFQUEyRTtJQUNwRSxVQUFVO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uLCBUcmFuc2l0aW9uRGlyZWN0aW9uIH0gZnJvbSBcIi4vdHJhbnNpdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNpdGlvbkNvbnRyb2xsZXIge1xuICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyO1xuXG4gICAgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmO1xuXG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvcjpDaGFuZ2VEZXRlY3RvclJlZjtcblxuICAgIC8vIFVzZWQgdG8gZGVsYXkgYW5pbWF0aW9ucyB1bnRpbCB3ZSBoYXZlIGFuIGVsZW1lbnQgdG8gYW5pbWF0ZS5cbiAgICBwcml2YXRlIGdldCBfaXNSZWFkeSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50ICE9IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IgIT0gdW5kZWZpbmVkXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgJ2Rpc3BsYXknIHN0eWxlIHdoZW4gdmlzaWJsZS5cbiAgICBwcml2YXRlIF9kaXNwbGF5OnN0cmluZztcblxuICAgIC8vIFN0b3JlcyBxdWV1ZWQgdHJhbnNpdGlvbnMuXG4gICAgcHJpdmF0ZSBfcXVldWU6VHJhbnNpdGlvbltdO1xuXG4gICAgcHJpdmF0ZSBfaXNBbmltYXRpbmc6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBnZXQgaXNBbmltYXRpbmcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQW5pbWF0aW5nO1xuICAgIH1cblxuICAgIC8vIFNldCB3aGVuIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIGFuZCB3aGlsZSBpdCBpcyB0cmFuc2l0aW9uaW5nIG91dC5cbiAgICBwcml2YXRlIF9pc1Zpc2libGU6Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Zpc2libGU7XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoZW4gdGhlIGVsZW1lbnQgaXMgaGlkZGVuLCBhbmQgbm90IHdoaWxlIGl0IGlzIHRyYW5zaXRpb25pbmcuXG4gICAgcHJpdmF0ZSBfaXNIaWRkZW46Ym9vbGVhbjtcblxuICAgIHB1YmxpYyBnZXQgaXNIaWRkZW4oKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSGlkZGVuO1xuICAgIH1cblxuICAgIC8vIEdldHMgdGhlIGZpcnN0IHRyYW5zaXRpb24gaW4gdGhlIHF1ZXVlLlxuICAgIHByaXZhdGUgZ2V0IF9xdWV1ZUZpcnN0KCk6VHJhbnNpdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWV1ZVswXTtcbiAgICB9XG5cbiAgICAvLyBHZXRzIHRoZSBsYXN0IHRyYW5zaXRpb24gaW4gdGhlIHF1ZXVlLlxuICAgIHByaXZhdGUgZ2V0IF9xdWV1ZUxhc3QoKTpUcmFuc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlW3RoaXMuX3F1ZXVlLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIC8vIFN0b3JlcyB0aGUgc2V0VGltZW91dCBwb2ludGVyIGZvciBjYW5jZWxsaW5nIHRoZSBhbmltYXRpb24gY2FsbGJhY2suXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uVGltZW91dDpudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihpc0luaXRpYWxseVZpc2libGU6Ym9vbGVhbiA9IHRydWUsIGRpc3BsYXk6c3RyaW5nID0gXCJibG9ja1wiKSB7XG4gICAgICAgIC8vIGlzSW5pdGlhbGx5VmlzaWJsZSBzZXRzIHdoZXRoZXIgdGhlIGVsZW1lbnQgc3RhcnRzIG91dCB2aXNpYmxlLlxuICAgICAgICB0aGlzLl9pc1Zpc2libGUgPSBpc0luaXRpYWxseVZpc2libGU7XG4gICAgICAgIHRoaXMuX2lzSGlkZGVuID0gIXRoaXMuX2lzVmlzaWJsZTtcblxuICAgICAgICB0aGlzLl9kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgICAgdGhpcy5fcXVldWUgPSBbXTtcblxuICAgICAgICB0aGlzLl9pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIF9yZW5kZXJlciB0byBiZSB1c2VkIGZvciBhbmltYXRpbmcuXG4gICAgcHVibGljIHJlZ2lzdGVyUmVuZGVyZXIocmVuZGVyZXI6UmVuZGVyZXIyKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIGVsZW1lbnQgdG8gcGVyZm9ybSB0aGUgYW5pbWF0aW9ucyBvbi5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnQ6RWxlbWVudFJlZik6dm9pZCB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgY2hhbmdlIGRldGVjdG9yIHRvIGRldGVjdCBjaGFuZ2VzIHdoZW4gdXNpbmcgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLlxuICAgIHB1YmxpYyByZWdpc3RlckNoYW5nZURldGVjdG9yKGNoYW5nZURldGVjdG9yOkNoYW5nZURldGVjdG9yUmVmKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IgPSBjaGFuZ2VEZXRlY3RvcjtcbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhbmltYXRlKHRyYW5zaXRpb246VHJhbnNpdGlvbik6dm9pZCB7XG4gICAgICAgIC8vIFRlc3QgaWYgdHJhbnNpdGlvbiBpcyBvbmUgb2YgdGhlIGxpc3QgdGhhdCBkb2Vzbid0IGNoYW5nZSB0aGUgdmlzaWJsZSBzdGF0ZS5cbiAgICAgICAgLy8gU2hvdWxkIHRoZXNlIGV2ZW50dWFsbHkgYmVjb21lIGNsYXNzZXM/XG4gICAgICAgIGNvbnN0IGlzRGlyZWN0aW9ubGVzcyA9XG4gICAgICAgICAgICBbXCJqaWdnbGVcIiwgXCJmbGFzaFwiLCBcInNoYWtlXCIsIFwicHVsc2VcIiwgXCJ0YWRhXCIsIFwiYm91bmNlXCJdLmluZGV4T2YoXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi50eXBlXG4gICAgICAgICAgICApICE9PSAtMTtcbiAgICAgICAgaWYgKGlzRGlyZWN0aW9ubGVzcykge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5kaXJlY3Rpb24gPSBUcmFuc2l0aW9uRGlyZWN0aW9uLlN0YXRpYztcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZGlyZWN0aW9uID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgdHJhbnNpdGlvbi5kaXJlY3Rpb24gPT09IFRyYW5zaXRpb25EaXJlY3Rpb24uRWl0aGVyXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBkaXJlY3Rpb24gdG8gdGhlIG9wcG9zaXRlIG9mIHRoZSBjdXJyZW50IHZpc2libGUgc3RhdGUgYXV0b21hdGljYWxseSBpZiBub3Qgc2V0LCBvciBzZXQgdG8gZWl0aGVyIGRpcmVjdGlvbi5cbiAgICAgICAgICAgIHRyYW5zaXRpb24uZGlyZWN0aW9uID0gdGhpcy5faXNWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBUcmFuc2l0aW9uRGlyZWN0aW9uLk91dFxuICAgICAgICAgICAgICAgIDogVHJhbnNpdGlvbkRpcmVjdGlvbi5JbjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9xdWV1ZUxhc3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiB0cmFuc2l0aW9uIGluIHRoZSBxdWV1ZSBhbHJlYWR5LCBzZXQgdGhlIGRpcmVjdGlvbiB0byB0aGUgb3Bwb3NpdGUgb2YgdGhlIGRpcmVjdGlvbiBvZiB0aGF0IHRyYW5zaXRpb24uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3F1ZXVlTGFzdC5kaXJlY3Rpb24gPT09IFRyYW5zaXRpb25EaXJlY3Rpb24uSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi5kaXJlY3Rpb24gPSBUcmFuc2l0aW9uRGlyZWN0aW9uLk91dDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZUxhc3QuZGlyZWN0aW9uID09PSBUcmFuc2l0aW9uRGlyZWN0aW9uLk91dFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmRpcmVjdGlvbiA9IFRyYW5zaXRpb25EaXJlY3Rpb24uSW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIHRyYW5zaXRpb24gaW4gdGhlIHF1ZXVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHBlcmZvcm0gaXQuXG4gICAgICAgIHRoaXMuX3F1ZXVlLnB1c2godHJhbnNpdGlvbik7XG5cbiAgICAgICAgdGhpcy5wZXJmb3JtVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGVyZm9ybVRyYW5zaXRpb24oKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1JlYWR5IHx8IHRoaXMuX2lzQW5pbWF0aW5nIHx8ICF0aGlzLl9xdWV1ZUZpcnN0KSB7XG4gICAgICAgICAgICAvLyBEb24ndCB0cmFuc2l0aW9uIHVudGlsIHdlIGFyZSByZWFkeSwgb3IgaWYgd2UgYXJlIGFuaW1hdGluZywgb3IgaWYgdGhlcmUgYXJlbid0IGFueSB0cmFuc2l0aW9ucyBpbiB0aGUgcXVldWUuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IHRoaXMuX3F1ZXVlRmlyc3Q7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBTZW1hbnRpYyBVSSBjbGFzc2VzIGZvciB0cmFuc2l0aW9uaW5nLlxuICAgICAgICB0cmFuc2l0aW9uLmNsYXNzZXMuZm9yRWFjaChjID0+XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50LCBjKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50LCBgYW5pbWF0aW5nYCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQsIHRyYW5zaXRpb24uZGlyZWN0aW9uQ2xhc3MpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgU2VtYW50aWMgVUkgc3R5bGVzIGZvciB0cmFuc2l0aW9uaW5nLlxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQsXG4gICAgICAgICAgICBgYW5pbWF0aW9uRHVyYXRpb25gLFxuICAgICAgICAgICAgYCR7dHJhbnNpdGlvbi5kdXJhdGlvbn1tc2BcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudCwgYGRpc3BsYXlgLCB0aGlzLl9kaXNwbGF5KTtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbi5kaXJlY3Rpb24gPT09IFRyYW5zaXRpb25EaXJlY3Rpb24uSW4pIHtcbiAgICAgICAgICAgIC8vIFVuc2V0IGhpZGRlbiBpZiB3ZSBhcmUgdHJhbnNpdGlvbmluZyBpbi5cbiAgICAgICAgICAgIHRoaXMuX2lzSGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXYWl0IHRoZSBsZW5ndGggb2YgdGhlIGFuaW1hdGlvbiBiZWZvcmUgY2FsbGluZyB0aGUgY29tcGxldGUgY2FsbGJhY2suXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgICAgICgpID0+IHRoaXMuZmluaXNoVHJhbnNpdGlvbih0cmFuc2l0aW9uKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZHVyYXRpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBDYWxsZWQgd2hlbiBhIHRyYW5zaXRpb24gaGFzIGNvbXBsZXRlZC5cbiAgICBwcml2YXRlIGZpbmlzaFRyYW5zaXRpb24odHJhbnNpdGlvbjpUcmFuc2l0aW9uKTp2b2lkIHtcbiAgICAgICAgLy8gVW5zZXQgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgJiBzdHlsZXMgZm9yIHRyYW5zaXRpb25pbmcuXG4gICAgICAgIHRyYW5zaXRpb24uY2xhc3Nlcy5mb3JFYWNoKGMgPT5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQsIGMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQsIGBhbmltYXRpbmdgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudCwgdHJhbnNpdGlvbi5kaXJlY3Rpb25DbGFzcyk7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudCwgYGFuaW1hdGlvbkR1cmF0aW9uYCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsZW1lbnQsIGBkaXNwbGF5YCk7XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb24uZGlyZWN0aW9uID09PSBUcmFuc2l0aW9uRGlyZWN0aW9uLkluKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGp1c3QgYW5pbWF0ZWQgaW4sIHdlIGFyZSBub3cgdmlzaWJsZS5cbiAgICAgICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvbi5kaXJlY3Rpb24gPT09IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0KSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHRyYW5zaXRpb25lZCBvdXQsIHdlIHNob3VsZCBiZSBpbnZpc2libGUgYW5kIGhpZGRlbi5cbiAgICAgICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb24ub25Db21wbGV0ZSkge1xuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgdXNlci1kZWZpbmVkIHRyYW5zaXRpb24gY2FsbGJhY2suXG4gICAgICAgICAgICB0cmFuc2l0aW9uLm9uQ29tcGxldGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlbGV0ZSB0aGUgdHJhbnNpdGlvbiBmcm9tIHRoZSBxdWV1ZS5cbiAgICAgICAgdGhpcy5fcXVldWUuc2hpZnQoKTtcbiAgICAgICAgdGhpcy5faXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAvLyBJbW1lZGlhdGVseSBhdHRlbXB0IHRvIHBlcmZvcm0gYW5vdGhlciB0cmFuc2l0aW9uLlxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gU3RvcHMgdGhlIGN1cnJlbnQgdHJhbnNpdGlvbiwgbGVhdmVzIHRoZSByZXN0IG9mIHRoZSBxdWV1ZSBpbnRhY3QuXG4gICAgcHVibGljIHN0b3AodHJhbnNpdGlvbjpUcmFuc2l0aW9uID0gdGhpcy5fcXVldWVGaXJzdCk6dm9pZCB7XG4gICAgICAgIGlmICghdHJhbnNpdGlvbiB8fCAhdGhpcy5faXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hbmltYXRpb25UaW1lb3V0KTtcbiAgICAgICAgdGhpcy5maW5pc2hUcmFuc2l0aW9uKHRyYW5zaXRpb24pO1xuICAgIH1cblxuICAgIC8vIFN0b3BzIHRoZSBjdXJyZW50IHRyYW5zaXRpb24sIGFuZCBlbXB0aWVzIHRoZSBxdWV1ZS5cbiAgICBwdWJsaWMgc3RvcEFsbCgpOnZvaWQge1xuICAgICAgICB0aGlzLmNsZWFyUXVldWUoKTtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuXG4gICAgLy8gRW1wdGllcyB0aGUgdHJhbnNpdGlvbiBxdWV1ZSBidXQgY2FycmllcyBvbiB3aXRoIHRoZSBjdXJyZW50IHRyYW5zaXRpb24uXG4gICAgcHVibGljIGNsZWFyUXVldWUoKTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlID0gW3RoaXMuX3F1ZXVlRmlyc3RdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgfVxufVxuIl19