import { ViewContainerRef, TemplateRef } from "@angular/core";
import { IResultContext } from "./search";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
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
