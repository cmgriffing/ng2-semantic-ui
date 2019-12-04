import {
    ComponentRef,
    ElementRef,
    Type,
    Renderer2,
    OnDestroy
} from "@angular/core";
import { SuiPopupController } from "./popup-controller";
import { PopupConfig } from "./popup-config";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";

export class SuiPopupComponentController<T> extends SuiPopupController {
    // Stores reference to generated content component.
    private _contentComponentRef?:ComponentRef<T>;

    public get componentInstance():T | undefined {
        if (this._contentComponentRef) {
            return this._contentComponentRef.instance;
        }
    }

    constructor(
        protected _renderer:Renderer2,
        public element:ElementRef,
        protected _componentFactory:SuiComponentFactory,
        protected _component:Type<T>,
        protected _config:PopupConfig
    ) {
        super(_renderer, element, _componentFactory, _config);
    }

    public open():void {
        if (!this._contentComponentRef) {
            this._contentComponentRef = this._componentFactory.createComponent(
                this._component as Type<T>
            );
            this._componentFactory.attachToView(
                this._contentComponentRef,
                this.popup.templateSibling
            );
        }

        super.open();
    }

    protected cleanup():void {
        super.cleanup();

        if (this._contentComponentRef) {
            this._contentComponentRef.destroy();
            this._contentComponentRef = undefined;
        }
    }
}
