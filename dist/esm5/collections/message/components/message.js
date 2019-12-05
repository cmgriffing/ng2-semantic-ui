import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { Transition, TransitionDirection } from "../../../modules/transition/classes/transition";
var SuiMessage = /** @class */ (function () {
    function SuiMessage() {
        this.isDismissable = true;
        this.onDismiss = new EventEmitter();
        this.isDismissed = false;
        this.transitionController = new TransitionController();
        this.transition = "fade";
        this.transitionDuration = 300;
        this.class = "";
    }
    SuiMessage.prototype.dismiss = function () {
        var _this = this;
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, function () {
            _this.isDismissed = true;
            _this.onDismiss.emit(_this);
        }));
    };
    tslib_1.__decorate([
        Input()
    ], SuiMessage.prototype, "isDismissable", void 0);
    tslib_1.__decorate([
        Output("dismiss")
    ], SuiMessage.prototype, "onDismiss", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMessage.prototype, "transition", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiMessage.prototype, "transitionDuration", void 0);
    tslib_1.__decorate([
        Input("class")
    ], SuiMessage.prototype, "class", void 0);
    SuiMessage = tslib_1.__decorate([
        Component({
            selector: "sui-message",
            template: "\n        <div\n            class=\"ui message {{ class }}\"\n            *ngIf=\"!isDismissed\"\n            [suiTransition]=\"transitionController\"\n        >\n            <i class=\"close icon\" *ngIf=\"isDismissable\" (click)=\"dismiss()\"></i>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: ["\n            /* Fix for CSS Bug */\n            .ui.icon.visible.message {\n                display: flex !important;\n            }\n        "]
        })
    ], SuiMessage);
    return SuiMessage;
}());
export { SuiMessage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbImNvbGxlY3Rpb25zL21lc3NhZ2UvY29tcG9uZW50cy9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ2pHLE9BQU8sRUFDSCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ3RCLE1BQU0sZ0RBQWdELENBQUM7QUEyQnhEO0lBb0JJO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBRWhELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztRQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sNEJBQU8sR0FBZDtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FDN0IsSUFBSSxVQUFVLENBQ1YsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsa0JBQWtCLEVBQ3ZCLG1CQUFtQixDQUFDLEdBQUcsRUFDdkI7WUFDSSxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQTNDRDtRQURDLEtBQUssRUFBRTtxREFDcUI7SUFHN0I7UUFEQyxNQUFNLENBQUMsU0FBUyxDQUFDO2lEQUN3QjtJQU8xQztRQURDLEtBQUssRUFBRTtrREFDaUI7SUFHekI7UUFEQyxLQUFLLEVBQUU7MERBQ3lCO0lBR2pDO1FBREMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs2Q0FDSztJQWxCWCxVQUFVO1FBckJ0QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsd1RBU1Q7cUJBRUcsaUpBS0M7U0FFUixDQUFDO09BQ1csVUFBVSxDQThDdEI7SUFBRCxpQkFBQztDQUFBLEFBOUNELElBOENDO1NBOUNZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBUcmFuc2l0aW9uQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7XG4gICAgVHJhbnNpdGlvbixcbiAgICBUcmFuc2l0aW9uRGlyZWN0aW9uXG59IGZyb20gXCIuLi8uLi8uLi9tb2R1bGVzL3RyYW5zaXRpb24vY2xhc3Nlcy90cmFuc2l0aW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2Uge1xuICAgIGRpc21pc3MoKTp2b2lkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktbWVzc2FnZVwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwidWkgbWVzc2FnZSB7eyBjbGFzcyB9fVwiXG4gICAgICAgICAgICAqbmdJZj1cIiFpc0Rpc21pc3NlZFwiXG4gICAgICAgICAgICBbc3VpVHJhbnNpdGlvbl09XCJ0cmFuc2l0aW9uQ29udHJvbGxlclwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiY2xvc2UgaWNvblwiICpuZ0lmPVwiaXNEaXNtaXNzYWJsZVwiIChjbGljayk9XCJkaXNtaXNzKClcIj48L2k+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIC8qIEZpeCBmb3IgQ1NTIEJ1ZyAqL1xuICAgICAgICAgICAgLnVpLmljb24udmlzaWJsZS5tZXNzYWdlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aU1lc3NhZ2UgaW1wbGVtZW50cyBJTWVzc2FnZSB7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNEaXNtaXNzYWJsZTpib29sZWFuO1xuXG4gICAgQE91dHB1dChcImRpc21pc3NcIilcbiAgICBwdWJsaWMgb25EaXNtaXNzOkV2ZW50RW1pdHRlcjxTdWlNZXNzYWdlPjtcblxuICAgIHB1YmxpYyBpc0Rpc21pc3NlZDpib29sZWFuO1xuXG4gICAgcHVibGljIHRyYW5zaXRpb25Db250cm9sbGVyOlRyYW5zaXRpb25Db250cm9sbGVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHJhbnNpdGlvbjpzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFuc2l0aW9uRHVyYXRpb246bnVtYmVyO1xuXG4gICAgQElucHV0KFwiY2xhc3NcIilcbiAgICBwdWJsaWMgY2xhc3M6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXNEaXNtaXNzYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMub25EaXNtaXNzID0gbmV3IEV2ZW50RW1pdHRlcjxTdWlNZXNzYWdlPigpO1xuXG4gICAgICAgIHRoaXMuaXNEaXNtaXNzZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnRyYW5zaXRpb25Db250cm9sbGVyID0gbmV3IFRyYW5zaXRpb25Db250cm9sbGVyKCk7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbiA9IFwiZmFkZVwiO1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25EdXJhdGlvbiA9IDMwMDtcblxuICAgICAgICB0aGlzLmNsYXNzID0gXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzbWlzcygpOnZvaWQge1xuICAgICAgICB0aGlzLnRyYW5zaXRpb25Db250cm9sbGVyLmFuaW1hdGUoXG4gICAgICAgICAgICBuZXcgVHJhbnNpdGlvbihcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb24sXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbkRpcmVjdGlvbi5PdXQsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzRGlzbWlzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRpc21pc3MuZW1pdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19