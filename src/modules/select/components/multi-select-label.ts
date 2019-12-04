import {
    Component,
    Input,
    HostBinding,
    HostListener,
    EventEmitter,
    ViewContainerRef,
    ViewChild,
    Renderer2,
    ElementRef,
    Output,
    ChangeDetectorRef,
    TemplateRef
} from "@angular/core";

import { IOptionContext } from "../classes/select-base";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import {
    Transition,
    TransitionDirection
} from "../../../modules/transition/classes/transition";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
import { HandledEvent } from "../../../misc/util/helpers/util";

// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef = TemplateRef;

@Component({
    selector: "sui-multi-select-label",
    template: `
        <span #templateSibling></span>
        <span *ngIf="!template" [innerHTML]="formatter(value)"></span>
        <i class="delete icon" (click)="deselectOption($event)"></i>
    `
})
export class SuiMultiSelectLabel<T> extends SuiTransition {
    // Sets the Semantic UI classes on the host element.
    // Doing it on the host enables use in menus etc.
    @HostBinding("class.ui")
    @HostBinding("class.label")
    public labelClasses:boolean;

    private _transitionController:TransitionController;

    @Input()
    public value:T;

    @Input()
    public query?:string;

    @Output("deselected")
    public onDeselected:EventEmitter<T>;

    @Input()
    public formatter:(obj:T) => string;

    private _template?:TemplateRef<IOptionContext<T>>;

    @Input()
    public get template():TemplateRef<IOptionContext<T>> | undefined {
        return this._template;
    }

    public set template(template:TemplateRef<IOptionContext<T>> | undefined) {
        this._template = template;
        if (this.template) {
            this._componentFactory.createView(
                this.templateSibling,
                this.template,
                {
                    $implicit: this.value,
                    query: this.query
                }
            );
        }
    }

    // Placeholder to draw template beside.
    @ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    public templateSibling:ViewContainerRef;

    constructor(
        protected _renderer:Renderer2,
        public element:ElementRef,
        protected _changeDetector:ChangeDetectorRef,
        protected _componentFactory:SuiComponentFactory
    ) {
        super(_renderer, element, _changeDetector);

        // Initialise transition functionality.
        this._transitionController = new TransitionController(
            false,
            "inline-block"
        );
        this.setTransitionController(this._transitionController);

        this.onDeselected = new EventEmitter<T>();

        this.labelClasses = true;

        this._transitionController.animate(
            new Transition("scale", 100, TransitionDirection.In)
        );
    }

    public deselectOption(e:HandledEvent):void {
        e.eventHandled = true;

        this._transitionController.animate(
            new Transition("scale", 100, TransitionDirection.Out, () =>
                this.onDeselected.emit(this.value)
            )
        );
    }

    @HostListener("click", ["$event"])
    public onClick(e:HandledEvent):void {
        e.eventHandled = true;
    }
}
