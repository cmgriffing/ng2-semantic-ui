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
            template: "\n        <div\n            class=\"dynamic arrow\"\n            [attr.direction]=\"direction\"\n            *ngIf=\"alignment == 'center'\"\n        ></div>\n        <div\n            class=\"static arrow\"\n            [attr.direction]=\"direction\"\n            [attr.alignment]=\"alignment\"\n            *ngIf=\"alignment != 'center'\"\n        ></div>\n    ",
            styles: ["\n            .arrow {\n                position: absolute;\n                width: 0.71428571em;\n                height: 0.71428571em;\n                background: #ffffff;\n                -webkit-transform: rotate(45deg);\n                -ms-transform: rotate(45deg);\n                transform: rotate(45deg);\n                z-index: 2;\n            }\n\n            :host.inverted .arrow {\n                background: #1b1c1d;\n            }\n\n            .arrow[direction=\"top\"] {\n                bottom: -0.30714286em;\n                box-shadow: 1px 1px 0 0 #bababc;\n            }\n\n            .arrow[direction=\"left\"] {\n                right: -0.30714286em;\n                box-shadow: 1px -1px 1px 0 #bababc;\n            }\n\n            .arrow[direction=\"bottom\"] {\n                top: -0.30714286em;\n                box-shadow: -1px -1px 0 0 #bababc;\n            }\n\n            .arrow[direction=\"right\"] {\n                left: -0.30714286em;\n                box-shadow: -1px 1px 1px 0 #bababc;\n            }\n\n            .static.arrow[direction=\"bottom\"][alignment=\"left\"],\n            .static.arrow[direction=\"top\"][alignment=\"left\"] {\n                left: 1em;\n                right: auto;\n            }\n\n            .static.arrow[direction=\"left\"][alignment=\"top\"],\n            .static.arrow[direction=\"right\"][alignment=\"top\"] {\n                top: 1em;\n                bottom: auto;\n            }\n\n            .static.arrow[direction=\"bottom\"][alignment=\"right\"],\n            .static.arrow[direction=\"top\"][alignment=\"right\"] {\n                left: auto;\n                right: 1em;\n            }\n\n            .static.arrow[direction=\"left\"][alignment=\"bottom\"],\n            .static.arrow[direction=\"right\"][alignment=\"bottom\"] {\n                top: auto;\n                bottom: 1em;\n            }\n        "]
        })
    ], SuiPopupArrow);
    return SuiPopupArrow;
}());
export { SuiPopupArrow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtYXJyb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3BvcHVwL2NvbXBvbmVudHMvcG9wdXAtYXJyb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlGOUQ7SUFBQTtJQXVCQSxDQUFDO0lBZkcsc0JBQVcsb0NBQVM7YUFBcEI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUM7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG9DQUFTO2FBQXBCO1lBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDOUIsT0FBTyxRQUFRLENBQUM7aUJBQ25CO2dCQUNELE9BQU8sU0FBUyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQzs7O09BQUE7SUFwQkQ7UUFEQyxLQUFLLEVBQUU7b0RBQzhCO0lBSXRDO1FBRkMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQzdCLEtBQUssRUFBRTttREFDZ0I7SUFOZixhQUFhO1FBOUV6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSw2V0FZVDtxQkFFRywrM0RBMkRDO1NBRVIsQ0FBQztPQUNXLGFBQWEsQ0F1QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUG9zaXRpb25pbmdQbGFjZW1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vbWlzYy91dGlsL3NlcnZpY2VzL3Bvc2l0aW9uaW5nLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLXBvcHVwLWFycm93XCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJkeW5hbWljIGFycm93XCJcbiAgICAgICAgICAgIFthdHRyLmRpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgKm5nSWY9XCJhbGlnbm1lbnQgPT0gJ2NlbnRlcidcIlxuICAgICAgICA+PC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwic3RhdGljIGFycm93XCJcbiAgICAgICAgICAgIFthdHRyLmRpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgW2F0dHIuYWxpZ25tZW50XT1cImFsaWdubWVudFwiXG4gICAgICAgICAgICAqbmdJZj1cImFsaWdubWVudCAhPSAnY2VudGVyJ1wiXG4gICAgICAgID48L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICAuYXJyb3cge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICB3aWR0aDogMC43MTQyODU3MWVtO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMC43MTQyODU3MWVtO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgICAgICAgICAgei1pbmRleDogMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgOmhvc3QuaW52ZXJ0ZWQgLmFycm93IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMWIxYzFkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYXJyb3dbZGlyZWN0aW9uPVwidG9wXCJdIHtcbiAgICAgICAgICAgICAgICBib3R0b206IC0wLjMwNzE0Mjg2ZW07XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMXB4IDFweCAwIDAgI2JhYmFiYztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmFycm93W2RpcmVjdGlvbj1cImxlZnRcIl0ge1xuICAgICAgICAgICAgICAgIHJpZ2h0OiAtMC4zMDcxNDI4NmVtO1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IDFweCAtMXB4IDFweCAwICNiYWJhYmM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5hcnJvd1tkaXJlY3Rpb249XCJib3R0b21cIl0ge1xuICAgICAgICAgICAgICAgIHRvcDogLTAuMzA3MTQyODZlbTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAtMXB4IC0xcHggMCAwICNiYWJhYmM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5hcnJvd1tkaXJlY3Rpb249XCJyaWdodFwiXSB7XG4gICAgICAgICAgICAgICAgbGVmdDogLTAuMzA3MTQyODZlbTtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiAtMXB4IDFweCAxcHggMCAjYmFiYWJjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cImJvdHRvbVwiXVthbGlnbm1lbnQ9XCJsZWZ0XCJdLFxuICAgICAgICAgICAgLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJ0b3BcIl1bYWxpZ25tZW50PVwibGVmdFwiXSB7XG4gICAgICAgICAgICAgICAgbGVmdDogMWVtO1xuICAgICAgICAgICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cImxlZnRcIl1bYWxpZ25tZW50PVwidG9wXCJdLFxuICAgICAgICAgICAgLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJyaWdodFwiXVthbGlnbm1lbnQ9XCJ0b3BcIl0ge1xuICAgICAgICAgICAgICAgIHRvcDogMWVtO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogYXV0bztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJib3R0b21cIl1bYWxpZ25tZW50PVwicmlnaHRcIl0sXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cInRvcFwiXVthbGlnbm1lbnQ9XCJyaWdodFwiXSB7XG4gICAgICAgICAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgICAgICAgICByaWdodDogMWVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuc3RhdGljLmFycm93W2RpcmVjdGlvbj1cImxlZnRcIl1bYWxpZ25tZW50PVwiYm90dG9tXCJdLFxuICAgICAgICAgICAgLnN0YXRpYy5hcnJvd1tkaXJlY3Rpb249XCJyaWdodFwiXVthbGlnbm1lbnQ9XCJib3R0b21cIl0ge1xuICAgICAgICAgICAgICAgIHRvcDogYXV0bztcbiAgICAgICAgICAgICAgICBib3R0b206IDFlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpUG9wdXBBcnJvdyB7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGxhY2VtZW50OlBvc2l0aW9uaW5nUGxhY2VtZW50O1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW52ZXJ0ZWRcIilcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBpbnZlcnRlZDpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBkaXJlY3Rpb24oKTpzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYWNlbWVudC5zcGxpdChcIiBcIikuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYWxpZ25tZW50KCk6c3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBhbGlnbm1lbnQgPSB0aGlzLnBsYWNlbWVudC5zcGxpdChcIiBcIikucG9wKCk7XG4gICAgICAgICAgICBpZiAoYWxpZ25tZW50ID09PSB0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNlbnRlclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFsaWdubWVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==