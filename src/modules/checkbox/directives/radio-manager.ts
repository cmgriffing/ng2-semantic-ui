import {
    Directive,
    AfterContentInit,
    ContentChildren,
    QueryList,
    ElementRef
} from "@angular/core";
import { SuiRadio } from "../components/radio";
import { Subscription } from "rxjs/Subscription";
import { Util } from "../../../misc/util/helpers/util";

@Directive({
    selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]"
})
export class SuiRadioManager<T> implements AfterContentInit {
    public isNested:boolean;

    @ContentChildren(SuiRadioManager, { descendants: true })
    public subManagers:QueryList<SuiRadioManager<T>>;

    @ContentChildren(SuiRadio, { descendants: true })
    public renderedRadios:QueryList<SuiRadio<T>>;

    private _radioSubs:Subscription[];

    constructor(public element:ElementRef) {
        this.isNested = false;
        this._radioSubs = [];
    }

    public ngAfterContentInit():void {
        this.updateNesting();
        this.subManagers.changes.subscribe(() => this.updateNesting());

        this.updateRadios();
        this.renderedRadios.changes.subscribe(() => this.updateRadios());
    }

    private updateNesting():void {
        this.subManagers
            .filter(m => m !== this)
            .forEach(m => (m.isNested = true));
    }

    private updateRadios():void {
        this._radioSubs.forEach(s => s.unsubscribe());
        this._radioSubs = [];

        const groups = Util.Array.groupBy(
            this.renderedRadios.toArray(),
            "name"
        );
        Object.keys(groups)
            .map(k => groups[k])
            .forEach(g =>
                g.forEach(r =>
                    this._radioSubs.push(
                        r.onCurrentValueChange.subscribe((v:T) => {
                            if (!this.isNested) {
                                g.forEach(radio => radio.writeValue(v));
                            }
                        })
                    )
                )
            );
    }
}
