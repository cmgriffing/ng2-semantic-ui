import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from "@angular/core";
let SuiPopupArrow = class SuiPopupArrow {
    get direction() {
        if (this.placement) {
            return this.placement.split(" ").shift();
        }
    }
    get alignment() {
        if (this.placement) {
            const alignment = this.placement.split(" ").pop();
            if (alignment === this.direction) {
                return "center";
            }
            return alignment;
        }
    }
};
tslib_1.__decorate([
    Input()
], SuiPopupArrow.prototype, "placement", void 0);
tslib_1.__decorate([
    HostBinding("class.inverted"),
    Input()
], SuiPopupArrow.prototype, "inverted", void 0);
SuiPopupArrow = tslib_1.__decorate([
    Component({
        selector: "sui-popup-arrow",
        template: `
        <div
            class="dynamic arrow"
            [attr.direction]="direction"
            *ngIf="alignment == 'center'"
        ></div>
        <div
            class="static arrow"
            [attr.direction]="direction"
            [attr.alignment]="alignment"
            *ngIf="alignment != 'center'"
        ></div>
    `,
        styles: [`
            .arrow {
                position: absolute;
                width: 0.71428571em;
                height: 0.71428571em;
                background: #ffffff;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
                z-index: 2;
            }

            :host.inverted .arrow {
                background: #1b1c1d;
            }

            .arrow[direction="top"] {
                bottom: -0.30714286em;
                box-shadow: 1px 1px 0 0 #bababc;
            }

            .arrow[direction="left"] {
                right: -0.30714286em;
                box-shadow: 1px -1px 1px 0 #bababc;
            }

            .arrow[direction="bottom"] {
                top: -0.30714286em;
                box-shadow: -1px -1px 0 0 #bababc;
            }

            .arrow[direction="right"] {
                left: -0.30714286em;
                box-shadow: -1px 1px 1px 0 #bababc;
            }

            .static.arrow[direction="bottom"][alignment="left"],
            .static.arrow[direction="top"][alignment="left"] {
                left: 1em;
                right: auto;
            }

            .static.arrow[direction="left"][alignment="top"],
            .static.arrow[direction="right"][alignment="top"] {
                top: 1em;
                bottom: auto;
            }

            .static.arrow[direction="bottom"][alignment="right"],
            .static.arrow[direction="top"][alignment="right"] {
                left: auto;
                right: 1em;
            }

            .static.arrow[direction="left"][alignment="bottom"],
            .static.arrow[direction="right"][alignment="bottom"] {
                top: auto;
                bottom: 1em;
            }
        `]
    })
], SuiPopupArrow);
export { SuiPopupArrow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtYXJyb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3BvcHVwL2NvbXBvbmVudHMvcG9wdXAtYXJyb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlGOUQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVF0QixJQUFXLFNBQVM7UUFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsRCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM5QixPQUFPLFFBQVEsQ0FBQzthQUNuQjtZQUNELE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFyQkc7SUFEQyxLQUFLLEVBQUU7Z0RBQzhCO0FBSXRDO0lBRkMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0lBQzdCLEtBQUssRUFBRTsrQ0FDZ0I7QUFOZixhQUFhO0lBOUV6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0tBWVQ7aUJBRUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMkRDO0tBRVIsQ0FBQztHQUNXLGFBQWEsQ0F1QnpCO1NBdkJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1BsYWNlbWVudCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvc2VydmljZXMvcG9zaXRpb25pbmcuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktcG9wdXAtYXJyb3dcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImR5bmFtaWMgYXJyb3dcIlxuICAgICAgICAgICAgW2F0dHIuZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiXG4gICAgICAgICAgICAqbmdJZj1cImFsaWdubWVudCA9PSAnY2VudGVyJ1wiXG4gICAgICAgID48L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJzdGF0aWMgYXJyb3dcIlxuICAgICAgICAgICAgW2F0dHIuZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiXG4gICAgICAgICAgICBbYXR0ci5hbGlnbm1lbnRdPVwiYWxpZ25tZW50XCJcbiAgICAgICAgICAgICpuZ0lmPVwiYWxpZ25tZW50ICE9ICdjZW50ZXInXCJcbiAgICAgICAgPjwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC5hcnJvdyB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAwLjcxNDI4NTcxZW07XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjcxNDI4NTcxZW07XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA6aG9zdC5pbnZlcnRlZCAuYXJyb3cge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxYjFjMWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5hcnJvd1tkaXJlY3Rpb249XCJ0b3BcIl0ge1xuICAgICAgICAgICAgICAgIGJvdHRvbTogLTAuMzA3MTQyODZlbTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAxcHggMXB4IDAgMCAjYmFiYWJjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYXJyb3dbZGlyZWN0aW9uPVwibGVmdFwiXSB7XG4gICAgICAgICAgICAgICAgcmlnaHQ6IC0wLjMwNzE0Mjg2ZW07XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMXB4IC0xcHggMXB4IDAgI2JhYmFiYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmFycm93W2RpcmVjdGlvbj1cImJvdHRvbVwiXSB7XG4gICAgICAgICAgICAgICAgdG9wOiAtMC4zMDcxNDI4NmVtO1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IC0xcHggLTFweCAwIDAgI2JhYmFiYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmFycm93W2RpcmVjdGlvbj1cInJpZ2h0XCJdIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAtMC4zMDcxNDI4NmVtO1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IC0xcHggMXB4IDFweCAwICNiYWJhYmM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwiYm90dG9tXCJdW2FsaWdubWVudD1cImxlZnRcIl0sXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cInRvcFwiXVthbGlnbm1lbnQ9XCJsZWZ0XCJdIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAxZW07XG4gICAgICAgICAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwibGVmdFwiXVthbGlnbm1lbnQ9XCJ0b3BcIl0sXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cInJpZ2h0XCJdW2FsaWdubWVudD1cInRvcFwiXSB7XG4gICAgICAgICAgICAgICAgdG9wOiAxZW07XG4gICAgICAgICAgICAgICAgYm90dG9tOiBhdXRvO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cImJvdHRvbVwiXVthbGlnbm1lbnQ9XCJyaWdodFwiXSxcbiAgICAgICAgICAgIC5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwidG9wXCJdW2FsaWdubWVudD1cInJpZ2h0XCJdIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBhdXRvO1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAxZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwibGVmdFwiXVthbGlnbm1lbnQ9XCJib3R0b21cIl0sXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cInJpZ2h0XCJdW2FsaWdubWVudD1cImJvdHRvbVwiXSB7XG4gICAgICAgICAgICAgICAgdG9wOiBhdXRvO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogMWVtO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlQb3B1cEFycm93IHtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwbGFjZW1lbnQ6UG9zaXRpb25pbmdQbGFjZW1lbnQ7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pbnZlcnRlZFwiKVxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGludmVydGVkOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IGRpcmVjdGlvbigpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxhY2VtZW50LnNwbGl0KFwiIFwiKS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhbGlnbm1lbnQoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsaWdubWVudCA9IHRoaXMucGxhY2VtZW50LnNwbGl0KFwiIFwiKS5wb3AoKTtcbiAgICAgICAgICAgIGlmIChhbGlnbm1lbnQgPT09IHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2VudGVyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWxpZ25tZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19