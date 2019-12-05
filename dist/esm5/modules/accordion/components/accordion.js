import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, ContentChildren } from "@angular/core";
import { SuiAccordionPanel } from "./accordion-panel";
import { SuiAccordionService } from "../services/accordion.service";
var SuiAccordion = /** @class */ (function () {
    function SuiAccordion() {
        // Accordion service is unique to each set of panels.
        this._service = new SuiAccordionService();
        this.accordionClasses = true;
    }
    Object.defineProperty(SuiAccordion.prototype, "closeOthers", {
        get: function () {
            return this._service.closeOthers;
        },
        set: function (value) {
            this._service.closeOthers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordion.prototype, "transition", {
        set: function (transition) {
            this._service.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordion.prototype, "transitionDuration", {
        set: function (duration) {
            this._service.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updatePanels();
        // Reconnect panels after they have updated.
        this._panels.changes.subscribe(function () { return _this.updatePanels(); });
    };
    SuiAccordion.prototype.updatePanels = function () {
        var _this = this;
        this._panels.forEach(function (p) { return _this._service.addPanel(p); });
    };
    tslib_1.__decorate([
        HostBinding("class.ui"),
        HostBinding("class.accordion")
    ], SuiAccordion.prototype, "accordionClasses", void 0);
    tslib_1.__decorate([
        Input()
    ], SuiAccordion.prototype, "closeOthers", null);
    tslib_1.__decorate([
        Input()
    ], SuiAccordion.prototype, "transition", null);
    tslib_1.__decorate([
        Input()
    ], SuiAccordion.prototype, "transitionDuration", null);
    tslib_1.__decorate([
        ContentChildren(SuiAccordionPanel)
    ], SuiAccordion.prototype, "_panels", void 0);
    SuiAccordion = tslib_1.__decorate([
        Component({
            selector: "sui-accordion",
            template: "\n<ng-content></ng-content>\n",
            styles: ["\n/* Fix for general styling issues */\n:host {\n    display: block;\n}\n\n/* Fix for styled border issue */\n:host.styled sui-accordion-panel:first-child .title {\n    border-top: none\n}\n"]
        })
    ], SuiAccordion);
    return SuiAccordion;
}());
export { SuiAccordion };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9hY2NvcmRpb24vY29tcG9uZW50cy9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBbUJwRTtJQTZCSTtRQUNJLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUE1QkQsc0JBQVcscUNBQVc7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3JDLENBQUM7YUFFRCxVQUF1QixLQUFhO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN0QyxDQUFDOzs7T0FKQTtJQU9ELHNCQUFXLG9DQUFVO2FBQXJCLFVBQXNCLFVBQWlCO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFXLDRDQUFrQjthQUE3QixVQUE4QixRQUFlO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBY00seUNBQWtCLEdBQXpCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLG1DQUFZLEdBQW5CO1FBQUEsaUJBRUM7UUFERyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDekQsQ0FBQztJQTFDRDtRQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkIsV0FBVyxDQUFDLGlCQUFpQixDQUFDOzBEQUNDO0lBR2hDO1FBREMsS0FBSyxFQUFFO21EQUdQO0lBT0Q7UUFEQyxLQUFLLEVBQUU7a0RBR1A7SUFHRDtRQURDLEtBQUssRUFBRTswREFHUDtJQUtEO1FBREMsZUFBZSxDQUFDLGlCQUFpQixDQUFDO2lEQUNZO0lBM0J0QyxZQUFZO1FBakJ4QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsK0JBRWI7cUJBQ1ksZ01BVVo7U0FDQSxDQUFDO09BQ1csWUFBWSxDQThDeEI7SUFBRCxtQkFBQztDQUFBLEFBOUNELElBOENDO1NBOUNZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEFmdGVyQ29udGVudEluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpQWNjb3JkaW9uUGFuZWwgfSBmcm9tIFwiLi9hY2NvcmRpb24tcGFuZWxcIjtcbmltcG9ydCB7IFN1aUFjY29yZGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvYWNjb3JkaW9uLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLWFjY29yZGlvblwiLFxuICAgIHRlbXBsYXRlOiBgXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICAgIHN0eWxlczogW2Bcbi8qIEZpeCBmb3IgZ2VuZXJhbCBzdHlsaW5nIGlzc3VlcyAqL1xuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKiBGaXggZm9yIHN0eWxlZCBib3JkZXIgaXNzdWUgKi9cbjpob3N0LnN0eWxlZCBzdWktYWNjb3JkaW9uLXBhbmVsOmZpcnN0LWNoaWxkIC50aXRsZSB7XG4gICAgYm9yZGVyLXRvcDogbm9uZVxufVxuYF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpQWNjb3JkaW9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5hY2NvcmRpb25cIilcbiAgICBwdWJsaWMgYWNjb3JkaW9uQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGNsb3NlT3RoZXJzKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLmNsb3NlT3RoZXJzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgY2xvc2VPdGhlcnModmFsdWU6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmNsb3NlT3RoZXJzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHRyYW5zaXRpb24odHJhbnNpdGlvbjpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbkR1cmF0aW9uKGR1cmF0aW9uOm51bWJlcikge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VydmljZTpTdWlBY2NvcmRpb25TZXJ2aWNlO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlBY2NvcmRpb25QYW5lbClcbiAgICBwcm90ZWN0ZWQgX3BhbmVsczpRdWVyeUxpc3Q8U3VpQWNjb3JkaW9uUGFuZWw+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEFjY29yZGlvbiBzZXJ2aWNlIGlzIHVuaXF1ZSB0byBlYWNoIHNldCBvZiBwYW5lbHMuXG4gICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgU3VpQWNjb3JkaW9uU2VydmljZSgpO1xuXG4gICAgICAgIHRoaXMuYWNjb3JkaW9uQ2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhbmVscygpO1xuXG4gICAgICAgIC8vIFJlY29ubmVjdCBwYW5lbHMgYWZ0ZXIgdGhleSBoYXZlIHVwZGF0ZWQuXG4gICAgICAgIHRoaXMuX3BhbmVscy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVBhbmVscygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlUGFuZWxzKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3BhbmVscy5mb3JFYWNoKHAgPT4gdGhpcy5fc2VydmljZS5hZGRQYW5lbChwKSk7XG4gICAgfVxufVxuIl19