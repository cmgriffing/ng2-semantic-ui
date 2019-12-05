import * as tslib_1 from "tslib";
import { Component, HostBinding, ContentChild } from "@angular/core";
import { SuiSidebar } from "./sidebar";
import { SuiSidebarSibling } from "./sidebar-sibling";
var SuiSidebarContainer = /** @class */ (function () {
    function SuiSidebarContainer() {
        this.containerClasses = true;
    }
    SuiSidebarContainer.prototype.ngAfterContentInit = function () {
        if (!this.sidebar) {
            throw new Error("You must include a <sui-sidebar> element within the container.");
        }
        this.service = this.sidebar.service;
        if (!this.sibling) {
            throw new Error("You must include a <sui-sidebar-sibling> element within the container.");
        }
        this.sibling.service = this.service;
    };
    tslib_1.__decorate([
        HostBinding("class.pushable")
    ], SuiSidebarContainer.prototype, "containerClasses", void 0);
    tslib_1.__decorate([
        ContentChild(SuiSidebar, { static: true })
    ], SuiSidebarContainer.prototype, "sidebar", void 0);
    tslib_1.__decorate([
        ContentChild(SuiSidebarSibling, { static: true })
    ], SuiSidebarContainer.prototype, "sibling", void 0);
    SuiSidebarContainer = tslib_1.__decorate([
        Component({
            selector: "sui-sidebar-container",
            template: "\n        <ng-content></ng-content>\n    ",
            styles: ["\n            :host {\n                display: block;\n            }\n        "]
        })
    ], SuiSidebarContainer);
    return SuiSidebarContainer;
}());
export { SuiSidebarContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NpZGViYXIvY29tcG9uZW50cy9zaWRlYmFyLWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxXQUFXLEVBQ1gsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFldEQ7SUFZSTtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVNLGdEQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRUFBZ0UsQ0FDbkUsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0VBQXdFLENBQzNFLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQTFCRDtRQURDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztpRUFDRTtJQUdoQztRQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQ2pCO0lBRzFCO1FBREMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3dEQUNqQjtJQVZ4QixtQkFBbUI7UUFiL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsMkNBRVQ7cUJBRUcsaUZBSUM7U0FFUixDQUFDO09BQ1csbUJBQW1CLENBK0IvQjtJQUFELDBCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0EvQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBDb250ZW50Q2hpbGRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNpZGViYXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3NpZGViYXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU3VpU2lkZWJhciB9IGZyb20gXCIuL3NpZGViYXJcIjtcbmltcG9ydCB7IFN1aVNpZGViYXJTaWJsaW5nIH0gZnJvbSBcIi4vc2lkZWJhci1zaWJsaW5nXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1zaWRlYmFyLWNvbnRhaW5lclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIGBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFN1aVNpZGViYXJDb250YWluZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBwdWJsaWMgc2VydmljZTpTaWRlYmFyU2VydmljZTtcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnB1c2hhYmxlXCIpXG4gICAgcHVibGljIGNvbnRhaW5lckNsYXNzZXM6Ym9vbGVhbjtcblxuICAgIEBDb250ZW50Q2hpbGQoU3VpU2lkZWJhciwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwdWJsaWMgc2lkZWJhcjpTdWlTaWRlYmFyO1xuXG4gICAgQENvbnRlbnRDaGlsZChTdWlTaWRlYmFyU2libGluZywgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwdWJsaWMgc2libGluZzpTdWlTaWRlYmFyU2libGluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNsYXNzZXMgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTp2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNpZGViYXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBcIllvdSBtdXN0IGluY2x1ZGUgYSA8c3VpLXNpZGViYXI+IGVsZW1lbnQgd2l0aGluIHRoZSBjb250YWluZXIuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gdGhpcy5zaWRlYmFyLnNlcnZpY2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNpYmxpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBcIllvdSBtdXN0IGluY2x1ZGUgYSA8c3VpLXNpZGViYXItc2libGluZz4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbnRhaW5lci5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpYmxpbmcuc2VydmljZSA9IHRoaXMuc2VydmljZTtcbiAgICB9XG59XG4iXX0=