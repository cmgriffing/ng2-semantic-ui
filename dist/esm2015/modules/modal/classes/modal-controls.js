// Used to pass ability to control a modal to a component.
export class ModalControls {
    constructor(approve, deny) {
        this.approve = approve;
        this.deny = deny;
    }
    // Use method here rather than arrow variables to make intellisense show they're methods.
    approve(result) { }
    deny(result) { }
}
// Injected into custom modal components, to allow control of the modal, and access to a context object.
export class Modal extends ModalControls {
    constructor(controls, context) {
        // Instances of `ModalControls` are only created in the `SuiModal` constructor,
        // so we take an initialised instance rather than remaking one each time.
        super(controls.approve, controls.deny);
        this.context = context;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItc2VtYW50aWMtdWkvIiwic291cmNlcyI6WyJtb2R1bGVzL21vZGFsL2NsYXNzZXMvbW9kYWwtY29udHJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsMERBQTBEO0FBQzFELE1BQU0sT0FBTyxhQUFhO0lBQ3RCLFlBQVksT0FBc0IsRUFBRSxJQUFtQjtRQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQseUZBQXlGO0lBQ2xGLE9BQU8sQ0FBQyxNQUFRLElBQVEsQ0FBQztJQUN6QixJQUFJLENBQUMsTUFBUSxJQUFRLENBQUM7Q0FDaEM7QUFFRCx3R0FBd0c7QUFDeEcsTUFBTSxPQUFPLEtBQXVDLFNBQVEsYUFBbUI7SUFHM0UsWUFBWSxRQUE0QixFQUFFLE9BQVM7UUFDL0MsK0VBQStFO1FBQy9FLHlFQUF5RTtRQUN6RSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2hvcnRoYW5kIHRvIGF2b2lkIHdyaXRpbmcgYXJyb3cgdHlwZXMgZXZlcnl3aGVyZS5cbmV4cG9ydCB0eXBlIE1vZGFsUmVzdWx0PFQ+ID0gKHJlc3VsdDpUKSA9PiB2b2lkO1xuXG4vLyBVc2VkIHRvIHBhc3MgYWJpbGl0eSB0byBjb250cm9sIGEgbW9kYWwgdG8gYSBjb21wb25lbnQuXG5leHBvcnQgY2xhc3MgTW9kYWxDb250cm9sczxULCBVPiB7XG4gICAgY29uc3RydWN0b3IoYXBwcm92ZTpNb2RhbFJlc3VsdDxUPiwgZGVueTpNb2RhbFJlc3VsdDxVPikge1xuICAgICAgICB0aGlzLmFwcHJvdmUgPSBhcHByb3ZlO1xuICAgICAgICB0aGlzLmRlbnkgPSBkZW55O1xuICAgIH1cblxuICAgIC8vIFVzZSBtZXRob2QgaGVyZSByYXRoZXIgdGhhbiBhcnJvdyB2YXJpYWJsZXMgdG8gbWFrZSBpbnRlbGxpc2Vuc2Ugc2hvdyB0aGV5J3JlIG1ldGhvZHMuXG4gICAgcHVibGljIGFwcHJvdmUocmVzdWx0OlQpOnZvaWQge31cbiAgICBwdWJsaWMgZGVueShyZXN1bHQ6VSk6dm9pZCB7fVxufVxuXG4vLyBJbmplY3RlZCBpbnRvIGN1c3RvbSBtb2RhbCBjb21wb25lbnRzLCB0byBhbGxvdyBjb250cm9sIG9mIHRoZSBtb2RhbCwgYW5kIGFjY2VzcyB0byBhIGNvbnRleHQgb2JqZWN0LlxuZXhwb3J0IGNsYXNzIE1vZGFsPFQsIFUgPSB1bmRlZmluZWQsIFYgPSB1bmRlZmluZWQ+IGV4dGVuZHMgTW9kYWxDb250cm9sczxVLCBWPiB7XG4gICAgcHVibGljIGNvbnRleHQ6VDtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xzOk1vZGFsQ29udHJvbHM8VSwgVj4sIGNvbnRleHQ6VCkge1xuICAgICAgICAvLyBJbnN0YW5jZXMgb2YgYE1vZGFsQ29udHJvbHNgIGFyZSBvbmx5IGNyZWF0ZWQgaW4gdGhlIGBTdWlNb2RhbGAgY29uc3RydWN0b3IsXG4gICAgICAgIC8vIHNvIHdlIHRha2UgYW4gaW5pdGlhbGlzZWQgaW5zdGFuY2UgcmF0aGVyIHRoYW4gcmVtYWtpbmcgb25lIGVhY2ggdGltZS5cbiAgICAgICAgc3VwZXIoY29udHJvbHMuYXBwcm92ZSwgY29udHJvbHMuZGVueSk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG59XG4iXX0=