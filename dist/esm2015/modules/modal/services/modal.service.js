import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { TemplateModalConfig, ComponentModalConfig } from "../classes/modal-config";
import { SuiModal } from "../components/modal";
import { Modal } from "../classes/modal-controls";
import { ActiveModal } from "../classes/active-modal";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
import * as i0 from "@angular/core";
import * as i1 from "../../../misc/util/services/component-factory.service";
let SuiModalService = class SuiModalService {
    constructor(_componentFactory) {
        this._componentFactory = _componentFactory;
    }
    open(modal) {
        // Generate the modal component to be shown.
        const componentRef = this._componentFactory.createComponent(SuiModal);
        // Shorthand for the created modal component instance.
        const modalComponent = componentRef.instance;
        if (modal instanceof TemplateModalConfig) {
            // Inject the template into the view.
            this._componentFactory.createView(modalComponent.templateSibling, modal.template, {
                // `let-context`
                $implicit: modal.context,
                // `let-modal="modal"`
                modal: componentRef.instance.controls
            });
        }
        else if (modal instanceof ComponentModalConfig) {
            // Generate the component to be used as the modal content,
            // injecting an instance of `Modal` to be used in the component constructor.
            const contentComponentRef = this._componentFactory.createComponent(modal.component, [
                {
                    provide: Modal,
                    useValue: new Modal(modalComponent.controls, modal.context)
                }
            ]);
            // Insert the new component into the content of the modal.
            this._componentFactory.attachToView(contentComponentRef, modalComponent.templateSibling);
            // Shorthand for access to the content component's DOM element.
            const contentElement = contentComponentRef.location
                .nativeElement;
            // Move all of the DOM elements inside the component to the main modal element.
            // This is done so that CSS classes apply correctly. It does stop any custom styles from working however,
            // so other ways may have to be investigated.
            while (contentElement.hasChildNodes() &&
                contentElement.parentElement &&
                contentElement.firstChild) {
                contentElement.parentElement.appendChild(contentElement.removeChild(contentElement.firstChild));
            }
            // Remove the generated component's 'empty shell' from the DOM.
            this._componentFactory.detachFromDocument(contentComponentRef);
        }
        // Attach the new modal component to the application.
        // The component will move itself to the document body for correctl styling.
        this._componentFactory.attachToApplication(componentRef);
        // Initialise the generated modal with the provided config.
        modalComponent.loadConfig(modal);
        // Return an instance of an `ActiveModal`, so the user can control the new modal.
        return new ActiveModal(modal, componentRef);
    }
};
SuiModalService.ctorParameters = () => [
    { type: SuiComponentFactory }
];
SuiModalService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SuiModalService_Factory() { return new SuiModalService(i0.ɵɵinject(i1.SuiComponentFactory)); }, token: SuiModalService, providedIn: "root" });
SuiModalService = tslib_1.__decorate([
    Injectable({
        providedIn: "root"
    })
], SuiModalService);
export { SuiModalService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9kYWwvc2VydmljZXMvbW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUgsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUN2QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDOzs7QUFJNUYsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUN4QixZQUFvQixpQkFBcUM7UUFBckMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtJQUFHLENBQUM7SUFFdEQsSUFBSSxDQUFVLEtBQTBCO1FBQzNDLDRDQUE0QztRQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUV6RCxRQUFRLENBQUMsQ0FBQztRQUVaLHNEQUFzRDtRQUN0RCxNQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBRTdDLElBQUksS0FBSyxZQUFZLG1CQUFtQixFQUFFO1lBQ3RDLHFDQUFxQztZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUM3QixjQUFjLENBQUMsZUFBZSxFQUM5QixLQUFLLENBQUMsUUFBUSxFQUNkO2dCQUNJLGdCQUFnQjtnQkFDaEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN4QixzQkFBc0I7Z0JBQ3RCLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVE7YUFDeEMsQ0FDSixDQUFDO1NBQ0w7YUFBTSxJQUFJLEtBQUssWUFBWSxvQkFBb0IsRUFBRTtZQUM5QywwREFBMEQ7WUFDMUQsNEVBQTRFO1lBQzVFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FDOUQsS0FBSyxDQUFDLFNBQVMsRUFDZjtnQkFDSTtvQkFDSSxPQUFPLEVBQUUsS0FBSztvQkFDZCxRQUFRLEVBQUUsSUFBSSxLQUFLLENBQ2YsY0FBYyxDQUFDLFFBQVEsRUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FDaEI7aUJBQ0o7YUFDSixDQUNKLENBQUM7WUFFRiwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FDL0IsbUJBQW1CLEVBQ25CLGNBQWMsQ0FBQyxlQUFlLENBQ2pDLENBQUM7WUFFRiwrREFBK0Q7WUFDL0QsTUFBTSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsUUFBUTtpQkFDOUMsYUFBd0IsQ0FBQztZQUU5QiwrRUFBK0U7WUFDL0UseUdBQXlHO1lBQ3pHLDZDQUE2QztZQUM3QyxPQUNJLGNBQWMsQ0FBQyxhQUFhLEVBQUU7Z0JBQzlCLGNBQWMsQ0FBQyxhQUFhO2dCQUM1QixjQUFjLENBQUMsVUFBVSxFQUMzQjtnQkFDRSxjQUFjLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FDcEMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQ3hELENBQUM7YUFDTDtZQUNELCtEQUErRDtZQUMvRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNsRTtRQUVELHFEQUFxRDtRQUNyRCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXpELDJEQUEyRDtRQUMzRCxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLGlGQUFpRjtRQUNqRixPQUFPLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTs7WUEzRXlDLG1CQUFtQjs7O0FBRGhELGVBQWU7SUFIM0IsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztHQUNXLGVBQWUsQ0E0RTNCO1NBNUVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgTW9kYWxDb25maWcsXG4gICAgVGVtcGxhdGVNb2RhbENvbmZpZyxcbiAgICBDb21wb25lbnRNb2RhbENvbmZpZ1xufSBmcm9tIFwiLi4vY2xhc3Nlcy9tb2RhbC1jb25maWdcIjtcbmltcG9ydCB7IFN1aU1vZGFsIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbW9kYWxcIjtcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSBcIi4uL2NsYXNzZXMvbW9kYWwtY29udHJvbHNcIjtcbmltcG9ydCB7IEFjdGl2ZU1vZGFsIH0gZnJvbSBcIi4uL2NsYXNzZXMvYWN0aXZlLW1vZGFsXCI7XG5pbXBvcnQgeyBTdWlDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9zZXJ2aWNlcy9jb21wb25lbnQtZmFjdG9yeS5zZXJ2aWNlXCI7XG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpTW9kYWxTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5OlN1aUNvbXBvbmVudEZhY3RvcnkpIHt9XG5cbiAgICBwdWJsaWMgb3BlbjxULCBVLCBWPihtb2RhbDpNb2RhbENvbmZpZzxULCBVLCBWPik6QWN0aXZlTW9kYWw8VCwgVSwgVj4ge1xuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgbW9kYWwgY29tcG9uZW50IHRvIGJlIHNob3duLlxuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmNyZWF0ZUNvbXBvbmVudDxcbiAgICAgICAgICAgIFN1aU1vZGFsPFUsIFY+XG4gICAgICAgID4oU3VpTW9kYWwpO1xuXG4gICAgICAgIC8vIFNob3J0aGFuZCBmb3IgdGhlIGNyZWF0ZWQgbW9kYWwgY29tcG9uZW50IGluc3RhbmNlLlxuICAgICAgICBjb25zdCBtb2RhbENvbXBvbmVudCA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgICAgICBpZiAobW9kYWwgaW5zdGFuY2VvZiBUZW1wbGF0ZU1vZGFsQ29uZmlnKSB7XG4gICAgICAgICAgICAvLyBJbmplY3QgdGhlIHRlbXBsYXRlIGludG8gdGhlIHZpZXcuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5LmNyZWF0ZVZpZXcoXG4gICAgICAgICAgICAgICAgbW9kYWxDb21wb25lbnQudGVtcGxhdGVTaWJsaW5nLFxuICAgICAgICAgICAgICAgIG1vZGFsLnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYGxldC1jb250ZXh0YFxuICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IG1vZGFsLmNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIC8vIGBsZXQtbW9kYWw9XCJtb2RhbFwiYFxuICAgICAgICAgICAgICAgICAgICBtb2RhbDogY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnRyb2xzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RhbCBpbnN0YW5jZW9mIENvbXBvbmVudE1vZGFsQ29uZmlnKSB7XG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgY29tcG9uZW50IHRvIGJlIHVzZWQgYXMgdGhlIG1vZGFsIGNvbnRlbnQsXG4gICAgICAgICAgICAvLyBpbmplY3RpbmcgYW4gaW5zdGFuY2Ugb2YgYE1vZGFsYCB0byBiZSB1c2VkIGluIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IuXG4gICAgICAgICAgICBjb25zdCBjb250ZW50Q29tcG9uZW50UmVmID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeS5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgbW9kYWwuY29tcG9uZW50LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogTW9kYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogbmV3IE1vZGFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsQ29tcG9uZW50LmNvbnRyb2xzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsLmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIEluc2VydCB0aGUgbmV3IGNvbXBvbmVudCBpbnRvIHRoZSBjb250ZW50IG9mIHRoZSBtb2RhbC5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuYXR0YWNoVG9WaWV3KFxuICAgICAgICAgICAgICAgIGNvbnRlbnRDb21wb25lbnRSZWYsXG4gICAgICAgICAgICAgICAgbW9kYWxDb21wb25lbnQudGVtcGxhdGVTaWJsaW5nXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBTaG9ydGhhbmQgZm9yIGFjY2VzcyB0byB0aGUgY29udGVudCBjb21wb25lbnQncyBET00gZWxlbWVudC5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gY29udGVudENvbXBvbmVudFJlZi5sb2NhdGlvblxuICAgICAgICAgICAgICAgIC5uYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgYWxsIG9mIHRoZSBET00gZWxlbWVudHMgaW5zaWRlIHRoZSBjb21wb25lbnQgdG8gdGhlIG1haW4gbW9kYWwgZWxlbWVudC5cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgZG9uZSBzbyB0aGF0IENTUyBjbGFzc2VzIGFwcGx5IGNvcnJlY3RseS4gSXQgZG9lcyBzdG9wIGFueSBjdXN0b20gc3R5bGVzIGZyb20gd29ya2luZyBob3dldmVyLFxuICAgICAgICAgICAgLy8gc28gb3RoZXIgd2F5cyBtYXkgaGF2ZSB0byBiZSBpbnZlc3RpZ2F0ZWQuXG4gICAgICAgICAgICB3aGlsZSAoXG4gICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQuaGFzQ2hpbGROb2RlcygpICYmXG4gICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQucGFyZW50RWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LmZpcnN0Q2hpbGRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGNvbnRlbnRFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZ2VuZXJhdGVkIGNvbXBvbmVudCdzICdlbXB0eSBzaGVsbCcgZnJvbSB0aGUgRE9NLlxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeS5kZXRhY2hGcm9tRG9jdW1lbnQoY29udGVudENvbXBvbmVudFJlZik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdHRhY2ggdGhlIG5ldyBtb2RhbCBjb21wb25lbnQgdG8gdGhlIGFwcGxpY2F0aW9uLlxuICAgICAgICAvLyBUaGUgY29tcG9uZW50IHdpbGwgbW92ZSBpdHNlbGYgdG8gdGhlIGRvY3VtZW50IGJvZHkgZm9yIGNvcnJlY3RsIHN0eWxpbmcuXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnkuYXR0YWNoVG9BcHBsaWNhdGlvbihjb21wb25lbnRSZWYpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpc2UgdGhlIGdlbmVyYXRlZCBtb2RhbCB3aXRoIHRoZSBwcm92aWRlZCBjb25maWcuXG4gICAgICAgIG1vZGFsQ29tcG9uZW50LmxvYWRDb25maWcobW9kYWwpO1xuXG4gICAgICAgIC8vIFJldHVybiBhbiBpbnN0YW5jZSBvZiBhbiBgQWN0aXZlTW9kYWxgLCBzbyB0aGUgdXNlciBjYW4gY29udHJvbCB0aGUgbmV3IG1vZGFsLlxuICAgICAgICByZXR1cm4gbmV3IEFjdGl2ZU1vZGFsKG1vZGFsLCBjb21wb25lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==