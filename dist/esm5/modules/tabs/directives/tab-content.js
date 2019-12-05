import * as tslib_1 from "tslib";
import { HostBinding, Directive, Input } from "@angular/core";
var SuiTabContent = /** @class */ (function () {
    function SuiTabContent() {
        this.isActive = false;
        this._contentClasses = true;
    }
    tslib_1.__decorate([
        HostBinding("class.tab")
    ], SuiTabContent.prototype, "_contentClasses", void 0);
    tslib_1.__decorate([
        Input("suiTabContent")
    ], SuiTabContent.prototype, "id", void 0);
    tslib_1.__decorate([
        HostBinding("class.active")
    ], SuiTabContent.prototype, "isActive", void 0);
    SuiTabContent = tslib_1.__decorate([
        Directive({
            selector: "[suiTabContent]"
        })
    ], SuiTabContent);
    return SuiTabContent;
}());
export { SuiTabContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL3RhYnMvZGlyZWN0aXZlcy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzlEO0lBVUk7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBWkQ7UUFEQyxXQUFXLENBQUMsV0FBVyxDQUFDOzBEQUNPO0lBR2hDO1FBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzs2Q0FDTjtJQUdqQjtRQURDLFdBQVcsQ0FBQyxjQUFjLENBQUM7bURBQ0o7SUFSZixhQUFhO1FBSHpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7U0FDOUIsQ0FBQztPQUNXLGFBQWEsQ0FlekI7SUFBRCxvQkFBQztDQUFBLEFBZkQsSUFlQztTQWZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIb3N0QmluZGluZywgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzdWlUYWJDb250ZW50XVwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aVRhYkNvbnRlbnQge1xuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLnRhYlwiKVxuICAgIHByaXZhdGUgX2NvbnRlbnRDbGFzc2VzOmJvb2xlYW47XG5cbiAgICBASW5wdXQoXCJzdWlUYWJDb250ZW50XCIpXG4gICAgcHVibGljIGlkOnN0cmluZztcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmFjdGl2ZVwiKVxuICAgIHB1YmxpYyBpc0FjdGl2ZTpib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9jb250ZW50Q2xhc3NlcyA9IHRydWU7XG4gICAgfVxufVxuIl19