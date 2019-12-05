import { AfterContentInit, QueryList, ElementRef } from "@angular/core";
import { SuiRadio } from "../components/radio";
export declare class SuiRadioManager<T> implements AfterContentInit {
    element: ElementRef;
    isNested: boolean;
    subManagers: QueryList<SuiRadioManager<T>>;
    renderedRadios: QueryList<SuiRadio<T>>;
    private _radioSubs;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    private updateNesting;
    private updateRadios;
}
