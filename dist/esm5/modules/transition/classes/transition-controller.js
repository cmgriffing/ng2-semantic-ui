import { TransitionDirection } from "./transition";
var TransitionController = /** @class */ (function () {
    function TransitionController(isInitiallyVisible, display) {
        if (isInitiallyVisible === void 0) { isInitiallyVisible = true; }
        if (display === void 0) { display = "block"; }
        // isInitiallyVisible sets whether the element starts out visible.
        this._isVisible = isInitiallyVisible;
        this._isHidden = !this._isVisible;
        this._display = display;
        this._queue = [];
        this._isAnimating = false;
    }
    Object.defineProperty(TransitionController.prototype, "_isReady", {
        // Used to delay animations until we have an element to animate.
        get: function () {
            return (this._renderer != undefined &&
                this._element != undefined &&
                this._changeDetector != undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "isAnimating", {
        get: function () {
            return this._isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "isHidden", {
        get: function () {
            return this._isHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "_queueFirst", {
        // Gets the first transition in the queue.
        get: function () {
            return this._queue[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "_queueLast", {
        // Gets the last transition in the queue.
        get: function () {
            return this._queue[this._queue.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    // Sets the _renderer to be used for animating.
    TransitionController.prototype.registerRenderer = function (renderer) {
        this._renderer = renderer;
        this.performTransition();
    };
    // Sets the element to perform the animations on.
    TransitionController.prototype.registerElement = function (element) {
        this._element = element;
        this.performTransition();
    };
    // Sets the change detector to detect changes when using ChangeDetectionStrategy.OnPush.
    TransitionController.prototype.registerChangeDetector = function (changeDetector) {
        this._changeDetector = changeDetector;
        this.performTransition();
    };
    TransitionController.prototype.animate = function (transition) {
        // Test if transition is one of the list that doesn't change the visible state.
        // Should these eventually become classes?
        var isDirectionless = ["jiggle", "flash", "shake", "pulse", "tada", "bounce"].indexOf(transition.type) !== -1;
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
    };
    TransitionController.prototype.performTransition = function () {
        var _this = this;
        if (!this._isReady || this._isAnimating || !this._queueFirst) {
            // Don't transition until we are ready, or if we are animating, or if there aren't any transitions in the queue.
            return;
        }
        this._isAnimating = true;
        var transition = this._queueFirst;
        // Set the Semantic UI classes for transitioning.
        transition.classes.forEach(function (c) {
            return _this._renderer.addClass(_this._element, c);
        });
        this._renderer.addClass(this._element, "animating");
        this._renderer.addClass(this._element, transition.directionClass);
        // Set the Semantic UI styles for transitioning.
        this._renderer.setStyle(this._element, "animationDuration", transition.duration + "ms");
        this._renderer.setStyle(this._element, "display", this._display);
        if (transition.direction === TransitionDirection.In) {
            // Unset hidden if we are transitioning in.
            this._isHidden = false;
        }
        // Wait the length of the animation before calling the complete callback.
        this._animationTimeout = window.setTimeout(function () { return _this.finishTransition(transition); }, transition.duration);
    };
    // Called when a transition has completed.
    TransitionController.prototype.finishTransition = function (transition) {
        var _this = this;
        // Unset the Semantic UI classes & styles for transitioning.
        transition.classes.forEach(function (c) {
            return _this._renderer.removeClass(_this._element, c);
        });
        this._renderer.removeClass(this._element, "animating");
        this._renderer.removeClass(this._element, transition.directionClass);
        this._renderer.removeStyle(this._element, "animationDuration");
        this._renderer.removeStyle(this._element, "display");
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
    };
    // Stops the current transition, leaves the rest of the queue intact.
    TransitionController.prototype.stop = function (transition) {
        if (transition === void 0) { transition = this._queueFirst; }
        if (!transition || !this._isAnimating) {
            return;
        }
        clearTimeout(this._animationTimeout);
        this.finishTransition(transition);
    };
    // Stops the current transition, and empties the queue.
    TransitionController.prototype.stopAll = function () {
        this.clearQueue();
        this.stop();
    };
    // Empties the transition queue but carries on with the current transition.
    TransitionController.prototype.clearQueue = function () {
        if (this.isAnimating) {
            this._queue = [this._queueFirst];
            return;
        }
        this._queue = [];
    };
    return TransitionController;
}());
export { TransitionController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy90cmFuc2l0aW9uL2NsYXNzZXMvdHJhbnNpdGlvbi1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBYyxtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvRDtJQXVESSw4QkFBWSxrQkFBaUMsRUFBRSxPQUF3QjtRQUEzRCxtQ0FBQSxFQUFBLHlCQUFpQztRQUFFLHdCQUFBLEVBQUEsaUJBQXdCO1FBQ25FLGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRWxDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUF4REQsc0JBQVksMENBQVE7UUFEcEIsZ0VBQWdFO2FBQ2hFO1lBQ0ksT0FBTyxDQUNILElBQUksQ0FBQyxTQUFTLElBQUksU0FBUztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTO2dCQUMxQixJQUFJLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FDcEMsQ0FBQztRQUNOLENBQUM7OztPQUFBO0lBVUQsc0JBQVcsNkNBQVc7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVywyQ0FBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLDBDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFB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SUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQyxPQUFPO1NBQ1Y7UUFFRCxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx1REFBdUQ7SUFDaEQsc0NBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELDJFQUEyRTtJQUNwRSx5Q0FBVSxHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUF4TkQsSUF3TkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFRyYW5zaXRpb24sIFRyYW5zaXRpb25EaXJlY3Rpb24gfSBmcm9tIFwiLi90cmFuc2l0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBUcmFuc2l0aW9uQ29udHJvbGxlciB7XG4gICAgcHJvdGVjdGVkIF9yZW5kZXJlcjpSZW5kZXJlcjI7XG5cbiAgICBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWY7XG5cbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yOkNoYW5nZURldGVjdG9yUmVmO1xuXG4gICAgLy8gVXNlZCB0byBkZWxheSBhbmltYXRpb25zIHVudGlsIHdlIGhhdmUgYW4gZWxlbWVudCB0byBhbmltYXRlLlxuICAgIHByaXZhdGUgZ2V0IF9pc1JlYWR5KCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlciAhPSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgIT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvciAhPSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHRoZSAnZGlzcGxheScgc3R5bGUgd2hlbiB2aXNpYmxlLlxuICAgIHByaXZhdGUgX2Rpc3BsYXk6c3RyaW5nO1xuXG4gICAgLy8gU3RvcmVzIHF1ZXVlZCB0cmFuc2l0aW9ucy5cbiAgICBwcml2YXRlIF9xdWV1ZTpUcmFuc2l0aW9uW107XG5cbiAgICBwcml2YXRlIF9pc0FuaW1hdGluZzpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBpc0FuaW1hdGluZygpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNBbmltYXRpbmc7XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoZW4gdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSwgYW5kIHdoaWxlIGl0IGlzIHRyYW5zaXRpb25pbmcgb3V0LlxuICAgIHByaXZhdGUgX2lzVmlzaWJsZTpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBpc1Zpc2libGUoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcbiAgICB9XG5cbiAgICAvLyBTZXQgd2hlbiB0aGUgZWxlbWVudCBpcyBoaWRkZW4sIGFuZCBub3Qgd2hpbGUgaXQgaXMgdHJhbnNpdGlvbmluZy5cbiAgICBwcml2YXRlIF9pc0hpZGRlbjpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBpc0hpZGRlbigpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNIaWRkZW47XG4gICAgfVxuXG4gICAgLy8gR2V0cyB0aGUgZmlyc3QgdHJhbnNpdGlvbiBpbiB0aGUgcXVldWUuXG4gICAgcHJpdmF0ZSBnZXQgX3F1ZXVlRmlyc3QoKTpUcmFuc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlWzBdO1xuICAgIH1cblxuICAgIC8vIEdldHMgdGhlIGxhc3QgdHJhbnNpdGlvbiBpbiB0aGUgcXVldWUuXG4gICAgcHJpdmF0ZSBnZXQgX3F1ZXVlTGFzdCgpOlRyYW5zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVldWVbdGhpcy5fcXVldWUubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgLy8gU3RvcmVzIHRoZSBzZXRUaW1lb3V0IHBvaW50ZXIgZm9yIGNhbmNlbGxpbmcgdGhlIGFuaW1hdGlvbiBjYWxsYmFjay5cbiAgICBwcml2YXRlIF9hbmltYXRpb25UaW1lb3V0Om51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGlzSW5pdGlhbGx5VmlzaWJsZTpib29sZWFuID0gdHJ1ZSwgZGlzcGxheTpzdHJpbmcgPSBcImJsb2NrXCIpIHtcbiAgICAgICAgLy8gaXNJbml0aWFsbHlWaXNpYmxlIHNldHMgd2hldGhlciB0aGUgZWxlbWVudCBzdGFydHMgb3V0IHZpc2libGUuXG4gICAgICAgIHRoaXMuX2lzVmlzaWJsZSA9IGlzSW5pdGlhbGx5VmlzaWJsZTtcbiAgICAgICAgdGhpcy5faXNIaWRkZW4gPSAhdGhpcy5faXNWaXNpYmxlO1xuXG4gICAgICAgIHRoaXMuX2Rpc3BsYXkgPSBkaXNwbGF5O1xuICAgICAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgX3JlbmRlcmVyIHRvIGJlIHVzZWQgZm9yIGFuaW1hdGluZy5cbiAgICBwdWJsaWMgcmVnaXN0ZXJSZW5kZXJlcihyZW5kZXJlcjpSZW5kZXJlcjIpOnZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgZWxlbWVudCB0byBwZXJmb3JtIHRoZSBhbmltYXRpb25zIG9uLlxuICAgIHB1YmxpYyByZWdpc3RlckVsZW1lbnQoZWxlbWVudDpFbGVtZW50UmVmKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBTZXRzIHRoZSBjaGFuZ2UgZGV0ZWN0b3IgdG8gZGV0ZWN0IGNoYW5nZXMgd2hlbiB1c2luZyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2guXG4gICAgcHVibGljIHJlZ2lzdGVyQ2hhbmdlRGV0ZWN0b3IoY2hhbmdlRGV0ZWN0b3I6Q2hhbmdlRGV0ZWN0b3JSZWYpOnZvaWQge1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvciA9IGNoYW5nZURldGVjdG9yO1xuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFuaW1hdGUodHJhbnNpdGlvbjpUcmFuc2l0aW9uKTp2b2lkIHtcbiAgICAgICAgLy8gVGVzdCBpZiB0cmFuc2l0aW9uIGlzIG9uZSBvZiB0aGUgbGlzdCB0aGF0IGRvZXNuJ3QgY2hhbmdlIHRoZSB2aXNpYmxlIHN0YXRlLlxuICAgICAgICAvLyBTaG91bGQgdGhlc2UgZXZlbnR1YWxseSBiZWNvbWUgY2xhc3Nlcz9cbiAgICAgICAgY29uc3QgaXNEaXJlY3Rpb25sZXNzID1cbiAgICAgICAgICAgIFtcImppZ2dsZVwiLCBcImZsYXNoXCIsIFwic2hha2VcIiwgXCJwdWxzZVwiLCBcInRhZGFcIiwgXCJib3VuY2VcIl0uaW5kZXhPZihcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLnR5cGVcbiAgICAgICAgICAgICkgIT09IC0xO1xuICAgICAgICBpZiAoaXNEaXJlY3Rpb25sZXNzKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmRpcmVjdGlvbiA9IFRyYW5zaXRpb25EaXJlY3Rpb24uU3RhdGljO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdHJhbnNpdGlvbi5kaXJlY3Rpb24gPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmRpcmVjdGlvbiA9PT0gVHJhbnNpdGlvbkRpcmVjdGlvbi5FaXRoZXJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGRpcmVjdGlvbiB0byB0aGUgb3Bwb3NpdGUgb2YgdGhlIGN1cnJlbnQgdmlzaWJsZSBzdGF0ZSBhdXRvbWF0aWNhbGx5IGlmIG5vdCBzZXQsIG9yIHNldCB0byBlaXRoZXIgZGlyZWN0aW9uLlxuICAgICAgICAgICAgdHJhbnNpdGlvbi5kaXJlY3Rpb24gPSB0aGlzLl9pc1Zpc2libGVcbiAgICAgICAgICAgICAgICA/IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgOiBUcmFuc2l0aW9uRGlyZWN0aW9uLkluO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3F1ZXVlTGFzdCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGFuIHRyYW5zaXRpb24gaW4gdGhlIHF1ZXVlIGFscmVhZHksIHNldCB0aGUgZGlyZWN0aW9uIHRvIHRoZSBvcHBvc2l0ZSBvZiB0aGUgZGlyZWN0aW9uIG9mIHRoYXQgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcXVldWVMYXN0LmRpcmVjdGlvbiA9PT0gVHJhbnNpdGlvbkRpcmVjdGlvbi5Jbikge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmRpcmVjdGlvbiA9IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlTGFzdC5kaXJlY3Rpb24gPT09IFRyYW5zaXRpb25EaXJlY3Rpb24uT3V0XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uZGlyZWN0aW9uID0gVHJhbnNpdGlvbkRpcmVjdGlvbi5JbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9yZSB0aGUgdHJhbnNpdGlvbiBpbiB0aGUgcXVldWUgYmVmb3JlIGF0dGVtcHRpbmcgdG8gcGVyZm9ybSBpdC5cbiAgICAgICAgdGhpcy5fcXVldWUucHVzaCh0cmFuc2l0aW9uKTtcblxuICAgICAgICB0aGlzLnBlcmZvcm1UcmFuc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJmb3JtVHJhbnNpdGlvbigpOnZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUmVhZHkgfHwgdGhpcy5faXNBbmltYXRpbmcgfHwgIXRoaXMuX3F1ZXVlRmlyc3QpIHtcbiAgICAgICAgICAgIC8vIERvbid0IHRyYW5zaXRpb24gdW50aWwgd2UgYXJlIHJlYWR5LCBvciBpZiB3ZSBhcmUgYW5pbWF0aW5nLCBvciBpZiB0aGVyZSBhcmVuJ3QgYW55IHRyYW5zaXRpb25zIGluIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzQW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdGhpcy5fcXVldWVGaXJzdDtcblxuICAgICAgICAvLyBTZXQgdGhlIFNlbWFudGljIFVJIGNsYXNzZXMgZm9yIHRyYW5zaXRpb25pbmcuXG4gICAgICAgIHRyYW5zaXRpb24uY2xhc3Nlcy5mb3JFYWNoKGMgPT5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQsIGMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQsIGBhbmltYXRpbmdgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudCwgdHJhbnNpdGlvbi5kaXJlY3Rpb25DbGFzcyk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBTZW1hbnRpYyBVSSBzdHlsZXMgZm9yIHRyYW5zaXRpb25pbmcuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCxcbiAgICAgICAgICAgIGBhbmltYXRpb25EdXJhdGlvbmAsXG4gICAgICAgICAgICBgJHt0cmFuc2l0aW9uLmR1cmF0aW9ufW1zYFxuICAgICAgICApO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50LCBgZGlzcGxheWAsIHRoaXMuX2Rpc3BsYXkpO1xuXG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmRpcmVjdGlvbiA9PT0gVHJhbnNpdGlvbkRpcmVjdGlvbi5Jbikge1xuICAgICAgICAgICAgLy8gVW5zZXQgaGlkZGVuIGlmIHdlIGFyZSB0cmFuc2l0aW9uaW5nIGluLlxuICAgICAgICAgICAgdGhpcy5faXNIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdhaXQgdGhlIGxlbmd0aCBvZiB0aGUgYW5pbWF0aW9uIGJlZm9yZSBjYWxsaW5nIHRoZSBjb21wbGV0ZSBjYWxsYmFjay5cbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uVGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5maW5pc2hUcmFuc2l0aW9uKHRyYW5zaXRpb24pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbi5kdXJhdGlvblxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIENhbGxlZCB3aGVuIGEgdHJhbnNpdGlvbiBoYXMgY29tcGxldGVkLlxuICAgIHByaXZhdGUgZmluaXNoVHJhbnNpdGlvbih0cmFuc2l0aW9uOlRyYW5zaXRpb24pOnZvaWQge1xuICAgICAgICAvLyBVbnNldCB0aGUgU2VtYW50aWMgVUkgY2xhc3NlcyAmIHN0eWxlcyBmb3IgdHJhbnNpdGlvbmluZy5cbiAgICAgICAgdHJhbnNpdGlvbi5jbGFzc2VzLmZvckVhY2goYyA9PlxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudCwgYylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudCwgYGFuaW1hdGluZ2ApO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50LCB0cmFuc2l0aW9uLmRpcmVjdGlvbkNsYXNzKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50LCBgYW5pbWF0aW9uRHVyYXRpb25gKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudCwgYGRpc3BsYXlgKTtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbi5kaXJlY3Rpb24gPT09IFRyYW5zaXRpb25EaXJlY3Rpb24uSW4pIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUganVzdCBhbmltYXRlZCBpbiwgd2UgYXJlIG5vdyB2aXNpYmxlLlxuICAgICAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uLmRpcmVjdGlvbiA9PT0gVHJhbnNpdGlvbkRpcmVjdGlvbi5PdXQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgdHJhbnNpdGlvbmVkIG91dCwgd2Ugc2hvdWxkIGJlIGludmlzaWJsZSBhbmQgaGlkZGVuLlxuICAgICAgICAgICAgdGhpcy5faXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pc0hpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJhbnNpdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAvLyBDYWxsIHRoZSB1c2VyLWRlZmluZWQgdHJhbnNpdGlvbiBjYWxsYmFjay5cbiAgICAgICAgICAgIHRyYW5zaXRpb24ub25Db21wbGV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVsZXRlIHRoZSB0cmFuc2l0aW9uIGZyb20gdGhlIHF1ZXVlLlxuICAgICAgICB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICB0aGlzLl9pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIC8vIEltbWVkaWF0ZWx5IGF0dGVtcHQgdG8gcGVyZm9ybSBhbm90aGVyIHRyYW5zaXRpb24uXG4gICAgICAgIHRoaXMucGVyZm9ybVRyYW5zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBTdG9wcyB0aGUgY3VycmVudCB0cmFuc2l0aW9uLCBsZWF2ZXMgdGhlIHJlc3Qgb2YgdGhlIHF1ZXVlIGludGFjdC5cbiAgICBwdWJsaWMgc3RvcCh0cmFuc2l0aW9uOlRyYW5zaXRpb24gPSB0aGlzLl9xdWV1ZUZpcnN0KTp2b2lkIHtcbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uIHx8ICF0aGlzLl9pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2FuaW1hdGlvblRpbWVvdXQpO1xuICAgICAgICB0aGlzLmZpbmlzaFRyYW5zaXRpb24odHJhbnNpdGlvbik7XG4gICAgfVxuXG4gICAgLy8gU3RvcHMgdGhlIGN1cnJlbnQgdHJhbnNpdGlvbiwgYW5kIGVtcHRpZXMgdGhlIHF1ZXVlLlxuICAgIHB1YmxpYyBzdG9wQWxsKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuY2xlYXJRdWV1ZSgpO1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG5cbiAgICAvLyBFbXB0aWVzIHRoZSB0cmFuc2l0aW9uIHF1ZXVlIGJ1dCBjYXJyaWVzIG9uIHdpdGggdGhlIGN1cnJlbnQgdHJhbnNpdGlvbi5cbiAgICBwdWJsaWMgY2xlYXJRdWV1ZSgpOnZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgdGhpcy5fcXVldWUgPSBbdGhpcy5fcXVldWVGaXJzdF07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcXVldWUgPSBbXTtcbiAgICB9XG59XG4iXX0=