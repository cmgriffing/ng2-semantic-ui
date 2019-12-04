import {
    Component,
    AfterContentInit,
    HostBinding,
    ContentChild
} from "@angular/core";
import { SidebarService } from "../services/sidebar.service";
import { SuiSidebar } from "./sidebar";
import { SuiSidebarSibling } from "./sidebar-sibling";

@Component({
    selector: "sui-sidebar-container",
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
            :host {
                display: block;
            }
        `
    ]
})
export class SuiSidebarContainer implements AfterContentInit {
    public service:SidebarService;

    @HostBinding("class.pushable")
    public containerClasses:boolean;

    @ContentChild(SuiSidebar, { static: true })
    public sidebar:SuiSidebar;

    @ContentChild(SuiSidebarSibling, { static: true })
    public sibling:SuiSidebarSibling;

    constructor() {
        this.containerClasses = true;
    }

    public ngAfterContentInit():void {
        if (!this.sidebar) {
            throw new Error(
                "You must include a <sui-sidebar> element within the container."
            );
        }
        this.service = this.sidebar.service;

        if (!this.sibling) {
            throw new Error(
                "You must include a <sui-sidebar-sibling> element within the container."
            );
        }
        this.sibling.service = this.service;
    }
}
