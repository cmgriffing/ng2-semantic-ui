import {
    Component,
    Input,
    Output,
    HostBinding,
    HostListener,
    EventEmitter,
    Renderer2,
    ElementRef,
    ChangeDetectorRef
} from "@angular/core";
import { TransitionController } from "../../../modules/transition/classes/transition-controller";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import {
    TransitionDirection,
    Transition
} from "../../../modules/transition/classes/transition";
@Component({
    selector: "sui-dimmer",
    template: `
        <div [class.content]="wrapContent">
            <div [class.center]="wrapContent">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [
        `
            :host.dimmer {
                transition: none;
            }
        `
    ]
})
export class SuiDimmer extends SuiTransition {
    @HostBinding("class.ui")
    @HostBinding("class.dimmer")
    public dimmerClasses:boolean;

    private _transitionController:TransitionController;

    private _isDimmed:boolean;

    @HostBinding("class.active")
    @Input()
    public get isDimmed():boolean {
        return this._isDimmed;
    }

    public set isDimmed(value:boolean) {
        const isDimmed = !!value;

        if (!this._transitionController) {
            // Initialise transition functionality when first setting dimmed, to ensure initial state doesn't transition.
            this._transitionController = new TransitionController(
                isDimmed,
                "block"
            );

            this.setTransitionController(this._transitionController);

            this._isDimmed = isDimmed;
        } else if (this._isDimmed !== isDimmed) {
            this._isDimmed = isDimmed;

            this._transitionController.stopAll();
            this._transitionController.animate(
                new Transition(
                    "fade",
                    this.transitionDuration,
                    isDimmed ? TransitionDirection.In : TransitionDirection.Out
                )
            );
        }
    }

    @Output()
    public isDimmedChange:EventEmitter<boolean>;

    @Input()
    public isClickable:boolean;

    @Input()
    public transition:string;

    @Input()
    public transitionDuration:number;

    /* Internal for now */
    @Input()
    public wrapContent:boolean;

    constructor(
        protected _renderer:Renderer2,
        public element:ElementRef,
        protected _changeDetector:ChangeDetectorRef
    ) {
        super(_renderer, element, _changeDetector);

        this._isDimmed = false;
        this.isDimmedChange = new EventEmitter<boolean>();
        this.isClickable = true;

        this.wrapContent = true;

        this.dimmerClasses = true;
    }

    @HostListener("click")
    public onClick():void {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
}
