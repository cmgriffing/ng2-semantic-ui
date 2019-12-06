import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, HostBinding, Renderer2 } from "@angular/core";
let SuiCollapse = class SuiCollapse {
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._pristine = true;
        // Collapse animation duration is 350ms by default.
        this.collapseDuration = 350;
        this.isExpanded = false;
        this.isCollapsing = false;
    }
    // Set when the collapse is closed, and not animating.
    get isCollapsed() {
        return !this.isExpanded && !this.isCollapsing;
    }
    get suiCollapse() {
        return this.isExpanded;
    }
    // Sets the state of the collapse, `true` is collapsed.
    set suiCollapse(value) {
        if (value) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    get _animationDuration() {
        return this._pristine ? 0 : this.collapseDuration;
    }
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        // Forcibly hide the overflow so that content is not visible past the boundaries of its container.
        this._renderer.setStyle(this._element.nativeElement, "overflow", "hidden");
        // Animate the host element from its scroll height to 0.
        this.animate(this._element.nativeElement.scrollHeight, 0, false, () => {
            this.isCollapsing = false;
        });
    }
    show() {
        this.isCollapsing = true;
        // Animate the host element from its offset height to its scroll height.
        this.animate(this._element.nativeElement.offsetHeight, this._element.nativeElement.scrollHeight, true, () => {
            // Remove the overflow override to enable user styling once again.
            this._renderer.removeStyle(this._element.nativeElement, "overflow");
            this.isCollapsing = false;
            this.isExpanded = true;
        });
    }
    animate(startHeight, endHeight, removeOnComplete = false, callback = () => { }) {
        const heightFrames = [
            {
                offset: 0,
                height: `${startHeight}px`
            },
            {
                offset: 1,
                height: `${endHeight}px`
            }
        ];
        if (removeOnComplete) {
            heightFrames.push({
                offset: 1,
                height: `auto`
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
        setTimeout(() => callback(), this.collapseDuration);
    }
};
SuiCollapse.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
export { SuiCollapse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbGxhcHNlL2RpcmVjdGl2ZXMvY29sbGFwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUF1Q3BCLFlBQ1ksUUFBbUIsRUFDbkIsU0FBbUI7UUFEbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBRTNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRTVCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUE3Q0Qsc0RBQXNEO0lBRXRELElBQVcsV0FBVztRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbEQsQ0FBQztJQVVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELHVEQUF1RDtJQUN2RCxJQUFXLFdBQVcsQ0FBQyxLQUFhO1FBQ2hDLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUtELElBQVksa0JBQWtCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENB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WSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aUNvbGxhcHNlXVwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNvbGxhcHNlIHtcbiAgICAvLyBTZXQgd2hlbiB0aGUgY29sbGFwc2UgaXMgb3BlbiwgYW5kIG5vdCBhbmltYXRpbmcuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZXhwYW5kZWRcIilcbiAgICBwdWJsaWMgaXNFeHBhbmRlZDpib29sZWFuO1xuXG4gICAgLy8gU2V0IHdoZW4gdGhlIGNvbGxhcHNlIGlzIGNsb3NlZCwgYW5kIG5vdCBhbmltYXRpbmcuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY29sbGFwc2VkXCIpXG4gICAgcHVibGljIGdldCBpc0NvbGxhcHNlZCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0NvbGxhcHNpbmc7XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoZW4gdGhlIGNvbGxhcHNlIGlzIGFuaW1hdGluZy5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jb2xsYXBzaW5nXCIpXG4gICAgcHVibGljIGlzQ29sbGFwc2luZzpib29sZWFuO1xuXG4gICAgLy8gRmxhZyB0aGF0IGlzIGluaXRpYWxseSB0cnVlLCB0byBtYWtlIHRoZSAxc3QgYW5pbWF0aW9uIGluc3RhbnRhbmVvdXMuXG4gICAgcHJpdmF0ZSBfcHJpc3RpbmU6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBzdWlDb2xsYXBzZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIHN0YXRlIG9mIHRoZSBjb2xsYXBzZSwgYHRydWVgIGlzIGNvbGxhcHNlZC5cbiAgICBwdWJsaWMgc2V0IHN1aUNvbGxhcHNlKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29sbGFwc2VEdXJhdGlvbjpudW1iZXI7XG5cbiAgICBwcml2YXRlIGdldCBfYW5pbWF0aW9uRHVyYXRpb24oKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJpc3RpbmUgPyAwIDogdGhpcy5jb2xsYXBzZUR1cmF0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjpSZW5kZXJlcjJcbiAgICApIHtcbiAgICAgICAgdGhpcy5fcHJpc3RpbmUgPSB0cnVlO1xuXG4gICAgICAgIC8vIENvbGxhcHNlIGFuaW1hdGlvbiBkdXJhdGlvbiBpcyAzNTBtcyBieSBkZWZhdWx0LlxuICAgICAgICB0aGlzLmNvbGxhcHNlRHVyYXRpb24gPSAzNTA7XG5cbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBGb3JjaWJseSBoaWRlIHRoZSBvdmVyZmxvdyBzbyB0aGF0IGNvbnRlbnQgaXMgbm90IHZpc2libGUgcGFzdCB0aGUgYm91bmRhcmllcyBvZiBpdHMgY29udGFpbmVyLlxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIFwib3ZlcmZsb3dcIixcbiAgICAgICAgICAgIFwiaGlkZGVuXCJcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBBbmltYXRlIHRoZSBob3N0IGVsZW1lbnQgZnJvbSBpdHMgc2Nyb2xsIGhlaWdodCB0byAwLlxuICAgICAgICB0aGlzLmFuaW1hdGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCwgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBBbmltYXRlIHRoZSBob3N0IGVsZW1lbnQgZnJvbSBpdHMgb2Zmc2V0IGhlaWdodCB0byBpdHMgc2Nyb2xsIGhlaWdodC5cbiAgICAgICAgdGhpcy5hbmltYXRlKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgb3ZlcmZsb3cgb3ZlcnJpZGUgdG8gZW5hYmxlIHVzZXIgc3R5bGluZyBvbmNlIGFnYWluLlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIFwib3ZlcmZsb3dcIlxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhbmltYXRlKFxuICAgICAgICBzdGFydEhlaWdodDpudW1iZXIsXG4gICAgICAgIGVuZEhlaWdodDpudW1iZXIsXG4gICAgICAgIHJlbW92ZU9uQ29tcGxldGU6Ym9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBjYWxsYmFjazooKSA9PiB2b2lkID0gKCkgPT4ge31cbiAgICApOnZvaWQge1xuICAgICAgICBjb25zdCBoZWlnaHRGcmFtZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke2VuZEhlaWdodH1weGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICBpZiAocmVtb3ZlT25Db21wbGV0ZSkge1xuICAgICAgICAgICAgaGVpZ2h0RnJhbWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGBhdXRvYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbmltYXRlIHRoZSBjb2xsYXBzZSB1c2luZyB0aGUgd2ViIGFuaW1hdGlvbnMgQVBJLlxuICAgICAgICAvLyBVc2luZyBkaXJlY3RseSBiZWNhdXNlIFJlbmRlcmVyMiBkb2Vzbid0IGhhdmUgaW52b2tlRWxlbWVudE1ldGhvZCBtZXRob2QgYW55bW9yZS5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmFuaW1hdGUoaGVpZ2h0RnJhbWVzLCB7XG4gICAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICAgIC8vIERpc2FibGUgYW5pbWF0aW9uIG9uIDFzdCBjb2xsYXBzZSAvIGV4cGFuc2lvbi5cbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLl9hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgIGl0ZXJhdGlvbnM6IDEsXG4gICAgICAgICAgICBlYXNpbmc6IFwiZWFzZVwiLFxuICAgICAgICAgICAgZmlsbDogXCJib3RoXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3ByaXN0aW5lKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgcHJpc3RpbmUgZmxhZyB3aGVuIGZpcnN0IGhpdC5cbiAgICAgICAgICAgIHRoaXMuX3ByaXN0aW5lID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNhbGxiYWNrKCksIHRoaXMuY29sbGFwc2VEdXJhdGlvbik7XG4gICAgfVxufVxuIl19