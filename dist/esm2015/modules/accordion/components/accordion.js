import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, ContentChildren } from "@angular/core";
import { SuiAccordionPanel } from "./accordion-panel";
import { SuiAccordionService } from "../services/accordion.service";
let SuiAccordion = class SuiAccordion {
    constructor() {
        // Accordion service is unique to each set of panels.
        this._service = new SuiAccordionService();
        this.accordionClasses = true;
    }
    get closeOthers() {
        return this._service.closeOthers;
    }
    set closeOthers(value) {
        this._service.closeOthers = value;
    }
    set transition(transition) {
        this._service.transition = transition;
    }
    set transitionDuration(duration) {
        this._service.transitionDuration = duration;
    }
    ngAfterContentInit() {
        this.updatePanels();
        // Reconnect panels after they have updated.
        this._panels.changes.subscribe(() => this.updatePanels());
    }
    updatePanels() {
        this._panels.forEach(p => this._service.addPanel(p));
    }
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
        template: `
<ng-content></ng-content>
`,
        styles: [`
/* Fix for general styling issues */
:host {
    display: block;
}

/* Fix for styled border issue */
:host.styled sui-accordion-panel:first-child .title {
    border-top: none
}
`]
    })
], SuiAccordion);
export { SuiAccordion };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9hY2NvcmRpb24vY29tcG9uZW50cy9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBbUJwRSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBNkJyQjtRQUNJLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUE1QkQsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsV0FBVyxDQUFDLEtBQWE7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFHRCxJQUFXLFVBQVUsQ0FBQyxVQUFpQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUdELElBQVcsa0JBQWtCLENBQUMsUUFBZTtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztJQUNoRCxDQUFDO0lBY00sa0JBQWtCO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSixDQUFBO0FBM0NHO0lBRkMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN2QixXQUFXLENBQUMsaUJBQWlCLENBQUM7c0RBQ0M7QUFHaEM7SUFEQyxLQUFLLEVBQUU7K0NBR1A7QUFPRDtJQURDLEtBQUssRUFBRTs4Q0FHUDtBQUdEO0lBREMsS0FBSyxFQUFFO3NEQUdQO0FBS0Q7SUFEQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7NkNBQ1k7QUEzQnRDLFlBQVk7SUFqQnhCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Q0FFYjtpQkFDWTs7Ozs7Ozs7OztDQVVaO0tBQ0EsQ0FBQztHQUNXLFlBQVksQ0E4Q3hCO1NBOUNZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEFmdGVyQ29udGVudEluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpQWNjb3JkaW9uUGFuZWwgfSBmcm9tIFwiLi9hY2NvcmRpb24tcGFuZWxcIjtcbmltcG9ydCB7IFN1aUFjY29yZGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvYWNjb3JkaW9uLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3VpLWFjY29yZGlvblwiLFxuICAgIHRlbXBsYXRlOiBgXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5gLFxuICAgIHN0eWxlczogW2Bcbi8qIEZpeCBmb3IgZ2VuZXJhbCBzdHlsaW5nIGlzc3VlcyAqL1xuOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKiBGaXggZm9yIHN0eWxlZCBib3JkZXIgaXNzdWUgKi9cbjpob3N0LnN0eWxlZCBzdWktYWNjb3JkaW9uLXBhbmVsOmZpcnN0LWNoaWxkIC50aXRsZSB7XG4gICAgYm9yZGVyLXRvcDogbm9uZVxufVxuYF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpQWNjb3JkaW9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5hY2NvcmRpb25cIilcbiAgICBwdWJsaWMgYWNjb3JkaW9uQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGNsb3NlT3RoZXJzKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLmNsb3NlT3RoZXJzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgY2xvc2VPdGhlcnModmFsdWU6Ym9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmNsb3NlT3RoZXJzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHRyYW5zaXRpb24odHJhbnNpdGlvbjpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgdHJhbnNpdGlvbkR1cmF0aW9uKGR1cmF0aW9uOm51bWJlcikge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VydmljZTpTdWlBY2NvcmRpb25TZXJ2aWNlO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlBY2NvcmRpb25QYW5lbClcbiAgICBwcm90ZWN0ZWQgX3BhbmVsczpRdWVyeUxpc3Q8U3VpQWNjb3JkaW9uUGFuZWw+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIEFjY29yZGlvbiBzZXJ2aWNlIGlzIHVuaXF1ZSB0byBlYWNoIHNldCBvZiBwYW5lbHMuXG4gICAgICAgIHRoaXMuX3NlcnZpY2UgPSBuZXcgU3VpQWNjb3JkaW9uU2VydmljZSgpO1xuXG4gICAgICAgIHRoaXMuYWNjb3JkaW9uQ2xhc3NlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhbmVscygpO1xuXG4gICAgICAgIC8vIFJlY29ubmVjdCBwYW5lbHMgYWZ0ZXIgdGhleSBoYXZlIHVwZGF0ZWQuXG4gICAgICAgIHRoaXMuX3BhbmVscy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVBhbmVscygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlUGFuZWxzKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3BhbmVscy5mb3JFYWNoKHAgPT4gdGhpcy5fc2VydmljZS5hZGRQYW5lbChwKSk7XG4gICAgfVxufVxuIl19