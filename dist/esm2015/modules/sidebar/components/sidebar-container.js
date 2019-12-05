import * as tslib_1 from "tslib";
import { Component, HostBinding, ContentChild } from "@angular/core";
import { SuiSidebar } from "./sidebar";
import { SuiSidebarSibling } from "./sidebar-sibling";
let SuiSidebarContainer = class SuiSidebarContainer {
    constructor() {
        this.containerClasses = true;
    }
    ngAfterContentInit() {
        if (!this.sidebar) {
            throw new Error("You must include a <sui-sidebar> element within the container.");
        }
        this.service = this.sidebar.service;
        if (!this.sibling) {
            throw new Error("You must include a <sui-sidebar-sibling> element within the container.");
        }
        this.sibling.service = this.service;
    }
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
        template: `
        <ng-content></ng-content>
    `,
        styles: [`
            :host {
                display: block;
            }
        `]
    })
], SuiSidebarContainer);
export { SuiSidebarContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3NpZGViYXIvY29tcG9uZW50cy9zaWRlYmFyLWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFFVCxXQUFXLEVBQ1gsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFldEQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFZNUI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxrQkFBa0I7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUNYLGdFQUFnRSxDQUNuRSxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRXBDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCx3RUFBd0UsQ0FDM0UsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0NBQ0osQ0FBQTtBQTNCRztJQURDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs2REFDRTtBQUdoQztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7b0RBQ2pCO0FBRzFCO0lBREMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO29EQUNqQjtBQVZ4QixtQkFBbUI7SUFiL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxRQUFRLEVBQUU7O0tBRVQ7aUJBRUc7Ozs7U0FJQztLQUVSLENBQUM7R0FDVyxtQkFBbUIsQ0ErQi9CO1NBL0JZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgQ29udGVudENoaWxkXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTaWRlYmFyU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9zaWRlYmFyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN1aVNpZGViYXIgfSBmcm9tIFwiLi9zaWRlYmFyXCI7XG5pbXBvcnQgeyBTdWlTaWRlYmFyU2libGluZyB9IGZyb20gXCIuL3NpZGViYXItc2libGluZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktc2lkZWJhci1jb250YWluZXJcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYFxuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlTaWRlYmFyQ29udGFpbmVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgcHVibGljIHNlcnZpY2U6U2lkZWJhclNlcnZpY2U7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5wdXNoYWJsZVwiKVxuICAgIHB1YmxpYyBjb250YWluZXJDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBAQ29udGVudENoaWxkKFN1aVNpZGViYXIsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIHNpZGViYXI6U3VpU2lkZWJhcjtcblxuICAgIEBDb250ZW50Q2hpbGQoU3VpU2lkZWJhclNpYmxpbmcsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHVibGljIHNpYmxpbmc6U3VpU2lkZWJhclNpYmxpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zaWRlYmFyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJZb3UgbXVzdCBpbmNsdWRlIGEgPHN1aS1zaWRlYmFyPiBlbGVtZW50IHdpdGhpbiB0aGUgY29udGFpbmVyLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMuc2lkZWJhci5zZXJ2aWNlO1xuXG4gICAgICAgIGlmICghdGhpcy5zaWJsaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJZb3UgbXVzdCBpbmNsdWRlIGEgPHN1aS1zaWRlYmFyLXNpYmxpbmc+IGVsZW1lbnQgd2l0aGluIHRoZSBjb250YWluZXIuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaWJsaW5nLnNlcnZpY2UgPSB0aGlzLnNlcnZpY2U7XG4gICAgfVxufVxuIl19