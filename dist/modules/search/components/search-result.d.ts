import { ViewContainerRef, TemplateRef } from "@angular/core";
import { SuiComponentFactory } from "../../../misc/util/index";
import { IResultContext } from "./search";
export declare class SuiSearchResult<T> {
    componentFactory: SuiComponentFactory;
    optionClasses: boolean;
    value: T;
    query: string;
    formatter: (obj: T, query: string) => string;
    private _template?;
    template: TemplateRef<IResultContext<T>> | undefined;
    templateSibling: ViewContainerRef;
    constructor(componentFactory: SuiComponentFactory);
}
