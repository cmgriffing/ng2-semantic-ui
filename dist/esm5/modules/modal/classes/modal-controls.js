import * as tslib_1 from "tslib";
// Used to pass ability to control a modal to a component.
var ModalControls = /** @class */ (function () {
    function ModalControls(approve, deny) {
        this.approve = approve;
        this.deny = deny;
    }
    // Use method here rather than arrow variables to make intellisense show they're methods.
    ModalControls.prototype.approve = function (result) { };
    ModalControls.prototype.deny = function (result) { };
    return ModalControls;
}());
export { ModalControls };
// Injected into custom modal components, to allow control of the modal, and access to a context object.
var Modal = /** @class */ (function (_super) {
    tslib_1.__extends(Modal, _super);
    function Modal(controls, context) {
        var _this = 
        // Instances of `ModalControls` are only created in the `SuiModal` constructor,
        // so we take an initialised instance rather than remaking one each time.
        _super.call(this, controls.approve, controls.deny) || this;
        _this.context = context;
        return _this;
    }
    return Modal;
}(ModalControls));
export { Modal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL21vZGFsL2NsYXNzZXMvbW9kYWwtY29udHJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLDBEQUEwRDtBQUMxRDtJQUNJLHVCQUFZLE9BQXNCLEVBQUUsSUFBbUI7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELHlGQUF5RjtJQUNsRiwrQkFBTyxHQUFkLFVBQWUsTUFBUSxJQUFRLENBQUM7SUFDekIsNEJBQUksR0FBWCxVQUFZLE1BQVEsSUFBUSxDQUFDO0lBQ2pDLG9CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7O0FBRUQsd0dBQXdHO0FBQ3hHO0lBQTRELGlDQUFtQjtJQUczRSxlQUFZLFFBQTRCLEVBQUUsT0FBUztRQUFuRDtRQUNJLCtFQUErRTtRQUMvRSx5RUFBeUU7UUFDekUsa0JBQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBR3pDO1FBREcsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0lBQzNCLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQVZELENBQTRELGFBQWEsR0FVeEUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTaG9ydGhhbmQgdG8gYXZvaWQgd3JpdGluZyBhcnJvdyB0eXBlcyBldmVyeXdoZXJlLlxuZXhwb3J0IHR5cGUgTW9kYWxSZXN1bHQ8VD4gPSAocmVzdWx0OlQpID0+IHZvaWQ7XG5cbi8vIFVzZWQgdG8gcGFzcyBhYmlsaXR5IHRvIGNvbnRyb2wgYSBtb2RhbCB0byBhIGNvbXBvbmVudC5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xzPFQsIFU+IHtcbiAgICBjb25zdHJ1Y3RvcihhcHByb3ZlOk1vZGFsUmVzdWx0PFQ+LCBkZW55Ok1vZGFsUmVzdWx0PFU+KSB7XG4gICAgICAgIHRoaXMuYXBwcm92ZSA9IGFwcHJvdmU7XG4gICAgICAgIHRoaXMuZGVueSA9IGRlbnk7XG4gICAgfVxuXG4gICAgLy8gVXNlIG1ldGhvZCBoZXJlIHJhdGhlciB0aGFuIGFycm93IHZhcmlhYmxlcyB0byBtYWtlIGludGVsbGlzZW5zZSBzaG93IHRoZXkncmUgbWV0aG9kcy5cbiAgICBwdWJsaWMgYXBwcm92ZShyZXN1bHQ6VCk6dm9pZCB7fVxuICAgIHB1YmxpYyBkZW55KHJlc3VsdDpVKTp2b2lkIHt9XG59XG5cbi8vIEluamVjdGVkIGludG8gY3VzdG9tIG1vZGFsIGNvbXBvbmVudHMsIHRvIGFsbG93IGNvbnRyb2wgb2YgdGhlIG1vZGFsLCBhbmQgYWNjZXNzIHRvIGEgY29udGV4dCBvYmplY3QuXG5leHBvcnQgY2xhc3MgTW9kYWw8VCwgVSA9IHVuZGVmaW5lZCwgViA9IHVuZGVmaW5lZD4gZXh0ZW5kcyBNb2RhbENvbnRyb2xzPFUsIFY+IHtcbiAgICBwdWJsaWMgY29udGV4dDpUO1xuXG4gICAgY29uc3RydWN0b3IoY29udHJvbHM6TW9kYWxDb250cm9sczxVLCBWPiwgY29udGV4dDpUKSB7XG4gICAgICAgIC8vIEluc3RhbmNlcyBvZiBgTW9kYWxDb250cm9sc2AgYXJlIG9ubHkgY3JlYXRlZCBpbiB0aGUgYFN1aU1vZGFsYCBjb25zdHJ1Y3RvcixcbiAgICAgICAgLy8gc28gd2UgdGFrZSBhbiBpbml0aWFsaXNlZCBpbnN0YW5jZSByYXRoZXIgdGhhbiByZW1ha2luZyBvbmUgZWFjaCB0aW1lLlxuICAgICAgICBzdXBlcihjb250cm9scy5hcHByb3ZlLCBjb250cm9scy5kZW55KTtcblxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbn1cbiJdfQ==