import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, HostBinding, Renderer2 } from "@angular/core";
var SuiCollapse = /** @class */ (function () {
    function SuiCollapse(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._pristine = true;
        // Collapse animation duration is 350ms by default.
        this.collapseDuration = 350;
        this.isExpanded = false;
        this.isCollapsing = false;
    }
    Object.defineProperty(SuiCollapse.prototype, "isCollapsed", {
        // Set when the collapse is closed, and not animating.
        get: function () {
            return !this.isExpanded && !this.isCollapsing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCollapse.prototype, "suiCollapse", {
        get: function () {
            return this.isExpanded;
        },
        // Sets the state of the collapse, `true` is collapsed.
        set: function (value) {
            if (value) {
                this.hide();
            }
            else {
                this.show();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCollapse.prototype, "_animationDuration", {
        get: function () {
            return this._pristine ? 0 : this.collapseDuration;
        },
        enumerable: true,
        configurable: true
    });
    SuiCollapse.prototype.hide = function () {
        var _this = this;
        this.isCollapsing = true;
        this.isExpanded = false;
        // Forcibly hide the overflow so that content is not visible past the boundaries of its container.
        this._renderer.setStyle(this._element.nativeElement, "overflow", "hidden");
        // Animate the host element from its scroll height to 0.
        this.animate(this._element.nativeElement.scrollHeight, 0, false, function () {
            _this.isCollapsing = false;
        });
    };
    SuiCollapse.prototype.show = function () {
        var _this = this;
        this.isCollapsing = true;
        // Animate the host element from its offset height to its scroll height.
        this.animate(this._element.nativeElement.offsetHeight, this._element.nativeElement.scrollHeight, true, function () {
            // Remove the overflow override to enable user styling once again.
            _this._renderer.removeStyle(_this._element.nativeElement, "overflow");
            _this.isCollapsing = false;
            _this.isExpanded = true;
        });
    };
    SuiCollapse.prototype.animate = function (startHeight, endHeight, removeOnComplete, callback) {
        if (removeOnComplete === void 0) { removeOnComplete = false; }
        if (callback === void 0) { callback = function () { }; }
        var heightFrames = [
            {
                offset: 0,
                height: startHeight + "px"
            },
            {
                offset: 1,
                height: endHeight + "px"
            }
        ];
        if (removeOnComplete) {
            heightFrames.push({
                offset: 1,
                height: "auto"
            });
        }
        // Animate the collapse using the web animations API.
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this._element.nativeElement.animate(heightFrames, {
            delay: 0,
            // Disable animation on 1st collapse / expansion.
            duration: this._animationDuration,
            iterations: 1,
            easing: "ease",
            fill: "both"
        });
        if (this._pristine) {
            // Remove pristine flag when first hit.
            this._pristine = false;
        }
        setTimeout(function () { return callback(); }, this.collapseDuration);
    };
    SuiCollapse.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    tslib_1.__decorate([
        HostBinding("class.expanded")
    ], SuiCollapse.prototype, "isExpanded", void 0);
    tslib_1.__decorate([
        HostBinding("class.collapsed")
    ], SuiCollapse.prototype, "isCollapsed", null);
    tslib_1.__decorate([
        HostBinding("class.collapsing")
    ], SuiCollapse.prototype, "isCollapsing", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiCollapse.prototype, "suiCollapse", null);
    tslib_1.__decorate([
        Input()
    ], SuiCollapse.prototype, "collapseDuration", void 0);
    SuiCollapse = tslib_1.__decorate([
        Directive({
            selector: "[suiCollapse]"
        })
    ], SuiCollapse);
    return SuiCollapse;
}());
export { SuiCollapse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbGxhcHNlL2RpcmVjdGl2ZXMvY29sbGFwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBS3ZCO0lBdUNJLHFCQUNZLFFBQW1CLEVBQ2pCLFNBQW1CO1FBRHJCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUU3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUU1QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBM0NELHNCQUFXLG9DQUFXO1FBRnRCLHNEQUFzRDthQUV0RDtZQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQVVELHNCQUFXLG9DQUFXO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7UUFFRCx1REFBdUQ7YUFDdkQsVUFBdUIsS0FBYTtZQUNoQyxJQUFJLEtBQUssRUFBRTtnQkFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZjtRQUNMLENBQUM7OztPQVRBO0lBY0Qsc0JBQVksMkNBQWtCO2FBQTlCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUks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QUFRLEVBQUUsZUFBZTtTQUM1QixDQUFDO09BQ1csV0FBVyxDQW9JdkI7SUFBRCxrQkFBQztDQUFBLEFBcElELElBb0lDO1NBcElZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3VpQ29sbGFwc2VdXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpQ29sbGFwc2Uge1xuICAgIC8vIFNldCB3aGVuIHRoZSBjb2xsYXBzZSBpcyBvcGVuLCBhbmQgbm90IGFuaW1hdGluZy5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5leHBhbmRlZFwiKVxuICAgIHB1YmxpYyBpc0V4cGFuZGVkOmJvb2xlYW47XG5cbiAgICAvLyBTZXQgd2hlbiB0aGUgY29sbGFwc2UgaXMgY2xvc2VkLCBhbmQgbm90IGFuaW1hdGluZy5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jb2xsYXBzZWRcIilcbiAgICBwdWJsaWMgZ2V0IGlzQ29sbGFwc2VkKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLmlzQ29sbGFwc2luZztcbiAgICB9XG5cbiAgICAvLyBTZXQgd2hlbiB0aGUgY29sbGFwc2UgaXMgYW5pbWF0aW5nLlxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmNvbGxhcHNpbmdcIilcbiAgICBwdWJsaWMgaXNDb2xsYXBzaW5nOmJvb2xlYW47XG5cbiAgICAvLyBGbGFnIHRoYXQgaXMgaW5pdGlhbGx5IHRydWUsIHRvIG1ha2UgdGhlIDFzdCBhbmltYXRpb24gaW5zdGFudGFuZW91cy5cbiAgICBwcml2YXRlIF9wcmlzdGluZTpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHN1aUNvbGxhcHNlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgLy8gU2V0cyB0aGUgc3RhdGUgb2YgdGhlIGNvbGxhcHNlLCBgdHJ1ZWAgaXMgY29sbGFwc2VkLlxuICAgIHB1YmxpYyBzZXQgc3VpQ29sbGFwc2UodmFsdWU6Ym9vbGVhbikge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjb2xsYXBzZUR1cmF0aW9uOm51bWJlcjtcblxuICAgIHByaXZhdGUgZ2V0IF9hbmltYXRpb25EdXJhdGlvbigpOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmlzdGluZSA/IDAgOiB0aGlzLmNvbGxhcHNlRHVyYXRpb247XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX3ByaXN0aW5lID0gdHJ1ZTtcblxuICAgICAgICAvLyBDb2xsYXBzZSBhbmltYXRpb24gZHVyYXRpb24gaXMgMzUwbXMgYnkgZGVmYXVsdC5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUR1cmF0aW9uID0gMzUwO1xuXG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gRm9yY2libHkgaGlkZSB0aGUgb3ZlcmZsb3cgc28gdGhhdCBjb250ZW50IGlzIG5vdCB2aXNpYmxlIHBhc3QgdGhlIGJvdW5kYXJpZXMgb2YgaXRzIGNvbnRhaW5lci5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBcIm92ZXJmbG93XCIsXG4gICAgICAgICAgICBcImhpZGRlblwiXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQW5pbWF0ZSB0aGUgaG9zdCBlbGVtZW50IGZyb20gaXRzIHNjcm9sbCBoZWlnaHQgdG8gMC5cbiAgICAgICAgdGhpcy5hbmltYXRlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdygpOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ29sbGFwc2luZyA9IHRydWU7XG5cbiAgICAgICAgLy8gQW5pbWF0ZSB0aGUgaG9zdCBlbGVtZW50IGZyb20gaXRzIG9mZnNldCBoZWlnaHQgdG8gaXRzIHNjcm9sbCBoZWlnaHQuXG4gICAgICAgIHRoaXMuYW5pbWF0ZShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIG92ZXJmbG93IG92ZXJyaWRlIHRvIGVuYWJsZSB1c2VyIHN0eWxpbmcgb25jZSBhZ2Fpbi5cbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBcIm92ZXJmbG93XCJcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZShcbiAgICAgICAgc3RhcnRIZWlnaHQ6bnVtYmVyLFxuICAgICAgICBlbmRIZWlnaHQ6bnVtYmVyLFxuICAgICAgICByZW1vdmVPbkNvbXBsZXRlOmJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgY2FsbGJhY2s6KCkgPT4gdm9pZCA9ICgpID0+IHt9XG4gICAgKTp2b2lkIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0RnJhbWVzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDEsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtlbmRIZWlnaHR9cHhgXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgaWYgKHJlbW92ZU9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGhlaWdodEZyYW1lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDEsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgYXV0b2BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQW5pbWF0ZSB0aGUgY29sbGFwc2UgdXNpbmcgdGhlIHdlYiBhbmltYXRpb25zIEFQSS5cbiAgICAgICAgLy8gVXNpbmcgZGlyZWN0bHkgYmVjYXVzZSBSZW5kZXJlcjIgZG9lc24ndCBoYXZlIGludm9rZUVsZW1lbnRNZXRob2QgbWV0aG9kIGFueW1vcmUuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5hbmltYXRlKGhlaWdodEZyYW1lcywge1xuICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGFuaW1hdGlvbiBvbiAxc3QgY29sbGFwc2UgLyBleHBhbnNpb24uXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5fYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICBpdGVyYXRpb25zOiAxLFxuICAgICAgICAgICAgZWFzaW5nOiBcImVhc2VcIixcbiAgICAgICAgICAgIGZpbGw6IFwiYm90aFwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmlzdGluZSkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHByaXN0aW5lIGZsYWcgd2hlbiBmaXJzdCBoaXQuXG4gICAgICAgICAgICB0aGlzLl9wcmlzdGluZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYWxsYmFjaygpLCB0aGlzLmNvbGxhcHNlRHVyYXRpb24pO1xuICAgIH1cbn1cbiJdfQ==