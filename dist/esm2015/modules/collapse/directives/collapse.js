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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbGxhcHNlL2RpcmVjdGl2ZXMvY29sbGFwc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUF1Q3BCLFlBQ1ksUUFBbUIsRUFDakIsU0FBbUI7UUFEckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBRTdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRTVCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUE3Q0Qsc0RBQXNEO0lBRXRELElBQVcsV0FBVztRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbEQsQ0FBQztJQVVELElBQVcsV0FBVztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELHVEQUF1RDtJQUN2RCxJQUFXLFdBQVcsQ0FBQyxLQUFhO1FBQ2hDLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUtELElBQVksa0JBQWtCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENB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WSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3N1aUNvbGxhcHNlXVwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aUNvbGxhcHNlIHtcbiAgICAvLyBTZXQgd2hlbiB0aGUgY29sbGFwc2UgaXMgb3BlbiwgYW5kIG5vdCBhbmltYXRpbmcuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZXhwYW5kZWRcIilcbiAgICBwdWJsaWMgaXNFeHBhbmRlZDpib29sZWFuO1xuXG4gICAgLy8gU2V0IHdoZW4gdGhlIGNvbGxhcHNlIGlzIGNsb3NlZCwgYW5kIG5vdCBhbmltYXRpbmcuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuY29sbGFwc2VkXCIpXG4gICAgcHVibGljIGdldCBpc0NvbGxhcHNlZCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0NvbGxhcHNpbmc7XG4gICAgfVxuXG4gICAgLy8gU2V0IHdoZW4gdGhlIGNvbGxhcHNlIGlzIGFuaW1hdGluZy5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5jb2xsYXBzaW5nXCIpXG4gICAgcHVibGljIGlzQ29sbGFwc2luZzpib29sZWFuO1xuXG4gICAgLy8gRmxhZyB0aGF0IGlzIGluaXRpYWxseSB0cnVlLCB0byBtYWtlIHRoZSAxc3QgYW5pbWF0aW9uIGluc3RhbnRhbmVvdXMuXG4gICAgcHJpdmF0ZSBfcHJpc3RpbmU6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBzdWlDb2xsYXBzZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIC8vIFNldHMgdGhlIHN0YXRlIG9mIHRoZSBjb2xsYXBzZSwgYHRydWVgIGlzIGNvbGxhcHNlZC5cbiAgICBwdWJsaWMgc2V0IHN1aUNvbGxhcHNlKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29sbGFwc2VEdXJhdGlvbjpudW1iZXI7XG5cbiAgICBwcml2YXRlIGdldCBfYW5pbWF0aW9uRHVyYXRpb24oKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJpc3RpbmUgPyAwIDogdGhpcy5jb2xsYXBzZUR1cmF0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmLFxuICAgICAgICBwcm90ZWN0ZWQgX3JlbmRlcmVyOlJlbmRlcmVyMlxuICAgICkge1xuICAgICAgICB0aGlzLl9wcmlzdGluZSA9IHRydWU7XG5cbiAgICAgICAgLy8gQ29sbGFwc2UgYW5pbWF0aW9uIGR1cmF0aW9uIGlzIDM1MG1zIGJ5IGRlZmF1bHQuXG4gICAgICAgIHRoaXMuY29sbGFwc2VEdXJhdGlvbiA9IDM1MDtcblxuICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZSgpOnZvaWQge1xuICAgICAgICB0aGlzLmlzQ29sbGFwc2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEZvcmNpYmx5IGhpZGUgdGhlIG92ZXJmbG93IHNvIHRoYXQgY29udGVudCBpcyBub3QgdmlzaWJsZSBwYXN0IHRoZSBib3VuZGFyaWVzIG9mIGl0cyBjb250YWluZXIuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgXCJvdmVyZmxvd1wiLFxuICAgICAgICAgICAgXCJoaWRkZW5cIlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEFuaW1hdGUgdGhlIGhvc3QgZWxlbWVudCBmcm9tIGl0cyBzY3JvbGwgaGVpZ2h0IHRvIDAuXG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3coKTp2b2lkIHtcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIEFuaW1hdGUgdGhlIGhvc3QgZWxlbWVudCBmcm9tIGl0cyBvZmZzZXQgaGVpZ2h0IHRvIGl0cyBzY3JvbGwgaGVpZ2h0LlxuICAgICAgICB0aGlzLmFuaW1hdGUoXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBvdmVyZmxvdyBvdmVycmlkZSB0byBlbmFibGUgdXNlciBzdHlsaW5nIG9uY2UgYWdhaW4uXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgXCJvdmVyZmxvd1wiXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFuaW1hdGUoXG4gICAgICAgIHN0YXJ0SGVpZ2h0Om51bWJlcixcbiAgICAgICAgZW5kSGVpZ2h0Om51bWJlcixcbiAgICAgICAgcmVtb3ZlT25Db21wbGV0ZTpib29sZWFuID0gZmFsc2UsXG4gICAgICAgIGNhbGxiYWNrOigpID0+IHZvaWQgPSAoKSA9PiB7fVxuICAgICk6dm9pZCB7XG4gICAgICAgIGNvbnN0IGhlaWdodEZyYW1lcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtzdGFydEhlaWdodH1weGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYCR7ZW5kSGVpZ2h0fXB4YFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChyZW1vdmVPbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICBoZWlnaHRGcmFtZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYGF1dG9gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFuaW1hdGUgdGhlIGNvbGxhcHNlIHVzaW5nIHRoZSB3ZWIgYW5pbWF0aW9ucyBBUEkuXG4gICAgICAgIC8vIFVzaW5nIGRpcmVjdGx5IGJlY2F1c2UgUmVuZGVyZXIyIGRvZXNuJ3QgaGF2ZSBpbnZva2VFbGVtZW50TWV0aG9kIG1ldGhvZCBhbnltb3JlLlxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZShoZWlnaHRGcmFtZXMsIHtcbiAgICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgICAgLy8gRGlzYWJsZSBhbmltYXRpb24gb24gMXN0IGNvbGxhcHNlIC8gZXhwYW5zaW9uLlxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuX2FuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAgaXRlcmF0aW9uczogMSxcbiAgICAgICAgICAgIGVhc2luZzogXCJlYXNlXCIsXG4gICAgICAgICAgICBmaWxsOiBcImJvdGhcIlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fcHJpc3RpbmUpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBwcmlzdGluZSBmbGFnIHdoZW4gZmlyc3QgaGl0LlxuICAgICAgICAgICAgdGhpcy5fcHJpc3RpbmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2FsbGJhY2soKSwgdGhpcy5jb2xsYXBzZUR1cmF0aW9uKTtcbiAgICB9XG59XG4iXX0=