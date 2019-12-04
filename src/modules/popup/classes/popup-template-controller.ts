import { TemplateRef, Renderer2, ElementRef } from "@angular/core";
import { SuiPopupController, IPopup } from "./popup-controller";
import { PopupConfig, IPopupConfig } from "./popup-config";
import {
    SuiComponentFactory,
    IImplicitContext
} from "../../../misc/util/services/component-factory.service";

const templateRef = TemplateRef;

export interface ITemplatePopupContext<T> extends IImplicitContext<IPopup> {
    context?:T;
}

export interface ITemplatePopupConfig<T> extends IPopupConfig {
    template?:TemplateRef<ITemplatePopupContext<T>>;
    context?:T;
}

export class TemplatePopupConfig<T> extends PopupConfig {
    public template?:TemplateRef<ITemplatePopupContext<T>>;
    public context?:T;
}

export class SuiPopupTemplateController<T> extends SuiPopupController {
    public template?:TemplateRef<ITemplatePopupContext<T>>;
    public context?:T;

    constructor(
        protected _renderer:Renderer2,
        public element:ElementRef,
        protected _componentFactory:SuiComponentFactory,
        protected _config:PopupConfig
    ) {
        super(_renderer, element, _componentFactory, _config);
    }

    public configure(config?:ITemplatePopupConfig<T>):void {
        super.configure(config);

        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    }

    public open():void {
        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();

            this._componentFactory.createView(
                this.popup.templateSibling,
                this.template,
                {
                    $implicit: this.popup,
                    context: this.context
                }
            );
        }

        super.open();
    }
}
