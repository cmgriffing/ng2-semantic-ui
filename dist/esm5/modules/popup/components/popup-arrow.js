import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from "@angular/core";
var SuiPopupArrow = /** @class */ (function () {
    function SuiPopupArrow() {
    }
    Object.defineProperty(SuiPopupArrow.prototype, "direction", {
        get: function () {
            if (this.placement) {
                return this.placement.split(" ").shift();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupArrow.prototype, "alignment", {
        get: function () {
            if (this.placement) {
                var alignment = this.placement.split(" ").pop();
                if (alignment === this.direction) {
                    return "center";
                }
                return alignment;
            }
        },
        enumerable: true,
        configurable: true
    });
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
            template: "\n<div class=\"dynamic arrow\" [attr.direction]=\"direction\" *ngIf=\"alignment == 'center'\"></div>\n<div class=\"static arrow\" [attr.direction]=\"direction\" [attr.alignment]=\"alignment\" *ngIf=\"alignment != 'center'\"></div>\n",
            styles: ["\n.arrow {\n    position: absolute;\n    width: 0.71428571em;\n    height: 0.71428571em;\n    background: #ffffff;\n    -webkit-transform: rotate(45deg);\n    -ms-transform: rotate(45deg);\n    transform: rotate(45deg);\n    z-index: 2;\n}\n\n:host.inverted .arrow {\n    background: #1b1c1d;\n}\n\n.arrow[direction=\"top\"] {\n    bottom: -0.30714286em;\n    box-shadow: 1px 1px 0 0 #bababc;\n}\n\n.arrow[direction=\"left\"] {\n    right: -0.30714286em;\n    box-shadow: 1px -1px 1px 0 #bababc;\n}\n\n.arrow[direction=\"bottom\"] {\n    top: -0.30714286em;\n    box-shadow: -1px -1px 0 0 #bababc;\n}\n\n.arrow[direction=\"right\"] {\n    left: -0.30714286em;\n    box-shadow: -1px 1px 1px 0 #bababc;\n}\n\n.static.arrow[direction=\"bottom\"][alignment=\"left\"],\n.static.arrow[direction=\"top\"][alignment=\"left\"] {\n    left: 1em;\n    right: auto;\n}\n\n.static.arrow[direction=\"left\"][alignment=\"top\"],\n.static.arrow[direction=\"right\"][alignment=\"top\"] {\n    top: 1em;\n    bottom: auto;\n}\n\n.static.arrow[direction=\"bottom\"][alignment=\"right\"],\n.static.arrow[direction=\"top\"][alignment=\"right\"] {\n    left: auto;\n    right: 1em;\n}\n\n.static.arrow[direction=\"left\"][alignment=\"bottom\"],\n.static.arrow[direction=\"right\"][alignment=\"bottom\"] {\n    top: auto;\n    bottom: 1em;\n}\n"]
        })
    ], SuiPopupArrow);
    return SuiPopupArrow;
}());
export { SuiPopupArrow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtYXJyb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3BvcHVwL2NvbXBvbmVudHMvcG9wdXAtYXJyb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNFOUQ7SUFBQTtJQXVCQSxDQUFDO0lBZkcsc0JBQVcsb0NBQVM7YUFBcEI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG9DQUFTO2FBQXBCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDOUIsT0FBTyxRQUFRLENBQUM7aUJBQ25CO2dCQUNELE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQzs7O09BQUE7SUFwQkQ7UUFEQyxLQUFLLEVBQUU7b0RBQzhCO0lBSXRDO1FBRkMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQzdCLEtBQUssRUFBRTttREFDZ0I7SUFOZixhQUFhO1FBbkV6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSwwT0FHYjtxQkFDWSwyeUNBMkRaO1NBQ0EsQ0FBQztPQUNXLGFBQWEsQ0F1QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUG9zaXRpb25pbmdQbGFjZW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL2luZGV4XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1wb3B1cC1hcnJvd1wiLFxuICAgIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwiZHluYW1pYyBhcnJvd1wiIFthdHRyLmRpcmVjdGlvbl09XCJkaXJlY3Rpb25cIiAqbmdJZj1cImFsaWdubWVudCA9PSAnY2VudGVyJ1wiPjwvZGl2PlxuPGRpdiBjbGFzcz1cInN0YXRpYyBhcnJvd1wiIFthdHRyLmRpcmVjdGlvbl09XCJkaXJlY3Rpb25cIiBbYXR0ci5hbGlnbm1lbnRdPVwiYWxpZ25tZW50XCIgKm5nSWY9XCJhbGlnbm1lbnQgIT0gJ2NlbnRlcidcIj48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYFxuLmFycm93IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDAuNzE0Mjg1NzFlbTtcbiAgICBoZWlnaHQ6IDAuNzE0Mjg1NzFlbTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgIHotaW5kZXg6IDI7XG59XG5cbjpob3N0LmludmVydGVkIC5hcnJvdyB7XG4gICAgYmFja2dyb3VuZDogIzFiMWMxZDtcbn1cblxuLmFycm93W2RpcmVjdGlvbj1cInRvcFwiXSB7XG4gICAgYm90dG9tOiAtMC4zMDcxNDI4NmVtO1xuICAgIGJveC1zaGFkb3c6IDFweCAxcHggMCAwICNiYWJhYmM7XG59XG5cbi5hcnJvd1tkaXJlY3Rpb249XCJsZWZ0XCJdIHtcbiAgICByaWdodDogLTAuMzA3MTQyODZlbTtcbiAgICBib3gtc2hhZG93OiAxcHggLTFweCAxcHggMCAjYmFiYWJjO1xufVxuXG4uYXJyb3dbZGlyZWN0aW9uPVwiYm90dG9tXCJdIHtcbiAgICB0b3A6IC0wLjMwNzE0Mjg2ZW07XG4gICAgYm94LXNoYWRvdzogLTFweCAtMXB4IDAgMCAjYmFiYWJjO1xufVxuXG4uYXJyb3dbZGlyZWN0aW9uPVwicmlnaHRcIl0ge1xuICAgIGxlZnQ6IC0wLjMwNzE0Mjg2ZW07XG4gICAgYm94LXNoYWRvdzogLTFweCAxcHggMXB4IDAgI2JhYmFiYztcbn1cblxuLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJib3R0b21cIl1bYWxpZ25tZW50PVwibGVmdFwiXSxcbi5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwidG9wXCJdW2FsaWdubWVudD1cImxlZnRcIl0ge1xuICAgIGxlZnQ6IDFlbTtcbiAgICByaWdodDogYXV0bztcbn1cblxuLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJsZWZ0XCJdW2FsaWdubWVudD1cInRvcFwiXSxcbi5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwicmlnaHRcIl1bYWxpZ25tZW50PVwidG9wXCJdIHtcbiAgICB0b3A6IDFlbTtcbiAgICBib3R0b206IGF1dG87XG59XG5cbi5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwiYm90dG9tXCJdW2FsaWdubWVudD1cInJpZ2h0XCJdLFxuLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJ0b3BcIl1bYWxpZ25tZW50PVwicmlnaHRcIl0ge1xuICAgIGxlZnQ6IGF1dG87XG4gICAgcmlnaHQ6IDFlbTtcbn1cblxuLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJsZWZ0XCJdW2FsaWdubWVudD1cImJvdHRvbVwiXSxcbi5zdGF0aWMuYXJyb3dbZGlyZWN0aW9uPVwicmlnaHRcIl1bYWxpZ25tZW50PVwiYm90dG9tXCJdIHtcbiAgICB0b3A6IGF1dG87XG4gICAgYm90dG9tOiAxZW07XG59XG5gXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlQb3B1cEFycm93IHtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwbGFjZW1lbnQ6UG9zaXRpb25pbmdQbGFjZW1lbnQ7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pbnZlcnRlZFwiKVxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGludmVydGVkOmJvb2xlYW47XG5cbiAgICBwdWJsaWMgZ2V0IGRpcmVjdGlvbigpOnN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxhY2VtZW50LnNwbGl0KFwiIFwiKS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhbGlnbm1lbnQoKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGFsaWdubWVudCA9IHRoaXMucGxhY2VtZW50LnNwbGl0KFwiIFwiKS5wb3AoKTtcbiAgICAgICAgICAgIGlmIChhbGlnbm1lbnQgPT09IHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY2VudGVyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWxpZ25tZW50O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19