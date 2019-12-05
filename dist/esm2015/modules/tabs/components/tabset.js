import * as tslib_1 from "tslib";
import { Component, ContentChildren } from "@angular/core";
import { SuiTabHeader } from "../directives/tab-header";
import { SuiTabContent } from "../directives/tab-content";
import { Tab } from "../classes/tab";
let SuiTabset = class SuiTabset {
    constructor() {
        this.tabs = [];
        this._barrierCount = 0;
    }
    get activeTab() {
        return this._activeTab;
    }
    // When setting a tab as the currently active tab, it automatically gains
    // `isActive` status (saves littering `isActive = true` everywhere).
    set activeTab(tab) {
        this._activeTab = tab;
        tab.isActive = true;
    }
    ngAfterContentInit() {
        // Fire `internalComponentsUpdated` when the query lists change.
        this._tabHeaders.changes.subscribe(() => this.internalComponentsUpdated());
        this._tabContents.changes.subscribe(() => this.internalComponentsUpdated());
        // Initially load the tabs.
        this.loadTabs();
    }
    // Fires whenever either the tab headers or tab contents query lists update.
    internalComponentsUpdated() {
        // We are using a 'counting barrier of n = 2', i.e. the code within only runs after the method is called twice.
        // This is so that both the headers and contents query lists can update before we run code that matches the two up.
        this._barrierCount++;
        if (this._barrierCount === 2) {
            // Reset the barrier so it can be called again.
            this._barrierCount = 0;
            // Update the tabs.
            this.loadTabs();
        }
    }
    // Connects tab headers to tab contents, and creates a tab instance for each pairing.
    loadTabs() {
        // Remove any tabs that no longer have an associated header.
        this.tabs = this.tabs.filter(t => !!this._tabHeaders.find(tH => tH === t.header));
        this._tabHeaders
            // Filter out the loaded headers with attached tab instances.
            .filter(tH => !this.tabs.find(t => t.header === tH))
            .forEach(tH => {
            const content = this._tabContents.find(tC => tC.id === tH.id);
            if (!content) {
                // Error if an associated tab content cannot be found for the given header.
                throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
            }
            // Create a new tab instance for this header & content combo.
            const tab = new Tab(tH, content);
            // Subscribe to any external changes in the tab header's active state. External changes are triggered by user input.
            tab.header.isActiveExternalChange.subscribe(() => this.onHeaderActiveChanged(tab));
            // Add the new instance to the list of tabs.
            this.tabs.push(tab);
        });
        // Assign each tab an index (which denotes the order they physically appear in).
        this._tabHeaders
            .forEach((tH, i) => {
            const tab = this.tabs.find(t => t.header === tH);
            if (tab) {
                tab.index = i;
            }
        });
        // Sort the tabs by their index.
        this.tabs.sort((a, b) => a.index - b.index);
        if (!this.activeTab) { // Check if there are no current existing active tabs.
            // If so, we must activate the first available tab.
            this.activateFirstTab();
        }
        else if (!this.tabs.find(t => t === this.activeTab)) { // O'wise check if current active tab has been deleted.
            // If so, we must find the closest.
            // Use `setTimeout` as this causes a 'changed after checked' error o'wise.
            setTimeout(() => this.activateClosestTab(this.activeTab));
        }
        if (this.tabs.length === 0) {
            // Error if there aren't any tabs in the tabset.
            throw new Error("You cannot have no tabs!");
        }
    }
    // Fires whenever a tab header's active state is externally changed.
    onHeaderActiveChanged(tab) {
        // If the tab has become activated, but was not previously the active tab:
        if (tab.isActive && this.activeTab !== tab) {
            // Deactivate all of the tabs.
            this.tabs.filter(t => t !== tab).forEach(t => t.isActive = false);
            // Set the currently active tab to this one.
            this.activeTab = tab;
        }
        // If the tab has become deactivated, but was previously the active tab:
        if (!tab.isActive && this.activeTab === tab) {
            // Activate the closest tab to it.
            this.activateClosestTab(tab);
        }
    }
    // Activate the first tab in the set.
    activateFirstTab() {
        this.activeTab = this.tabs[0];
    }
    // Activates the closest available tab to a given one.
    activateClosestTab(tab) {
        let nextAvailable;
        // When the exited tab's index is higher than all available tabs,
        if (tab.index >= this.tabs.length) {
            // Activate the last tab.
            nextAvailable = this.tabs[this.tabs.length - 1];
        }
        // If that didn't work, try the following cases:
        if (!nextAvailable) {
            if (!this.tabs.find(t => t === tab)) { // When the exited tab no longer exists,
                // Replace it with a tab at the same index.
                nextAvailable = this.tabs[tab.index];
            }
            else { // Or if the exited tab still exists,
                // Go to the tab immediately to the left.
                nextAvailable = this.tabs[Math.max(tab.index - 1, 0)];
            }
        }
        // However, if the chosen tab is disabled,
        if (nextAvailable.isDisabled) {
            // Activate the closest available tab to it.
            return this.activateClosestTab(nextAvailable);
        }
        this.activeTab = nextAvailable;
    }
};
tslib_1.__decorate([
    ContentChildren(SuiTabHeader)
], SuiTabset.prototype, "_tabHeaders", void 0);
tslib_1.__decorate([
    ContentChildren(SuiTabContent)
], SuiTabset.prototype, "_tabContents", void 0);
SuiTabset = tslib_1.__decorate([
    Component({
        selector: "sui-tabset",
        template: `<ng-content></ng-content>`
    })
], SuiTabset);
export { SuiTabset };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy90YWJzL2NvbXBvbmVudHMvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckMsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQTJCbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFqQkQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQseUVBQXlFO0lBQ3pFLG9FQUFvRTtJQUNwRSxJQUFXLFNBQVMsQ0FBQyxHQUFPO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFVTSxrQkFBa0I7UUFDckIsZ0VBQWdFO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1FBRTVFLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJ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Q0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNuRDtRQUVELGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFLHdDQUF3QztnQkFDM0UsMkNBQTJDO2dCQUMzQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEM7aUJBQU0sRUFBRSxxQ0FBcUM7Z0JBQzFDLHlDQUF5QztnQkFDekMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0o7UUFFRCwwQ0FBMEM7UUFDMUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQzFCLDRDQUE0QztZQUM1QyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ25DLENBQUM7Q0FDSixDQUFBO0FBaEtHO0lBREMsZUFBZSxDQUFDLFlBQVksQ0FBQzs4Q0FDYztBQUc1QztJQURDLGVBQWUsQ0FBQyxhQUFhLENBQUM7K0NBQ2U7QUFMckMsU0FBUztJQUpyQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7R0FDVyxTQUFTLENBa0tyQjtTQWxLWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQWZ0ZXJDb250ZW50SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWlUYWJIZWFkZXIgfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy90YWItaGVhZGVyXCI7XG5pbXBvcnQgeyBTdWlUYWJDb250ZW50IH0gZnJvbSBcIi4uL2RpcmVjdGl2ZXMvdGFiLWNvbnRlbnRcIjtcbmltcG9ydCB7IFRhYiB9IGZyb20gXCIuLi9jbGFzc2VzL3RhYlwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktdGFic2V0XCIsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBTdWlUYWJzZXQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBAQ29udGVudENoaWxkcmVuKFN1aVRhYkhlYWRlcilcbiAgICBwcml2YXRlIF90YWJIZWFkZXJzOlF1ZXJ5TGlzdDxTdWlUYWJIZWFkZXI+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlUYWJDb250ZW50KVxuICAgIHByaXZhdGUgX3RhYkNvbnRlbnRzOlF1ZXJ5TGlzdDxTdWlUYWJDb250ZW50PjtcblxuICAgIC8vIExpc3Qgb2YgYWxsIHRhYnMgaW4gdGhlIHRhYnNldC5cbiAgICBwdWJsaWMgdGFiczpUYWJbXTtcblxuICAgIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYi5cbiAgICBwcml2YXRlIF9hY3RpdmVUYWI6VGFiO1xuXG4gICAgcHVibGljIGdldCBhY3RpdmVUYWIoKTpUYWIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xuICAgIH1cblxuICAgIC8vIFdoZW4gc2V0dGluZyBhIHRhYiBhcyB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWIsIGl0IGF1dG9tYXRpY2FsbHkgZ2FpbnNcbiAgICAvLyBgaXNBY3RpdmVgIHN0YXR1cyAoc2F2ZXMgbGl0dGVyaW5nIGBpc0FjdGl2ZSA9IHRydWVgIGV2ZXJ5d2hlcmUpLlxuICAgIHB1YmxpYyBzZXQgYWN0aXZlVGFiKHRhYjpUYWIpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFiID0gdGFiO1xuICAgICAgICB0YWIuaXNBY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBudW1iZXIgb2YgdGltZXMgYGludGVybmFsQ29tcG9uZW50c1VwZGF0ZWRgIGlzIGNhbGxlZC5cbiAgICBwcml2YXRlIF9iYXJyaWVyQ291bnQ6bnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudGFicyA9IFtdO1xuICAgICAgICB0aGlzLl9iYXJyaWVyQ291bnQgPSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTp2b2lkIHtcbiAgICAgICAgLy8gRmlyZSBgaW50ZXJuYWxDb21wb25lbnRzVXBkYXRlZGAgd2hlbiB0aGUgcXVlcnkgbGlzdHMgY2hhbmdlLlxuICAgICAgICB0aGlzLl90YWJIZWFkZXJzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuaW50ZXJuYWxDb21wb25lbnRzVXBkYXRlZCgpKTtcbiAgICAgICAgdGhpcy5fdGFiQ29udGVudHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbnRlcm5hbENvbXBvbmVudHNVcGRhdGVkKCkpO1xuXG4gICAgICAgIC8vIEluaXRpYWxseSBsb2FkIHRoZSB0YWJzLlxuICAgICAgICB0aGlzLmxvYWRUYWJzKCk7XG4gICAgfVxuXG4gICAgLy8gRmlyZXMgd2hlbmV2ZXIgZWl0aGVyIHRoZSB0YWIgaGVhZGVycyBvciB0YWIgY29udGVudHMgcXVlcnkgbGlzdHMgdXBkYXRlLlxuICAgIHByaXZhdGUgaW50ZXJuYWxDb21wb25lbnRzVXBkYXRlZCgpOnZvaWQge1xuICAgICAgICAvLyBXZSBhcmUgdXNpbmcgYSAnY291bnRpbmcgYmFycmllciBvZiBuID0gMicsIGkuZS4gdGhlIGNvZGUgd2l0aGluIG9ubHkgcnVucyBhZnRlciB0aGUgbWV0aG9kIGlzIGNhbGxlZCB0d2ljZS5cbiAgICAgICAgLy8gVGhpcyBpcyBzbyB0aGF0IGJvdGggdGhlIGhlYWRlcnMgYW5kIGNvbnRlbnRzIHF1ZXJ5IGxpc3RzIGNhbiB1cGRhdGUgYmVmb3JlIHdlIHJ1biBjb2RlIHRoYXQgbWF0Y2hlcyB0aGUgdHdvIHVwLlxuICAgICAgICB0aGlzLl9iYXJyaWVyQ291bnQrKztcblxuICAgICAgICBpZiAodGhpcy5fYmFycmllckNvdW50ID09PSAyKSB7XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgYmFycmllciBzbyBpdCBjYW4gYmUgY2FsbGVkIGFnYWluLlxuICAgICAgICAgICAgdGhpcy5fYmFycmllckNvdW50ID0gMDtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB0YWJzLlxuICAgICAgICAgICAgdGhpcy5sb2FkVGFicygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29ubmVjdHMgdGFiIGhlYWRlcnMgdG8gdGFiIGNvbnRlbnRzLCBhbmQgY3JlYXRlcyBhIHRhYiBpbnN0YW5jZSBmb3IgZWFjaCBwYWlyaW5nLlxuICAgIHByaXZhdGUgbG9hZFRhYnMoKTp2b2lkIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFueSB0YWJzIHRoYXQgbm8gbG9uZ2VyIGhhdmUgYW4gYXNzb2NpYXRlZCBoZWFkZXIuXG4gICAgICAgIHRoaXMudGFicyA9IHRoaXMudGFicy5maWx0ZXIodCA9PiAhIXRoaXMuX3RhYkhlYWRlcnMuZmluZCh0SCA9PiB0SCA9PT0gdC5oZWFkZXIpKTtcblxuICAgICAgICB0aGlzLl90YWJIZWFkZXJzXG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IHRoZSBsb2FkZWQgaGVhZGVycyB3aXRoIGF0dGFjaGVkIHRhYiBpbnN0YW5jZXMuXG4gICAgICAgICAgICAuZmlsdGVyKHRIID0+ICF0aGlzLnRhYnMuZmluZCh0ID0+IHQuaGVhZGVyID09PSB0SCkpXG4gICAgICAgICAgICAuZm9yRWFjaCh0SCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX3RhYkNvbnRlbnRzLmZpbmQodEMgPT4gdEMuaWQgPT09IHRILmlkKTtcblxuICAgICAgICAgICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFcnJvciBpZiBhbiBhc3NvY2lhdGVkIHRhYiBjb250ZW50IGNhbm5vdCBiZSBmb3VuZCBmb3IgdGhlIGdpdmVuIGhlYWRlci5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBbc3VpVGFiSGVhZGVyXSBtdXN0IGhhdmUgYSByZWxhdGVkIFtzdWlUYWJDb250ZW50XS5cIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHRhYiBpbnN0YW5jZSBmb3IgdGhpcyBoZWFkZXIgJiBjb250ZW50IGNvbWJvLlxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IG5ldyBUYWIodEgsIGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGFueSBleHRlcm5hbCBjaGFuZ2VzIGluIHRoZSB0YWIgaGVhZGVyJ3MgYWN0aXZlIHN0YXRlLiBFeHRlcm5hbCBjaGFuZ2VzIGFyZSB0cmlnZ2VyZWQgYnkgdXNlciBpbnB1dC5cbiAgICAgICAgICAgICAgICB0YWIuaGVhZGVyLmlzQWN0aXZlRXh0ZXJuYWxDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMub25IZWFkZXJBY3RpdmVDaGFuZ2VkKHRhYikpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXcgaW5zdGFuY2UgdG8gdGhlIGxpc3Qgb2YgdGFicy5cbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMucHVzaCh0YWIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXNzaWduIGVhY2ggdGFiIGFuIGluZGV4ICh3aGljaCBkZW5vdGVzIHRoZSBvcmRlciB0aGV5IHBoeXNpY2FsbHkgYXBwZWFyIGluKS5cbiAgICAgICAgdGhpcy5fdGFiSGVhZGVyc1xuICAgICAgICAgICAgLmZvckVhY2goKHRILCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gdGhpcy50YWJzLmZpbmQodCA9PiB0LmhlYWRlciA9PT0gdEgpO1xuICAgICAgICAgICAgICAgIGlmICh0YWIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiLmluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBTb3J0IHRoZSB0YWJzIGJ5IHRoZWlyIGluZGV4LlxuICAgICAgICB0aGlzLnRhYnMuc29ydCgoYSwgYikgPT4gYS5pbmRleCAtIGIuaW5kZXgpO1xuXG5cbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZVRhYikgeyAvLyBDaGVjayBpZiB0aGVyZSBhcmUgbm8gY3VycmVudCBleGlzdGluZyBhY3RpdmUgdGFicy5cbiAgICAgICAgICAgIC8vIElmIHNvLCB3ZSBtdXN0IGFjdGl2YXRlIHRoZSBmaXJzdCBhdmFpbGFibGUgdGFiLlxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUZpcnN0VGFiKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudGFicy5maW5kKHQgPT4gdCA9PT0gdGhpcy5hY3RpdmVUYWIpKSB7IC8vIE8nd2lzZSBjaGVjayBpZiBjdXJyZW50IGFjdGl2ZSB0YWIgaGFzIGJlZW4gZGVsZXRlZC5cbiAgICAgICAgICAgIC8vIElmIHNvLCB3ZSBtdXN0IGZpbmQgdGhlIGNsb3Nlc3QuXG4gICAgICAgICAgICAvLyBVc2UgYHNldFRpbWVvdXRgIGFzIHRoaXMgY2F1c2VzIGEgJ2NoYW5nZWQgYWZ0ZXIgY2hlY2tlZCcgZXJyb3Igbyd3aXNlLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRlQ2xvc2VzdFRhYih0aGlzLmFjdGl2ZVRhYikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGFicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIEVycm9yIGlmIHRoZXJlIGFyZW4ndCBhbnkgdGFicyBpbiB0aGUgdGFic2V0LlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbm5vdCBoYXZlIG5vIHRhYnMhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlyZXMgd2hlbmV2ZXIgYSB0YWIgaGVhZGVyJ3MgYWN0aXZlIHN0YXRlIGlzIGV4dGVybmFsbHkgY2hhbmdlZC5cbiAgICBwcml2YXRlIG9uSGVhZGVyQWN0aXZlQ2hhbmdlZCh0YWI6VGFiKTp2b2lkIHtcbiAgICAgICAgLy8gSWYgdGhlIHRhYiBoYXMgYmVjb21lIGFjdGl2YXRlZCwgYnV0IHdhcyBub3QgcHJldmlvdXNseSB0aGUgYWN0aXZlIHRhYjpcbiAgICAgICAgaWYgKHRhYi5pc0FjdGl2ZSAmJiB0aGlzLmFjdGl2ZVRhYiAhPT0gdGFiKSB7XG4gICAgICAgICAgICAvLyBEZWFjdGl2YXRlIGFsbCBvZiB0aGUgdGFicy5cbiAgICAgICAgICAgIHRoaXMudGFicy5maWx0ZXIodCA9PiB0ICE9PSB0YWIpLmZvckVhY2godCA9PiB0LmlzQWN0aXZlID0gZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiIHRvIHRoaXMgb25lLlxuICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgdGFiIGhhcyBiZWNvbWUgZGVhY3RpdmF0ZWQsIGJ1dCB3YXMgcHJldmlvdXNseSB0aGUgYWN0aXZlIHRhYjpcbiAgICAgICAgaWYgKCF0YWIuaXNBY3RpdmUgJiYgdGhpcy5hY3RpdmVUYWIgPT09IHRhYikge1xuICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIGNsb3Nlc3QgdGFiIHRvIGl0LlxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUNsb3Nlc3RUYWIodGFiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFjdGl2YXRlIHRoZSBmaXJzdCB0YWIgaW4gdGhlIHNldC5cbiAgICBwdWJsaWMgYWN0aXZhdGVGaXJzdFRhYigpOnZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRoaXMudGFic1swXTtcbiAgICB9XG5cbiAgICAvLyBBY3RpdmF0ZXMgdGhlIGNsb3Nlc3QgYXZhaWxhYmxlIHRhYiB0byBhIGdpdmVuIG9uZS5cbiAgICBwdWJsaWMgYWN0aXZhdGVDbG9zZXN0VGFiKHRhYjpUYWIpOnZvaWQge1xuICAgICAgICBsZXQgbmV4dEF2YWlsYWJsZTpUYWIgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgZXhpdGVkIHRhYidzIGluZGV4IGlzIGhpZ2hlciB0aGFuIGFsbCBhdmFpbGFibGUgdGFicyxcbiAgICAgICAgaWYgKHRhYi5pbmRleCA+PSB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgbGFzdCB0YWIuXG4gICAgICAgICAgICBuZXh0QXZhaWxhYmxlID0gdGhpcy50YWJzW3RoaXMudGFicy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoYXQgZGlkbid0IHdvcmssIHRyeSB0aGUgZm9sbG93aW5nIGNhc2VzOlxuICAgICAgICBpZiAoIW5leHRBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50YWJzLmZpbmQodCA9PiB0ID09PSB0YWIpKSB7IC8vIFdoZW4gdGhlIGV4aXRlZCB0YWIgbm8gbG9uZ2VyIGV4aXN0cyxcbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIGl0IHdpdGggYSB0YWIgYXQgdGhlIHNhbWUgaW5kZXguXG4gICAgICAgICAgICAgICAgbmV4dEF2YWlsYWJsZSA9IHRoaXMudGFic1t0YWIuaW5kZXhdO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gT3IgaWYgdGhlIGV4aXRlZCB0YWIgc3RpbGwgZXhpc3RzLFxuICAgICAgICAgICAgICAgIC8vIEdvIHRvIHRoZSB0YWIgaW1tZWRpYXRlbHkgdG8gdGhlIGxlZnQuXG4gICAgICAgICAgICAgICAgbmV4dEF2YWlsYWJsZSA9IHRoaXMudGFic1tNYXRoLm1heCh0YWIuaW5kZXggLSAxLCAwKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIb3dldmVyLCBpZiB0aGUgY2hvc2VuIHRhYiBpcyBkaXNhYmxlZCxcbiAgICAgICAgaWYgKG5leHRBdmFpbGFibGUuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIGNsb3Nlc3QgYXZhaWxhYmxlIHRhYiB0byBpdC5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2YXRlQ2xvc2VzdFRhYihuZXh0QXZhaWxhYmxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID0gbmV4dEF2YWlsYWJsZTtcbiAgICB9XG59XG4iXX0=